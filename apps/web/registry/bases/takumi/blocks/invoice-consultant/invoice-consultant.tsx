import { KeyValue } from "@/registry/bases/takumi/components/key-value/key-value";
import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
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

import type { InvoiceConsultantData } from "./invoice-consultant.types";

const sampleData: InvoiceConsultantData = {
  client: {
    address: "500 Tech Park, Suite 200",
    company: "Acme Technologies",
    email: "sarah.johnson@acmetech.com",
    name: "Sarah Johnson",
  },
  companyAddress: "Nagpur, IN · hello@pdfcn.app",
  companyName: "pdfcn",
  consultant: {
    email: "john.smith@pdfcn.app",
    name: "John Smith",
    title: "Senior Technical Consultant",
  },
  dueDate: "March 28, 2026",
  invoiceDate: "February 26, 2026",
  invoiceNumber: "INV-2026-006",
  notes:
    "Services rendered for February 2026. All hours verified and approved by client.",
  paymentTerms: {
    dueDate: "March 28, 2026",
    method: "Bank Transfer / Check",
  },
  projectRef: "PROJ-2026-ACME-001",
  services: [
    { description: "Architecture Review & Planning", hours: 16, rate: 175 },
    { description: "Code Review & Optimization", hours: 24, rate: 150 },
    { description: "Technical Documentation", hours: 12, rate: 125 },
    { description: "Team Training & Knowledge Transfer", hours: 8, rate: 200 },
  ],
  subtitle: "Professional Consulting Services",
  summary: {
    subtotal: 9500,
    tax: 475,
    total: 9975,
    totalHours: 60,
  },
};

