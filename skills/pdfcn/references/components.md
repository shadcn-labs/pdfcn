# Components

A **component** is a reusable building block (text, table, badge, section, page header, …)
published as a `registry:ui` item. Blocks compose them. Before writing a new one, list what
exists: `ls apps/web/registry/bases/takumi/components`. Extending an existing component beats
adding a near-duplicate.

## Files

```
apps/web/registry/bases/<base>/components/<name>/
├── <name>.tsx          # component + exported prop types (required)
├── <name>.types.ts     # optional, when the types are large (see list/)
└── <name>.styles.ts    # optional, when styles are large (see list/)
```

Create the same folder, file names, exports, and props under both `takumi` and `forme`.
`divider/` is a compact reference for the whole pattern.

## Template (Takumi)

```tsx
import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  Text as PDFText,
  StyleSheet,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type StatVariant = "default" | "emphasis";

/**
 * Label and value pair for headline numbers.
 * Props - `label` | `value` | `variant` | `color` | `style`
 * @see {@link StatProps}
 */
export interface StatProps extends Omit<PDFComponentProps, "children"> {
  label: string;
  value: string;
  /**
   * @default 'default'
   */
  variant?: StatVariant;
  color?: string;
}

const createStatStyles = (t: PdfcnTheme) =>
  StyleSheet.create({
    container: { marginBottom: t.spacing.componentGap },
    emphasis: { fontSize: t.primitives.typography.xl },
    label: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      textTransform: "uppercase",
    },
    value: {
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.base,
      fontWeight: t.primitives.fontWeights.semibold,
    },
  });

export const Stat = ({
  label,
  value,
  variant = "default",
  color,
  style,
}: StatProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createStatStyles(theme), [theme]);

  const valueStyles: Style[] = [styles.value];
  if (variant === "emphasis") {
    valueStyles.push(styles.emphasis);
  }
  if (color) {
    valueStyles.push({ color: resolveColor(color, theme.colors) });
  }

  const containerStyles: Style[] = [styles.container];
  if (style) {
    containerStyles.push(...[style].flat());
  }

  return (
    <View style={containerStyles}>
      <PDFText style={styles.label}>{label}</PDFText>
      <PDFText style={valueStyles}>{value}</PDFText>
    </View>
  );
};
```

What the template encodes:

- The JSDoc block has a one-line summary, a `Props - ...` line listing every prop, and `@see`; the
  docs and tooling read it.
- Props extend `PDFComponentProps` (`style`, `children`), with `Omit<..., "children">` when the
  component takes none. Defaults are documented with `@default` and applied in the signature.
- Styles come from a `create<Name>Styles(theme)` factory wrapped in `useSafeMemo`. Tokens come
  from the theme. Colour props go through `resolveColor`, so users can pass a token name
  (`"primary"`) or a literal colour.
- Variants map to style entries pushed onto an array, and the caller's `style` is pushed last so
  it wins.
- Object keys are sorted alphabetically (the linter's `sort-keys`); `pnpm fix` sorts many of them.

## Forme differences

Copy the Takumi file and change only what the engine needs:

- Imports: `@/registry/bases/forme/...` instead of `@/registry/bases/takumi/...`.
- Style factory: `StyleSheet.create({ ... } as Record<string, Style>)`.
- Style arrays: pass them as `style={containerStyles as never}` (Forme's prop types reject
  `Style[]`); single objects that come from `StyleSheet.create` need no cast.
- Fixed-position content: use `Fixed` from the Forme primitives or `MaybeFixed`
  (`@/registry/bases/forme/lib/maybe-fixed`), as `page-footer` does.

## Theme tokens

`PdfcnTheme` is defined in `apps/web/registry/types/pdf-themes.ts`. The ones components use most:

| Path                                                                     | Holds                                                                                                                                                   |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `colors.*`                                                               | `foreground`, `background`, `muted`, `mutedForeground`, `primary`, `primaryForeground`, `border`, `accent`, `destructive`, `success`, `warning`, `info` |
| `typography.body` / `typography.heading`                                 | `fontFamily`, `fontSize`, `lineHeight`, …                                                                                                               |
| `spacing.page.margin{Top,Right,Bottom,Left}`                             | Page margins                                                                                                                                            |
| `spacing.sectionGap` / `componentGap` / `paragraphGap`                   | Vertical rhythm between sections, components, and paragraphs                                                                                            |
| `primitives.typography.{xs,sm,base,lg,xl,…}`                             | Font size scale in points                                                                                                                               |
| `primitives.spacing[n]`                                                  | Spacing scale (`spacing[4]` and so on)                                                                                                                  |
| `primitives.fontWeights`, `borderRadius`, `letterSpacing`, `lineHeights` | Remaining scales                                                                                                                                        |

## Registration checklist

A component is done when every item below holds for **both** bases:

- [ ] Source files under `apps/web/registry/bases/<base>/components/<name>/`.
- [ ] `apps/web/registry.json` entry (see [registry.md](registry.md)): `name: "<base>/<name>"`,
      `type: "registry:ui"`, each file with `type: "registry:component"` and
      `target: "components/pdf/<name>/<file>"`, the base's `dependencies`, and
      `registryDependencies` containing `@pdfcn/<base>/utils` plus any other pdfcn component it
      imports.
- [ ] Example `apps/web/examples/<base>/<name>.tsx`, registered in `examples/__index__.ts` (an
      import plus a key in `demos.<base>`, both in alphabetical order).
- [ ] Takumi preview geometry: add a `COMPONENT_MARGINS` or `COMPONENT_SIZES` entry in
      `examples/preview-config.tsx` only if the default A4 with a 40pt margin does not suit it.
- [ ] Docs `apps/web/content/docs/components/<base>/<name>.mdx` (copy `divider.mdx`: preview,
      CLI/manual install tabs, usage, API reference table) and the name added to that folder's
      `meta.json`.
- [ ] `pnpm registry:build` output committed: `public/r/<base>/<name>.json` and
      `public/r/registry.json`.

### Example file

```tsx
import { Stat } from "@/registry/bases/takumi/components/stat/stat";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import {
  Document,
  Page,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";

const DemoBody = () => (
  <View>
    <Stat label="Revenue" value="$48,200" variant="emphasis" />
    <Stat label="Invoices sent" value="128" />
  </View>
);

const Demo = () => (
  <Document>
    <Page size="A4">
      <PdfcnThemeProvider>
        <DemoBody />
      </PdfcnThemeProvider>
    </Page>
  </Document>
);

export default Demo;
```

The Forme example imports `Document`, `Page`, and `View` from `@formepdf/react`, sets
`<Page size="A4" margin={30}>`, and existing examples skip `PdfcnThemeProvider` because the
default theme (professional) applies without it. Examples are called by the PDF route on the
server, so they take no props and carry no `"use client"` directive.
