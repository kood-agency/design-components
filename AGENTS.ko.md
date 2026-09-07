# 저장소 안내

## 프로젝트 맵

| 경로                     | 용도                                                                                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/`     | 배포하는 DESIGN.md 스타일 컴포넌트 53개와 각 스토리가 있습니다. 패키지 루트로 발행됩니다.                                                                                |
| `src/components/examples/` | Storybook 전용 예제 (발행 제외).                                                                                                                                      |
| `src/shadcn/`            | vendored shadcn/ui **Base UI (`base-nova`)** 원본이 있습니다. 참고용이며 export하지 않습니다. `shadcn add -o`를 실행한 뒤 `pnpm fix:ui`를 실행할 때만 변경합니다. |
| `src/styles/globals.css` | 디자인 토큰 레이어가 있습니다. `.dark`가 기본 dark 모드이고, `.light`가 light 모드이며, `[data-font]`가 폰트를 선택합니다. `dist/globals.css`로 발행되며(호환용 `dist/styles.css` 사본도 생성) `@kood/components/globals.css`로 import합니다. |
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

- `src/components/ui/`에 컴포넌트를 추가하거나 변경하기 전에 `src/shadcn/<name>.tsx`와 `DESIGN.md`를 읽습니다. class는 반드시 token layer를 사용하고, `check:slop`를 포함하는 `pnpm check`를 실행합니다.
- vendored 원본은 `pnpm dlx shadcn@latest add <name> -y -o`로 추가하거나 갱신한 뒤 `pnpm fix:ui`를 실행합니다.
- 배포하는 컴포넌트 옆에 story를 두고 Storybook에서 사용자에게 보이는 동작을 확인합니다.

## 사용자 (패키지 소비자)

- 소비자는 `import "@kood/components/globals.css"`로 스타일시트를 import합니다. 빌드가 `dist/styles.css` 사본도 유지하므로 1.0.0부터 있던 `./styles.css` 경로도 계속 동작합니다. 둘 다 **precompiled** Tailwind 산출물(컴포넌트 유틸리티 + 디자인 토큰)이라, kood 컴포넌트에 Tailwind 설정이 필요하지 않습니다.
- CSS는 토큰 기반입니다. 컴포넌트 유틸리티는 `var(--background)`, `var(--primary)` 등을 참조하므로, 소비자는 import **뒤에서** 그 CSS 변수를 다시 정의해 restyle합니다(`dist/globals.css`의 `:root`/`.dark`/`.light` 블록에 전체 토큰이 있습니다). Vite + `@tailwindcss/vite`, Next.js에서 토큰 값이 보존되고 소비자 오버라이드가 적용되는 것을 확인했습니다.
- 원본 `src/styles/globals.css`를 import 대상으로 배포하면 안 됩니다. `@theme inline`이 토큰을 런타임 CSS 변수로 매핑하는데, 소비자 Tailwind 파이프라인이 이걸 재처리하면 리터럴 토큰 값(`--background:#0a1724`)이 빠져 테마가 깨집니다.
- 발행 스타일시트나 토큰 집합이 바뀌면(export 하위 경로 추가/삭제, 새 `--*` 토큰, 토큰 블록 구조) README.md(사용법 + 테마)와 함께 이 파일을 갱신합니다.

## 규칙

- `src/components/ui`에서는 `dark:` variant, `shadow-*`, `ring-*`, `/NN` alpha, `transition-all`, opacity-disabled class를 사용하지 않습니다. `scripts/check-slop.mjs`가 이 제한을 검사합니다.
- 컴포넌트를 restyle할 때에는 API 변경이 명시된 경우가 아니면 public export surface를 유지합니다.
- 컴포넌트 구현 작업에서 `DESIGN.md`와 `DESIGN.ko.md`를 수정하지 않습니다.
