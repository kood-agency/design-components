import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT, clickAt, closeView, computed, openStory, stopServer, waitFor } from "./qa-webview";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function clickCenter(view: Bun.WebView, selector: string) {
  const rect = await view.evaluate(
    `(() => { const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return null; const rect = el.getBoundingClientRect(); return { width: rect.width, height: rect.height }; })()`,
  );
  assert(rect?.width && rect?.height, `cannot click missing or empty element: ${selector}`);
  await clickAt(view, selector, Math.round(rect.width / 2), Math.round(rect.height / 2));
}

async function expectedColor(view: Bun.WebView, variable: string) {
  return view.evaluate(
    `(() => { const probe = document.createElement("span"); probe.style.color = "var(${variable})"; document.body.append(probe); const color = getComputedStyle(probe).color; probe.remove(); return color; })()`,
  );
}

async function expectDisabled(view: Bun.WebView, selector: string, label: string) {
  assert(
    (await computed(view, selector, "pointer-events")) === "none",
    `${label} must disable pointer events`,
  );
  await view.evaluate(
    `(() => { window.__disabledClicks = 0; document.querySelector(${JSON.stringify(selector)}).addEventListener("click", () => window.__disabledClicks++); })()`,
  );
  await view.evaluate(`(() => { document.querySelector(${JSON.stringify(selector)}).focus(); })()`);
  await view.press(" ");
  await view.press("Enter");
  assert(
    (await view.evaluate("window.__disabledClicks")) === 0,
    `${label} activated from the keyboard`,
  );
  await clickCenter(view, selector);
  assert(
    (await view.evaluate("window.__disabledClicks")) === 0,
    `${label} activated from a pointer click`,
  );
}

async function verifyButton() {
  const view = await openStory("components-button--interaction-states", { theme: "dark" });
  assert(
    (await computed(view, "[data-testid=enabled-button]", "cursor")) === "pointer",
    "enabled Button must use pointer cursor",
  );
  await clickCenter(view, "[data-testid=enabled-button]");
  assert(
    (await view.evaluate(
      "document.querySelector('[data-testid=enabled-click-count]').textContent",
    )) === "1",
    "enabled Button did not activate",
  );
  await expectDisabled(view, "[data-testid=disabled-button]", "disabled Button");
  assert(
    (await view.evaluate(
      "document.querySelector('[data-testid=disabled-click-count]').textContent",
    )) === "0",
    "disabled Button handler ran",
  );
}

async function verifyCheckboxAndSwitch() {
  for (const [name, slot] of [
    ["Checkbox", "checkbox"],
    ["Switch", "switch"],
  ] as const) {
    const view = await openStory(`components-${name.toLowerCase()}--default`, { theme: "dark" });
    const selector = `[data-slot=${slot}]`;
    assert(
      (await computed(view, selector, "cursor")) === "pointer",
      `${name} must use pointer cursor`,
    );
    await clickCenter(view, selector);
    assert(
      (await view.evaluate(
        `document.querySelector(${JSON.stringify(selector)}).getAttribute("aria-checked")`,
      )) === "true",
      `${name} did not activate`,
    );
    const disabled = await openStory(`components-${name.toLowerCase()}--disabled`, {
      theme: "dark",
    });
    await expectDisabled(disabled, selector, `disabled ${name}`);
    assert(
      (await computed(disabled, selector, "background-color")) ===
        (await expectedColor(disabled, "--secondary")),
      `disabled ${name} must use the secondary surface`,
    );
  }
}

async function verifySelect() {
  const view = await openStory("components-select--default", { theme: "dark" });
  const trigger = "[data-slot=select-trigger]";
  assert(
    (await computed(view, trigger, "cursor")) === "pointer",
    "Select trigger must use pointer cursor",
  );
  await clickCenter(view, trigger);
  await waitFor(view, "document.querySelector('[data-slot=select-content]')");
  assert(
    (await computed(view, "[data-slot=select-item]", "cursor")) === "pointer",
    "Select item must use pointer cursor",
  );
  const disabled = await openStory("components-select--disabled", { theme: "dark" });
  await expectDisabled(disabled, trigger, "disabled Select");
  assert(
    (await view.evaluate(
      "document.querySelector('[data-slot=select-trigger]').getAttribute('aria-disabled')",
    )) !== "true",
    "enabled Select reported disabled",
  );
}

async function verifyMenuAndCommand() {
  const menu = await openStory("components-dropdownmenu--disabled", { theme: "dark" });
  await clickCenter(menu, "[data-slot=dropdown-menu-trigger]");
  await waitFor(menu, "document.querySelector('[data-slot=dropdown-menu-content]')");
  assert(
    (await computed(menu, "[data-slot=dropdown-menu-item]", "cursor")) === "pointer",
    "menu item must use pointer cursor",
  );
  await expectDisabled(menu, "[data-slot=dropdown-menu-item][data-disabled]", "disabled menu item");

  const command = await openStory("components-command--inline", { theme: "dark" });
  assert(
    (await computed(command, "[data-slot=command-item]", "cursor")) === "pointer",
    "Command item with data-disabled=false must use pointer cursor",
  );
  const disabled = "[data-slot=command-item][data-disabled=true]";
  await expectDisabled(command, disabled, "disabled Command item");
  assert(
    (await computed(command, disabled, "color")) ===
      (await expectedColor(command, "--muted-foreground")),
    "disabled Command item must use muted foreground",
  );
}

async function verifyTextAndOverrideCursors() {
  const input = await openStory("components-input--default", { theme: "dark" });
  assert(
    (await computed(input, "[data-slot=input]", "cursor")) === "text",
    "Input must keep text cursor",
  );
  assert(
    (await input.evaluate(
      `(() => { const input = document.querySelector("[data-slot=input]"); input.readOnly = true; return getComputedStyle(input).cursor; })()`,
    )) === "text",
    "readonly Input must keep text cursor",
  );
  const override = await openStory("components-button--cursor-override", { theme: "dark" });
  assert(
    (await computed(override, "[data-slot=button]", "cursor")) === "help",
    "consumer cursor utility must override the shared pointer cursor",
  );
}

async function main() {
  assert(
    existsSync(resolve(ROOT, "storybook-static")),
    "storybook-static is missing; run pnpm build-storybook",
  );
  try {
    console.log("verifying Button");
    await verifyButton();
    console.log("verifying Checkbox and Switch");
    await verifyCheckboxAndSwitch();
    console.log("verifying Select");
    await verifySelect();
    console.log("verifying Menu and Command");
    await verifyMenuAndCommand();
    console.log("verifying text and override cursors");
    await verifyTextAndOverrideCursors();
    console.log("interaction state QA passed");
  } finally {
    await closeView();
    await stopServer();
  }
}

await main();
