import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { relative, resolve } from "node:path";

const require = createRequire(import.meta.url);
const compilerPackage = readdirSync(resolve(import.meta.dir, "..", "node_modules", ".pnpm")).find(
  (entry) => /^typescript@5\./.test(entry),
);
if (!compilerPackage) throw new Error("TypeScript compiler API package is unavailable");
const ts: any = require(
  resolve(
    import.meta.dir,
    "..",
    "node_modules",
    ".pnpm",
    compilerPackage,
    "node_modules",
    "typescript",
    "lib",
    "typescript.js",
  ),
);

const ROOT = resolve(import.meta.dir, "..");
const EVIDENCE = resolve(ROOT, ".omo/evidence/kood-internal-charcoal");
const BASELINE = resolve(EVIDENCE, "baseline");
const CONSUMER = resolve(EVIDENCE, "task-7-consumer");
const PRETENDARD_CSS =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";
const WANTED_CSS =
  "https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css";
const missingVariable = process.env.QA_NEGATIVE_MISSING_VAR === "1";
const missingFont = process.env.QA_NEGATIVE_MISSING_FONT === "1";
const PORT = Number(process.env.QA_PORT ?? 6177);
const CDP_PORT = Number(process.env.QA_CDP_PORT ?? 9277);
const TIMEOUT = 15_000;
const apiFiles = [
  "src/index.ts",
  "src/components/ui/button.tsx",
  "src/components/ui/input.tsx",
  "src/components/ui/select.tsx",
  "src/components/ui/tabs.tsx",
  "src/components/ui/card.tsx",
  "src/components/ui/table.tsx",
] as const;

type CdpMessage = {
  id?: number;
  method?: string;
  params?: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: { message: string };
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replaceAll("rgb(10 23 36 / 6%)", "#0a17240f")
    .replaceAll("rgb(10 23 36 / 8%)", "#0a172414")
    .replace(/^#([\da-f])([\da-f])([\da-f])$/, "#$1$1$2$2$3$3");
}

function sourceFromHead(path: string) {
  const result = Bun.spawnSync(["git", "show", `HEAD:${path}`], {
    cwd: ROOT,
    stdout: "pipe",
    stderr: "pipe",
  });
  if (result.exitCode !== 0)
    throw new Error(`cannot read HEAD baseline for ${path}: ${result.stderr.toString()}`);
  return result.stdout.toString();
}

function indexExports(fromHead: boolean) {
  const options = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
  };
  const host = ts.createCompilerHost(options);
  const readFile = host.readFile.bind(host);
  host.readFile = (path: string) => {
    const projectPath = relative(ROOT, path);
    if (fromHead && projectPath.startsWith("src/")) return sourceFromHead(projectPath);
    return readFile(path);
  };
  const program = ts.createProgram([resolve(ROOT, "src/index.ts")], options, host);
  const source = program.getSourceFile(resolve(ROOT, "src/index.ts"));
  if (!source) throw new Error("TypeScript compiler API could not load src/index.ts");
  const symbol = program.getTypeChecker().getSymbolAtLocation(source);
  if (!symbol) throw new Error("TypeScript compiler API could not resolve src/index.ts exports");
  return program
    .getTypeChecker()
    .getExportsOfModule(symbol)
    .map((item: any) => item.getName())
    .sort();
}

