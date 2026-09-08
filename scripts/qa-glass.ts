import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const EVIDENCE = resolve(
  ROOT,
  process.env.QA_GLASS_EVIDENCE ?? ".omo/evidence/kood-glass-variants/task-3",
);
const FIXTURE = resolve(EVIDENCE, "runtime-fixture");
const FIXTURE_URL = `/${relative(ROOT, FIXTURE).replaceAll("\\", "/")}`;
const TIMEOUT = 15_000;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASELINE_TOKENS = {
  dark: {
    buttonBackground: "rgb(231, 238, 246)",
    buttonColor: "rgb(13, 17, 23)",
    cardBackground: "rgb(22, 27, 34)",
    cardColor: "rgb(243, 247, 251)",
  },
  light: {
    buttonBackground: "rgb(10, 23, 36)",
    buttonColor: "rgb(255, 255, 255)",
    cardBackground: "rgb(255, 255, 255)",
    cardColor: "rgb(10, 23, 36)",
  },
} as const;

type CdpMessage = {
  id?: number;
  method?: string;
  params?: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: { message: string };
};

type Assertion = {
  name: string;
  pass: boolean;
  actual: unknown;
  expected: unknown;
};

type BrowserRun = {
  kind: "baseline" | "material";
  port: number;
  browser: Record<string, unknown>;
  cases: Record<string, unknown>[];
  screenshots: string[];
  assertions: Assertion[];
  cleanup: Record<string, boolean>;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function writeJson(name: string, value: unknown) {
  writeFileSync(resolve(EVIDENCE, name), `${JSON.stringify(value, null, 2)}\n`);
}

function parseArgs() {
  const phaseIndex = process.argv.indexOf("--phase");
  const familyIndex = process.argv.indexOf("--family");
  const phase = phaseIndex === -1 ? undefined : process.argv[phaseIndex + 1];
  const family = familyIndex === -1 ? undefined : process.argv[familyIndex + 1];
  if (phase !== "foundation" || (family !== "1" && family !== "3"))
    throw new Error("usage: bun scripts/qa-glass.ts --phase foundation --family 1|3");
  return { phase, family } as const;
}

class Cdp {
  private id = 0;
  private pending = new Map<
    number,
    {
      resolve: (value: Record<string, unknown>) => void;
      reject: (error: Error) => void;
      timer: ReturnType<typeof setTimeout>;
    }
  >();
  private listeners = new Map<string, Set<(params: Record<string, unknown>) => void>>();
  private readonly eventLog: { method: string; params: Record<string, unknown> }[] = [];

  constructor(private readonly socket: WebSocket) {
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data)) as CdpMessage;
      if (message.id !== undefined) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        clearTimeout(pending.timer);
        message.error
          ? pending.reject(new Error(message.error.message))
          : pending.resolve(message.result ?? {});
        return;
      }
      if (message.method) {
        if (
          ["Runtime.exceptionThrown", "Runtime.consoleAPICalled", "Log.entryAdded"].includes(
            message.method,
          )
        )
          this.eventLog.push({ method: message.method, params: message.params ?? {} });
        for (const listener of this.listeners.get(message.method) ?? [])
          listener(message.params ?? {});
      }
    });
  }

  events() {
    return this.eventLog;
  }

  command(method: string, params: Record<string, unknown> = {}) {
    const id = ++this.id;
    return new Promise<Record<string, unknown>>((resolvePromise, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`timed out waiting for CDP command ${method}`));
      }, TIMEOUT);
      this.pending.set(id, { resolve: resolvePromise, reject, timer });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  next(method: string) {
    return new Promise<void>((resolvePromise, reject) => {
      const timer = setTimeout(() => {
        this.listeners.get(method)?.delete(listener);
        reject(new Error(`timed out waiting for ${method}`));
      }, TIMEOUT);
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
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(new Error("CDP connection closed"));
    }
    this.pending.clear();
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

async function evaluate<T>(cdp: Cdp, expression: string): Promise<T> {
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
  try {
    await evaluate(
      cdp,
      `new Promise((resolvePromise, reject) => {
        const ready = () => document.readyState === "complete" && Boolean(document.querySelector("#qa-root"));
        if (ready()) return resolvePromise(true);
        const observer = new MutationObserver(() => {
          if (ready()) {
            observer.disconnect();
            clearTimeout(timer);
            resolvePromise(true);
          }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
        const timer = setTimeout(() => {
          observer.disconnect();
          reject(new Error("glass fixture did not render"));
        }, ${TIMEOUT});
      })`,
    );
  } catch (error) {
    const state = await evaluate<unknown>(
      cdp,
      `({ body: document.body.innerHTML, errors: globalThis.__qaErrors ?? [] })`,
    );
    throw new Error(
      `${String(error)}\nfixture state: ${JSON.stringify(state)}\nCDP events: ${JSON.stringify(cdp.events())}`,
    );
  }
}

async function capture(cdp: Cdp, name: string) {
  const image = await cdp.command("Page.captureScreenshot", { format: "png" });
  writeFileSync(resolve(EVIDENCE, name), Buffer.from(image.data as string, "base64"));
  return name;
}

function fixtureSource() {
  const button = JSON.stringify(resolve(ROOT, "src/components/ui/button.tsx"));
  const card = JSON.stringify(resolve(ROOT, "src/components/ui/card.tsx"));
  return `import * as React from "react";
import { createRoot } from "react-dom/client";
import { Button } from ${button};
import { Card, CardContent, CardHeader, CardTitle } from ${card};

function App() {
  const [count, setCount] = React.useState(0);
  return <main id="qa-root">
    <section data-testid="component-baseline" className="component-baseline">
      <Button onClick={() => setCount((value) => value + 1)}>Original button</Button>
      <output data-testid="button-count">{count}</output>
      <Card><CardHeader><CardTitle>Original card</CardTitle></CardHeader><CardContent>Unchanged default surface</CardContent></Card>
    </section>
    <section data-testid="material-fixture" className="material-fixture">
      <div data-testid="glass" className="kood-glass">Normal glass material</div>
      <div data-testid="glass-strong" className="kood-glass-strong">Strong glass material</div>
    </section>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
`;
}

async function prepareFixture() {
  assert(
    existsSync(resolve(ROOT, "dist/globals.css")),
    "dist/globals.css is missing; run pnpm build first",
  );
  mkdirSync(FIXTURE, { recursive: true });
  const entry = resolve(FIXTURE, "app.tsx");
  writeFileSync(entry, fixtureSource());
  const build = await Bun.build({
    entrypoints: [entry],
    outdir: FIXTURE,
    target: "browser",
    naming: "app.js",
  });
  if (!build.success) throw new Error(build.logs.map((log) => log.message).join("\n"));
  writeFileSync(
    resolve(FIXTURE, "index.html"),
    `<!doctype html><html class="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/dist/globals.css"><style>
      body { margin: 0; min-height: 100vh; background: linear-gradient(135deg, #315c9f, #6bcb91 48%, #e4b45b); }
      #qa-root { display: grid; gap: 32px; padding: 32px; }
      .component-baseline, .material-fixture { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
      .material-fixture { padding: 24px; border: 1px solid var(--border); border-radius: var(--radius-lg); background: rgb(255 255 255 / 12%); }
      [data-testid="glass"], [data-testid="glass-strong"] { min-width: 220px; border: 1px solid var(--input); border-radius: var(--radius-md); color: var(--foreground); padding: 24px; font-weight: 600; }
    </style></head><body><div id="root"></div><script>globalThis.__qaErrors=[];addEventListener("error",event=>globalThis.__qaErrors.push(String(event.error??event.message)));</script><script type="module" src="${FIXTURE_URL}/app.js"></script></body></html>`,
  );
}

function check(name: string, actual: unknown, expected: unknown, condition: boolean): Assertion {
  return { name, pass: condition, actual, expected };
}

async function runBaseline(cdp: Cdp, port: number) {
  const assertions: Assertion[] = [];
  const cases: Record<string, unknown>[] = [];
  const screenshots: string[] = [];
  for (const theme of ["dark", "light"] as const) {
    for (const width of [375, 1280]) {
      await cdp.command("Emulation.setDeviceMetricsOverride", {
        width,
        height: width === 375 ? 812 : 900,
        deviceScaleFactor: 1,
        mobile: width === 375,
      });
      await navigate(cdp, `http://127.0.0.1:${port}${FIXTURE_URL}/index.html`);
      await evaluate(
        cdp,
        `new Promise((resolvePromise) => { document.documentElement.className = ${JSON.stringify(theme)}; requestAnimationFrame(() => requestAnimationFrame(resolvePromise)); })`,
      );
      const value = await evaluate<{
        buttonSlot: string | null;
        variant: string | null;
        cardSlot: string | null;
        buttonBackground: string;
        buttonColor: string;
        buttonOpacity: string;
        cardBackground: string;
        cardColor: string;
        cardOpacity: string;
        count: string | null;
        viewport: number;
      }>(
        cdp,
        `(async () => {
          const button = document.querySelector('[data-slot="button"]');
          const card = document.querySelector('[data-slot="card"]');
          const count = document.querySelector('[data-testid="button-count"]');
          await new Promise((resolvePromise, reject) => {
            const observer = new MutationObserver(() => {
              if (count?.textContent === "1") {
                observer.disconnect();
                clearTimeout(timer);
                resolvePromise(true);
              }
            });
            observer.observe(count, { childList: true, characterData: true, subtree: true });
            const timer = setTimeout(() => {
              observer.disconnect();
              reject(new Error("Original Button did not activate exactly once"));
            }, ${TIMEOUT});
            button?.click();
          });
          const buttonStyle = button ? getComputedStyle(button) : null;
          const cardStyle = card ? getComputedStyle(card) : null;
          return {
            buttonSlot: button?.getAttribute("data-slot") ?? null,
            variant: button?.getAttribute("data-variant") ?? null,
            cardSlot: card?.getAttribute("data-slot") ?? null,
            buttonBackground: buttonStyle?.backgroundColor ?? "",
            buttonColor: buttonStyle?.color ?? "",
            buttonOpacity: buttonStyle?.opacity ?? "",
            cardBackground: cardStyle?.backgroundColor ?? "",
            cardColor: cardStyle?.color ?? "",
            cardOpacity: cardStyle?.opacity ?? "",
            count: count?.textContent ?? null,
            viewport: window.innerWidth,
          };
        })()`,
      );
      assertions.push(
        check(
          `${theme}-${width}-original-button`,
          value.buttonSlot,
          "button",
          value.buttonSlot === "button",
        ),
        check(
          `${theme}-${width}-original-button-default`,
          value.variant,
          "default",
          value.variant === "default",
        ),
        check(`${theme}-${width}-original-card`, value.cardSlot, "card", value.cardSlot === "card"),
        check(
          `${theme}-${width}-original-button-activates-once`,
          value.count,
          "1",
          value.count === "1",
        ),
        check(
          `${theme}-${width}-original-button-tokens-and-opacity`,
          {
            background: value.buttonBackground,
            color: value.buttonColor,
            opacity: value.buttonOpacity,
          },
          { ...BASELINE_TOKENS[theme], opacity: "1" },
          value.buttonBackground === BASELINE_TOKENS[theme].buttonBackground &&
            value.buttonColor === BASELINE_TOKENS[theme].buttonColor &&
            value.buttonOpacity === "1",
        ),
        check(
          `${theme}-${width}-original-card-tokens-and-opacity`,
          {
            background: value.cardBackground,
            color: value.cardColor,
            opacity: value.cardOpacity,
          },
          { ...BASELINE_TOKENS[theme], opacity: "1" },
          value.cardBackground === BASELINE_TOKENS[theme].cardBackground &&
            value.cardColor === BASELINE_TOKENS[theme].cardColor &&
            value.cardOpacity === "1",
        ),
        check(`${theme}-${width}-viewport`, value.viewport, width, value.viewport === width),
      );
      cases.push({ theme, width, ...value });
      screenshots.push(await capture(cdp, `baseline-${theme}-${width}.png`));
    }
  }
  return { assertions, cases, screenshots };
}

async function runMaterial(cdp: Cdp, port: number) {
  const assertions: Assertion[] = [];
  const cases: Record<string, unknown>[] = [];
  const screenshots: string[] = [];
  for (const theme of ["dark", "light"]) {
    for (const width of [375, 1280]) {
      await cdp.command("Emulation.setDeviceMetricsOverride", {
        width,
        height: width === 375 ? 812 : 900,
        deviceScaleFactor: 1,
        mobile: width === 375,
      });
      await navigate(cdp, `http://127.0.0.1:${port}${FIXTURE_URL}/index.html`);
      await evaluate(cdp, `document.documentElement.className = ${JSON.stringify(theme)}`);
      const value = await evaluate<{
        supported: boolean;
        normalFilter: string;
        strongFilter: string;
        normalAlpha: number;
        strongAlpha: number;
        normalBounds: { x: number; y: number; right: number; bottom: number };
        strongBounds: { x: number; y: number; right: number; bottom: number };
        viewport: { width: number; height: number };
      }>(
        cdp,
        `(() => {
          const alpha = (color) => {
            const values = color.match(/[\\d.]+/g)?.map(Number) ?? [];
            return values.length === 4 ? values[3] : values.length === 3 ? 1 : 0;
          };
          const bounds = (element) => {
            const rect = element.getBoundingClientRect();
            return { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom };
          };
          const normal = document.querySelector('[data-testid="glass"]');
          const strong = document.querySelector('[data-testid="glass-strong"]');
          const normalStyle = getComputedStyle(normal);
          const strongStyle = getComputedStyle(strong);
          return {
            supported: CSS.supports("backdrop-filter: blur(12px)") || CSS.supports("-webkit-backdrop-filter: blur(12px)"),
            normalFilter: normalStyle.backdropFilter || normalStyle.webkitBackdropFilter,
            strongFilter: strongStyle.backdropFilter || strongStyle.webkitBackdropFilter,
            normalAlpha: alpha(normalStyle.backgroundColor),
            strongAlpha: alpha(strongStyle.backgroundColor),
            normalBounds: bounds(normal),
            strongBounds: bounds(strong),
            viewport: { width: window.innerWidth, height: window.innerHeight },
          };
        })()`,
      );
      const inside = (bounds: { x: number; y: number; right: number; bottom: number }) =>
        bounds.x >= 0 &&
        bounds.y >= 0 &&
        bounds.right <= value.viewport.width &&
        bounds.bottom <= value.viewport.height;
      const filterApplied =
        !value.supported || (value.normalFilter !== "none" && value.strongFilter !== "none");
      assertions.push(
        check(
          `${theme}-${width}-glass-filter`,
          { supported: value.supported, normal: value.normalFilter, strong: value.strongFilter },
          "non-none filters when Chrome supports backdrop-filter",
          filterApplied,
        ),
        check(
          `${theme}-${width}-glass-stronger-alpha`,
          { normal: value.normalAlpha, strong: value.strongAlpha },
          "strong alpha > normal alpha",
          value.strongAlpha > value.normalAlpha,
        ),
        check(
          `${theme}-${width}-glass-bounds`,
          { normal: value.normalBounds, strong: value.strongBounds, viewport: value.viewport },
          "both material probes inside viewport",
          inside(value.normalBounds) && inside(value.strongBounds),
        ),
      );
      cases.push({ theme, width, ...value });
      screenshots.push(await capture(cdp, `material-${theme}-${width}.png`));
    }
  }
  return { assertions, cases, screenshots };
}

async function withBrowser(
  kind: "baseline" | "material",
  port: number,
  cdpPort: number,
  test: (
    cdp: Cdp,
    port: number,
  ) => Promise<{
    assertions: Assertion[];
    cases: Record<string, unknown>[];
    screenshots: string[];
  }>,
): Promise<BrowserRun> {
  const cleanup = {
    cdpClosed: false,
    chromeExited: false,
    serverStopped: false,
    profileRemoved: false,
  };
  const server = Bun.serve({ hostname: "127.0.0.1", port, routes: { "/*": { dir: ROOT } } });
  const profile = await mkdtemp(resolve(tmpdir(), `kood-glass-${kind}-`));
  const chrome = Bun.spawn(
    [
      CHROME,
      "--headless=new",
      `--remote-debugging-port=${cdpPort}`,
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
    const targetResponse = await fetch(`http://127.0.0.1:${cdpPort}/json/new?about:blank`, {
      method: "PUT",
    });
    if (!targetResponse.ok)
      throw new Error(`Chrome target creation failed: ${targetResponse.status}`);
    const target = (await targetResponse.json()) as { webSocketDebuggerUrl: string };
    cdp = await connect(target.webSocketDebuggerUrl);
    await cdp.command("Page.enable");
    await cdp.command("Runtime.enable");
    await cdp.command("Log.enable");
    await cdp.command("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });
    const browser = await cdp.command("Browser.getVersion");
    const result = await test(cdp, port);
    return { kind, port, browser, ...result, cleanup };
  } finally {
    cdp?.close();
    cleanup.cdpClosed = true;
    chrome.kill();
    try {
      await chrome.exited;
      cleanup.chromeExited = true;
    } catch {
      cleanup.chromeExited = true;
    }
    await server.stop(true);
    cleanup.serverStopped = true;
    rmSync(profile, { recursive: true, force: true });
    cleanup.profileRemoved = true;
  }
}

function listenerExitCode(port: number) {
  return Bun.spawnSync(["lsof", "-nP", `-iTCP:${port}`, "-sTCP:LISTEN"], {
    stdout: "ignore",
    stderr: "ignore",
  }).exitCode;
}

async function main() {
  const { phase, family } = parseArgs();
  assert(existsSync(CHROME), `Chrome is unavailable at ${CHROME}`);
  mkdirSync(EVIDENCE, { recursive: true });
  await prepareFixture();
  try {
    const baseline = await withBrowser("baseline", 6183, 9383, runBaseline);
    const material = await withBrowser("material", 6181, 9381, runMaterial);
    const baselinePass = baseline.assertions.every((assertion) => assertion.pass);
    const materialPass = material.assertions.every((assertion) => assertion.pass);
    const portClosures = { 6183: listenerExitCode(6183), 6181: listenerExitCode(6181) };
    assert(
      portClosures[6183] === 1 && portClosures[6181] === 1,
      `QA listeners remain after cleanup: ${JSON.stringify(portClosures)}`,
    );
    const report = {
      task: 3,
      phase,
      family: Number(family),
      command: `QA_GLASS_EVIDENCE=${EVIDENCE} bun scripts/qa-glass.ts --phase ${phase} --family ${family}`,
      baseline: { pass: baselinePass, ...baseline },
      material: { pass: materialPass, ...material },
      pass: baselinePass && materialPass,
    };
    writeJson("baseline-pass.json", { pass: baselinePass, ...baseline });
    writeJson(materialPass ? "material-green.json" : "red.json", {
      expectedRed: family === "3" && !materialPass,
      pass: materialPass,
      ...material,
    });
    writeJson("report.json", report);
    writeJson("cleanup.json", {
      status: "complete",
      baseline: baseline.cleanup,
      material: material.cleanup,
      portClosures,
    });
    console.log(
      JSON.stringify({ baselinePass, materialPass, pass: report.pass, evidence: EVIDENCE }),
    );
    if (!report.pass) process.exitCode = 1;
  } finally {
    rmSync(FIXTURE, { recursive: true, force: true });
  }
}

await main();
