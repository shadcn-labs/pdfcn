# Themes

A **theme** is a `PdfcnTheme` object (colours, typography, spacing, page, primitive scales)
defined in `apps/web/registry/types/pdf-themes.ts`. Components read it through
`usePdfcnTheme()`; the presets live in `apps/web/registry/themes/<name>.ts` and are listed in
`apps/web/registry/themes.ts`. The same theme objects serve both bases.

## Apply a theme (consumer)

```bash
npx shadcn@latest add @pdfcn/theme-elegant    # writes lib/pdf-themes/elegant.ts and the theme types
```

Pass it to a block, or to the provider around your own components:

```tsx
import { elegantTheme } from "@/lib/pdf-themes/elegant";

<InvoiceClassicDocument theme={elegantTheme} />;

<PdfcnThemeProvider theme={elegantTheme}>
  <MyDocumentBody />
</PdfcnThemeProvider>;
```

To adjust a preset instead of writing one, spread it and override only what changes:

```tsx
const brandTheme = {
  ...professionalTheme,
  colors: { ...professionalTheme.colors, primary: "#0f766e" },
};
```

Write colour values as hex strings, as every preset does; the theming docs list `oklch` as
unsupported.

## Add a theme preset (contributor)

1. **Preset file** `apps/web/registry/themes/<name>.ts`: export `<name>Theme: PdfcnTheme`, reuse
   `defaultPrimitives` from `./primitives`, set `name: "<name>"`, and open with a JSDoc line
   describing its character and intended use (copy `elegant.ts` for the shape). Keys stay sorted.
2. **Preset list** `apps/web/registry/themes.ts`: import it, re-export it, and add it to
   `themePresets` in alphabetical order. `THEMES` and `THEME_NAMES` derive from that map, so the
   docs theme picker and previews, the WebMCP theme tools, and `registry/config.ts` pick it up
   automatically.
3. **Registry item** in `apps/web/registry.json`: copy a `theme-*` entry (`type: "registry:theme"`,
   the preset file plus `primitives.ts`, `types/pdf-themes.ts`, and `types/pdf-components.ts`,
   targets under `lib/pdf-themes/` and `types/`), renamed to `theme-<name>`.
4. **Docs** `apps/web/content/docs/themes/<name>.mdx`, copied from a sibling (a `ComponentPreview`
   of an existing block with `theme={<name>Theme}`, install tabs, usage), and the name added to
   `content/docs/themes/meta.json`.
5. **Build and check**: `pnpm registry:build` writes `public/r/theme-<name>.json`; restore the
   rest with `scripts/restore-registry-churn.sh theme-<name>`; then `pnpm check` and
   `pnpm typecheck`.

The step is done when `/docs/themes/<name>` shows the preview in the new colours on a restarted
dev server, and `public/r/theme-<name>.json` is committed alongside the source.