function extractApi(sources: Record<string, string>, fromHead = false) {
  const modules: Record<
    string,
    { exports: string[]; variants: Record<string, string[]>; sizeUnions: string[] }
  > = {};
  for (const [path, text] of Object.entries(sources)) {
    const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const exported = new Set<string>();
    const variants: Record<string, string[]> = {};
    const sizeUnions = new Set<string>();
    const visit = (node: any) => {
      if (
        ts.isExportDeclaration(node) &&
        node.exportClause &&
        ts.isNamedExports(node.exportClause)
      ) {
        for (const item of node.exportClause.elements) exported.add(item.name.text);
      }
      if (
        (ts.isFunctionDeclaration(node) ||
          ts.isClassDeclaration(node) ||
          ts.isInterfaceDeclaration(node) ||
          ts.isTypeAliasDeclaration(node) ||
          ts.isVariableStatement(node)) &&
        node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
      ) {
        if (ts.isVariableStatement(node)) {
          for (const declaration of node.declarationList.declarations)
            if (ts.isIdentifier(declaration.name)) exported.add(declaration.name.text);
        } else if (node.name) exported.add(node.name.text);
      }
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "cva"
      ) {
        const config = node.arguments[1];
        if (config && ts.isObjectLiteralExpression(config)) {
          const variantsProperty = config.properties.find(
            (property: any) =>
              ts.isPropertyAssignment(property) &&
              ts.isIdentifier(property.name) &&
              property.name.text === "variants",
          );
          if (variantsProperty && ts.isObjectLiteralExpression(variantsProperty.initializer)) {
            for (const variant of variantsProperty.initializer.properties) {
              if (
                ts.isPropertyAssignment(variant) &&
                ts.isObjectLiteralExpression(variant.initializer)
              ) {
                const name =
                  ts.isIdentifier(variant.name) || ts.isStringLiteral(variant.name)
                    ? variant.name.text
                    : "unknown";
                variants[name] = variant.initializer.properties
                  .map((property) =>
                    ts.isPropertyAssignment(property) &&
                    (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
                      ? property.name.text
                      : null,
                  )
                  .filter((value: string | null): value is string => value !== null)
                  .sort();
              }
            }
          }
        }
      }
      if (ts.isUnionTypeNode(node) && node.types.every(ts.isLiteralTypeNode)) {
        const literals = node.types
          .map((type) => (ts.isStringLiteral(type.literal) ? type.literal.text : null))
          .filter((value: string | null): value is string => value !== null);
        if (literals.length > 1) sizeUnions.add(literals.sort().join(" | "));
      }
      ts.forEachChild(node, visit);
    };
    visit(file);
    modules[path] = { exports: [...exported].sort(), variants, sizeUnions: [...sizeUnions].sort() };
  }
  modules["src/index.ts"].exports = indexExports(fromHead);
  return { extractor: "typescript-compiler-api", modules };
}

function readSources(fromHead = false) {
  return Object.fromEntries(
    apiFiles.map((path) => [
      path,
      fromHead ? sourceFromHead(path) : readFileSync(resolve(ROOT, path), "utf8"),
    ]),
  );
}

function lightTokens(css: string) {
  const block = css.match(/\.light\s*\{([\s\S]*?)\n\}/)?.[1];
  if (!block) throw new Error("could not locate .light token block");
  return Object.fromEntries(
    [...block.matchAll(/\s*(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
      name,
      normalize(value),
    ]),
  );
}

function writeBaseline() {
  mkdirSync(BASELINE, { recursive: true });
  const api = extractApi(readSources(true), true);
  const css = sourceFromHead("src/styles/globals.css");
  writeFileSync(resolve(BASELINE, "public-api.json"), `${JSON.stringify(api, null, 2)}\n`);
  writeFileSync(
    resolve(BASELINE, "light-tokens.json"),
    `${JSON.stringify(lightTokens(css), null, 2)}\n`,
  );
  console.log("wrote HEAD-provenance API and light-token baselines");
}

function verifyApiParity() {
  const path = resolve(BASELINE, "public-api.json");
  if (!existsSync(path)) throw new Error(`missing baseline: ${path}; run --write-baseline first`);
  const expected = JSON.parse(readFileSync(path, "utf8"));
  const actual = extractApi(readSources());
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `public API parity mismatch\nexpected: ${JSON.stringify(expected)}\nactual: ${JSON.stringify(actual)}`,
    );
  }
  console.log("TypeScript API parity passed");
}

function verifyLightBaseline() {
  const expected = JSON.parse(readFileSync(resolve(BASELINE, "light-tokens.json"), "utf8"));
  const actual = lightTokens(readFileSync(resolve(ROOT, "src/styles/globals.css"), "utf8"));
  if (JSON.stringify(actual) !== JSON.stringify(expected))
    throw new Error(".light token or shadow baseline changed");
  return expected as Record<string, string>;
}

