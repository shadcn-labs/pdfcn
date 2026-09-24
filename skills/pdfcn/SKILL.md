---
name: pdfcn
description: >-
  Build, install, and contribute to pdfcn, the shadcn-compatible registry of React PDF
  components and blocks for the Takumi and Forme rendering bases. Use when the user wants to
  create or change a pdfcn component or block (invoice, receipt, report, any PDF template),
  install pdfcn items with `npx shadcn add @pdfcn/...`, edit pdfcn's `registry.json` or a
  `components.json` that points at pdfcn, compare Takumi and Forme (or the proposed pdfme and
  Unlayer Elements bases), set up the pdfcn repo locally, or open a pdfcn pull request, even if
  they only say "PDF template" or "document block" inside the pdfcn repo.
---

# pdfcn

pdfcn ships copy-and-own React PDF components and blocks through a shadcn registry, once per
rendering base (Takumi and Forme). The repository is the source of truth; this skill caches the
conventions and gotchas that no config file states. When a fact here disagrees with the code,
trust the code and read the file it points at.

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

Read only the reference the task needs:

| Task                                                                    | Read                                                           |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| Create or change a component (text, table, badge, …)                    | [references/components.md](references/components.md)           |
| Create or change a block (invoice, report, any full document)           | [references/blocks.md](references/blocks.md)                   |
| Registry entries, `shadcn build`, installing with the CLI               | [references/registry.md](references/registry.md)               |
| Takumi vs Forme behaviour, page setup, rendering to bytes, future bases | [references/rendering-bases.md](references/rendering-bases.md) |
| Where things live in the monorepo                                       | [references/architecture.md](references/architecture.md)       |
| Local setup, scripts, dev server, rendering a preview, troubleshooting  | [references/commands.md](references/commands.md)               |
| Claiming an issue, commits, DCO, pull requests                          | [references/contributing.md](references/contributing.md)       |

Blocks are built from components, so block work usually needs `blocks.md` plus the component
cheat sheet inside it; reach for `components.md` only when a building block itself must change.

## 3. Conventions every code change follows

- **Location**: source lives in `apps/web/registry/bases/<base>/{components,blocks}/<name>/`, one
  kebab-case folder per item, main file `<name>.tsx`, optional `<name>.types.ts` and
  `<name>.styles.ts`.
- **Imports**: stay inside the base (`@/registry/bases/<base>/...`) plus the shared
  `@/registry/types/...` and `@/registry/themes/...`. A Forme file never imports Takumi code and
  the reverse.
- **Theme**: read tokens with `usePdfcnTheme()` and memoise styles with `useSafeMemo()`. Both are
  plain functions backed by a module-level theme that `PdfcnThemeProvider` sets while it renders
  its direct child; they are not React context. Keep PDF code to pure render functions (no
  `useState`, `useEffect`, or `useContext`) and make the component that reads the theme the
  provider's direct child.
- **Styles**: build them with `StyleSheet.create` from the base's primitives, from theme tokens
  (`theme.colors.*`, `theme.spacing.*`, `theme.primitives.*`). Hard-coded colours appear only as
  an `accentColor` prop value. Keep object keys sorted alphabetically: the linter enforces
  `sort-keys`, including in sample data.
- **Visual language**: **monochrome**. Dark title, section labels as 9pt bold uppercase
  `mutedForeground` text, one type scale per document, grid and zebra tables, and the accent colour
  on one small detail only (a `highlight`/`callout` border or a label). Compare against
  `invoice-classic` when unsure.

## 4. The change loop (contributor side)

Work through these in order; each ends on a checkable state.

1. **Claim**: the issue has your comment and no competing PR (see
   [contributing.md](references/contributing.md)). Branch from an up-to-date `main`.
2. **Build both bases**: the item exists under `registry/bases/takumi/` and
   `registry/bases/forme/`, with matching props.
3. **Register everywhere**: every site in the registration checklist of `components.md` or
   `blocks.md` is updated for both bases.
4. **Static checks pass**: `pnpm fix`, then `pnpm check` reports `Found 0 warnings and 0 errors`
   and `pnpm typecheck` reports `1 successful`.
5. **Registry regenerated**: `pnpm registry:build` ran after the last source edit, and only your
   item's JSON plus `public/r/registry.json` differ (see the churn gotcha below).
6. **Render check**: both `/api/pdf/<base>?name=<name>` URLs return 200, the page count is what
   you designed, no page holds only a footer, and the rendered PNGs look aligned (see
   [commands.md](references/commands.md), "Render check").
7. **Ship**: granular signed-off commits, PR linked with `Closes #<issue>`, following the template
   in [contributing.md](references/contributing.md).

## 5. Gotchas that cost the most time

- **Stale previews**: after editing a block the dev server can keep serving the old PDF from
  `/api/pdf/...`, and a newly added docs page 404s until the server restarts. Restart
  `next dev`; Next 16 allows only one dev server per app directory, so reuse or stop the running
  one.
- **Registry churn**: `pnpm registry:build` rewrites every JSON in `apps/web/public/r/`, and files
  committed from other machines can differ only in line endings. Commit your item's JSON and
  `public/r/registry.json`, then restore the rest with `git checkout -- <paths>`.
- **JSON-only commits**: the lefthook pre-commit hook runs `pnpm fix` on staged `js/ts/json/css`
  files, and its lint step finds nothing to lint in JSON, so a commit whose hook-matched files are
  all JSON (`registry.json`, `public/r` output) fails with "No files found to lint". Stage JSON
  together with a `.ts`/`.tsx` change.
- **Server-callable examples**: examples are default exports the PDF route calls on the server.
  Write them without `"use client"`: `const Demo = () => <XDocument />; export default Demo;`.
- **Takumi pagination**: `Section noWrap` does nothing on Takumi. Keep a group on one page with
  `KeepTogether` (`breakInside: "avoid"`), and split long documents into explicit `<Page>`s.
- **Generated agent files**: `next dev` writes `apps/web/AGENTS.md` and `apps/web/CLAUDE.md`.
  Leave them untracked; they are not part of your change.

## 6. Proposed bases

Only Takumi and Forme exist on `main`. pdfme ([#13](https://github.com/shadcn-labs/pdfcn/issues/13),
JSX primitives from `@pdfme/jsx`) and Unlayer Elements
([#14](https://github.com/shadcn-labs/pdfcn/issues/14), `<Document>` mode) are proposals with open
PRs. Run `ls apps/web/registry/bases` before assuming a base exists, and read
[rendering-bases.md](references/rendering-bases.md) for what adding one involves.
