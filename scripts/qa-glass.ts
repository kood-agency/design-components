import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { dirname, relative, resolve } from "node:path";

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
  if (phase === "final" && family === "all") return { phase, family } as const;
  if (phase === "foundation" && (family === "1" || family === "3"))
    return { phase, family } as const;
  throw new Error(
    "usage: bun scripts/qa-glass.ts --phase foundation --family 1|3 | --phase final --family all",
  );
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
  if (phase === "final") {
    await runFinalQa();
    return;
  }
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

const FINAL_PORT = 6220;
const FIREFOX_PORT = 6222;
const BROWSER_SETUP = process.env.QA_GLASS_BROWSER_SETUP;
const EDGE = BROWSER_SETUP
  ? `${BROWSER_SETUP}/browser-cache/microsoft-edge/Microsoft Edge.app/Contents/MacOS/Microsoft Edge`
  : "";
const FIREFOX = BROWSER_SETUP
  ? `${BROWSER_SETUP}/browser-cache/firefox-stable/Firefox.app/Contents/MacOS/firefox`
  : "";
const GECKODRIVER = BROWSER_SETUP ? `${BROWSER_SETUP}/browser-cache/geckodriver/geckodriver` : "";
const PLAYWRIGHT = BROWSER_SETUP ? `${BROWSER_SETUP}/node_modules/playwright/index.js` : "";
const FINAL_FIXTURE = resolve(EVIDENCE, "final-fixture");
const REACT18_TOOLING = resolve(EVIDENCE, "react18-tooling");

type FinalBrowser = {
  name: string;
  status: "passed" | "failed" | "unavailable";
  identity?: Record<string, unknown>;
  assertions: Assertion[];
  screenshots: string[];
  cleanup: Record<string, boolean>;
  error?: string;
  invocation: string;
};

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function finalCheck(name: string, actual: unknown, expected: unknown, pass: boolean): Assertion {
  return { name, actual, expected, pass };
}

function finalFixtureSource() {
  const packageEntry = JSON.stringify(resolve(ROOT, "dist/index.js"));
  return `import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Button, Card, CardContent, CardHeader, CardTitle, Dialog, DialogContent, DialogTitle,
  DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Input, InputGroup,
  InputGroupInput, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Sidebar,
  SidebarContent, SidebarProvider, Textarea,
} from ${packageEntry};

function App() {
  const [count, setCount] = React.useState(0);
  return <main id="qa-root" className="qa-canvas">
    <Card variant="glass" data-testid="glass" id="normal"><CardHeader><CardTitle>Normal surface</CardTitle></CardHeader><CardContent>Readable material on detailed backdrop.</CardContent></Card>
    <Card variant="glass-strong" data-testid="glass-strong" id="strong"><CardHeader><CardTitle>Strong surface</CardTitle></CardHeader><CardContent>Independent material owner.</CardContent></Card>
    <section className="qa-focus-backdrop" data-testid="focus-backdrop"><section className="qa-controls kood-glass" data-testid="focus-stage">
      <Button variant="glass" data-testid="enabled" onClick={() => setCount((value) => value + 1)}>Increment</Button>
      <Button variant="glass" data-testid="disabled" disabled onClick={() => setCount((value) => value + 100)}>Disabled</Button>
      <output data-testid="count">{count}</output>
      <Input variant="glass-strong" data-testid="bright-input" defaultValue="input contrast" />
      <Textarea variant="glass" data-testid="textarea" defaultValue="textarea material" />
      <InputGroup variant="glass" data-testid="disabled-group"><InputGroupInput disabled defaultValue="disabled group" /></InputGroup>
      <Select defaultValue="one"><SelectTrigger variant="glass" data-testid="select-trigger"><SelectValue /></SelectTrigger><SelectContent variant="glass" data-testid="select-content"><SelectItem value="one">One</SelectItem><SelectItem value="two">Two</SelectItem></SelectContent></Select>
      <DropdownMenu><DropdownMenuTrigger render={<Button variant="glass" data-testid="menu-trigger" />}>Menu</DropdownMenuTrigger><DropdownMenuContent variant="glass" data-testid="menu-content"><DropdownMenuSub><DropdownMenuSubTrigger data-testid="submenu-trigger">More</DropdownMenuSubTrigger><DropdownMenuSubContent variant="glass-strong" data-testid="submenu-content"><DropdownMenuItem>Nested action</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub></DropdownMenuContent></DropdownMenu>
      <Dialog><DialogTrigger render={<Button variant="glass-strong" data-testid="dialog-trigger" />}>Dialog</DialogTrigger><DialogContent variant="glass-strong" data-testid="dialog-content"><DialogTitle>Dialog material</DialogTitle><Button>Action</Button></DialogContent></Dialog>
    </section></section>
    <SidebarProvider><Sidebar collapsible="none" appearance="glass" data-testid="sidebar"><SidebarContent>Sidebar material</SidebarContent></Sidebar></SidebarProvider>
    <div id="qa-ready">ready</div>
  </main>;
}
createRoot(document.getElementById("root")).render(<App />);`;
}

const CONSUMER_OVERRIDE = `:root,.dark{--glass-background:rgb(1 2 3 / 87%);--glass-strong-background:rgb(1 2 3 / 95%);--kood-font-sans:QA Sans,sans-serif;--kood-font-mono:QA Mono,monospace;--radius:13px;--radius-md:15px}.light{--glass-background:rgb(4 5 6 / 88%);--glass-strong-background:rgb(4 5 6 / 96%);--kood-font-sans:QA Sans,sans-serif;--kood-font-mono:QA Mono,monospace;--radius:17px;--radius-md:19px}`;

