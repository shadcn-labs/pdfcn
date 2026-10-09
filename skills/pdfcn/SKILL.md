---
name: pdfcn
description: >-
  pdfcn, the shadcn registry of React PDF components and blocks for Takumi and Forme. Use when
  the user wants to create or fix a pdfcn component, block, or theme preset (invoice, receipt,
  report), apply a pdfcn theme, install items with `npx shadcn add @pdfcn/...`, edit
  `registry.json` or a `components.json` for pdfcn, compare rendering bases (Takumi, Forme,
  pdfme, Unlayer Elements), set up the pdfcn repo, or contribute a pull request, even if they
  only say "PDF template" inside the pdfcn repo.
---

# pdfcn

pdfcn ships copy-and-own React PDF components and blocks through a shadcn registry, once per
rendering base (Takumi and Forme). The repository is the source of truth; this skill caches the
conventions and gotchas that no config file states. When a fact here disagrees with the code,
trust the code and read the file it points at.

Scripts referenced below live in this skill's `scripts/` folder; run them from anywhere inside
the pdfcn repo.

## 1. Orient

Decide which side of the registry the user is on before touching anything:

| Signal                                                                 | Side                   | Start with                                                       |
| ---------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------- |
| `apps/web/registry.json` and `apps/web/registry/bases/` exist          | **contributor** (repo) | the change loop below                                            |
| a `components.json` with an `@pdfcn` entry under `registries`, or none | **consumer** (an app)  | [references/registry.md](references/registry.md), "Consumer use" |

Then name the base or bases involved. In the repo, every component and block ships in both
`takumi` and `forme` with identical names and props. This **parity** is what lets the docs base
switcher link one page to the other, so treat a single-base change as unfinished.

## 2. Route to a reference

| Task                                                                    | Read                                                           |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| Create or change a component (text, table, badge, …)                    | [references/components.md](references/components.md)           |
| Create or change a block (invoice, report, any full document)           | [references/blocks.md](references/blocks.md)                   |
| Create a theme preset, or apply one in an app                           | [references/themes.md](references/themes.md)                   |
| Registry entries, `pnpm registry:build`, installing with the CLI        | [references/registry.md](references/registry.md)               |
| Takumi vs Forme behaviour, page setup, rendering to bytes, future bases | [references/rendering-bases.md](references/rendering-bases.md) |
| Where things live in the monorepo                                       | [references/architecture.md](references/architecture.md)       |
| Local setup, scripts, dev server, error messages                        | [references/commands.md](references/commands.md)               |
| Claiming an issue, commits, DCO, pull requests                          | [references/contributing.md](references/contributing.md)       |

Blocks are built from components, so block work usually needs `blocks.md` plus the component
cheat sheet inside it; reach for `components.md` only when a building block itself must change.

## 3. Conventions every code change follows

- **Location**: source lives in `apps/web/registry/bases/<base>/{components,blocks}/<name>/`, one
  kebab-case folder per item, main file `<name>.tsx`, optional `<name>.types.ts` and
  `<name>.styles.ts`.
- **Imports**: each base imports only its own code (`@/registry/bases/<base>/...`) plus the shared
  `@/registry/types/...` and `@/registry/themes/...`.
- **Theme**: read tokens with `usePdfcnTheme()` and memoise styles with `useSafeMemo()`. Both are
  plain functions backed by a module-level theme that `PdfcnThemeProvider` sets while it renders
  its direct child; they are not React context. Write PDF code as pure render functions, and make
  the component that reads the theme the provider's direct child.
- **Styles**: build them with `StyleSheet.create` from theme tokens (`theme.colors.*`,
  `theme.spacing.*`, `theme.primitives.*`); a literal colour appears only as an `accentColor`
  prop value. Keep object keys sorted alphabetically: the linter enforces `sort-keys`, including
  in sample data.
- **Visual language**: the house style is **monochrome** with one small accent, benchmarked by
  `invoice-classic`; the rules are under "Layout rules" in
  [references/blocks.md](references/blocks.md).

## 4. The change loop (contributor side)

Work through these in order; each ends on a checkable state.

1. **Claim**: the issue has your comment and no competing PR (see
   [contributing.md](references/contributing.md)). Branch from an up-to-date `main`.
2. **Build both bases**: the item exists under `registry/bases/takumi/` and
   `registry/bases/forme/`, with matching props.
3. **Static checks pass**: `pnpm fix`, then `pnpm check` prints `Found 0 warnings and 0 errors.`
   and `pnpm typecheck` prints `Tasks: 1 successful`.
4. **Registry regenerated**: run `pnpm registry:build` after the last source edit, then
   `scripts/restore-registry-churn.sh <name>` so only your item's JSON and
   `public/r/registry.json` remain changed (why: [registry.md](references/registry.md),
   "Building").
5. **Registered everywhere**: `scripts/check-registration.sh <name>` ends with
   `all registration sites ok`. It covers both bases: registry entry and `registryDependencies`,
   examples, docs and `meta.json`, generated JSON, and the block lists.
6. **Render check**: with `pnpm dev` running, `scripts/render-check.sh <name>` exits 0 (both bases
   return 200, no blank or footer-only last page), the page count is the one you designed, and the
   PNGs it writes look aligned.
7. **Ship**: granular signed-off commits and a PR with `Closes #<issue>`, following
   [contributing.md](references/contributing.md).

## 5. Silent gotchas

These produce no error message, so watch for them while working; everything that does print an
error is in the troubleshooting table of [commands.md](references/commands.md).

- **Stale previews**: after an edit, the dev server can keep serving the previous PDF from
  `/api/pdf/...`, and a newly added docs page 404s until restart. `render-check.sh` flags a
  byte-identical render; restart `next dev` before concluding an edit did nothing.
- **Generated agent files**: `next dev` writes `apps/web/AGENTS.md` and `apps/web/CLAUDE.md`.
  Stage your own paths by name so they stay untracked.

## 6. Proposed bases

Only the bases under `apps/web/registry/bases/` exist; pdfme
([#13](https://github.com/shadcn-labs/pdfcn/issues/13)) and Unlayer Elements
([#14](https://github.com/shadcn-labs/pdfcn/issues/14)) are proposals. See
[rendering-bases.md](references/rendering-bases.md) before working on either.
