---
version: "alpha"
name: "kood-design-system"
description: "Kood is a dark-first design system on a #0A1724 canvas. A single restrained blue accent is reserved for links, focus, selection, and info — never a second hue, never a glow. Cards sit on a surface ladder behind hairline borders instead of shadows. Pretendard is the default sans, Wanted Sans is an opt-in preset, and Jetendard is the code face."
mode-default: "dark"
fonts:
  sans-default: "pretendard"
  sans-presets:
    pretendard: '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'
    wanted: '"Wanted Sans Variable", "Wanted Sans", "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'
  mono: '"Jetendard", "JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Noto Sans Mono CJK KR", "D2Coding", "Pretendard Variable", "Pretendard", ui-monospace, monospace'
colors:
  dark:
    canvas: "#0A1724"
    surface-1: "#101E2C"
    surface-2: "#172635"
    surface-3: "#1E2E3E"
    hairline: "#2A3B4C"
    hairline-strong: "#566F88"
    ink: "#F3F7FB"
    ink-muted: "#B8C6D5"
    ink-subtle: "#899AAD"
    ink-tertiary: "#64778A"
    primary: "#E7EEF6"
    on-primary: "#0A1724"
    primary-hover: "#F3F7FB"
    primary-active: "#CBD8E5"
    accent: "#7FA5DE"
    accent-hover: "#96B5E2"
    accent-subtle: "#172A45"
    focus-ring: "#7FA5DE"
    semantic-success: "#6BCB91"
    semantic-warning: "#E4B45B"
    semantic-danger: "#F18484"
    semantic-info: "#7FA5DE"
    on-success: "#07131F"
    on-warning: "#07131F"
    on-danger: "#07131F"
    on-info: "#07131F"
    selection-bg: "#264A78"
    selection-ink: "#F3F7FB"
    code-bg: "#07131F"
    code-border: "#2A3B4C"
    code-ink: "#E7EEF6"
    code-comment: "#899AAD"
    code-keyword: "#7FA5DE"
    code-string: "#6BCB91"
    code-number: "#E4B45B"
    code-error: "#F18484"
    overlay: "#02070DB8"
  light:
    canvas: "#F6F8FB"
    surface-1: "#FFFFFF"
    surface-2: "#EFF3F7"
    surface-3: "#E5EBF1"
    hairline: "#D7E0E9"
    hairline-strong: "#7B8EA1"
    ink: "#0A1724"
    ink-muted: "#394B5E"
    ink-subtle: "#596B7D"
    ink-tertiary: "#748395"
    primary: "#0A1724"
    on-primary: "#FFFFFF"
    primary-hover: "#12283B"
    primary-active: "#06121E"
    accent: "#315C9F"
    accent-hover: "#244D83"
    accent-subtle: "#E7EEF9"
    focus-ring: "#315C9F"
    semantic-success: "#1E7147"
    semantic-warning: "#80520A"
    semantic-danger: "#B8323E"
    semantic-info: "#315C9F"
    on-success: "#FFFFFF"
    on-warning: "#FFFFFF"
    on-danger: "#FFFFFF"
    on-info: "#FFFFFF"
    selection-bg: "#CFE0FA"
    selection-ink: "#0A1724"
    code-bg: "#EFF3F7"
    code-border: "#D7E0E9"
    code-ink: "#0A1724"
    code-comment: "#596B7D"
    code-keyword: "#315C9F"
    code-string: "#1E7147"
    code-number: "#80520A"
    code-error: "#B8323E"
    overlay: "#07131F66"
typography:
  display-xl:
    fontFamily: "Pretendard Variable"
    fontSize: "64px"
    fontWeight: "700"
    lineHeight: "1.125"
    letterSpacing: "-0.01em"
  display-lg:
    fontFamily: "Pretendard Variable"
    fontSize: "52px"
    fontWeight: "700"
    lineHeight: "1.15"
    letterSpacing: "-0.01em"
  display-md:
    fontFamily: "Pretendard Variable"
    fontSize: "40px"
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Pretendard Variable"
    fontSize: "32px"
    fontWeight: "700"
    lineHeight: "1.25"
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Pretendard Variable"
    fontSize: "24px"
    fontWeight: "650"
    lineHeight: "1.33"
    letterSpacing: "-0.01em"
  subhead:
    fontFamily: "Pretendard Variable"
    fontSize: "20px"
    fontWeight: "600"
    lineHeight: "1.4"
    letterSpacing: "-0.005em"
  body-lg:
    fontFamily: "Pretendard Variable"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "1.67"
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Pretendard Variable"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "1.625"
    letterSpacing: "0"
  body-sm:
    fontFamily: "Pretendard Variable"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "1.57"
    letterSpacing: "0"
  caption:
    fontFamily: "Pretendard Variable"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "1.5"
    letterSpacing: "0"
  eyebrow:
    fontFamily: "Pretendard Variable"
    fontSize: "12px"
    fontWeight: "650"
    lineHeight: "1.33"
    letterSpacing: "0.04em"
  button:
    fontFamily: "Pretendard Variable"
    fontSize: "14px"
    fontWeight: "600"
    lineHeight: "1.43"
    letterSpacing: "0"
  code:
    fontFamily: "Jetendard"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "1.57"
    letterSpacing: "0"
  code-sm:
    fontFamily: "Jetendard"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "1.5"
    letterSpacing: "0"