function writeConsumers() {
  rmSync(CONSUMER, { recursive: true, force: true });
  mkdirSync(resolve(CONSUMER, "vite"), { recursive: true });
  const requiredVariable = missingVariable ? "" : "--qa-required-probe: ready;";
  const overrides = `
    :root { ${requiredVariable} --radius: 12px; --radius-md: 7px; --kood-font-sans: "Wanted Sans Variable", sans-serif; --kood-font-mono: "Jetendard", monospace; }
    .dark { --background: #102030; --foreground: #edf3f9; --card: #16212d; --popover: #243242; --border: #314255; --input: #647588; --kood-shadow-raised: 0 2px 4px rgb(0 0 0 / 20%); }
    .light { --radius: 12px; --radius-md: 7px; --kood-font-sans: "Pretendard Variable", sans-serif; --kood-font-mono: "Jetendard", monospace; }
    #probe { background: var(--background); color: var(--foreground); border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--kood-shadow-raised); font-family: var(--font-sans); padding: 12px; }
    #font-metrics { display: grid; gap: 4px; font-size: 24px; line-height: 32px; } #font-metrics [data-font="wanted"] { font-family: "Wanted Sans Variable", sans-serif; } #font-metrics [data-font="pretendard"] { font-family: "Pretendard Variable", sans-serif; }
  `;
  const fontLinks = missingFont
    ? `<link rel="stylesheet" href="${PRETENDARD_CSS}"><style>@font-face { font-family: "Wanted Sans Variable"; src: url("/missing-wanted-font.woff2") format("woff2"); }</style>`
    : `<link rel="stylesheet" href="${PRETENDARD_CSS}"><link rel="stylesheet" href="${WANTED_CSS}">`;
  const document = (stylesheetOrder: "correct" | "wrong") =>
    `<!doctype html><html class="dark"><head>${fontLinks}${
      stylesheetOrder === "wrong"
        ? `<style>${overrides}</style><link rel="stylesheet" href="/dist/globals.css">`
        : `<link rel="stylesheet" href="/dist/globals.css"><style>${overrides}</style>`
    }</head><body><main id="probe">한국어 consumer probe</main><section id="font-metrics"><span data-font="pretendard">Pretendard 한국ABC</span><span data-font="wanted">Wanted 한국ABC</span></section></body></html>`;
  writeFileSync(resolve(CONSUMER, "no-tailwind.html"), document("correct"));
  writeFileSync(resolve(CONSUMER, "wrong-stylesheet-order.html"), document("wrong"));
  writeFileSync(
    resolve(CONSUMER, "vite", "index.html"),
    `<!doctype html><html class="dark"><head>${fontLinks}</head><body><main id="probe">Vite consumer probe</main><script type="module" src="/src.ts"></script></body></html>`,
  );
  writeFileSync(
    resolve(CONSUMER, "vite", "src.ts"),
    `import "../../../../../dist/globals.css"; import "./overrides.css";`,
  );
  writeFileSync(resolve(CONSUMER, "vite", "overrides.css"), overrides);
  writeFileSync(
    resolve(CONSUMER, "vite", "vite.config.ts"),
    `import { defineConfig } from "vite";\nimport tailwindcss from "@tailwindcss/vite";\nexport default defineConfig({ base: "./", root: new URL(".", import.meta.url).pathname, plugins: [tailwindcss()] });\n`,
  );
}

async function buildViteConsumer() {
  const result = Bun.spawnSync(
    [
      "pnpm",
      "exec",
      "vite",
      "build",
      "--config",
      ".omo/evidence/kood-internal-charcoal/task-7-consumer/vite/vite.config.ts",
      "--outDir",
      "../vite-dist",
    ],
    { cwd: ROOT, stdout: "pipe", stderr: "pipe" },
  );
  writeFileSync(
    resolve(EVIDENCE, "task-7-vite-build.log"),
    `${result.stdout.toString()}${result.stderr.toString()}`,
  );
  if (result.exitCode !== 0)
    throw new Error(`Vite consumer build failed: ${result.stderr.toString()}`);
}

class Cdp {
  private id = 0;
  private pending = new Map<
    number,
    { resolve: (value: Record<string, unknown>) => void; reject: (error: Error) => void }
  >();
  private listeners = new Map<string, Set<(params: Record<string, unknown>) => void>>();
  constructor(private socket: WebSocket) {
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data)) as CdpMessage;
      if (message.id !== undefined) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        message.error
          ? pending.reject(new Error(message.error.message))
          : pending.resolve(message.result ?? {});
        return;
      }
      if (message.method)
        for (const listener of this.listeners.get(message.method) ?? [])
          listener(message.params ?? {});
    });
  }
  command(method: string, params: Record<string, unknown> = {}) {
    const id = ++this.id;
    return new Promise<Record<string, unknown>>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
  next(method: string) {
    return new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`timed out waiting for ${method}`)), TIMEOUT);
      const listener = () => {
        clearTimeout(timer);
        this.listeners.get(method)?.delete(listener);
        resolve();
      };
      const listeners = this.listeners.get(method) ?? new Set();
      listeners.add(listener);
      this.listeners.set(method, listeners);
    });
  }
  close() {
    this.socket.close();
  }
}

