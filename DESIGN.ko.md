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

Kood는 다크를 기본으로 합니다. 페이지 배경은 기본 다크 모드에서 `{colors.canvas}` #0A1724이고 짝이 되는 라이트 값은 #F6F8FB입니다. 이 네이비가 브랜드 시드입니다. 다크에서는 캔버스이고 라이트에서는 잉크와 프라이머리입니다.

절제된 파랑 `{colors.accent}` 하나가 모든 색 단서를 맡습니다. 링크와 포커스 링, 텍스트 선택과 정보에만 쓰고 다른 곳에는 쓰지 않습니다. 두 번째 색상은 없습니다.

UI 서체는 기본이 Pretendard Variable입니다. Wanted Sans Variable은 선택형 산스이며 문서에 `[data-font="wanted"]`를 붙여 전환합니다. Jetendard는 코드 전용 서체입니다.

**Key Characteristics:**

- **Dark default.** `{colors.canvas}` #0A1724가 기본 캔버스이며 라이트 모드는 #F6F8FB와 짝을 이룹니다.
- **One restrained blue.** `{colors.accent}`는 링크와 포커스, 선택과 정보에만 씁니다.
- **Hairline cards.** 표면은 드롭 섀도가 아니라 1px `{colors.hairline}` 테두리 뒤의 3단 사다리에 놓입니다.
- **Shadow only where it lifts.** 다크 모드는 그림자를 쓰지 않습니다. 라이트 모드는 올린 그림자 하나를 쓰며 메뉴와 팝오버, 다이얼로그에만 적용합니다.
- **Korean and Latin type.** Pretendard Variable이 기본 산스이고 Wanted Sans Variable은 `[data-font="wanted"]` 프리셋이며 Jetendard는 코드 전용입니다. 한국어 본문은 line-height 1.5–1.67, 트래킹 0 또는 -0.01em, `word-break: keep-all`, `overflow-wrap: anywhere`를 유지합니다.
- **Token-for-token pairing.** 색과 서체, 반지름과 간격 키는 두 모드에 같은 이름으로 모두 존재합니다.
- **Two-language documentation.** 영어 문서는 `DESIGN.md`이고 이 파일 `DESIGN.ko.md`는 프론트매터와 헤딩 순서가 같은 한국어 쌍둥이입니다.

## Colors

팔레트는 다크와 라이트가 짝을 이루는 토큰 37 개입니다. `#0A1724`가 브랜드 시드입니다. 다크 모드에서는 `{colors.canvas}`이고 라이트 모드에서는 `{colors.ink}`와 `{colors.primary}`입니다. `{colors.primary}` 자체는 브랜드 시드가 아니라 시맨틱 동작 채움입니다. 다크 모드에서는 밝은 뉴트럴 #E7EEF6이 되어 채운 버튼이 캔버스에 가라앉지 않습니다.

`{colors.ink-tertiary}`는 장식 전용이며 텍스트로 쓰지 않습니다. `{colors.hairline}`은 카드와 테이블, 내비게이션 같은 컨테이너에는 허용하지만 인터랙티브 컨트롤의 유일한 경계로는 쓰지 않습니다. 인터랙티브 컨트롤은 `{colors.hairline-strong}`을 씁니다.

대비 수치는 sRGB 상대 휘도 공식으로 계산하며 `scripts/verify-design-md.ts`가 다시 확인합니다. 텍스트 역할은 두 모드 모두 캔버스와 surface-1, surface-2 위에서 4.5:1 이상입니다(최솟값: 라이트 `{colors.ink-subtle}` on `{colors.surface-2}` 4.93). 비텍스트 역할은 캔버스와 surface-1 위에서 3.0:1 이상입니다(최솟값: 라이트 `{colors.hairline-strong}` on `{colors.canvas}` 3.17). on-토큰과 시맨틱 쌍은 4.5:1 이상입니다(최솟값: 라이트 `{colors.on-danger}` on `{colors.semantic-danger}` 5.89).

### Brand & Accent

- **Primary** ({colors.primary}): 기본 버튼과 체크된 컨트롤의 시맨틱 동작 채움입니다. 브랜드 시드가 아닙니다. #E7EEF6 / #0A1724
- **On Primary** ({colors.on-primary}): 프라이머리 채움 위의 텍스트와 아이콘입니다. #0A1724 / #FFFFFF
- **Primary Hover** ({colors.primary-hover}): 호버된 프라이머리 채움입니다. #F3F7FB / #12283B
- **Primary Active** ({colors.primary-active}): 눌린 프라이머리 채움입니다. #CBD8E5 / #06121E
- **Accent** ({colors.accent}): 유일한 파랑이며 링크와 선택 강조, 정보에 씁니다. #7FA5DE / #315C9F
- **Accent Hover** ({colors.accent-hover}): 호버된 액센트입니다. #96B5E2 / #244D83
- **Accent Subtle** ({colors.accent-subtle}): 선택된 행과 배지, 정보 알림용 액센트 틴트 배경입니다. #172A45 / #E7EEF9
- **Focus Ring** ({colors.focus-ring}): `outline: 2px solid; outline-offset: 2px`입니다. #7FA5DE / #315C9F

