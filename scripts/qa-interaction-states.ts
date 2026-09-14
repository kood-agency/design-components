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

async function verifyB3DefaultSurfaces() {
  for (const theme of ["light", "dark"] as const) {
    const secondary = await openStory("components-button--secondary", { theme });
    assert(
      (await computed(secondary, "[data-slot=button]", "background-color")) ===
        (await expectedColor(secondary, "--secondary")),
      `${theme} secondary Button must use the secondary fill`,
    );

    const sizes = await openStory("components-button--sizes", { theme });
    assert(
      (await computed(sizes, "[data-size=lg]", "min-height")) === "44px",
      `${theme} lg Button must provide a 44px minimum row`,
    );
    assert(
      (await computed(sizes, "[data-size=icon-lg]", "height")) === "44px" &&
        (await computed(sizes, "[data-size=icon-lg]", "width")) === "44px",
      `${theme} icon-lg Button must be 44px square`,
    );

    const toggle = await openStory("components-toggle--default", { theme });
    await toggle.cdp("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });
    await toggle.evaluate(`document.querySelector("[data-slot=toggle]").focus()`);
    await toggle.press(" ");
    assert(
      (await computed(toggle, "[data-slot=toggle]", "background-color")) ===
        (await expectedColor(toggle, "--secondary")),
      `${theme} pressed Toggle must use the secondary fill`,
    );
    assert(
      (await computed(toggle, "[data-slot=toggle]", "border-top-width")) === "1px" &&
        (await computed(toggle, "[data-slot=toggle]", "border-top-color")) ===
          (await expectedColor(toggle, "--input")),
      `${theme} pressed Toggle must use the input border`,
    );

    const toggleGroup = await openStory("components-togglegroup--single", { theme });
    assert(
      (await computed(
        toggleGroup,
        "[data-slot=toggle-group-item][aria-pressed=true]",
        "background-color",
      )) === (await expectedColor(toggleGroup, "--secondary")),
      `${theme} pressed ToggleGroup item must use the secondary fill`,
    );

    for (const [story, selector] of [
      ["components-input--default", "[data-slot=input]"],
      ["components-textarea--default", "[data-slot=textarea]"],
      ["components-select--default", "[data-slot=select-trigger]"],
    ] as const) {
      const field = await openStory(story, { theme });
      assert(
        (await computed(field, selector, "font-size")) === "14px" &&
          (await computed(field, selector, "line-height")) === "20px",
        `${theme} ${story} must use the compact desktop input type`,
      );
    }

    const textarea = await openStory("components-textarea--default", { theme });
    const textareaResize = await textarea.evaluate(`(() => ({
      supportsFieldSizing: CSS.supports("field-sizing", "content"),
      resize: getComputedStyle(document.querySelector("[data-slot=textarea]")).resize,
    }))()`);
    assert(
      !textareaResize.supportsFieldSizing || textareaResize.resize === "none",
      `${theme} Textarea must disable manual resizing when field sizing is supported`,
    );

    for (const [story, selector] of [
      ["components-card--default", "[data-slot=card]"],
      ["components-card--nested", "[data-slot=card-nested]"],
      ["components-badge--default", "[data-slot=badge]"],
      ["components-alert--default", "[data-slot=alert]"],
      ["components-empty--default", "[data-slot=empty]"],
    ] as const) {
      const surface = await openStory(story, { theme });
      assert(
        (await computed(surface, selector, "border-top-width")) === "0px",
        `${theme} ${story} default surface must be borderless`,
      );
    }

    const pagination = await openStory("components-pagination--default", { theme });
    assert(
      (await computed(
        pagination,
        "[data-slot=pagination-link][data-active]",
        "background-color",
      )) === (await expectedColor(pagination, "--foreground")),
      `${theme} active pagination item must use the foreground fill`,
    );
    assert(
      (await computed(pagination, "[data-slot=pagination-link][data-active]", "color")) ===
        (await expectedColor(pagination, "--background")),
      `${theme} active pagination item must use the canvas foreground`,
    );

    for (const [story, selector, background, foreground] of [
      ["components-alert--info", "[data-slot=alert]", "--accent", "--accent-foreground"],
      [
        "components-alert--destructive",
        "[data-slot=alert]",
        "--destructive",
        "--destructive-foreground",
      ],
    ] as const) {
      const alert = await openStory(story, { theme });
      assert(
        (await computed(alert, selector, "background-color")) ===
          (await expectedColor(alert, background)) &&
          (await computed(alert, selector, "color")) === (await expectedColor(alert, foreground)),
        `${theme} ${story} must use its semantic background and foreground roles`,
      );
    }

    for (const [story, trigger, content] of [
      ["components-dialog--default", "[data-slot=dialog-trigger]", "[data-slot=dialog-content]"],
      [
        "components-alertdialog--default",
        "[data-slot=alert-dialog-trigger]",
        "[data-slot=alert-dialog-content]",
      ],
    ] as const) {
      const dialog = await openStory(story, { theme });
      await dialog.evaluate(`document.querySelector(${JSON.stringify(trigger)}).focus()`);
      await dialog.press("Enter");
      await waitFor(dialog, `document.querySelector(${JSON.stringify(content)})`);
      assert(
        (await computed(dialog, content, "border-top-width")) === "0px" &&
          (await computed(dialog, content, "border-top-left-radius")) === "15px",
        `${theme} ${story} default surface must be borderless and rounded-lg`,
      );
    }

    const alertDialog = await openStory("components-alertdialog--default", { theme });
    await alertDialog.evaluate(
      `document.querySelector("[data-slot=alert-dialog-trigger]").focus()`,
    );
    await alertDialog.press("Enter");
    await waitFor(alertDialog, `document.querySelector("[data-slot=alert-dialog-cancel]")`);
    assert(
      (await computed(alertDialog, "[data-slot=alert-dialog-cancel]", "background-color")) ===
        (await expectedColor(alertDialog, "--secondary")),
      `${theme} AlertDialog Cancel must use the secondary Button default`,
    );
  }
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
    console.log("verifying B3 default surfaces");
    await verifyB3DefaultSurfaces();
    console.log("interaction state QA passed");
  } finally {
    await closeView();
    await stopServer();
  }
}

await main();
