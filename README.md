# @kood/components

React + shadcn/ui + Base UI 기반 디자인 컴포넌트입니다. 설치하면 바로 import해서 씁니다.

```bash
pnpm add @kood/components
# 또는
bun add @kood/components
```

```tsx
import { Button, Calendar, Dialog } from "@kood/components";
import "@kood/components/styles.css";
```

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

`main`에 push되면 릴리스 봇이 커밋 메시지 규칙(conventional commits)으로 버전을 올리고 npm에 자동 발행합니다.
`feat:`는 minor, `fix:`는 patch, `BREAKING CHANGE`는 major가 됩니다.

로컬에서 손으로 올릴 때만 아래 명령을 씁니다 (검사와 빌드는 워크플로에서 이미 돕니다).

```bash
pnpm publish --access public
```

## 참고

- 공개 컴포넌트는 `src/components`에 있으며 DESIGN.md 스타일을 적용합니다. `src/shadcn`은 참고용 원본(Base UI 기반)이며 export하지 않습니다.
- `form`은 Base UI 레지스트리에 없어 제외했으며 `Field`를 사용합니다.