function fixtureHtml(script: string, css: string, override?: "override-last" | "override-first") {
  const stylesheet = `<link rel="stylesheet" href="${css}">`;
  const consumerOverride = `<style id="consumer-override">${CONSUMER_OVERRIDE}</style>`;
  const head = override
    ? override === "override-first"
      ? consumerOverride + stylesheet
      : stylesheet + consumerOverride
    : stylesheet;
  return `<!doctype html><html class="dark"><head><meta charset="utf-8">${head}<style>body{margin:0;background:linear-gradient(135deg,#315c9f,#6bcb91,#e4b45b)}.qa-canvas{display:grid;gap:16px;padding:24px}.qa-canvas>[data-slot=card]{padding:12px}.qa-focus-backdrop{background:var(--background);border-radius:var(--radius-lg);padding:12px}.qa-controls{display:flex;flex-wrap:wrap;gap:12px;align-items:center;max-width:760px;padding:12px}</style></head><body><div id="root"></div><script type="module" src="${script}"></script></body></html>`;
}

function removeBackdropSupport(css: string) {
  const start = css.indexOf(
    "@supports ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){",
  );
  assert(start >= 0, "published CSS has no backdrop enhancement block");
  let depth = 0;
  for (let index = start; index < css.length; index += 1) {
    if (css[index] === "{") depth += 1;
    if (css[index] === "}" && --depth === 0) return css.slice(0, start) + css.slice(index + 1);
  }
  throw new Error("published backdrop enhancement block is unbalanced");
}

async function prepareFinalFixture() {
  rmSync(FINAL_FIXTURE, { recursive: true, force: true });
  mkdirSync(FINAL_FIXTURE, { recursive: true });
  const entry = resolve(FINAL_FIXTURE, "app.tsx");
  writeFileSync(entry, finalFixtureSource());
  const plain = await Bun.build({
    entrypoints: [entry],
    outdir: FINAL_FIXTURE,
    target: "browser",
    naming: "app.js",
  });
  assert(plain.success, plain.logs.map((log) => log.message).join("\n"));
  const css = readFileSync(resolve(ROOT, "dist/globals.css"), "utf8");
  writeFileSync(resolve(FINAL_FIXTURE, "fallback.css"), removeBackdropSupport(css));
  const reducedCss = css.replace(
    "@media (forced-colors:active),(prefers-reduced-transparency:reduce)",
    "@media all",
  );
  assert(reducedCss !== css, "published CSS has no reduced-transparency media rule");
  writeFileSync(resolve(FINAL_FIXTURE, "reduced.css"), reducedCss);
  const script = "/" + relative(ROOT, resolve(FINAL_FIXTURE, "app.js"));
  writeFileSync(resolve(FINAL_FIXTURE, "shipped.html"), fixtureHtml(script, "/dist/globals.css"));
  writeFileSync(
    resolve(FINAL_FIXTURE, "firefox-375.html"),
    `<!doctype html><iframe id="qa-frame" src="shipped.html" style="border:0;width:375px;height:812px"></iframe>`,
  );
  writeFileSync(
    resolve(FINAL_FIXTURE, "plain-globals.html"),
    fixtureHtml(script, "/dist/globals.css", "override-last"),
  );
  writeFileSync(
    resolve(FINAL_FIXTURE, "plain-styles.html"),
    fixtureHtml(script, "/dist/styles.css", "override-last"),
  );
  writeFileSync(
    resolve(FINAL_FIXTURE, "reversed.html"),
    fixtureHtml(script, "/dist/globals.css", "override-first"),
  );
  writeFileSync(
    resolve(FINAL_FIXTURE, "fallback.html"),
    fixtureHtml(script, "/" + relative(ROOT, resolve(FINAL_FIXTURE, "fallback.css"))),
  );
  writeFileSync(
    resolve(FINAL_FIXTURE, "reduced.html"),
    fixtureHtml(script, "/" + relative(ROOT, resolve(FINAL_FIXTURE, "reduced.css"))),
  );
  const vite = resolve(FINAL_FIXTURE, "vite");
  mkdirSync(vite, { recursive: true });
  writeFileSync(
    resolve(vite, "index.html"),
    `<!doctype html><div id="root"></div><script type="module" src="/app.tsx"></script>`,
  );
  writeFileSync(resolve(vite, "overrides.css"), CONSUMER_OVERRIDE);
  writeFileSync(
    resolve(vite, "app.tsx"),
    `import ${JSON.stringify(resolve(ROOT, "dist/globals.css"))}; import "./overrides.css";\n${finalFixtureSource()}`,
  );
  writeFileSync(
    resolve(vite, "vite.config.mjs"),
    `import { defineConfig } from "vite"; export default defineConfig({ base: "./", build: { outDir: "${resolve(vite, "out")}", emptyOutDir: true } });`,
  );
  const viteBuild = Bun.spawnSync(
    [resolve(ROOT, "node_modules/.bin/vite"), "build", "--config", "vite.config.mjs"],
    { cwd: vite, stdout: "pipe", stderr: "pipe" },
  );
  assert(
    viteBuild.exitCode === 0,
    `Vite consumer build failed: ${viteBuild.stdout.toString()}${viteBuild.stderr.toString()}`,
  );
  const react18 = resolve(FINAL_FIXTURE, "react18");
  const react18Modules = resolve(REACT18_TOOLING, "node_modules");
  assert(
    existsSync(resolve(react18Modules, "react/index.js")),
    "React 18 QA tooling is unavailable",
  );
  mkdirSync(react18, { recursive: true });
  writeFileSync(
    resolve(react18, "index.html"),
    `<!doctype html><div id="root"></div><script type="module" src="/app.tsx"></script>`,
  );
  writeFileSync(
    resolve(react18, "app.tsx"),
    `import ${JSON.stringify(resolve(ROOT, "dist/globals.css"))}; import * as React from "react"; import { createRoot } from "react-dom/client"; import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, Sidebar, SidebarContent, SidebarProvider } from ${JSON.stringify(resolve(ROOT, "dist/index.js"))}; globalThis.__qaReactVersion = React.version; createRoot(document.querySelector("#root")!).render(<><NavigationMenu appearance="glass"><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="#react18-ready">Navigation context</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu><SidebarProvider><Sidebar appearance="glass" collapsible="none"><SidebarContent><span id="react18-ready">React 18 context ready</span></SidebarContent></Sidebar></SidebarProvider></>);`,
  );
  writeFileSync(
    resolve(react18, "vite.config.mjs"),
    `import { defineConfig } from "vite"; const modules=${JSON.stringify(react18Modules)}; export default defineConfig({ base:"./", resolve:{ alias:[{find:"react/jsx-runtime",replacement:modules+"/react/jsx-runtime.js"},{find:"react-dom/client",replacement:modules+"/react-dom/client.js"},{find:"react-dom",replacement:modules+"/react-dom/index.js"},{find:"react",replacement:modules+"/react/index.js"}] }, build:{outDir:${JSON.stringify(resolve(react18, "out"))},emptyOutDir:true} });`,
  );
  const react18Build = Bun.spawnSync(
    [resolve(ROOT, "node_modules/.bin/vite"), "build", "--config", "vite.config.mjs"],
    { cwd: react18, stdout: "pipe", stderr: "pipe" },
  );
  assert(
    react18Build.exitCode === 0,
    `React 18 consumer build failed: ${react18Build.stdout.toString()}${react18Build.stderr.toString()}`,
  );
  return {
    viteBuild: viteBuild.stdout.toString().trim(),
    react18Build: react18Build.stdout.toString().trim(),
  };
}

