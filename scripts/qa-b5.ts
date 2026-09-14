import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT, closeView, openStory, stopServer, waitFor } from "./qa-webview";

const STORYBOOK = resolve(ROOT, process.env.QA_STORYBOOK_DIR ?? "storybook-static");

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function storyExists(id: string) {
  const index = JSON.parse(readFileSync(resolve(STORYBOOK, "index.json"), "utf8"));
  return Boolean(index.entries?.[id]);
}

async function text(view: Bun.WebView, selector: string) {
  const value = await view.evaluate(
    `document.querySelector(${JSON.stringify(selector)})?.textContent?.trim()`,
  );
  assert(typeof value === "string", `missing ${selector}`);
  return value;
}

async function verifyLabels() {
  const defaults: Array<[string, string, string, string]> = [
    ["components-breadcrumb--default", "[data-slot=breadcrumb]", "aria-label", "현재 위치"],
    ["components-pagination--default", "[data-slot=pagination]", "aria-label", "페이지 탐색"],
    ["components-carousel--vertical", "[data-slot=carousel]", "aria-label", "슬라이드"],
    ["components-spinner--default", "[data-slot=spinner]", "aria-label", "로딩 중"],
  ];

  for (const [story, selector, attribute, expected] of defaults) {
    const view = await openStory(story, { theme: "light" });
    assert(
      (await view.evaluate(
        `document.querySelector(${JSON.stringify(selector)})?.getAttribute(${JSON.stringify(attribute)})`,
      )) === expected,
      `${story} must expose Korean ${attribute}=${expected}`,
    );
    assert(
      (await view.evaluate(
        `document.querySelector(${JSON.stringify(selector)})?.hasAttribute("label")`,
      )) === false,
      `${story} leaked its label prop to the DOM`,
    );
  }

  const pagination = await openStory("components-pagination--default", { theme: "light" });
  assert(
    (await text(pagination, 'a[aria-label="이전 페이지로 이동"] .hidden')) === "이전",
    "previous text must be Korean",
  );
  assert(
    (await text(pagination, 'a[aria-label="다음 페이지로 이동"] .hidden')) === "다음",
    "next text must be Korean",
  );
  assert(
    (await pagination.evaluate(
      `document.querySelector('a[aria-label="이전 페이지로 이동"]')?.getAttribute("aria-label")`,
    )) === "이전 페이지로 이동",
    "previous pagination label must be Korean",
  );

  const carousel = await openStory("components-carousel--vertical", { theme: "light" });
  assert(
    (await text(carousel, "[data-slot=carousel-previous] .sr-only")) === "이전 슬라이드" &&
      (await text(carousel, "[data-slot=carousel-next] .sr-only")) === "다음 슬라이드",
    "carousel controls must use Korean defaults",
  );

  const sidebar = await openStory("components-sidebar--mobile", { theme: "light" });
  assert(
    (await sidebar.evaluate(
      `document.querySelector("[data-slot=sidebar]")?.getAttribute("aria-label")`,
    )) === "사이드바",
    "sidebar must use the Korean default label",
  );
  assert(
    (await text(sidebar, "[data-slot=sidebar-trigger] .sr-only")) === "사이드바 전환",
    "sidebar trigger must use the Korean default",
  );

  const command = await openStory("components-command--dialog", { theme: "light" });
  await command.evaluate(`document.querySelector("#storybook-root [data-slot=button]")?.click()`);
  await waitFor(command, `document.querySelector("[data-slot=dialog-content]")`);
  assert(
    (await text(command, "[data-slot=dialog-title]")) === "명령 팔레트",
    "command title must be Korean",
  );
  assert(
    (await text(command, "[data-slot=dialog-description]")) === "실행할 명령을 검색하세요.",
    "command description must be Korean",
  );

  const calendar = await openStory("components-calendar--korean-default", { theme: "light" });
  assert(
    (await text(calendar, ".rdp-caption_label")) === "2026년 9월",
    "calendar caption must be Korean",
  );
  assert(
    (await calendar.evaluate(
      `document.querySelector(".rdp-button_previous")?.getAttribute("aria-label")`,
    )) === "이전 달",
    "calendar previous label must be Korean",
  );

  const dialogDefault = await openStory("components-dialog--default", { theme: "light" });
  await dialogDefault.evaluate(`document.querySelector("[data-slot=dialog-trigger]")?.click()`);
  await waitFor(dialogDefault, `document.querySelector("[data-slot=dialog-content]")`);
  assert(
    (await text(dialogDefault, "[data-slot=dialog-close] .sr-only")) === "닫기",
    "dialog default must be Korean",
  );

  const sheetDefault = await openStory("components-sheet--left", { theme: "light" });
  await sheetDefault.evaluate(`document.querySelector("[data-slot=sheet-trigger]")?.click()`);
  await waitFor(sheetDefault, `document.querySelector("[data-slot=sheet-content]")`);
  assert(
    (await text(sheetDefault, "[data-slot=sheet-close] .sr-only")) === "닫기",
    "sheet default must be Korean",
  );

  const overrides: Array<[string, string, string, string]> = [
    [
      "components-breadcrumb--english-override",
      "[data-slot=breadcrumb]",
      "aria-label",
      "breadcrumb",
    ],
    [
      "components-pagination--english-override",
      "[data-slot=pagination]",
      "aria-label",
      "pagination",
    ],
    ["components-carousel--english-override", "[data-slot=carousel]", "aria-label", "carousel"],
  ];
  for (const [story, selector, attribute, expected] of overrides) {
    const view = await openStory(story, { theme: "light" });
    assert(
      (await view.evaluate(
        `document.querySelector(${JSON.stringify(selector)})?.getAttribute(${JSON.stringify(attribute)})`,
      )) === expected,
      `${story} did not preserve the caller override`,
    );
  }

  const sidebarOverride = await openStory("components-sidebar--english-override", {
    theme: "light",
  });
  assert(
    (await sidebarOverride.evaluate(
      `document.querySelector("[data-slot=sidebar]")?.getAttribute("aria-label")`,
    )) === "Sidebar",
    "sidebar label override was lost",
  );
  assert(
    (await text(sidebarOverride, "[data-slot=sidebar-trigger] .sr-only")) === "Toggle Sidebar",
    "sidebar trigger override was lost",
  );

  const calendarOverride = await openStory("components-calendar--english-override", {
    theme: "light",
  });
  assert(
    (await text(calendarOverride, ".rdp-caption_label")) === "September 2026",
    "calendar locale override was lost",
  );

  const dialogOverride = await openStory("components-dialog--english-override", { theme: "light" });
  await dialogOverride.evaluate(`document.querySelector("[data-slot=dialog-trigger]")?.click()`);
  await waitFor(dialogOverride, `document.querySelector("[data-slot=dialog-content]")`);
  assert(
    (await text(dialogOverride, "[data-slot=dialog-close] .sr-only")) === "Close",
    "dialog override was lost",
  );

  const sheetOverride = await openStory("components-sheet--english-override", { theme: "light" });
  await sheetOverride.evaluate(`document.querySelector("[data-slot=sheet-trigger]")?.click()`);
  await waitFor(sheetOverride, `document.querySelector("[data-slot=sheet-content]")`);
  assert(
    (await text(sheetOverride, "[data-slot=sheet-close] .sr-only")) === "Close",
    "sheet override was lost",
  );

  const commandOverride = await openStory("components-command--english-override", {
    theme: "light",
  });
  await commandOverride.evaluate(
    `document.querySelector("#storybook-root [data-slot=button]")?.click()`,
  );
  await waitFor(commandOverride, `document.querySelector("[data-slot=dialog-content]")`);
  assert(
    (await text(commandOverride, "[data-slot=dialog-title]")) === "Command Palette",
    "command title override was lost",
  );
}

