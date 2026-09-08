import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const EVIDENCE_DIR = resolve(
  ROOT,
  process.env.QA_EVIDENCE_DIR ?? ".omo/evidence/kood-internal-charcoal",
);
const STORYBOOK_DIR = resolve(ROOT, process.env.QA_STORYBOOK_DIR ?? "storybook-static");
const PORT = Number(process.env.QA_PORT ?? 6176);
const CDP_PORT = Number(process.env.QA_CDP_PORT ?? 9276);
const TIMEOUT = 15_000;

const darkTokens = {
  "--background": "#0d1117",
  "--card": "#161b22",
  "--sidebar": "#161b22",
  "--secondary": "#21262d",
  "--muted": "#21262d",
  "--popover": "#272e37",
  "--border": "#30363d",
  "--sidebar-border": "#30363d",
  "--code-border": "#30363d",
  "--input": "#737d8c",
  "--code": "#090c10",
  "--overlay": "#010409b8",
  "--primary-foreground": "#0d1117",
  "--sidebar-primary-foreground": "#0d1117",
  "--destructive-foreground": "#090c10",
  "--success-foreground": "#090c10",
  "--warning-foreground": "#090c10",
} as const;
const lightTokens = {
  "--background": "#f6f8fb",
  "--foreground": "#0a1724",
  "--card": "#ffffff",
  "--popover": "#e5ebf1",
  "--secondary": "#eff3f7",
  "--muted": "#eff3f7",
  "--primary": "#0a1724",
  "--primary-foreground": "#ffffff",
  "--border": "#d7e0e9",
  "--input": "#7b8ea1",
  "--overlay": "#07131f66",
  "--code": "#eff3f7",
  "--code-border": "#d7e0e9",
  "--sidebar": "#ffffff",
  "--sidebar-border": "#d7e0e9",
  "--kood-shadow-raised": "0 1px 2px #0a17240f, 0 8px 24px #0a172414",
} as const;
const radiusNames = [
  "--radius-xs",
  "--radius-sm",
  "--radius-md",
  "--radius-lg",
  "--radius-xl",
  "--radius-2xl",
] as const;
const radiusCases = [
  { base: 0, expected: [0, 0, 0, 0, 0, 0] },
  { base: 4, expected: [2, 3, 4, 6, 8, 12] },
  { base: 8, expected: [4, 6, 8, 12, 16, 24] },
  { base: 12, expected: [6, 9, 12, 18, 24, 36] },
] as const;
const primitiveStories = {
  button: "components-button--default",
  input: "components-input--default",
  select: "components-select--default",
  tabs: "components-tabs--default",
  card: "components-card--default",
  table: "components-table--default",
} as const;
const screenStories = {
  dashboard: "examples-dashboard-01--default",
  login: "examples-login-01--default",
  signup: "examples-signup-01--default",
} as const;

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
    .replace(/^#([\da-f])([\da-f])([\da-f])$/, "#$1$1$2$2$3$3");
}
function equal(label: string, actual: string, expected: string) {
  if (normalize(actual) !== normalize(expected))
    throw new Error(`${label}: expected ${expected}, got ${actual || "(empty)"}`);
}