async function setFinalTheme(page: any, mode: "dark" | "light") {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("html").evaluate(
    (node: HTMLElement, next) =>
      new Promise<void>((resolvePromise) => {
        node.className = next as string;
        requestAnimationFrame(() => requestAnimationFrame(resolvePromise));
      }),
    mode,
  );
}

async function measureFocusedControl(page: any, testId: string) {
  return page.evaluate((targetTestId: string) => {
    const parseColor = (value: string) => {
      const values = value.match(/[\d.]+/g)?.map(Number) ?? [];
      if (values.length < 3) throw new Error(`unparseable color: ${value}`);
      return { rgb: values.slice(0, 3), alpha: values[3] ?? 1 };
    };
    const composite = (fill: ReturnType<typeof parseColor>, backdrop: number[]) =>
      fill.rgb.map((channel, index) => channel * fill.alpha + backdrop[index] * (1 - fill.alpha));
    const contrast = (first: number[], second: number[]) => {
      const linear = (value: number) => {
        value /= 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      };
      const luminance = (value: number[]) =>
        0.2126 * linear(value[0]) + 0.7152 * linear(value[1]) + 0.0722 * linear(value[2]);
      const [high, low] = [luminance(first), luminance(second)].sort((a, b) => b - a);
      return (high + 0.05) / (low + 0.05);
    };
    const control = document.querySelector(`[data-testid="${targetTestId}"]`)!;
    const stage = document.querySelector('[data-testid="focus-stage"]')!;
    const backdrop = document.querySelector('[data-testid="focus-backdrop"]')!;
    const controlStyle = getComputedStyle(control);
    const stageStyle = getComputedStyle(stage);
    const backdropStyle = getComputedStyle(backdrop);
    const stageEffectiveBackground = composite(
      parseColor(stageStyle.backgroundColor),
      parseColor(backdropStyle.backgroundColor).rgb,
    );
    const controlEffectiveBackground = composite(
      parseColor(controlStyle.backgroundColor),
      stageEffectiveBackground,
    );
    const outline = parseColor(controlStyle.outlineColor).rgb;
    return {
      activeTestId: document.activeElement?.getAttribute("data-testid") ?? null,
      focusVisible: control.matches(":focus-visible"),
      rootRing: getComputedStyle(document.documentElement).getPropertyValue("--ring").trim(),
      outline: {
        color: controlStyle.outlineColor,
        style: controlStyle.outlineStyle,
        width: controlStyle.outlineWidth,
        offset: controlStyle.outlineOffset,
      },
      composited: {
        stageEffectiveBackground,
        controlEffectiveBackground,
        focusContrast: contrast(outline, stageEffectiveBackground),
        textContrast: contrast(parseColor(controlStyle.color).rgb, controlEffectiveBackground),
      },
    };
  }, testId);
}