async function verifyOverlay(story: string, trigger: string, content: string, role: string) {
  const view = await openStory(story, { theme: "dark", width: 1440 });
  await view.evaluate(
    `(() => { window.__b5OverlayFocus = new Promise((resolve) => { const timeout = setTimeout(() => { document.removeEventListener("focusin", onFocus); resolve(false); }, 2000); const onFocus = () => { if (document.querySelector(${JSON.stringify(content)})?.contains(document.activeElement)) { clearTimeout(timeout); document.removeEventListener("focusin", onFocus); resolve(true); } }; document.addEventListener("focusin", onFocus); }); return null; })()`,
  );
  await view.evaluate(`document.querySelector(${JSON.stringify(trigger)})?.focus()`);
  await view.press("Enter");
  await waitFor(view, `document.querySelector(${JSON.stringify(content)})`);
  const state = await view.evaluate(
    `(() => { const popup = document.querySelector(${JSON.stringify(content)}); return { role: popup?.getAttribute("role"), modal: popup?.getAttribute("aria-modal"), backdrop: Boolean(document.querySelector("[data-slot$=overlay]")) }; })()`,
  );
  assert(state.role === role, `${story} must expose role=${role}`);
  assert(state.modal === "true", `${story} must be aria-modal`);
  assert(state.backdrop, `${story} must render its modal overlay`);
  assert(await view.evaluate("window.__b5OverlayFocus"), `${story} must move focus into its popup`);
  assert(
    !(await view.evaluate(
      `document.activeElement === document.querySelector(${JSON.stringify(content)})`,
    )),
    `${story} popup must not double-own B4 focus treatment`,
  );
  await view.cdp("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    modifiers: 8,
  });
  await view.cdp("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    modifiers: 8,
  });
  await view.press("Tab");
  const trapped = await view.evaluate(
    `(() => { const popup = document.querySelector(${JSON.stringify(content)}); const active = document.activeElement; return { inside: popup?.contains(active), active: active?.getAttribute("data-slot") ?? active?.tagName }; })()`,
  );
  assert(
    trapped.inside,
    `${story} focus trap did not cycle back into its popup (${trapped.active})`,
  );
  if (role === "dialog") {
    await view.press("Escape");
    await waitFor(view, `!document.querySelector(${JSON.stringify(content)})`);
    assert(
      await view.evaluate(
        `document.activeElement === document.querySelector(${JSON.stringify(trigger)})`,
      ),
      `${story} Escape must restore trigger focus`,
    );
  }
}

