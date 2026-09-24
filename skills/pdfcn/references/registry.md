# Registry and CLI

pdfcn is distributed as a [shadcn registry](https://ui.shadcn.com/docs/registry). The source
index is `apps/web/registry.json` (schema `https://ui.shadcn.com/schema/registry.json`); `shadcn
build` turns it into the JSON files under `apps/web/public/r/` that the CLI downloads.

## Item shapes

Every item name is `<base>/<item>` except the shared theme items. Copy an existing entry of the
same type and change the names; entries sit next to their siblings (the Takumi block entries
together, the Forme block entries together).

| Kind      | `type`           | Example name            | File `type`          | File `target`                                   |
| --------- | ---------------- | ----------------------- | -------------------- | ----------------------------------------------- |
| Component | `registry:ui`    | `takumi/divider`        | `registry:component` | `components/pdf/<name>/<file>`                  |
| Block     | `registry:block` | `forme/invoice-classic` | `registry:block`     | `components/pdf/blocks/<name>/<file>`           |
| Utils     | `registry:lib`   | `takumi/utils`          | `registry:lib`       | `lib/…` and `components/pdf/theme-provider.tsx` |
| Theme     | `registry:theme` | `theme-professional`    | `registry:theme`     | `lib/pdf-themes/<name>.ts`, `types/…`           |

A block entry, in full:

```json
{
  "dependencies": ["takumi-pdf", "@takumi-rs/helpers"],
  "description": "Receipt PDF block (takumi)",
  "files": [
    {
      "path": "registry/bases/takumi/blocks/receipt/receipt.tsx",
      "type": "registry:block",
      "target": "components/pdf/blocks/receipt/receipt.tsx"
    },
    {
      "path": "registry/bases/takumi/blocks/receipt/receipt.types.ts",
      "type": "registry:block",
      "target": "components/pdf/blocks/receipt/receipt.types.ts"
    }
  ],
  "name": "takumi/receipt",
  "registryDependencies": [
    "@pdfcn/takumi/utils",
    "@pdfcn/takumi/page-footer",
    "@pdfcn/takumi/page-header",
    "@pdfcn/takumi/table",
    "@pdfcn/takumi/text"
  ],
  "title": "Receipt",
  "type": "registry:block"
}
```

- `dependencies` are the base's npm packages: `["takumi-pdf", "@takumi-rs/helpers"]` or
  `["@formepdf/react", "@formepdf/core"]`.
- `registryDependencies` always start with `@pdfcn/<base>/utils` (theme provider, primitives,
  `resolveColor`) and then name every pdfcn component the files import, by folder name
  (`list`, `key-value`, `keep-together`, …). Keep the list in sync when imports change.
- `description` follows `"<Title> PDF component (<base>)"` or `"<Title> PDF block (<base>)"`.
- `path` is relative to `apps/web`.

## Building

```bash
pnpm registry:build     # from the repo root; runs `shadcn build` in apps/web
```

- It writes `public/r/<base>/<item>.json` (sources inlined) and `public/r/registry.json`. Both are
  committed, and CI runs it again as part of `pnpm build`.
- Run it after the last source edit: the JSON inlines file contents, so an edit made after the
  build leaves the published item stale.
- It rewrites every JSON in `public/r/`. Files built on another machine can differ only in line
  endings, so `git status` may list dozens of unrelated files. Keep yours and restore the rest:

```bash
git diff --name-only -- apps/web/public/r \
  | grep -v -e '/receipt.json$' -e 'public/r/registry.json$' \
  | xargs git checkout --
```

## Consumer use

In the app that will use pdfcn, register the namespace once in `components.json`:

```json
{
  "registries": {
    "@pdfcn": "https://pdfcn.dev/r/{name}.json"
  }
}
```

Then add items by namespace (`takumi/` or `forme/`):

```bash
npx shadcn@latest add @pdfcn/takumi/text              # a component
npx shadcn@latest add @pdfcn/forme/invoice-minimal    # a block
npx shadcn@latest add @pdfcn/theme-minimal            # a theme preset
npx shadcn@latest add https://pdfcn.dev/r/takumi/text.json   # without the alias
```

- The CLI installs the npm dependencies and `registryDependencies`, and writes files at each
  item's `target` under the configured aliases. For example `components/pdf/text/text.tsx` is
  imported as `@/components/pdf/text/text`. The CLI output lists every file it wrote.
- Render with the base's own document primitives: Takumi's `Document` and `Page` from the
  installed `lib/pdf-primitives.tsx`, Forme's from `@formepdf/react`. Wrap content in
  `PdfcnThemeProvider`, optionally with `theme={…}` from an installed theme preset. Turning the
  tree into PDF bytes is covered in [rendering-bases.md](rendering-bases.md).
- **Known issue [#12](https://github.com/shadcn-labs/pdfcn/issues/12)**: installed files can
  import `@/components/pdf-components`, `@/components/pdf-themes`, and `@/components/professional`,
  which the CLI does not create (they come from `@/registry/types/*` and
  `@/registry/themes/*` in the source). Until #12 is fixed, install a theme item
  (`npx shadcn@latest add @pdfcn/theme-professional`), which writes `types/pdf-components.ts`,
  `types/pdf-themes.ts`, and `lib/pdf-themes/*.ts`, and point those imports at the written files.
  Check the issue first; it may already be resolved.
