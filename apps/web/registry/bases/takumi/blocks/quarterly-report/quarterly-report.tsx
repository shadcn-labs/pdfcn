import { PdfGraph } from "@/registry/bases/takumi/components/graph/graph";
import { KeepTogether } from "@/registry/bases/takumi/components/keep-together/keep-together";
import { PdfList } from "@/registry/bases/takumi/components/list/list";
import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
import { PageHeader } from "@/registry/bases/takumi/components/page-header/page-header";
import { PageNumber } from "@/registry/bases/takumi/components/page-number/page-number";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { Stack } from "@/registry/bases/takumi/components/stack/stack";
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

import type { QuarterlyReportProps } from "./quarterly-report.types";

// Sample data — renders only for the no-props preview; replace with your
// own props or data source
const sampleData: QuarterlyReportProps = {
  accentColor: "#2563eb",
  breakdown: {
    data: [
      { label: "North America", value: 1420 },
      { label: "Europe", value: 1180 },
      { label: "APAC", value: 610 },
      { label: "LATAM", value: 270 },
    ],
    title: "Customers by region",
  },
  company: "Aurora Analytics",
  highlights: ["Enterprise plan launched in July.", "Three new partners in APAC."],
  priorities: [
    { label: "Self-serve onboarding", value: 70 },
    { label: "SOC 2 Type II", value: 45 },
    { label: "Mobile app beta", value: 20 },
  ],
  quarter: "Q3 2026",
  stats: [
    { label: "Revenue", note: "+18% vs Q2", value: "$1.2M" },
    { label: "Customers", note: "+412 new", value: "3,480" },
    { label: "Churn", note: "-0.4 pts", value: "1.9%" },
  ],
  subtitle: "Performance, customers and priorities for next quarter.",
  trend: {
    data: [
      { label: "Apr", value: 310 },
      { label: "May", value: 335 },
      { label: "Jun", value: 362 },
      { label: "Jul", value: 380 },
      { label: "Aug", value: 404 },
      { label: "Sep", value: 431 },
    ],
    seriesName: "MRR",
    title: "Monthly recurring revenue ($k)",
  },
  watchList: [
    "Support response time rose to 6h.",
    "Two large renewals due in Q4.",
  ],
};

const clampPriority = (value: number) => Math.min(100, Math.max(0, value));

