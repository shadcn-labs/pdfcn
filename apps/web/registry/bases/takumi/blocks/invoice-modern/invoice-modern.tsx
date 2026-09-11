import { KeyValue } from "@/registry/bases/takumi/components/key-value/key-value";
import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
import { PageHeader } from "@/registry/bases/takumi/components/page-header/page-header";
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

import type { InvoiceModernData } from "./invoice-modern.types";

// Sample data — replace with your own props or data source
const sampleData: InvoiceModernData = {
  billTo: {
    address: "789 Innovation Blvd, Floor 3",
    email: "billing@techstart.com",
    name: "TechStart Solutions",
    phone: "+1 (555) 987-6543",
  },
  companyAddress: "Nagpur, IN",
  companyEmail: "hello@pdfcn.app",
  companyName: "pdfcn",
  dueDate: "March 20, 2026",
  invoiceDate: "February 18, 2026",
  invoiceNumber: "INV-2026-002",
  items: [
    { description: "API Integration", quantity: 1, unitPrice: 15_000 },
    { description: "SEO", quantity: 2, unitPrice: 5500 },
    { description: "Security Audit", quantity: 1, unitPrice: 7200 },
  ],
  notes: "Payment terms: Net 30 days. Thank you for your business!",
  paymentTerms: {
    dueDate: "March 20, 2026",
    gst: "GSTIN 123456789",
    method: "Wire Transfer / Bank Account",
  },
  subtitle: "Innovative PDF Solutions",
  summary: {
    subtotal: 33_200,
    tax: 2324,
    total: 35_524,
  },
};

const InvoiceModernContent = ({ data }: { data: InvoiceModernData }) => {
  const theme = usePdfcnTheme();

  const styles = {
    dividerCol: {
      backgroundColor: theme.colors.border,
      marginRight: 12,
      width: 1,
    },
    metaCol: {
      flex: 1,
      paddingRight: 12,
    },
    metaLabel: {
      color: theme.colors.mutedForeground,
      fontSize: 8,
      fontWeight: "bold",
      letterSpacing: 0.5,
      marginBottom: 3,
      textTransform: "uppercase",
    },
    metaRow: {
      flexDirection: "row" as const,
      marginBottom: theme.spacing.sectionGap,
    },
    metaValue: {
      color: theme.colors.foreground,
      fontSize: 9,
    },
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
          variant="branded"
          title={data.companyName}
          subtitle={`${data.subtitle}  ·  ${data.companyAddress}  ·  ${data.companyEmail}`}
        />
        <div style={styles.metaRow}>
          <div style={styles.metaCol}>
            <Text style={styles.metaLabel} noMargin>
              Invoice Number
            </Text>
            <Text
              style={{ ...styles.metaValue, fontSize: 11, fontWeight: "bold" }}
              noMargin
            >
              {data.invoiceNumber}
            </Text>
          </div>
          <div style={styles.metaCol}>
            <Text style={styles.metaLabel} noMargin>
              Invoice Date
            </Text>
            <Text style={styles.metaValue} noMargin>
              {data.invoiceDate}
            </Text>
          </div>
          <div style={styles.metaCol}>
            <Text style={styles.metaLabel} noMargin>
              Due Date
            </Text>
            <Text style={styles.metaValue} noMargin>
              {data.dueDate}
            </Text>
          </div>
          <div style={styles.dividerCol} />
          <div style={{ flex: 2 }}>
            <Text style={styles.metaLabel} noMargin>
              Billed To
            </Text>
            <Text style={{ ...styles.metaValue, fontWeight: "bold" }} noMargin>
              {data.billTo.name}
            </Text>
            <Text
              style={{
                ...styles.metaValue,
                color: theme.colors.mutedForeground,
              }}
              noMargin
            >
              {data.billTo.address}
            </Text>
            <Text
              style={{
                ...styles.metaValue,
                color: theme.colors.mutedForeground,
              }}
              noMargin
            >
              {data.billTo.email}
            </Text>
            <Text
              style={{
                ...styles.metaValue,
                color: theme.colors.mutedForeground,
              }}
              noMargin
            >
              {data.billTo.phone}
            </Text>
          </div>
        </div>
        <Table variant="primary-header">
          <TableHeader>
            <TableRow header>
              <TableCell>Description</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{`${item.quantity}`}</TableCell>
                <TableCell align="right">{`$${item.unitPrice.toLocaleString()}`}</TableCell>
                <TableCell align="right">{`$${(item.quantity * item.unitPrice).toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Section noWrap style={{ flexDirection: "row", marginTop: 16 }}>
          <div style={{ flex: 1, paddingRight: 20 }}>
            <Text style={styles.metaLabel} noMargin>
              Payment Method
            </Text>
            <Text variant="xs" noMargin>
              {data.paymentTerms.method}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.paymentTerms.gst}
            </Text>
          </div>
          <div style={{ width: 220 }}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                {
                  key: "Subtotal",
                  value: `$${data.summary.subtotal.toFixed(2)}`,
                },
                { key: "Tax (7%)", value: `$${data.summary.tax.toFixed(2)}` },
                {
                  key: "Total Due",
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

export const InvoiceModernDocument = ({
  theme,
  data = sampleData,
}: {
  theme?: PdfcnTheme;
  data?: InvoiceModernData;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <InvoiceModernContent data={data} />
  </PdfcnThemeProvider>
);
