# Registry and CLI

pdfcn is distributed as a [shadcn registry](https://ui.shadcn.com/docs/registry). The source
index is `apps/web/registry.json` (schema `https://ui.shadcn.com/schema/registry.json`);
`pnpm registry:build` turns it into the JSON files under `apps/web/public/r/` that the CLI
downloads.

## Item shapes

Every item name is `<base>/<item>` except the shared theme items. Copy an existing entry of the
same type and change the names; entries sit next to their siblings (the Takumi block entries
together, the Forme block entries together).

| Kind      | `type`           | Example name            | File `type`          | File `target`                                   |
| --------- | ---------------- | ----------------------- | -------------------- | ----------------------------------------------- |
| Component | `registry:ui`    | `takumi/divider`        | `registry:component` | `components/pdf/<name>/<file>`                  |
| Block     | `registry:block` | `forme/invoice-classic` | `registry:block`     | `components/pdf/blocks/<name>/<file>`           |
| Utils     | `registry:lib`   | `takumi/utils`          | `registry:lib`       | `lib/…` and `components/pdf/theme-provider.tsx` |
| Provider  | `registry:lib`   | `takumi/theme-provider` | `registry:lib`       | `components/pdf/theme-provider.tsx`             |
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
  `resolveColor`, and through it the default theme and shared types) and then name every pdfcn
  component the files import, by folder name (`list`, `key-value`, `keep-together`, …). Keep
  the list in sync when imports change: a missing entry fails the build (see "Building"), an
  unused one installs files nobody imports.
- `description` follows `"<Title> PDF component (<base>)"` or `"<Title> PDF block (<base>)"`.
- `path` is relative to `apps/web`.

## Building

```bash
pnpm registry:build     # from the repo root; runs apps/web/scripts/build-registry.mts
```

The script runs `shadcn build`, then does two things `shadcn build` alone does not:

- **Rewrites imports** in the published JSON from source paths (`@/registry/...`) to install
  targets (`@/components/pdf/text/text`, `@/lib/pdf-primitives`, `@/types/pdf-themes`, …), so
  installed files resolve each other. Edit sources only; the generated JSON is never edited by
  hand.
- **Validates each item's install closure**: everything reachable through `registryDependencies`
  must provide every file an installed file imports, and every npm package it imports must be
  declared. A gap fails the build with `<item>: <file> imports missing <path>` (add the missing
  `@pdfcn/<base>/<component>` to `registryDependencies`) or
  `<item>: <file> requires undeclared package <pkg>` (add it to `dependencies`).

Then:

- It writes `public/r/<base>/<item>.json` and `public/r/registry.json`. Both are committed, and CI
  runs the build again as part of `pnpm build`.
- Run it after the last source edit: the JSON inlines file contents, so an edit made after the
  build leaves the published item stale.
- It rewrites every JSON in `public/r/`. When committed JSON was produced elsewhere (other line
  endings, an older build), `git status` lists files your change never touched; committing them
  would mix unrelated updates into your PR. Keep yours and restore the rest with this skill's
  script:

```bash
scripts/restore-registry-churn.sh receipt     # keeps public/r/*/receipt.json and public/r/registry.json
```

- `scripts/check-registration.sh <name>` then confirms the entry: file paths, every source file
  listed, `registryDependencies` equal to the components the files import (unused entries
  included, which the build does not flag), and generated JSON that matches the current source.

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
- Every install is self-contained: the build validates the dependency closure, and each item
  pulls in `utils`, the default theme, and the shared types. An import that does not resolve
  after `shadcn add` means the item's `registryDependencies` are incomplete; report it on the
  pdfcn repo (the fix is a one-line registry entry, see "Building").