rounded:
  none: "0px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  xxl: "24px"
  full: "9999px"
spacing:
  "0": "0px"
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"
  "32": "128px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-secondary:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-destructive:
    backgroundColor: "{colors.semantic-danger}"
    textColor: "{colors.on-danger}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-disabled:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-subtle}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-nested:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "16px"
  text-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  text-input-focused:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.focus-ring}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  text-input-error:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.semantic-danger}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  select:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  checkbox-checked:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "0px"
  badge:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.hairline}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  badge-accent:
    backgroundColor: "{colors.accent-subtle}"
    textColor: "{colors.accent}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  status-pill-success:
    backgroundColor: "{colors.semantic-success}"
    textColor: "{colors.on-success}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  status-pill-warning:
    backgroundColor: "{colors.semantic-warning}"
    textColor: "{colors.on-warning}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  status-pill-danger:
    backgroundColor: "{colors.semantic-danger}"
    textColor: "{colors.on-danger}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  alert-info:
    backgroundColor: "{colors.accent-subtle}"
    textColor: "{colors.ink}"
    borderColor: "{colors.accent}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "0px 24px"
  sidebar:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "16px 12px"
  sidebar-item-selected:
    backgroundColor: "{colors.accent-subtle}"
    textColor: "{colors.accent}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "6px 10px"
  tabs-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  tabs-item-selected:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "{colors.accent}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  table-header:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.hairline}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  table-row:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  modal:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "24px"
  tooltip:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-ink}"
    borderColor: "{colors.code-border}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: "16px"
---

## Overview

Kood is dark-first. The page background is `{colors.canvas}` #0A1724 in the default dark mode and its paired light counterpart #F6F8FB. That navy is the brand seed: canvas in dark, ink and primary in light.

A single restrained blue `{colors.accent}` carries every chromatic cue. Use it for links, focus rings, text selection, and info — and nowhere else. There is no second hue.

UI type is Pretendard Variable by default. Wanted Sans Variable is the opt-in sans, switched with `[data-font="wanted"]` on the document. Jetendard is the code face.

**Key Characteristics:**

- **Dark default.** `{colors.canvas}` #0A1724 is the home canvas; light mode pairs it with #F6F8FB.
- **One restrained blue.** `{colors.accent}` is reserved for links, focus, selection, and info.
- **Hairline cards.** Surfaces sit on a three-step ladder behind 1px `{colors.hairline}` borders, not drop shadows.
- **Shadow only where it lifts.** Dark mode uses no shadow. Light mode uses one raised shadow, and only on menus, popovers, and dialogs.
- **Korean and Latin type.** Pretendard Variable is the default sans; Wanted Sans Variable is the `[data-font="wanted"]` preset; Jetendard is reserved for code. Korean body keeps line-height 1.5–1.67, tracking at 0 or -0.01em, `word-break: keep-all`, and `overflow-wrap: anywhere`.
- **Token-for-token pairing.** Every color, type, radius, and spacing key exists in both modes under the same name.
- **Two-language documentation.** This file is English; `DESIGN.ko.md` is the Korean twin with identical frontmatter and heading order.

## Colors

The palette is 37 tokens, paired dark and light. `#0A1724` is the brand seed — `{colors.canvas}` in dark mode, `{colors.ink}` and `{colors.primary}` in light mode. `{colors.primary}` itself is a semantic action fill, not the brand seed: in dark mode it becomes the light neutral #E7EEF6 so filled buttons do not sink into the canvas.

`{colors.ink-tertiary}` is decorative only and is never used as text. `{colors.hairline}` is allowed on containers (cards, tables, nav) but is never the sole boundary of an interactive control; those use `{colors.hairline-strong}`.

Contrast figures come from the sRGB relative-luminance formula and are re-checked by `scripts/verify-design-md.ts`. Text roles sit at or above 4.5:1 on canvas, surface-1, and surface-2 in both modes (minimum: light `{colors.ink-subtle}` on `{colors.surface-2}` at 4.93). Non-text roles sit at or above 3.0:1 on canvas and surface-1 (minimum: light `{colors.hairline-strong}` on `{colors.canvas}` at 3.17). On-token / semantic pairs sit at or above 4.5:1 (minimum: light `{colors.on-danger}` on `{colors.semantic-danger}` at 5.89).

### Brand & Accent

- **Primary** ({colors.primary}): Semantic action fill for default buttons and checked controls. Not the brand seed — #E7EEF6 / #0A1724
- **On Primary** ({colors.on-primary}): Text and icons on a primary fill — #0A1724 / #FFFFFF
- **Primary Hover** ({colors.primary-hover}): Hovered primary fill — #F3F7FB / #12283B
- **Primary Active** ({colors.primary-active}): Pressed primary fill — #CBD8E5 / #06121E
- **Accent** ({colors.accent}): The single blue, used on links, selection emphasis, and info — #7FA5DE / #315C9F
- **Accent Hover** ({colors.accent-hover}): Hovered accent — #96B5E2 / #244D83
- **Accent Subtle** ({colors.accent-subtle}): Tinted accent background for selected rows, badges, and info alerts — #172A45 / #E7EEF9
- **Focus Ring** ({colors.focus-ring}): `outline: 2px solid; outline-offset: 2px` — #7FA5DE / #315C9F

