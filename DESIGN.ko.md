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

Kood는 라이트를 기본으로 합니다. 페이지 배경은 기본 라이트 모드에서 `{colors.canvas}` #F3F5F8이고 짝이 되는 다크 값은 #101217입니다.

파랑 패밀리 하나가 모든 색 단서를 맡습니다. `{colors.primary}` #2861DB는 버튼과 체크된 컨트롤의 동작 채움이고 `{colors.accent}` #2258CC는 링크와 포커스, 선택, 정보에 쓰는 색입니다. 다른 곳에는 쓰지 않으며 두 번째 색상이나 글로우를 더하지 않습니다.

UI 서체는 기본이 Pretendard Variable입니다. Wanted Sans Variable은 선택형 산스이며 문서에 `[data-font="wanted"]`를 붙여 전환합니다. Jetendard는 코드 전용 서체입니다.

2.0의 내장 문구는 한국어를 기본으로 합니다. breadcrumb와 pagination, carousel, dialog, sheet, sidebar가 한국어 레이블을 기본 제공하고 각각 기존 레이블 prop을 영어 오버라이드 경로로 유지합니다. 따라서 1.x에서 이관하는 소비자는 명시적인 영어 레이블을 넘기거나 한국어 기본값을 채택합니다. 이관은 소비자 측 변경이며 이 라이브러리 계약과 별도로 추적합니다.

**Key Characteristics:**

- **Light default.** `{colors.canvas}` #F3F5F8이 기본 캔버스이며 다크 모드는 #101217와 짝을 이룹니다.
- **One blue family.** `{colors.primary}`가 동작을 채우고 `{colors.accent}`는 링크와 포커스, 선택, 정보에 씁니다.
- **Hairline cards.** 표면은 드롭 섀도가 아니라 1px `{colors.hairline}` 테두리 뒤의 3단 사다리에 놓입니다.
- **Shadow only where it lifts.** 다크 모드는 그림자를 쓰지 않습니다. 라이트 모드는 올린 그림자 하나를 쓰며 메뉴와 팝오버, 다이얼로그에만 적용합니다.
- **Korean and Latin type.** Pretendard Variable이 기본 산스이고 Wanted Sans Variable은 `[data-font="wanted"]` 프리셋이며 Jetendard는 코드 전용입니다. 한국어 본문은 line-height 1.5–1.67, 트래킹 0 또는 -0.01em, `word-break: keep-all`, `overflow-wrap: anywhere`를 유지합니다.
- **Token-for-token pairing.** 색과 서체, 반지름과 간격 키는 두 모드에 같은 이름으로 모두 존재합니다.
- **Two-language documentation.** 영어 문서는 `DESIGN.md`이고 이 파일 `DESIGN.ko.md`는 프론트매터와 헤딩 순서가 같은 한국어 쌍둥이입니다.
- **Korean by default.** 2.0의 내장 레이블(breadcrumb, pagination, carousel, dialog, sheet, sidebar)은 한국어를 기본으로 하며 기존 레이블 prop으로 영어를 덮어쓸 수 있습니다. 1.x에서 이관하는 소비자는 명시적인 영어 레이블을 넘기거나 한국어 기본값을 받아들입니다.

## Colors

