/* @jsxImportSource @pdfme/jsx */
import { Document, Page, Stack, Text, Table } from "@pdfme/jsx";

import type { InvoiceClassicData } from "./invoice-classic.types";

const fallbackData: InvoiceClassicData = {
  billTo: {
    address: "456 Client Ave, Suite 2",
    email: "contact@clientcorp.com",
    name: "Client Corp.",
    phone: "+1 (555) 123-4567",
  },
  companyAddress: "Nagpur, IN",
  companyEmail: "hello@pdfcn.app",
  companyName: "pdfcn",
  dueDate: "March 17, 2026",
  invoiceDate: "February 17, 2026",
  invoiceNumber: "INV-2026-001",
  items: [
    { description: "Web Development", quantity: 1, unitPrice: 12_500 },
    { description: "UI/UX Design", quantity: 1, unitPrice: 8750 },
    { description: "Consulting", quantity: 10, unitPrice: 1500 },
  ],
  notes: "Thank you for your business!",
  paymentTerms: {
    dueDate: "March 17, 2026",
    gst: "GSTIN 123456789",
    method: "UPI / Card / Bank Transfer",
  },
  subtitle: "Innovative PDF Solutions",
  summary: {
    subtotal: 36_250,
    tax: 2537.5,
    total: 38_787.5,
  },
};

/**
 * Native pdfme JSX template for the invoice-classic block.
 * Uses pdfme's own JSX runtime via jsxImportSource, not React.
 *
 * Try it in the JSX playground: https://playground.pdfme.com/jsx
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
export const buildInvoiceClassicJsx = (
  data: InvoiceClassicData = fallbackData
) => (
  <Document size="A4" margin={{ x: 16, y: 18 }}>
    <Page>
      <Stack gap={6}>
        <Text size={24}>{`Invoice ${data.invoiceNumber}`}</Text>
        <Text color="#64748b">{`${data.companyName} · ${data.companyEmail}`}</Text>
        <Text>{`Bill to ${data.billTo.name} (${data.billTo.email})`}</Text>
        <Table
          head={["Item", "Qty", "Price"]}
          rows={data.items.map((item) => [
            item.description,
            item.quantity,
            `$${(item.quantity * item.unitPrice).toFixed(2)}`,
          ])}
        />
        <Text>{`Subtotal $${data.summary.subtotal.toFixed(2)} · Tax $${data.summary.tax.toFixed(2)} · Total $${data.summary.total.toFixed(2)}`}</Text>
        {data.notes ? <Text color="#64748b">{data.notes}</Text> : null}
      </Stack>
    </Page>
  </Document>
);
