import {
  renderToHtml,
  renderToHtmlParts,
  renderToJson,
} from "@unlayer/react-elements";
import type { ReactElement } from "react";

export interface ElementsHtmlOptions {
  title?: string;
  fonts?: { url: string }[];
}

export interface ElementsPrintOptions {
  margin?: string;
  size?: string;
}

/**
 * Render an Elements `<Document>` tree to a complete print-ready HTML
 * document (no React hydration markers). Pass the result to any HTML-to-PDF
 * library (Puppeteer, Playwright, wkhtmltopdf).
 *
 * ```ts
 * import { InvoiceDocument } from "@/components/pdf/blocks/invoice-classic/invoice-classic";
 * import { renderElementsHtml } from "@/lib/elements-html";
 *
 * const html = renderElementsHtml(<InvoiceDocument />, { title: "Invoice" });
 * ```
 */
export const renderElementsHtml = (
  element: ReactElement,
  options?: ElementsHtmlOptions
): string => renderToHtml(element, options);

/**
 * Render to `{ head, body, css, js, tags }` parts for custom document shells
 * (existing page templates, ESP templates, iframe `srcdoc`, CSS inlining).
 */
export const renderElementsHtmlParts = (element: ReactElement) =>
  renderToHtmlParts(element);

/**
 * Export design JSON for visual-editor round-tripping (Unlayer builder).
 */
export const renderElementsJson = (element: ReactElement) =>
  renderToJson(element);

/**
 * Print CSS helpers for PDF output: `@page` margins/size, page-break
 * utilities, and header/footer positioning. Inject into the HTML shell or
 * your converter's `print` options.
 */
export const getElementsPrintCss = (options?: ElementsPrintOptions): string => {
  const margin = options?.margin ?? "12mm 14mm";
  const size = options?.size ?? "A4 portrait";
  return [
    `@page { size: ${size}; margin: ${margin}; }`,
    ".pdfcn-page-break { break-before: page; }",
    ".pdfcn-avoid-break { break-inside: avoid; }",
    ".pdfcn-doc-header { position: running(header); }",
    ".pdfcn-doc-footer { position: running(footer); }",
    "@media print { .pdfcn-no-print { display: none; } }",
  ].join("\n");
};
