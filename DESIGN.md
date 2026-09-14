---
version: "alpha"
name: "kood-design-system"
description: "Kood is a light-first design system on a #F3F5F8 canvas with a #101217 dark counterpart. One blue family carries every chromatic cue — primary for actions and accent for links, focus, selection, and info — never a second hue, never a glow. Cards sit on a surface ladder behind hairline borders instead of shadows. Pretendard is the default sans, Wanted Sans is an opt-in preset, and Jetendard is the code face."
mode-default: "light"
fonts:
  sans-default: "pretendard"
  sans-presets:
    pretendard: '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'
    wanted: '"Wanted Sans Variable", "Wanted Sans", "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'
  mono: '"Jetendard", "JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Noto Sans Mono CJK KR", "D2Coding", "Pretendard Variable", "Pretendard", ui-monospace, monospace'
colors:
  dark:
    canvas: "#101217"
    surface-1: "#191C22"
    surface-2: "#23272E"
    surface-3: "#2A2F37"
    hairline: "#2D323A"
    hairline-strong: "#7A8390"
    ink: "#F2F4F7"
    ink-muted: "#B9C0CA"
    ink-subtle: "#929BA7"
    ink-tertiary: "#64778A"
    primary: "#3A6FE0"
    on-primary: "#FFFFFF"
    primary-hover: "#3264D2"
    primary-active: "#2A58BD"
    accent: "#82A9F6"
    accent-hover: "#9DBBF8"
    accent-subtle: "#1A2840"
    focus-ring: "#6F9BF3"
    semantic-success: "#5DC78A"
    semantic-warning: "#E5AF4E"
    semantic-danger: "#F0858B"
    semantic-info: "#82A9F6"
    on-success: "#101217"
    on-warning: "#101217"
    on-danger: "#101217"
    on-info: "#101217"
    selection-bg: "#24457A"
    selection-ink: "#F2F4F7"
    code-bg: "#0B0D11"
    code-border: "#2D323A"
    code-ink: "#E6EAF0"
    code-comment: "#929BA7"
    code-keyword: "#82A9F6"
    code-string: "#5DC78A"
    code-number: "#E5AF4E"
    code-error: "#F0858B"
    overlay: "#05070AB3"
  light:
    canvas: "#F3F5F8"
    surface-1: "#FFFFFF"
    surface-2: "#EDF0F4"
    surface-3: "#FFFFFF"
    hairline: "#E3E7EC"
    hairline-strong: "#808A97"
    ink: "#171C24"
    ink-muted: "#454F5C"
    ink-subtle: "#5E6875"
    ink-tertiary: "#748395"
    primary: "#2861DB"
    on-primary: "#FFFFFF"
    primary-hover: "#2154C4"
    primary-active: "#1B47A8"
    accent: "#2258CC"
    accent-hover: "#1B47A8"
    accent-subtle: "#EAF1FD"
    focus-ring: "#2861DB"
    semantic-success: "#12774A"
    semantic-warning: "#8F5600"
    semantic-danger: "#CC2F3C"
    semantic-info: "#2258CC"
    on-success: "#FFFFFF"
    on-warning: "#FFFFFF"
    on-danger: "#FFFFFF"
    on-info: "#FFFFFF"
    selection-bg: "#D5E3FB"
    selection-ink: "#171C24"
    code-bg: "#F3F5F8"
    code-border: "#E3E7EC"
    code-ink: "#171C24"
    code-comment: "#5E6875"
    code-keyword: "#2258CC"
    code-string: "#12774A"
    code-number: "#8F5600"
    code-error: "#CC2F3C"
    overlay: "#10141B80"
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
  xs: "5px"
  sm: "7.5px"
  md: "10px"
  lg: "15px"
  xl: "20px"
  xxl: "30px"
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
    typography: "14px/20px"
    rounded: "{rounded.md}"
    padding: "9px 14px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "14px/20px"
    rounded: "{rounded.md}"
    padding: "9px 14px"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    typography: "14px/20px"
    rounded: "{rounded.md}"
    padding: "9px 14px"
  button-secondary:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "14px/20px"
    rounded: "{rounded.md}"
    padding: "9px 14px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "14px/20px"
    rounded: "{rounded.md}"
    padding: "9px 14px"
  button-destructive:
    backgroundColor: "{colors.semantic-danger}"
    textColor: "{colors.on-danger}"
    typography: "14px/20px"
    rounded: "{rounded.md}"
    padding: "9px 14px"
  button-disabled:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-subtle}"
    borderColor: "{colors.hairline-strong}"
    typography: "14px/20px"
    rounded: "{rounded.md}"
    padding: "9px 14px"
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
    typography: "16px/24px"
    rounded: "{rounded.md}"
    padding: "7px 12px"
  text-input-focused:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.focus-ring}"
    typography: "16px/24px"
    rounded: "{rounded.md}"
    padding: "7px 12px"
  text-input-error:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.semantic-danger}"
    typography: "16px/24px"
    rounded: "{rounded.md}"
    padding: "7px 12px"
  select:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "16px/24px"
    rounded: "{rounded.md}"
    padding: "7px 12px"
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

