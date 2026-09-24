import type { Template } from "@pdfme/common";
import { generate } from "@pdfme/generator";

import { getPdfmePlugins } from "@/registry/bases/pdfme/lib/plugins";

/**
 * Generate a PDF buffer from a pdfme `Template + inputs` pair.
 *
 * ```ts
 * import { buildInvoiceClassicJsx } from "@/registry/bases/pdfme/blocks/invoice-classic/invoice-classic.pdfme";
 * import { generatePdfmePdf } from "@/registry/bases/pdfme/lib/generate";
 * import { renderPdfmeTemplate } from "@/registry/bases/pdfme/lib/template";
 *
 * const { template, inputs } = await renderPdfmeTemplate(buildInvoiceClassicJsx());
 * const pdf = await generatePdfmePdf({ template, inputs });
 * ```
 */
export const generatePdfmePdf = async ({
  template,
  inputs,
}: {
  template: Template;
  inputs: Record<string, unknown>[];
}): Promise<Uint8Array> => {
  const pdf = await generate({
    inputs,
    plugins: getPdfmePlugins(),
    template,
  });
  return pdf instanceof Uint8Array ? pdf : new Uint8Array(pdf);
};
