# pdfcn skill evals

Two sets: **task evals** (does the skill lead to correct work?) and **trigger evals** (does the
description fire when it should, and only then?). Run each task prompt in a fresh agent session
inside the pdfcn repo, then check its assertions; an eval passes when every assertion holds.

## Task evals

### 1. Component

> Create a new PDF component for a receipt header using the Takumi base

- [ ] Files exist under both `registry/bases/takumi/components/receipt-header/` and
      `registry/bases/forme/components/receipt-header/` (parity, even though the prompt names one
      base).
- [ ] The Takumi file follows the `components.md` template: `usePdfcnTheme` + `useSafeMemo`, a
      `create…Styles(theme)` factory, a JSDoc `Props - ...` line; the Forme file adds the casts
      listed under "Forme differences".
- [ ] `scripts/check-registration.sh receipt-header` ends with `all registration sites ok`.
- [ ] `pnpm check` prints `Found 0 warnings and 0 errors.` and `pnpm typecheck` succeeds.
- [ ] `scripts/render-check.sh receipt-header` exits 0.

Last run: the `components.md` template, written unmodified to both bases (plus the listed Forme
changes), was already formatter-clean, passed check and typecheck, built through a `registry.json`
entry shaped as in `registry.md`, and rendered on both bases.

### 2. Block

> Scaffold an invoice block with table and total sections

- [ ] The agent inspects existing `invoice-*` blocks before writing.
- [ ] `<name>.tsx` and `<name>.types.ts` exist for both bases; the export is `<Name>Document`,
      renders with no props, and accepts flat props and `data`.
- [ ] The document uses `Table variant="grid" zebraStripe` and a `KeyValue` totals column; the
      title has no `titleColor` and the accent appears on at most one detail.
- [ ] `scripts/check-registration.sh <name>` ends with `all registration sites ok` (this covers
      `preview-config.tsx` and `pdf-tool.tsx` `BLOCK_NAMES`).
- [ ] `scripts/render-check.sh <name>` exits 0 and reports the intended page count.

Last run: a block written only from the skeleton, page scaffolds, and layout rules passed
`pnpm check` and `pnpm typecheck` on the first attempt and rendered as one clean A4 page on both
bases.

### 3. Registry

> How do I add a new component to the pdfcn registry?

- [ ] The answer names a `registry:ui` entry `<base>/<name>` for **both** bases, with
      `registry:component` files targeting `components/pdf/<name>/<file>`.
- [ ] It lists the base's npm `dependencies` and `registryDependencies` starting with
      `@pdfcn/<base>/utils`.
- [ ] It includes `pnpm registry:build`, says the build fails when an imported component is
      missing from `registryDependencies`, and commits only the item's JSON plus
      `public/r/registry.json` (via `restore-registry-churn.sh`), then `check-registration.sh`.
- [ ] It mentions the example, `__index__.ts`, and docs registration.

Last run: on a checkout whose committed JSON lagged its source, `restore-registry-churn.sh`
reduced 72 rebuilt `public/r` files to the item's JSON and the index. `check-registration.sh`,
run on all 45 existing items of the current `main`, flagged only real registration gaps, and
removing `page-number` from a report's `registryDependencies` made `pnpm registry:build` fail
with the documented `imports missing` message.

### 4. Rendering bases

> What's the difference between Takumi and Forme rendering bases?

- [ ] Names the npm packages of each base and states that the pdfcn API is the same.
- [ ] Explains page setup: Takumi pages sized by render options with blocks padding themselves
      (`minHeight: 841`); Forme `Page size` + `margin` with the footer first.
- [ ] States that `Section noWrap` does nothing on Takumi and `KeepTogether` works on both.
- [ ] Shows how each base renders to bytes, and names pdfme (#13) and Unlayer Elements (#14) as
      proposals.

### 5. Local setup

> Help me set up the pdfcn project locally

- [ ] Takes Node and pnpm versions from `package.json` rather than guessing them.
- [ ] Runs `pnpm install` then `pnpm dev`, and verifies `/docs` and
      `/api/pdf/takumi?name=invoice-classic` respond.
- [ ] Explains `check`, `fix`, `typecheck`, and `registry:build`, and when to use each.

Last run: both setup URLs returned 200 on a fresh `next dev`; a docs page added while the server
was running returned 404 until restart, as `SKILL.md` warns.

### 6. Theme

> Add a "coastal" theme preset with a teal accent

- [ ] Creates `registry/themes/coastal.ts` exporting `coastalTheme` with hex colours and
      `defaultPrimitives`.
- [ ] Registers it in `registry/themes.ts` (`themePresets`), adds a `theme-coastal` item to
      `registry.json`, and a docs page plus `content/docs/themes/meta.json` entry.
- [ ] Commits `public/r/theme-coastal.json` after `pnpm registry:build`.

## Trigger evals

The description should fire for the first list and stay quiet for the second.

Should trigger:

1. "Add a packing slip block to pdfcn"
2. "The lesson plan PDF looks misaligned on Forme, can you fix it?"
3. "npx shadcn add @pdfcn/takumi/invoice-minimal fails with unresolved imports"
4. "Which is better for server-side PDFs, Takumi or Forme?"
5. "Register my new badge variant in registry.json"
6. "How do I contribute a component to pdfcn?"
7. "Make a PDF template for event tickets" (inside the pdfcn repo)
8. "Apply the elegant theme to my invoice"

Should not trigger:

1. "Generate a PDF with react-pdf in my Express app" (no pdfcn involved)
2. "Add a shadcn/ui button to my Next.js app" (shadcn, but not pdfcn)
3. "Merge these two PDF files with pdf-lib"
4. "Fix the TypeScript error in my auth middleware"