async function waitForChromeReady(stream: ReadableStream<Uint8Array> | null) {
  assert(stream, "Chrome stderr pipe is unavailable");
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  return new Promise<void>((resolvePromise, reject) => {
    let output = "";
    const timer = setTimeout(
      () => reject(new Error(`Chrome CDP did not become ready: ${output}`)),
      TIMEOUT,
    );
    const read = async (): Promise<void> => {
      const { done, value } = await reader.read();
      if (done) {
        clearTimeout(timer);
        reject(new Error(`Chrome exited before CDP was ready: ${output}`));
        return;
      }
      output += decoder.decode(value, { stream: true });
      if (output.includes("DevTools listening on")) {
        clearTimeout(timer);
        reader.releaseLock();
        resolvePromise();
        return;
      }
      await read();
    };
    void read();
  });
}

async function connect(url: string) {
  const socket = new WebSocket(url);
  await new Promise<void>((resolvePromise, reject) => {
    const timer = setTimeout(() => reject(new Error("CDP WebSocket timeout")), TIMEOUT);
    socket.addEventListener(
      "open",
      () => {
        clearTimeout(timer);
        resolvePromise();
      },
      { once: true },
    );
    socket.addEventListener(
      "error",
      () => {
        clearTimeout(timer);
        reject(new Error("CDP WebSocket failed"));
      },
      { once: true },
    );
  });
  return new Cdp(socket);
}