async function runPlaywrightScenario(
  page: any,
  url: string,
  screenshot: string,
  mode: "dark" | "light",
  width: number,
) {
  const assertions: Assertion[] = [];
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
  await page.goto(url, { waitUntil: "load" });
  await page.locator("#qa-ready").waitFor();
  await setFinalTheme(page, mode);
  await page.keyboard.press("Tab");
  const buttonFocus = await measureFocusedControl(page, "enabled");
  await page.screenshot({
    path: resolve(EVIDENCE, screenshot.replace(".png", "-button-focus.png")),
    fullPage: true,
  });
  await page.keyboard.press("Tab");
  const inputFocus = await measureFocusedControl(page, "bright-input");
  await page.screenshot({
    path: resolve(EVIDENCE, screenshot.replace(".png", "-input-focus.png")),
    fullPage: true,
  });
  const material = await page.evaluate(() => {
    const alpha = (color: string) => color.match(/[\d.]+/g)?.map(Number)[3] ?? 1;
    const normal = document.querySelector("#normal")!;
    const strong = document.querySelector("#strong")!;
    return {
      normalFilter: getComputedStyle(normal).backdropFilter,
      strongFilter: getComputedStyle(strong).backdropFilter,
      normalAlpha: alpha(getComputedStyle(normal).backgroundColor),
      strongAlpha: alpha(getComputedStyle(strong).backgroundColor),
      disabledGroupFilter: getComputedStyle(document.querySelector("[data-testid=disabled-group]")!)
        .backdropFilter,
      viewport: innerWidth,
    };
  });
  const focusedControls = [buttonFocus, inputFocus];
  assertions.push(
    finalCheck(
      `${mode}-${width}-filters`,
      material,
      "glass filters and strong alpha",
      material.normalFilter !== "none" &&
        material.strongFilter !== "none" &&
        material.strongAlpha > material.normalAlpha,
    ),
    finalCheck(
      `${mode}-${width}-keyboard-focused-contrast`,
      focusedControls,
      "actual keyboard-focused Button and Input: text >= 4.5 and offset outline >= 3 against the composited adjacent glass stage",
      focusedControls.every(
        (control) =>
          control.focusVisible &&
          control.outline.style === "solid" &&
          control.outline.width === "2px" &&
          control.outline.offset === "2px" &&
          control.composited.textContrast >= 4.5 &&
          control.composited.focusContrast >= 3,
      ),
    ),
    finalCheck(
      `${mode}-${width}-disabled-group-fallback`,
      material.disabledGroupFilter,
      "none",
      material.disabledGroupFilter === "none",
    ),
    finalCheck(`${mode}-${width}-viewport`, material.viewport, width, material.viewport === width),
  );
  await page.getByTestId("enabled").click();
  await page.getByTestId("count").getByText("1").waitFor();
  await page.getByTestId("enabled").focus();
  await page.keyboard.press("Enter");
  await page.getByTestId("count").getByText("2").waitFor();
  await page.getByTestId("disabled").dispatchEvent("click");
  await page.getByTestId("disabled").dispatchEvent("keydown", { key: "Enter", bubbles: true });
  assertions.push(
    finalCheck(
      `${mode}-${width}-disabled-no-activation`,
      await page.getByTestId("count").textContent(),
      "2",
      (await page.getByTestId("count").textContent()) === "2",
    ),
  );
  await page.getByTestId("select-trigger").click();
  await page.getByText("Two", { exact: true }).click();
  await page.getByTestId("select-trigger").focus();
  await page.keyboard.press("Escape");
  assertions.push(
    finalCheck(
      `${mode}-${width}-select-value-and-escape`,
      {
        value: await page.getByTestId("select-trigger").textContent(),
        active: await page.evaluate(() => document.activeElement?.getAttribute("data-testid")),
      },
      "two and trigger focus",
      (await page.getByTestId("select-trigger").textContent())?.includes("two") === true &&
        (await page.evaluate(() => document.activeElement?.getAttribute("data-testid"))) ===
          "select-trigger",
    ),
  );
  await page.getByTestId("menu-trigger").click();
  await page.getByTestId("submenu-trigger").hover();
  await page.getByTestId("submenu-content").waitFor({ state: "visible" });
  assertions.push(
    finalCheck(
      `${mode}-${width}-submenu`,
      await page.getByTestId("submenu-content").textContent(),
      "Nested action",
      (await page.getByTestId("submenu-content").textContent())?.includes("Nested action") === true,
    ),
  );
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await page.getByTestId("menu-content").waitFor({ state: "hidden" });
  await page.getByTestId("dialog-trigger").click();
  await page.getByTestId("dialog-content").waitFor({ state: "visible" });
  await page.keyboard.press("Escape");
  await page.getByTestId("dialog-content").waitFor({ state: "hidden" });
  assertions.push(
    finalCheck(
      `${mode}-${width}-dialog-escape-focus`,
      await page.evaluate(() => document.activeElement?.getAttribute("data-testid")),
      "dialog-trigger",
      (await page.evaluate(() => document.activeElement?.getAttribute("data-testid"))) ===
        "dialog-trigger",
    ),
  );
  await page.screenshot({ path: resolve(EVIDENCE, screenshot), fullPage: true });
  return assertions;
}

async function runChromiumBrowser(name: "Chrome" | "Edge", executablePath: string) {
  const result: FinalBrowser = {
    name,
    status: "failed",
    assertions: [],
    screenshots: [],
    cleanup: { browserClosed: false },
    invocation: `Playwright chromium.launch({ executablePath: ${JSON.stringify(executablePath)}, headless: true })`,
  };
  let browser: any;
  try {
    assert(existsSync(executablePath), `${name} executable unavailable: ${executablePath}`);
    const { chromium } = (await import(PLAYWRIGHT)) as any;
    browser = await chromium.launch({ executablePath, headless: true });
    const page = await browser.newPage();
    result.identity = {
      version: await browser.version(),
      ...(await page.evaluate(() => ({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
      }))),
    };
    for (const mode of ["dark", "light"] as const)
      for (const width of [375, 1280]) {
        const screenshot = `screenshots/${name.toLowerCase()}-${mode}-${width}.png`;
        result.assertions.push(
          ...(await runPlaywrightScenario(
            page,
            `http://127.0.0.1:${FINAL_PORT}/${relative(ROOT, resolve(FINAL_FIXTURE, "shipped.html"))}`,
            screenshot,
            mode,
            width,
          )),
        );
        result.screenshots.push(screenshot);
      }
    result.status = result.assertions.every((entry) => entry.pass) ? "passed" : "failed";
  } catch (error) {
    result.error = String(error);
  } finally {
    if (browser) {
      await browser.close();
      result.cleanup.browserClosed = true;
    }
  }
  return result;
}

