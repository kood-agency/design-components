# Repository guide

## Project map

| Path                     | Purpose                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/`        | Shipped, DESIGN.md-styled components (53 components and their stories).                                                                                                   |
| `src/shadcn/`            | Vendored shadcn/ui **Base UI (`base-nova`)** originals. They are reference-only, are not exported, and may change only through `shadcn add -o` followed by `pnpm fix:ui`. |
| `src/styles/globals.css` | Design token layer: dark is the default in `.dark`, light is in `.light`, and `[data-font]` selects the font.                                                             |
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

- Before adding or changing a component in `src/components/`, read `src/shadcn/<name>.tsx` and `DESIGN.md`; classes MUST use the token layer; run `pnpm check` (includes `check:slop`).
- Add or refresh vendored originals only with `pnpm dlx shadcn@latest add <name> -y -o`, then run `pnpm fix:ui`.
- Keep stories beside their shipped component and verify user-visible behavior in Storybook.

## Conventions

- No `dark:` variants, `shadow-*`, `ring-*`, `/NN` alpha, `transition-all`, or opacity-disabled classes in `src/components`; `scripts/check-slop.mjs` enforces these restrictions.
- Preserve the public export surface when restyling a component unless the change explicitly calls for an API change.
- Do not edit `DESIGN.md` or `DESIGN.ko.md` as part of component implementation work.