async function verifyOverlays() {
  await verifyOverlay(
    "components-dialog--default",
    "[data-slot=dialog-trigger]",
    "[data-slot=dialog-content]",
    "dialog",
  );
  await verifyOverlay(
    "components-sheet--left",
    "[data-slot=sheet-trigger]",
    "[data-slot=sheet-content]",
    "dialog",
  );
  await verifyOverlay(
    "components-alertdialog--small",
    "[data-slot=alert-dialog-trigger]",
    "[data-slot=alert-dialog-content]",
    "alertdialog",
  );

  const view = await openStory("components-alertdialog--small", { theme: "light", width: 1440 });
  await view.evaluate(`document.querySelector("[data-slot=alert-dialog-trigger]")?.click()`);
  await waitFor(view, `document.querySelector("[data-slot=alert-dialog-content]")`);
  const widths = await view.evaluate(
    `Array.from(document.querySelectorAll("[data-slot=alert-dialog-footer] > *")).map((element) => ({ width: element.getBoundingClientRect().width, flex: getComputedStyle(element).flex, minWidth: getComputedStyle(element).minWidth }))`,
  );
  assert(
    Array.isArray(widths) &&
      widths.length === 2 &&
      Math.abs(widths[0].width - widths[1].width) <= 1,
    `small alert action widths must differ by at most 1px, got ${JSON.stringify(widths)}`,
  );
}

async function main() {
  assert(existsSync(STORYBOOK), "storybook-static is missing; run pnpm build-storybook");
  for (const id of [
    "components-alertdialog--small",
    "components-calendar--korean-default",
    "components-breadcrumb--english-override",
    "components-pagination--english-override",
    "components-carousel--english-override",
    "components-dialog--english-override",
    "components-sheet--english-override",
    "components-command--english-override",
    "components-sidebar--english-override",
    "components-calendar--english-override",
  ]) {
    assert(storyExists(id), `required B5 story is missing from index.json: ${id}`);
  }
  try {
    await verifyLabels();
    await verifyOverlays();
    console.log("B5 localization and overlay QA passed");
  } finally {
    await closeView();
    await stopServer();
  }
}

await main();
