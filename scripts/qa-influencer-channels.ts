import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

declare const Bun: any;

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const STORYBOOK = resolve(ROOT, process.env.QA_STORYBOOK_DIR ?? "storybook-static");
const EVIDENCE = resolve(ROOT, ".omo/evidence/korean-saas-v2/a2-manual");
const PORT = Number(process.env.QA_PORT ?? 6182);
const CDP_PORT = Number(process.env.QA_CDP_PORT ?? 9282);
const TIMEOUT = 15_000;
const STORIES = [
  { id: "examples-influencer-channels-01--before", root: "influencer-before" },
  { id: "examples-influencer-channels-01--after", root: "influencer-after" },
  { id: "examples-influencer-channels-01--after-empty", root: "influencer-after-empty" },
  { id: "components-tabs--pill", root: "tabs-pill" },
] as const;
const THEMES = ["dark", "light"] as const;
const WIDTHS = [400, 1440] as const;

type CdpMessage = {
  id?: number;
  method?: string;
  params?: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: { message: string };
};

type Cdp = ReturnType<typeof connect> extends Promise<infer Value> ? Value : never;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

class Client {
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
  return new Client(socket);
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

async function navigate(cdp: Cdp, url: string, root: string) {
  const loaded = cdp.next("Page.loadEventFired");
  await cdp.command("Page.navigate", { url });
  await loaded;
  await browserValue(
    cdp,
    `new Promise((resolvePromise, reject) => { const selector = '[data-testid=${root}]'; if (document.querySelector(selector)) return resolvePromise(true); const observer = new MutationObserver(() => { if (document.querySelector(selector)) { observer.disconnect(); clearTimeout(timer); resolvePromise(true); } }); observer.observe(document.documentElement, { childList: true, subtree: true }); const timer = setTimeout(() => { observer.disconnect(); reject(new Error('story root did not render: ' + selector)); }, ${TIMEOUT}); })`,
  );
}

async function screenshot(cdp: Cdp, path: string) {
  const image = await cdp.command("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
  });
  writeFileSync(path, Buffer.from(image.data as string, "base64"));
}

function assertStoryIndex() {
  const index = JSON.parse(readFileSync(resolve(STORYBOOK, "index.json"), "utf8")) as {
    entries: Record<string, unknown>;
  };
  for (const story of STORIES)
    assert(index.entries[story.id], `missing Storybook story: ${story.id}`);
}

async function inspect(cdp: Cdp, id: (typeof STORIES)[number]["id"], width: number, theme: string) {
  const values = await browserValue<Record<string, unknown>>(
    cdp,
    `(() => {
      const query = (selector) => document.querySelector(selector);
      const root = query('[data-testid]');
      const after = query('[data-testid=influencer-after]');
      const empty = query('[data-testid=influencer-after-empty]');
      const grid = query('[data-testid=after-channel-grid]');
      return {
        theme: document.documentElement.classList.contains(${JSON.stringify(theme)}),
        root: root?.getAttribute('data-testid'),
        beforeSidebar: Boolean(query('[data-testid=influencer-before-sidebar]')),
        beforeCollapsible: query('[data-testid=influencer-before-sidebar]')
          ?.closest('[data-collapsible]')
          ?.getAttribute('data-collapsible'),
        pill: query('[data-slot=tabs-list]')?.getAttribute('data-variant'),
        count: query('[data-testid=channel-count]')?.textContent?.trim(),
        cards: after?.querySelectorAll('[data-slot=card]').length,
        rows: after?.querySelectorAll('[data-testid=channel-rows] > li').length,
        gridColumns: grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length : 0,
        empty: Boolean(query('[data-testid=after-empty-state]')),
        emptyRows: empty?.querySelectorAll('[data-testid=channel-rows] > li').length ?? 0,
        addButtons: [...document.querySelectorAll('button')].filter((button) => button.textContent?.trim() === '채널 추가').length,
      };
    })()`,
  );

  assert(values.theme === true, `${id}: ${theme} theme did not reach the rendered story`);
  if (id.endsWith("--before") && width === 1440) {
    assert(values.beforeSidebar === true, "Before must render the comparison sidebar on desktop");
    assert(values.beforeCollapsible === "", "Before must use the offcanvas sidebar variant");
  }
  if (id === "components-tabs--pill") {
    assert(values.pill === "pill", "Tabs Pill story must render the pill variant");
  }
  if (id.endsWith("--after")) {
    assert(values.pill === "pill", "After must use the Tabs pill variant");
    assert(values.count === "2개 채널", "After must place the channel count in the page header");
    assert(values.cards === 0, "After must not nest Card surfaces");
    assert(values.rows === 2, "After must render the connected Korean channel rows");
    assert(values.addButtons === 1, "After must offer one channel-add action");
    assert(
      values.gridColumns === (width === 1440 ? 2 : 1),
      `After must use ${width === 1440 ? "two" : "one"} content column(s) at ${width}px`,
    );
  }
  if (id.endsWith("--after-empty")) {
    assert(values.pill === "pill", "AfterEmpty must use the Tabs pill variant");
    assert(values.empty === true, "AfterEmpty must use the Empty composition");
    assert(values.emptyRows === 0, "AfterEmpty must not render channel rows");
    assert(values.addButtons === 2, "AfterEmpty must retain page and empty-state add actions");
  }
  return values;
}

