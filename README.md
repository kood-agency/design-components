# @kood/components

React + [Base UI](https://base-ui.com) 기반 kood 디자인 시스템의 shadcn/ui 스타일
컴포넌트 모음입니다. 컴포넌트에 필요한 CSS를 함께 배포하므로 소비자 앱의 Tailwind
설정 없이 바로 사용할 수 있습니다.

- [DESIGN.md](DESIGN.md) — 디자인 토큰, 컴포넌트 레시피, 접근성 기준
- [스토리북](https://storybook.kood.kr) — 컴포넌트별 스토리와 예제. HTTPS는 아직
  구성되지 않아(인증서 호스트 이름 불일치) 접속되지 않으며, 지금은
  http://storybook.kood.kr 로 접속합니다.

## 설치

```bash
pnpm add @kood/components
# 또는 bun add @kood/components
```

`react`와 `react-dom` 18/19가 peer dependency입니다 (`package.json`의
`peerDependencies`).

## 사용

스타일시트는 앱 진입점(루트 스타일시트)에서 **한 번** import합니다. 프레임워크의
전역 CSS 규칙(예: Next.js 루트 레이아웃)을 따르세요.

```tsx
import { Button } from "@kood/components";
import "@kood/components/globals.css";

export function Example() {
  return <Button variant="secondary">저장</Button>;
}
```

`globals.css`는 빌드 시 컴포넌트 소스에서 감지된 유틸리티와 디자인 토큰을 담은
precompiled CSS입니다. 컴포넌트 스타일에는 Tailwind 설정이 필요하지 않지만,
소비자 마크업의 임의 유틸리티 클래스는 포함되지 않습니다. `styles.css`는
1.0.0부터 있던 하위 경로를 유지하는 동일한 precompiled CSS 사본으로, 기존 앱의
import를 깨지 않게 합니다. 둘 중 하나만 import합니다.

전체 export 목록은 [`src/index.ts`](src/index.ts)를, 컴포넌트별 사용법과 스토리는
[스토리북](https://storybook.kood.kr)을 참고하세요.

클릭 가능한 컴포넌트에는 포인터 커서가 기본 적용됩니다. 비활성화할 때는
컴포넌트가 제공하는 `disabled` 속성을 사용하세요. 비활성 상태의 색과 상호작용
차단도 함께 적용되므로 별도의 상태 클래스를 추가할 필요가 없습니다.
`aria-disabled`는 상태를 알리는 속성일 뿐이므로 임의의 링크나 요소에 추가하는
것만으로 클릭과 키보드 동작까지 차단되지는 않습니다.

## 테마 커스텀 (오버라이딩)

스타일은 역할(role) 기반 CSS 변수로 이뤄집니다. 컴포넌트의 `bg-primary`,
`text-muted-foreground` 등은 이 변수의 `var(...)`를 참조하므로, 스타일시트 import
**다음**에 두는 자체 CSS에서 변수를 다시 정의해 테마를 바꿉니다.

```tsx
import "@kood/components/globals.css";
import "./my-theme.css"; // 변수 오버라이딩 — 반드시 globals.css 다음에
```

역할 묶음:

- **캔버스/본문** — `--background`, `--foreground`, `--foreground-muted`,
  `--muted-foreground`
- **표면/경계** — `--card`, `--popover`, `--secondary`, `--muted`, `--border`,
  `--input`, `--sidebar` 계열
- **동작/포커스** — `--primary`, `--accent`, `--ring` 계열
- **시맨틱/상태** — `--destructive`, `--success`, `--warning`, `--selection`,
  `--overlay` 계열
- **코드** — `--code`, `--code-foreground`, `--code-border`

전체 변수와 기본값은 빌드된 `dist/globals.css`의 `:root`, `.dark`, `.light`
블록에 있습니다. 같은 역할 묶음을 함께 덮어써야 하며, `--background` 하나만
바꿔도 관련 색이 자동으로 바뀌지는 않습니다.

다크는 기본값으로 `:root`와 `.dark`에, 라이트는 `.light`에 정의됩니다. `html`에
`.light`를 추가하면 라이트, `.dark`를 추가하거나 클래스를 빼면 다크가
적용됩니다.

```css
:root {
  --radius: 10px; /* 기준값: xs=.5x, sm=.75x, md=1x, lg=1.5x, xl=2x, 2xl=3x */
}

.dark {
  --background: #0d1117;
  --primary: #e7eef6;
  --ring: #7fa5de;
}

.light {
  --background: #f6f8fb;
  --primary: #0a1724;
  --ring: #315c9f;
}
```

`--radius`가 기준값(기본 `8px`)이고 `--radius-xs/sm/md/lg/xl/2xl`은 각각
`.5/.75/1/1.5/2/3`배로 파생됩니다. `--radius-md: 7px`처럼 이름을 지정하면 해당
radius만 덮어씁니다.

폰트 훅은 `--kood-font-sans`, `--kood-font-mono`이며 Tailwind
`--font-sans`/`--font-mono`가 이를 가리킵니다. 기본 sans는 Pretendard 계열이고,
`html`에 `data-font="wanted"`를 주면 Wanted Sans로 바뀝니다.

## 개발

```bash
pnpm install
pnpm dev              # Storybook (http://localhost:6006)
pnpm check            # slop gate + oxlint + tsc + prettier
pnpm build            # dist 빌드 (발행 형태 그대로)
pnpm build-storybook  # static Storybook 빌드
```

패키지 매니저는 **pnpm**입니다 (`packageManager: pnpm@10.34.1`). CI
(`.github/workflows/ci.yml`)와 발행 워크플로가 pnpm을 사용하고(Node 22 — CI와
동일), `pnpm-lock.yaml`만 추적합니다. Dependabot도 npm 생태계로 pnpm 의존성을
갱신합니다. `bun install`은 로컬에서 쓸 수 있지만 `bun.lock`은 `.gitignore`에
있어 커밋되지 않으며, 빌드 스크립트는 pnpm을 요구합니다.

## 컴포넌트 추가·업데이트

공개 컴포넌트는 `src/components/ui/`에 있고 DESIGN.md 스타일을 적용합니다.
`src/shadcn/`에는 참고용 Base UI(`base-nova`) 원본이 있으며 export하지
않습니다. `src/components/examples/`는 Storybook 전용 예제로 발행 대상이
아닙니다. vendored 원본은 `shadcn add`로 추가·갱신한 뒤 임포트 정리 스크립트를
실행합니다(`@/...`, `cn` 임포트를 상대경로로 바꿔 번들러 설정 없이 빌드되게
함).

```bash
pnpm dlx shadcn@latest add <이름> -y -o
pnpm fix:ui
```

## 발행 (자동)

- 기본 개발 브랜치는 `dev`, 배포 브랜치는 `main`입니다. `main`에 push되면
  `release.yml`이 `package.json`의 명시된 버전을 그대로 npm에
  발행합니다(`.github/workflows/release.yml`). 커밋 메시지로 버전을 계산하지
  않으므로 발행 전에 버전을 올려야 합니다.
- 이미 발행된 정확한 버전은 발행을 건너뛰고, 누락된 Git 태그나 GitHub 릴리스만
  복구합니다. 수동 실행(`workflow_dispatch`)은 같은 검사·빌드 뒤 **아직
  발행되지 않은 버전일 때만** `npm publish --dry-run`을 수행합니다.
- `main`에 push되면 `storybook-pages.yml`이 스토리북을
  [storybook.kood.kr](https://storybook.kood.kr)에 배포합니다(HTTPS 상태는
  상단 참고).

## 저장소

- 소스와 이슈: https://github.com/kood-agency/design-components
- npm: https://www.npmjs.com/package/@kood/components
- 디자인 문서: [DESIGN.md](DESIGN.md) · [DESIGN.ko.md](DESIGN.ko.md)

라이선스는 저장소에 명시되어 있지 않습니다.
