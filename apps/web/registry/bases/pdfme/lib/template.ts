import type { Template } from "@pdfme/common";
import type { renderToTemplate as RenderToTemplate } from "@pdfme/jsx";

export interface PdfmeTemplateResult {
  template: Template;
  inputs: Record<string, unknown>[];
}

export interface PdfmeDocumentOptions {
  /**
   * Page size preset, e.g. "A4". Defaults to "A4".
   */
  size?: string;
  margin?: { x?: number; y?: number };
}

/**
 * Convert a pdfcn pdfme React preview tree into a pdfme `Template + inputs`
 * pair via `@pdfme/jsx`'s `renderToTemplate`.
 *
 * The element must be built from `@pdfme/jsx` primitives
 * (`Document`, `Page`, `Stack`, `Text`, `Table`, ...), for example via
 * `buildInvoiceClassicJsx()` in the invoice-classic block. See
 * https://pdfme.com/docs/jsx and the JSX playground at
 * https://playground.pdfme.com/jsx for experimentation.
 */
export const renderPdfmeTemplate = async (
  element: Parameters<typeof RenderToTemplate>[0],
  _options?: PdfmeDocumentOptions
): Promise<PdfmeTemplateResult> => {
  const { renderToTemplate } = await import("@pdfme/jsx");
  const { template, inputs } = await renderToTemplate(element);
  return {
    inputs: inputs as Record<string, unknown>[],
    template,
  };
};

/**
 * Build a minimal pdfme `Template` without JSX for environments where the
 * `@pdfme/jsx` runtime is unavailable. Useful as a fallback in tests.
 */
export const buildBlankPdfmeTemplate = (): Template => ({
  basePdf: { height: 297, padding: [18, 16, 18, 16], width: 210 },
  schemas: [
    [
      {
        content: "Invoice",
        fontSize: 24,
        height: 12,
        name: "title",
        position: { x: 16, y: 18 },
        type: "text",
        width: 178,
      },
    ],
  ],
});