### Surface

- **Canvas** ({colors.canvas}): 페이지 배경입니다. 다크 모드의 브랜드 시드입니다. #0A1724 / #F6F8FB
- **Surface 1** ({colors.surface-1}): 카드와 컨트롤입니다. #101E2C / #FFFFFF
- **Surface 2** ({colors.surface-2}): 중첩 또는 인셋 영역과 비활성 배경입니다. #172635 / #EFF3F7
- **Surface 3** ({colors.surface-3}): 드롭다운과 서브 내비게이션입니다. #1E2E3E / #E5EBF1
- **Hairline** ({colors.hairline}): 장식용 1px 구분선입니다. 카드와 테이블, 내비게이션 컨테이너에는 허용하고 버튼이나 입력의 유일한 경계로는 쓰지 않습니다. #2A3B4C / #D7E0E9
- **Hairline Strong** ({colors.hairline-strong}): 인터랙티브 컨트롤 테두리(비텍스트 3:1)입니다. #566F88 / #7B8EA1
- **Overlay** ({colors.overlay}): 모달 스크린이며 8자리 hex에 알파 72% / 40%입니다. #02070DB8 / #07131F66
- **Selection Background** ({colors.selection-bg}): `::selection` 배경입니다. #264A78 / #CFE0FA
- **Selection Ink** ({colors.selection-ink}): `::selection` 텍스트입니다. #F3F7FB / #0A1724

### Text

- **Ink** ({colors.ink}): 본문과 헤딩입니다. #F3F7FB / #0A1724
- **Ink Muted** ({colors.ink-muted}): 보조 텍스트입니다. #B8C6D5 / #394B5E
- **Ink Subtle** ({colors.ink-subtle}): 캡션과 플레이스홀더, 비활성 레이블입니다. #899AAD / #596B7D
- **Ink Tertiary** ({colors.ink-tertiary}): 장식 아이콘 전용이며 텍스트로 쓰지 않습니다. #64778A / #748395

### Semantic

- **Success** ({colors.semantic-success}): 성공 채움입니다. #6BCB91 / #1E7147
- **Warning** ({colors.semantic-warning}): 경고 채움입니다. #E4B45B / #80520A
- **Danger** ({colors.semantic-danger}): 위험 채움입니다. #F18484 / #B8323E
- **Info** ({colors.semantic-info}): 정보 채움이며 액센트를 재사용합니다. #7FA5DE / #315C9F
- **On Success** ({colors.on-success}): 솔리드 성공 채움 위의 텍스트입니다. #07131F / #FFFFFF
- **On Warning** ({colors.on-warning}): 솔리드 경고 채움 위의 텍스트입니다. #07131F / #FFFFFF
- **On Danger** ({colors.on-danger}): 솔리드 위험 채움 위의 텍스트입니다. #07131F / #FFFFFF
- **On Info** ({colors.on-info}): 솔리드 정보 채움 위의 텍스트입니다. #07131F / #FFFFFF

### Code

- **Code Background** ({colors.code-bg}): 코드 블록 배경입니다. #07131F / #EFF3F7
- **Code Border** ({colors.code-border}): 코드 블록 테두리입니다. #2A3B4C / #D7E0E9
- **Code Ink** ({colors.code-ink}): 기본 코드 텍스트입니다. #E7EEF6 / #0A1724
- **Code Comment** ({colors.code-comment}): 주석입니다. #899AAD / #596B7D
- **Code Keyword** ({colors.code-keyword}): 키워드이며 액센트를 재사용합니다. #7FA5DE / #315C9F
- **Code String** ({colors.code-string}): 문자열이며 성공을 재사용합니다. #6BCB91 / #1E7147
- **Code Number** ({colors.code-number}): 숫자이며 경고를 재사용합니다. #E4B45B / #80520A
- **Code Error** ({colors.code-error}): 오류이며 위험을 재사용합니다. #F18484 / #B8323E

## Typography

UI 서체는 산스 프리셋 2 개와 코드 서체 1 개입니다. Pretendard Variable이 기본입니다. Wanted Sans Variable은 `[data-font="wanted"]` 프리셋입니다. Jetendard는 코드 전용입니다. 프론트매터 `typography.*.fontFamily`는 기본 패밀리를 기록합니다. `[data-font]` 프리셋이 런타임에 실제 산스를 덮어씁니다.

### Font Family

