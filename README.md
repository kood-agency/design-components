# @kood/components

React + shadcn/ui + Base UI 기반 디자인 컴포넌트입니다. 설치하면 바로 import해서 씁니다.

```bash
pnpm add @kood/components
# 또는
bun add @kood/components
```

```tsx
import { Button, Calendar, Dialog } from "@kood/components";
import "@kood/components/globals.css";
```

또는 아래처럼 CSS 파일을 직접 import해도 됩니다(호환용).

```tsx
import "@kood/components/styles.css";
```

## 스타일 커스텀 (오버라이딩)

`@kood/components/globals.css`는 컴포넌트 유틸리티와 토큰을 함께 포함한 **precompiled CSS**입니다. 소비자 Tailwind 설정 없이 import하고, 자체 오버라이드 파일을 그 뒤에 둡니다. 호환 경로인 `@kood/components/styles.css`도 같은 precompiled CSS를 제공합니다.

```tsx
import "@kood/components/globals.css";
import "./my-theme.css"; // 변수 오버라이딩 — 반드시 globals.css 다음에

// 호환 경로가 필요한 기존 앱에서는 아래 import를 사용합니다.
// import "@kood/components/styles.css";
```

다크는 `:root`와 `.dark`, 라이트는 `.light`에 정의됩니다. 모드별 값을 바꿀 때는 아래처럼 같은 역할 묶음을 함께 덮어씁니다. `--background` 또는 `--accent` 하나만 바꿔도 관련된 모든 색이 자동으로 바뀌지는 않습니다.

```css
/* my-theme.css — globals.css 다음에 배치 */
:root {
  /* 기준 radius: xs=.5x, sm=.75x, md=1x, lg=1.5x, xl=2x, 2xl=3x */
  --radius: 10px;

  /* named override는 해당 이름만 바꿉니다. */
  --radius-md: 7px;

  --kood-font-sans: "Pretendard Variable", "Pretendard", sans-serif;
  --kood-font-mono: "Jetendard", "JetBrains Mono", monospace;
}

.dark {
  /* 캔버스 + 본문 */
  --background: #0d1117;
  --foreground: #f3f7fb;
  --foreground-muted: #b8c6d5;
  --muted-foreground: #899aad;

  /* 표면 단계 + 경계 */
  --card: #161b22;
  --popover: #272e37;
  --secondary: #21262d;
  --muted: #21262d;
  --border: #30363d;
  --input: #737d8c;
  --sidebar: #161b22;
  --sidebar-border: #30363d;

  /* 동작 + 포커스 역할 */
  --primary: #e7eef6;
  --primary-foreground: #0d1117;
  --accent: #172a45;
  --accent-foreground: #7fa5de;
  --ring: #7fa5de;
}

.light {
  --background: #f6f8fb;
  --foreground: #0a1724;
  --card: #ffffff;
  --secondary: #eff3f7;
  --muted: #eff3f7;
  --border: #d7e0e9;
  --input: #7b8ea1;
  --primary: #0a1724;
  --primary-foreground: #ffffff;
  --ring: #315c9f;
}
```

### 역할 묶음

- **캔버스/본문:** `--background`, `--foreground`, `--foreground-muted`, `--muted-foreground`
- **표면/경계:** `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--border`, `--input`, `--sidebar`, `--sidebar-foreground`, `--sidebar-border`
- **동작/포커스:** `--primary`, `--primary-foreground`, `--primary-hover`, `--primary-active`, `--accent`, `--accent-foreground`, `--accent-hover`, `--ring`
- **시맨틱/상태:** `--destructive`, `--destructive-foreground`, `--success`, `--success-foreground`, `--warning`, `--warning-foreground`, `--selection`, `--selection-foreground`, `--overlay`
- **코드:** `--code`, `--code-foreground`, `--code-border`

컴포넌트의 `bg-primary`, `text-muted-foreground` 같은 스타일은 이 역할 변수의 `var(...)`를 참조합니다. 전체 목록은 빌드된 `dist/globals.css`의 `:root`, `.dark`, `.light` 블록에서 확인할 수 있습니다.

## 개발

```bash
pnpm install        # 또는 bun install
pnpm dev            # Storybook
pnpm check          # 린트 + 타입 + 포맷 검사
pnpm build          # dist 빌드 (발행되는 형태 그대로)
```

## 컴포넌트 추가·업데이트

공개 컴포넌트는 DESIGN.md 스타일의 `src/components`에 있습니다. `src/shadcn`에는 참고용 Base UI (`base-nova`) 원본이 있으며 공개 export에는 포함하지 않습니다.
추가·업데이트 후에는 임포트 정리 스크립트를 한 번 돌립니다
(`@/...`, `cn` 패키지 임포트를 상대경로로 바꿔서 번들러 설정 없이 빌드되게 합니다).

```bash
pnpm dlx shadcn@latest add <이름> -y -o
pnpm fix:ui
```

## 발행 (자동)

`main`에 push되면 워크플로가 `package.json`의 명시된 버전을 그대로 npm에 발행합니다. 커밋 메시지로 버전을 계산하지 않으므로, 발행 전에 `package.json` 버전을 올려야 합니다. 이미 발행된 정확한 버전은 건너뛰며, 누락된 Git 태그 또는 GitHub 릴리스만 복구합니다.

수동 실행은 같은 검사와 빌드 뒤 `npm publish --dry-run`만 수행하며, npm 발행, 태그, GitHub 릴리스를 만들지 않습니다.

## 참고

- 공개 컴포넌트는 `src/components`에 있으며 DESIGN.md 스타일을 적용합니다. `src/shadcn`은 참고용 원본(Base UI 기반)이며 export하지 않습니다.
- `form`은 Base UI 레지스트리에 없어 제외했으며 `Field`를 사용합니다.