### Surface

- **Canvas** ({colors.canvas}): Page background. Brand seed in dark mode — #0A1724 / #F6F8FB
- **Surface 1** ({colors.surface-1}): Cards and controls — #101E2C / #FFFFFF
- **Surface 2** ({colors.surface-2}): Nested or inset regions, disabled backgrounds — #172635 / #EFF3F7
- **Surface 3** ({colors.surface-3}): Dropdowns and sub-nav — #1E2E3E / #E5EBF1
- **Hairline** ({colors.hairline}): Decorative 1px divider. Allowed on card, table, and nav containers; never the sole boundary of a button or input — #2A3B4C / #D7E0E9
- **Hairline Strong** ({colors.hairline-strong}): Interactive control border (non-text 3:1) — #566F88 / #7B8EA1
- **Overlay** ({colors.overlay}): Modal scrim, 8-digit hex at 72% / 40% alpha — #02070DB8 / #07131F66
- **Selection Background** ({colors.selection-bg}): `::selection` background — #264A78 / #CFE0FA
- **Selection Ink** ({colors.selection-ink}): `::selection` text — #F3F7FB / #0A1724

### Text

- **Ink** ({colors.ink}): Body and headings — #F3F7FB / #0A1724
- **Ink Muted** ({colors.ink-muted}): Secondary text — #B8C6D5 / #394B5E
- **Ink Subtle** ({colors.ink-subtle}): Captions, placeholders, disabled labels — #899AAD / #596B7D
- **Ink Tertiary** ({colors.ink-tertiary}): Decorative icons only; never text — #64778A / #748395

### Semantic

- **Success** ({colors.semantic-success}): Success fills — #6BCB91 / #1E7147
- **Warning** ({colors.semantic-warning}): Warning fills — #E4B45B / #80520A
- **Danger** ({colors.semantic-danger}): Destructive fills — #F18484 / #B8323E
- **Info** ({colors.semantic-info}): Info fills; reuses accent — #7FA5DE / #315C9F
- **On Success** ({colors.on-success}): Text on a solid success fill — #07131F / #FFFFFF
- **On Warning** ({colors.on-warning}): Text on a solid warning fill — #07131F / #FFFFFF
- **On Danger** ({colors.on-danger}): Text on a solid danger fill — #07131F / #FFFFFF
- **On Info** ({colors.on-info}): Text on a solid info fill — #07131F / #FFFFFF

### Code

- **Code Background** ({colors.code-bg}): Code block background — #07131F / #EFF3F7
- **Code Border** ({colors.code-border}): Code block border — #2A3B4C / #D7E0E9
- **Code Ink** ({colors.code-ink}): Default code text — #E7EEF6 / #0A1724
- **Code Comment** ({colors.code-comment}): Comments — #899AAD / #596B7D
- **Code Keyword** ({colors.code-keyword}): Keywords; reuses accent — #7FA5DE / #315C9F
- **Code String** ({colors.code-string}): Strings; reuses success — #6BCB91 / #1E7147
- **Code Number** ({colors.code-number}): Numbers; reuses warning — #E4B45B / #80520A
- **Code Error** ({colors.code-error}): Errors; reuses danger — #F18484 / #B8323E

## Typography

UI type is two sans presets plus one code face. Pretendard Variable is the default. Wanted Sans Variable is the `[data-font="wanted"]` preset. Jetendard is reserved for code. Frontmatter `typography.*.fontFamily` records the DEFAULT family; the `[data-font]` preset overrides the effective sans at runtime.

### Font Family

- **Pretendard** (default). Family `Pretendard Variable`. Nine weights. SIL OFL 1.1. https://github.com/orioncactus/pretendard
- **Wanted Sans** (preset `wanted`). Family `Wanted Sans Variable`. Seven weights. SIL OFL 1.1. https://github.com/wanteddev/wanted-sans
- **Jetendard** (code). Family `Jetendard`. JetBrainsMono Nerd Font Mono plus Pretendard Hangul at 1.15 scale. Sixteen static faces (Thin through ExtraBold × upright/italic; no Black). Italic variants keep Hangul upright. SIL OFL 1.1 with Reserved Font Name "Jetendard". https://github.com/kuskhan/jetendard

`typography.*.fontFamily` in the frontmatter records the DEFAULT family. The `[data-font]` preset overrides the effective sans at runtime.

### Loading fonts

Use the `<link>` block OR the `@import` block, not both.

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
/>
```

```css
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
@import url("https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css");
/* Jetendard v0.1.0: no CDN. Download Jetendard-WebFont.zip from
   https://github.com/kuskhan/jetendard/releases/tag/v0.1.0 and place *.woff2 under /fonts/jetendard/.
   16 static faces: weights 100..800 x normal|italic (no Black). File names: Jetendard-{Thin,ExtraLight,Light,Regular,Medium,SemiBold,Bold,ExtraBold}[Italic].woff2, Regular italic = Jetendard-Italic.woff2 */
