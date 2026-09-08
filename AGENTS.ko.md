# 저장소 안내

## 프로젝트 맵

| 경로                       | 용도                                                                                                                                                                                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/`       | 배포하는 DESIGN.md 스타일 컴포넌트 53개와 각 스토리가 있습니다. 패키지 루트로 발행됩니다.                                                                                                                                                             |
| `src/components/examples/` | Storybook 전용 예제 (발행 제외).                                                                                                                                                                                                                      |
| `src/shadcn/`              | vendored shadcn/ui **Base UI (`base-nova`)** 원본이 있습니다. 참고용이며 export하지 않습니다. `shadcn add -o`를 실행한 뒤 `pnpm fix:ui`를 실행할 때만 변경합니다.                                                                                     |
| `src/styles/globals.css`   | 디자인 토큰 레이어가 있습니다. `:root`/`.dark`가 기본 dark 모드이고, `.light`가 light 모드이며, `[data-font]`가 폰트를 선택합니다. `dist/globals.css`로 발행되며(호환용 `dist/styles.css` 사본도 생성) `@kood/components/globals.css`로 import합니다. |
| `scripts/check-slop.mjs`   | 토큰에 정의된 색상만 사용하는지(token-only)와 금지된 유틸리티 패턴(utility pattern)이 없는지 등 컴포넌트 class 사용 제한을 검사합니다.                                                                                                                |

## 명령어

pnpm이 기준입니다. 추적되는 락파일은 `pnpm-lock.yaml`뿐이며 npm/yarn/bun 락파일은 gitignore됩니다.

| 명령어                 | 용도                                                                  |
| ---------------------- | --------------------------------------------------------------------- |
| `pnpm dev`             | Storybook을 실행합니다.                                               |
| `pnpm check`           | 클래스 제한 검사(slop gate), lint, 타입 검사, 포맷 검사를 실행합니다. |
| `pnpm check:slop`      | 클래스 제한 검사(slop gate)를 실행합니다.                             |
| `pnpm build`           | 배포할 `dist` 결과물을 빌드합니다.                                    |
| `pnpm build-storybook` | static Storybook 결과물을 빌드합니다.                                 |
| `pnpm fix:ui`          | 이 패키지에 맞게 생성된 shadcn import를 수정합니다.                   |

## 작업 흐름

- `src/components/ui/`에 컴포넌트를 추가하거나 변경하기 전에 `src/shadcn/<name>.tsx`와 `DESIGN.md`를 읽습니다. 클래스는 반드시 토큰 레이어(token layer)를 사용하고, `check:slop`를 포함하는 `pnpm check`를 실행합니다.
- vendored 원본은 `pnpm dlx shadcn@latest add <name> -y -o`로 추가하거나 갱신한 뒤 `pnpm fix:ui`를 실행합니다.
- 배포하는 컴포넌트 옆에 story를 두고 Storybook에서 사용자에게 보이는 동작을 확인합니다.

## 발행 및 의존성

- 기본 원격 브랜치는 `dev`입니다. `main`은 릴리스 브랜치입니다. `main`에 push하면 릴리스 워크플로가 `package.json`에 명시된 버전을 그대로 npm에 발행합니다(커밋 메시지로 버전을 계산하지 않음). 이미 발행된 정확한 버전은 건너뛰며, 누락된 Git 태그/GitHub 릴리스만 복구합니다. 수동 실행(`workflow_dispatch`)은 같은 검사와 빌드 뒤 아직 발행되지 않은 버전일 때만 `npm publish --dry-run`을 수행하며 npm 발행, 태그, GitHub 릴리스를 만들지 않습니다.
- Dependabot이 `.github/dependabot.yml`에 구성되어 있습니다: `npm` 생태계가 `package.json`과 `pnpm-lock.yaml`을 갱신하고(pnpm이 표준 패키지 매니저), `github-actions` 생태계가 워크플로 액션 참조를 갱신합니다. npm의 minor/patch 업데이트는 하나의 PR로 묶고 major는 따로 둡니다.

## 사용자 (패키지 소비자)

- 소비자는 `import "@kood/components/globals.css"`로 **precompiled** 스타일시트를 import합니다. 배포되는 `./styles.css` 호환 경로도 동일한 precompiled 사본입니다. 컴포넌트 유틸리티와 디자인 토큰이 모두 포함되어 있어, kood 컴포넌트에 소비자 Tailwind 설정이 필요하지 않습니다.
- CSS는 역할(role) 기반입니다. import **뒤에서** 해당하는 `:root`/`.dark`/`.light` 블록의 커스텀 프로퍼티를 덮어써 스타일을 다시 정의합니다(restyle): 캔버스/본문(`--background`, `--foreground`, `--foreground-muted`, `--muted-foreground`), 표면/경계(`--card`, `--popover`, `--secondary`, `--muted`, `--border`, `--input`, `--sidebar`), 동작/포커스(`--primary`, `--primary-foreground`, `--accent`, `--accent-foreground`, `--ring`), 시맨틱/상태, 코드 역할. background나 accent 변수 하나만 바꿔도 다른 역할 색이 자동으로 바뀌지 않습니다. CSS가 바뀌면 소비자 파이프라인(예: Vite + `@tailwindcss/vite` 또는 Next.js)에서 토큰 값이 보존되고 오버라이드가 적용되는지 검증합니다.
- `--kood-font-sans`와 `--kood-font-mono`는 공개 폰트 훅이고 Tailwind의 `--font-sans`/`--font-mono`가 이를 가리킵니다. `--radius`가 기준이며(기본 `8px`) `--radius-xs/sm/md/lg/xl/2xl`은 각각 `.5/.75/1/1.5/2/3`배로 파생됩니다. 나중에 `--radius-md: 7px`처럼 이름을 지정해 덮어쓰면 해당 radius 이름만 바뀌고 `none`/`full`은 독립적으로 유지됩니다.
- 소비자 계약이 바뀌면 QA 범위를 유지합니다: `@kood/components/globals.css`를 오버라이드 스타일시트 **앞에** import하고 `.dark`/`.light` 양쪽에서 오버라이드가 적용되는지 확인하며, 기본/이름 지정 `--radius` 오버라이드와 공개 폰트 훅 두 가지를 모두 다루고, `@kood/components/styles.css`도 호환 import로 함께 검증합니다. 스타일시트 순서를 뒤집어 역순으로 import하는 검증 사례에서는 오버라이드가 적용되면 안 됩니다.
- 원본 `src/styles/globals.css`를 import 대상으로 배포하면 안 됩니다. `@theme inline`이 토큰을 런타임 CSS 변수로 변환하는데, 소비자 Tailwind 파이프라인이 이걸 재처리하면 리터럴 토큰 값(`--background:#0a1724`)이 빠져 테마가 깨집니다.
- 발행 스타일시트나 토큰 집합이 바뀌면(export 하위 경로 추가/삭제, 새 `--*` 토큰, 토큰 블록 구조) README.md(사용법 + 테마)와 함께 이 파일을 갱신합니다.

## 규칙

- `src/components/ui`에서는 `dark:` 변형(variant), `shadow-*`, `ring-*`, `/NN` 투명도(alpha), `transition-all`, opacity-disabled 클래스를 사용하지 않습니다. `scripts/check-slop.mjs`가 이 제한을 검사합니다.
- 컴포넌트 스타일을 다시 꾸밀 때(restyle)에는 API 변경이 명시되지 않은 한 public export surface(공개 export 범위)를 유지합니다.
- 컴포넌트 구현 작업에서 `DESIGN.md`와 `DESIGN.ko.md`를 수정하지 않습니다.