- **Pretendard** (기본). 패밀리 `Pretendard Variable`. 웨이트 9 개. SIL OFL 1.1. https://github.com/orioncactus/pretendard
- **Wanted Sans** (프리셋 `wanted`). 패밀리 `Wanted Sans Variable`. 웨이트 7 개. SIL OFL 1.1. https://github.com/wanteddev/wanted-sans
- **Jetendard** (코드). 패밀리 `Jetendard`. JetBrainsMono Nerd Font Mono에 Pretendard 한글을 1.15 배율로 더한 서체입니다. 정적 페이스 16 개(Thin부터 ExtraBold까지 × 직립/이탤릭. Black 없음). 이탤릭 변형에서도 한글은 직립을 유지합니다. SIL OFL 1.1이며 Reserved Font Name은 "Jetendard"입니다. https://github.com/kuskhan/jetendard

프론트매터의 `typography.*.fontFamily`는 기본 패밀리를 기록합니다. `[data-font]` 프리셋이 런타임에 실제 산스를 덮어씁니다.

### Loading fonts

`<link>` 블록 또는 `@import` 블록 중 하나만 쓰고 둘 다 쓰지 않습니다.

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

Jetendard에는 CDN이 없습니다. https://github.com/kuskhan/jetendard/releases/tag/v0.1.0 의 v0.1.0 릴리스에서 `Jetendard-WebFont.zip`을 받아 `*.woff2` 파일을 `/fonts/jetendard/` 아래에 둡니다. 파일 이름 16 개는 `Jetendard-Thin.woff2`, `Jetendard-ThinItalic.woff2`, `Jetendard-ExtraLight.woff2`, `Jetendard-ExtraLightItalic.woff2`, `Jetendard-Light.woff2`, `Jetendard-LightItalic.woff2`, `Jetendard-Regular.woff2`, `Jetendard-Italic.woff2`(Regular italic), `Jetendard-Medium.woff2`, `Jetendard-MediumItalic.woff2`, `Jetendard-SemiBold.woff2`, `Jetendard-SemiBoldItalic.woff2`, `Jetendard-Bold.woff2`, `Jetendard-BoldItalic.woff2`, `Jetendard-ExtraBold.woff2`, `Jetendard-ExtraBoldItalic.woff2`입니다. 위의 `@font-face` 규칙 4 개(400, 400 italic, 600, 700)는 프로덕션에서 필수입니다. 나머지 페이스 12 개는 선택입니다.

세 서체 모두 SIL OFL 1.1입니다. 자체 호스팅 파일 옆에 OFL 라이선스 파일을 둡니다. Reserved Font Name(Jetendard, Pretendard, Wanted Sans)으로 수정한 서체를 재배포하지 않습니다.

### Hierarchy

| 토큰                    | 크기 | 웨이트 | 행간  | 자간     | 용도                                                |
| ----------------------- | ---- | ------ | ----- | -------- | --------------------------------------------------- |
| {typography.display-xl} | 64px | 700    | 1.125 | -0.01em  | 히어로                                              |
| {typography.display-lg} | 52px | 700    | 1.15  | -0.01em  | 섹션 도입                                           |
| {typography.display-md} | 40px | 700    | 1.2   | -0.01em  | 하위 섹션                                           |
| {typography.headline}   | 32px | 700    | 1.25  | -0.01em  | 페이지 제목                                         |
| {typography.title}      | 24px | 650    | 1.33  | -0.01em  | 카드 제목                                           |
| {typography.subhead}    | 20px | 600    | 1.4   | -0.005em | 리드 문단                                           |
| {typography.body-lg}    | 18px | 400    | 1.67  | -0.005em | 큰 본문                                             |
| {typography.body}       | 16px | 400    | 1.625 | 0        | 기본 본문                                           |
| {typography.body-sm}    | 14px | 400    | 1.57  | 0        | 카드 본문과 테이블                                  |
| {typography.caption}    | 12px | 400    | 1.5   | 0        | 캡션                                                |
| {typography.eyebrow}    | 12px | 650    | 1.33  | 0.04em   | 한국어 아이브로우 0.04em. 라틴 대문자는 최대 0.08em |
| {typography.button}     | 14px | 600    | 1.43  | 0        | 버튼                                                |
| {typography.code}       | 14px | 400    | 1.57  | 0        | Jetendard                                           |
| {typography.code-sm}    | 12px | 400    | 1.5   | 0        | Jetendard                                           |

### Principles

- 하나의 목소리 700→400입니다. display부터 headline까지 700, 이어서 650/600, 본문은 400입니다.
- 디스플레이 트래킹 상한은 -0.01em입니다. 라틴 전용 카피는 {typography.display-xl} / {typography.display-lg}에서 -0.02em, {typography.display-md} / {typography.headline}에서 -0.015em까지 줄일 수 있습니다. 한글이 섞이면 표 값을 유지합니다.
- 아이브로우 트래킹은 양수입니다. 한국어는 0.04em이고 라틴 대문자는 최대 0.08em입니다.
- 모노는 코드 맥락(`code`, `kbd`, `samp`, `pre`와 코드 토큰)에서만 씁니다.
- 웨이트 650은 가변 서체를 전제로 합니다.

