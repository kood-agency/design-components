import { mkdirSync } from "node:fs";
import { ROOT, closeView, openStory, shot, stopServer, waitFor } from "./qa-webview";

const theme = process.env.QA_THEME === "dark" ? "dark" : "light";
const width = Number(process.env.QA_WIDTH ?? 1440);
const evidence = `.omo/evidence/korean-saas-v2/b5-visual/${theme}-${width}`;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function captureOverlay(story: string, trigger: string, content: string, name: string) {
  const view = await openStory(story, { theme, width, height: 900 });
  await view.cdp("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await view.evaluate(`document.querySelector(${JSON.stringify(trigger)})?.click()`);
  await waitFor(view, `document.querySelector(${JSON.stringify(content)})`);
  assert(
    await view.evaluate(`document.querySelector(${JSON.stringify(content)})?.getAttribute("role")`),
    `${story} did not render a dialog role`,
  );
  await shot(view, `${evidence}/${name}.png`);
}

try {
  mkdirSync(`${ROOT}/${evidence}`, { recursive: true });
  await captureOverlay(
    "components-dialog--default",
    "[data-slot=dialog-trigger]",
    "[data-slot=dialog-content]",
    "dialog",
  );
  await captureOverlay(
    "components-sheet--left",
    "[data-slot=sheet-trigger]",
    "[data-slot=sheet-content]",
    "sheet",
  );
  await captureOverlay(
    "components-alertdialog--small",
    "[data-slot=alert-dialog-trigger]",
    "[data-slot=alert-dialog-content]",
    "alert-dialog-small",
  );
  const labels = await openStory("components-calendar--korean-default", {
    theme,
    width,
    height: 900,
  });
  await shot(labels, `${evidence}/calendar-korean-default.png`);
  const carousel = await openStory("components-carousel--vertical", { theme, width, height: 900 });
  await shot(carousel, `${evidence}/carousel-korean-default.png`);
  console.log(JSON.stringify({ theme, width, evidence }, null, 2));
} finally {
  await closeView();
  await stopServer();
}