Kood is light-first. The page background is `{colors.canvas}` #F3F5F8 in the default light mode and its paired dark counterpart #101217.

One blue family carries every chromatic cue. `{colors.primary}` #2861DB is the action fill for buttons and checked controls; `{colors.accent}` #2258CC is the link, focus, selection, and info color. Use them for nothing else, and never add a second hue or a glow.

UI type is Pretendard Variable by default. Wanted Sans Variable is the opt-in sans, switched with `[data-font="wanted"]` on the document. Jetendard is the code face.

Built-in copy is Korean by default in 2.0: breadcrumb, pagination, carousel, dialog, sheet, and sidebar ship Korean labels, and each keeps its existing label prop as the English override surface. A consumer migrating from 1.x therefore either passes explicit English labels or adopts the Korean defaults. Migration is a consumer-side change and is tracked separately from this library contract.

**Key Characteristics:**

- **Light default.** `{colors.canvas}` #F3F5F8 is the home canvas; dark mode pairs it with #101217.
- **One blue family.** `{colors.primary}` fills actions and `{colors.accent}` is reserved for links, focus, selection, and info.
- **Hairline cards.** Surfaces sit on a three-step ladder behind 1px `{colors.hairline}` borders, not drop shadows.
- **Shadow only where it lifts.** Dark mode uses no shadow. Light mode uses one raised shadow, and only on menus, popovers, and dialogs.
- **Korean and Latin type.** Pretendard Variable is the default sans; Wanted Sans Variable is the `[data-font="wanted"]` preset; Jetendard is reserved for code. Korean body keeps line-height 1.5–1.67, tracking at 0 or -0.01em, `word-break: keep-all`, and `overflow-wrap: anywhere`.
- **Token-for-token pairing.** Every color, type, radius, and spacing key exists in both modes under the same name.
- **Two-language documentation.** This file is English; `DESIGN.ko.md` is the Korean twin with identical frontmatter and heading order.
- **Korean by default.** The 2.0 built-in labels (breadcrumb, pagination, carousel, dialog, sheet, sidebar) default to Korean and keep their English overrides through the existing label props. Consumers migrating from 1.x either pass explicit English labels or accept the Korean defaults.

## Colors

