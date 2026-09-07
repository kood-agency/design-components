# Repository guide

## Project map

| Path                     | Purpose                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/`     | Shipped, DESIGN.md-styled components (53 components and their stories). Published via the package root.                                                                   |
| `src/components/examples/` | Storybook-only examples (not published).                                                                                                                              |
| `src/shadcn/`            | Vendored shadcn/ui **Base UI (`base-nova`)** originals. They are reference-only, are not exported, and may change only through `shadcn add -o` followed by `pnpm fix:ui`. |
| `src/styles/globals.css` | Design token layer: dark is the default in `.dark`, light is in `.light`, and `[data-font]` selects the font. Published to `dist/globals.css` (plus a `dist/styles.css` compatibility copy) and imported as `@kood/components/globals.css`. |
| `scripts/check-slop.mjs` | Enforces component class restrictions, including token-only colors and prohibited utility patterns.                                                                       |

## Commands

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

## Consumers

- Consumers import the stylesheet as `import "@kood/components/globals.css"`; the build also keeps a `dist/styles.css` copy so the published `./styles.css` path keeps working. Both are **precompiled** Tailwind output (component utilities + design tokens) so consumers do not need a Tailwind config for kood components.
- The CSS is token-driven: component utilities resolve to `var(--background)`, `var(--primary)`, etc. Consumers restyle by overriding those custom properties **after** the import (`:root`/`.dark`/`.light` blocks in `dist/globals.css` list every token). Verified working on Vite + `@tailwindcss/vite` and Next.js (both keep the token values and apply consumer overrides).
- Do NOT ship the raw `src/styles/globals.css` as the import target: its `@theme inline` maps tokens to runtime CSS variables, and when a consumer Tailwind pipeline reprocesses it the literal token values (`--background:#0a1724`) are dropped, breaking theming.
- When the published stylesheet or the token set changes (adding/removing an export subpath, new `--*` tokens, layout of the token blocks), update `README.md` (usage + theming) together with this file.

## Conventions

- No `dark:` variants, `shadow-*`, `ring-*`, `/NN` alpha, `transition-all`, or opacity-disabled classes in `src/components/ui`; `scripts/check-slop.mjs` enforces these restrictions.
- Preserve the public export surface when restyling a component unless the change explicitly calls for an API change.
- Do not edit `DESIGN.md` or `DESIGN.ko.md` as part of component implementation work.
