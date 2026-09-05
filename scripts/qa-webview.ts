/**
 * QA harness for Storybook screenshot QA (Bun-only, not shipped, outside tsc include).
 *
 * Starts a static Bun.serve on the given port serving `storybook-static`, drives
 * `Bun.WebView` (Chrome backend so CDP hover emulation is available) against the
 * built iframe, and exports polling helpers. Fixed sleeps are forbidden: every
 * wait polls via `view.evaluate` at 50ms up to a bounded timeout.
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";

export const ROOT = resolve(import.meta.dir, "..");

/** Story id -> iframe URL (Storybook kebab rule: title--export). */
export function storyUrl(id, { theme, font, port = 6104 } = {}) {
  const params = new URLSearchParams();
  if (theme) params.set("globals", `theme:${theme}${font ? `;font:${font}` : ""}`);
  else if (font) params.set("globals", `font:${font}`);
  const qs = params.toString();
  return `http://127.0.0.1:${port}/iframe.html?id=${id}${qs ? `&${qs}` : ""}`;
}

let _server;
export async function startServer(port = 6104, dir = "storybook-static") {
  if (_server) return _server;
  const staticDir = resolve(ROOT, dir);
  if (!existsSync(staticDir))
    throw new Error(`static dir not found: ${staticDir} (run pnpm build-storybook first)`);
  _server = Bun.serve({
    port,
    routes: {
      "/*": { dir: staticDir },
    },
  });
  return _server;
}

export async function stopServer() {
  if (_server) {
    await _server.stop(true);
    _server = null;
  }
}

/** Poll `view.evaluate(expr)` every 50ms until truthy or timeoutMs elapses. */
export async function waitFor(view, expr, timeoutMs = 10_000) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    if (await view.evaluate(expr)) return true;
    if (Date.now() > deadline) throw new Error(`waitFor timed out after ${timeoutMs}ms: ${expr}`);
    await Bun.sleep(50);
  }
}

let _view;
/** Ensure an open view exists (spawns one if closed/none) and navigate to the story iframe. */
async function ensureView({ width, height }) {
  if (!_view) {
    _view = new Bun.WebView({ width, height, backend: "chrome" });
  }
  return _view;
}

export async function openStory(id, { theme, font, width = 1024, height = 768, port = 6104 } = {}) {
  await startServer(port);
  const view = await ensureView({ width, height });
  await view.navigate(storyUrl(id, { theme, font, port }));
  await waitFor(
    view,
    `document.readyState === 'complete' && !!document.querySelector('#storybook-root > *')`,
  );
  return view;
}

/** Close the shared view if open. The next openStory spawns a fresh one. */
export async function closeView() {
  if (_view) {
    try {
      _view.close();
    } finally {
      _view = null;
    }
  }
  Bun.WebView.closeAll();
}

export async function computed(view, selector, prop) {
  return view.evaluate(
    `(() => { const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return null; return getComputedStyle(el).getPropertyValue(${JSON.stringify(prop)}); })()`,
  );
}

export async function press(view, key, options) {
  return view.press(key, options);
}

/** Emulate a hover at the given element's center via CDP mouse events (Chrome backend). */
export async function hoverAt(view, selector) {
  const { x, y } = await view.evaluate(
    `(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) }; })()`,
  );
  await view.cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  return { x, y };
}

/** Click at an offset (dx, dy) from the element's top-left corner. */
export async function clickAt(view, selector, dx = 0, dy = 0) {
  const { x, y } = await view.evaluate(
    `(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: Math.round(r.x) + ${dx}, y: Math.round(r.y) + ${dy} }; })()`,
  );
  await view.cdp("Input.dispatchMouseEvent", {
    type: "mousePressed",
    x,
    y,
    button: "left",
    clickCount: 1,
  });
  await view.cdp("Input.dispatchMouseEvent", {
    type: "mouseReleased",
    x,
    y,
    button: "left",
    clickCount: 1,
  });
  return { x, y };
}

/** Screenshot the viewport to `path` (resolved against the evidence dir). */
export async function shot(view, path) {
  const buf = await view.screenshot({ encoding: "buffer" });
  await Bun.write(resolve(import.meta.dir, "..", path), buf);
  return path;
}

// ---- self-test ---------------------------------------------------------------

if (process.argv[1] && import.meta.path === resolve(process.argv[1])) {
  const theme = process.env.QA_THEME ?? "dark";
  try {
    const view = await openStory("components-button--default", { theme });
    await waitFor(
      view,
      `getComputedStyle(document.documentElement).getPropertyValue('--background').trim() !== ''`,
    );
    const cls = await view.evaluate(`document.documentElement.className`);
    const bg = (await computed(view, "html", "--background")).trim();
    console.log(`theme=${theme} className="${cls}" --background=${bg}`);
    if (!cls.includes(theme))
      throw new Error(`expected className to contain "${theme}", got "${cls}"`);
    if (bg !== "#0A1724" && bg !== "#0a1724") {
      throw new Error(`expected --background #0A1724 in dark, got ${bg}`);
    }
    await closeView();
  } finally {
    await stopServer();
  }
}