class Cdp {
  private id = 0;
  private pending = new Map<
    number,
    { resolve: (result: Record<string, unknown>) => void; reject: (error: Error) => void }
  >();
  private listeners = new Map<string, Set<(params: Record<string, unknown>) => void>>();
  constructor(private readonly socket: WebSocket) {
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
function storyUrl(id: string, theme: string, font: string) {
  return `http://127.0.0.1:${PORT}/iframe.html?id=${id}&globals=${encodeURIComponent(`theme:${theme};font:${font}`)}`;
}
async function load(cdp: Cdp, id: string, theme: string, font: string, width: number) {
  await cdp.command("Emulation.setDeviceMetricsOverride", {
    width,
    height: 812,
    deviceScaleFactor: 1,
    mobile: width === 375,
  });
  const loaded = cdp.next("Page.loadEventFired");
  await cdp.command("Page.navigate", { url: storyUrl(id, theme, font) });
  await loaded;
  await evaluate(
    cdp,
    `new Promise((resolvePromise, reject) => { const ready = () => document.readyState === "complete" && Boolean(document.querySelector("#storybook-root > *")); if (ready()) return resolvePromise(true); const observer = new MutationObserver(() => { if (ready()) { observer.disconnect(); clearTimeout(timer); resolvePromise(true); } }); observer.observe(document.documentElement, { childList: true, subtree: true }); const timer = setTimeout(() => { observer.disconnect(); reject(new Error("Story did not render")); }, ${TIMEOUT}); })`,
  );
}
async function screenshot(cdp: Cdp, name: string) {
  const image = await cdp.command("Page.captureScreenshot", { format: "png" });
  await Bun.write(resolve(EVIDENCE_DIR, name), Buffer.from(image.data as string, "base64"));
  return name;
}

function verifyStoryIndex() {
  const indexPath = resolve(STORYBOOK_DIR, "index.json");
  if (!existsSync(indexPath)) throw new Error(`missing Storybook output: ${indexPath}`);
  const entries = Object.keys(JSON.parse(readFileSync(indexPath, "utf8")).entries ?? {});
  for (const id of [...Object.values(primitiveStories), ...Object.values(screenStories)])
    if (!entries.includes(id)) throw new Error(`required Storybook story is missing: ${id}`);
}
async function radius(cdp: Cdp, property: string) {
  return evaluate<string>(
    cdp,
    `(() => { const probe = document.createElement("i"); probe.style.borderRadius = "var(${property})"; document.body.append(probe); const value = getComputedStyle(probe).borderTopLeftRadius; probe.remove(); return value; })()`,
  );
}

async function verifyTokensAndRadii(cdp: Cdp) {
  const modes: Record<string, Record<string, string>> = {};
  for (const theme of ["dark", "light"] as const) {
    await load(cdp, primitiveStories.button, theme, "pretendard", 1280);
    const expectedTokens = theme === "dark" ? darkTokens : lightTokens;
    modes[theme] = {};
    for (const [property, expected] of Object.entries(expectedTokens)) {
      const actual = await evaluate<string>(
        cdp,
        `getComputedStyle(document.documentElement).getPropertyValue(${JSON.stringify(property)}).trim()`,
      );
      equal(`${theme} ${property}`, actual, expected);
      modes[theme][property] = actual;
    }
    for (const { base, expected } of radiusCases) {
      await evaluate(cdp, `document.documentElement.style.setProperty("--radius", "${base}px")`);
      for (const [index, property] of radiusNames.entries())
        equal(
          `${theme} base${base} ${property}`,
          await radius(cdp, property),
          `${expected[index]}px`,
        );
    }
    await evaluate(
      cdp,
      `(() => { document.documentElement.style.setProperty("--radius", "8px"); document.documentElement.style.setProperty("--radius-md", "7px"); })()`,
    );
    for (const [index, property] of radiusNames.entries())
      equal(
        `${theme} named-md7 ${property}`,
        await radius(cdp, property),
        `${property === "--radius-md" ? 7 : radiusCases[2].expected[index]}px`,
      );
    await evaluate(cdp, `document.documentElement.removeAttribute("style")`);
    await screenshot(cdp, `task-7-tokens-${theme}.png`);
  }
  return modes;
}

async function verifyContrast(cdp: Cdp) {
  const report: Record<string, Record<string, number>> = {};
  for (const theme of ["dark", "light"] as const) {
    await load(cdp, primitiveStories.button, theme, "pretendard", 1280);
    const values = await evaluate<Record<string, number>>(
      cdp,
      `(() => {
      const css = getComputedStyle(document.documentElement);
      const rgb = (name) => { let value = css.getPropertyValue(name).trim().replace("#", ""); if (value.length === 3) value = value.split("").map((channel) => channel + channel).join(""); const alpha = value.length === 8 ? parseInt(value.slice(6), 16) / 255 : 1; return { r: parseInt(value.slice(0, 2), 16), g: parseInt(value.slice(2, 4), 16), b: parseInt(value.slice(4, 6), 16), a: alpha }; };
      const luminance = (color) => [color.r, color.g, color.b].map((channel) => { const normalized = channel / 255; return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4; }).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
      const contrast = (a, b) => { const [high, low] = [luminance(a), luminance(b)].sort((left, right) => right - left); return (high + 0.05) / (low + 0.05); };
      const composite = (foreground, background) => ({ r: foreground.r * foreground.a + background.r * (1 - foreground.a), g: foreground.g * foreground.a + background.g * (1 - foreground.a), b: foreground.b * foreground.a + background.b * (1 - foreground.a) });
      const background = rgb("--background"), card = rgb("--card"), popover = rgb("--popover"), foreground = rgb("--foreground"), popoverForeground = rgb("--popover-foreground"), input = rgb("--input"), ring = rgb("--ring"), border = rgb("--border"), overlay = rgb("--overlay");
      return { textOnCanvas: contrast(foreground, background), textOnPopover: contrast(popoverForeground, popover), inputOnCard: contrast(input, card), ringOnCanvas: contrast(ring, background), borderOnCard: contrast(border, card), overlayOnCanvas: contrast(composite(overlay, background), background) };
    })()`,
    );
    assert(values.textOnCanvas >= 4.5, `${theme} text contrast is ${values.textOnCanvas}`);
    assert(
      values.textOnPopover >= 4.5,
      `${theme} popover text contrast is ${values.textOnPopover}`,
    );
    assert(values.inputOnCard >= 3, `${theme} input boundary contrast is ${values.inputOnCard}`);
    assert(values.ringOnCanvas >= 3, `${theme} focus ring contrast is ${values.ringOnCanvas}`);
    report[theme] = values;
  }
  return report;
}

async function verifyRealStoryFont(cdp: Cdp, font: "pretendard" | "wanted") {
  const family = font === "wanted" ? "Wanted Sans Variable" : "Pretendard Variable";
  return evaluate<{
    requested: number;
    loaded: number;
    check: boolean;
    width: number;
    height: number;
  }>(
    cdp,
    `(() => { const family = ${JSON.stringify(family)}; const sample = "한국ABC"; return document.fonts.load('24px "' + family + '"', sample).then((requested) => { const faces = Array.from(document.fonts).filter((face) => face.family.includes(family)); const loaded = faces.filter((face) => face.status === "loaded"); const context = document.createElement("canvas").getContext("2d"); if (!context) throw new Error('missing metrics probe'); context.font = '24px "' + family + '"'; const metrics = context.measureText(sample); if (requested.length === 0 || loaded.length === 0 || !document.fonts.check('24px "' + family + '"', sample) || metrics.width <= 0 || metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent <= 0) throw new Error('required font asset ' + family + ' failed for Korean/Latin sample'); return { requested: requested.length, loaded: loaded.length, check: document.fonts.check('24px "' + family + '"', sample), width: metrics.width, height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent }; }).catch(() => { throw new Error('required font asset ' + family + ' failed for Korean/Latin sample'); }); })()`,
  );
}

async function inspectStory(
  cdp: Cdp,
  id: string,
  theme: "dark" | "light",
  font: "pretendard" | "wanted",
  width: number,
  kind: "primitive" | "screen",
) {
  await load(cdp, id, theme, font, width);
  const fontMetrics = await verifyRealStoryFont(cdp, font);
  const result = await evaluate<Record<string, string | number | boolean | null>>(
    cdp,
    `(() => { const read = (selector) => document.querySelector(selector); const button = read('[data-slot="button"]'); const input = read('[data-slot="input"]'); const select = read('[data-slot="select-trigger"]'); return { viewport: window.innerWidth, documentWidth: document.documentElement.scrollWidth, font: getComputedStyle(document.documentElement).fontFamily, buttonHeight: button ? button.getBoundingClientRect().height : null, inputHeight: input ? input.getBoundingClientRect().height : null, selectHeight: select ? select.getBoundingClientRect().height : null, hasTabs: Boolean(read('[data-slot="tabs"]')), hasCard: Boolean(read('[data-slot="card"]')), hasTable: Boolean(read('[data-slot="table"]')), focusToken: getComputedStyle(document.documentElement).getPropertyValue("--ring").trim(), korean: /한국|회사|계정/.test(document.body.textContent || "") }; })()`,
  );
  assert(result.viewport === width, `${id} ${width}px viewport was ${result.viewport}px`);
  assert(
    Number(result.documentWidth) <= width,
    `${id} ${width}px document overflowed to ${result.documentWidth}px`,
  );
  assert(
    String(result.font).includes(font === "wanted" ? "Wanted Sans" : "Pretendard"),
    `${id} did not apply ${font}: ${result.font}`,
  );
  assert(result.focusToken !== "", `${id} has no focus token`);
  if (kind === "primitive") {
    if (id === primitiveStories.button)
      assert(
        result.buttonHeight === (width === 375 ? 44 : 40),
        `Button height mismatch at ${width}px: ${result.buttonHeight}`,
      );
    if (id === primitiveStories.input)
      assert(
        result.inputHeight === (width === 375 ? 44 : 40),
        `Input height mismatch at ${width}px: ${result.inputHeight}`,
      );
    if (id === primitiveStories.select)
      assert(
        result.selectHeight === (width === 375 ? 44 : 40),
        `Select height mismatch at ${width}px: ${result.selectHeight}`,
      );
    if (id === primitiveStories.tabs) assert(result.hasTabs, "Tabs primitive did not render");
    if (id === primitiveStories.card) assert(result.hasCard, "Card primitive did not render");
    if (id === primitiveStories.table) assert(result.hasTable, "Table primitive did not render");
  } else assert(result.korean, `${id} did not render Korean content`);
  await screenshot(cdp, `task-7-${kind}-${id}-${theme}-${font}-${width}.png`);
  return { ...result, fontMetrics };
}

async function key(cdp: Cdp, keyName: "ArrowRight" | "Enter" | "Escape") {
  const details = {
    ArrowRight: { code: "ArrowRight", keyCode: 39 },
    Enter: { code: "Enter", keyCode: 13 },
    Escape: { code: "Escape", keyCode: 27 },
  }[keyName];
  await cdp.command("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: keyName,
    code: details.code,
    text: keyName === "Enter" ? "\r" : undefined,
    unmodifiedText: keyName === "Enter" ? "\r" : undefined,
    windowsVirtualKeyCode: details.keyCode,
    nativeVirtualKeyCode: details.keyCode,
  });
  await cdp.command("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: keyName,
    code: details.code,
    windowsVirtualKeyCode: details.keyCode,
    nativeVirtualKeyCode: details.keyCode,
  });
}
async function verifyInteractions(cdp: Cdp) {
  await load(cdp, "components-button--interaction-states", "dark", "pretendard", 1280);
  await evaluate(cdp, `document.querySelector('[data-testid="disabled-button"]')?.click()`);
  equal(
    "disabled button activation",
    await evaluate(
      cdp,
      `document.querySelector('[data-testid="disabled-click-count"]')?.textContent ?? ""`,
    ),
    "0",
  );
  await load(cdp, "components-select--controlled-null", "light", "pretendard", 1280);
  equal(
    "controlled null Select",
    await evaluate(
      cdp,
      `document.querySelector('[data-slot="select-value"]')?.textContent?.trim() ?? ""`,
    ),
    "Select a fruit",
  );
  await evaluate(cdp, `document.querySelector('[data-slot="select-trigger"]')?.focus()`);
  await key(cdp, "Escape");
  equal(
    "Escape Select focus",
    await evaluate(cdp, `document.activeElement?.getAttribute("data-slot") ?? ""`),
    "select-trigger",
  );
  await load(cdp, "components-button--focus", "dark", "pretendard", 1280);
  equal(
    "focus story",
    await evaluate(cdp, `document.activeElement?.getAttribute("data-slot") ?? ""`),
    "button",
  );
  await load(cdp, "components-button--loading", "dark", "pretendard", 1280);
  assert(
    await evaluate(cdp, `Boolean(document.querySelector('[data-slot="button"][disabled] svg'))`),
    "loading Button did not retain disabled spinner state",
  );
  await load(cdp, "components-input--invalid", "light", "pretendard", 1280);
  assert(
    await evaluate(
      cdp,
      `document.querySelector('[data-slot="input"]')?.getAttribute("aria-invalid") === "true" && Boolean(document.querySelector('[role="alert"]'))`,
    ),
    "invalid Input state is missing its error relationship",
  );
  await load(cdp, "components-select--disabled", "light", "pretendard", 1280);
  assert(
    await evaluate(
      cdp,
      `Boolean(document.querySelector('[data-slot="select-trigger"][disabled], [data-slot="select-trigger"][data-disabled]'))`,
    ),
    "disabled Select state did not render",
  );
  await load(cdp, "components-tabs--disabled", "light", "pretendard", 1280);
  assert(
    await evaluate(
      cdp,
      `Boolean([...document.querySelectorAll('[role="tab"]')].find((tab) => tab.textContent?.trim() === "보안" && (tab.hasAttribute("disabled") || tab.hasAttribute("data-disabled"))))`,
    ),
    "disabled Tabs state did not render",
  );
  await load(cdp, "components-table--selected", "light", "pretendard", 1280);
  assert(
    await evaluate(
      cdp,
      `Boolean(document.querySelector('[data-slot="table-row"][data-selected]'))`,
    ),
    "selected Table row state did not render",
  );
  await load(cdp, "components-input--default", "light", "pretendard", 1280);
  assert(
    await evaluate(
      cdp,
      `(() => { const input = document.querySelector('[data-slot="input"]'); input?.focus(); input?.select(); return input?.selectionEnd === input?.value.length && input?.selectionEnd !== input?.selectionStart; })()`,
    ),
    "Input selection state did not render",
  );
  await load(cdp, "components-tabs--default", "dark", "pretendard", 1280);
  await evaluate(cdp, `document.querySelector('[role="tab"][aria-selected="true"]')?.focus()`);
  await key(cdp, "ArrowRight");
  equal(
    "Tabs arrow is manual",
    await evaluate(
      cdp,
      `document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim() ?? ""`,
    ),
    "계정",
  );
  await key(cdp, "Enter");
  equal(
    "Tabs Enter selection",
    await evaluate(
      cdp,
      `document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim() ?? ""`,
    ),
    "보안",
  );
  return {
    disabledButton: "passed",
    selectNullEscape: "passed",
    tabsManualActivation: "passed",
    focus: "passed",
    loading: "passed",
    error: "passed",
    disabled: "passed",
    selection: "passed",
  };
}