팔레트는 라이트와 다크가 짝을 이루는 토큰 37 개이며 아래 목록은 라이트 / 다크 순서입니다. `#F3F5F8`이 라이트 캔버스이고 `#101217`이 다크 짝입니다. `{colors.primary}`는 두 모드 모두의 파랑 동작 채움이고(#2861DB / #3A6FE0), `{colors.accent}`는 링크와 포커스, 선택, 정보에 쓰는 더 깊은 파랑입니다(#2258CC / #82A9F6).

`{colors.ink-tertiary}`는 장식 전용이며 텍스트로 쓰지 않습니다. `{colors.hairline}`은 카드와 테이블, 내비게이션 같은 컨테이너에는 허용하지만 인터랙티브 컨트롤의 유일한 경계로는 쓰지 않습니다. 인터랙티브 컨트롤은 `{colors.hairline-strong}`을 씁니다.

대비 수치는 sRGB 상대 휘도 공식으로 계산하며 `scripts/verify-design-md.ts`가 다시 확인합니다. 텍스트 역할은 두 모드 모두 캔버스와 surface-1, surface-2 위에서 4.5:1 이상입니다(최솟값: 라이트 `{colors.semantic-danger}` on `{colors.surface-2}` 4.55). 비텍스트 역할은 캔버스와 surface-1 위에서 3.0:1 이상입니다(최솟값: 라이트 `{colors.hairline-strong}` on `{colors.canvas}` 3.20). on-토큰과 시맨틱 쌍은 4.5:1 이상입니다(최솟값: 다크 `{colors.on-primary}` on `{colors.primary}` 4.64).

### Brand & Accent

- **Primary** ({colors.primary}): 기본 버튼과 체크된 컨트롤의 파랑 동작 채움입니다. #2861DB / #3A6FE0
- **On Primary** ({colors.on-primary}): 프라이머리 채움 위의 텍스트와 아이콘입니다. #FFFFFF / #FFFFFF
- **Primary Hover** ({colors.primary-hover}): 호버된 프라이머리 채움입니다. #2154C4 / #3264D2
- **Primary Active** ({colors.primary-active}): 눌린 프라이머리 채움입니다. #1B47A8 / #2A58BD
- **Accent** ({colors.accent}): 링크와 선택 강조, 정보에 쓰는 강조 파랑입니다. #2258CC / #82A9F6
- **Accent Hover** ({colors.accent-hover}): 호버된 액센트입니다. #1B47A8 / #9DBBF8
- **Accent Subtle** ({colors.accent-subtle}): 선택된 행과 배지, 정보 알림용 액센트 틴트 배경입니다. #EAF1FD / #1A2840
- **Focus Ring** ({colors.focus-ring}): 1px 인셋 아웃라인과 포커스된 컨트롤의 테두리 색 교체입니다. #2861DB / #6F9BF3

### Surface

- **Canvas** ({colors.canvas}): 페이지 배경입니다. #F3F5F8 / #101217
- **Surface 1** ({colors.surface-1}): 카드와 컨트롤입니다. #FFFFFF / #191C22
- **Surface 2** ({colors.surface-2}): 중첩 또는 인셋 영역과 비활성 배경입니다. #EDF0F4 / #23272E
- **Surface 3** ({colors.surface-3}): 드롭다운과 서브 내비게이션입니다. #FFFFFF / #2A2F37
- **Hairline** ({colors.hairline}): 장식용 1px 구분선입니다. 카드와 테이블, 내비게이션 컨테이너에는 허용하고 버튼이나 입력의 유일한 경계로는 쓰지 않습니다. #E3E7EC / #2D323A
- **Hairline Strong** ({colors.hairline-strong}): 인터랙티브 컨트롤 테두리(비텍스트 3:1)입니다. #808A97 / #7A8390
- **Overlay** ({colors.overlay}): 모달 스크린이며 8자리 hex에 알파 50% / 70%입니다. #10141B80 / #05070AB3
- **Selection Background** ({colors.selection-bg}): `::selection` 배경입니다. #D5E3FB / #24457A
- **Selection Ink** ({colors.selection-ink}): `::selection` 텍스트입니다. #171C24 / #F2F4F7

shadcn 레이어는 DESIGN 토큰 37 개와 별도로 뉴트럴을 하나 더 가집니다. `{colors.surface-2}`는 `--secondary`로 #EDF0F4 / #23272E이고 `--muted`는 더 깊은 별도 채움으로 #E6EAEF / #2C3139입니다. 둘은 중첩 표면 역할을 공유하지만 같은 값이 아니며 `--muted`를 표면 사다리의 추가 단계로 취급하지 않습니다.

### Text

- **Ink** ({colors.ink}): 본문과 헤딩입니다. #171C24 / #F2F4F7
- **Ink Muted** ({colors.ink-muted}): 보조 텍스트입니다. #454F5C / #B9C0CA
- **Ink Subtle** ({colors.ink-subtle}): 캡션과 플레이스홀더, 비활성 레이블입니다. #5E6875 / #929BA7
- **Ink Tertiary** ({colors.ink-tertiary}): 장식 아이콘 전용이며 텍스트로 쓰지 않습니다. #748395 / #64778A

### Semantic

- **Success** ({colors.semantic-success}): 성공 채움입니다. #12774A / #5DC78A
- **Warning** ({colors.semantic-warning}): 경고 채움입니다. #8F5600 / #E5AF4E
- **Danger** ({colors.semantic-danger}): 위험 채움입니다. #CC2F3C / #F0858B
- **Info** ({colors.semantic-info}): 정보 채움이며 액센트를 재사용합니다. #2258CC / #82A9F6
- **On Success** ({colors.on-success}): 솔리드 성공 채움 위의 텍스트입니다. #FFFFFF / #101217
- **On Warning** ({colors.on-warning}): 솔리드 경고 채움 위의 텍스트입니다. #FFFFFF / #101217
- **On Danger** ({colors.on-danger}): 솔리드 위험 채움 위의 텍스트입니다. #FFFFFF / #101217
- **On Info** ({colors.on-info}): 솔리드 정보 채움 위의 텍스트입니다. #FFFFFF / #101217

### Code

- **Code Background** ({colors.code-bg}): 코드 블록 배경입니다. #F3F5F8 / #0B0D11
- **Code Border** ({colors.code-border}): 코드 블록 테두리입니다. #E3E7EC / #2D323A
- **Code Ink** ({colors.code-ink}): 기본 코드 텍스트입니다. #171C24 / #E6EAF0
- **Code Comment** ({colors.code-comment}): 주석입니다. #5E6875 / #929BA7
- **Code Keyword** ({colors.code-keyword}): 키워드이며 액센트를 재사용합니다. #2258CC / #82A9F6
- **Code String** ({colors.code-string}): 문자열이며 성공을 재사용합니다. #12774A / #5DC78A
- **Code Number** ({colors.code-number}): 숫자이며 경고를 재사용합니다. #8F5600 / #E5AF4E
- **Code Error** ({colors.code-error}): 오류이며 위험을 재사용합니다. #CC2F3C / #F0858B

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

기본 단위는 4px입니다. 스케일은 토큰 14 개이며 스케일에 있는 값이면 토큰을 씁니다. 카드 내부는 24px = `{spacing.6}`입니다. 기본 버튼은 border-box 40px 행, 14px / 20px 타입, `9px 14px` 패딩을 씁니다. 기본 입력과 셀렉트는 border-box 40px 행, 16px / 24px 타입, `7px 12px` 패딩을 씁니다. 768px 미만에서는 각 최소 행 높이가 44px입니다. 섹션 간격은 `{spacing.24}` 96px입니다.

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

| 단계 | 처리                                                                    | 용도                             |
| ---- | ----------------------------------------------------------------------- | -------------------------------- |
| 0    | 평면 `{colors.canvas}`                                                  | 페이지 배경                      |
| 1    | `{colors.surface-1}` + 1px `{colors.hairline}`                          | 카드                             |
| 2    | `{colors.surface-2}` + 1px `{colors.hairline}`                          | 중첩 또는 인셋 영역              |
| 3    | `{colors.surface-3}` + `{colors.hairline-strong}`                       | 드롭다운과 툴팁, 서브 내비게이션 |
| 4    | `1px inset {colors.focus-ring}` 아웃라인 + `{colors.focus-ring}` 테두리 | 포커스                           |

라이트 모드는 `--shadow-raised: 0 1px 2px rgb(10 23 36 / 6%), 0 8px 24px rgb(10 23 36 / 8%)`를 정의합니다. 메뉴와 팝오버, 다이얼로그에만 쓰고 카드에는 쓰지 않습니다. 다크 모드는 `--shadow-raised`를 `none`으로 둡니다.

## Shapes

모서리는 문서의 `--radius` 기준값(기본 10px)에서 계산합니다. 컴포넌트에 맞는 토큰을 고르고 중간 값은 만들지 않습니다.

### Border Radius Scale

| 토큰           | 값     | 용도                               |
| -------------- | ------ | ---------------------------------- |
| {rounded.none} | 0px    | 내비게이션 바와 탭, 테이블         |
| {rounded.xs}   | 5px    | 체크박스                           |
| {rounded.sm}   | 7.5px  | 툴팁과 선택된 사이드바 항목        |
| {rounded.md}   | 10px   | 버튼과 입력, 중첩 카드, 코드 블록  |
| {rounded.lg}   | 15px   | 카드와 다이얼로그, 스크린샷 프레임 |
| {rounded.xl}   | 20px   | 큰 오버레이                        |
| {rounded.xxl}  | 30px   | 큰 제품 스크린샷 프레임용 예약     |
| {rounded.full} | 9999px | 배지와 필                          |

CSS 계약은 `--radius-xs: calc(var(--radius) * .5)`, `--radius-sm: calc(var(--radius) * .75)`, `--radius-md: var(--radius)`, `--radius-lg: calc(var(--radius) * 1.5)`, `--radius-xl: calc(var(--radius) * 2)`, `--radius-2xl: calc(var(--radius) * 3)`입니다. `none`과 `full`은 별개입니다. 루트 `--radius` 오버라이드는 이름 있는 스케일을 바꾸며, 뒤의 `--radius-md: 7px` 같은 이름 오버라이드는 그 이름만 바꿉니다.

사진과 일러스트 정책은 아직 없으며 Known Gaps에 둡니다. 제품 스크린샷은 `{rounded.lg}` 프레임을 씁니다. `{rounded.xxl}`은 큰 제품 스크린샷 프레임용으로 예약합니다.

## Components

레시피 30 개를 아래에 모았습니다. 각 줄은 현재 모드의 정지 상태 모습입니다. `{colors.X}`는 `colors.dark.X` 또는 `colors.light.X`로 해석됩니다. 레시피에 테두리가 없으면 테두리 칸을 생략합니다. 패딩 값은 프론트매터의 리터럴입니다(14px는 간격 스케일 밖이므로 리터럴로 둡니다).

이 레시피 위에 2.0 정책 네 가지가 올라갑니다. 반지름은 10px `--radius` 기준에서 나옵니다. 채운 동작은 파랑 `{colors.primary}`를 쓰고 아웃라인 동작은 회색 `{colors.surface-2}` 호버 채움을 얻으며 기본 버튼은 최소 44px 행을 유지합니다(`lg`는 `min-h-11`, `icon-lg`는 `size-11`). 선택과 하이라이트는 테두리가 아니라 토큰 채움입니다. 활성 필 탭이나 페이지네이션 항목은 `{colors.canvas}` 위 `{colors.ink}`로 반전되고, 눌린 토글은 `{colors.surface-2}`에 `{colors.hairline-strong}` 테두리, 사이드바 활성 항목은 액센트 틴트에 3px `{colors.primary}` 막대와 `font-semibold`, 하이라이트된 메뉴나 목록 항목은 `{colors.surface-2}`에 2px `{colors.focus-ring}` 막대를 씁니다. 내장 레이블은 한국어가 기본이며 레이블 prop이 오버라이드 경로로 남습니다.

### Buttons

두 모드 모두에서 `{colors.primary}`는 파랑 동작 채움입니다(#2861DB / #3A6FE0). `{colors.hairline}`은 인터랙티브 컨트롤의 유일한 경계가 되지 않습니다. 아웃라인 버튼과 입력은 `{colors.hairline-strong}`을 씁니다. 기본 버튼은 border-box 40px 행, 14px / 20px 타입, `9px 14px` 패딩을 쓰며 768px 미만에서는 최소 높이가 44px이고 큰 크기는 `min-h-11` / `size-11`로 올립니다.

- **button-primary** (기본 채움 동작). bg {colors.primary} · text {colors.on-primary} · 14px/20px 컨트롤 타입 · {rounded.md} · padding 9px 14px
- **button-primary-hover** (호버된 프라이머리 채움). bg {colors.primary-hover} · text {colors.on-primary} · 14px/20px 컨트롤 타입 · {rounded.md} · padding 9px 14px
- **button-primary-active** (눌린 프라이머리 채움). bg {colors.primary-active} · text {colors.on-primary} · 14px/20px 컨트롤 타입 · {rounded.md} · padding 9px 14px
- **button-secondary** (아웃라인 보조 동작). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · 14px/20px 컨트롤 타입 · {rounded.md} · padding 9px 14px
- **button-ghost** (장식 없는 동작). bg transparent · text {colors.ink-muted} · 14px/20px 컨트롤 타입 · {rounded.md} · padding 9px 14px
- **button-destructive** (삭제용 채움 동작). bg {colors.semantic-danger} · text {colors.on-danger} · 14px/20px 컨트롤 타입 · {rounded.md} · padding 9px 14px
- **button-disabled** (비활성 컨트롤). bg {colors.surface-2} · text {colors.ink-subtle} · border {colors.hairline-strong} · 14px/20px 컨트롤 타입 · {rounded.md} · padding 9px 14px

### Cards & Containers

카드는 드롭 섀도가 아니라 장식용 `{colors.hairline}` 가장자리 뒤의 표면 사다리에 놓입니다.

- **card** (기본 콘텐츠 컨테이너). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline} · {typography.body} · {rounded.lg} · padding 24px
- **card-nested** (카드 안의 인셋 영역). bg {colors.surface-2} · text {colors.ink} · border {colors.hairline} · {typography.body-sm} · {rounded.md} · padding 16px

### Inputs & Forms

인터랙티브 필드는 정지 상태에서 `{colors.hairline-strong}`을 씁니다. 포커스는 테두리 색을 `{colors.focus-ring}`으로 바꾸고 1px 인셋 아웃라인을 더합니다. 오류는 테두리를 `{colors.semantic-danger}`로 바꾸고 포커스 시 `{colors.ink}` 색 인셋 아웃라인을 유지합니다. 어느 쪽도 box-shadow를 더하지 않습니다. 기본 입력과 셀렉트는 border-box 40px 행, 16px / 24px 타입, `7px 12px` 패딩을 쓰며 768px 미만에서는 최소 높이가 44px입니다.

- **text-input** (한 줄 텍스트 필드). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · 16px/24px 컨트롤 타입 · {rounded.md} · padding 7px 12px
- **text-input-focused** (포커스된 텍스트 필드). bg {colors.surface-1} · text {colors.ink} · border {colors.focus-ring} · 16px/24px 컨트롤 타입 · {rounded.md} · padding 7px 12px
- **text-input-error** (잘못된 텍스트 필드). bg {colors.surface-1} · text {colors.ink} · border {colors.semantic-danger} · 16px/24px 컨트롤 타입 · {rounded.md} · padding 7px 12px
- **select** (셀렉트 트리거). bg {colors.surface-1} · text {colors.ink} · border {colors.hairline-strong} · 16px/24px 컨트롤 타입 · {rounded.md} · padding 7px 12px
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
- **Focus-visible.** 키보드 포커스는 1px 인셋 아웃라인과 테두리 색 교체이며 box-shadow 대용을 쓰지 않습니다. 전역 규칙은 기본 폴백일 뿐이고 kood 컴포넌트는 자체 포커스 유틸리티를 선언합니다.

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

- **Focus model (B-2).** 포커스된 컨트롤은 정지 기하를 유지하고 색만 바꿉니다. 1px 인셋 아웃라인이 `outline-offset: -1px`로 나타나고 테두리가 `{colors.focus-ring}`으로 이동합니다. 컴포넌트별 규칙은 다음과 같습니다.
  - 필드와 테두리 컨트롤(Input, Textarea, Select trigger, Combobox input, InputOTP, Calendar dropdown, InputGroup)은 `focus-visible:border-ring focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring`을 씁니다. 잘못된 컨트롤은 `aria-invalid:focus-visible:outline-foreground`를 더하며 테두리는 `{colors.semantic-danger}`를 유지합니다.
  - 채운 동작(Button default와 destructive)은 인셋 아웃라인을 `{colors.on-primary}` / `{colors.on-danger}`로 씁니다. 링 색이 채움 위에 놓이지 않기 때문입니다.
  - Checkbox, RadioGroup, Switch, Slider thumb은 `focus-visible:border-foreground focus-visible:outline-hidden`을 쓰고 잘못된 체크박스는 `aria-invalid:focus-visible:border-foreground`를 더합니다.
  - Tabs와 NavigationMenuLink는 같은 인셋 링 상자를 씁니다. 필 탭의 활성 아웃라인은 채움 위 `{colors.canvas}`이고 NavigationMenuLink는 예전 자손 `focus:outline-none` 규칙을 제거합니다.
  - 메뉴와 Select, Combobox, Command 항목은 `focus-visible:outline-hidden`에 2px 인셋 `data-highlighted` 막대를 `{colors.focus-ring}`으로 쓰고 destructive 항목은 `{colors.on-danger}`를 씁니다. forced-colors에서는 막대를 1px 아웃라인으로 바꿉니다.
  - 접두 없는 `outline-hidden`은 금지하고 `outline-2`는 같은 클래스 목록에 `-outline-offset-2`가 있을 때만 허용합니다.
- **Focus combinations.** 추가 명시도는 뒤의 동률 규칙이 포커스를 가릴 때만 필요합니다. 필드와 체크박스의 `aria-invalid`, 그리고 활성 필 탭 아웃라인입니다. 사이드바 활성 항목과 `data-checked`, `data-active`는 이미 `:where()` 선택자이므로 결합이 필요 없습니다.
- **Disabled.** `opacity`로 흐리지 않습니다. **button-disabled**를 씁니다. 배경 `{colors.surface-2}`, 레이블 `{colors.ink-subtle}`, 테두리 `{colors.hairline-strong}`. 포인터 이벤트는 끕니다.
- **Selected.** 배경 `{colors.accent-subtle}`와 텍스트 `{colors.accent}`이며 **sidebar-item-selected**와 **badge-accent**와 같습니다. 활성 필 탭이나 페이지네이션 항목은 대신 반전합니다. `{colors.ink}` 배경에 `{colors.canvas}` 텍스트입니다.
- **Highlighted.** 메뉴와 Select, Combobox, Command 항목은 현재 하이라이트를 `{colors.surface-2}` 채움과 2px 인셋 `{colors.focus-ring}` 막대(**`data-highlighted`**)로 표시하고 테두리는 쓰지 않습니다.
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

라이트가 기본입니다. `:root`와 `.light`가 라이트 계약을 정의하므로 라이트 모드에는 클래스가 필요 없습니다. 다크 모드는 명시적입니다. `<html>`에 `class="dark"`를 두며 이는 `@custom-variant dark (&:is(.dark *))`와도 맞습니다. 서버 렌더링은 클래스를 명시적으로 지정해야 하며 시스템 `prefers-color-scheme`은 따르지 않습니다. 이 저장소는 이미 `next-themes`에 의존하므로 그 class 속성을 쓰고 기본에는 `class="light"`를 렌더링합니다. 예전 다크 기본값을 기대하고 `:root`를 덮어쓴 소비자는 그 오버라이드를 `.light`로 옮기거나 `class="dark"`를 두고 `.dark`를 덮어씁니다.

### Mapping to shadcn and Tailwind tokens

`src/styles/globals.css`는 다크 `:root` / `.dark`와 명시적 `.light`에 전체 shadcn 토큰 표를 정의하고 `@theme inline`은 대응 Tailwind 색을 노출합니다. 이름 있는 반지름은 `--radius`에서 계산하므로 문서 루트의 base 및 named-radius 오버라이드가 계속 작동합니다. DESIGN 키는 다음과 같이 대응합니다.

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

컴포넌트는 위의 시맨틱 토큰 클래스를 소비합니다. 하드코딩한 팔레트 클래스로 바꾸지 않습니다. `{colors.surface-2}`는 값이 다른 shadcn 변수 두 개로 들어갑니다. `--secondary`는 #EDF0F4 / #23272E이고 `--muted`는 #E6EAEF / #2C3139입니다. 한쪽을 덮어써도 다른 쪽은 움직이지 않습니다.

**글래스 재질 계약.** `glass`와 `glass-strong`은 선택해서 쓰는 뉴트럴 표면 대안이며 기존 기본값은 모두 현재의 솔리드 출력을 유지합니다. 공유 CSS 예외는 공개 커스텀 프로퍼티 일곱 개로 한정합니다. `--glass-background`, `--glass-strong-background`, `--glass-hover`, `--glass-active`, `--glass-solid`, `--glass-strong-solid`, `--glass-blur`입니다. `kood-glass`와 `kood-glass-strong`은 재질의 채움과 필터만 맡습니다. 일반 재질은 절제된 12px blur를 쓰고 strong은 blur를 키우지 않고 불투명도만 높입니다.

레시피는 먼저 표면이 맡은 불투명 솔리드 대체 표시를 제공합니다. 표준 또는 접두사 필터를 지원할 때만 반투명 채움과 같은 `backdrop-filter` 선언을 켭니다. disabled와 truthy `data-disabled` 표면, `forced-colors`, reduced-transparency 모드는 모든 상태에서 불투명하게 유지하고 필터를 끕니다. 레시피는 전경색과 테두리, 포커스, 시맨틱 상태, 그림자의 책임을 바꾸지 않으며 컴포넌트에서 임의 blur, alpha, shadow를 허용하지 않습니다.

뉴트럴 API는 실제 표면에서 `variant="glass"` 또는 `variant="glass-strong"`을 쓰는 방식입니다. Button, Badge, Toggle, ToggleGroup과 ToggleGroupItem, Alert, Item은 기존 variant에 추가하며 시맨틱 variant는 솔리드 대안으로 남습니다. Input, Textarea, InputGroup, SelectTrigger와 SelectContent, ComboboxInput, ComboboxChips와 ComboboxContent, Card와 CardNested, Calendar, ButtonGroupText, Menubar, PopoverContent, HoverCardContent, TooltipContent, DropdownMenuContent와 DropdownMenuSubContent, ContextMenuContent와 ContextMenuSubContent, DialogContent, AlertDialogContent, SheetContent, DrawerContent, Command, CommandDialog는 기존 variant에 레이아웃 의미가 없을 때 `variant?: "default" | "glass" | "glass-strong"`을 씁니다. variant 값은 native DOM으로 전달하지 않고 클래스와 `data-variant`를 선택하며 wrapper alias는 기반 prop 타입을 상속합니다.

Sidebar, NavigationMenu, Toaster는 기존 레이아웃 또는 시맨틱 API를 유지하면서 `appearance?: "default" | "glass" | "glass-strong"`을 추가합니다. Sidebar는 desktop과 mobile 표면으로 appearance를 전달합니다. NavigationMenu는 appearance를 내부 popup으로 전달하고 글래스 viewport 콘텐츠는 투명하게 유지하며 독립 렌더링 콘텐츠는 이중 필터 없이 opt-in할 수 있습니다. Toaster는 로컬에서 뉴트럴 재질을 적용하고 시맨틱 toast type은 기존 솔리드 채움을 유지하며 소비자의 `toastOptions` override가 계속 우선합니다. CommandDialog는 variant를 DialogContent로 넘기고 글래스 dialog 안의 Command는 투명하게 유지합니다. ToggleGroup은 item에만 필터를 적용하고 wrapper에는 적용하지 않습니다.

출시 매핑은 다음과 같습니다.

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

나머지 텍스트와 호버/활성 채움, 파랑 강조, 선택, 시맨틱 채움은 프론트매터 색상 표를 따릅니다. `--secondary`와 `--muted`는 위의 서로 다른 값을 유지하며 그 외 표면은 모두 DESIGN 키 하나로 대응합니다. `--radius`는 두 모드 모두 10px이고 `--kood-shadow-raised`가 유일하게 모드별로 다른 그림자 값입니다.

**소비자 CSS 오버라이드 계약.** `globals.css`(`@kood/components/globals.css`로 배포되며 `./styles.css`는 동일한 사본)는 반지름과 폰트, 경계 기본값을 비레이어 `:root` 블록에 선언합니다. 따라서 소비자가 kood 뒤에 Tailwind를 import해도 `--radius-md: var(--radius)`, `--radius-lg: calc(var(--radius) * 1.5)`, `--font-sans: var(--kood-font-sans)`, `--font-mono: var(--kood-font-mono)`, `border-color: var(--border)`가 kood에서 해석됩니다. 커스터마이즈는 소비자가 import 뒤에 같은 블록에서 덮어씁니다. 라이트는 `:root`나 `.light`, 다크는 `.dark`입니다. `--radius`를 설정하면 `--radius-xs`부터 `--radius-2xl`까지 다시 계산되고 `--radius-md: 7px` 같은 이름 지정 반지름은 그 이름만 바뀝니다. 산스와 모노는 Tailwind의 `--font-sans`를 재정의하지 않고 공개 훅 `--kood-font-sans` / `--kood-font-mono`로 리브랜딩합니다. 소비자 자신의 비레이어 `:root` / `.dark` / `.light` 블록은 kood 선언을 여전히 이깁니다.

### Font preset switching

`data-font` 속성이 없으면 기본 산스 Pretendard입니다. `<html data-font="wanted">`는 `--kood-font-sans`를 Wanted Sans로 바꿉니다. `--kood-font-sans`와 `--kood-font-mono`는 패키지 훅이고 Tailwind의 `--font-sans`와 `--font-mono`가 이를 alias합니다. 세 번째 패밀리 변수는 만들지 않습니다.

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
- 768px 이상에서는 기본 Button, Input, Select 행을 40px로 쓰고 768px 미만에서는 각각 `min-height: 44px`를 둡니다.
- 변경 뒤에는 `bun scripts/verify-design-md.ts --offline DESIGN.md DESIGN.ko.md`를 실행합니다.
- 글래스를 바꿀 때는 일곱 프로퍼티 재질 계약 안에 두고 뉴트럴 두 variant와 불투명 대체 표시, 바뀌지 않은 기본 출력을 확인합니다.
- 키보드 포커스는 B-2 모델로 유지합니다. `outline-offset: -1px`의 1px 인셋 `{colors.focus-ring}` 아웃라인과 테두리 색 교체를 쓰고 Interaction States의 `aria-invalid`와 필 탭 활성 결합을 따릅니다.

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
- 글래스에 컴포넌트 수준 blur, alpha 유틸리티, shadow를 더하지 않습니다. 문서화한 필터와 반투명 채움은 공유 재질 레시피만 사용합니다.
- 접두 없는 `outline-hidden`이나 짝이 되는 `-outline-offset-2` 없는 `outline-2` 링을 배포하지 않고 예전 2px 오프셋 포커스 아웃라인을 되살리지 않습니다.

## Responsive Behavior

레이아웃은 너비 스케일 5 단계에서 리플로우합니다. 기본 Button, Input, Select 행은 768px 이상에서 40px이고 768px 미만에서 최소 44px입니다.

### Breakpoints

| 이름 | 최소 너비 |
| ---- | --------- |
| sm   | 640px     |
| md   | 768px     |
| lg   | 1024px    |
| xl   | 1280px    |
| 2xl  | 1536px    |

### Touch Targets

768px 이상에서는 기본 Button, Input, Select 행이 40px입니다. 768px 미만에서는 패딩만으로 더 낮아지더라도 각각 `min-height: 44px`를 둡니다.

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

이 문서는 출시된 토큰과 지오메트리 계약을 기록하며 각 primitive와 화면의 브라우저 증거는 해당 구현 작업에서 추적합니다.

- 아이콘 세트는 미정입니다(TODO).
- 일러스트와 사진 정책이 없습니다.
- 차트 팔레트가 없습니다.
- Jetendard는 `/fonts/jetendard/` 아래에 자체 호스팅해야 하며 CDN이 없습니다.
- Pretendard와 Wanted Sans의 메트릭이 달라 프리셋 사이 줄바꿈이 다릅니다. 두 프리셋에서 헤딩과 테이블, 버튼을 확인합니다.
- 한국어 내장 레이블 기본값은 2.0(B5)에 들어갑니다. 1.x 소비자는 이관 전까지 영어 레이블을 유지합니다.
- 2.0의 무테 카드와 배지, 알림, 빈 상태, 페이지네이션 처리와 타이포그래피는 B3 게이트에서 정해집니다. 위 프론트매터 레시피는 현재의 정지 기하를 기록합니다.
- 소비자 저장소 이관은 별도의 이후 단계이며 이 문서의 범위가 아닙니다.
- 컴포넌트 수준의 브라우저 커버리지는 primitive 구현 및 통합 작업의 책임입니다.

## Evidence and Assumptions

이 파일의 접근성 주장은 WCAG 2.1 AA 대비율로 한정됩니다. 전체 WCAG 준수 주장이 아닙니다.

| 주장                  | 근거                                                                        | 신뢰도 |
| --------------------- | --------------------------------------------------------------------------- | ------ |
| 라이트 캔버스 #F3F5F8 | 승인된 라이트 우선 계약                                                     | 높음   |
| 단정하고 정돈된 톤    | 사용자 요청과 awesome-design-md 예시(Vercel, HashiCorp, Linear)의 섹션 구조 | 중간   |
| 액센트와 뉴트럴 값    | 플래너 제안과 WCAG 대비 계산                                                | 중간   |
| 서체 URL              | 공식 README와 HTTP 200 확인                                                 | 높음   |
| Jetendard 구조        | README와 LICENSE(정적 페이스 16 개, SIL OFL 1.1, Reserved Font Name)        | 높음   |
| 타이포그래피 스케일   | 제안                                                                        | 중간   |
| 컴포넌트 레시피       | 제안                                                                        | 낮음   |
