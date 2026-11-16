import { KeyValue } from "@/registry/bases/takumi/components/key-value/key-value";
import { PdfList } from "@/registry/bases/takumi/components/list/list";
import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
import { PdfImage } from "@/registry/bases/takumi/components/pdf-image/pdf-image";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { PdfSignatureBlock } from "@/registry/bases/takumi/components/signature/signature";
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
import {
  Document,
  Page,
  StyleSheet,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { QuoteEstimateProps } from "./quote-estimate.types";

const sampleQuoteEstimateData: QuoteEstimateProps = {
  accentColor: "#0f4c81",
  adjustments: [{ label: "Contingency (5%)", value: 1530 }],
  client: "Maya Patel",
  companyContact: "hello@brightline.build · (555) 014-2290",
  companyName: "Brightline Builders",
  companyTagline: "Renovations and extensions",
  currency: "USD",
  date: "September 13, 2026",
  depositNote: "A 20% deposit confirms your start date.",
  phases: [
    { cost: 2100, duration: "3 days", phase: "Demolition" },
    { cost: 6400, duration: "5 days", phase: "Electrical and plumbing" },
    { cost: 18_900, duration: "8 days", phase: "Installation" },
    { cost: 3200, duration: "4 days", phase: "Finishing" },
  ],
  projectTitle: "Kitchen renovation",
  quoteNumber: "Q-3301",
  scope: [
    "Remove existing cabinets and worktops",
    "New electrical circuits for appliances",
    "Install oak cabinets and quartz worktops",
    "Tiling, painting and final clean",
  ],
  terms: "Prices include materials and labour.",
  validUntil: "October 13, 2026",
};

const createCurrencyFormatter = (currency: string) => {
  const formatter = new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: "currency",
  });
  return (value: number) => formatter.format(value);
};

export const QuoteEstimateContent = ({
  data,
}: {
  data: QuoteEstimateProps;
}) => {
  const theme = usePdfcnTheme();
  const accent = data.accentColor ?? theme.colors.primary;
  const formatMoney = createCurrencyFormatter(data.currency ?? "USD");

  const adjustments = data.adjustments ?? [];
  const subtotal = data.phases.reduce((sum, row) => sum + row.cost, 0);
  const total = adjustments.reduce((sum, row) => sum + row.value, subtotal);

  const styles = StyleSheet.create({
    brand: {
      alignItems: "center",
      flexDirection: "row",
      gap: 10,
    },
    callout: {
      backgroundColor: theme.colors.muted,
      borderLeftColor: accent,
      borderLeftStyle: "solid",
      borderLeftWidth: 3,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    eyebrow: {
      color: accent,
      fontSize: 9,
      fontWeight: "bold",
      letterSpacing: 1.2,
      textTransform: "uppercase",
    },
    headerRow: {
      alignItems: "flex-start",
      borderBottomColor: accent,
      borderBottomStyle: "solid",
      borderBottomWidth: 2,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      paddingBottom: theme.spacing.componentGap,
    },
    logo: {
      height: 36,
      margin: 0,
      width: 36,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative",
    },
    quoteInfo: {
      alignItems: "flex-end",
    },
    section: {
      marginBottom: 16,
    },
    sectionLabel: {
      borderBottomColor: theme.colors.border,
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
      color: accent,
      fontSize: 9,
      fontWeight: "bold",
      letterSpacing: 0.6,
      marginBottom: 6,
      paddingBottom: 4,
      textTransform: "uppercase",
    },
    signature: {
      marginTop: 20,
    },
    titleBlock: {
      marginBottom: 16,
    },
    totalsBox: {
      width: 240,
    },
    totalsRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 8,
    },
  });

  return (
    <Document title={`Quote ${data.quoteNumber}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.brand}>
            {data.companyLogo && (
              <PdfImage
                fit="contain"
                src={data.companyLogo}
                style={styles.logo}
              />
            )}
            <View>
              <Text variant="xl" weight="bold" noMargin>
                {data.companyName}
              </Text>
              {data.companyTagline && (
                <Text variant="sm" color="mutedForeground" noMargin>
                  {data.companyTagline}
                </Text>
              )}
              {data.companyContact && (
                <Text variant="xs" color="mutedForeground" noMargin>
                  {data.companyContact}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.quoteInfo}>
            <Text style={styles.eyebrow} noMargin>
              Quote
            </Text>
            <Text variant="lg" weight="bold" noMargin>
              {data.quoteNumber}
            </Text>
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text variant="2xl" weight="bold" noMargin>
            {data.projectTitle}
          </Text>
          <Text variant="sm" color="mutedForeground" noMargin>
            {`Prepared for ${data.client} on ${data.date}`}
          </Text>
        </View>

        <Section noWrap spacing="none" style={styles.section}>
          <Text style={styles.sectionLabel} noMargin>
            Scope of work
          </Text>
          <PdfList gap="xs" items={data.scope.map((text) => ({ text }))} />
        </Section>

        <Section noWrap spacing="none" style={styles.section}>
          <Text style={styles.sectionLabel} noMargin>
            Pricing
          </Text>
          <Table variant="compact">
            <TableHeader>
              <TableRow header>
                <TableCell>Phase</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="right">Cost</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.phases.map((row) => (
                <TableRow key={row.phase}>
                  <TableCell>{row.phase}</TableCell>
                  <TableCell align="center">{row.duration}</TableCell>
                  <TableCell align="right">{formatMoney(row.cost)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <View style={styles.totalsRow}>
            <View style={styles.totalsBox}>
              <KeyValue
                size="sm"
                dividerThickness={1}
                items={[
                  { key: "Subtotal", value: formatMoney(subtotal) },
                  ...adjustments.map((row) => ({
                    key: row.label,
                    value: formatMoney(row.value),
                  })),
                  {
                    key: "Estimated total",
                    keyStyle: {
                      color: theme.colors.foreground,
                      fontSize: 13,
                      fontWeight: "bold",
                    },
                    value: formatMoney(total),
                    valueStyle: {
                      color: accent,
                      fontSize: 14,
                      fontWeight: "bold",
                    },
                  },
                ]}
                divided
              />
            </View>
          </View>
        </Section>

        <View style={styles.callout}>
          <Text variant="sm" weight="semibold" noMargin>
            {`Valid until ${data.validUntil}`}
          </Text>
          {data.terms && (
            <Text variant="xs" color="mutedForeground" noMargin>
              {data.terms}
            </Text>
          )}
          {data.depositNote && (
            <Text variant="xs" color="mutedForeground" noMargin>
              {data.depositNote}
            </Text>
          )}
        </View>

        <PdfSignatureBlock
          style={styles.signature}
          variant="double"
          signers={[
            { date: "Date:", label: "Contractor", name: data.companyName },
            { date: "Date:", label: "Client", name: data.client },
          ]}
        />

        <PageFooter
          leftText={`${data.quoteNumber} · Valid until ${data.validUntil}`}
          rightText={data.companyContact}
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
};

export const QuoteEstimateDocument = ({
  theme,
  data = sampleQuoteEstimateData,
}: {
  theme?: PdfcnTheme;
  data?: QuoteEstimateProps;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <QuoteEstimateContent data={data} />
  </PdfcnThemeProvider>
);

export { QuoteEstimateDocument as QuoteEstimate };