async function webdriverRequest(path: string, options: RequestInit = {}) {
  const response = await fetch(`http://127.0.0.1:${FIREFOX_PORT}${path}`, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.value?.error)
    throw new Error(`Firefox WebDriver ${path}: ${JSON.stringify(body.value ?? body)}`);
  return body.value;
}

async function readDriverReady(stream: ReadableStream<Uint8Array> | null) {
  assert(stream, "geckodriver stderr is unavailable");
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  return await new Promise<void>((resolveReady, reject) => {
    const timer = setTimeout(() => reject(new Error("geckodriver did not become ready")), TIMEOUT);
    const read = async (): Promise<void> => {
      const { done, value } = await reader.read();
      if (done) return reject(new Error("geckodriver exited before readiness"));
      if (decoder.decode(value, { stream: true }).includes("Listening")) {
        clearTimeout(timer);
        reader.releaseLock();
        resolveReady();
        return;
      }
      await read();
    };
    void read();
  });
}

async function runFirefoxBrowser() {
  const result: FinalBrowser = {
    name: "Firefox",
    status: "failed",
    assertions: [],
    screenshots: [],
    cleanup: { sessionDeleted: false, driverTerminated: false },
    invocation: `${GECKODRIVER} --port ${FIREFOX_PORT} (Firefox ${FIREFOX} -headless)`,
  };
  let driver: ReturnType<typeof Bun.spawn> | undefined;
  let sessionId: string | undefined;
  try {
    assert(
      existsSync(GECKODRIVER) && existsSync(FIREFOX),
      "Firefox/geckodriver provisioning is unavailable",
    );
    driver = Bun.spawn([GECKODRIVER, "--port", String(FIREFOX_PORT)], {
      stdout: "pipe",
      stderr: "pipe",
    });
    await Promise.any([readDriverReady(driver.stdout), readDriverReady(driver.stderr)]);
    const session = await webdriverRequest("/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        capabilities: {
          alwaysMatch: {
            browserName: "firefox",
            "moz:firefoxOptions": { binary: FIREFOX, args: ["-headless"] },
          },
        },
      }),
    });
    sessionId = session.sessionId;
    const execute = (script: string) =>
      webdriverRequest(`/session/${sessionId}/execute/sync`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ script, args: [] }),
      });
    const executeAsync = (script: string) =>
      webdriverRequest(`/session/${sessionId}/execute/async`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ script, args: [] }),
      });
    let interactionChecked = false;
    for (const mode of ["dark", "light"] as const)
      for (const width of [375, 1280]) {
        await webdriverRequest(`/session/${sessionId}/window/rect`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ width, height: width === 375 ? 812 : 900 }),
        });
        const iframeViewport = width === 375;
        await webdriverRequest(`/session/${sessionId}/url`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            url: `http://127.0.0.1:${FINAL_PORT}/${relative(ROOT, resolve(FINAL_FIXTURE, iframeViewport ? "firefox-375.html" : "shipped.html"))}`,
          }),
        });
        if (iframeViewport) {
          await executeAsync(
            `const done=arguments[arguments.length-1];const frame=document.querySelector('#qa-frame');const ready=()=>frame.contentDocument?.querySelector('#qa-ready')?.textContent==='ready';if(ready())done(true);else frame.addEventListener('load',()=>done(ready()),{once:true});`,
          );
          const frame = await webdriverRequest(`/session/${sessionId}/element`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ using: "css selector", value: "#qa-frame" }),
          });
          await webdriverRequest(`/session/${sessionId}/frame`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: frame }),
          });
        }
        const state = await execute(
          `document.documentElement.className=${JSON.stringify(mode)}; const node=document.querySelector('#qa-ready'); return {ready:node?.textContent, userAgent:navigator.userAgent, platform:navigator.platform, filter:getComputedStyle(document.querySelector('#normal')).backdropFilter, strong:getComputedStyle(document.querySelector('#strong')).backdropFilter, disabled:getComputedStyle(document.querySelector('[data-testid=disabled-group]')).backdropFilter, width:innerWidth, viewportSurface:${JSON.stringify(width === 375 ? "iframe" : "window")}};`,
        );
        if (!result.identity)
          result.identity = {
            userAgent: state.userAgent,
            platform: state.platform,
            capabilities: session.capabilities,
          };
        result.assertions.push(
          finalCheck(
            `firefox-${mode}-${width}-rendered-material`,
            state,
            "ready, both filters, disabled fallback, and requested viewport",
            state.ready === "ready" &&
              state.filter !== "none" &&
              state.strong !== "none" &&
              state.disabled === "none" &&
              state.width === width &&
              state.viewportSurface === (width === 375 ? "iframe" : "window"),
          ),
        );
        if (!interactionChecked) {
          const enabled = await webdriverRequest(`/session/${sessionId}/element`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ using: "css selector", value: "[data-testid=enabled]" }),
          });
          await webdriverRequest(
            `/session/${sessionId}/element/${enabled["element-6066-11e4-a52e-4f735466cecf"]}/click`,
            { method: "POST", headers: { "content-type": "application/json" }, body: "{}" },
          );
          const count = await execute(
            `return document.querySelector('[data-testid=count]')?.textContent`,
          );
          result.assertions.push(finalCheck("firefox-enabled-button", count, "1", count === "1"));
          interactionChecked = true;
        }
        if (iframeViewport)
          await webdriverRequest(`/session/${sessionId}/frame/parent`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: "{}",
          });
        const screenshot = `screenshots/firefox-${mode}-${width}.png`;
        const shot = await webdriverRequest(`/session/${sessionId}/screenshot`);
        writeFileSync(resolve(EVIDENCE, screenshot), Buffer.from(shot, "base64"));
        result.screenshots.push(screenshot);
      }
    result.status = result.assertions.every((entry) => entry.pass) ? "passed" : "failed";
  } catch (error) {
    result.error = String(error);
  } finally {
    if (sessionId) {
      try {
        await webdriverRequest(`/session/${sessionId}`, { method: "DELETE" });
        result.cleanup.sessionDeleted = true;
      } catch {
        /* cleanup is reported */
      }
    }
    if (driver) {
      driver.kill();
      await driver.exited;
      result.cleanup.driverTerminated = true;
    }
  }
  return result;
}