### Korean typography rules

- 본문 행간은 1.5–1.67입니다.
- `word-break: keep-all; overflow-wrap: anywhere`는 산문에만 적용합니다(`:lang(ko)` 규칙이며 코드에는 적용하지 않습니다).
- 한국어 아이브로우 트래킹은 0.04em으로 고정합니다.
- 테이블에서는 `font-variant-numeric: tabular-nums`를 씁니다.
- Jetendard 이탤릭은 한글을 직립으로 두므로 한글/라틴 혼용 줄의 기울기가 달라집니다. 코드 강조는 이탤릭이 아니라 색이나 웨이트로 합니다.

### Note on Font Substitutes

Pretendard나 Wanted Sans가 로드되지 않으면 스택이 Apple SD Gothic Neo와 Noto Sans KR로 떨어집니다. Jetendard가 없으면 JetBrains Mono와 시스템 한글 모노(`Noto Sans Mono CJK KR`, `D2Coding`)로 떨어집니다. 산스 프리셋 2 개의 메트릭이 달라 줄바꿈이 바뀌므로 두 프리셋에서 헤딩과 테이블, 버튼을 확인합니다.

## Layout

레이아웃은 1200px 콘텐츠 칼럼 안의 4px 기준 간격 스케일입니다. 어두운 캔버스에서는 빈 장식 띠가 아니라 표면 사다리가 공간감을 만듭니다.

### Spacing System

기본 단위는 4px입니다. 스케일은 토큰 14 개이며 스케일에 있는 값이면 토큰을 씁니다. 카드 내부는 24px = `{spacing.6}`입니다. 버튼 패딩은 리터럴 `8px 14px`입니다(14px는 스케일 밖이므로 리터럴로 둡니다). 입력 패딩은 `8px 12px`입니다. 섹션 간격은 `{spacing.24}` 96px입니다.

| 토큰         | 값    | 용도                                    |
| ------------ | ----- | --------------------------------------- |
| {spacing.0}  | 0px   | 리셋                                    |
| {spacing.1}  | 4px   | 촘촘한 인셋                             |
| {spacing.2}  | 8px   | 버튼 세로 패딩과 촘촘한 스택            |
| {spacing.3}  | 12px  | 입력 가로 패딩                          |
| {spacing.4}  | 16px  | 768px 미만 페이지 거터와 중첩 카드 패딩 |
| {spacing.5}  | 20px  | 중간 스택                               |
| {spacing.6}  | 24px  | 카드 내부와 768px부터의 페이지 거터     |
| {spacing.8}  | 32px  | 1280px부터의 페이지 거터                |
| {spacing.10} | 40px  | 큰 스택                                 |
| {spacing.12} | 48px  | 블록 간격                               |
| {spacing.16} | 64px  | 큰 블록 간격                            |
| {spacing.20} | 80px  | 아주 큰 블록 간격                       |
| {spacing.24} | 96px  | 섹션 간격                               |
| {spacing.32} | 128px | 최대 스택                               |

### Grid & Container

콘텐츠 칼럼의 최댓값은 1200px입니다. 가로 거터는 768px 미만에서 16px, 768px부터 24px, 1280px부터 32px입니다. 카드 그리드는 3-up → 2-up → 1-up으로 접힙니다. 1024px부터 3열, 768px부터 2열, 768px 미만은 1열입니다.

### Whitespace Philosophy

어두운 캔버스에서는 표면 사다리가 여백 역할을 합니다. 카드는 `{colors.canvas}` 위의 `{colors.surface-1}`에 놓이고 중첩 영역은 `{colors.surface-2}`로 한 단 내려갑니다. 섹션은 1px `{colors.hairline}` 규칙 또는 96px 간격(`{spacing.24}`)으로 나누며 장식 띠로는 나누지 않습니다.

## Elevation & Depth

깊이는 드롭 섀도가 아니라 표면 한 단과 테두리입니다. 다크 모드는 box-shadow를 쓰지 않습니다. 라이트 모드는 그림자 토큰을 정확히 하나 정의하며 떠 있는 오버레이에만 씁니다.

| 단계 | 처리                                                          | 용도                             |
| ---- | ------------------------------------------------------------- | -------------------------------- |
| 0    | 평면 `{colors.canvas}`                                        | 페이지 배경                      |
| 1    | `{colors.surface-1}` + 1px `{colors.hairline}`                | 카드                             |
| 2    | `{colors.surface-2}` + 1px `{colors.hairline}`                | 중첩 또는 인셋 영역              |
| 3    | `{colors.surface-3}` + `{colors.hairline-strong}`             | 드롭다운과 툴팁, 서브 내비게이션 |
| 4    | `outline: 2px solid {colors.focus-ring}; outline-offset: 2px` | 포커스                           |

