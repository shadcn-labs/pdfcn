# pdfcn skill evals

Prompts from issue #15 with the behaviour a run of the skill should show. Run each in a fresh
agent session inside the pdfcn repo (prompts 3 to 5 also work from a consumer app) and compare
against the expected outcome.

## 1. Component

> Create a new PDF component for a receipt header using the Takumi base

Expected: the agent reads `references/components.md`, checks existing components first, and
creates `registry/bases/takumi/components/receipt-header/receipt-header.tsx` from the template
(theme via `usePdfcnTheme` / `useSafeMemo`, `StyleSheet` from the Takumi primitives, JSDoc
`Props - ...` line, sorted style keys). It mirrors the component under `bases/forme` with the
Forme casts, adds `registry.json` entries with `@pdfcn/<base>/utils`, examples registered in
`examples/__index__.ts`, docs MDX and `meta.json` for both bases, then runs `pnpm fix`,
`pnpm check`, `pnpm typecheck`, `pnpm registry:build`, and the render check.

Last run: the template from `components.md` was written to both bases unmodified (plus the
listed Forme changes), was already formatter-clean, passed `pnpm check` and `pnpm typecheck`, built
with a `registry.json` entry shaped as in `registry.md`, and rendered through `/api/pdf/takumi`
and `/api/pdf/forme`.

## 2. Block

> Scaffold an invoice block with table and total sections

Expected: the agent reads `references/blocks.md`, looks at the existing `invoice-*` blocks, and
creates `<name>.tsx` and `<name>.types.ts` for both bases from the skeleton (sample data,
`<Name>Content` as the provider's direct child, `<Name>Document` accepting flat props and `data`).
It uses `Table variant="grid" zebraStripe` and a `KeyValue` totals column in the monochrome
style, applies each base's page scaffold from `rendering-bases.md`, completes the block
registration checklist (`registry.json`, examples, `__index__.ts`, `preview-config.tsx` and
`pdf-tool.tsx` `BLOCK_NAMES`, docs and `meta.json`), and verifies with the render check.

Last run: a block written only from the skeleton, the page scaffolds, and the layout rules passed
`pnpm check` and `pnpm typecheck` on the first attempt and rendered as one clean A4 page on both
bases.

## 3. Registry

> How do I add a new component to the pdfcn registry?

Expected: the answer comes from `references/registry.md` and `components.md`: a `registry:ui`
entry named `<base>/<name>` in `apps/web/registry.json` for Takumi and Forme, with
`registry:component` files targeting `components/pdf/<name>/<file>`, the base's npm
`dependencies`, and `registryDependencies` starting with `@pdfcn/<base>/utils`. Then
`pnpm registry:build`, committing `public/r/<base>/<name>.json` and `public/r/registry.json` and
restoring unrelated churn, plus the example and docs registration.

Last run: the churn-restore command from `registry.md` reduced 75 changed files in `public/r` to
the item's two JSON files and the index.

## 4. Rendering bases

> What's the difference between Takumi and Forme rendering bases?

Expected: the answer comes from `references/rendering-bases.md`: different npm packages and
engines behind the same pdfcn API. Takumi pages are styled divs sized by render options, so blocks
set `minHeight: 841`, page padding, and a sticky footer inside the page; Forme uses
`Page size` and `margin` with the footer first. `KeepTogether` maps to `breakInside: "avoid"` on
Takumi and `wrap={false}` on Forme, and `Section noWrap` only works on Forme. Forme needs style
casts in components. It shows how each base renders to bytes and names pdfme (#13) and Unlayer
Elements (#14) as proposals.

## 5. Local setup

> Help me set up the pdfcn project locally

Expected: the agent follows `references/commands.md`: Node `>=20.9.0` and pnpm `10.28.2`, clone
(a fork for contributors), `pnpm install` (installs the lefthook hook and generates fumadocs
sources), `pnpm dev` on port 3000, a check that `/docs` and `/api/pdf/takumi?name=invoice-classic`
respond, and the purpose of `check`, `fix`, `typecheck`, and `registry:build`.

Last run: both URLs returned 200 on a fresh `next dev`, and a docs page added while the server was
running returned 404 until restart, as the troubleshooting table states.
