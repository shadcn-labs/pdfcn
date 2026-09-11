import { KeyValue } from "@/registry/bases/takumi/components/key-value/key-value";
import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
import { PageHeader } from "@/registry/bases/takumi/components/page-header/page-header";
import { PdfImage } from "@/registry/bases/takumi/components/pdf-image/pdf-image";
import { Section } from "@/registry/bases/takumi/components/section/section";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/registry/bases/takumi/components/table/table";
import { Text } from "@/registry/bases/takumi/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/takumi/components/theme-provider";
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
  logo: "/favicon.png",
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
  const theme = usePdfcnTheme();

  const styles = {
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box" as const,
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative" as const,
    },
  };

  return (
    <div data-pdf-document title={`Invoice ${data.invoiceNumber}`}>
      <div data-pdf-page="A4" style={styles.page}>
        <PageHeader
          variant="logo-left"
          logo={
            <PdfImage src={data.logo ?? "/favicon.png"} style={{ margin: 0 }} />
          }
          title={data.companyName}
          subtitle={data.subtitle}
          rightText={data.invoiceNumber}
          rightSubText={`Due: ${data.dueDate}`}
          style={{ marginBottom: 0 }}
        />
        <Section noWrap style={{ flexDirection: "row" }}>
          <div style={{ flex: 1, paddingRight: 15 }}>
            <Text
              style={{ fontSize: 9, fontWeight: "bold", marginBottom: 2 }}
              color="mutedForeground"
              transform="uppercase"
              noMargin
            >
              From
            </Text>
            <Text noMargin variant="xs">
              {data.companyName}
            </Text>
            <Text noMargin variant="xs">
              {data.companyAddress}
            </Text>
            <Text noMargin variant="xs">
              {data.companyEmail}
            </Text>
          </div>
          <div style={{ flex: 1, paddingRight: 15 }}>
            <Text
              style={{ fontSize: 9, fontWeight: "bold", marginBottom: 2 }}
              color="mutedForeground"
              transform="uppercase"
              noMargin
            >
              Bill To
            </Text>
            <Text noMargin variant="xs">
              {data.billTo.name}
            </Text>
            <Text noMargin variant="xs">
              {data.billTo.address}
            </Text>
            <Text noMargin variant="xs">
              {data.billTo.email}
            </Text>
          </div>
          <div style={{ flex: 1, paddingRight: 15 }}>
            <Text
              style={{ fontSize: 9, fontWeight: "bold", marginBottom: 2 }}
              color="mutedForeground"
              transform="uppercase"
              noMargin
            >
              Payment Terms
            </Text>
            <Text noMargin variant="xs">
              {data.paymentTerms.method}
            </Text>
            <Text noMargin variant="xs">
              {data.paymentTerms.gst}
            </Text>
            <Text noMargin variant="xs">
              {data.paymentTerms.dueDate}
            </Text>
          </div>
        </Section>
        <Table variant="grid" zebraStripe>
          <TableHeader>
            <TableRow header>
              <TableCell>Description</TableCell>
              <TableCell align="center">QTY</TableCell>
              <TableCell align="center">Rate</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{`${item.quantity}`}</TableCell>
                <TableCell align="center">{`$${item.unitPrice}`}</TableCell>
                <TableCell align="right">{`$${(item.quantity * item.unitPrice).toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Section noWrap style={{ flexDirection: "row", marginTop: 16 }}>
          <div style={{ marginLeft: "auto", width: 220 }}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                {
                  key: "Subtotal",
                  value: `$${data.summary.subtotal.toFixed(2)}`,
                },
                { key: "Tax", value: `$${data.summary.tax.toFixed(2)}` },
                {
                  key: "Total",
                  keyStyle: { fontSize: 12, fontWeight: "bold" },
                  value: `$${data.summary.total.toFixed(2)}`,
                  valueStyle: { fontSize: 12, fontWeight: "bold" },
                },
              ]}
              divided
            />
          </div>
        </Section>
        <PageFooter
          leftText={data.notes}
          rightText="Page 1 of 1"
          sticky
          pagePadding={25}
        />
      </div>
    </div>
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
