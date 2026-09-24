/**
 * Shared types for making pdfcn Elements wrappers transparent to Unlayer's
 * `renderToHtml` / `renderToJson`: Unlayer resolves items via a
 * `__unlayerRender` static (not normal React rendering), and matches layout
 * children by `displayName`/`name`.
 */

export interface UnlayerRenderProps extends Record<string, unknown> {
  children?: React.ReactNode;
}

export interface UnlayerRenderStatics {
  __unlayerRender: (
    props: UnlayerRenderProps
  ) => { props: { dangerouslySetInnerHTML?: { __html: string } } } | null;
  __unlayerItemConfig: unknown;
}
