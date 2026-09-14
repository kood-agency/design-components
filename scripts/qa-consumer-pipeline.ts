import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

declare const Bun: any;

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const DIST = resolve(ROOT, process.env.QA_KOOD_DIST ?? "dist");
const EVIDENCE = resolve(ROOT, ".omo/evidence/korean-saas-v2/consumer-pipeline");
const PORT = Number(process.env.QA_PORT ?? 6181);
const CDP_PORT = Number(process.env.QA_CDP_PORT ?? 9281);
const TIMEOUT = 15_000;
const expectFail = process.argv.includes("--expect-fail");

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

type CdpMessage = {
  id?: number;
  method?: string;
  params?: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: { message: string };
};

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
    return new Promise<Record<string, unknown>>((resolvePromise, reject) => {
      this.pending.set(id, { resolve: resolvePromise, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  next(method: string) {
    return new Promise<void>((resolvePromise, reject) => {
      const timer = setTimeout(() => reject(new Error(`timed out waiting for ${method}`)), TIMEOUT);
      const listener = () => {
        clearTimeout(timer);
        this.listeners.get(method)?.delete(listener);
        resolvePromise();
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
    const timer = setTimeout(() => reject(new Error("Chrome CDP WebSocket timeout")), TIMEOUT);
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
        reject(new Error("Chrome CDP WebSocket failed"));
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
    `new Promise((resolve, reject) => { if (document.readyState === "complete" && document.querySelector("#kood-control")) return resolve(true); const observer = new MutationObserver(() => { if (document.querySelector("#kood-control")) { observer.disconnect(); clearTimeout(timer); resolve(true); } }); observer.observe(document.documentElement, { childList: true, subtree: true }); const timer = setTimeout(() => { observer.disconnect(); reject(new Error("consumer fixture did not render")); }, ${TIMEOUT}); })`,
  );
}

type FixtureCase = {
  name: "kood-first" | "consumer-radius-override" | "reverse-import";
  css: string;
  expectedButtonRadius?: string;
  overrideOrder?: "after-kood" | "before-kood";
};

type FixtureValues = Record<string, string>;
const CONSUMER_OVERRIDE = {
  marker: "present",
  radius: "12px",
  radiusMd: "7px",
  fontSans: '"Consumer Sans", sans-serif',
  fontMono: '"Consumer Mono", monospace',
};
type Failure = {
  case: string;
  theme: string;
  family: "radius" | "font" | "border";
  message: string;
};

const FIXTURES: FixtureCase[] = [
  {
    name: "kood-first",
    css: `@import "__KOOD_STYLES__";\n@import "tailwindcss";\n@source "./src.tsx";\n`,
  },
  {
    name: "consumer-radius-override",
    css: `@import "__KOOD_STYLES__";\n@import "tailwindcss";\n@import "./consumer-override.css";\n@source "./src.tsx";\n`,
    expectedButtonRadius: CONSUMER_OVERRIDE.radiusMd,
    overrideOrder: "after-kood",
  },
  {
    name: "reverse-import",
    css: `@import "./consumer-override.css";\n@import "__KOOD_STYLES__";\n@import "tailwindcss";\n@source "./src.tsx";\n`,
    overrideOrder: "before-kood",
  },
];

function fixtureDirectory(fixture: FixtureCase) {
  return resolve(EVIDENCE, fixture.name);
}

function writeFixture(fixture: FixtureCase) {
  if (!existsSync(resolve(DIST, "globals.css")) || !existsSync(resolve(DIST, "styles.css")))
    throw new Error(`missing package stylesheet in ${DIST}`);
  const directory = fixtureDirectory(fixture);
  mkdirSync(directory, { recursive: true });
  const stylesheet = resolve(DIST, "styles.css").split("\\").join("/");
  const entry = resolve(DIST, "index.js").split("\\").join("/");
  writeFileSync(
    resolve(directory, "index.html"),
    `<!doctype html><html class="dark"><head><meta charset="utf-8" /><script type="module" src="/src.tsx"></script></head><body><div id="root"></div></body></html>`,
  );
  writeFileSync(
    resolve(directory, "src.tsx"),
    `import * as React from "react";\nimport { createRoot } from "react-dom/client";\nimport { Button, Card, SidebarHeader, SidebarFooter, Table, TableBody, TableFooter, TableRow, TableCell } from ${JSON.stringify(entry)};\nimport "./consumer.css";\n\ncreateRoot(document.querySelector("#root")!).render(\n  <main id="kood-control" className="font-sans border-b">\n    <Button id="kood-button">Kood Button</Button>\n    <Card id="kood-card">Kood Card</Card>\n    <section id="kood-sidebar">\n      <SidebarHeader id="kood-sidebar-header" className="border-b">Sidebar header</SidebarHeader>\n      <SidebarFooter id="kood-sidebar-footer" className="border-t">Sidebar footer</SidebarFooter>\n    </section>\n    <Table id="kood-table">\n      <TableBody><TableRow><TableCell>Row</TableCell></TableRow></TableBody>\n      <TableFooter id="kood-table-footer"><TableRow><TableCell>Footer</TableCell></TableRow></TableFooter>\n    </Table>\n  </main>,\n);\n`,
  );
  writeFileSync(
    resolve(directory, "consumer.css"),
    fixture.css.replace("__KOOD_STYLES__", stylesheet),
  );
  writeFileSync(
    resolve(directory, "consumer-override.css"),
    `:root,\n.light,\n.dark {\n  --consumer-fixture-override: ${CONSUMER_OVERRIDE.marker};\n  --radius: ${CONSUMER_OVERRIDE.radius};\n  --radius-md: ${CONSUMER_OVERRIDE.radiusMd};\n  --kood-font-sans: ${CONSUMER_OVERRIDE.fontSans};\n  --kood-font-mono: ${CONSUMER_OVERRIDE.fontMono};\n}\n`,
  );
  writeFileSync(
    resolve(directory, "vite.config.ts"),
    `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport tailwindcss from "@tailwindcss/vite";\nexport default defineConfig({ root: new URL(".", import.meta.url).pathname, plugins: [react(), tailwindcss()] });\n`,
  );
  return directory;
}

function buildFixture(directory: string) {
  const result = Bun.spawnSync(
    [
      "pnpm",
      "exec",
      "vite",
      "build",
      "--config",
      resolve(directory, "vite.config.ts"),
      "--outDir",
      resolve(directory, "dist"),
    ],
    { cwd: ROOT, stdout: "pipe", stderr: "pipe" },
  );
  const output = `${result.stdout.toString()}${result.stderr.toString()}`;
  writeFileSync(resolve(directory, "vite-build.log"), output);
  if (result.exitCode !== 0) throw new Error(`Vite consumer build failed:\n${output}`);
}

function failuresFor(fixture: FixtureCase, theme: string, values: FixtureValues) {
  const failures: Failure[] = [];
  const expectedButtonRadius = fixture.expectedButtonRadius ?? values.radius;
  const expectedCardRadius = `${Number.parseFloat(values.radius) * 1.5}px`;
  const expect = (condition: boolean, family: Failure["family"], message: string) => {
    if (!condition) failures.push({ case: fixture.name, theme, family, message });
  };
  expect(
    values.buttonRadius === expectedButtonRadius,
    "radius",
    `Button rounded-md expected ${expectedButtonRadius}, got ${values.buttonRadius}`,
  );
  expect(
    values.cardRadius === expectedCardRadius,
    "radius",
    `Card rounded-lg expected ${expectedCardRadius}, got ${values.cardRadius}`,
  );
  if (!fixture.expectedButtonRadius)
    expect(
      values.radiusMd === values.radius,
      "radius",
      `--radius-md expected ${values.radius}, got ${values.radiusMd}`,
    );
  if (fixture.overrideOrder) {
    expect(
      values.consumerOverrideMarker === CONSUMER_OVERRIDE.marker,
      "radius",
      `${fixture.name} must include a consumer override stylesheet`,
    );
    const overrideWins = fixture.overrideOrder === "after-kood";
    const expected = (value: string, override: string, family: Failure["family"], label: string) =>
      expect(
        overrideWins
          ? normalize(value) === normalize(override)
          : normalize(value) !== normalize(override),
        family,
        overrideWins
          ? `${fixture.name} must let the post-kood consumer override win for ${label}`
          : `${fixture.name} must not let the pre-kood consumer override win for ${label}`,
      );
    expected(values.radius, CONSUMER_OVERRIDE.radius, "radius", "--radius");
    expected(values.radiusMd, CONSUMER_OVERRIDE.radiusMd, "radius", "--radius-md");
    expected(values.koodFontSans, CONSUMER_OVERRIDE.fontSans, "font", "--kood-font-sans");
    expected(values.koodFontMono, CONSUMER_OVERRIDE.fontMono, "font", "--kood-font-mono");
  }
  expect(
    normalize(values.fontSans) === normalize(values.koodFontSans),
    "font",
    `--font-sans does not alias --kood-font-sans`,
  );
  expect(
    values.controlFont === values.expectedFont,
    "font",
    "app font-sans does not resolve to --font-sans",
  );
  for (const [element, color] of Object.entries({
    app: values.controlBorder,
    sidebarHeader: values.sidebarHeaderBorder,
    sidebarFooter: values.sidebarFooterBorder,
    tableFooter: values.tableFooterBorder,
  }))
    expect(
      color === values.expectedBorder,
      "border",
      `${element} border expected ${values.expectedBorder}, got ${color}`,
    );
  return failures;
}

async function verifyFixture(fixture: FixtureCase, directory: string) {
  const server = Bun.serve({
    hostname: "127.0.0.1",
    port: PORT,
    routes: { "/*": { dir: resolve(directory, "dist") } },
  });
  const profile = await mkdtemp(resolve(tmpdir(), "kood-consumer-pipeline-"));
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
    const targetResponse = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`, {
      method: "PUT",
    });
    if (!targetResponse.ok)
      throw new Error(`Chrome CDP target creation failed: ${targetResponse.status}`);
    const target = (await targetResponse.json()) as { webSocketDebuggerUrl: string };
    cdp = await connect(target.webSocketDebuggerUrl);
    await cdp.command("Page.enable");
    await cdp.command("Runtime.enable");
    await navigate(cdp, `http://127.0.0.1:${PORT}/index.html`);

    const result: Record<string, FixtureValues> = {};
    const failures: Failure[] = [];
    for (const theme of ["dark", "light"]) {
      result[theme] = await browserValue<FixtureValues>(
        cdp,
        `(() => { document.documentElement.className = ${JSON.stringify(theme)}; const root = getComputedStyle(document.documentElement); const style = (id) => getComputedStyle(document.querySelector(id)); const control = style("#kood-control"); const button = style("#kood-button"); const card = style("#kood-card"); const probe = document.createElement("i"); probe.style.cssText = "border-color:var(--border);font-family:var(--font-sans)"; document.body.append(probe); const probeStyle = getComputedStyle(probe); const result = { radius: root.getPropertyValue("--radius").trim(), radiusMd: root.getPropertyValue("--radius-md").trim(), fontSans: root.getPropertyValue("--font-sans").trim(), fontMono: root.getPropertyValue("--font-mono").trim(), koodFontSans: root.getPropertyValue("--kood-font-sans").trim(), koodFontMono: root.getPropertyValue("--kood-font-mono").trim(), consumerOverrideMarker: root.getPropertyValue("--consumer-fixture-override").trim(), buttonRadius: button.borderTopLeftRadius, cardRadius: card.borderTopLeftRadius, controlFont: control.fontFamily, controlBorder: control.borderBottomColor, sidebarHeaderBorder: style("#kood-sidebar-header").borderBottomColor, sidebarFooterBorder: style("#kood-sidebar-footer").borderTopColor, tableFooterBorder: style("#kood-table-footer").borderTopColor, expectedFont: probeStyle.fontFamily, expectedBorder: probeStyle.borderTopColor }; probe.remove(); return result; })()`,
      );
      failures.push(...failuresFor(fixture, theme, result[theme]));
    }
    return { result, failures };
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
  if (process.argv.slice(2).some((argument) => argument !== "--expect-fail"))
    throw new Error(`unsupported qa-consumer-pipeline option: ${process.argv.slice(2).join(" ")}`);
  rmSync(EVIDENCE, { recursive: true, force: true });
  mkdirSync(EVIDENCE, { recursive: true });
  const cases: Record<string, { result: Record<string, FixtureValues>; failures: Failure[] }> = {};
  try {
    for (const fixture of FIXTURES) {
      const directory = writeFixture(fixture);
      buildFixture(directory);
      cases[fixture.name] = await verifyFixture(fixture, directory);
    }
    const failures = Object.values(cases).flatMap((fixture) => fixture.failures);
    const report = { dist: DIST, cases, failures };
    writeFileSync(resolve(EVIDENCE, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
    if (expectFail) {
      const requiredFamilies: Failure["family"][] = ["radius", "font", "border"];
      const missing = requiredFamilies.filter(
        (family) =>
          !failures.some((failure) => failure.case === "kood-first" && failure.family === family),
      );
      if (missing.length > 0)
        throw new Error(
          `old dist must fail kood-first radius, font, and border contracts; missing: ${missing.join(", ")}`,
        );
      console.log("consumer pipeline failed as expected with radius, font, and border failures");
      return;
    }
    if (failures.length > 0)
      throw new Error(`consumer pipeline contract failures: ${JSON.stringify(failures)}`);
    console.log(
      "consumer pipeline passed in kood-first, consumer override, and reverse-import cases",
    );
  } catch (error) {
    const report = { dist: DIST, cases, error: String(error) };
    writeFileSync(resolve(EVIDENCE, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
    if (!expectFail) throw error;
    throw error;
  }
}

await main();