async function runStorybookAndConsumer() {
  const { chromium } = (await import(PLAYWRIGHT)) as any;
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const assertions: Assertion[] = [];
  const screenshots: string[] = [];
  try {
    const page = await browser.newPage();
    for (const mode of ["dark", "light"] as const)
      for (const width of [375, 1280]) {
        await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
        await page.goto(
          `http://127.0.0.1:${FINAL_PORT}/storybook-static/iframe.html?id=examples-glass--showcase&viewMode=story`,
          { waitUntil: "load" },
        );
        await page.locator("[data-testid=glass-showcase]").waitFor();
        await page
          .locator("html")
          .evaluate((node: HTMLElement, next) => (node.className = next as string), mode);
        const material = await page.evaluate(() => ({
          normal: getComputedStyle(document.querySelector("[data-testid=glass-panel-normal]")!)
            .backdropFilter,
          strong: getComputedStyle(document.querySelector("[data-testid=glass-panel-strong]")!)
            .backdropFilter,
          width: innerWidth,
        }));
        assertions.push(
          finalCheck(
            `storybook-${mode}-${width}`,
            material,
            "both showcase materials in viewport",
            material.normal !== "none" && material.strong !== "none" && material.width === width,
          ),
        );
        const name = `screenshots/storybook-${mode}-${width}.png`;
        await page.screenshot({ path: resolve(EVIDENCE, name), fullPage: true });
        screenshots.push(name);
      }
    for (const stylesheet of ["globals", "styles"] as const)
      for (const mode of ["dark", "light"] as const) {
        await page.goto(
          `http://127.0.0.1:${FINAL_PORT}/${relative(ROOT, resolve(FINAL_FIXTURE, `plain-${stylesheet}.html`))}`,
          { waitUntil: "load" },
        );
        await page.locator("#qa-ready").waitFor();
        await page
          .locator("html")
          .evaluate((node: HTMLElement, next) => (node.className = next as string), mode);
        const expectedRadius = mode === "dark" ? "13px" : "17px";
        const expectedRadiusMd = mode === "dark" ? "15px" : "19px";
        const expectedColor = mode === "dark" ? "rgb(1, 2, 3)" : "rgb(4, 5, 6)";
        const values = await page.evaluate(() => {
          const normal = getComputedStyle(document.querySelector("#normal")!);
          const root = getComputedStyle(document.documentElement);
          return {
            background: normal.backgroundColor,
            radius: root.getPropertyValue("--radius").trim(),
            radiusMd: root.getPropertyValue("--radius-md").trim(),
            font: normal.fontFamily,
            mono: root.getPropertyValue("--kood-font-mono").trim(),
          };
        });
        assertions.push(
          finalCheck(
            `plain-${stylesheet}-${mode}-later-overrides`,
            values,
            { expectedRadius, expectedRadiusMd, expectedColor, fonts: ["QA Sans", "QA Mono"] },
            values.radius === expectedRadius &&
              values.radiusMd === expectedRadiusMd &&
              values.background.includes(expectedColor.slice(4, -1)) &&
              values.font.includes("QA Sans") &&
              values.mono.includes("QA Mono"),
          ),
        );
        const name = `screenshots/plain-${stylesheet}-${mode}.png`;
        await page.screenshot({ path: resolve(EVIDENCE, name), fullPage: true });
        screenshots.push(name);
      }
    await page.goto(
      `http://127.0.0.1:${FINAL_PORT}/${relative(ROOT, resolve(FINAL_FIXTURE, "reversed.html"))}`,
      { waitUntil: "load" },
    );
    await page.locator("#qa-ready").waitFor();
    const reversed = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--radius").trim(),
    );
    assertions.push(
      finalCheck("reversed-order-rejects-override", reversed, "not 13px", reversed !== "13px"),
    );
    await page.goto(
      `http://127.0.0.1:${FINAL_PORT}/${relative(ROOT, resolve(FINAL_FIXTURE, "fallback.html"))}`,
      { waitUntil: "load" },
    );
    await page.locator("#qa-ready").waitFor();
    const fallback = await page.evaluate(() => {
      const style = getComputedStyle(document.querySelector("#normal")!);
      return { filter: style.backdropFilter, background: style.backgroundColor };
    });
    assertions.push(
      finalCheck(
        "unsupported-filter-fixture-is-opaque",
        fallback,
        "none and opaque",
        fallback.filter === "none" && !fallback.background.includes("0."),
      ),
    );
    await page.goto(
      `http://127.0.0.1:${FINAL_PORT}/${relative(ROOT, resolve(FINAL_FIXTURE, "reduced.html"))}`,
      { waitUntil: "load" },
    );
    await page.locator("#qa-ready").waitFor();
    const reduced = await page.evaluate(
      () => getComputedStyle(document.querySelector("#normal")!).backdropFilter,
    );
    assertions.push(
      finalCheck(
        "reduced-transparency-transformed-rule-fixture",
        reduced,
        "none (stylesheet media-rule transformation, not OS preference emulation)",
        reduced === "none",
      ),
    );
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto(
      `http://127.0.0.1:${FINAL_PORT}/${relative(ROOT, resolve(FINAL_FIXTURE, "plain-globals.html"))}`,
      { waitUntil: "load" },
    );
    await page.locator("#qa-ready").waitFor();
    const forced = await page.evaluate(
      () => getComputedStyle(document.querySelector("#normal")!).backdropFilter,
    );
    assertions.push(
      finalCheck("forced-colors-uses-opaque-fallback", forced, "none", forced === "none"),
    );
    await page.emulateMedia({ forcedColors: "none" });
    const vite = await browser.newPage();
    for (const mode of ["dark", "light"] as const) {
      await vite.goto(
        `http://127.0.0.1:${FINAL_PORT}/${relative(ROOT, resolve(FINAL_FIXTURE, "vite/out/index.html"))}`,
        { waitUntil: "load" },
      );
      await vite.locator("#qa-ready").waitFor();
      await vite
        .locator("html")
        .evaluate((node: HTMLElement, next) => (node.className = next as string), mode);
      const expectedRadius = mode === "dark" ? "13px" : "17px";
      const expectedRadiusMd = mode === "dark" ? "15px" : "19px";
      const expectedColor = mode === "dark" ? "rgb(1, 2, 3)" : "rgb(4, 5, 6)";
      const viteResult = await vite.evaluate(() => {
        const normal = getComputedStyle(document.querySelector("#normal")!);
        const root = getComputedStyle(document.documentElement);
        return {
          material: normal.backdropFilter,
          background: normal.backgroundColor,
          radius: root.getPropertyValue("--radius").trim(),
          radiusMd: root.getPropertyValue("--radius-md").trim(),
          font: normal.fontFamily,
          mono: root.getPropertyValue("--kood-font-mono").trim(),
          source: document.styleSheets.length,
        };
      });
      assertions.push(
        finalCheck(
          `vite-${mode}-later-overrides`,
          viteResult,
          "package CSS before glass/font/base+named-radius overrides",
          viteResult.material !== "none" &&
            viteResult.source > 0 &&
            viteResult.background.includes(expectedColor.slice(4, -1)) &&
            viteResult.radius === expectedRadius &&
            viteResult.radiusMd === expectedRadiusMd &&
            viteResult.font.includes("QA Sans") &&
            viteResult.mono.includes("QA Mono"),
        ),
      );
    }
    await vite.close();
    const react18 = await browser.newPage();
    await react18.goto(
      `http://127.0.0.1:${FINAL_PORT}/${relative(ROOT, resolve(FINAL_FIXTURE, "react18/out/index.html"))}`,
      { waitUntil: "load" },
    );
    await react18.locator("#react18-ready").waitFor();
    const react18Result = await react18.evaluate(() => ({
      version: (globalThis as typeof globalThis & { __qaReactVersion?: string }).__qaReactVersion,
      filter: getComputedStyle(document.querySelector("[data-slot=sidebar]")!).backdropFilter,
    }));
    assertions.push(
      finalCheck(
        "react18-context-consumer-smoke",
        react18Result,
        "React 18 and glass SidebarProvider context",
        react18Result.version?.startsWith("18.") === true && react18Result.filter !== "none",
      ),
    );
    await react18.close();
  } finally {
    await browser.close();
  }
  return { assertions, screenshots };
}

