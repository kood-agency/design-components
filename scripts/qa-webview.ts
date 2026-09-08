/**
 * QA harness for Storybook screenshot QA (Bun-only, not shipped, outside tsc include).
 *
 * Starts a static Bun.serve on the given port serving `storybook-static`, drives
 * `Bun.WebView` (Chrome backend so CDP hover emulation is available) against the
 * built iframe, and exports bounded subscription helpers. Fixed sleeps are
 * forbidden: readiness waits observe the document before awaiting a change.
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

/** Resolve when `expr` becomes truthy through a DOM lifecycle or mutation signal. */
export async function waitFor(view, expr, timeoutMs = 10_000) {
  const ready = await view.evaluate(`
    new Promise((resolve) => {
      const matches = () => {
        try {
          return Boolean(${expr});
        } catch {
          return false;
        }
      };
      let timeout;
      const finish = (value) => {
        observer.disconnect();
        document.removeEventListener("readystatechange", onSignal);
        window.removeEventListener("load", onSignal);
        clearTimeout(timeout);
        resolve(value);
      };
      const onSignal = () => {
        if (matches()) finish(true);
      };
      const observer = new MutationObserver(onSignal);
      observer.observe(document.documentElement, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
      if (matches()) {
        finish(true);
        return;
      }
      document.addEventListener("readystatechange", onSignal);
      window.addEventListener("load", onSignal, { once: true });
      timeout = setTimeout(() => finish(false), ${timeoutMs});
    })
  `);
  if (!ready) throw new Error(`waitFor timed out after ${timeoutMs}ms: ${expr}`);
  return true;
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
  const port = Number(process.env.QA_PORT ?? 6104);
  const storybookDir = process.env.QA_STORYBOOK_DIR ?? "storybook-static";
  try {
    await startServer(port, storybookDir);
    const view = await openStory("components-button--default", { theme, port });
    await waitFor(
      view,
      `getComputedStyle(document.documentElement).getPropertyValue('--background').trim() !== ''`,
    );
    const cls = await view.evaluate(`document.documentElement.className`);
    const bg = (await computed(view, "html", "--background")).trim();
    console.log(`theme=${theme} className="${cls}" --background=${bg}`);
    if (!cls.includes(theme))
      throw new Error(`expected className to contain "${theme}", got "${cls}"`);
    const expectedBackground = theme === "light" ? "#f6f8fb" : "#0d1117";
    if (bg.toLowerCase() !== expectedBackground) {
      throw new Error(`expected --background ${expectedBackground} in ${theme}, got ${bg}`);
    }
    await closeView();
  } finally {
    await stopServer();
  }
}