async function assertPopupOpens(cdp: Cdp, buttonText: string, selector: string, message: string) {
  const opened = await browserValue<boolean>(
    cdp,
    `new Promise((resolvePromise, reject) => { const button = [...document.querySelectorAll('button')].find((element) => element.textContent?.trim() === ${JSON.stringify(buttonText)}); if (!(button instanceof HTMLButtonElement)) return reject(new Error('trigger not found: ${buttonText}')); const selector = ${JSON.stringify(selector)}; const observer = new MutationObserver(() => { if (document.querySelector(selector)) { observer.disconnect(); clearTimeout(timer); resolvePromise(true); } }); observer.observe(document.body, { childList: true, subtree: true }); const timer = setTimeout(() => { observer.disconnect(); reject(new Error(${JSON.stringify(message)})); }, ${TIMEOUT}); button.click(); })`,
  );
  assert(opened, message);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length > 0)
    throw new Error(`unsupported qa-influencer-channels option: ${args.join(" ")}`);

  assertStoryIndex();
  rmSync(EVIDENCE, { recursive: true, force: true });
  mkdirSync(EVIDENCE, { recursive: true });
  const server = Bun.serve({
    hostname: "127.0.0.1",
    port: PORT,
    routes: { "/*": { dir: STORYBOOK } },
  });
  const profile = await mkdtemp(resolve(tmpdir(), "kood-influencer-channels-"));
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
  const report: Record<string, unknown> = { storybook: STORYBOOK, checks: [] };
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

    for (const theme of THEMES) {
      for (const width of WIDTHS) {
        await cdp.command("Emulation.setDeviceMetricsOverride", {
          width,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false,
        });
        for (const story of STORIES) {
          await navigate(
            cdp,
            `http://127.0.0.1:${PORT}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme};font:pretendard`,
            story.root,
          );
          const values = await inspect(cdp, story.id, width, theme);
          await screenshot(cdp, resolve(EVIDENCE, `${story.id}-${theme}-${width}.png`));
          if (story.id.endsWith("--before") && width === 400)
            await assertPopupOpens(
              cdp,
              "메뉴 열기",
              "[data-mobile=true]",
              "Before mobile offcanvas sidebar did not open",
            );
          if (story.id.endsWith("--after") || story.id.endsWith("--after-empty"))
            await assertPopupOpens(
              cdp,
              "채널 추가",
              "[data-testid=after-channel-sheet]",
              "channel-add sheet did not open",
            );
          (report.checks as unknown[]).push({ id: story.id, theme, width, values });
        }
      }
    }
    writeFileSync(resolve(EVIDENCE, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
    console.log("qa-influencer-channels: static stories, responsive layouts, and sheets passed");
  } catch (error) {
    report.error = String(error);
    writeFileSync(resolve(EVIDENCE, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
    throw error;
  } finally {
    cdp?.close();
    chrome.kill();
    try {
      await chrome.exited;
    } catch {
      // Chrome may already be gone.
    }
    await server.stop(true);
    rmSync(profile, { recursive: true, force: true });
  }
}

await main();