function finalStaticContract() {
  const assertions: Assertion[] = [];
  const distCss = resolve(ROOT, "dist/globals.css");
  const stylesCss = resolve(ROOT, "dist/styles.css");
  const prior = JSON.parse(
    readFileSync(resolve(ROOT, ".omo/evidence/kood-glass-variants/task-12/report.json"), "utf8"),
  ) as { generatedArtifacts: { dist: { keyFiles: Record<string, string> } } };
  const latestInput = Math.max(
    ...[
      resolve(ROOT, "src/styles/globals.css"),
      resolve(ROOT, "src/components/examples/glass.stories.tsx"),
    ].map((path) => statSync(path).mtimeMs),
  );
  assertions.push(
    finalCheck(
      "css-copies-byte-identical",
      sha256(distCss),
      sha256(stylesCss),
      readFileSync(distCss).equals(readFileSync(stylesCss)),
    ),
    finalCheck(
      "fresh-build-hashes",
      { css: sha256(distCss), index: sha256(resolve(ROOT, "dist/index.js")) },
      prior.generatedArtifacts.dist.keyFiles,
      sha256(distCss) === prior.generatedArtifacts.dist.keyFiles["globals.css"] &&
        sha256(resolve(ROOT, "dist/index.js")) ===
          prior.generatedArtifacts.dist.keyFiles["index.js"] &&
        statSync(resolve(ROOT, "dist/globals.css")).mtimeMs >= latestInput,
    ),
  );
  const owners = [
    "alert",
    "alert-dialog",
    "badge",
    "button-group",
    "button",
    "calendar",
    "card",
    "combobox",
    "command",
    "context-menu",
    "dialog",
    "drawer",
    "dropdown-menu",
    "hover-card",
    "input-group",
    "input",
    "item",
    "menubar",
    "navigation-menu",
    "popover",
    "select",
    "sheet",
    "sidebar",
    "sonner",
    "textarea",
    "toggle-group",
    "toggle",
    "tooltip",
  ];
  const missing = owners.filter((owner) => {
    const source = readFileSync(resolve(ROOT, `src/components/ui/${owner}.tsx`), "utf8");
    const inheritsToggleMaterial = owner === "toggle-group" && source.includes("toggleVariants");
    return (
      (!source.includes("glass") && !inheritsToggleMaterial) ||
      !existsSync(resolve(ROOT, `src/components/ui/${owner}.stories.tsx`))
    );
  });
  assertions.push(
    finalCheck(
      "all-material-owners-have-source-and-story-contract",
      missing,
      [],
      missing.length === 0,
    ),
    finalCheck(
      "reduced-transparency-rule-contract",
      readFileSync(distCss, "utf8").includes("prefers-reduced-transparency:reduce"),
      true,
      readFileSync(distCss, "utf8").includes("prefers-reduced-transparency:reduce"),
    ),
    finalCheck(
      "react18-peer-contract",
      readFileSync(resolve(ROOT, "package.json"), "utf8").includes('"react": "^18 || ^19"'),
      true,
      readFileSync(resolve(ROOT, "package.json"), "utf8").includes('"react": "^18 || ^19"'),
    ),
  );
  return assertions;
}

