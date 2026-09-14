import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");

type Tokens = Record<string, string>;
type Pair = readonly [name: string, foreground: string, background: string, minimum: number];

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function block(css: string, selector: RegExp) {
  const match = css.match(selector);
  assert(match?.[1], `missing token block ${selector}`);
  return Object.fromEntries(
    [...match[1].matchAll(/\s*(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
      name,
      value.trim().toLowerCase(),
    ]),
  ) as Tokens;
}

function rgb(hex: string) {
  const match = hex.match(/^#([\da-f]{6})$/i);
  assert(match, `expected six-digit hex color, got ${hex}`);
  return [0, 2, 4].map((offset) => Number.parseInt(match[1].slice(offset, offset + 2), 16));
}

function luminance(hex: string) {
  return rgb(hex)
    .map((channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    })
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(first: string, second: string) {
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

function pairs(tokens: Tokens): Pair[] {
  const textSurfaces = ["--background", "--card", "--popover", "--code"];
  const focusSurfaces = [
    "--background",
    "--card",
    "--popover",
    "--secondary",
    "--sidebar",
    "--accent",
  ];
  return [
    ...textSurfaces.map(
      (surface) =>
        [`foreground on ${surface}`, tokens["--foreground"], tokens[surface], 4.5] as const,
    ),
    ...["--primary", "--destructive", "--success", "--warning"].map(
      (surface) =>
        [`${surface} foreground`, tokens[`${surface}-foreground`], tokens[surface], 4.5] as const,
    ),
    ["input on card", tokens["--input"], tokens["--card"], 3] as const,
    ...focusSurfaces.map(
      (surface) => [`ring on ${surface}`, tokens["--ring"], tokens[surface], 3] as const,
    ),
  ];
}

function verify(tokens: Tokens, mode: string) {
  const results = pairs(tokens).map(([name, foreground, background, minimum]) => {
    assert(foreground && background, `${mode} ${name} has a missing token`);
    const ratio = contrast(foreground, background);
    assert(
      ratio >= minimum,
      `${mode} ${name}: expected >= ${minimum}, got ${ratio.toFixed(2)} (${foreground} / ${background})`,
    );
    return { name, ratio: Number(ratio.toFixed(2)), minimum };
  });
  return results;
}

function selfTest() {
  let rejected = false;
  try {
    verify({ "--foreground": "#111111", "--background": "#111111" }, "self-test");
  } catch {
    rejected = true;
  }
  assert(rejected, "contrast verifier must reject an insufficient contrast pair");
  console.log("token contrast self-test passed");
}

const args = process.argv.slice(2);
if (args.length === 1 && args[0] === "--self-test") {
  selfTest();
} else {
  assert(args.length === 0, `unsupported option: ${args.join(" ")}`);
  const css = readFileSync(resolve(ROOT, "src/styles/globals.css"), "utf8");
  const light = block(css, /:root,\s*\.light\s*\{([\s\S]*?)\n\}/);
  const dark = block(css, /\.dark\s*\{([\s\S]*?)\n\}/);
  const report = { light: verify(light, "light"), dark: verify(dark, "dark") };
  console.log(`token contrast passed: ${JSON.stringify(report)}`);
}