라이트 모드는 `--shadow-raised: 0 1px 2px rgb(10 23 36 / 6%), 0 8px 24px rgb(10 23 36 / 8%)`를 정의합니다. 메뉴와 팝오버, 다이얼로그에만 쓰고 카드에는 쓰지 않습니다. 다크 모드는 `--shadow-raised`를 `none`으로 둡니다.

## Shapes

모서리는 고정된 8 단계 스케일을 따릅니다. 컴포넌트에 맞는 토큰을 고르고 중간 값은 만들지 않습니다.

### Border Radius Scale

| 토큰           | 값     | 용도                               |
| -------------- | ------ | ---------------------------------- |
| {rounded.none} | 0px    | 내비게이션 바와 탭, 테이블         |
| {rounded.xs}   | 4px    | 체크박스                           |
| {rounded.sm}   | 6px    | 툴팁과 선택된 사이드바 항목        |
| {rounded.md}   | 8px    | 버튼과 입력, 중첩 카드, 코드 블록  |
| {rounded.lg}   | 12px   | 카드와 제품 스크린샷 프레임        |
| {rounded.xl}   | 16px   | 모달                               |
| {rounded.xxl}  | 24px   | 큰 제품 스크린샷 프레임용으로 예약 |
| {rounded.full} | 9999px | 배지와 필                          |

사진과 일러스트 정책은 아직 없으며 Known Gaps에 둡니다. 제품 스크린샷은 `{rounded.lg}` 프레임을 씁니다. `{rounded.xxl}`은 큰 제품 스크린샷 프레임용으로 예약합니다.

## Components

레시피 30 개를 아래에 모았습니다. 각 줄은 현재 모드의 정지 상태 모습입니다. `{colors.X}`는 `colors.dark.X` 또는 `colors.light.X`로 해석됩니다. 레시피에 테두리가 없으면 테두리 칸을 생략합니다. 패딩 값은 프론트매터의 리터럴입니다(14px는 간격 스케일 밖이므로 리터럴로 둡니다).

### Buttons

다크 모드에서 `{colors.primary}`는 네이비 브랜드 시드가 아니라 밝은 뉴트럴 채움(#E7EEF6)입니다. 채운 동작이 `{colors.canvas}` 위에서 선명하게 남습니다. `{colors.hairline}`은 인터랙티브 컨트롤의 유일한 경계가 되지 않습니다. 아웃라인 버튼과 입력은 `{colors.hairline-strong}`을 씁니다.

- **button-primary** (기본 채움 동작). bg {colors.primary} · text {colors.on-primary} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-primary-hover** (호버된 프라이머리 채움). bg {colors.primary-hover} · text {colors.on-primary} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-primary-active** (눌린 프라이머리 채움). bg {colors.primary-active} · text {colors.on-primary} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-secondary** (아웃라인 보조 동작). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-ghost** (장식 없는 동작). bg transparent · text {colors.ink-muted} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-destructive** (삭제용 채움 동작). bg {colors.semantic-danger} · text {colors.on-danger} · {typography.button} · {rounded.md} · padding 8px 14px
- **button-disabled** (비활성 컨트롤). bg {colors.surface-2} · text {colors.ink-subtle} · border {colors.hairline-strong} · {typography.button} · {rounded.md} · padding 8px 14px

### Cards & Containers

카드는 드롭 섀도가 아니라 장식용 `{colors.hairline}` 가장자리 뒤의 표면 사다리에 놓입니다.

- **card** (기본 콘텐츠 컨테이너). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline} · {typography.body} · {rounded.lg} · padding 24px
- **card-nested** (카드 안의 인셋 영역). bg {colors.surface-2} · text {colors.ink} · border {colors.hairline} · {typography.body-sm} · {rounded.md} · padding 16px

### Inputs & Forms

인터랙티브 필드는 정지 상태에서 `{colors.hairline-strong}`을 씁니다. 포커스와 오류는 그 테두리를 바꾸며 box-shadow를 더하지 않습니다.

- **text-input** (한 줄 텍스트 필드). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · {typography.body} · {rounded.md} · padding 8px 12px
- **text-input-focused** (포커스된 텍스트 필드). bg {colors.surface-1} · text {colors.ink} · border {colors.focus-ring} · {typography.body} · {rounded.md} · padding 8px 12px
- **text-input-error** (잘못된 텍스트 필드). bg {colors.surface-1} · text {colors.ink} · border {colors.semantic-danger} · {typography.body} · {rounded.md} · padding 8px 12px
- **select** (셀렉트 트리거). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · {typography.body} · {rounded.md} · padding 8px 12px
- **checkbox-checked** (체크된 체크박스 채움). bg {colors.primary} · text {colors.on-primary} · {typography.caption} · {rounded.xs} · padding 0px

### Badges, Pills & Alerts

필은 솔리드 시맨틱 채움입니다. 뉴트럴 배지는 `{colors.surface-2}`에 남습니다. 정보 알림은 두 번째 색이 아니라 액센트로 틴트합니다.

