export type HtmlToPdfAdapter = (html: string) => Promise<Uint8Array>;

/**
 * Generate a PDF buffer from Elements print-ready HTML.
 *
 * Bring your own HTML-to-PDF converter (Puppeteer, Playwright, …) — pdfcn
 * intentionally does not bundle a browser engine:
 *
 * ```ts
 * import puppeteer from "puppeteer";
 * import { InvoiceDocument } from "@/components/pdf/blocks/invoice-classic/invoice-classic";
 * import { generateElementsPdf } from "@/lib/elements-generate";
 * import { renderElementsHtml } from "@/lib/elements-html";
 *
 * const browser = await puppeteer.launch();
 * const pdf = await generateElementsPdf({
 *   html: renderElementsHtml(<InvoiceDocument />),
 *   htmlToPdf: async (html) => {
 *     const page = await browser.newPage();
 *     await page.setContent(html, { waitUntil: "networkidle0" });
 *     const buffer = await page.pdf({ format: "A4", printBackground: true });
 *     await page.close();
 *     return new Uint8Array(buffer);
 *   },
 * });
 * ```
 */
export const generateElementsPdf = async ({
  html,
  htmlToPdf,
}: {
  html: string;
  htmlToPdf?: HtmlToPdfAdapter;
}): Promise<Uint8Array> => {
  if (!htmlToPdf) {
    throw new Error(
      "generateElementsPdf needs an `htmlToPdf` adapter (Puppeteer, Playwright, …). " +
        "Pass one in — see the docstring example. pdfcn does not bundle a browser engine."
    );
  }
  const pdf = await htmlToPdf(html);
  return pdf instanceof Uint8Array ? pdf : new Uint8Array(pdf);
};
