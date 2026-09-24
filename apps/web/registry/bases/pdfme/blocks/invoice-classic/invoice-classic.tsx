import { PdfImage } from "@/registry/bases/pdfme/components/pdf-image/pdf-image";
import { Section } from "@/registry/bases/pdfme/components/section/section";
import { Stack } from "@/registry/bases/pdfme/components/stack/stack";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/registry/bases/pdfme/components/table/table";
import { Text } from "@/registry/bases/pdfme/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/pdfme/components/theme-provider";
import {
  View,
  StyleSheet,
  Document,
  Page,
} from "@/registry/bases/pdfme/lib/pdf-primitives";
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

  const styles = StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    metaCol: { flex: 1 },
    metaRow: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 16,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      padding: 40,
      paddingBottom: 48,
      position: "relative",
    },
    totalsBox: { width: 220 },
    totalsWrap: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 16,
    },
  });

  return (
    <Document title={`Invoice ${data.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <PdfImage
              src={data.logo ?? "/favicon.png"}
              width={40}
              height={40}
            />
            <Text variant="xl" weight="bold" noMargin>
              {data.companyName}
            </Text>
            <Text variant="xs" color="mutedForeground" noMargin>
              {data.subtitle}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text variant="xl" weight="bold" noMargin>
              {data.invoiceNumber}
            </Text>
            <Text variant="xs" color="mutedForeground" noMargin>
              {`Due: ${data.dueDate}`}
            </Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <View style={styles.metaCol}>
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
          </View>
          <View style={styles.metaCol}>
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
          </View>
          <View style={styles.metaCol}>
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
          </View>
        </View>
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
          <View style={{ marginLeft: "auto", width: 220 }}>
            <Stack gap={4}>
              <Text
                variant="sm"
                noMargin
              >{`Subtotal: $${data.summary.subtotal.toFixed(2)}`}</Text>
              <Text
                variant="sm"
                noMargin
              >{`Tax: $${data.summary.tax.toFixed(2)}`}</Text>
              <Text
                variant="base"
                weight="bold"
                noMargin
              >{`Total: $${data.summary.total.toFixed(2)}`}</Text>
            </Stack>
          </View>
        </Section>
        <View style={styles.totalsWrap}>
          <View style={styles.totalsBox}>
            <Text variant="xs" color="mutedForeground">
              {data.notes}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
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
