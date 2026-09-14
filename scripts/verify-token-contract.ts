import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const DIST = resolve(ROOT, process.env.QA_KOOD_DIST ?? "dist");
const expectFail = process.argv.length === 3 && process.argv[2] === "--expect-fail";

const LIGHT = {
  "--radius": "10px",
  "--background": "#f3f5f8",
  "--foreground": "#171c24",
  "--foreground-muted": "#454f5c",
  "--muted-foreground": "#5e6875",
  "--card": "#ffffff",
  "--card-foreground": "#171c24",
  "--popover": "#ffffff",
  "--popover-foreground": "#171c24",
  "--secondary": "#edf0f4",
  "--secondary-foreground": "#171c24",
  "--muted": "#e6eaef",
  "--primary": "#2861db",
  "--primary-foreground": "#ffffff",
  "--primary-hover": "#2154c4",
  "--primary-active": "#1b47a8",
  "--accent": "#eaf1fd",
  "--accent-foreground": "#2258cc",
  "--accent-hover": "#1b47a8",
  "--destructive": "#cc2f3c",
  "--destructive-foreground": "#ffffff",
  "--success": "#12774a",
  "--success-foreground": "#ffffff",
  "--warning": "#8f5600",
  "--warning-foreground": "#ffffff",
  "--border": "#e3e7ec",
  "--input": "#808a97",
  "--ring": "#2861db",
  "--overlay": "#10141b80",
  "--selection": "#d5e3fb",
  "--selection-foreground": "#171c24",
  "--code": "#f3f5f8",
  "--code-foreground": "#171c24",
  "--code-border": "#e3e7ec",
  "--sidebar": "#ffffff",
  "--sidebar-foreground": "#454f5c",
  "--sidebar-primary": "#2861db",
  "--sidebar-primary-foreground": "#ffffff",
  "--sidebar-accent": "#eaf1fd",
  "--sidebar-accent-foreground": "#2258cc",
  "--sidebar-border": "#e3e7ec",
  "--sidebar-ring": "#2861db",
};

const DARK = {
  "--radius": "10px",
  "--background": "#101217",
  "--foreground": "#f2f4f7",
  "--foreground-muted": "#b9c0ca",
  "--muted-foreground": "#929ba7",
  "--card": "#191c22",
  "--card-foreground": "#f2f4f7",
  "--popover": "#2a2f37",
  "--popover-foreground": "#f2f4f7",
  "--secondary": "#23272e",
  "--secondary-foreground": "#f2f4f7",
  "--muted": "#2c3139",
  "--primary": "#3a6fe0",
  "--primary-foreground": "#ffffff",
  "--primary-hover": "#3264d2",
  "--primary-active": "#2a58bd",
  "--accent": "#1a2840",
  "--accent-foreground": "#82a9f6",
  "--accent-hover": "#9dbbf8",
  "--destructive": "#f0858b",
  "--destructive-foreground": "#101217",
  "--success": "#5dc78a",
  "--success-foreground": "#101217",
  "--warning": "#e5af4e",
  "--warning-foreground": "#101217",
  "--border": "#2d323a",
  "--input": "#7a8390",
  "--ring": "#6f9bf3",
  "--overlay": "#05070ab3",
  "--selection": "#24457a",
  "--selection-foreground": "#f2f4f7",
  "--code": "#0b0d11",
  "--code-foreground": "#e6eaf0",
  "--code-border": "#2d323a",
  "--sidebar": "#191c22",
  "--sidebar-foreground": "#b9c0ca",
  "--sidebar-primary": "#3a6fe0",
  "--sidebar-primary-foreground": "#ffffff",
  "--sidebar-accent": "#1a2840",
  "--sidebar-accent-foreground": "#82a9f6",
  "--sidebar-border": "#2d323a",
  "--sidebar-ring": "#6f9bf3",
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function normalized(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/^#([\da-f])([\da-f])([\da-f])$/, "#$1$1$2$2$3$3");
}

function matchingBrace(css: string, opening: number) {
  let depth = 0;
  let quote = "";
  for (let index = opening; index < css.length; index += 1) {
    const character = css[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === "\\") {
      index += 1;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    if (character === "}") {
      depth -= 1;
      if (depth === 0) return index;
      assert(depth >= 0, "CSS has an unexpected closing brace");
    }
  }
  throw new Error("CSS has an unclosed block");
}

function assertWellFormed(css: string) {
  const openings: number[] = [];
  let quote = "";
  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === "\\") {
      index += 1;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "{") openings.push(index);
    if (character === "}")
      assert(openings.pop() !== undefined, "CSS has an unexpected closing brace");
  }
  assert(!quote, "CSS has an unclosed string");
  assert(openings.length === 0, "CSS has an unclosed block");
}

