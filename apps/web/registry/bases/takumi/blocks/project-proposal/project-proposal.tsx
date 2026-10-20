import { PdfGraph } from "@/registry/bases/takumi/components/graph/graph";
import { KeepTogether } from "@/registry/bases/takumi/components/keep-together/keep-together";
import { PageNumber } from "@/registry/bases/takumi/components/page-number/page-number";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { PdfSignatureBlock } from "@/registry/bases/takumi/components/signature/signature";
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

import type { ProjectProposalProps } from "./project-proposal.types";

// Sample data — replace with your own props or data source
const sampleData: ProjectProposalProps = {
  accentColor: "#7c3aed",
  budget: [
    { label: "Research", value: 15 },
    { label: "Design", value: 30 },
    { label: "Engineering", value: 45 },
    { label: "Launch", value: 10 },
  ],
  client: "Greenleaf Markets",
  company: "Studio Kite",
  date: "September 2026",
  deliverables: [
    "Research with 20 shoppers across three stores",
    "Interactive prototype tested in-store",
    "iOS and Android apps with points and offers",
    "Launch plan and staff training",
  ],
  milestones: [
    { body: "Goals and scope agreed.", date: "Oct 2026", title: "Kick-off" },
    { body: "First customers onboarded.", date: "Dec 2026", title: "Beta" },
    { body: "Available to everyone.", date: "Jan 2027", title: "Launch" },
  ],
  nextSteps: [
    { done: true, text: "Review proposal" },
    { text: "Agree scope and budget" },
    { text: "Sign and schedule kick-off" },
  ],
  projectTitle: "A loyalty app your shoppers will open every week",
  stats: [
    { label: "Timeline", note: "Oct to Jan", value: "14 weeks" },
    { label: "Investment", note: "Fixed price", value: "$84k" },
    { label: "Team", note: "Design and build", value: "5 people" },
  ],
};

