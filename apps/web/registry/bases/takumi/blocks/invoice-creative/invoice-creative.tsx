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

import type { InvoiceCreativeData } from "./invoice-creative.types";

const sampleData: InvoiceCreativeData = {
  billTo: {
    address: "250 Design District, Loft 5",
    email: "studio@creativeagency.co",
    name: "Creative Agency Co.",
    phone: "+1 (555) 321-7654",
  },
  companyAddress: "Nagpur, IN · hello@pdfcn.app",
  companyName: "pdfcn",
  dueDate: "March 26, 2026",
  invoiceDate: "February 24, 2026",
  invoiceNumber: "INV-2026-005",
  items: [
    { description: "Brand Identity Design", quantity: 1, unitPrice: 8500 },
    {
      description: "Marketing Collateral Package",
      quantity: 1,
      unitPrice: 4200,
    },
    {
      description: "Social Media Assets (per set)",
      quantity: 4,
      unitPrice: 750,
    },
    { description: "Motion Graphics (30s)", quantity: 2, unitPrice: 3500 },
  ],
  notes:
    "Creative work is protected under copyright. Full usage rights transfer upon payment.",
  paymentTerms: {
    dueDate: "March 26, 2026",
    gst: "GSTIN 456789123",
    method: "Credit Card / PayPal / Stripe",
  },
  subtitle: "Innovative PDF Solutions",
  summary: {
    subtotal: 22_700,
    tax: 1475.5,
    total: 24_175.5,
  },
};

const InvoiceCreativeContent = ({ data }: { data: InvoiceCreativeData }) => {
  const theme = usePdfcnTheme();

  const styles = {
    accentBlock: {
      backgroundColor: theme.colors.muted,
      borderLeftColor: theme.colors.accent,
      borderLeftStyle: "solid" as const,
      borderLeftWidth: 4,
      marginBottom: theme.spacing.sectionGap,
      paddingLeft: 14,
      paddingVertical: 10,
    },
    badgeLabel: {
      color: theme.colors.primaryForeground,
      fontSize: 8,
      fontWeight: "bold",
      letterSpacing: 1.2,
      marginBottom: 2,
      textTransform: "uppercase",
    },
    badgeNumber: {
      color: theme.colors.primaryForeground,
      fontSize: 16,
      fontWeight: "bold",
    },
    heroSection: {
      alignItems: "center" as const,
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      marginBottom: theme.spacing.sectionGap,
    },
    infoColumn: {
      flex: 1,
    },
    infoGrid: {
      flexDirection: "row" as const,
      gap: 32,
    },
    invoiceBadge: {
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      borderRadius: theme.primitives.borderRadius.md,
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box" as const,
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative" as const,
    },
    sectionLabel: {
      color: theme.colors.accent,
      fontSize: 8,
      fontWeight: "bold",
      letterSpacing: 0.8,
      marginBottom: 6,
      textTransform: "uppercase",
    },
    summaryLeft: {
      flex: 1,
      paddingRight: 20,
    },
    summaryRight: {
      backgroundColor: theme.colors.muted,
      borderRadius: theme.primitives.borderRadius.sm,
      padding: 14,
      width: 240,
    },
    summarySection: {
      flexDirection: "row" as const,
      marginTop: 24,
    },
  };

  return (
    <div data-pdf-document title={`Invoice ${data.invoiceNumber}`}>
      <div data-pdf-page="A4" style={styles.page}>
        <div style={styles.heroSection}>
          <div style={{ flex: 1 }}>
            <PageHeader
              variant="centered"
              title={data.companyName}
              subtitle={`${data.subtitle}  ·  ${data.companyAddress}`}
              marginBottom={0}
            />
          </div>
          <div style={styles.invoiceBadge}>
            <Text style={styles.badgeLabel} noMargin>
              Invoice
            </Text>
            <Text style={styles.badgeNumber} noMargin>
              {data.invoiceNumber}
            </Text>
          </div>
        </div>
        <div style={styles.accentBlock}>
          <div style={styles.infoGrid}>
            <div style={styles.infoColumn}>
              <Text style={styles.sectionLabel} noMargin>
                Billed To
              </Text>
              <Text variant="sm" weight="semibold" noMargin>
                {data.billTo.name}
              </Text>
              <Text variant="xs" noMargin color="mutedForeground">
                {data.billTo.address}
              </Text>
              <Text variant="xs" noMargin color="mutedForeground">
                {data.billTo.email} · {data.billTo.phone}
              </Text>
            </div>
            <div style={styles.infoColumn}>
              <Text style={styles.sectionLabel} noMargin>
                Invoice Info
              </Text>
              <KeyValue
                size="sm"
                items={[
                  { key: "Issue Date", value: data.invoiceDate },
                  { key: "Due Date", value: data.dueDate },
                  { key: "Payment", value: data.paymentTerms.method },
                ]}
              />
            </div>
          </div>
        </div>
        <Table variant="striped" zebraStripe>
          <TableHeader>
            <TableRow header>
              <TableCell>Deliverable</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static PDF list, no reordering
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{`${item.quantity}`}</TableCell>
                <TableCell align="right">{`$${item.unitPrice.toLocaleString()}`}</TableCell>
                <TableCell align="right">{`$${(item.quantity * item.unitPrice).toLocaleString()}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Section noWrap style={styles.summarySection}>
          <div style={styles.summaryLeft}>
            <Text style={styles.sectionLabel} noMargin>
              Notes & Terms
            </Text>
            <Text variant="xs" color="mutedForeground">
              {data.notes}
            </Text>
            <Text variant="xs" color="mutedForeground" style={{ marginTop: 4 }}>
              GST: {data.paymentTerms.gst}
            </Text>
          </div>
          <div style={styles.summaryRight}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                {
                  key: "Subtotal",
                  value: `$${data.summary.subtotal.toLocaleString()}`,
                },
                { key: "Tax (6.5%)", value: `$${data.summary.tax.toFixed(2)}` },
                {
                  key: "Total",
                  keyStyle: { fontSize: 13, fontWeight: "bold" },
                  value: `$${data.summary.total.toFixed(2)}`,
                  valueStyle: {
                    color: theme.colors.accent,
                    fontSize: 14,
                    fontWeight: "bold",
                  },
                },
              ]}
              divided
            />
          </div>
        </Section>
        <PageFooter
          variant="centered"
          centerText="Thank you for choosing us for your creative needs!"
          sticky
          pagePadding={25}
        />
      </div>
    </div>
  );
};

export const InvoiceCreativeDocument = ({
  theme,
  data = sampleData,
}: {
  theme?: PdfcnTheme;
  data?: InvoiceCreativeData;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <InvoiceCreativeContent data={data} />
  </PdfcnThemeProvider>
);
