import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT, closeView, openStory, stopServer, waitFor } from "./qa-webview";

const STORYBOOK = resolve(ROOT, process.env.QA_STORYBOOK_DIR ?? "storybook-static");
const STORY_ID = "examples-notice-list-01--default";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function storyExists(id: string) {
  const index = JSON.parse(readFileSync(resolve(STORYBOOK, "index.json"), "utf8"));
  return Boolean(index.entries?.[id]);
}

async function main() {
  assert(existsSync(STORYBOOK), "storybook-static is missing; run pnpm build-storybook");
  assert(storyExists(STORY_ID), `required B6 story is missing from index.json: ${STORY_ID}`);

  try {
    const view = await openStory(STORY_ID, { theme: "light", width: 1440, height: 900 });
    const initial = await view.evaluate(`(() => ({
      title: document.querySelector('[data-testid=notice-list-title]')?.textContent?.trim(),
      tabs: Array.from(document.querySelectorAll('[data-testid=notice-tabs] [role=tab]')).map((tab) => tab.textContent?.trim()),
      active: document.querySelector('[data-testid=notice-tabs] [role=tab][aria-selected=true]')?.textContent?.trim(),
      section: document.querySelector('[data-testid=notice-all-panel] [data-testid=notice-section-title]')?.textContent?.trim(),
    }))()`);
    assert(
      initial.title === "알림",
      `expected Korean notice title, got ${JSON.stringify(initial.title)}`,
    );
    assert(
      JSON.stringify(initial.tabs) === JSON.stringify(["전체", "읽지 않음", "보관함"]),
      `expected Korean notice tabs, got ${JSON.stringify(initial.tabs)}`,
    );
    assert(
      initial.active === "전체",
      `expected 전체 to be selected, got ${JSON.stringify(initial.active)}`,
    );
    assert(
      initial.section === "오늘",
      `expected initial today section, got ${JSON.stringify(initial.section)}`,
    );

    await view.evaluate(
      `Array.from(document.querySelectorAll('[data-testid=notice-tabs] [role=tab]')).find((tab) => tab.textContent?.trim() === '읽지 않음')?.click()`,
    );
    await waitFor(view, `document.querySelector('[data-testid=notice-unread-panel]')`);
    assert(
      (await view.evaluate(
        `document.querySelector('[data-testid=notice-tabs] [role=tab][aria-selected=true]')?.textContent?.trim()`,
      )) === "읽지 않음",
      "clicking 읽지 않음 must select its tab",
    );
    assert(
      (await view.evaluate(
        `document.querySelector('[data-testid=notice-unread-panel] [data-testid=notice-section-title]')?.textContent?.trim()`,
      )) === "읽지 않은 알림",
      "unread tab must reveal its Korean section",
    );

    await view.evaluate(
      `Array.from(document.querySelectorAll('[data-testid=notice-tabs] [role=tab]')).find((tab) => tab.textContent?.trim() === '읽지 않음')?.focus()`,
    );
    await view.cdp("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "ArrowRight",
      code: "ArrowRight",
      windowsVirtualKeyCode: 39,
    });
    await view.cdp("Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "ArrowRight",
      code: "ArrowRight",
      windowsVirtualKeyCode: 39,
    });
    await waitFor(view, `document.activeElement?.textContent?.trim() === '보관함'`);
    await view.press("Enter");
    await waitFor(
      view,
      `document.querySelector('[data-testid=notice-tabs] [role=tab][aria-selected=true]')?.textContent?.trim() === '보관함'`,
    );
    assert(
      (await view.evaluate(
        `document.querySelector('[data-testid=notice-archive-panel] [data-testid=notice-section-title]')?.textContent?.trim()`,
      )) === "필요한 알림을 보관하면 이곳에서 다시 확인할 수 있습니다.",
      "archive tab must reveal its Korean empty section",
    );

    console.log("B6 notice showcase navigation QA passed");
  } finally {
    await closeView();
    await stopServer();
  }
}

await main();