async function main() {
  mkdirSync(EVIDENCE_DIR, { recursive: true });
  verifyStoryIndex();
  const server = Bun.serve({
    hostname: "127.0.0.1",
    port: PORT,
    routes: { "/*": { dir: STORYBOOK_DIR } },
  });
  const profile = await mkdtemp(resolve(tmpdir(), "kood-task-7-internal-"));
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
    if (!response.ok) throw new Error(`Chrome target creation failed: ${response.status}`);
    const target = (await response.json()) as { webSocketDebuggerUrl: string };
    cdp = await connect(target.webSocketDebuggerUrl);
    await cdp.command("Page.enable");
    await cdp.command("Runtime.enable");
    const tokens = await verifyTokensAndRadii(cdp);
    const contrast = await verifyContrast(cdp);
    const interactions = await verifyInteractions(cdp);
    const matrix: Record<string, unknown[]> = {};
    for (const [name, id] of Object.entries(primitiveStories)) {
      matrix[name] = [];
      for (const width of [375, 768, 1280])
        for (const theme of ["dark", "light"] as const)
          for (const font of ["pretendard", "wanted"] as const)
            matrix[name].push(await inspectStory(cdp, id, theme, font, width, "primitive"));
    }
    for (const [name, id] of Object.entries(screenStories)) {
      matrix[name] = [];
      for (const width of [375, 768, 1280])
        for (const theme of ["dark", "light"] as const)
          for (const font of ["pretendard", "wanted"] as const)
            matrix[name].push(await inspectStory(cdp, id, theme, font, width, "screen"));
    }
    await Bun.write(
      resolve(EVIDENCE_DIR, "task-7-internal.json"),
      `${JSON.stringify({ task: 7, tokens, contrast, interactions, matrix }, null, 2)}\n`,
    );
    console.log("internal charcoal QA passed");
  } finally {
    cdp?.close();
    chrome.kill();
    try {
      await chrome.exited;
    } catch {
      /* Chrome may already have exited after CDP disconnect. */
    }
    await server.stop(true);
    await rm(profile, { recursive: true, force: true });
  }
}
await main();