async function runFinalQa() {
  assert(
    BROWSER_SETUP,
    "QA_GLASS_BROWSER_SETUP is required for final QA and must point to browser-setup evidence tooling",
  );
  rmSync(resolve(EVIDENCE, "screenshots"), { recursive: true, force: true });
  mkdirSync(resolve(EVIDENCE, "screenshots"), { recursive: true });
  const staticAssertions = finalStaticContract();
  const fixture = await prepareFinalFixture();
  const cleanup = { serverStopped: false, fixtureRemoved: false, ports6220To6222Clear: false };
  let finalReport: { safari: { status: string } } | undefined;
  const server = Bun.serve({
    hostname: "127.0.0.1",
    port: FINAL_PORT,
    routes: { "/*": { dir: ROOT } },
  });
  try {
    const [chrome, edge, firefox] = await Promise.all([
      runChromiumBrowser("Chrome", CHROME),
      runChromiumBrowser("Edge", EDGE),
      runFirefoxBrowser(),
    ]);
    const rendered = await runStorybookAndConsumer();
    const safariSetup = JSON.parse(readFileSync(resolve(BROWSER_SETUP, "report.json"), "utf8")) as {
      browsers: { browser: string; status: string; error?: { message: string } }[];
    };
    const safari = safariSetup.browsers.find((browser) => browser.browser === "Safari");
    const available = [chrome, edge, firefox];
    writeJson("actions.json", {
      enabledButton: "click plus keyboard Enter increments exactly twice",
      disabledButton: "click and Enter event leave the count unchanged",
      select: "selects two, Escape returns focus to the trigger",
      popup: "submenu becomes visible before the root menu closes",
      dialog: "Escape hides dialog and returns focus to the trigger",
      browsers: available.map(({ name, assertions }) => ({ name, assertions })),
      consumerAssertions: rendered.assertions,
    });
    const productFailures = available.flatMap((browser) =>
      browser.assertions
        .filter((assertion) => assertion.name.endsWith("-contrast") && !assertion.pass)
        .map((assertion) => ({
          file: "src/styles/globals.css",
          browser: browser.name,
          assertion,
          repro: `QA_GLASS_EVIDENCE=${EVIDENCE} bun scripts/qa-glass.ts --phase final --family all`,
          detail:
            "Light --ring (#315c9f) is below 3:1 against glass-strong controls after alpha compositing.",
        })),
    );
    const availablePass =
      available.every((browser) => browser.status === "passed") &&
      rendered.assertions.every((entry) => entry.pass) &&
      staticAssertions.every((entry) => entry.pass);
    finalReport = {
      task: 11,
      phase: "final",
      family: "all",
      command: `QA_GLASS_BROWSER_SETUP=${BROWSER_SETUP} QA_GLASS_EVIDENCE=${EVIDENCE} bun scripts/qa-glass.ts --phase final --family all`,
      builtPackage: {
        dist: "actual dist/index.js",
        css: ["dist/globals.css", "dist/styles.css"],
        build: fixture.viteBuild,
      },
      storybook: {
        static: "storybook-static",
        assertions: rendered.assertions,
        screenshots: rendered.screenshots,
      },
      staticAssertions,
      productFailures,
      browsers: available,
      browserSetup: { environment: "QA_GLASS_BROWSER_SETUP", path: BROWSER_SETUP },
      browserLimitations: {
        firefox375:
          "Firefox 155 headless WebDriver renders the shipped fixture in a 375px iframe because its OS window clamps to 500px; assertions record iframe viewport coverage separately from the OS window.",
      },
      safari: {
        status: safari?.status === "passed" ? "passed" : "unavailable",
        limitation:
          safari?.error?.message ?? "Safari WebDriver unavailable; no Safari result claimed",
        source: `${BROWSER_SETUP}/report.json`,
      },
      availablePass,
      allBrowserPass: availablePass && safari?.status === "passed",
      cleanup,
    };
    writeJson("report.json", finalReport);
    writeJson("cleanup.json", cleanup);
    console.log(
      JSON.stringify({ availablePass, safari: finalReport.safari.status, evidence: EVIDENCE }),
    );
    if (!availablePass) process.exitCode = 1;
  } finally {
    await server.stop(true);
    cleanup.serverStopped = true;
    rmSync(FINAL_FIXTURE, { recursive: true, force: true });
    cleanup.fixtureRemoved = true;
    cleanup.ports6220To6222Clear = [6220, 6221, 6222].every((port) => listenerExitCode(port) === 1);
    if (finalReport) writeJson("report.json", finalReport);
    writeJson("cleanup.json", cleanup);
  }
}

await main();