const InvoiceConsultantContent = ({
  data,
}: {
  data: InvoiceConsultantData;
}) => {
  const theme = usePdfcnTheme();

  const styles = {
    calloutNote: {
      backgroundColor: theme.colors.muted,
      borderLeftColor: theme.colors.info,
      borderLeftStyle: "solid" as const,
      borderLeftWidth: 3,
      marginTop: 16,
      paddingLeft: 12,
      paddingVertical: 8,
    },
    companyInfo: {
      flex: 1,
    },
    headerRow: {
      alignItems: "flex-start",
      borderBottomColor: theme.colors.primary,
      borderBottomStyle: "solid" as const,
      borderBottomWidth: 2,
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      marginBottom: theme.spacing.sectionGap,
      paddingBottom: theme.spacing.componentGap,
    },
    hoursBadge: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.primary,
      borderRadius: theme.primitives.borderRadius.sm,
      color: theme.colors.primaryForeground,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    hoursBox: {
      flex: 1,
      paddingRight: 24,
    },
    invoiceInfo: {
      alignItems: "flex-end",
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box" as const,
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative" as const,
    },
    partiesRow: {
      flexDirection: "row" as const,
      gap: 40,
      marginBottom: theme.spacing.sectionGap,
    },
    partyColumn: {
      flex: 1,
    },
    partyLabel: {
      borderBottomColor: theme.colors.border,
      borderBottomStyle: "solid" as const,
      borderBottomWidth: 1,
      color: theme.colors.primary,
      fontSize: 9,
      fontWeight: "bold",
      letterSpacing: 0.6,
      marginBottom: 6,
      paddingBottom: 4,
      textTransform: "uppercase",
    },
    projectRef: {
      alignItems: "center",
      backgroundColor: theme.colors.muted,
      borderRadius: theme.primitives.borderRadius.sm,
      flexDirection: "row" as const,
      gap: 8,
      marginBottom: theme.spacing.sectionGap,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    summaryRow: {
      flexDirection: "row" as const,
      marginTop: 20,
    },
    totalsBox: {
      width: 250,
    },
  };

  return (
    <div data-pdf-document title={`Invoice ${data.invoiceNumber}`}>
      <div data-pdf-page="A4" style={styles.page}>
        <div style={styles.headerRow}>
          <div style={styles.companyInfo}>
            <Text variant="xl" weight="bold" noMargin>
              {data.companyName}
            </Text>
            <Text variant="sm" color="mutedForeground" noMargin>
              {data.subtitle}
            </Text>
            <Text variant="xs" color="mutedForeground" noMargin>
              {data.companyAddress}
            </Text>
          </div>
          <div style={styles.invoiceInfo}>
            <Text
              variant="xs"
              color="mutedForeground"
              transform="uppercase"
              noMargin
            >
              Invoice
            </Text>
            <Text variant="lg" weight="bold" noMargin>
              {data.invoiceNumber}
            </Text>
            <Text variant="xs" color="mutedForeground" noMargin>
              {data.invoiceDate}
            </Text>
            <Text variant="xs" color="mutedForeground" noMargin>
              Due: {data.dueDate}
            </Text>
          </div>
        </div>
        {data.projectRef && (
          <div style={styles.projectRef}>
            <Text
              variant="xs"
              weight="semibold"
              color="mutedForeground"
              noMargin
            >
              Project Reference:
            </Text>
            <Text variant="xs" weight="bold" noMargin>
              {data.projectRef}
            </Text>
          </div>
        )}
        <div style={styles.partiesRow}>
          <div style={styles.partyColumn}>
            <Text style={styles.partyLabel} noMargin>
              From (Consultant)
            </Text>
            <Text variant="sm" weight="semibold" noMargin>
              {data.consultant.name}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.consultant.title}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.consultant.email}
            </Text>
          </div>
          <div style={styles.partyColumn}>
            <Text style={styles.partyLabel} noMargin>
              Bill To (Client)
            </Text>
            <Text variant="sm" weight="semibold" noMargin>
              {data.client.name}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.client.company}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.client.address}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.client.email}
            </Text>
          </div>
        </div>
        <Table variant="line">
          <TableHeader>
            <TableRow header>
              <TableCell>Service Description</TableCell>
              <TableCell align="center">Hours</TableCell>
              <TableCell align="right">Rate ($/hr)</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.services.map((service, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static PDF list, no reordering
              <TableRow key={index}>
                <TableCell>{service.description}</TableCell>
                <TableCell align="center">{`${service.hours}`}</TableCell>
                <TableCell align="right">{`$${service.rate}`}</TableCell>
                <TableCell align="right">{`$${(service.hours * service.rate).toLocaleString()}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Section noWrap style={styles.summaryRow}>
          <div style={styles.hoursBox}>
            <div style={styles.hoursBadge}>
              <Text
                style={{
                  color: theme.colors.primaryForeground,
                  fontSize: 9,
                  fontWeight: "bold",
                }}
                noMargin
              >
                Total Hours: {data.summary.totalHours}
              </Text>
            </div>
            <Text variant="xs" color="mutedForeground" style={{ marginTop: 8 }}>
              Payment: {data.paymentTerms.method}
            </Text>
          </div>
          <div style={styles.totalsBox}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                {
                  key: "Subtotal",
                  value: `$${data.summary.subtotal.toLocaleString()}`,
                },
                { key: "Tax (5%)", value: `$${data.summary.tax.toFixed(2)}` },
                {
                  key: "Amount Due",
                  keyStyle: { fontSize: 13, fontWeight: "bold" },
                  value: `$${data.summary.total.toFixed(2)}`,
                  valueStyle: {
                    color: theme.colors.primary,
                    fontSize: 14,
                    fontWeight: "bold",
                  },
                },
              ]}
              divided
            />
          </div>
        </Section>
        {data.notes && (
          <div style={styles.calloutNote}>
            <Text variant="xs" color="mutedForeground">
              {data.notes}
            </Text>
          </div>
        )}
        <PageFooter
          leftText="Professional services invoice – Please retain for records"
          rightText="Page 1 of 1"
          sticky
          pagePadding={25}
        />
      </div>
    </div>
  );
};

export const InvoiceConsultantDocument = ({
  theme,
  data = sampleData,
}: {
  theme?: PdfcnTheme;
  data?: InvoiceConsultantData;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <InvoiceConsultantContent data={data} />
  </PdfcnThemeProvider>
);
