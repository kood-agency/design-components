#!/usr/bin/env bun
// Zero-dependency DESIGN.md validator. Bun 1.4 built-ins only.

const COLOR_KEYS = [
  "canvas",
  "surface-1",
  "surface-2",
  "surface-3",
  "hairline",
  "hairline-strong",
  "ink",
  "ink-muted",
  "ink-subtle",
  "ink-tertiary",
  "primary",
  "on-primary",
  "primary-hover",
  "primary-active",
  "accent",
  "accent-hover",
  "accent-subtle",
  "focus-ring",
  "semantic-success",
  "semantic-warning",
  "semantic-danger",
  "semantic-info",
  "on-success",
  "on-warning",
  "on-danger",
  "on-info",
  "selection-bg",
  "selection-ink",
  "code-bg",
  "code-border",
  "code-ink",
  "code-comment",
  "code-keyword",
  "code-string",
  "code-number",
  "code-error",
  "overlay",
] as const;

const TYPOGRAPHY_KEYS = [
  "display-xl",
  "display-lg",
  "display-md",
  "headline",
  "title",
  "subhead",
  "body-lg",
  "body",
  "body-sm",
  "caption",
  "eyebrow",
  "button",
  "code",
  "code-sm",
] as const;

const TYPOGRAPHY_FIELDS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
] as const;

const ROUNDED_KEYS = ["none", "xs", "sm", "md", "lg", "xl", "xxl", "full"] as const;

const SPACING_KEYS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
  "16",
  "20",
  "24",
  "32",
] as const;

const COMPONENT_KEYS = [
  "button-primary",
  "button-primary-hover",
  "button-primary-active",
  "button-secondary",
  "button-ghost",
  "button-destructive",
  "button-disabled",
  "card",
  "card-nested",
  "text-input",
  "text-input-focused",
  "text-input-error",
  "select",
  "checkbox-checked",
  "badge",
  "badge-accent",
  "status-pill-success",
  "status-pill-warning",
  "status-pill-danger",
  "alert-info",
  "top-nav",
  "sidebar",
  "sidebar-item-selected",
  "tabs-item",
  "tabs-item-selected",
  "table-header",
  "table-row",
  "modal",
  "tooltip",
  "code-block",
] as const;

const COMPONENT_REQUIRED = [
  "backgroundColor",
  "textColor",
  "typography",
  "rounded",
  "padding",
] as const;

const HEADINGS = [
  "## Overview",
  "## Colors",
  "### Brand & Accent",
  "### Surface",
  "### Text",
  "### Semantic",
  "### Code",
  "## Typography",
  "### Font Family",
  "### Loading fonts",
  "### Hierarchy",
  "### Principles",
  "### Korean typography rules",
  "### Note on Font Substitutes",
  "## Layout",
  "### Spacing System",
  "### Grid & Container",
  "### Whitespace Philosophy",
  "## Elevation & Depth",
  "## Shapes",
  "### Border Radius Scale",
  "## Components",
  "### Buttons",
  "### Cards & Containers",
  "### Inputs & Forms",
  "### Badges, Pills & Alerts",
  "### Navigation",
  "### Tables",
  "### Overlays",
  "### Code Blocks",
  "## Interaction States",
  "## Motion",
  "## Implementation Guidance",
  "### Mode switching",
  "### Mapping to shadcn and Tailwind tokens",
  "### Font preset switching",
  "## Do's and Don'ts",
  "### Do",
  "### Don't",
  "## Responsive Behavior",
  "### Breakpoints",
  "### Touch Targets",
  "### Collapsing Strategy",
  "## Iteration Guide",
  "## Known Gaps",
  "## Evidence and Assumptions",
] as const;