- **badge** (뉴트럴 개수 또는 레이블). bg {colors.surface-2} · text {colors.ink-muted} · border {colors.hairline} · {typography.caption} · {rounded.full} · padding 2px 8px
- **badge-accent** (액센트 틴트 레이블). bg {colors.accent-subtle} · text {colors.accent} · {typography.caption} · {rounded.full} · padding 2px 8px
- **status-pill-success** (성공 상태). bg {colors.semantic-success} · text {colors.on-success} · {typography.caption} · {rounded.full} · padding 2px 8px
- **status-pill-warning** (경고 상태). bg {colors.semantic-warning} · text {colors.on-warning} · {typography.caption} · {rounded.full} · padding 2px 8px
- **status-pill-danger** (위험 상태). bg {colors.semantic-danger} · text {colors.on-danger} · {typography.caption} · {rounded.full} · padding 2px 8px
- **alert-info** (정보 배너). bg {colors.accent-subtle} · text {colors.ink} · border {colors.accent} · {typography.body-sm} · {rounded.md} · padding 12px 16px

### Navigation

상단 내비게이션은 캔버스 위에 놓입니다. 사이드바는 `{colors.surface-1}` 레일입니다. 선택된 항목은 액센트로 틴트하고 탭은 선택된 액센트 가장자리 외에는 테두리가 없습니다.

- **top-nav** (페이지 수준 헤더 바). bg {colors.canvas} · text {colors.ink} · border {colors.hairline} · {typography.body-sm} · {rounded.none} · padding 0px 24px
- **sidebar** (사이드 내비게이션 레일). bg {colors.surface-1} · text {colors.ink-muted} · border {colors.hairline} · {typography.body-sm} · {rounded.none} · padding 16px 12px
- **sidebar-item-selected** (선택된 내비게이션 항목). bg {colors.accent-subtle} · text {colors.accent} · {typography.body-sm} · {rounded.sm} · padding 6px 10px
- **tabs-item** (선택되지 않은 탭). bg transparent · text {colors.ink-subtle} · {typography.button} · {rounded.none} · padding 8px 12px
- **tabs-item-selected** (선택된 탭). bg transparent · text {colors.ink} · border {colors.accent} · {typography.button} · {rounded.none} · padding 8px 12px

### Tables

헤더 셀은 `{colors.surface-2}`로 한 단 올라갑니다. 본문 행은 `{colors.surface-1}`에 남습니다. 구분선은 `{colors.hairline}`입니다.

- **table-header** (테이블 헤더 셀). bg {colors.surface-2} · text {colors.ink-muted} · border {colors.hairline} · {typography.caption} · {rounded.none} · padding 8px 12px
- **table-row** (테이블 본문 행). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline} · {typography.body-sm} · {rounded.none} · padding 10px 12px

### Overlays

다이얼로그 표면은 `{colors.hairline-strong}` 가장자리를 둔 `{colors.surface-1}`입니다. 뒤 페이지는 `{colors.overlay}`로 어둡게 합니다. 툴팁은 한 단 위인 `{colors.surface-3}`에 놓입니다.

- **modal** (다이얼로그 표면). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · {typography.body} · {rounded.xl} · padding 24px
- **tooltip** (호버 힌트). bg {colors.surface-3} · text {colors.ink} · border {colors.hairline-strong} · {typography.caption} · {rounded.sm} · padding 4px 8px

### Code Blocks

코드는 표면 사다리가 아니라 전용 코드 토큰을 씁니다. 문법 색은 Colors → Code에 있습니다.

- **code-block** (펜스 코드 패널). bg {colors.code-bg} · text {colors.code-ink} · border {colors.code-border} · {typography.code} · {rounded.md} · padding 16px

## Interaction States

상태는 불투명도 트릭이나 추가 그림자가 아니라 토큰 교체입니다.

- **Hover.** 프라이머리 채움은 `{colors.primary}` → `{colors.primary-hover}`로 이동합니다(**button-primary-hover**). 고스트는 `{colors.surface-2}` 배경을 얻습니다. 링크는 `{colors.accent-hover}`를 씁니다.
- **Active.** 프라이머리 채움은 `{colors.primary-active}`로 이동합니다(**button-primary-active**). 누름은 스케일이나 인셋 그림자가 아니라 색 변경입니다.
- **Focus-visible.** 키보드 포커스는 아웃라인이며 box-shadow 대용을 쓰지 않습니다.

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

