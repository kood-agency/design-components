import { mkdirSync } from "node:fs";
import { ROOT, closeView, openStory, shot, stopServer, waitFor } from "./qa-webview";

const theme = process.env.QA_THEME === "dark" ? "dark" : "light";
const width = Number(process.env.QA_WIDTH ?? 1440);
const port = Number(process.env.QA_PORT ?? 6104);
const evidence = `.omo/evidence/korean-saas-v2/b6-visual/${theme}-${width}`;
const story = "examples-notice-list-01--default";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function selectTab(view: Bun.WebView, label: string, panel: string) {
  await view.evaluate(
    `Array.from(document.querySelectorAll('[data-testid=notice-tabs] [role=tab]')).find((tab) => tab.textContent?.trim() === ${JSON.stringify(label)})?.click()`,
  );
  await waitFor(view, `document.querySelector(${JSON.stringify(panel)})`);
  assert(
    (await view.evaluate(
      `document.querySelector('[data-testid=notice-tabs] [role=tab][aria-selected=true]')?.textContent?.trim()`,
    )) === label,
    `${label} tab did not become selected`,
  );
}

try {
  mkdirSync(`${ROOT}/${evidence}`, { recursive: true });
  const view = await openStory(story, { theme, width, height: 900, port });
  await shot(view, `${evidence}/all.png`);
  await selectTab(view, "읽지 않음", "[data-testid=notice-unread-panel]");
  await shot(view, `${evidence}/unread.png`);
  await selectTab(view, "보관함", "[data-testid=notice-archive-panel]");
  await shot(view, `${evidence}/archive.png`);
  console.log(JSON.stringify({ theme, width, evidence }, null, 2));
} finally {
  await closeView();
  await stopServer();
}
