# Rendering bases

A **base** is the PDF engine an item targets. pdfcn keeps one implementation per base with the
same file names, exports, and props, so users switch engines by switching the registry
namespace (`@pdfcn/takumi/...` or `@pdfcn/forme/...`). The list of bases lives in
`apps/web/registry/bases.ts`.

## At a glance

|                               | Takumi                                                                           | Forme                                                                                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm dependencies              | `takumi-pdf`, `@takumi-rs/helpers`                                               | `@formepdf/react`, `@formepdf/core`                                                                                                                                                                                  |
| Engine                        | JSX laid out as paged HTML/CSS in Takumi's WASM renderer, selectable text        | React PDF primitives laid out by Forme's WASM engine, browser and server                                                                                                                                             |
| Primitives in components      | `@/registry/bases/takumi/lib/pdf-primitives` (div-based `View`, `Text`, …)       | `@/registry/bases/forme/lib/pdf-primitives` (wraps `@formepdf/react`)                                                                                                                                                |
| `Document` / `Page` in blocks | `@/registry/bases/takumi/lib/pdf-primitives`                                     | `@formepdf/react`                                                                                                                                                                                                    |
| Page size and margins         | Set by render options; `Page size` is ignored, so blocks pad the page themselves | `<Page size="A4" margin={{ top, right, bottom, left }}>`                                                                                                                                                             |
| Keep a group on one page      | `KeepTogether` or `View wrap={false}` → CSS `breakInside: "avoid"`               | `KeepTogether` or `View wrap={false}`; `Section noWrap` also works                                                                                                                                                   |
| `Section noWrap`              | Declared but not implemented                                                     | Implemented (`wrap={false}`)                                                                                                                                                                                         |
| Style typing                  | `Style = Record<string, unknown>`; no casts needed                               | Strict types: components cast `StyleSheet.create({...} as Record<string, Style>)`; style arrays and a block's page `View` style take `as never`; blocks using `StyleSheet` from `@formepdf/react` need no other cast |
| Units                         | Points; primitives convert lengths to CSS px (`pointToCssPixel`, 96/72)          | Points                                                                                                                                                                                                               |

## Takumi

**Page scaffold for blocks.** Because the Takumi `Page` is a styled `div`, a block gives it the
A4 height and page padding, and pins the footer inside it:

```tsx
const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.background,
    boxSizing: "border-box",
    minHeight: 841,
    padding: theme.spacing.page.marginTop,
    paddingBottom: theme.spacing.page.marginBottom,
    position: "relative",
  },
});

<Page size="A4" style={styles.page}>
  {/* content */}
  <PageFooter leftText="…" rightText="Page 1 of 1" sticky pagePadding={25} />
</Page>;
```

`sticky` positions the footer absolutely at the page bottom, which is why the page needs
`position: "relative"`. Blocks must also be listed in `BLOCK_NAMES` in
`apps/web/examples/preview-config.tsx`: listed names render with margin 0 (the block pads itself),
everything else gets a component preview margin. Non-A4 items (tickets, labels) add a
`COMPONENT_SIZES` entry in the same file.

**Pagination.** Content taller than a page flows onto extra pages, and an overfull explicit
`<Page>` can leave a blank or footer-only page after it. Keep each explicit page's content under
the page height and check the page count after rendering.

**Rendering to bytes** (as in `apps/web/app/api/pdf/takumi/route.tsx`):

```tsx
import { render } from "takumi-pdf/next";

const pdf = await render(<InvoiceDocument />, { margin: 0, size: "a4" });
```

## Forme

**Page scaffold for blocks.** Margins go on the `Page`, the footer comes first so Forme can
repeat it, and content sits in a `View`:

```tsx
import { Document, Page, StyleSheet, View } from "@formepdf/react";

<Page
  margin={{
    bottom: theme.spacing.page.marginBottom,
    left: theme.spacing.page.marginLeft,
    right: theme.spacing.page.marginRight,
    top: theme.spacing.page.marginTop,
  }}
  size="A4"
>
  <PageFooter leftText="…" rightText="Page 1 of 1" sticky pagePadding={25} />
  <View style={styles.page as never}>{/* content */}</View>
</Page>;
```

**Pagination.** An unbreakable group (`KeepTogether`, `wrap={false}`) that does not fit jumps to
the next page as a whole, which can leave a large gap and add a page. Wrap small groups only, and
let long lists and tables flow.

**Layout.** Forme can mis-measure text in children sized with percentage widths, producing
unexpected wraps or tall gaps. Size columns with `flex` ratios (for example `flex: 2` / `flex: 1`)
instead.

**Rendering to bytes** (as in `apps/web/app/api/pdf/forme/route.tsx`):

```tsx
import { renderPdf } from "@formepdf/core";
import { serialize } from "@formepdf/react";

const bytes = await renderPdf(JSON.stringify(serialize(<InvoiceDocument />)));
```

Serialize in the same module that builds the tree so Forme sees one copy of its primitives.

## Choosing a base (consumer question)

The pdfcn API is the same on both, so choose by runtime and engine fit: Takumi when you want
HTML/CSS-style layout and Tailwind-like styling rendered through `takumi-pdf`; Forme when you
want a React PDF component model that renders in the browser as well as on the server. Existing
code in the user's app, or an engine already in their dependencies, is the strongest signal.

## Proposed bases

| Base             | Issue                                                                              | Status on `main`                            |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| pdfme            | [#13](https://github.com/shadcn-labs/pdfcn/issues/13), `@pdfme/jsx` JSX primitives | Not merged; implementation proposed in a PR |
| Unlayer Elements | [#14](https://github.com/shadcn-labs/pdfcn/issues/14), `<Document>` mode           | Not merged; implementation proposed in a PR |

Adding a base touches: `registry/bases.ts` (`BASES`), `registry/bases/<base>/registry.ts`, a full
`registry/bases/<base>/{lib,components,blocks}` tree, `examples/<base>/` plus the `demos` map,
an `app/api/pdf/<base>/route.tsx`, `content/docs/{components,blocks,theming}/<base>/`, and
`<base>/...` entries in `registry.json`. Check the open PR for the base before starting, and
discuss on its issue first: a new base is a non-trivial change.