- **Disabled.** `opacity`로 흐리지 않습니다. **button-disabled**를 씁니다. 배경 `{colors.surface-2}`, 레이블 `{colors.ink-subtle}`, 테두리 `{colors.hairline-strong}`. 포인터 이벤트는 끕니다.
- **Selected.** 배경 `{colors.accent-subtle}`와 텍스트 `{colors.accent}`이며 **sidebar-item-selected**와 **badge-accent**와 같습니다.
- **Error.** 컨트롤 테두리는 `{colors.semantic-danger}`입니다(**text-input-error**). 필드 아래 캡션도 `{colors.semantic-danger}`이고 입력 값은 `{colors.ink}`로 남습니다.
- **Loading.** 레이블은 유지합니다. 옆에 `{colors.ink-subtle}` 스피너를 둡니다. 컨트롤을 스피너만 있는 상태로 바꾸지 않습니다.

## Motion

지속 시간은 120–200ms이고 이징은 `cubic-bezier(0.2, 0, 0, 1)`입니다. 색과 불투명도, transform만 애니메이션합니다. 레이아웃 속성(width, height, top, left, margin, padding)은 애니메이션하지 않습니다. `prefers-reduced-motion: reduce`는 트랜지션과 애니메이션을 제거합니다. 마케팅 패럴랙스와 자동 재생은 없습니다.

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

이 절은 DESIGN 토큰을 이 저장소 스택(Tailwind 4 `@theme inline`, shadcn `new-york` / zinc, `cssVariables: true`)에 대응합니다. 문서일 뿐이며 `src/styles/globals.css`나 컴포넌트 파일의 패치로 보지 않습니다.

### Mode switching

다크가 기본입니다. 기존 `src/styles/globals.css`의 `@custom-variant dark (&:is(.dark *))`와 맞추려고 `<html>`에 `class="dark"`를 둡니다. 라이트 모드는 같은 문서에서 그 클래스를 뺀 상태입니다. 이 저장소는 이미 `next-themes`에 의존하므로 `<ThemeProvider attribute="class" defaultTheme="dark">`로 연결합니다.

### Mapping to shadcn and Tailwind tokens

지금 `src/styles/globals.css`는 `:root` / `.dark`에 `--radius`와 `--sidebar*`만 정의하고 `@theme inline`은 `--color-sidebar*`를 노출합니다. shadcn 캔버스 토큰(`--background`, `--primary`와 표의 나머지)은 아직 없습니다. DESIGN 키를 그 변수에 다음과 같이 대응합니다.

| DESIGN 토큰     | shadcn CSS 변수             | Tailwind 유틸리티              |
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

기존 `src/components/button.tsx`는 zinc 클래스(`bg-zinc-900`, `bg-zinc-100`, `border-zinc-200`와 나머지 cva 변형)를 하드코딩하므로 이 토큰으로 옮길 대상입니다(이 문서가 바꾸지 않습니다).

참조 스니펫입니다. 이 문서가 적용하지 않습니다.

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

`data-font` 속성이 없으면 기본 산스 Pretendard입니다. `<html data-font="wanted">`는 `--font-sans`를 Wanted Sans로 바꿉니다. `--font-sans`와 `--font-mono`는 Typography 절에서 정의한 변수이며 세 번째 패밀리 변수를 만들지 않습니다.

## Do's and Don'ts

이 규칙은 새 화면이 토큰에서 벗어나지 않게 합니다. 레시피나 색, 레이아웃을 추가할 때 따릅니다.

### Do

- 액센트는 하나로 유지합니다. `{colors.accent}`는 링크와 포커스, 선택과 정보에만 쓰고 다른 곳에는 쓰지 않습니다.
- 카드는 드롭 섀도가 아니라 1px `{colors.hairline}` 가장자리 뒤의 `{colors.surface-1}`에 놓습니다.
- 카드에 그림자를 쌓는 대신 표면 사다리(`{colors.canvas}` → `{colors.surface-1}` → `{colors.surface-2}` → `{colors.surface-3}`)로 깊이를 한 단씩 올립니다.
- 한국어 산문에는 `word-break: keep-all`과 `overflow-wrap: anywhere`를 둡니다(`:lang(ko)` 규칙이며 코드에는 적용하지 않습니다).
- 모든 토큰을 다크와 라이트에 같은 키로 한 번에 정의합니다.
- Jetendard는 코드(`code`, `kbd`, `samp`, `pre`와 코드 토큰)에만 씁니다.
- 테이블에서는 `font-variant-numeric: tabular-nums`를 씁니다.
- 인터랙티브 히트 영역은 최소 44×44px로 잡고 모바일에서 버튼은 `min-height: 44px`도 둡니다.
- 변경 뒤에는 `bun scripts/verify-design-md.ts DESIGN.md DESIGN.ko.md`를 실행합니다.

### Don't