const TOKEN_REF_RE = /\{(colors|typography|rounded|spacing)\.([a-z0-9-]+)\}/g;
const HEADING_RE = /^(#{2,3}) (.+)$/;
const URL_RE = /https?:\/\/[^\s<>"'`)]+/g;

const TEXT_ROLES = [
  "ink",
  "ink-muted",
  "ink-subtle",
  "accent",
  "accent-hover",
  "semantic-success",
  "semantic-warning",
  "semantic-danger",
  "semantic-info",
] as const;

const TEXT_BACKGROUNDS = ["canvas", "surface-1", "surface-2"] as const;

const CODE_ROLES = [
  "code-comment",
  "code-keyword",
  "code-string",
  "code-number",
  "code-error",
] as const;

const NON_TEXT_ROLES = ["ink-tertiary", "hairline-strong", "focus-ring"] as const;
const NON_TEXT_BACKGROUNDS = ["canvas", "surface-1"] as const;

const PAIR_ROLES: ReadonlyArray<readonly [string, string]> = [
  ["on-primary", "primary"],
  ["on-primary", "primary-hover"],
  ["on-primary", "primary-active"],
  ["on-success", "semantic-success"],
  ["on-warning", "semantic-warning"],
  ["on-danger", "semantic-danger"],
  ["on-info", "semantic-info"],
  ["accent", "accent-subtle"],
  ["selection-ink", "selection-bg"],
];

type Rule =
  | "yaml"
  | "frontmatter-equal"
  | "parity"
  | "token-ref"
  | "contrast"
  | "heading-order"
  | "link"
  | "schema";

type ParsedDoc = {
  path: string;
  raw: string;
  frontmatter: string;
  body: string;
  data: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function keysOf(value: unknown): string[] | null {
  return isRecord(value) ? Object.keys(value) : null;
}

function sameKeyOrder(actual: string[] | null, expected: readonly string[]): boolean {
  if (!actual || actual.length !== expected.length) return false;
  for (let i = 0; i < expected.length; i++) {
    if (actual[i] !== expected[i]) return false;
  }
  return true;
}

function extractFrontmatter(text: string): { frontmatter: string; body: string } | null {
  if (!text.startsWith("---\n")) return null;
  const close = text.indexOf("\n---\n", 4);
  if (close === -1) return null;
  return {
    frontmatter: text.slice(4, close),
    body: text.slice(close + "\n---\n".length),
  };
}

function srgbChannel(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  const h = hex.slice(1);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b);
}

function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseHex(value: unknown): { hex: string; skip: boolean } | null {
  if (typeof value !== "string") return null;
  const hex = value.trim();
  if (/^#[0-9A-Fa-f]{8}$/.test(hex)) return { hex, skip: true };
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) return { hex, skip: false };
  return null;
}

function colorMap(
  data: Record<string, unknown>,
  mode: "dark" | "light",
): Record<string, unknown> | null {
  if (!isRecord(data.colors) || !isRecord(data.colors[mode])) return null;
  return data.colors[mode];
}

function colorValue(map: Record<string, unknown> | null, key: string): unknown {
  return map ? map[key] : undefined;
}

function fmtRatio(n: number): string {
  return n.toFixed(2);
}

async function readDoc(path: string): Promise<{ doc: ParsedDoc | null; yamlFail: string | null }> {
  let raw: string;
  try {
    raw = await Bun.file(path).text();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { doc: null, yamlFail: `${path} unreadable ${message}` };
  }

  const extracted = extractFrontmatter(raw);
  if (!extracted) {
    return { doc: null, yamlFail: `${path} missing YAML frontmatter fences` };
  }

  let parsed: unknown;
  try {
    parsed = Bun.YAML.parse(extracted.frontmatter);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { doc: null, yamlFail: `${path} YAML parse error ${message}` };
  }

  if (!isRecord(parsed)) {
    return { doc: null, yamlFail: `${path} frontmatter is not a mapping` };
  }

  return {
    doc: {
      path,
      raw,
      frontmatter: extracted.frontmatter,
      body: extracted.body,
      data: parsed,
    },
    yamlFail: null,
  };
}

function checkParity(doc: ParsedDoc): string[] {
  const darkKeys = keysOf(isRecord(doc.data.colors) ? doc.data.colors.dark : undefined);
  const lightKeys = keysOf(isRecord(doc.data.colors) ? doc.data.colors.light : undefined);
  if (!darkKeys || !lightKeys) {
    return [`${doc.path} colors.dark and colors.light must both be mappings`];
  }
  if (darkKeys.length !== lightKeys.length || darkKeys.some((k, i) => k !== lightKeys[i])) {
    return [
      `${doc.path} colors.dark keys [${darkKeys.join(", ")}] != colors.light keys [${lightKeys.join(", ")}]`,
    ];
  }
  return [];
}

function checkTokenRef(doc: ParsedDoc): string[] {
  const fails: string[] = [];
  const dark = colorMap(doc.data, "dark");
  const light = colorMap(doc.data, "light");
  const typography = isRecord(doc.data.typography) ? doc.data.typography : null;
  const rounded = isRecord(doc.data.rounded) ? doc.data.rounded : null;
  const spacing = isRecord(doc.data.spacing) ? doc.data.spacing : null;
  const text = doc.frontmatter + "\n" + doc.body;
  const seen = new Set<string>();

  for (const match of text.matchAll(TOKEN_REF_RE)) {
    const ns = match[1];
    const key = match[2];
    const token = `{${ns}.${key}}`;
    const dedupe = `${ns}.${key}`;
    if (seen.has(dedupe)) continue;
    seen.add(dedupe);

    if (ns === "colors") {
      const inDark = dark !== null && Object.prototype.hasOwnProperty.call(dark, key);
      const inLight = light !== null && Object.prototype.hasOwnProperty.call(light, key);
      if (!inDark || !inLight) {
        fails.push(
          `${doc.path} ${token} missing in ${[
            !inDark ? "colors.dark" : "",
            !inLight ? "colors.light" : "",
          ]
            .filter(Boolean)
            .join(" and ")}`,
        );
      }
      continue;
    }

    const table = ns === "typography" ? typography : ns === "rounded" ? rounded : spacing;
    if (!table || !Object.prototype.hasOwnProperty.call(table, key)) {
      fails.push(`${doc.path} ${token} does not resolve`);
    }
  }

  return fails;
}

function checkContrast(doc: ParsedDoc): string[] {
  const fails: string[] = [];
  for (const mode of ["dark", "light"] as const) {
    const map = colorMap(doc.data, mode);
    if (!map) {
      fails.push(`${doc.path} ${mode} colors mapping missing`);
      continue;
    }

    const resolve = (key: string): { hex: string; skip: boolean } | null => {
      return parseHex(colorValue(map, key));
    };

    const pair = (fgKey: string, bgKey: string, min: number, kind: string) => {
      const fg = resolve(fgKey);
      const bg = resolve(bgKey);
      if (!fg || !bg) {
        if (
          !fg &&
          colorValue(map, fgKey) !== undefined &&
          parseHex(colorValue(map, fgKey)) === null
        ) {
          fails.push(`${doc.path} ${mode} ${fgKey} is not a 6-digit hex`);
        }
        if (
          !bg &&
          colorValue(map, bgKey) !== undefined &&
          parseHex(colorValue(map, bgKey)) === null
        ) {
          fails.push(`${doc.path} ${mode} ${bgKey} is not a 6-digit hex`);
        }
        if (!fg && colorValue(map, fgKey) === undefined) {
          fails.push(`${doc.path} ${mode} missing color ${fgKey}`);
        }
        if (!bg && colorValue(map, bgKey) === undefined) {
          fails.push(`${doc.path} ${mode} missing color ${bgKey}`);
        }
        return;
      }
      if (fg.skip || bg.skip) return;
      const ratio = contrastRatio(fg.hex, bg.hex);
      if (ratio < min) {
        fails.push(
          `${doc.path} ${mode} ${fgKey}/${bgKey} (${kind}) ${fmtRatio(ratio)} < ${min.toFixed(1)}`,
        );
      }
    };

    for (const fg of TEXT_ROLES) {
      for (const bg of TEXT_BACKGROUNDS) pair(fg, bg, 4.5, "text");
    }
    for (const fg of CODE_ROLES) pair(fg, "code-bg", 4.5, "code");
    for (const fg of NON_TEXT_ROLES) {
      for (const bg of NON_TEXT_BACKGROUNDS) pair(fg, bg, 3.0, "non-text");
    }
    for (const [fg, bg] of PAIR_ROLES) pair(fg, bg, 4.5, "pair");
  }
  return fails;
}

function checkHeadingOrder(doc: ParsedDoc): string[] {
  const found: string[] = [];
  for (const line of doc.body.split("\n")) {
    const match = HEADING_RE.exec(line);
    if (match) found.push(`${match[1]} ${match[2]}`);
  }
  const expected = [...HEADINGS];
  if (found.length !== expected.length || found.some((h, i) => h !== expected[i])) {
    const first = found.findIndex((h, i) => h !== expected[i]);
    const detail =
      first === -1
        ? `count ${found.length} != ${expected.length}`
        : `index ${first} got ${JSON.stringify(found[first] ?? "<missing>")} want ${JSON.stringify(expected[first] ?? "<end>")}`;
    return [`${doc.path} ${detail}`];
  }
  return [];
}

function checkSchema(doc: ParsedDoc): string[] {
  const fails: string[] = [];
  const colors = isRecord(doc.data.colors) ? doc.data.colors : null;
  if (!colors) {
    fails.push(`${doc.path} colors is not a mapping`);
  } else {
    for (const mode of ["dark", "light"] as const) {
      const keys = keysOf(colors[mode]);
      if (!sameKeyOrder(keys, COLOR_KEYS)) {
        fails.push(
          `${doc.path} colors.${mode} keys must match Table A order (${COLOR_KEYS.length} keys)`,
        );
      }
    }
  }

  const typography = isRecord(doc.data.typography) ? doc.data.typography : null;
  if (!typography || !sameKeyOrder(keysOf(typography), TYPOGRAPHY_KEYS)) {
    fails.push(
      `${doc.path} typography keys must match Table B order (${TYPOGRAPHY_KEYS.length} keys)`,
    );
  } else {
    for (const token of TYPOGRAPHY_KEYS) {
      const item = typography[token];
      if (!sameKeyOrder(keysOf(item), TYPOGRAPHY_FIELDS)) {
        fails.push(
          `${doc.path} typography.${token} must have ${TYPOGRAPHY_FIELDS.join("/")} in that order`,
        );
      }
    }
  }

  if (!sameKeyOrder(keysOf(doc.data.rounded), ROUNDED_KEYS)) {
    fails.push(`${doc.path} rounded keys must match ${ROUNDED_KEYS.join(", ")}`);
  }

  if (!sameKeyOrder(keysOf(doc.data.spacing), SPACING_KEYS)) {
    fails.push(
      `${doc.path} spacing keys must match Table spacing order (${SPACING_KEYS.length} keys)`,
    );
  }

  const components = isRecord(doc.data.components) ? doc.data.components : null;
  if (!components || !sameKeyOrder(keysOf(components), COMPONENT_KEYS)) {
    fails.push(
      `${doc.path} components keys must match Table C order (${COMPONENT_KEYS.length} keys)`,
    );
  } else {
    for (const name of COMPONENT_KEYS) {
      const item = components[name];
      const keys = keysOf(item);
      if (!keys) {
        fails.push(`${doc.path} components.${name} is not a mapping`);
        continue;
      }
      for (const field of COMPONENT_REQUIRED) {
        if (!keys.includes(field)) {
          fails.push(`${doc.path} components.${name} missing ${field}`);
        }
      }
      for (const key of keys) {
        if (key !== "borderColor" && !(COMPONENT_REQUIRED as readonly string[]).includes(key)) {
          fails.push(`${doc.path} components.${name} unexpected key ${key}`);
        }
      }
    }
  }

  return fails;
}

function extractUrls(body: string): string[] {
  const urls: string[] = [];
  const seen = new Set<string>();
  for (const match of body.matchAll(URL_RE)) {
    const cleaned = match[0].replace(/[.,;:]+$/, "");
    if (!seen.has(cleaned)) {
      seen.add(cleaned);
      urls.push(cleaned);
    }
  }
  return urls;
}

async function checkLink(url: string): Promise<string | null> {
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });
    }
    if (res.status >= 400) return `${url} status ${res.status}`;
    return null;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return `${url} ${message}`;
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const offline = args.includes("--offline");
  const files = args.filter((a) => a !== "--offline");

  const docFails: string[] = [];
  const linkFails: string[] = [];
  let checks = 0;

  const fail = (rule: Rule, detail: string, bucket: string[] = docFails) => {
    bucket.push(`FAIL ${rule} ${detail}`);
  };

  if (files.length === 0) {
    fail("yaml", "no input files");
    for (const line of docFails) console.error(line);
    process.exit(1);
  }

  const docs: ParsedDoc[] = [];
  for (const path of files) {
    const { doc, yamlFail } = await readDoc(path);
    if (yamlFail || !doc) {
      fail("yaml", yamlFail ?? `${path} YAML error`);
      continue;
    }
    docs.push(doc);
    checks += 1;
  }

  if (files.length >= 2) {
    const comparable = docs;
    if (comparable.length >= 2) {
      const baseline = comparable[0].frontmatter;
      let equal = true;
      for (let i = 1; i < comparable.length; i++) {
        if (comparable[i].frontmatter !== baseline) {
          equal = false;
          fail("frontmatter-equal", `${comparable[i].path} frontmatter != ${comparable[0].path}`);
        }
      }
      if (equal) checks += 1;
    } else {
      fail("frontmatter-equal", "cannot compare frontmatter because YAML parsing failed");
    }
  }

  for (const doc of docs) {
    const parity = checkParity(doc);
    if (parity.length) for (const d of parity) fail("parity", d);
    else checks += 1;

    const refs = checkTokenRef(doc);
    if (refs.length) for (const d of refs) fail("token-ref", d);
    else checks += 1;

    const contrast = checkContrast(doc);
    if (contrast.length) for (const d of contrast) fail("contrast", d);
    else checks += 1;

    const headings = checkHeadingOrder(doc);
    if (headings.length) for (const d of headings) fail("heading-order", d);
    else checks += 1;

    const schema = checkSchema(doc);
    if (schema.length) for (const d of schema) fail("schema", d);
    else checks += 1;

    if (!offline) {
      const urls = extractUrls(doc.body);
      for (const url of urls) {
        const err = await checkLink(url);
        if (err) fail("link", `${doc.path} ${err}`, linkFails);
        else checks += 1;
      }
    }
  }

  const allFails = [...docFails, ...linkFails];
  if (allFails.length > 0) {
    for (const line of allFails) console.error(line);
    process.exit(1);
  }

  console.log(`OK ${checks} checks`);
  process.exit(0);
}

main().catch((err) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`FAIL yaml uncaught ${message}`);
  process.exit(1);
});
