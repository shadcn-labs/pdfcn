# Blocks

A **block** is a complete, print-ready document (invoice, report, packing slip, lesson plan, …)
composed from pdfcn components and published as a `registry:block` item. List the existing ones
with `ls apps/web/registry/bases/takumi/blocks` and open the nearest match before writing:

| Reference block   | Shows                                                                      |
| ----------------- | -------------------------------------------------------------------------- |
| `invoice-classic` | The house style: monochrome, header, parties, grid table, totals           |
| `work-order`      | Two tables, totals with `KeyValue`, signature block, status badges         |
| `meeting-minutes` | Two explicit pages, flat sections, badges inside a table                   |
| `lesson-plan`     | A 4-column grid shared by every row, fixed-width list markers, ruled lines |
| `report-*`        | A shared `report-layout.tsx` + `report.types.ts` reused by several blocks  |

## Files

```
apps/web/registry/bases/<base>/blocks/<name>/
├── <name>.tsx        # sample data, content, exported <Name>Document
└── <name>.types.ts   # <Name>Props and nested types
```

When an issue specifies the props interface, copy it verbatim into `<name>.types.ts`, including
fields such as `accentColor` and `renderingBase`. Name it `<Name>Props`. Add extra fields only as
optional, and only when a section the issue asks for needs them.

## Skeleton

```tsx
// …component imports from @/registry/bases/takumi/components/<folder>/<file>
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  Document,
  Page,
  StyleSheet,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { ReceiptProps } from "./receipt.types";

// Sample data — replace with your own props or data source
const sampleData: ReceiptProps = {
  // keys sorted alphabetically; realistic values taken from the issue's example
};

const ReceiptContent = ({ data }: { data: ReceiptProps }) => {
  const theme = usePdfcnTheme();
  const styles = StyleSheet.create({
    /* page, label, row, … (sorted keys) */
  });

  return <Document title={`Receipt ${data.number}`}>{/* pages */}</Document>;
};

export const ReceiptDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: ReceiptProps;
} & Partial<ReceiptProps>) => (
  <PdfcnThemeProvider theme={theme}>
    <ReceiptContent data={{ ...sampleData, ...data, ...props }} />
  </PdfcnThemeProvider>
);
```

- The export is `<Name>Document`. It renders with no props (the docs preview does exactly that)
  and accepts both flat props, as issue examples usually show (`<ReceiptDocument total={…} />`),
  and `data={…}`.
- `<Name>Content` is the provider's direct child, which is what lets `usePdfcnTheme()` see the
  theme passed in.
- Take the page scaffold (Takumi page style with `minHeight: 841`, or the Forme `margin` +
  footer-first layout) from [rendering-bases.md](rendering-bases.md).
- Keys in lists come from the data (`key={item.sku}`, `key={item.label}`); build fixed arrays of
  keys for purely decorative repeats such as ruled lines.

## Layout rules

- **Monochrome**: dark title from `PageHeader` with no `titleColor`, the accent colour used once
  on a small detail (`Section variant="highlight"` or `"callout"` border, a label), everything
  else in `foreground` and `mutedForeground`.
- **Section labels**: a small helper renders every label the same way:
  `<Text style={{ fontSize: 9, fontWeight: "bold", marginBottom: 4 }} color="mutedForeground" transform="uppercase" noMargin>`.
- **One type scale**: body text `variant="xs"` (10pt) or `"sm"` (12pt) throughout, `noMargin` on
  `Text` inside tight layouts, and vertical rhythm from one `marginBottom` value between blocks.
- **Grid**: columns in a row use `flex` ratios so they line up with the rows above and below
  (for example four `flex: 1` info cells above a `flex: 2 / 1 / 1` row puts the second and third
  columns on the same vertical lines).
- **Lists**: `PdfList` takes `items` as `ListItem[]` objects (`{ text }`), and its body font is
  larger than `xs`. When list text must match surrounding `xs` text, render rows yourself: a
  fixed-width marker `View` (`width: 12`) next to a `flex: 1` `View` holding the text, which also
  hang-indents wrapped lines.
- **Tables**: `Table variant="grid" zebraStripe`; give short columns a fixed `TableCell width`
  (in points) on both header and body cells and let the main text column flex.
