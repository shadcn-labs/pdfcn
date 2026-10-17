import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
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
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { CoverLetterProps } from "./cover-letter.types";

// Sample data — replace with your own props or data source
const sampleData: CoverLetterProps = {
  accentColor: "#0f766e",
  applicantName: "Sam Rivera",
  body: [
    "I have followed Lumen Health since your first clinic app launched, and the care you put into making health information understandable is exactly why I want to join as Design Lead.",
    "At Tidewave I led a team of four designers through a full redesign that lifted activation by 23%. I would love to bring that same mix of research, craft and patience to your patients.",
    "Thank you for your time. I would be glad to talk whenever suits you.",
  ],
  closing: "Warm regards,",
  company: "Lumen Health",
  highlight: {
    cite: "A principle I design by",
    quote: "Good design in healthcare is measured in anxiety removed.",
  },
  role: "Design Lead",
};

const CoverLetterContent = ({ data }: { data: CoverLetterProps }) => {
  const theme = usePdfcnTheme();

  const styles = StyleSheet.create({
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative",
    },
    signatureName: {
      fontSize: 15,
      fontStyle: "italic",
      marginBottom: 2,
    },
  });

  const greeting = data.greeting ?? `Dear hiring team at ${data.company},`;
  const closing = data.closing ?? "Warm regards,";
  const accent = data.accentColor ?? "mutedForeground";
  const firstParagraphs = data.highlight ? data.body.slice(0, 2) : data.body;
  const restParagraphs = data.highlight ? data.body.slice(2) : [];

  return (
    <Document title={`Cover Letter — ${data.applicantName}`}>
      <Page size="A4" style={styles.page}>
        <Section spacing="none">
          <Text
            variant="xs"
            weight="bold"
            transform="uppercase"
            color={accent}
            noMargin
          >
            {`Application for ${data.role}`}
          </Text>
          <Text variant="2xl" weight="bold" noMargin>
            {data.applicantName}
          </Text>
          {data.contactLine && (
            <Text variant="sm" color="mutedForeground" noMargin>
              {data.contactLine}
            </Text>
          )}
        </Section>
        <Section spacing="none">
          <Text variant="sm" noMargin>
            {greeting}
          </Text>
          {firstParagraphs.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} variant="sm">
              {paragraph}
            </Text>
          ))}
        </Section>
        {data.highlight && (
          <Section
            spacing="sm"
            variant="callout"
            accentColor={data.accentColor}
          >
            <Text variant="base" italic noMargin>
              {`“${data.highlight.quote}”`}
            </Text>
            <Text variant="xs" color="mutedForeground" noMargin>
              {`— ${data.highlight.cite}`}
            </Text>
          </Section>
        )}
        {restParagraphs.length > 0 && (
          <Section spacing="none">
            {restParagraphs.map((paragraph) => (
              <Text key={paragraph.slice(0, 24)} variant="sm">
                {paragraph}
              </Text>
            ))}
          </Section>
        )}
        <Section spacing="none">
          <Text variant="sm" noMargin>
            {closing}
          </Text>
          <Text style={styles.signatureName} noMargin>
            {data.applicantName}
          </Text>
        </Section>
        {data.contactLine && (
          <PageFooter
            leftText={data.applicantName}
            rightText={data.contactLine}
            sticky
            pagePadding={25}
          />
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

export const CoverLetterDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: CoverLetterProps;
} & Partial<CoverLetterProps>) => {
  const definedData = stripUndefined(data);
  const definedProps = stripUndefined(props);
  const merged: CoverLetterProps = {
    ...sampleData,
    ...definedData,
    ...definedProps,
  };
  // The sample highlight is a preview aid: when the caller supplies their
  // own letter data without a highlight, do not leak the sample quote in.
  if (
    (data !== undefined || Object.keys(props).length > 0) &&
    definedData.highlight === undefined &&
    definedProps.highlight === undefined
  ) {
    delete merged.highlight;
  }
  return (
    <PdfcnThemeProvider theme={theme}>
      <CoverLetterContent data={merged} />
    </PdfcnThemeProvider>
  );
};