- 어떤 표면이나 컨트롤이나 포커스 링에도 gradient나 glow나 neon 처리를 넣지 않습니다.
- 채도가 높은 두 번째 색을 넣지 않습니다. 성공과 경고, 위험은 역할 색이며 두 번째 브랜드가 아닙니다.
- 중첩 카드 안에 카드를 다시 넣지 않습니다(카드-안-카드-안-카드 금지).
- 장식으로 아이콘을 색 타일에 넣지 않습니다.
- 10k+와 99.9%, 24/7 같은 마케팅 통계 행을 만들지 않습니다.
- `{colors.ink-tertiary}`를 텍스트로 쓰지 않습니다. 장식 아이콘 전용입니다.
- 버튼이나 입력, 다른 컨트롤의 유일한 경계로 `{colors.hairline}`을 쓰지 않습니다. 그런 컨트롤은 `{colors.hairline-strong}`을 씁니다.
- `opacity`를 낮춰 비활성을 표시하지 않습니다. **button-disabled** 레시피를 씁니다.
- 강조하려고 한글을 이탤릭으로 두지 않습니다. 웨이트나 색을 씁니다. Jetendard 이탤릭은 한글을 직립으로 둡니다.
- 다른 제품 DESIGN.md의 문장을 베끼지 않습니다. 구조만 취하고 문구는 취하지 않습니다.

## Responsive Behavior

레이아웃은 너비 스케일 5 단계에서 리플로우합니다. 터치 타깃은 모든 단계에서 44×44px를 유지합니다.

### Breakpoints

| 이름 | 최소 너비 |
| ---- | --------- |
| sm   | 640px     |
| md   | 768px     |
| lg   | 1024px    |
| xl   | 1280px    |
| 2xl  | 1536px    |

### Touch Targets

모든 인터랙티브 컨트롤은 최소 44×44px입니다. 768px 미만 뷰포트에서 버튼은 패딩만으로 더 낮아지더라도 `min-height: 44px`를 둡니다.

### Collapsing Strategy

- 사이드바는 1024px 미만에서 상단 드로어가 됩니다.
- 카드 그리드는 3-up → 2-up → 1-up으로 접힙니다. 1024px부터 3열, 768px부터 2열, 768px 미만은 1열입니다.
- 768px 미만 테이블은 가로 스크롤 컨테이너에 두고 셀을 정의 목록으로 다시 쌓지 않습니다.

## Iteration Guide

- 컴포넌트를 추가할 때는 프론트매터 `components` 맵 **and** 본문의 Table-C 형식(배경, 텍스트, 테두리(있으면), 타이포그래피, rounded, padding)에 함께 넣습니다.
- 색을 추가할 때는 같은 키 아래 다크 **and** 라이트 값을 넣고 대비 검사를 통과해야 합니다.
- 편집 뒤에는 `bun scripts/verify-design-md.ts DESIGN.md DESIGN.ko.md`를 실행합니다. 네트워크를 쓸 수 없을 때만 `--offline`을 쓰고 온라인 실행이 링크 게이트입니다.
- `DESIGN.md`와 `DESIGN.ko.md`를 함께 갱신합니다. 헤딩은 영어로 같은 순서를 유지하고 산문만 번역합니다.
- `DESIGN.md`와 `DESIGN.ko.md`의 YAML 프론트매터는 바이트 단위로 같게 유지합니다.

## Known Gaps

이 저장소는 작성 시점에 출시된 UI 증거가 없었으므로 이 파일의 토큰과 레시피는 모두 Proposed입니다.

- 아이콘 세트는 미정입니다(TODO).
- 일러스트와 사진 정책이 없습니다.
- 차트 팔레트가 없습니다.
- Jetendard는 `/fonts/jetendard/` 아래에 자체 호스팅해야 하며 CDN이 없습니다.
- Pretendard와 Wanted Sans의 메트릭이 달라 프리셋 사이 줄바꿈이 다릅니다. 두 프리셋에서 헤딩과 테이블, 버튼을 확인합니다.
- 기존 `src/components/button.tsx`는 zinc 클래스를 하드코딩하고 `src/styles/globals.css`는 아직 shadcn 캔버스 변수를 정의하지 않습니다. 마이그레이션은 후속이며 이 문서의 범위가 아닙니다.

## Evidence and Assumptions

이 파일의 접근성 주장은 WCAG 2.1 AA 대비율로 한정됩니다. 전체 WCAG 준수 주장이 아닙니다.

| 주장                  | 근거                                                                        | 신뢰도 |
| --------------------- | --------------------------------------------------------------------------- | ------ |
| 프라이머리 색 #0A1724 | 사용자 요청                                                                 | 높음   |
| 단정하고 정돈된 톤    | 사용자 요청과 awesome-design-md 예시(Vercel, HashiCorp, Linear)의 섹션 구조 | 중간   |
| 액센트와 뉴트럴 값    | 플래너 제안과 WCAG 대비 계산                                                | 중간   |
| 서체 URL              | 공식 README와 HTTP 200 확인                                                 | 높음   |
| Jetendard 구조        | README와 LICENSE(정적 페이스 16 개, SIL OFL 1.1, Reserved Font Name)        | 높음   |
| 타이포그래피 스케일   | 제안                                                                        | 중간   |
| 컴포넌트 레시피       | 제안                                                                        | 낮음   |