const ProjectProposalContent = ({ data }: { data: ProjectProposalProps }) => {
  const theme = usePdfcnTheme();

  const styles = StyleSheet.create({
    checkSquare: {
      alignItems: "center",
      borderColor: theme.colors.border,
      borderRadius: 3,
      borderStyle: "solid",
      borderWidth: 1.5,
      height: 16,
      justifyContent: "center",
      marginRight: 8,
      width: 16,
    },
    checkSquareChecked: {
      backgroundColor: theme.colors.success,
      borderColor: theme.colors.success,
    },
    chromeFooter: {
      bottom: 20,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      left: 56,
      right: 56,
    },
    chromeHeader: {
      borderBottomColor: theme.colors.border,
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
      display: "flex",
      flexDirection: "row",
      left: 56,
      paddingBottom: 6,
      right: 56,
      top: 20,
    },
    flexOne: {
      flex: 1,
    },
    footerRow: {
      display: "flex",
      flexDirection: "row",
    },
    legendRow: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      marginTop: 6,
    },
    legendSwatch: {
      borderRadius: 2,
      height: 10,
      width: 10,
    },
    listRow: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      marginBottom: 8,
    },
    milestoneRow: {
      marginBottom: 10,
    },
    numberBadge: {
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      height: 20,
      justifyContent: "center",
      marginRight: 8,
      width: 20,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative",
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
  const budget = data.budget ?? [];
  const budgetTotal = budget.reduce((sum, slice) => sum + slice.value, 0);
  const budgetPalette = [
    accent,
    theme.colors.info ?? "#3B82F6",
    theme.colors.success ?? "#22C55E",
    theme.colors.warning ?? "#F59E0B",
  ];
  const hasIdentity = Boolean(data.company || data.client);

  // List rows are rendered directly (instead of PdfList) so each section
  // heading can share a KeepTogether with its first row while numbering
  // stays continuous and the remaining rows still paginate naturally.
  // Marker visuals mirror the list component's numbered badge and checkbox.
  const renderDeliverableRow = (text: string, index: number) => (
    <View style={styles.listRow}>
      <View style={styles.numberBadge}>
        <Text
          variant="xs"
          weight="bold"
          noMargin
          style={{ color: theme.colors.primaryForeground }}
        >
          {`${index + 1}`}
        </Text>
      </View>
      <View style={styles.flexOne}>
        <Text variant="sm" noMargin>
          {text}
        </Text>
      </View>
    </View>
  );

  const renderNextStepRow = (text: string, done: boolean) => (
    <View style={styles.listRow}>
      <View
        style={[styles.checkSquare, done ? styles.checkSquareChecked : {}]}
      />
      <View style={styles.flexOne}>
        <Text variant="sm" noMargin>
          {text}
        </Text>
      </View>
    </View>
  );

  return (
    <Document title={`Project Proposal — ${data.projectTitle}`}>
      <Page size="A4" style={styles.page}>
        {/* Repeating chrome: fixed elements render on every page, so
            multi-page proposals keep the header and footer on
            continuation pages. */}
        <View fixed style={styles.chromeHeader}>
          <View style={styles.flexOne}>
            <Text
              variant="xs"
              weight="bold"
              transform="uppercase"
              color="mutedForeground"
              noMargin
            >
              {data.company}
            </Text>
          </View>
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.projectTitle}
          </Text>
        </View>
        <View fixed style={styles.chromeFooter}>
          <View style={styles.footerRow}>
            <View style={styles.flexOne}>
              <Text
                variant="xs"
                weight="semibold"
                color="mutedForeground"
                noMargin
              >
                {data.company}
              </Text>
            </View>
            <Text variant="xs" color="mutedForeground" noMargin>
              {`${data.client} · ${data.date}`}
            </Text>
          </View>
          <PageNumber
            format="Page {page} of {total}"
            align="center"
            size="xs"
          />
        </View>
        <Section spacing="none">
          <Text
            variant="xs"
            weight="bold"
            transform="uppercase"
            color={accent}
            noMargin
          >
            {`Proposal for ${data.client}`}
          </Text>
          <Text variant="2xl" weight="bold" noMargin>
            {data.projectTitle}
          </Text>
          <Text variant="sm" color="mutedForeground" noMargin>
            {`Prepared by ${data.company}, ${data.date}`}
          </Text>
        </Section>
        {data.stats && data.stats.length > 0 && (
          <Section spacing="sm">
            <KeepTogether>
              <Text variant="lg" weight="bold" noMargin>
                At a glance
              </Text>
              <View style={styles.statRow}>
                {data.stats.map((stat) => (
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
            </KeepTogether>
          </Section>
        )}
        {data.deliverables && data.deliverables.length > 0 && (
          <Section spacing="sm">
            <KeepTogether>
              <Text variant="lg" weight="bold" noMargin>
                What we will deliver
              </Text>
              {renderDeliverableRow(data.deliverables[0], 0)}
            </KeepTogether>
            {data.deliverables.slice(1).map((deliverable, index) => (
              <View key={`${deliverable}-${index}`}>
                {renderDeliverableRow(deliverable, index + 1)}
              </View>
            ))}
          </Section>
        )}
        {data.milestones && data.milestones.length > 0 && (
          <Section spacing="sm">
            <KeepTogether>
              <Text variant="lg" weight="bold" noMargin>
                Timeline
              </Text>
              <View style={styles.milestoneRow}>
                <Text
                  variant="xs"
                  weight="semibold"
                  transform="uppercase"
                  color={accent}
                  noMargin
                >
                  {data.milestones[0].date}
                </Text>
                <Text variant="sm" weight="semibold" noMargin>
                  {data.milestones[0].title}
                </Text>
                <Text variant="sm" color="mutedForeground" noMargin>
                  {data.milestones[0].body}
                </Text>
              </View>
            </KeepTogether>
            {data.milestones.slice(1).map((milestone) => (
              <KeepTogether key={`${milestone.date}-${milestone.title}`}>
                <View style={styles.milestoneRow}>
                  <Text
                    variant="xs"
                    weight="semibold"
                    transform="uppercase"
                    color={accent}
                    noMargin
                  >
                    {milestone.date}
                  </Text>
                  <Text variant="sm" weight="semibold" noMargin>
                    {milestone.title}
                  </Text>
                  <Text variant="sm" color="mutedForeground" noMargin>
                    {milestone.body}
                  </Text>
                </View>
              </KeepTogether>
            ))}
          </Section>
        )}
        {budget.length > 0 && (
          <Section spacing="sm">
            <KeepTogether>
              <Text variant="lg" weight="bold" noMargin>
                Budget
              </Text>
              <PdfGraph
                variant="donut"
                data={budget.map((slice) => ({
                  label: slice.label,
                  value: slice.value,
                }))}
                legend="none"
                centerLabel={`${budgetTotal}`}
                colors={budgetPalette}
                height={220}
              />
            </KeepTogether>
            {budget.map((slice, index) => {
              const color = budgetPalette[index % budgetPalette.length];
              const percent =
                budgetTotal > 0 ? (slice.value / budgetTotal) * 100 : 0;
              return (
                <View
                  key={`${slice.label}-${slice.value}`}
                  style={styles.legendRow}
                >
                  <View
                    style={[styles.legendSwatch, { backgroundColor: color }]}
                  />
                  <View style={styles.flexOne}>
                    <Text variant="sm" noMargin>
                      {slice.label}
                    </Text>
                  </View>
                  <Text variant="sm" color="mutedForeground" noMargin>
                    {`${slice.value}`}
                  </Text>
                  <Text variant="sm" weight="semibold" noMargin>
                    {`${percent.toFixed(1)}%`}
                  </Text>
                </View>
              );
            })}
          </Section>
        )}
        {data.nextSteps && data.nextSteps.length > 0 && (
          <Section spacing="sm">
            <KeepTogether>
              <Text variant="lg" weight="bold" noMargin>
                Next steps
              </Text>
              {renderNextStepRow(
                data.nextSteps[0].text,
                data.nextSteps[0].done ?? false
              )}
            </KeepTogether>
            {data.nextSteps.slice(1).map((step, index) => (
              <View key={`${step.text}-${index}`}>
                {renderNextStepRow(step.text, step.done ?? false)}
              </View>
            ))}
          </Section>
        )}
        {hasIdentity && (
          <Section spacing="sm">
            <KeepTogether>
              <Text variant="lg" weight="bold" noMargin>
                Sign-off
              </Text>
              <PdfSignatureBlock
                variant="double"
                signers={[
                  {
                    date: data.date,
                    label: `For ${data.company}`,
                    name: data.company,
                    title: "Studio",
                  },
                  {
                    date: data.date,
                    label: `For ${data.client}`,
                    name: data.client,
                    title: "Client",
                  },
                ]}
              />
            </KeepTogether>
          </Section>
        )}
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

export const ProjectProposalDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: ProjectProposalProps;
} & Partial<ProjectProposalProps>) => {
  const callerData = { ...stripUndefined(data), ...stripUndefined(props) };
  const hasCallerData = Object.keys(callerData).length > 0;
  // Sample data renders ONLY when the caller supplies nothing at all. When
  // caller data exists, the document is built purely from the caller: content
  // sections render only when the caller provided them (never backfilled from
  // the sample), and identity fields fall back to an empty string so the
  // sample studio details can never leak into a real proposal.
  const merged: ProjectProposalProps = hasCallerData
    ? {
        accentColor: callerData.accentColor,
        budget: callerData.budget,
        client: callerData.client ?? "",
        company: callerData.company ?? "",
        date: callerData.date ?? "",
        deliverables: callerData.deliverables,
        milestones: callerData.milestones,
        nextSteps: callerData.nextSteps,
        projectTitle: callerData.projectTitle ?? "",
        stats: callerData.stats,
      }
    : sampleData;
  return (
    <PdfcnThemeProvider theme={theme}>
      <ProjectProposalContent data={merged} />
    </PdfcnThemeProvider>
  );
};