@font-face {
  font-family: "Jetendard";
  src: url("/fonts/jetendard/Jetendard-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Jetendard";
  src: url("/fonts/jetendard/Jetendard-Italic.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: "Jetendard";
  src: url("/fonts/jetendard/Jetendard-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Jetendard";
  src: url("/fonts/jetendard/Jetendard-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
/* The remaining 12 faces are optional. Add them with the same pattern only when the product exposes those weights. */

:root,
[data-font="pretendard"] {
  --font-sans:
    "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  --font-mono:
    "Jetendard", "JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono",
    "Noto Sans Mono CJK KR", "D2Coding", "Pretendard Variable", "Pretendard", ui-monospace,
    monospace;
}
[data-font="wanted"] {
  --font-sans:
    "Wanted Sans Variable", "Wanted Sans", "Pretendard Variable", "Pretendard", -apple-system,
    BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial,
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
}
html {
  font-family: var(--font-sans);
}
code,
kbd,
samp,
pre {
  font-family: var(--font-mono);
  font-synthesis: none;
}
:where(p, li, dd, blockquote, figcaption):lang(ko) {
  word-break: keep-all;
  overflow-wrap: anywhere;
}
```

Jetendard has no CDN. Download `Jetendard-WebFont.zip` from the v0.1.0 release at https://github.com/kuskhan/jetendard/releases/tag/v0.1.0 and place the `*.woff2` files under `/fonts/jetendard/`. The sixteen file names are `Jetendard-Thin.woff2`, `Jetendard-ThinItalic.woff2`, `Jetendard-ExtraLight.woff2`, `Jetendard-ExtraLightItalic.woff2`, `Jetendard-Light.woff2`, `Jetendard-LightItalic.woff2`, `Jetendard-Regular.woff2`, `Jetendard-Italic.woff2` (Regular italic), `Jetendard-Medium.woff2`, `Jetendard-MediumItalic.woff2`, `Jetendard-SemiBold.woff2`, `Jetendard-SemiBoldItalic.woff2`, `Jetendard-Bold.woff2`, `Jetendard-BoldItalic.woff2`, `Jetendard-ExtraBold.woff2`, and `Jetendard-ExtraBoldItalic.woff2`. The four `@font-face` rules above (400, 400 italic, 600, 700) are required in production. The other 12 faces are optional.

All three fonts are SIL OFL 1.1. Keep the OFL license file next to self-hosted files. Do not redistribute modified fonts under the Reserved Font Names (Jetendard, Pretendard, Wanted Sans).

### Hierarchy

| Token                   | Size | Weight | Line Height | Letter Spacing | Use                                                 |
| ----------------------- | ---- | ------ | ----------- | -------------- | --------------------------------------------------- |
| {typography.display-xl} | 64px | 700    | 1.125       | -0.01em        | Hero                                                |
| {typography.display-lg} | 52px | 700    | 1.15        | -0.01em        | Section opener                                      |
| {typography.display-md} | 40px | 700    | 1.2         | -0.01em        | Subsection                                          |
| {typography.headline}   | 32px | 700    | 1.25        | -0.01em        | Page title                                          |
| {typography.title}      | 24px | 650    | 1.33        | -0.01em        | Card title                                          |
| {typography.subhead}    | 20px | 600    | 1.4         | -0.005em       | Lead paragraph                                      |
| {typography.body-lg}    | 18px | 400    | 1.67        | -0.005em       | Large body                                          |
| {typography.body}       | 16px | 400    | 1.625       | 0              | Default body                                        |
| {typography.body-sm}    | 14px | 400    | 1.57        | 0              | Card body, tables                                   |
| {typography.caption}    | 12px | 400    | 1.5         | 0              | Captions                                            |
| {typography.eyebrow}    | 12px | 650    | 1.33        | 0.04em         | Korean eyebrow 0.04em; Latin uppercase up to 0.08em |
| {typography.button}     | 14px | 600    | 1.43        | 0              | Buttons                                             |
| {typography.code}       | 14px | 400    | 1.57        | 0              | Jetendard                                           |
| {typography.code-sm}    | 12px | 400    | 1.5         | 0              | Jetendard                                           |

### Principles

- Single voice 700→400: display through headline at 700, then 650/600, then 400 for body.
- Display tracking is capped at -0.01em. Latin-only copy may go to -0.02em on {typography.display-xl} / {typography.display-lg} and -0.015em on {typography.display-md} / {typography.headline}. Mixed Korean keeps the table values.
- Eyebrow tracking is positive: 0.04em for Korean, up to 0.08em for Latin uppercase.
- Mono only in code contexts (`code`, `kbd`, `samp`, `pre`, and the code tokens).
- Weight 650 assumes the variable font.

### Korean typography rules

- Body line-height is 1.5–1.67.
- `word-break: keep-all; overflow-wrap: anywhere` on prose only — the `:lang(ko)` rule, not on code.
- Korean eyebrow tracking is fixed at 0.04em.
- Use `font-variant-numeric: tabular-nums` in tables.
- Jetendard italics keep Hangul upright, so mixed Korean/Latin lines have different slants. Use color or weight for code emphasis, not italic.

### Note on Font Substitutes

When Pretendard or Wanted Sans fail to load, the stacks fall back to Apple SD Gothic Neo and Noto Sans KR. When Jetendard is absent, the stack falls back to JetBrains Mono plus a system Korean mono (`Noto Sans Mono CJK KR`, `D2Coding`). The two sans presets have different metrics, so line breaks change — check headings, tables, and buttons in both.

## Layout

Layout is a 4px-base spacing scale inside a 1200px content column. On the dark canvas, the surface ladder — not empty decorative bands — creates the sense of space.

### Spacing System

The base unit is 4px. The scale is fourteen tokens; use a token whenever the value exists on the scale. Card interiors are 24px = `{spacing.6}`. Button padding is the literal `8px 14px` (14px is off-scale and stays a literal). Input padding is `8px 12px`. Section-to-section gap is `{spacing.24}` 96px.

| Token        | Value | Use                                          |
| ------------ | ----- | -------------------------------------------- |
| {spacing.0}  | 0px   | Reset                                        |
| {spacing.1}  | 4px   | Tight inset                                  |
| {spacing.2}  | 8px   | Button vertical padding; compact stacks      |
| {spacing.3}  | 12px  | Input horizontal padding                     |
| {spacing.4}  | 16px  | Page gutter below 768px; nested-card padding |
| {spacing.5}  | 20px  | Mid-range stack                              |
| {spacing.6}  | 24px  | Card interior; page gutter from 768px        |
| {spacing.8}  | 32px  | Page gutter from 1280px                      |
| {spacing.10} | 40px  | Large stack                                  |
| {spacing.12} | 48px  | Block gap                                    |
| {spacing.16} | 64px  | Large block gap                              |
| {spacing.20} | 80px  | Extra-large block gap                        |
| {spacing.24} | 96px  | Section gap                                  |
| {spacing.32} | 128px | Maximum stack                                |

### Grid & Container

The content column maxes at 1200px. Horizontal gutters are 16px below 768px, 24px from 768px, and 32px from 1280px. Card grids collapse 3-up → 2-up → 1-up: three columns from 1024px, two columns from 768px, one column below 768px.

### Whitespace Philosophy

On the dark canvas the surface ladder does the work of whitespace. Cards sit on `{colors.surface-1}` against `{colors.canvas}`; nested regions step to `{colors.surface-2}`. Sections separate by a 1px `{colors.hairline}` rule or a 96px gap (`{spacing.24}`), never by decorative bands.

## Elevation & Depth

Depth is a surface step plus a border, not a drop shadow. Dark mode uses no box-shadow. Light mode defines exactly one shadow token, and only on floating overlays.

| Level | Treatment                                                     | Use                          |
| ----- | ------------------------------------------------------------- | ---------------------------- |
| 0     | Flat `{colors.canvas}`                                        | Page background              |
| 1     | `{colors.surface-1}` + 1px `{colors.hairline}`                | Cards                        |
| 2     | `{colors.surface-2}` + 1px `{colors.hairline}`                | Nested or inset regions      |
| 3     | `{colors.surface-3}` + `{colors.hairline-strong}`             | Dropdowns, tooltips, sub-nav |
| 4     | `outline: 2px solid {colors.focus-ring}; outline-offset: 2px` | Focus                        |

Light mode defines `--shadow-raised: 0 1px 2px rgb(10 23 36 / 6%), 0 8px 24px rgb(10 23 36 / 8%)`. Use it only on menus, popovers, and dialogs — never on cards. Dark mode sets `--shadow-raised` to `none`.

## Shapes

Corners follow a fixed eight-step scale. Pick the token that matches the component; do not interpolate.

### Border Radius Scale

| Token          | Value  | Use                                           |
| -------------- | ------ | --------------------------------------------- |
| {rounded.none} | 0px    | Nav bars, tabs, tables                        |
| {rounded.xs}   | 4px    | Checkboxes                                    |
| {rounded.sm}   | 6px    | Tooltips; selected sidebar items              |
| {rounded.md}   | 8px    | Buttons and inputs; nested cards; code blocks |
| {rounded.lg}   | 12px   | Cards; product-screenshot frames              |
| {rounded.xl}   | 16px   | Modals                                        |
| {rounded.xxl}  | 24px   | Reserved for large product-screenshot frames  |
| {rounded.full} | 9999px | Badges and pills                              |

There is no photography or illustration policy yet; that belongs in Known Gaps. Product screenshots use `{rounded.lg}` frames. `{rounded.xxl}` is reserved for large product-screenshot frames.

## Components

Thirty recipes, grouped below. Each line is rest appearance for the current mode: `{colors.X}` resolves to `colors.dark.X` or `colors.light.X`. Omit a border segment when the recipe has no border. Padding values are literals from the frontmatter (14px is off the spacing scale and stays a literal).

### Buttons

In dark mode `{colors.primary}` is a light neutral fill (#E7EEF6), not the navy brand seed — filled actions stay readable on `{colors.canvas}`. `{colors.hairline}` is never the sole boundary of an interactive control; outlined buttons and inputs use `{colors.hairline-strong}`.

- **button-primary** — Default filled action. bg {colors.primary} · text {colors.on-primary} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-primary-hover** — Hovered primary fill. bg {colors.primary-hover} · text {colors.on-primary} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-primary-active** — Pressed primary fill. bg {colors.primary-active} · text {colors.on-primary} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-secondary** — Outlined secondary action. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-ghost** — Chrome-less action. bg transparent · text {colors.ink-muted} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-destructive** — Destructive filled action. bg {colors.semantic-danger} · text {colors.on-danger} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-disabled** — Disabled control. bg {colors.surface-2} · text {colors.ink-subtle} · border {colors.hairline-strong} · {typography.button} · {rounded.md} · padding 8px 14px

### Cards & Containers

Cards sit on the surface ladder behind a decorative `{colors.hairline}` edge, not a drop shadow.

- **card** — Primary content container. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline} · {typography.body} · {rounded.lg} · padding 24px
- **card-nested** — Inset region inside a card. bg {colors.surface-2} · text {colors.ink} · border {colors.hairline} · {typography.body-sm} · {rounded.md} · padding 16px

### Inputs & Forms

Interactive fields use `{colors.hairline-strong}` at rest. Focus and error replace that border; they do not add a box-shadow.

- **text-input** — Single-line text field. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · {typography.body} · {rounded.md} · padding 8px 12px
- **text-input-focused** — Focused text field. bg {colors.surface-1} · text {colors.ink} · border {colors.focus-ring} · {typography.body} · {rounded.md} · padding 8px 12px
- **text-input-error** — Invalid text field. bg {colors.surface-1} · text {colors.ink} · border {colors.semantic-danger} · {typography.body} · {rounded.md} · padding 8px 12px
- **select** — Select trigger. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · {typography.body} · {rounded.md} · padding 8px 12px
- **checkbox-checked** — Checked checkbox fill. bg {colors.primary} · text {colors.on-primary} · {typography.caption} · {rounded.xs} · padding 0px

### Badges, Pills & Alerts

Pills are solid semantic fills. Neutral badges stay on `{colors.surface-2}`. Info alerts tint with accent, not a second hue.

- **badge** — Neutral count or label. bg {colors.surface-2} · text {colors.ink-muted} · border {colors.hairline} · {typography.caption} · {rounded.full} · padding 2px 8px
- **badge-accent** — Accent-tinted label. bg {colors.accent-subtle} · text {colors.accent} · {typography.caption} · {rounded.full} · padding 2px 8px
- **status-pill-success** — Success status. bg {colors.semantic-success} · text {colors.on-success} · {typography.caption} · {rounded.full} · padding 2px 8px
- **status-pill-warning** — Warning status. bg {colors.semantic-warning} · text {colors.on-warning} · {typography.caption} · {rounded.full} · padding 2px 8px
- **status-pill-danger** — Danger status. bg {colors.semantic-danger} · text {colors.on-danger} · {typography.caption} · {rounded.full} · padding 2px 8px
- **alert-info** — Informational banner. bg {colors.accent-subtle} · text {colors.ink} · border {colors.accent} · {typography.body-sm} · {rounded.md} · padding 12px 16px

### Navigation

Top nav sits on the canvas. The sidebar is a `{colors.surface-1}` rail. Selected items tint with accent; tabs stay borderless except for the selected accent edge.

- **top-nav** — Page-level header bar. bg {colors.canvas} · text {colors.ink} · border {colors.hairline} · {typography.body-sm} · {rounded.none} · padding 0px 24px
- **sidebar** — Side navigation rail. bg {colors.surface-1} · text {colors.ink-muted} · border {colors.hairline} · {typography.body-sm} · {rounded.none} · padding 16px 12px
- **sidebar-item-selected** — Selected nav item. bg {colors.accent-subtle} · text {colors.accent} · {typography.body-sm} · {rounded.sm} · padding 6px 10px
- **tabs-item** — Unselected tab. bg transparent · text {colors.ink-subtle} · {typography.button} · {rounded.none} · padding 8px 12px
- **tabs-item-selected** — Selected tab. bg transparent · text {colors.ink} · border {colors.accent} · {typography.button} · {rounded.none} · padding 8px 12px

### Tables

Header cells step to `{colors.surface-2}`. Body rows stay on `{colors.surface-1}`. Dividers are `{colors.hairline}`.

- **table-header** — Table header cell. bg {colors.surface-2} · text {colors.ink-muted} · border {colors.hairline} · {typography.caption} · {rounded.none} · padding 8px 12px
- **table-row** — Table body row. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline} · {typography.body-sm} · {rounded.none} · padding 10px 12px

### Overlays

The dialog surface is `{colors.surface-1}` with a `{colors.hairline-strong}` edge. Dim the page behind it with `{colors.overlay}`. Tooltips sit one step higher on `{colors.surface-3}`.

- **modal** — Dialog surface. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · {typography.body} · {rounded.xl} · padding 24px
- **tooltip** — Hover hint. bg {colors.surface-3} · text {colors.ink} · border {colors.hairline-strong} · {typography.caption} · {rounded.sm} · padding 4px 8px

### Code Blocks

Code uses the dedicated code tokens, not the surface ladder. Syntax colors live under Colors → Code.

- **code-block** — Fenced code panel. bg {colors.code-bg} · text {colors.code-ink} · border {colors.code-border} · {typography.code} · {rounded.md} · padding 16px

## Interaction States

States are token swaps, not opacity tricks or extra shadows.

- **Hover.** Primary fill moves `{colors.primary}` → `{colors.primary-hover}` (**button-primary-hover**). Ghost gains a `{colors.surface-2}` background. Links use `{colors.accent-hover}`.
- **Active.** Primary fill moves to `{colors.primary-active}` (**button-primary-active**). The press is a color change, not a scale or inset shadow.
- **Focus-visible.** Keyboard focus is an outline, never a box-shadow stand-in:

```css
:focus-visible {
  outline: 2px solid {colors.focus-ring};
  outline-offset: 2px;
}
@media (forced-colors: active) {
  :focus-visible {
    outline-color: Highlight;
  }
}
```

- **Disabled.** Do not fade with `opacity`. Use **button-disabled**: background `{colors.surface-2}`, label `{colors.ink-subtle}`, border `{colors.hairline-strong}`. Pointer events off.
- **Selected.** Background `{colors.accent-subtle}` and text `{colors.accent}`, matching **sidebar-item-selected** and **badge-accent**.
- **Error.** Border `{colors.semantic-danger}` on the control (**text-input-error**). The caption under the field is also `{colors.semantic-danger}`; the input value stays `{colors.ink}`.
- **Loading.** Keep the label. Place a spinner in `{colors.ink-subtle}` beside it. Do not swap the control for a spinner-only state.

## Motion

Duration is 120–200ms with easing `cubic-bezier(0.2, 0, 0, 1)`. Animate only color, opacity, and transform. Never animate layout properties (width, height, top, left, margin, padding). `prefers-reduced-motion: reduce` removes transitions and animations. No marketing parallax and no autoplay.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

## Implementation Guidance

This section maps DESIGN tokens onto this repository's stack (Tailwind 4 `@theme inline`, shadcn `new-york` / zinc, `cssVariables: true`). It is documentation only. Do not treat it as a patch for `src/styles/globals.css` or any component file.

### Mode switching

Dark is the default. Put `class="dark"` on `<html>` so it matches the existing `@custom-variant dark (&:is(.dark *))` in `src/styles/globals.css`. Light mode is the same document with that class removed. This repository already depends on `next-themes`; wire it with `<ThemeProvider attribute="class" defaultTheme="dark">`.

### Mapping to shadcn and Tailwind tokens

Today `src/styles/globals.css` defines only `--radius` and `--sidebar*` on `:root` / `.dark`, and `@theme inline` exposes `--color-sidebar*`. The shadcn canvas tokens (`--background`, `--primary`, and the rest of the table) are not defined yet. Map DESIGN keys onto those variables as follows.

| DESIGN token    | shadcn CSS variable         | Tailwind utility               |
| --------------- | --------------------------- | ------------------------------ |
| canvas          | --background                | bg-background                  |
| ink             | --foreground                | text-foreground                |
| surface-1       | --card                      | bg-card                        |
| surface-3       | --popover                   | bg-popover                     |
| primary         | --primary                   | bg-primary                     |
| on-primary      | --primary-foreground        | text-primary-foreground        |
| surface-2       | --secondary                 | bg-secondary                   |
| surface-2       | --muted                     | bg-muted                       |
| ink-subtle      | --muted-foreground          | text-muted-foreground          |
| accent-subtle   | --accent                    | bg-accent                      |
| accent          | --accent-foreground         | text-accent-foreground         |
| semantic-danger | --destructive               | bg-destructive                 |
| hairline        | --border                    | border-border                  |
| hairline-strong | --input                     | border-input                   |
| focus-ring      | --ring                      | ring-ring                      |
| surface-1       | --sidebar                   | bg-sidebar                     |
| ink-muted       | --sidebar-foreground        | text-sidebar-foreground        |
| accent-subtle   | --sidebar-accent            | bg-sidebar-accent              |
| accent          | --sidebar-accent-foreground | text-sidebar-accent-foreground |
| hairline        | --sidebar-border            | border-sidebar-border          |
| focus-ring      | --sidebar-ring              | ring-sidebar-ring              |

The existing `src/components/button.tsx` hardcodes zinc classes (`bg-zinc-900`, `bg-zinc-100`, `border-zinc-200`, and the other cva variants) and is a migration target for these tokens (not changed by this document).

Reference snippet — not applied by this document:

```css
/* reference snippet — not applied by this document */
:root,
.dark {
  --background: #0a1724;
  --foreground: #f3f7fb;
  --card: #101e2c;
  --popover: #1e2e3e;
  --primary: #e7eef6;
  --primary-foreground: #0a1724;
  --secondary: #172635;
  --muted: #172635;
  --muted-foreground: #899aad;
  --accent: #172a45;
  --accent-foreground: #7fa5de;
  --destructive: #f18484;
  --border: #2a3b4c;
  --input: #566f88;
  --ring: #7fa5de;
  --sidebar: #101e2c;
  --sidebar-foreground: #b8c6d5;
  --sidebar-accent: #172a45;
  --sidebar-accent-foreground: #7fa5de;
  --sidebar-border: #2a3b4c;
  --sidebar-ring: #7fa5de;
}
.light {
  --background: #f6f8fb;
  --foreground: #0a1724;
  --card: #ffffff;
  --popover: #e5ebf1;
  --primary: #0a1724;
  --primary-foreground: #ffffff;
  --secondary: #eff3f7;
  --muted: #eff3f7;
  --muted-foreground: #596b7d;
  --accent: #e7eef9;
  --accent-foreground: #315c9f;
  --destructive: #b8323e;
  --border: #d7e0e9;
  --input: #7b8ea1;
  --ring: #315c9f;
}
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-primary: var(--primary);
}
```

### Font preset switching

No `data-font` attribute means Pretendard, the default sans. `<html data-font="wanted">` switches `--font-sans` to Wanted Sans. `--font-sans` and `--font-mono` are the variables defined in the Typography section; do not introduce a third family variable.

## Do's and Don'ts

These rules keep a new screen from drifting off the tokens. Follow them when you add a recipe, a color, or a layout.

### Do

- Keep a single accent: `{colors.accent}` for links, focus, selection, and info — nowhere else.
- Sit cards on `{colors.surface-1}` behind a 1px `{colors.hairline}` edge, not a drop shadow.
- Step depth with the surface ladder (`{colors.canvas}` → `{colors.surface-1}` → `{colors.surface-2}` → `{colors.surface-3}`) instead of stacking shadows on cards.
- Set Korean prose to `word-break: keep-all` and `overflow-wrap: anywhere` (the `:lang(ko)` rule, not on code).
- Define every token in both dark and light at once, under the same key.
- Reserve Jetendard for code (`code`, `kbd`, `samp`, `pre`, and the code tokens).
- Use `font-variant-numeric: tabular-nums` in tables.
- Size interactive hit areas to at least 44×44px; on mobile, buttons also set `min-height: 44px`.
- After every change, run `bun scripts/verify-design-md.ts DESIGN.md DESIGN.ko.md`.

### Don't

- Do not add a gradient, a glow, or neon treatment to any surface, control, or focus ring.
- Do not introduce a second saturated hue; success, warning, and danger stay role colors, not a second brand.
- Do not nest a card inside a nested card (no card-in-card-in-card).
- Do not wrap icons in colored tiles as decoration.
- Do not invent marketing stat rows such as 10k+, 99.9%, or 24/7.
- Do not use `{colors.ink-tertiary}` as text; it is decorative icons only.
- Do not use `{colors.hairline}` as the sole boundary of a button, input, or other control; those use `{colors.hairline-strong}`.
- Do not mark disabled by lowering `opacity`; use the **button-disabled** recipe.
- Do not italicize Hangul for emphasis; use weight or color. Jetendard italics keep Hangul upright.
- Do not copy sentences from other products' DESIGN.md files; take structure, not wording.

## Responsive Behavior

Layout reflows on a five-step width scale. Touch targets stay at 44×44px at every step.

### Breakpoints

| Name | Min width |
| ---- | --------- |
| sm   | 640px     |
| md   | 768px     |
| lg   | 1024px    |
| xl   | 1280px    |
| 2xl  | 1536px    |

### Touch Targets

Every interactive control is at least 44×44px. On viewports below 768px, buttons also set `min-height: 44px` even when their padding would otherwise make them shorter.

### Collapsing Strategy

- The sidebar becomes a top drawer below 1024px.
- Card grids collapse 3-up → 2-up → 1-up: three columns from 1024px, two from 768px, one below 768px.
- Tables below 768px sit in a horizontally scrolling container; do not restack cells into a definition list.

## Iteration Guide

- Adding a component means adding it to the frontmatter `components` map **and** to the body in Table-C form (background, text, optional border, typography, rounded, padding).
- Adding a color means adding dark **and** light values under the same key and passing the contrast check.
- After any edit, run `bun scripts/verify-design-md.ts DESIGN.md DESIGN.ko.md`. Use `--offline` only when the network is unavailable; the online run is the link gate.
- Update `DESIGN.md` and `DESIGN.ko.md` together. Headings stay English and in the same order; only the prose is translated.
- Keep the YAML frontmatter byte-identical between `DESIGN.md` and `DESIGN.ko.md`.

## Known Gaps

This repository had no shipped UI evidence at authoring time, so every token and recipe in this file is Proposed.

- Icon set is undecided (TODO).
- There is no illustration or photography policy.
- There is no chart palette.
- Jetendard must be self-hosted under `/fonts/jetendard/`; there is no CDN.
- Pretendard and Wanted Sans have different metrics, so line breaks differ between presets — check headings, tables, and buttons in both.
- Existing `src/components/button.tsx` hardcodes zinc classes, and `src/styles/globals.css` does not yet define the shadcn canvas variables. Migration is a follow-up, not covered by this document.

## Evidence and Assumptions

Accessibility claims in this file are limited to WCAG 2.1 AA contrast ratios. They are not a claim of full WCAG conformance.

| Claim                     | Evidence                                                                                          | Confidence |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ---------- |
| Primary color #0A1724     | User request                                                                                      | high       |
| Professional, clean tone  | User request plus the section structure of awesome-design-md examples (Vercel, HashiCorp, Linear) | medium     |
| Accent and neutral values | Planner proposal plus WCAG contrast computation                                                   | medium     |
| Font URLs                 | Official READMEs plus HTTP 200 checks                                                             | high       |
| Jetendard structure       | README and LICENSE (sixteen static faces, SIL OFL 1.1, Reserved Font Name)                        | high       |
| Typography scale          | Proposal                                                                                          | medium     |
| Component recipes         | Proposal                                                                                          | low        |