const QuarterlyReportContent = ({ data }: { data: QuarterlyReportProps }) => {
  const theme = usePdfcnTheme();

  const styles = StyleSheet.create({
    column: {
      flex: 1,
    },
    heading: {
      fontSize: 9,
      fontWeight: "bold",
      marginBottom: 6,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative",
    },
    priorityFill: {
      borderRadius: 4,
    },
    priorityRow: {
      marginBottom: 10,
    },
    priorityTrack: {
      backgroundColor: theme.colors.border,
      borderRadius: 4,
      height: 8,
      marginTop: 4,
    },
    statRow: {
      display: "flex",
      flexDirection: "row",
      gap: 12,
      marginBottom: 4,
    },
    statTile: {
      borderColor: theme.colors.border,
      borderRadius: 8,
      borderStyle: "solid",
      borderWidth: 1,
      flex: 1,
      padding: 12,
    },
  });

  const accent = data.accentColor ?? theme.colors.primary;
  const hasStats = (data.stats ?? []).length > 0;
  const hasHighlights = (data.highlights ?? []).length > 0;
  const hasWatchList = (data.watchList ?? []).length > 0;
  const hasPriorities = (data.priorities ?? []).length > 0;
  const footerCenter = [data.company, data.quarter]
    .filter(Boolean)
    .join(" · ");

  return (
    <Document title={`${data.quarter} / Quarterly business review`}>
      <Page size="A4" style={styles.page}>
        <PageHeader
          variant="simple"
          title={`${data.quarter} / Quarterly business review`}
          subtitle={data.subtitle}
          rightText={data.company}
          marginBottom={14}
        />
        {hasStats && (
          <Section spacing="sm">
            <View style={styles.statRow}>
              {(data.stats ?? []).map((stat) => (
                <View
                  key={`${stat.label}-${stat.value}`}
                  style={styles.statTile}
                >
                  <Text
                    variant="xs"
                    weight="semibold"
                    transform="uppercase"
                    color="mutedForeground"
                    noMargin
                  >
                    {stat.label}
                  </Text>
                  <Text variant="xl" weight="bold" color={accent} noMargin>
                    {stat.value}
                  </Text>
                  {stat.note && (
                    <Text variant="xs" color="mutedForeground" noMargin>
                      {stat.note}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </Section>
        )}
        {data.trend && (
          <Section spacing="sm">
            <KeepTogether>
              <Text
                style={styles.heading}
                color={accent}
                transform="uppercase"
                noMargin
              >
                {data.trend.title}
              </Text>
              <PdfGraph
                variant="line"
                data={[
                  {
                    color: accent,
                    data: data.trend.data.map((point) => ({
                      label: point.label,
                      value: point.value,
                    })),
                    name: data.trend.seriesName,
                  },
                ]}
                legend="bottom"
                showDots
                smooth
                height={220}
              />
            </KeepTogether>
          </Section>
        )}
        {(hasHighlights || hasWatchList) && (
          <Section spacing="sm">
            <Stack direction="horizontal" gap="md">
              {hasHighlights && (
                <View style={styles.column}>
                  <Text
                    style={styles.heading}
                    color={accent}
                    transform="uppercase"
                    noMargin
                  >
                    Highlights
                  </Text>
                  <PdfList
                    variant="bullet"
                    items={(data.highlights ?? []).map((highlight) => ({
                      text: highlight,
                    }))}
                  />
                </View>
              )}
              {hasWatchList && (
                <View style={styles.column}>
                  <Text
                    style={styles.heading}
                    color={accent}
                    transform="uppercase"
                    noMargin
                  >
                    Watch list
                  </Text>
                  <PdfList
                    variant="bullet"
                    items={(data.watchList ?? []).map((item) => ({
                      text: item,
                    }))}
                  />
                </View>
              )}
            </Stack>
          </Section>
        )}
        {data.breakdown && (
          <Section spacing="sm">
            <KeepTogether>
              <Text
                style={styles.heading}
                color={accent}
                transform="uppercase"
                noMargin
              >
                {data.breakdown.title}
              </Text>
              <PdfGraph
                variant="bar"
                data={data.breakdown.data.map((point) => ({
                  label: point.label,
                  value: point.value,
                }))}
                colors={[accent]}
                showValues
                height={220}
              />
            </KeepTogether>
          </Section>
        )}
        {hasPriorities && (
          <Section spacing="sm">
            <KeepTogether>
              <Text
                style={styles.heading}
                color={accent}
                transform="uppercase"
                noMargin
              >
                Priorities for next quarter
              </Text>
              {(data.priorities ?? []).map((priority) => (
                <View
                  key={`${priority.label}-${priority.value}`}
                  style={styles.priorityRow}
                >
                  <Stack direction="horizontal" justify="between">
                    <Text variant="sm" weight="semibold" noMargin>
                      {priority.label}
                    </Text>
                    <Text variant="sm" color="mutedForeground" noMargin>
                      {`${clampPriority(priority.value)}%`}
                    </Text>
                  </Stack>
                  <View style={styles.priorityTrack}>
                    <View
                      style={[
                        styles.priorityFill,
                        {
                          backgroundColor: accent,
                          height: 8,
                          width: `${clampPriority(priority.value)}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </KeepTogether>
          </Section>
        )}
        <PageFooter
          variant="simple"
          leftText="Confidential — Internal Use"
          centerText={footerCenter}
          rightText={<PageNumber size="xs" />}
          sticky
          pagePadding={theme.spacing.page.marginLeft}
        />
      </Page>
    </Document>
  );
};

const stripUndefined = <T extends object>(obj?: T): Partial<T> =>
  Object.fromEntries(
    Object.entries((obj ?? {}) as Record<string, unknown>).filter(
      ([, value]) => value !== undefined
    )
  ) as Partial<T>;

export const QuarterlyReportDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: QuarterlyReportProps;
} & Partial<QuarterlyReportProps>) => {
  const callerData = { ...stripUndefined(data), ...stripUndefined(props) };
  const hasCallerData = Object.keys(callerData).length > 0;
  // Strict model: sample data renders ONLY when no caller data is supplied.
  // On the caller path the document is built purely from the caller: content
  // sections are optional and render only when provided, so sample content
  // can never backfill a caller's report. Identity fields fall back to ""
  // (never the sample company), and only the accent color keeps a built-in
  // style default.
  const merged: QuarterlyReportProps = hasCallerData
    ? {
        accentColor: callerData.accentColor,
        breakdown: callerData.breakdown,
        company: callerData.company ?? "",
        highlights: callerData.highlights,
        priorities: callerData.priorities,
        quarter: callerData.quarter ?? "",
        stats: callerData.stats,
        subtitle: callerData.subtitle,
        trend: callerData.trend,
        watchList: callerData.watchList,
      }
    : sampleData;
  return (
    <PdfcnThemeProvider theme={theme}>
      <QuarterlyReportContent data={merged} />
    </PdfcnThemeProvider>
  );
};