The palette is 37 tokens, paired light and dark; the lists below read light / dark. `#F3F5F8` is the light canvas and `#101217` the dark counterpart. `{colors.primary}` is the blue action fill in both modes (#2861DB / #3A6FE0); `{colors.accent}` is the slightly deeper blue used for links, focus, selection, and info (#2258CC / #82A9F6).

`{colors.ink-tertiary}` is decorative only and is never used as text. `{colors.hairline}` is allowed on containers (cards, tables, nav) but is never the sole boundary of an interactive control; those use `{colors.hairline-strong}`.

Contrast figures come from the sRGB relative-luminance formula and are re-checked by `scripts/verify-design-md.ts`. Text roles sit at or above 4.5:1 on canvas, surface-1, and surface-2 in both modes (minimum: light `{colors.semantic-danger}` on `{colors.surface-2}` at 4.55). Non-text roles sit at or above 3.0:1 on canvas and surface-1 (minimum: light `{colors.hairline-strong}` on `{colors.canvas}` at 3.20). On-token / semantic pairs sit at or above 4.5:1 (minimum: dark `{colors.on-primary}` on `{colors.primary}` at 4.64).

### Brand & Accent

- **Primary** ({colors.primary}): Blue action fill for default buttons and checked controls — #2861DB / #3A6FE0
- **On Primary** ({colors.on-primary}): Text and icons on a primary fill — #FFFFFF / #FFFFFF
- **Primary Hover** ({colors.primary-hover}): Hovered primary fill — #2154C4 / #3264D2
- **Primary Active** ({colors.primary-active}): Pressed primary fill — #1B47A8 / #2A58BD
- **Accent** ({colors.accent}): The link and emphasis blue, used on links, selection emphasis, and info — #2258CC / #82A9F6
- **Accent Hover** ({colors.accent-hover}): Hovered accent — #1B47A8 / #9DBBF8
- **Accent Subtle** ({colors.accent-subtle}): Tinted accent background for selected rows, badges, and info alerts — #EAF1FD / #1A2840
- **Focus Ring** ({colors.focus-ring}): 1px inset outline plus a border-color swap on the focused control — #2861DB / #6F9BF3

### Surface

- **Canvas** ({colors.canvas}): Page background — #F3F5F8 / #101217
- **Surface 1** ({colors.surface-1}): Cards and controls — #FFFFFF / #191C22
- **Surface 2** ({colors.surface-2}): Nested or inset regions, disabled backgrounds — #EDF0F4 / #23272E
- **Surface 3** ({colors.surface-3}): Dropdowns and sub-nav — #FFFFFF / #2A2F37
- **Hairline** ({colors.hairline}): Decorative 1px divider. Allowed on card, table, and nav containers; never the sole boundary of a button or input — #E3E7EC / #2D323A
- **Hairline Strong** ({colors.hairline-strong}): Interactive control border (non-text 3:1) — #808A97 / #7A8390
- **Overlay** ({colors.overlay}): Modal scrim, 8-digit hex at 50% / 70% alpha — #10141B80 / #05070AB3
- **Selection Background** ({colors.selection-bg}): `::selection` background — #D5E3FB / #24457A
- **Selection Ink** ({colors.selection-ink}): `::selection` text — #171C24 / #F2F4F7

The shadcn layer carries one neutral beyond the 37 DESIGN tokens. `{colors.surface-2}` is `--secondary` at #EDF0F4 / #23272E, while `--muted` is a distinct deeper fill at #E6EAEF / #2C3139. They share the nested-surface role but are not the same value; `--muted` is never treated as an extra surface-ladder step.

### Text

- **Ink** ({colors.ink}): Body and headings — #171C24 / #F2F4F7
- **Ink Muted** ({colors.ink-muted}): Secondary text — #454F5C / #B9C0CA
- **Ink Subtle** ({colors.ink-subtle}): Captions, placeholders, disabled labels — #5E6875 / #929BA7
- **Ink Tertiary** ({colors.ink-tertiary}): Decorative icons only; never text — #748395 / #64778A

### Semantic

- **Success** ({colors.semantic-success}): Success fills — #12774A / #5DC78A
- **Warning** ({colors.semantic-warning}): Warning fills — #8F5600 / #E5AF4E
- **Danger** ({colors.semantic-danger}): Destructive fills — #CC2F3C / #F0858B
- **Info** ({colors.semantic-info}): Info fills; reuses accent — #2258CC / #82A9F6
- **On Success** ({colors.on-success}): Text on a solid success fill — #FFFFFF / #101217
- **On Warning** ({colors.on-warning}): Text on a solid warning fill — #FFFFFF / #101217
- **On Danger** ({colors.on-danger}): Text on a solid danger fill — #FFFFFF / #101217
- **On Info** ({colors.on-info}): Text on a solid info fill — #FFFFFF / #101217

### Code

- **Code Background** ({colors.code-bg}): Code block background — #F3F5F8 / #0B0D11
- **Code Border** ({colors.code-border}): Code block border — #E3E7EC / #2D323A
- **Code Ink** ({colors.code-ink}): Default code text — #171C24 / #E6EAF0
- **Code Comment** ({colors.code-comment}): Comments — #5E6875 / #929BA7
- **Code Keyword** ({colors.code-keyword}): Keywords; reuses accent — #2258CC / #82A9F6
- **Code String** ({colors.code-string}): Strings; reuses success — #12774A / #5DC78A
- **Code Number** ({colors.code-number}): Numbers; reuses warning — #8F5600 / #E5AF4E
- **Code Error** ({colors.code-error}): Errors; reuses danger — #CC2F3C / #F0858B

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
  --kood-font-sans:
    "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  --kood-font-mono:
    "Jetendard", "JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono",
    "Noto Sans Mono CJK KR", "D2Coding", "Pretendard Variable", "Pretendard", ui-monospace,
    monospace;
}
[data-font="wanted"] {
  --kood-font-sans:
    "Wanted Sans Variable", "Wanted Sans", "Pretendard Variable", "Pretendard", -apple-system,
    BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial,
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
}
html {
  font-family: var(--kood-font-sans);
}
code,
kbd,
samp,
pre {
  font-family: var(--kood-font-mono);
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

The base unit is 4px. The scale is fourteen tokens; use a token whenever the value exists on the scale. Card interiors are 24px = `{spacing.6}`. Default buttons are 40px border-box rows with 14px / 20px type and `9px 14px` padding; default inputs and selects are 40px border-box rows with 16px / 24px type and `7px 12px` padding. Below 768px, each minimum row height is 44px. Section-to-section gap is `{spacing.24}` 96px.

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

| Level | Treatment                                                              | Use                          |
| ----- | ---------------------------------------------------------------------- | ---------------------------- |
| 0     | Flat `{colors.canvas}`                                                 | Page background              |
| 1     | `{colors.surface-1}` + 1px `{colors.hairline}`                         | Cards                        |
| 2     | `{colors.surface-2}` + 1px `{colors.hairline}`                         | Nested or inset regions      |
| 3     | `{colors.surface-3}` + `{colors.hairline-strong}`                      | Dropdowns, tooltips, sub-nav |
| 4     | `1px inset {colors.focus-ring}` outline + `{colors.focus-ring}` border | Focus                        |

Light mode defines `--shadow-raised: 0 1px 2px rgb(10 23 36 / 6%), 0 8px 24px rgb(10 23 36 / 8%)`. Use it only on menus, popovers, and dialogs — never on cards. Dark mode sets `--shadow-raised` to `none`.

## Shapes

Corners derive from the document's `--radius` base (10px by default). Pick the token that matches the component; do not interpolate.

### Border Radius Scale

| Token          | Value  | Use                                           |
| -------------- | ------ | --------------------------------------------- |
| {rounded.none} | 0px    | Nav bars, tabs, tables                        |
| {rounded.xs}   | 5px    | Checkboxes                                    |
| {rounded.sm}   | 7.5px  | Tooltips; selected sidebar items              |
| {rounded.md}   | 10px   | Buttons and inputs; nested cards; code blocks |
| {rounded.lg}   | 15px   | Cards; dialogs; product-screenshot frames     |
| {rounded.xl}   | 20px   | Large overlays                                |
| {rounded.xxl}  | 30px   | Reserved for large product-screenshot frames  |
| {rounded.full} | 9999px | Badges and pills                              |

The CSS contract is `--radius-xs: calc(var(--radius) * .5)`, `--radius-sm: calc(var(--radius) * .75)`, `--radius-md: var(--radius)`, `--radius-lg: calc(var(--radius) * 1.5)`, `--radius-xl: calc(var(--radius) * 2)`, and `--radius-2xl: calc(var(--radius) * 3)`. `none` and `full` stay independent. A root `--radius` override therefore changes the named scale; a later named override such as `--radius-md: 7px` changes only that name.

There is no photography or illustration policy yet; that belongs in Known Gaps. Product screenshots use `{rounded.lg}` frames. `{rounded.xxl}` is reserved for large product-screenshot frames.

## Components

Thirty recipes, grouped below. Each line is rest appearance for the current mode: `{colors.X}` resolves to `colors.dark.X` or `colors.light.X`. Omit a border segment when the recipe has no border. Padding values are literals from the frontmatter (14px is off the spacing scale and stays a literal).

Four 2.0 policies sit on top of these recipes. Radii come from the 10px `--radius` base. Filled actions use the blue `{colors.primary}`; outlined actions gain a grey `{colors.surface-2}` hover fill, and default buttons keep a 44px minimum row (`lg` is `min-h-11`, `icon-lg` is `size-11`). Selection and highlight are token fills, not borders: an active pill tab or pagination item inverts to `{colors.ink}` on `{colors.canvas}`, a pressed toggle is `{colors.surface-2}` with a `{colors.hairline-strong}` border, a sidebar active item is an accent tint with a 3px `{colors.primary}` bar and `font-semibold`, and a highlighted menu or list item is `{colors.surface-2}` with a 2px `{colors.focus-ring}` bar. Built-in labels default to Korean; the label props remain the override surface.

### Buttons

In both modes `{colors.primary}` is the blue action fill (#2861DB / #3A6FE0). `{colors.hairline}` is never the sole boundary of an interactive control; outlined buttons and inputs use `{colors.hairline-strong}`. Default buttons use a 40px border-box row, 14px / 20px type, and `9px 14px` padding; their minimum height is 44px below 768px, and the large sizes raise it to `min-h-11` / `size-11`.

- **button-primary** — Default filled action. bg {colors.primary} · text {colors.on-primary} · 14px/20px control type · {rounded.md} · padding 9px 14px
- **button-primary-hover** — Hovered primary fill. bg {colors.primary-hover} · text {colors.on-primary} · 14px/20px control type · {rounded.md} · padding 9px 14px
- **button-primary-active** — Pressed primary fill. bg {colors.primary-active} · text {colors.on-primary} · 14px/20px control type · {rounded.md} · padding 9px 14px
- **button-secondary** — Outlined secondary action. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · 14px/20px control type · {rounded.md} · padding 9px 14px
- **button-ghost** — Chrome-less action. bg transparent · text {colors.ink-muted} · 14px/20px control type · {rounded.md} · padding 9px 14px
- **button-destructive** — Destructive filled action. bg {colors.semantic-danger} · text {colors.on-danger} · 14px/20px control type · {rounded.md} · padding 9px 14px
- **button-disabled** — Disabled control. bg {colors.surface-2} · text {colors.ink-subtle} · border {colors.hairline-strong} · 14px/20px control type · {rounded.md} · padding 9px 14px

### Cards & Containers

Cards sit on the surface ladder behind a decorative `{colors.hairline}` edge, not a drop shadow.

- **card** — Primary content container. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline} · {typography.body} · {rounded.lg} · padding 24px
- **card-nested** — Inset region inside a card. bg {colors.surface-2} · text {colors.ink} · border {colors.hairline} · {typography.body-sm} · {rounded.md} · padding 16px

### Inputs & Forms

Interactive fields use `{colors.hairline-strong}` at rest. Focus replaces the border color with `{colors.focus-ring}` and adds the 1px inset outline; error replaces it with `{colors.semantic-danger}` and keeps an inset outline in `{colors.ink}` when focused. Neither adds a box-shadow. Default inputs and selects use 40px border-box rows, 16px / 24px type, and `7px 12px` padding; their minimum height is 44px below 768px.

- **text-input** — Single-line text field. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · 16px/24px control type · {rounded.md} · padding 7px 12px
- **text-input-focused** — Focused text field. bg {colors.surface-1} · text {colors.ink} · border {colors.focus-ring} · 16px/24px control type · {rounded.md} · padding 7px 12px
- **text-input-error** — Invalid text field. bg {colors.surface-1} · text {colors.ink} · border {colors.semantic-danger} · 16px/24px control type · {rounded.md} · padding 7px 12px
- **select** — Select trigger. bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · 16px/24px control type · {rounded.md} · padding 7px 12px
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
- **Focus-visible.** Keyboard focus is a 1px inset outline plus a border-color swap, never a box-shadow stand-in. The global rule is only a base fallback; kood components declare their own focus utilities:

```css
:focus-visible {
  outline: 1px solid {colors.focus-ring};
  outline-offset: -1px;
}
@media (forced-colors: active) {
  :focus-visible {
    outline-color: Highlight;
  }
}
```

- **Focus model (B-2).** The focused control keeps its rest geometry and changes color only: the 1px inset outline appears at `outline-offset: -1px` and the border moves to `{colors.focus-ring}`. The per-component rules are:
  - Fields and bordered controls (Input, Textarea, Select trigger, Combobox input, InputOTP, Calendar dropdown, InputGroup) use `focus-visible:border-ring focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring`. Invalid controls add `aria-invalid:focus-visible:outline-foreground`; the border stays `{colors.semantic-danger}`.
  - Filled actions (Button default and destructive) use the inset outline in `{colors.on-primary}` / `{colors.on-danger}` because a ring color does not sit on the fill.
  - Checkbox, RadioGroup, Switch, and the Slider thumb use `focus-visible:border-foreground focus-visible:outline-hidden`, with `aria-invalid:focus-visible:border-foreground` for the invalid checkbox.
  - Tabs and NavigationMenuLink use the same inset ring box. The pill tab's active outline is `{colors.canvas}` on its fill, and NavigationMenuLink drops the old descendant `focus:outline-none` rule.
  - Menu, Select, Combobox, and Command items use `focus-visible:outline-hidden` plus a 2px inset `data-highlighted` bar in `{colors.focus-ring}`, or `{colors.on-danger}` for destructive items; forced-colors replaces the bar with a 1px outline.
  - Bare `outline-hidden` without a `focus-visible:` prefix is forbidden, and `outline-2` is allowed only when the same class list carries `-outline-offset-2`.
- **Focus combinations.** Extra specificity is needed only where a later equal-specificity rule would hide focus: `aria-invalid` on fields and checkboxes, and the active pill tab outline. Sidebar active items, `data-checked`, and `data-active` already sit on `:where()` selectors, so they need no combination.
- **Disabled.** Do not fade with `opacity`. Use **button-disabled**: background `{colors.surface-2}`, label `{colors.ink-subtle}`, border `{colors.hairline-strong}`. Pointer events off.
- **Selected.** Background `{colors.accent-subtle}` and text `{colors.accent}`, matching **sidebar-item-selected** and **badge-accent**. An active pill tab or pagination item inverts instead: `{colors.ink}` background with `{colors.canvas}` text.
- **Highlighted.** Menu, Select, Combobox, and Command items mark the current highlight with a `{colors.surface-2}` fill and a 2px inset `{colors.focus-ring}` bar (**`data-highlighted`**), never a border.
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

Light is the default because `:root` and `.light` define the light contract, so a document needs no class for light mode. Dark mode is explicit: put `class="dark"` on `<html>`, which also matches `@custom-variant dark (&:is(.dark *))`. Server rendering must set the class explicitly; the system `prefers-color-scheme` is not followed. This repository already depends on `next-themes`; use its class attribute and render `class="light"` for the default. A consumer that overrode `:root` expecting the old dark defaults must move that override to `.light`, or set `class="dark"` and override `.dark`.

### Mapping to shadcn and Tailwind tokens

`src/styles/globals.css` defines the full shadcn token table on dark `:root` / `.dark` and explicit `.light`; `@theme inline` exposes the corresponding Tailwind colors. The named radii derive from `--radius`, so document-root base and named-radius overrides remain effective. The DESIGN mapping is:

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
| ink-muted       | --foreground-muted          | text-foreground-muted          |
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

Components consume the semantic token classes above; do not substitute hardcoded palette classes. `{colors.surface-2}` feeds two shadcn variables with different 2.0 values: `--secondary` is #EDF0F4 / #23272E and `--muted` is #E6EAEF / #2C3139. An override of one does not move the other.

**Glass material contract.** `glass` and `glass-strong` are opt-in neutral surface alternatives; every existing default keeps its current solid output. The shared CSS exception is limited to these seven public custom properties: `--glass-background`, `--glass-strong-background`, `--glass-hover`, `--glass-active`, `--glass-solid`, `--glass-strong-solid`, and `--glass-blur`. `kood-glass` and `kood-glass-strong` own the material fill and filter only. The normal material uses a modest 12px blur; strong increases opacity, not blur.

The recipes start with the owning surface's opaque solid fallback. Only standard or prefixed filter support enables the translucent fill and matching `backdrop-filter` declarations. Disabled and truthy `data-disabled` surfaces, `forced-colors`, and reduced-transparency modes stay opaque and disable filtering in every state. The recipes do not change foreground, border, focus, semantic state, or shadow ownership, and they do not authorize arbitrary component blur, alpha, or shadows.

The neutral API is `variant="glass"` or `variant="glass-strong"` on the visible surface. Button, Badge, Toggle, ToggleGroup and ToggleGroupItem, Alert, and Item extend their existing variants; semantic variants remain solid alternatives. Input, Textarea, InputGroup, SelectTrigger and SelectContent, ComboboxInput, ComboboxChips and ComboboxContent, Card and CardNested, Calendar, ButtonGroupText, Menubar, PopoverContent, HoverCardContent, TooltipContent, DropdownMenuContent and DropdownMenuSubContent, ContextMenuContent and ContextMenuSubContent, DialogContent, AlertDialogContent, SheetContent, DrawerContent, Command, and CommandDialog use `variant?: "default" | "glass" | "glass-strong"` unless an existing variant has layout meaning. Variant values stay off native DOM and select classes plus `data-variant`; wrapper aliases inherit the underlying prop types.

Sidebar, NavigationMenu, and Toaster retain their existing layout or semantic APIs and add `appearance?: "default" | "glass" | "glass-strong"`. Sidebar forwards appearance to its desktop and mobile surface. NavigationMenu forwards appearance to its internal popup, keeps glass viewport content transparent, and lets independently rendered content opt in without double filtering. Toaster applies the neutral material locally; semantic toast types keep their original solid fills and consumer `toastOptions` overrides still win. CommandDialog passes its variant to DialogContent and keeps its inner Command transparent for a glass dialog. ToggleGroup filters its items only; its wrapper never filters.

The shipped mapping is:

```css
:root,
.light {
  --background: #f3f5f8;
  --card: #ffffff;
  --sidebar: #ffffff;
  --secondary: #edf0f4;
  --muted: #e6eaef;
  --popover: #ffffff;
  --border: #e3e7ec;
  --sidebar-border: #e3e7ec;
  --code-border: #e3e7ec;
  --input: #808a97;
  --code: #f3f5f8;
  --overlay: #10141b80;
  --primary: #2861db;
  --primary-foreground: #ffffff;
  --accent: #eaf1fd;
  --accent-foreground: #2258cc;
  --ring: #2861db;
  --radius: 10px;
  --kood-shadow-raised: 0 1px 2px rgb(10 23 36 / 6%), 0 8px 24px rgb(10 23 36 / 8%);
}
.dark {
  --background: #101217;
  --card: #191c22;
  --sidebar: #191c22;
  --secondary: #23272e;
  --muted: #2c3139;
  --popover: #2a2f37;
  --border: #2d323a;
  --sidebar-border: #2d323a;
  --code-border: #2d323a;
  --input: #7a8390;
  --code: #0b0d11;
  --overlay: #05070ab3;
  --primary: #3a6fe0;
  --primary-foreground: #ffffff;
  --accent: #1a2840;
  --accent-foreground: #82a9f6;
  --ring: #6f9bf3;
  --radius: 10px;
  --kood-shadow-raised: none;
}
```

The remaining text, hover/active fills, blue emphasis, selection, and semantic fills follow the frontmatter colors table. `--secondary` and `--muted` keep their distinct values above; every other surface maps to a single DESIGN key. `--radius` is 10px in both modes, and `--kood-shadow-raised` is the only mode-specific shadow value.

**Consumer CSS override contract.** `globals.css` (published as `@kood/components/globals.css`, with `./styles.css` an identical copy) declares the radius, font, and boundary defaults in a non-layered `:root` block, so a consumer that imports Tailwind after kood still resolves `--radius-md: var(--radius)`, `--radius-lg: calc(var(--radius) * 1.5)`, `--font-sans: var(--kood-font-sans)`, `--font-mono: var(--kood-font-mono)`, and `border-color: var(--border)` from kood. To customize, a consumer overrides after the import in the matching block — `:root` or `.light` for light, `.dark` for dark. Setting `--radius` re-derives `--radius-xs` through `--radius-2xl`; setting a named radius such as `--radius-md: 7px` changes only that name. Rebrand the sans and mono through the public `--kood-font-sans` / `--kood-font-mono` hooks rather than redefining Tailwind's `--font-sans`. A consumer's own non-layered `:root` / `.dark` / `.light` block still wins over kood's declarations.

### Font preset switching

No `data-font` attribute means Pretendard, the default sans. `<html data-font="wanted">` switches `--kood-font-sans` to Wanted Sans. `--kood-font-sans` and `--kood-font-mono` are the package hooks; Tailwind's `--font-sans` and `--font-mono` alias them. Do not introduce a third family variable.

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
- Use 40px default Button, Input, and Select rows at 768px and above; below 768px each has `min-height: 44px`.
- After every change, run `bun scripts/verify-design-md.ts --offline DESIGN.md DESIGN.ko.md`.
- Keep glass changes within the seven-property material contract and verify both neutral variants, their opaque fallback, and the unchanged default output.
- Keep keyboard focus on the B-2 model: a 1px inset `{colors.focus-ring}` outline at `outline-offset: -1px` plus a border-color swap, with the `aria-invalid` and pill-active combinations from Interaction States.

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
- Do not add component-level blur, alpha utilities, or shadows for glass; only the shared material recipe may use its documented filter and translucent fills.
- Do not ship a bare `outline-hidden`, or an `outline-2` ring without a matching `-outline-offset-2`, and do not restore the old 2px-offset focus outline.

## Responsive Behavior

Layout reflows on a five-step width scale. Default Button, Input, and Select rows are 40px at 768px and above, with 44px minimum rows below 768px.

### Breakpoints

| Name | Min width |
| ---- | --------- |
| sm   | 640px     |
| md   | 768px     |
| lg   | 1024px    |
| xl   | 1280px    |
| 2xl  | 1536px    |

### Touch Targets

On viewports at least 768px, default Button, Input, and Select rows are 40px. Below 768px, each uses `min-height: 44px` even when its padding would otherwise make it shorter.

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

This document records the shipped token and geometry contract; browser evidence for each primitive and screen is tracked with its implementation task.

- Icon set is undecided (TODO).
- There is no illustration or photography policy.
- There is no chart palette.
- Jetendard must be self-hosted under `/fonts/jetendard/`; there is no CDN.
- Pretendard and Wanted Sans have different metrics, so line breaks differ between presets — check headings, tables, and buttons in both.
- Built-in Korean label defaults land in 2.0 (B5); a 1.x consumer keeps English labels until it migrates.
- The 2.0 borderless card, badge, alert, empty, and pagination treatment and its typography land at the B3 gate; the frontmatter recipes above still record the current rest geometry.
- Consumer-repository migration is a separate, later phase and is not part of this document.
- Component-level browser coverage remains the responsibility of the primitive implementation and integration tasks.

## Evidence and Assumptions

Accessibility claims in this file are limited to WCAG 2.1 AA contrast ratios. They are not a claim of full WCAG conformance.

| Claim                     | Evidence                                                                                          | Confidence |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ---------- |
| Light canvas #F3F5F8      | Approved light-first contract                                                                     | high       |
| Professional, clean tone  | User request plus the section structure of awesome-design-md examples (Vercel, HashiCorp, Linear) | medium     |
| Accent and neutral values | Planner proposal plus WCAG contrast computation                                                   | medium     |
| Font URLs                 | Official READMEs plus HTTP 200 checks                                                             | high       |
| Jetendard structure       | README and LICENSE (sixteen static faces, SIL OFL 1.1, Reserved Font Name)                        | high       |
| Typography scale          | Proposal                                                                                          | medium     |
| Component recipes         | Proposal                                                                                          | low        |