async function browserValue<T>(cdp: Cdp, expression: string): Promise<T> {
  const response = await cdp.command("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (response.exceptionDetails)
    throw new Error(`browser evaluation failed: ${JSON.stringify(response.exceptionDetails)}`);
  return (response.result as { value: T }).value;
}

async function navigate(cdp: Cdp, url: string) {
  const loaded = cdp.next("Page.loadEventFired");
  await cdp.command("Page.navigate", { url });
  await loaded;
  await browserValue(
    cdp,
    `new Promise((resolve, reject) => { if (document.readyState === "complete" && document.querySelector("#probe")) return resolve(true); const observer = new MutationObserver(() => { if (document.querySelector("#probe")) { observer.disconnect(); clearTimeout(timer); resolve(true); } }); observer.observe(document.documentElement, { childList: true, subtree: true }); const timer = setTimeout(() => { observer.disconnect(); reject(new Error("consumer probe did not render")); }, ${TIMEOUT}); })`,
  );
}

async function screenshot(cdp: Cdp, name: string) {
  const image = await cdp.command("Page.captureScreenshot", { format: "png" });
  writeFileSync(resolve(EVIDENCE, name), Buffer.from(image.data as string, "base64"));
}

async function verifyRealFonts(cdp: Cdp) {
  return browserValue<
    Record<
      string,
      { requested: number; loaded: number; check: boolean; width: number; height: number }
    >
  >(
    cdp,
    `(() => { const sample = "한국ABC"; const verify = async (family, selector) => { try { const requested = await document.fonts.load('24px "' + family + '"', sample); const faces = Array.from(document.fonts).filter((face) => face.family.includes(family)); const loaded = faces.filter((face) => face.status === "loaded"); const element = document.querySelector(selector); const context = document.createElement("canvas").getContext("2d"); if (!context || !element) throw new Error("missing metrics probe"); context.font = '24px "' + family + '"'; const metrics = context.measureText(sample); if (requested.length === 0 || loaded.length === 0 || !document.fonts.check('24px "' + family + '"', sample) || metrics.width <= 0 || metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent <= 0) throw new Error("incomplete font result"); return { requested: requested.length, loaded: loaded.length, check: document.fonts.check('24px "' + family + '"', sample), width: metrics.width, height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent }; } catch { throw new Error('required font asset ' + family + ' failed for Korean/Latin sample'); } }; return Promise.all([verify("Pretendard Variable", '[data-font="pretendard"]'), verify("Wanted Sans Variable", '[data-font="wanted"]')]).then(([pretendard, wanted]) => ({ pretendard, wanted })); })()`,
  );
}

async function runBrowser(lightBaseline: Record<string, string>) {
  const server = Bun.serve({ hostname: "127.0.0.1", port: PORT, routes: { "/*": { dir: ROOT } } });
  const profile = await mkdtemp(resolve(tmpdir(), "kood-task-7-chrome-"));
  const chrome = Bun.spawn(
    [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "--headless=new",
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "about:blank",
    ],
    { stdout: "ignore", stderr: "pipe" },
  );
  let cdp: Cdp | undefined;
  try {
    await waitForChromeReady(chrome.stderr);
    const response = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error(`Chrome CDP target creation failed: ${response.status}`);
    const target = (await response.json()) as { webSocketDebuggerUrl: string };
    cdp = await connect(target.webSocketDebuggerUrl);
    await cdp.command("Page.enable");
    await cdp.command("Runtime.enable");
    await cdp.command("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const probe = async (path: string) => {
      await navigate(
        cdp!,
        `http://127.0.0.1:${PORT}/.omo/evidence/kood-internal-charcoal/task-7-consumer/${path}`,
      );
      return browserValue<Record<string, string | boolean>>(
        cdp!,
        `(() => { const style = getComputedStyle(document.querySelector("#probe")); const root = getComputedStyle(document.documentElement); return { background: style.backgroundColor, color: style.color, border: style.borderTopColor, radius: style.borderTopLeftRadius, font: style.fontFamily, shadow: style.boxShadow, xs: (() => { const el = document.createElement("i"); el.style.borderRadius = "var(--radius-xs)"; document.body.append(el); const value = getComputedStyle(el).borderTopLeftRadius; el.remove(); return value; })(), sm: (() => { const el = document.createElement("i"); el.style.borderRadius = "var(--radius-sm)"; document.body.append(el); const value = getComputedStyle(el).borderTopLeftRadius; el.remove(); return value; })(), lg: (() => { const el = document.createElement("i"); el.style.borderRadius = "var(--radius-lg)"; document.body.append(el); const value = getComputedStyle(el).borderTopLeftRadius; el.remove(); return value; })(), xl: (() => { const el = document.createElement("i"); el.style.borderRadius = "var(--radius-xl)"; document.body.append(el); const value = getComputedStyle(el).borderTopLeftRadius; el.remove(); return value; })(), xxl: (() => { const el = document.createElement("i"); el.style.borderRadius = "var(--radius-2xl)"; document.body.append(el); const value = getComputedStyle(el).borderTopLeftRadius; el.remove(); return value; })(), wantedLoaded: Array.from(document.fonts).some((face) => face.family.includes("Wanted Sans Variable") && face.status === "loaded"), requiredVariable: root.getPropertyValue("--qa-required-probe").trim(), rootBackground: root.getPropertyValue("--background").trim() }; })()`,
      );
    };
    const direct = await probe("no-tailwind.html");
    const expected = {
      background: "rgb(16, 32, 48)",
      color: "rgb(237, 243, 249)",
      border: "rgb(49, 66, 85)",
      radius: "7px",
      xs: "6px",
      sm: "9px",
      lg: "18px",
      xl: "24px",
      xxl: "36px",
    };
    for (const [key, value] of Object.entries(expected))
      assert(
        direct[key] === value,
        `direct built CSS ${key}: expected ${value}, got ${direct[key]}`,
      );
    assert(
      String(direct.font).includes("Wanted Sans Variable"),
      `font hook did not apply: ${direct.font}`,
    );
    assert(
      direct.requiredVariable === "ready",
      "required QA variable --qa-required-probe is missing",
    );
    const fontMetrics = await verifyRealFonts(cdp);
    direct.wantedLoaded = fontMetrics.wanted.loaded > 0;
    await screenshot(cdp, "task-7-font-metrics-dark.png");
    const radii: Record<string, string[]> = {};
    for (const [base, expectedValues] of Object.entries({
      0: ["0px", "0px", "0px", "0px", "0px", "0px"],
      4: ["2px", "3px", "4px", "6px", "8px", "12px"],
      8: ["4px", "6px", "8px", "12px", "16px", "24px"],
      12: ["6px", "9px", "12px", "18px", "24px", "36px"],
    })) {
      const values = await browserValue<string[]>(
        cdp,
        `(() => { document.documentElement.style.setProperty("--radius", "${base}px"); document.documentElement.style.setProperty("--radius-md", "var(--radius)"); return ["--radius-xs", "--radius-sm", "--radius-md", "--radius-lg", "--radius-xl", "--radius-2xl"].map((name) => { const el = document.createElement("i"); el.style.borderRadius = "var(" + name + ")"; document.body.append(el); const value = getComputedStyle(el).borderTopLeftRadius; el.remove(); return value; }); })()`,
      );
      assert(
        JSON.stringify(values) === JSON.stringify(expectedValues),
        `base ${base} radius mismatch: ${values}`,
      );
      radii[base] = values;
    }
    await browserValue(cdp, `document.documentElement.removeAttribute("style")`);
    const wrong = await probe("wrong-stylesheet-order.html");
    assert(
      wrong.background !== "rgb(16, 32, 48)",
      "negative wrong-stylesheet-order fixture was not detected",
    );
    await navigate(
      cdp,
      `http://127.0.0.1:${PORT}/.omo/evidence/kood-internal-charcoal/task-7-consumer/vite-dist/index.html`,
    );
    const vite = await browserValue<Record<string, string>>(
      cdp,
      `(() => { const style = getComputedStyle(document.querySelector("#probe")); return { background: style.backgroundColor, radius: style.borderTopLeftRadius, font: style.fontFamily }; })()`,
    );
    assert(
      vite.background === "rgb(16, 32, 48)" &&
        vite.radius === "7px" &&
        vite.font.includes("Wanted Sans Variable"),
      `Vite built CSS consumer mismatch: ${JSON.stringify(vite)}`,
    );
    const missingAsset = await fetch(`http://127.0.0.1:${PORT}/dist/missing-kood-asset.css`);
    assert(
      missingAsset.status === 404,
      `negative missing-asset fixture expected 404, got ${missingAsset.status}`,
    );
    await navigate(
      cdp,
      `http://127.0.0.1:${PORT}/.omo/evidence/kood-internal-charcoal/task-7-consumer/no-tailwind.html`,
    );
    await browserValue(cdp, `document.documentElement.className = "light"`);
    const light = await browserValue<Record<string, string>>(
      cdp,
      `(() => { const style = getComputedStyle(document.documentElement); return Object.fromEntries(${JSON.stringify(Object.keys(lightBaseline))}.map((name) => [name, style.getPropertyValue(name).trim()])); })()`,
    );
    for (const [name, expectedValue] of Object.entries(lightBaseline)) {
      if (name === "--radius" || name.startsWith("--kood-font-") || name.startsWith("--duration-"))
        continue;
      assert(
        normalize(light[name]) === expectedValue,
        `light baseline ${name} mismatch: ${light[name]}`,
      );
    }
    const image = await cdp.command("Page.captureScreenshot", { format: "png" });
    writeFileSync(
      resolve(EVIDENCE, "task-7-consumer-light.png"),
      Buffer.from(image.data as string, "base64"),
    );
    const fontImage = await cdp.command("Page.captureScreenshot", { format: "png" });
    writeFileSync(
      resolve(EVIDENCE, "task-7-font-metrics-light.png"),
      Buffer.from(fontImage.data as string, "base64"),
    );
    return {
      fontSources: { pretendard: PRETENDARD_CSS, wanted: WANTED_CSS },
      direct,
      fontMetrics,
      radii,
      wrongStylesheetOrder: wrong,
      vite,
      fontSetup: { wantedLoaded: direct.wantedLoaded, limitation: null },
    };
  } finally {
    cdp?.close();
    chrome.kill();
    try {
      await chrome.exited;
    } catch {
      /* process may already be gone */
    }
    await server.stop(true);
    rmSync(profile, { recursive: true, force: true });
  }
}

async function main() {
  if (process.argv.includes("--write-baseline")) return writeBaseline();
  if (process.argv.includes("--api-parity")) return verifyApiParity();
  verifyApiParity();
  const lightBaseline = verifyLightBaseline();
  assert(
    existsSync(resolve(ROOT, "dist/globals.css")),
    "dist/globals.css is missing; run pnpm build first",
  );
  writeConsumers();
  await buildViteConsumer();
  const report = {
    task: 7,
    apiParity: "passed",
    lightBaseline: "passed",
    consumers: await runBrowser(lightBaseline),
  };
  writeFileSync(resolve(EVIDENCE, "task-7-consumer.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log("customization QA passed");
}

await main();
