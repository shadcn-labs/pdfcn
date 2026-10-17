import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
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

import type { BusinessLetterProps } from "./business-letter.types";

// Sample data — replace with your own props or data source
const sampleData: BusinessLetterProps = {
  accentColor: "#1e3a5f",
  body: [
    "Thank you for meeting with us last week. As discussed, we are pleased to confirm our engagement to review your supplier contracts ahead of the renewal period.",
    "Our review will cover pricing terms, liability clauses and termination rights, and we will share a written summary with recommended changes within three weeks.",
    "Please let us know if there is anything else you would like us to consider.",
  ],
  companyAddress: "1 Fleet Place, London · info@hartwellreed.com",
  companyName: "Hartwell & Reed LLP",
  companyTagline: "Advisors since 1987",
  date: "13 September 2026",
  recipient: {
    address: "88 Canal Street, Manchester",
    company: "Orion Logistics Ltd",
    name: "Jordan Alvarez",
  },
  sender: { name: "Eleanor Hartwell", role: "Partner" },
};

const BusinessLetterContent = ({ data }: { data: BusinessLetterProps }) => {
  const theme = usePdfcnTheme();

  const styles = StyleSheet.create({
    letterhead: {
      alignItems: "center",
      borderBottomColor: theme.colors.border,
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
      display: "flex",
      flexDirection: "column",
      paddingBottom: 12,
    },
    logo: {
      height: 48,
      margin: 0,
      marginBottom: 6,
      width: 48,
    },
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

  const salutation = data.salutation ?? `Dear ${data.recipient.name},`;
  const closing = data.closing ?? "Yours sincerely,";

  return (
    <Document title={`Business Letter — ${data.companyName}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.letterhead}>
          {data.companyLogo && (
            <PdfImage src={data.companyLogo} style={styles.logo} />
          )}
          <Text
            variant="2xl"
            weight="bold"
            align="center"
            color={data.accentColor}
            noMargin
          >
            {data.companyName}
          </Text>
          {data.companyTagline && (
            <Text variant="sm" align="center" color="mutedForeground" noMargin>
              {data.companyTagline}
            </Text>
          )}
          {data.companyAddress && (
            <Text variant="xs" align="center" color="mutedForeground" noMargin>
              {data.companyAddress}
            </Text>
          )}
        </View>
        <Section spacing="none">
          <Text variant="sm" color="mutedForeground" noMargin>
            {data.date}
          </Text>
        </Section>
        <Section spacing="none">
          <Text variant="sm" weight="semibold" noMargin>
            {data.recipient.name}
          </Text>
          {data.recipient.company && (
            <Text variant="sm" noMargin>
              {data.recipient.company}
            </Text>
          )}
          <Text variant="sm" color="mutedForeground" noMargin>
            {data.recipient.address}
          </Text>
        </Section>
        <Section spacing="none">
          <Text variant="sm" noMargin>
            {salutation}
          </Text>
          {data.body.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} variant="sm">
              {paragraph}
            </Text>
          ))}
        </Section>
        <Section spacing="none">
          <Text variant="sm" noMargin>
            {closing}
          </Text>
          <Text style={styles.signatureName} noMargin>
            {data.sender.name}
          </Text>
          <Text variant="sm" color="mutedForeground" noMargin>
            {data.sender.role}
          </Text>
        </Section>
        <PageFooter
          leftText={
            data.reference ? `Ref: ${data.reference}` : data.companyName
          }
          rightText={data.companyAddress}
          sticky
          pagePadding={25}
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

export const BusinessLetterDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: BusinessLetterProps;
} & Partial<BusinessLetterProps>) => {
  const callerData = { ...stripUndefined(data), ...stripUndefined(props) };
  const hasCallerData = Object.keys(callerData).length > 0;
  const merged: BusinessLetterProps = hasCallerData
    ? {
        ...sampleData,
        ...callerData,
        // Branding belongs to the company sending the letter. When a
        // caller supplies letter data, branding fields come only from the
        // caller: an omitted tagline or address must never fall back to
        // the sample company's details.
        companyAddress: callerData.companyAddress,
        companyLogo: callerData.companyLogo,
        companyName: callerData.companyName ?? "",
        companyTagline: callerData.companyTagline,
      }
    : sampleData;
  return (
    <PdfcnThemeProvider theme={theme}>
      <BusinessLetterContent data={merged} />
    </PdfcnThemeProvider>
  );
};
