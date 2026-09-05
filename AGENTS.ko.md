# 저장소 안내

## 프로젝트 맵

| 경로                     | 용도                                                                                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/`        | 배포하는 DESIGN.md 스타일 컴포넌트 53개와 각 스토리가 있습니다.                                                                                                   |
| `src/shadcn/`            | vendored shadcn/ui **Base UI (`base-nova`)** 원본이 있습니다. 참고용이며 export하지 않습니다. `shadcn add -o`를 실행한 뒤 `pnpm fix:ui`를 실행할 때만 변경합니다. |
| `src/styles/globals.css` | 디자인 토큰 레이어가 있습니다. `.dark`가 기본 dark 모드이고, `.light`가 light 모드이며, `[data-font]`가 폰트를 선택합니다.                                        |
| `scripts/check-slop.mjs` | token-only 색상과 금지한 utility pattern을 포함한 컴포넌트 class 제한을 검사합니다.                                                                               |

## 명령어

| 명령어                 | 용도                                                        |
| ---------------------- | ----------------------------------------------------------- |
| `pnpm dev`             | Storybook을 실행합니다.                                     |
| `pnpm check`           | slop gate, lint, type check, formatting check를 실행합니다. |
| `pnpm check:slop`      | slop gate를 실행합니다.                                     |
| `pnpm build`           | 배포할 `dist` 결과물을 빌드합니다.                          |
| `pnpm build-storybook` | static Storybook 결과물을 빌드합니다.                       |
| `pnpm fix:ui`          | 이 패키지에 맞게 생성된 shadcn import를 수정합니다.         |

## 작업 흐름

- `src/components/`에 컴포넌트를 추가하거나 변경하기 전에 `src/shadcn/<name>.tsx`와 `DESIGN.md`를 읽습니다. class는 반드시 token layer를 사용하고, `check:slop`를 포함하는 `pnpm check`를 실행합니다.
- vendored 원본은 `pnpm dlx shadcn@latest add <name> -y -o`로 추가하거나 갱신한 뒤 `pnpm fix:ui`를 실행합니다.
- 배포하는 컴포넌트 옆에 story를 두고 Storybook에서 사용자에게 보이는 동작을 확인합니다.

## 규칙

- `src/components`에서는 `dark:` variant, `shadow-*`, `ring-*`, `/NN` alpha, `transition-all`, opacity-disabled class를 사용하지 않습니다. `scripts/check-slop.mjs`가 이 제한을 검사합니다.
- 컴포넌트를 restyle할 때에는 API 변경이 명시된 경우가 아니면 public export surface를 유지합니다.
- 컴포넌트 구현 작업에서 `DESIGN.md`와 `DESIGN.ko.md`를 수정하지 않습니다.
