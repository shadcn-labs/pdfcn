import { ColumnLayouts } from "@unlayer/react-elements";

import { PDFButton } from "@/registry/bases/elements/components/button/button";
import { PDFDivider } from "@/registry/bases/elements/components/divider/divider";
import { PDFDocument } from "@/registry/bases/elements/components/document/document";
import { PDFHeading } from "@/registry/bases/elements/components/heading/heading";
import { PDFParagraph } from "@/registry/bases/elements/components/paragraph/paragraph";
import { PDFImage } from "@/registry/bases/elements/components/pdf-image/pdf-image";
import {
  PDFColumn,
  PDFRow,
} from "@/registry/bases/elements/components/row/row";
import { PDFTable } from "@/registry/bases/elements/components/table/table";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/elements/components/theme-provider";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { InvoiceClassicData } from "./invoice-classic.types";

// Sample data — replace with your own props or data source
const sampleData: InvoiceClassicData = {
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

const InvoiceClassicContent = ({ data }: { data: InvoiceClassicData }) => {
  usePdfcnTheme();
  return (
    <PDFDocument backgroundColor="#ffffff" contentWidth="800px">
      <PDFRow layout={ColumnLayouts.OneColumn} padding="20px 40px">
        <PDFColumn>
          <PDFImage src="/favicon.png" altText="Logo" textAlign="left" />
          <PDFHeading fontSize="24px" fontWeight={700}>
            {`Invoice ${data.invoiceNumber}`}
          </PDFHeading>
          <PDFParagraph
            color="#64748b"
            fontSize="14px"
            html={`${data.companyName} · ${data.companyEmail}`}
          />
        </PDFColumn>
      </PDFRow>
      <PDFRow layout={ColumnLayouts.TwoEqual} padding="20px 40px">
        <PDFColumn>
          <PDFHeading fontSize="16px" fontWeight={600} level="h3">
            Bill To
          </PDFHeading>
          <PDFParagraph
            fontSize="14px"
            html={`${data.billTo.name}<br/>${data.billTo.address}<br/>${data.billTo.email}`}
          />
        </PDFColumn>
        <PDFColumn>
          <PDFHeading fontSize="16px" fontWeight={600} level="h3">
            Payment Terms
          </PDFHeading>
          <PDFParagraph
            fontSize="14px"
            html={`${data.paymentTerms.method}<br/>${data.paymentTerms.gst}<br/>Due ${data.paymentTerms.dueDate}`}
          />
        </PDFColumn>
      </PDFRow>
      <PDFRow layout={ColumnLayouts.OneColumn} padding="20px 40px">
        <PDFColumn>
          <PDFTable
            data={data.items.map((item) => [
              item.description,
              `${item.quantity}`,
              `$${(item.quantity * item.unitPrice).toFixed(2)}`,
            ])}
            headers={["Item", "Qty", "Price"]}
          />
        </PDFColumn>
      </PDFRow>
      <PDFRow layout={ColumnLayouts.TwoEqual} padding="20px 40px">
        <PDFColumn>
          <PDFParagraph color="#64748b" fontSize="14px">
            {data.notes ?? ""}
          </PDFParagraph>
        </PDFColumn>
        <PDFColumn>
          <PDFHeading fontSize="16px" fontWeight={600} level="h3">
            Total
          </PDFHeading>
          <PDFParagraph
            fontSize="18px"
            html={`<b>$${data.summary.total.toFixed(2)}</b>`}
          />
          <PDFButton backgroundColor="#0879A1" color="#ffffff">
            Pay Now
          </PDFButton>
        </PDFColumn>
      </PDFRow>
      <PDFRow layout={ColumnLayouts.OneColumn} padding="20px 40px">
        <PDFColumn>
          <PDFDivider />
          <PDFParagraph
            color="#94a3b8"
            fontSize="12px"
            textAlign="center"
            html={`${data.companyName} · ${data.companyAddress}`}
          />
        </PDFColumn>
      </PDFRow>
    </PDFDocument>
  );
};

export const InvoiceClassicDocument = ({
  theme,
  data = sampleData,
}: {
  theme?: PdfcnTheme;
  data?: InvoiceClassicData;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <InvoiceClassicContent data={data} />
  </PdfcnThemeProvider>
);
