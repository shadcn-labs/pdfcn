import { Badge } from "@/registry/bases/takumi/components/badge/badge";
import { PdfImage } from "@/registry/bases/takumi/components/pdf-image/pdf-image";
import { Section } from "@/registry/bases/takumi/components/section/section";
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

import type { ResumeProps } from "./resume.types";

// Sample data — replace with your own props or data source
const sampleData: ResumeProps = {
  accentColor: "#0f766e",
  contact: {
    email: "sam@rivera.design",
    location: "Lisbon, Portugal",
    website: "rivera.design",
  },
  education: [
    {
      degree: "BA Communication Design",
      school: "University of Porto",
      year: "2016",
    },
  ],
  experience: [
    {
      company: "Tidewave",
      details: "Led the redesign of the mobile banking app; activation up 23%.",
      period: "2022 to now",
      title: "Lead Designer",
    },
    {
      company: "Loom & Co",
      details: "Built the design system used by 40 engineers across 6 teams.",
      period: "2019 to 2022",
      title: "Product Designer",
    },
    {
      company: "Fieldnote",
      details: "Designed onboarding and billing for a 200k-user SaaS.",
      period: "2016 to 2019",
      title: "UX Designer",
    },
  ],
  name: "Sam Rivera",
  role: "Senior Product Designer",
  skills: [
    "Product strategy",
    "Interaction design",
    "Design systems",
    "Prototyping",
    "User research",
    "Figma",
  ],
  summary:
    "Product designer with nine years of experience shipping consumer and B2B software. I turn fuzzy problems into simple, measurable products.",
};

// One-page fit policy (issue #61: the Resume block is a single-page
// document). Content volume is estimated in points against the A4 page
// (841pt tall, 36pt padding). Average resumes render at the comfortable
// density; heavier ones step down to compact and dense layouts that
// tighten padding, row spacing and body text so realistic content still
// fits. Content beyond the dense budget returns a visible oversize
// notice instead of silently spilling onto a second page.
const PAGE_CONTENT_HEIGHT = 769;
const COMPACT_LIMIT = 884;
const DENSE_LIMIT = 1038;

type FitDensity = "comfortable" | "compact" | "dense";

const estimateLines = (chars: number, perLine: number) =>
  Math.max(1, Math.ceil(chars / perLine));

// Skill badges wrap by content width, not by count: a row of short
// labels fits far more badges than a row of wide ones. Simulate the
// greedy wrap against the comfortable content width (523pt) using an
// average glyph width for the small badge text plus badge padding.
const estimateSkillRows = (skills: string[]): number => {
  let rows = 0;
  let used = 0;
  for (const skill of skills) {
    const badgeWidth = Math.ceil(skill.length * 4.6) + 16;
    if (rows === 0 || used + 6 + badgeWidth > 523) {
      rows += 1;
      used = badgeWidth;
    } else {
      used += 6 + badgeWidth;
    }
  }
  return rows;
};

const estimateContentHeight = (data: ResumeProps): number => {
  // Header, contact line, four section headings with spacing, footer.
  let height = 150;
  height += estimateLines(data.summary.length, 100) * 15;
  for (const entry of data.experience) {
    height += 25 + estimateLines(entry.details.length, 78) * 15;
  }
  height += estimateSkillRows(data.skills) * 20;
  height += data.education.length * 32;
  return height;
};

const densityFor = (height: number): FitDensity | "oversize" => {
  if (height <= PAGE_CONTENT_HEIGHT) {
    return "comfortable";
  }
  if (height <= COMPACT_LIMIT) {
    return "compact";
  }
  if (height <= DENSE_LIMIT) {
    return "dense";
  }
  return "oversize";
};

const densityStyles: Record<
  FitDensity,
  {
    bodyFontSize: number;
    bodyLineHeight: number;
    educationMargin: number;
    experienceMargin: number;
    pagePadding: number;
  }
> = {
  comfortable: {
    bodyFontSize: 10,
    bodyLineHeight: 1.45,
    educationMargin: 6,
    experienceMargin: 10,
    pagePadding: 36,
  },
  compact: {
    bodyFontSize: 9.5,
    bodyLineHeight: 1.35,
    educationMargin: 4,
    experienceMargin: 7,
    pagePadding: 30,
  },
  dense: {
    bodyFontSize: 9,
    bodyLineHeight: 1.28,
    educationMargin: 3,
    experienceMargin: 5,
    pagePadding: 26,
  },
};