- **Totals**: `KeyValue` with `divided` and a bold last row, right-aligned in a fixed-width `View`.
- **Pages**: fit on one page when the sample allows. For longer documents, split into explicit
  `<Page>`s by meaning (for example plan on page 1, assessment on page 2), each with its own
  footer, rather than letting a table or section break arbitrarily.

## Component cheat sheet

Import each from `@/registry/bases/<base>/components/<folder>/<file>`. Props below are the ones
blocks use; check the component's `Props - ...` JSDoc line for the rest.

| Component (folder)                                                     | Useful props                                                                                                                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PageHeader` (`page-header`)                                           | `title`, `subtitle`, `rightText`, `rightSubText`, `variant` (`simple`, `logo-left`, `logo-right`, `two-column`, `centered`, `minimal`, `branded`), `logo`, `marginBottom`             |
| `PageFooter` (`page-footer`)                                           | `leftText`, `centerText`, `rightText`, `variant` (`simple`, `three-column`, …), `sticky`, `pagePadding`                                                                               |
| `Section` (`section`)                                                  | `spacing` (`none`, `sm` = 16pt top and bottom, `md`, `lg`, `xl`), `padding` (`none`, `sm`, `md`, `lg`), `variant` (`default`, `callout`, `highlight`, `card`), `accentColor`, `style` |
| `Text` (`text`)                                                        | `variant` (`xs` … `3xl`), `weight`, `color` (token or colour), `transform`, `align`, `italic`, `noMargin`                                                                             |
| `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` (`table`) | `Table variant` (`grid`, `line`, `striped`, `compact`, …), `zebraStripe`; `TableRow header`; `TableCell width`, `align`                                                               |
| `KeyValue` (`key-value`)                                               | `items: { key, value, keyStyle?, valueStyle? }[]`, `size`, `divided`, `dividerThickness`                                                                                              |
| `Badge` (`badge`)                                                      | `label`, `variant` (`default`, `primary`, `success`, `warning`, `destructive`, `info`, `outline`), `size`                                                                             |
| `PdfList` (`list`)                                                     | `items: { text, description?, checked?, children? }[]`, `variant` (`bullet`, `numbered`, `checklist`, …), `gap`                                                                       |
| `KeepTogether` (`keep-together`)                                       | `children`, `style`: keeps its children on one page                                                                                                                                   |
| `PdfSignatureBlock` (`signature`)                                      | `variant` (`single`, `double`, `inline`), `signers: { label?, name?, title?, date? }[]`                                                                                               |
| `PdfImage` (`pdf-image`)                                               | `src`, `variant`, `width`, `height`, `fit`                                                                                                                                            |

Section margins do not collapse: two `spacing="sm"` sections sit 32pt apart. `highlight` and
`card` add 16pt inner padding; `padding="sm"` brings it to 12pt.

## Registration checklist

A block is done when every item below holds for **both** bases:

- [ ] `<name>.tsx` and `<name>.types.ts` under `apps/web/registry/bases/<base>/blocks/<name>/`.
- [ ] `apps/web/registry.json` entry: `name: "<base>/<name>"`, `type: "registry:block"`, both
      files with `type: "registry:block"` and `target: "components/pdf/blocks/<name>/<file>"`, the
      base's `dependencies`, and `registryDependencies` listing `@pdfcn/<base>/utils` plus every
      pdfcn component the block imports (and nothing it no longer imports).
- [ ] Example `apps/web/examples/<base>/<name>.tsx`:
      `const Demo = () => <NameDocument />; export default Demo;`
- [ ] `apps/web/examples/__index__.ts`: the import and the `demos.<base>` key, alphabetical.
- [ ] `apps/web/examples/preview-config.tsx`: the name added to `BLOCK_NAMES` (plus
      `COMPONENT_SIZES` for non-A4 documents).
- [ ] `apps/web/components/web-mcp/pdf-tool.tsx`: the name added to `BLOCK_NAMES`.
- [ ] Docs `apps/web/content/docs/blocks/<base>/<name>.mdx`, copied from a sibling block page
      (preview, CLI/manual install tabs listing the block's `.tsx` and `.types.ts`, usage with the
      issue's example, props table), and the name added to that folder's `meta.json`.
- [ ] `pnpm registry:build` output committed: `public/r/<base>/<name>.json` and
      `public/r/registry.json`.
- [ ] Render check passed on both bases (see [commands.md](commands.md)).
