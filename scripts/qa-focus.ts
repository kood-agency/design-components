import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  ROOT,
  clickAt,
  closeView,
  hoverAt,
  openStory,
  shot,
  startServer,
  stopServer,
  waitFor,
} from "./qa-webview";

const STORYBOOK = resolve(ROOT, process.env.QA_STORYBOOK_DIR ?? "storybook-static");
const EVIDENCE = resolve(
  ROOT,
  process.env.QA_FOCUS_EVIDENCE ?? ".omo/evidence/korean-saas-v2/b4-focus",
);
const EXPECT_FAIL = process.argv.includes("--expect-fail");

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function storyExists(id: string) {
  const index = JSON.parse(readFileSync(resolve(STORYBOOK, "index.json"), "utf8"));
  return Boolean(index.entries?.[id]);
}

async function focusStyle(
  story: string,
  selector: string,
  theme: "light" | "dark",
  expectedOutlineColor: string,
) {
  const view = await openStory(story, { theme, width: 1440, height: 900 });
  const found = await view.evaluate(`Boolean(document.querySelector(${JSON.stringify(selector)}))`);
  assert(found, `${story} is missing ${selector}`);
  await view.cdp("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await view.evaluate(`document.querySelector(${JSON.stringify(selector)}).focus()`);
  const state = await view.evaluate(
    `(() => { const element = document.querySelector(${JSON.stringify(selector)}); const style = getComputedStyle(element); return { focused: document.activeElement === element, focusVisible: element.matches(":focus-visible"), outlineWidth: style.outlineWidth, outlineOffset: style.outlineOffset, outlineStyle: style.outlineStyle, outlineColor: style.outlineColor, borderColor: style.borderTopColor, animationName: style.animationName }; })()`,
  );
  assert(state.focused, `${story} did not retain programmatic focus`);
  assert(state.focusVisible, `${story} did not expose keyboard focus-visible state`);
  assert(
    state.outlineWidth === "1px",
    `${story} expected 1px inset outline, got ${state.outlineWidth}`,
  );
  assert(
    state.outlineOffset === "-1px",
    `${story} expected -1px outline offset, got ${state.outlineOffset}`,
  );
  assert(state.outlineStyle !== "none", `${story} focus outline is missing`);
  assert(
    state.outlineColor === expectedOutlineColor,
    `${story} expected outline ${expectedOutlineColor}, got ${state.outlineColor}`,
  );
  assert(state.animationName === "none", `${story} focus must not start an animation`);
  await shot(view, `.omo/evidence/korean-saas-v2/b4-focus/${story}-${theme}-focus.png`);
}

async function verifyKeyboardAndPointerActivation(theme: "light" | "dark") {
  const view = await openStory("components-button--interaction-states", { theme });
  await view.evaluate(`document.querySelector("[data-testid=enabled-button]").focus()`);
  await view.press("Enter");
  assert(
    (await view.evaluate(
      `document.querySelector("[data-testid=enabled-click-count]").textContent`,
    )) === "1",
    "keyboard activation did not reach the native Button handler",
  );
  const rect = await view.evaluate(
    `(() => { const element = document.querySelector("[data-testid=enabled-button]"); const box = element.getBoundingClientRect(); return { x: Math.round(box.width / 2), y: Math.round(box.height / 2) }; })()`,
  );
  await clickAt(view, "[data-testid=enabled-button]", rect.x, rect.y);
  assert(
    (await view.evaluate(
      `document.querySelector("[data-testid=enabled-click-count]").textContent`,
    )) === "2",
    "pointer activation did not reach the native Button handler",
  );
}

async function verifyDisabledAndReducedMotion(theme: "light" | "dark") {
  const view = await openStory("components-button--disabled", { theme, width: 400, height: 800 });
  await view.cdp("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  const state = await view.evaluate(
    `(() => { const button = document.querySelector("[data-slot=button]"); const style = getComputedStyle(button); return { disabled: button.matches(":disabled"), pointerEvents: style.pointerEvents, animationName: style.animationName, ripple: Boolean(document.querySelector("[data-ripple], .ripple, [class*=ripple]")) }; })()`,
  );
  assert(state.disabled, "disabled Button lost native disabled semantics");
  assert(state.pointerEvents === "none", "disabled Button accepts pointer activation");
  assert(state.animationName === "none", "reduced motion must not animate disabled Button");
  assert(!state.ripple, "disabled Button must not render a ripple");
  await shot(
    view,
    `.omo/evidence/korean-saas-v2/b4-focus/components-button--disabled-${theme}-400.png`,
  );
}

async function verifyNativeFocusBorders(theme: "light" | "dark") {
  for (const [story, focusSelector, ownerSelector] of [
    ["components-checkbox--default", "[data-slot=checkbox]", "[data-slot=checkbox]"],
    [
      "components-radiogroup--default",
      "[data-slot=radio-group-item]",
      "[data-slot=radio-group-item]",
    ],
    ["components-switch--default", "[data-slot=switch]", "[data-slot=switch]"],
    ["components-slider--default", "input[type=range]", "[data-slot=slider-thumb]"],
  ] as const) {
    const view = await openStory(story, { theme });
    const foreground = await view.evaluate(
      `(() => { const probe = document.createElement("span"); probe.style.color = "var(--foreground)"; document.body.append(probe); const color = getComputedStyle(probe).color; probe.remove(); return color; })()`,
    );
    const result = await view.evaluate(
      `(() => { const focus = document.querySelector(${JSON.stringify(focusSelector)}); const owner = document.querySelector(${JSON.stringify(ownerSelector)}); focus.focus(); return { focused: focus.matches(":focus-visible"), border: getComputedStyle(owner).borderTopColor }; })()`,
    );
    assert(result.focused, `${story} lost native keyboard focus ownership`);
    assert(
      result.border === foreground,
      `${story} expected foreground focus border, got ${result.border}`,
    );
  }

  const invalid = await openStory("components-input--invalid", { theme });
  const destructive = await invalid.evaluate(
    `(() => { const probe = document.createElement("span"); probe.style.color = "var(--destructive)"; document.body.append(probe); const color = getComputedStyle(probe).color; probe.remove(); return color; })()`,
  );
  const invalidBorder = await invalid.evaluate(
    `(() => { const input = document.querySelector("[data-slot=input]"); input.focus(); return getComputedStyle(input).borderTopColor; })()`,
  );
  assert(
    invalidBorder === destructive,
    `invalid Input expected destructive focus border, got ${invalidBorder}`,
  );
}

async function verifyHighlightMarkers(theme: "light" | "dark") {
  const menu = await openStory("components-dropdownmenu--submenu", {
    theme,
    width: 1440,
    height: 900,
  });
  await menu.evaluate(`document.querySelector("[data-slot=dropdown-menu-trigger]").click()`);
  await waitFor(menu, `document.querySelector("[data-slot=dropdown-menu-sub-trigger]")`);
  await hoverAt(menu, "[data-slot=dropdown-menu-sub-trigger]");
  await waitFor(
    menu,
    `document.querySelector("[data-slot=dropdown-menu-sub-trigger]").hasAttribute("data-highlighted")`,
  );
  const menuMarker = await menu.evaluate(
    `(() => { const element = document.querySelector("[data-slot=dropdown-menu-sub-trigger]"); const marker = getComputedStyle(element, "::before"); const item = element.getBoundingClientRect(); const pseudo = { top: Number.parseFloat(marker.top), bottom: Number.parseFloat(marker.bottom) }; return { color: marker.backgroundColor, withinItem: pseudo.top >= 0 && pseudo.bottom >= 0 && item.height > pseudo.top + pseudo.bottom }; })()`,
  );
  const ring = await menu.evaluate(
    `(() => { const probe = document.createElement("span"); probe.style.color = "var(--ring)"; document.body.append(probe); const color = getComputedStyle(probe).color; probe.remove(); return color; })()`,
  );
  assert(
    menuMarker.color === ring && menuMarker.withinItem,
    "pointer-highlighted menu item is missing its inset ring marker",
  );
  await shot(
    menu,
    `.omo/evidence/korean-saas-v2/b4-focus/components-dropdownmenu--submenu-${theme}-1440.png`,
  );

  const combobox = await openStory("components-combobox--default", {
    theme,
    width: 400,
    height: 800,
  });
  await combobox.evaluate(`document.querySelector("input").focus()`);
  await combobox.press("ArrowDown");
  await waitFor(combobox, `document.querySelector("[data-slot=combobox-item][data-highlighted]")`);
  const comboboxMarker = await combobox.evaluate(
    `getComputedStyle(document.querySelector("[data-slot=combobox-item][data-highlighted]"), "::before").backgroundColor`,
  );
  assert(
    comboboxMarker === ring,
    "keyboard-highlighted combobox option is missing its ring marker",
  );
  await shot(
    combobox,
    `.omo/evidence/korean-saas-v2/b4-focus/components-combobox--default-${theme}-400.png`,
  );
}

async function verifyForcedColors() {
  const view = await openStory("components-input--default", { theme: "light" });
  await view.cdp("Emulation.setEmulatedMedia", {
    features: [{ name: "forced-colors", value: "active" }],
  });
  const forced = await view.evaluate(
    `(() => { const probe = document.createElement("div"); probe.style.backgroundColor = "rgb(255, 0, 0)"; document.body.append(probe); const before = getComputedStyle(document.querySelector("[data-slot=input]")).outlineStyle; document.querySelector("[data-slot=input]").focus(); const after = getComputedStyle(document.querySelector("[data-slot=input]")).outlineStyle; const probeColor = getComputedStyle(probe).backgroundColor; probe.remove(); return { before, after, probeColor }; })()`,
  );
  assert(forced.probeColor !== "rgb(255, 0, 0)", "forced-colors emulation is not active");
  assert(forced.before === "none", "unfocused field exposes an outline in forced colors");
  assert(forced.after !== "none", "focused field loses its outline in forced colors");

  const combobox = await openStory("components-combobox--default", { theme: "light" });
  await combobox.cdp("Emulation.setEmulatedMedia", {
    features: [{ name: "forced-colors", value: "active" }],
  });
  await combobox.evaluate(`document.querySelector("input").focus()`);
  await combobox.press("ArrowDown");
  await waitFor(combobox, `document.querySelector("[data-slot=combobox-item][data-highlighted]")`);
  assert(
    (await combobox.evaluate(
      `getComputedStyle(document.querySelector("[data-slot=combobox-item][data-highlighted]")).outlineStyle`,
    )) !== "none",
    "forced-colors combobox highlight loses its outline",
  );
}

async function run() {
  assert(existsSync(STORYBOOK), "storybook-static is missing; run pnpm build-storybook");
  for (const id of [
    "components-button--default",
    "components-input--default",
    "components-input--invalid",
    "components-select--default",
    "components-checkbox--default",
  ]) {
    assert(storyExists(id), `required story is missing from index.json: ${id}`);
  }
  mkdirSync(EVIDENCE, { recursive: true });
  await startServer(6104, STORYBOOK);
  for (const theme of ["light", "dark"] as const) {
    const probe = await openStory("components-input--default", { theme });
    const ring = await probe.evaluate(
      `(() => { const probe = document.createElement("span"); probe.style.color = "var(--ring)"; document.body.append(probe); const color = getComputedStyle(probe).color; probe.remove(); return color; })()`,
    );
    const primaryForeground = await probe.evaluate(
      `(() => { const probe = document.createElement("span"); probe.style.color = "var(--primary-foreground)"; document.body.append(probe); const color = getComputedStyle(probe).color; probe.remove(); return color; })()`,
    );
    await focusStyle("components-button--default", "[data-slot=button]", theme, primaryForeground);
    await focusStyle("components-input--default", "[data-slot=input]", theme, ring);
    const foreground = await probe.evaluate(
      `(() => { const probe = document.createElement("span"); probe.style.color = "var(--foreground)"; document.body.append(probe); const color = getComputedStyle(probe).color; probe.remove(); return color; })()`,
    );
    await focusStyle("components-input--invalid", "[data-slot=input]", theme, foreground);
    await focusStyle("components-select--default", "[data-slot=select-trigger]", theme, ring);
    await verifyKeyboardAndPointerActivation(theme);
    await verifyDisabledAndReducedMotion(theme);
    await verifyNativeFocusBorders(theme);
    await verifyHighlightMarkers(theme);
  }
  await verifyForcedColors();
}

let passed = false;
try {
  await run();
  passed = true;
  if (EXPECT_FAIL) throw new Error("focus QA unexpectedly passed against the stale output");
  console.log("focus QA passed");
} catch (error) {
  if (!EXPECT_FAIL || passed) throw error;
  console.log(`expected focus QA failure: ${(error as Error).message}`);
} finally {
  await closeView();
  await stopServer();
}