const ResumeContent = ({ data }: { data: ResumeProps }) => {
  const theme = usePdfcnTheme();
  const estimatedHeight = estimateContentHeight(data);
  const density = densityFor(estimatedHeight);
  const fit = densityStyles[density === "oversize" ? "dense" : density];

  const styles = StyleSheet.create({
    contactLine: {
      marginTop: 2,
    },
    educationRow: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: fit.educationMargin,
    },
    experienceRow: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "row",
      marginBottom: fit.experienceMargin,
    },
    headerRow: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    heading: {
      fontSize: 9,
      fontWeight: "bold",
      marginBottom: 4,
    },
    notice: {
      borderColor: theme.colors.border,
      borderStyle: "solid",
      borderWidth: 1,
      padding: 16,
    },
    noticeBody: {
      marginTop: 6,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      padding: fit.pagePadding,
      position: "relative",
    },
    period: {
      width: 92,
    },
    photo: {
      borderRadius: 32,
      height: 64,
      margin: 0,
      width: 64,
    },
    skillsRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
  });

  const contactParts = [
    data.contact.email,
    data.contact.phone,
    data.contact.location,
    data.contact.website,
  ].filter(
    (part): part is string => typeof part === "string" && part.length > 0
  );
  const accent = data.accentColor ?? "primary";
  const bodyTextStyle = {
    fontSize: fit.bodyFontSize,
    lineHeight: fit.bodyLineHeight,
  };

  if (density === "oversize") {
    return (
      <Document title={`Resume — ${data.name}`}>
        <Page size="A4" style={styles.page}>
          <View style={styles.notice}>
            <Text variant="base" weight="bold" noMargin>
              This resume does not fit on one page
            </Text>
            <Text variant="sm" style={styles.noticeBody} noMargin>
              {`The Resume block renders a single A4 page, and this content is about ${(((estimatedHeight - DENSE_LIMIT) / DENSE_LIMIT) * 100).toFixed(1)} percent over the one-page budget even at the densest layout. Shorten the summary, trim the experience details, or remove entries, then render again. Nothing was clipped or dropped silently.`}
            </Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document title={`Resume — ${data.name}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text
              variant="xs"
              weight="bold"
              transform="uppercase"
              color={accent}
              noMargin
            >
              {data.role}
            </Text>
            <Text variant="2xl" weight="bold" noMargin>
              {data.name}
            </Text>
            <Text
              variant="sm"
              color="mutedForeground"
              style={styles.contactLine}
              noMargin
            >
              {contactParts.join(" · ")}
            </Text>
          </View>
          {data.photoUrl && (
            <PdfImage src={data.photoUrl} style={styles.photo} />
          )}
        </View>
        <Section spacing="sm">
          <Text
            style={styles.heading}
            color={accent}
            transform="uppercase"
            noMargin
          >
            Summary
          </Text>
          <Text variant="sm" style={bodyTextStyle} noMargin>
            {data.summary}
          </Text>
        </Section>
        <Section spacing="sm">
          <Text
            style={styles.heading}
            color={accent}
            transform="uppercase"
            noMargin
          >
            Experience
          </Text>
          {data.experience.map((entry) => (
            <View
              key={`${entry.company}-${entry.title}-${entry.period}`}
              style={styles.experienceRow}
            >
              <Text
                variant="xs"
                color="mutedForeground"
                style={styles.period}
                noMargin
              >
                {entry.period}
              </Text>
              <View>
                <Text variant="sm" weight="semibold" noMargin>
                  {`${entry.title} · ${entry.company}`}
                </Text>
                <Text variant="sm" style={bodyTextStyle} noMargin>
                  {entry.details}
                </Text>
              </View>
            </View>
          ))}
        </Section>
        <Section spacing="sm">
          <Text
            style={styles.heading}
            color={accent}
            transform="uppercase"
            noMargin
          >
            Skills
          </Text>
          <View style={styles.skillsRow}>
            {data.skills.map((skill) => (
              <Badge key={skill} label={skill} size="sm" variant="outline" />
            ))}
          </View>
        </Section>
        <Section spacing="sm">
          <Text
            style={styles.heading}
            color={accent}
            transform="uppercase"
            noMargin
          >
            Education
          </Text>
          {data.education.map((entry) => (
            <View
              key={`${entry.degree}-${entry.school}-${entry.year ?? ""}`}
              style={styles.educationRow}
            >
              <View>
                <Text variant="sm" weight="semibold" noMargin>
                  {entry.degree}
                </Text>
                <Text variant="sm" color="mutedForeground" noMargin>
                  {entry.school}
                </Text>
              </View>
              {entry.year && (
                <Text variant="xs" color="mutedForeground" noMargin>
                  {entry.year}
                </Text>
              )}
            </View>
          ))}
        </Section>
        <Text align="center" variant="xs" color="mutedForeground" noMargin>
          References available on request
        </Text>
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

export const ResumeDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: ResumeProps;
} & Partial<ResumeProps>) => (
  <PdfcnThemeProvider theme={theme}>
    <ResumeContent
      data={{
        ...sampleData,
        ...stripUndefined(data),
        ...stripUndefined(props),
      }}
    />
  </PdfcnThemeProvider>
);
