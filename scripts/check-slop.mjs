#!/usr/bin/env node
// Slop machine-check for src/components.
// Enforces the anti-slop regexes from DESIGN.md's verification strategy (rule 8
// only inside class-string literals) plus the shadow-raised allow-list.
// Usage:
//   node scripts/check-slop.mjs            # scan src/components (or CHECK_SLOP_ROOT)
//   node scripts/check-slop.mjs --self-test
// Exit 1 on any hit; exit 0 with "check-slop: 0 hits in <N> files" otherwise.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative, resolve } from "node:path";

const DEFAULT_ROOT = fileURLToPath(new URL("../src/components/", import.meta.url));
const ROOT = process.env.CHECK_SLOP_ROOT ? resolve(process.env.CHECK_SLOP_ROOT) : DEFAULT_ROOT;

// 15 rules transcribed verbatim from the plan's verification strategy.
// PCRE-free (lookbehind/lookahead only) so they compile on Node >= 18.
const RULES = [
  {
    id: "1",
    re: /(?:disabled|aria-disabled|data-disabled|data-\[(?:aria-)?disabled(?:=true)?\]):[^\s"'`]*opacity-/,
  },
  { id: "2", re: /(?<![\w-])shadow-(?!raised(?![\w-]))[\w\[\]\/-]+/ },
  { id: "3", re: /(?<![\w-])ring-[\w\[\]()\/-]+/ },
  {
    id: "4",
    re: /(?<![\w-])(?:bg|text|border|outline|ring|fill|stroke|from|via|to|shadow|divide|placeholder)-[\w-]+\/\d{1,3}(?![\w-])/,
  },
  { id: "5", re: /(?<![\w-])transition-all(?![\w-])/ },
  {
    id: "6",
    re: /(?<![\w-])(?:bg-gradient|bg-linear|bg-radial|bg-conic|from-|via-|to-)[\w\[\]()\/%-]*/,
  },
  { id: "7", re: /(?<![\w-])(?:backdrop-)?blur(?:-[\w\[\]]+)?(?![\w-])/ },
  { id: "8", re: /#[0-9A-Fa-f]{3,8}(?![0-9A-Fa-f\w])/ },
  { id: "9", re: /(?<![\w])(?:zinc|slate|gray|neutral|stone)-(?:50|[1-9]00|950)(?![\w-])/ },
  { id: "10", re: /(?<![\w-])(?:text-white|bg-white|bg-black|text-black)(?![\w-])/ },
  {
    id: "11",
    re: /(?<![\w-])(?:animate-in|animate-out|zoom-in-\d+|zoom-out-\d+|slide-in-from-[\w-]+|slide-out-to-[\w-]+|fade-in-\d+|fade-out-\d+|animate-accordion-\w+|animate-caret-\w+)(?![\w-])/,
  },
  { id: "12", re: /color-mix\(/ },
  { id: "13", re: /(?<![\w-])dark:/ },
  { id: "14", re: /(?<![\w-])translate-y-px(?![\w-])/ },
  { id: "15a", re: /(?<![\w-])duration-(?!\(--duration-(?:enter|exit)\)(?![\w-]))[\w\[\]()-]+/ },
  { id: "15b", re: /(?<![\w-])ease-(?!standard(?![\w-]))[\w\[\]()-]+/ },
];
const RULE_BY_ID = new Map(RULES.map((r) => [r.id, r]));

// Rule 8 runs ONLY inside className=/class= string values and cva(/cn(
// string arguments; rules 1-7 and 9-15 run on raw lines.
const HEX_ONLY = new Set(["8"]);

// shadow-raised may appear ONLY in these 14 floating-overlay files.
const RAISED_ALLOWLIST = new Set([
  "popover.tsx",
  "dropdown-menu.tsx",
  "context-menu.tsx",
  "menubar.tsx",
  "select.tsx",
  "combobox.tsx",
  "command.tsx",
  "hover-card.tsx",
  "navigation-menu.tsx",
  "dialog.tsx",
  "alert-dialog.tsx",
  "sheet.tsx",
  "drawer.tsx",
  "sonner.tsx",
]);
const RAISED_RE = /(?<![\w-])shadow-raised(?![\w-])/;

const STRING_LITERAL = /(["'`])(?:\\[\s\S]|(?!\1)[\s\S])*\1/;

function* walk(dir) {
  for (const f of readdirSync(dir).sort()) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (f.endsWith(".tsx")) yield p;
  }
}

function displayPath(p) {
  const r = relative(process.cwd(), p);
  return r && !r.startsWith("..") ? r : p;
}

function lineAt(text, offset) {
  let line = 1;
  for (let i = 0; i < offset && i < text.length; i++) {
    if (text.charCodeAt(i) === 10) line++;
  }
  return line;
}

function matchStringAt(text, i) {
  const m = STRING_LITERAL.exec(text.slice(i));
  if (!m || m.index !== 0) return null;
  return { text: m[0], start: i };
}

function matchingParen(text, open) {
  let depth = 0;
  let inStr = null;
  let esc = false;
  for (let i = open; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (esc) {
        esc = false;
        continue;
      }
      if (c === "\\") {
        esc = true;
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

// Collect every class-string literal (raw slice + absolute start offset).
function extractClassStrings(text) {
  const found = [];
  const seen = new Set();
  const push = (s, start) => {
    const key = `${start}:${s}`;
    if (seen.has(key)) return;
    seen.add(key);
    found.push({ text: s, start });
  };

  const attrRe = /\b(?:className|class)\s*=\s*/g;
  let m;
  while ((m = attrRe.exec(text)) !== null) {
    let i = m.index + m[0].length;
    if (text[i] === "{") {
      i++;
      while (i < text.length && /\s/.test(text[i])) i++;
    }
    const lit = matchStringAt(text, i);
    if (lit) push(lit.text, lit.start);
  }

  const callRe = /\b(?:cva|cn)\(/g;
  while ((m = callRe.exec(text)) !== null) {
    const open = m.index + m[0].length - 1;
    const end = matchingParen(text, open);
    if (end === -1) continue;
    const inner = text.slice(open, end + 1);
    const litRe = /(["'`])(?:\\[\s\S]|(?!\1)[\s\S])*\1/g;
    for (const lm of inner.matchAll(litRe)) push(lm[0], open + lm.index);
  }

  return found;
}

// Expand a match to the whitespace/quote-delimited token (the offending class)
// so output lists e.g. `disabled:opacity-50` rather than the bare regex slice.
function tokenAt(line, index) {
  let start = index;
  let end = index;
  while (start > 0 && !/\s/.test(line[start - 1]) && !/["'`]/.test(line[start - 1])) start--;
  while (end < line.length && !/\s/.test(line[end]) && !/["'`]/.test(line[end])) end++;
  return line.slice(start, end);
}

function scanFile(absPath) {
  const text = readFileSync(absPath, "utf8");
  const rel = displayPath(absPath);
  const hits = [];
  const add = (lineNo, line, id, index) =>
    hits.push(`${rel}:${lineNo}: ${id} ${tokenAt(line, index)}`);
  const lines = text.split("\n");

  for (let li = 0; li < lines.length; li++) {
    for (const rule of RULES) {
      if (HEX_ONLY.has(rule.id)) continue;
      const re = new RegExp(rule.re.source, "g");
      for (const match of lines[li].matchAll(re)) add(li + 1, lines[li], rule.id, match.index);
    }
  }

  const hex = RULE_BY_ID.get("8").re;
  const hexRe = new RegExp(hex.source, "g");
  for (const { text: str, start } of extractClassStrings(text)) {
    for (const match of str.matchAll(hexRe)) {
      const abs = start + match.index;
      add(lineAt(text, abs), str, "8", match.index);
    }
  }

  const base = rel.split("/").pop();
  if (!RAISED_ALLOWLIST.has(base)) {
    const raisedRe = new RegExp(RAISED_RE.source, "g");
    for (const match of text.matchAll(raisedRe))
      add(lineAt(text, match.index), text, "allow-list", match.index);
  }

  return hits;
}

const SELF_TESTS = [
  {
    id: "1",
    pos: [
      "disabled:opacity-50",
      "aria-disabled:opacity-50",
      "data-disabled:opacity-50",
      "data-[disabled]:opacity-50",
      "data-[aria-disabled=true]:opacity-50",
    ],
    neg: ["disabled:bg-secondary", "data-disabled:cursor-not-allowed"],
  },
  {
    id: "2",
    pos: ["shadow-sm", "shadow-md", "shadow-[0_1px_2px]"],
    neg: ["shadow-raised", "shadow-raised border"],
  },
  {
    id: "3",
    pos: ["ring-2", "ring-[3px]", "ring-offset-2", "ring-inset"],
    neg: ["outline-ring", "data-ring", "border-ring"],
  },
  {
    id: "4",
    pos: ["hover:bg-primary/90", "border-input/50", "bg-white/10", "text-zinc-900/80"],
    neg: ["hover:bg-primary-hover", "bg-primary/", "w-1/2", "hover:bg-primary"],
  },
  { id: "5", pos: ["transition-all"], neg: ["transition-colors"] },
  {
    id: "6",
    pos: [
      "bg-gradient-to-r",
      "bg-linear-to-r",
      "bg-radial",
      "bg-conic",
      "from-red-500",
      "via-gray-900",
      "to-blue-500",
    ],
    neg: ["bg-primary", "via", "from", "to"],
  },
  {
    id: "7",
    pos: ["blur-sm", "backdrop-blur", "backdrop-blur-md", "blur-[2px]"],
    neg: ["blurred", "blue-500"],
  },
  {
    id: "8",
    pos: ["#fff", "#ffffff", "#f00a1b2c", "#F0A1B2"],
    neg: ["#", "#12", 'href="#"', "#fffx"],
  },
  {
    id: "9",
    pos: ["bg-zinc-900", "text-neutral-500", "bg-slate-50", "border-gray-200", "text-stone-950"],
    neg: ["bg-zinc-900x", "zinc", "gray-10", "bg-red-600"],
  },
  {
    id: "10",
    pos: ["text-white", "bg-white", "bg-black", "text-black"],
    neg: ["text-whitesmoke", "text-whitish"],
  },
  {
    id: "11",
    pos: [
      "animate-in",
      "animate-out",
      "zoom-in-95",
      "zoom-out-95",
      "slide-in-from-bottom-4",
      "slide-out-to-left-1",
      "fade-in-0",
      "fade-out-50",
      "animate-accordion-down",
      "animate-caret-blink",
    ],
    neg: ["animate-spin", "animate-pulse", "zoom-in"],
  },
  { id: "12", pos: ["color-mix(in oklab, red, blue)"], neg: ["color-mix", "color-mixx"] },
  {
    id: "13",
    pos: ["dark:bg-input/30", "dark:text-foreground"],
    neg: ["dark", "darkmode", "text-dark", "text-dark:"],
  },
  { id: "14", pos: ["translate-y-px"], neg: ["translate-y-1", "translate-x-px"] },
  {
    id: "15a",
    pos: ["duration-100", "duration-300", "duration-[200ms]"],
    neg: ["duration-(--duration-enter)", "duration-(--duration-exit)"],
  },
  {
    id: "15b",
    pos: ["ease-linear", "ease-in-out", "ease-[cubic-bezier(0.2,0,0,1)]"],
    neg: ["ease-standard"],
  },
];

function selfTest() {
  const failures = [];
  for (const t of SELF_TESTS) {
    const rule = RULE_BY_ID.get(t.id);
    for (const s of t.pos) {
      if (!rule.re.test(s)) failures.push(`rule ${t.id}: expected match, got none: ${s}`);
    }
    for (const s of t.neg) {
      if (rule.re.test(s)) failures.push(`rule ${t.id}: expected no match, matched: ${s}`);
    }
  }
  return failures;
}

function main() {
  if (process.argv.includes("--self-test")) {
    const failures = selfTest();
    if (failures.length > 0) {
      process.stderr.write("check-slop: self-test failed\n");
      for (const f of failures) process.stderr.write(`  ${f}\n`);
      process.exit(1);
    }
    console.log(`check-slop: self-test passed (${RULES.length} regexes)`);
    process.exit(0);
  }

  if (!existsSync(ROOT)) {
    process.stderr.write(`check-slop: root not found: ${ROOT}\n`);
    process.exit(1);
  }

  let files = 0;
  const allHits = [];
  for (const f of walk(ROOT)) {
    files++;
    allHits.push(...scanFile(f));
  }

  if (allHits.length > 0) {
    for (const h of allHits) console.log(h);
    console.log(`check-slop: ${allHits.length} hits in ${files} files`);
    process.exit(1);
  }
  console.log(`check-slop: 0 hits in ${files} files`);
}

main();
