# Repository guide

## Project map

| Path                       | Purpose                                                                                                                                                                                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/`       | Shipped, DESIGN.md-styled components (53 components and their stories). Published via the package root.                                                                                                                                             |
| `src/components/examples/` | Storybook-only examples (not published).                                                                                                                                                                                                            |
| `src/shadcn/`              | Vendored shadcn/ui **Base UI (`base-nova`)** originals. They are reference-only, are not exported, and may change only through `shadcn add -o` followed by `pnpm fix:ui`.                                                                           |
| `src/styles/globals.css`   | Design token layer: dark is the default in `:root`/`.dark`, light is in `.light`, and `[data-font]` selects the font. Published to `dist/globals.css` (plus a `dist/styles.css` compatibility copy) and imported as `@kood/components/globals.css`. |
| `scripts/check-slop.mjs`   | Enforces component class restrictions, including token-only colors and prohibited utility patterns.                                                                                                                                                 |

## Commands

pnpm is canonical; only `pnpm-lock.yaml` is tracked (npm, yarn, and bun lockfiles are gitignored).

| Command                | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `pnpm dev`             | Start Storybook.                                               |
| `pnpm check`           | Run the slop gate, lint, type checking, and formatting checks. |
| `pnpm check:slop`      | Run the slop gate.                                             |
| `pnpm build`           | Build the publishable `dist` output.                           |
| `pnpm build-storybook` | Build static Storybook output.                                 |
| `pnpm fix:ui`          | Rewrite generated shadcn imports for this package.             |

## Workflow

- Before adding or changing a component in `src/components/ui/`, read `src/shadcn/<name>.tsx` and `DESIGN.md`; classes MUST use the token layer; run `pnpm check` (includes `check:slop`).
- Add or refresh vendored originals only with `pnpm dlx shadcn@latest add <name> -y -o`, then run `pnpm fix:ui`.
- Keep stories beside their shipped component and verify user-visible behavior in Storybook.

## Release & dependencies

- The default remote branch is `dev`. `main` is the release branch: pushing to it runs the release workflow, which publishes the explicit `package.json` version as-is (version is never calculated from commit messages). Already-published exact versions are skipped, and only missing Git tags or GitHub releases are recovered. A manual `workflow_dispatch` run performs the same checks and build, then `npm publish --dry-run` only for an unpublished version (no npm publish, tags, or releases).
- Dependabot is configured in `.github/dependabot.yml`: the `npm` ecosystem updates `package.json` plus `pnpm-lock.yaml` (pnpm is the canonical package manager), and the `github-actions` ecosystem updates workflow action references. Minor/patch npm updates are grouped into one PR; majors stay separate.

## Consumers

- Consumers import the **precompiled** stylesheet as `import "@kood/components/globals.css"`; the published `./styles.css` compatibility path is an identical precompiled copy. Component utilities and design tokens are included, so consumers do not need a Tailwind config for kood components.
- Clickable components provide pointer cursors by default. Use each component's supported `disabled` prop for inactive styling and activation prevention; arbitrary `aria-disabled` attributes alone do not prevent mouse or keyboard activation. Preserve text and resize cursors and explicit consumer cursor overrides when changing shared interaction styles.
- The CSS is role-driven. Override custom properties **after** the import, in the matching `:root`/`.dark`/`.light` block: canvas/content (`--background`, `--foreground`, `--foreground-muted`, `--muted-foreground`), surfaces/boundaries (`--card`, `--popover`, `--secondary`, `--muted`, `--border`, `--input`, `--sidebar`), action/focus (`--primary`, `--primary-foreground`, `--accent`, `--accent-foreground`, `--ring`), semantic/state, and code roles. Changing one background or accent variable does not update the other roles automatically. When the CSS changes, validate the result in a consumer pipeline (for example Vite with `@tailwindcss/vite`, or Next.js): token values must survive and the consumer override must apply.
- `--kood-font-sans` and `--kood-font-mono` are the public font hooks; Tailwind's `--font-sans` and `--font-mono` alias them. `--radius` is the base (default `8px`): `--radius-xs/sm/md/lg/xl/2xl` derive at `.5/.75/1/1.5/2/3` times it. A later named value such as `--radius-md: 7px` overrides only that radius name; `none` and `full` stay independent.
- Cover the consumer contract when it changes: import `@kood/components/globals.css` before an override stylesheet and confirm the override wins in both `.dark` and `.light`; exercise base and named `--radius` overrides and both public font hooks; also import `@kood/components/styles.css` as the compatibility equivalent. A negative fixture that reverses the stylesheet order must not let the override win.
- Do NOT ship the raw `src/styles/globals.css` as the import target: its `@theme inline` maps tokens to runtime CSS variables, and when a consumer Tailwind pipeline reprocesses it the literal token values (`--background:#0a1724`) are dropped, breaking theming.
- When the published stylesheet or the token set changes (adding/removing an export subpath, new `--*` tokens, layout of the token blocks), update `README.md` (usage + theming) together with this file.

## Conventions

- No `dark:` variants, `shadow-*`, `ring-*`, `/NN` alpha, `transition-all`, or opacity-disabled classes in `src/components/ui`; `scripts/check-slop.mjs` enforces these restrictions.
- Preserve the public export surface when restyling a component unless the change explicitly calls for an API change.
- Do not edit `DESIGN.md` or `DESIGN.ko.md` as part of component implementation work.