function declarations(css: string, selector: RegExp) {
  const match = selector.exec(css);
  assert(match?.index !== undefined, `missing token rule matching ${selector}`);
  const opening = css.indexOf("{", match.index);
  const closing = matchingBrace(css, opening);
  const block = css.slice(opening + 1, closing);
  const result: Record<string, string> = {};
  for (const declaration of block.split(";")) {
    if (!declaration.trim()) continue;
    const separator = declaration.indexOf(":");
    assert(separator > 0, `malformed declaration in ${selector}: ${declaration}`);
    result[declaration.slice(0, separator).trim()] = declaration.slice(separator + 1).trim();
  }
  return result;
}

function assertTokens(
  actual: Record<string, string>,
  expected: Record<string, string>,
  mode: string,
) {
  for (const [name, value] of Object.entries(expected))
    assert(
      normalized(actual[name] ?? "") === normalized(value),
      `${mode} ${name}: expected ${value}, got ${actual[name] ?? "<missing>"}`,
    );
  assert(
    actual["--secondary"] !== actual["--muted"],
    `${mode} --secondary and --muted must differ`,
  );
}

function assertDerivedRadiiAndFontHooks(css: string) {
  const expected = {
    "--radius-xs": "calc(var(--radius)*.5)",
    "--radius-sm": "calc(var(--radius)*.75)",
    "--radius-md": "var(--radius)",
    "--radius-lg": "calc(var(--radius)*1.5)",
    "--radius-xl": "calc(var(--radius)*2)",
    "--radius-2xl": "calc(var(--radius)*3)",
    "--font-sans": "var(--kood-font-sans)",
    "--font-mono": "var(--kood-font-mono)",
  };
  for (const [name, value] of Object.entries(expected)) {
    const expression = new RegExp(`${name}:${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
    assert(expression.test(normalized(css)), `missing derived public token ${name}: ${value}`);
  }
  assert(css.includes("--kood-font-sans:"), "missing public --kood-font-sans hook");
  assert(css.includes("--kood-font-mono:"), "missing public --kood-font-mono hook");
}

function assertPublishedEntrypoints() {
  const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8")) as {
    exports?: Record<string, unknown>;
  };
  const serialized = JSON.stringify(pkg.exports ?? {});
  assert(
    !serialized.includes("src/styles/globals.css"),
    "raw source stylesheet is exposed as a package entrypoint",
  );
  assert(
    pkg.exports?.["./globals.css"] === "./dist/globals.css" &&
      pkg.exports?.["./styles.css"] === "./dist/styles.css",
    "published stylesheet entrypoints must point only at equivalent dist CSS",
  );
}

function verify() {
  assert(
    process.argv.length === 2 || expectFail,
    `unsupported option: ${process.argv.slice(2).join(" ")}`,
  );
  const globals = readFileSync(resolve(DIST, "globals.css"), "utf8");
  const styles = readFileSync(resolve(DIST, "styles.css"), "utf8");
  assert(globals === styles, "dist/globals.css and dist/styles.css differ");
  assertWellFormed(globals);
  const light = declarations(globals, /:root\s*,\s*\.light\s*\{/g);
  const dark = declarations(globals, /\.dark\s*\{/g);
  assertTokens(light, LIGHT, "light default");
  assertTokens(dark, DARK, "dark opt-in");
  assertDerivedRadiiAndFontHooks(globals);
  assertPublishedEntrypoints();
  console.log(
    "token contract passed: built light default, dark opt-in, radii, font hooks, and dist entrypoints",
  );
}

try {
  verify();
  if (expectFail) throw new Error("expected token contract to fail");
} catch (error) {
  if (expectFail) {
    console.log(`token contract failed as expected: ${String(error)}`);
  } else {
    throw error;
  }
}
