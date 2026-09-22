import { Document, Page, StyleSheet, View } from "@formepdf/react";

import { PdfImage } from "@/registry/bases/forme/components/pdf-image/pdf-image";
import { Section } from "@/registry/bases/forme/components/section/section";
import { Text } from "@/registry/bases/forme/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/forme/components/theme-provider";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { GiftCertificateData } from "./gift-certificate.types";

// Sample data — replace with your own props or data source
const sampleData: GiftCertificateData = {
  accentColor: "#000000",
  amount: 50,
  certificateCode: "PDFCN-GC-2026-00891",
  companyLogo: "/favicon.png",
  companyName: "pdfcn",
  currency: "USD",
  expiryDate: "March 31, 2027",
  message: "Happy Birthday! Enjoy a coffee on us.",
  recipientName: "Sarah",
  redemptionInstructions: "Present this certificate at any pdfcn location.",
  senderName: "Mom & Dad",
  terms: "No cash value. Non-refundable. One use per visit.",
};

const GiftCertificateContent = ({ data }: { data: GiftCertificateData }) => {
  const theme = usePdfcnTheme();
  const accentColor = data.accentColor || "#000000";
  const currencySymbol = data.currency === "USD" ? "$" : data.currency || "$";

  const styles = StyleSheet.create({
    amount: {
      color: accentColor,
      fontSize: 36,
      fontWeight: "bold",
    },
    amountContainer: {
      alignItems: "center",
      backgroundColor: theme.colors.muted,
      borderColor: accentColor,
      borderRadius: theme.primitives.borderRadius.md,
      borderStyle: "solid",
      borderWidth: 2,
      marginBottom: 10,
      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    code: {
      color: theme.colors.foreground,
      fontFamily: "Courier",
      fontSize: 13,
      fontWeight: "bold",
      letterSpacing: 1.2,
    },
    codeBox: {
      alignItems: "center",
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderRadius: theme.primitives.borderRadius.sm,
      borderStyle: "solid",
      borderWidth: 1,
      marginBottom: 8,
      marginTop: 8,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    decorativeBorder: {
      borderColor: accentColor,
      borderRadius: theme.primitives.borderRadius.lg,
      borderStyle: "solid",
      borderWidth: 3,
      padding: 16,
      position: "relative",
    },
    fieldLabel: {
      color: theme.colors.mutedForeground,
      fontSize: 9,
      fontWeight: "bold",
      letterSpacing: 1,
      marginBottom: 4,
      textTransform: "uppercase",
    },
    fieldValue: {
      color: theme.colors.foreground,
      fontSize: 14,
      fontWeight: 500,
    },
    header: {
      alignItems: "center",
      marginBottom: 8,
    },
    innerBorder: {
      borderColor: accentColor,
      borderRadius: theme.primitives.borderRadius.md,
      borderStyle: "dashed",
      borderWidth: 1,
      padding: 18,
    },
    instructionsBox: {
      marginTop: 8,
    },
    logo: {
      height: 28,
      marginBottom: 6,
      width: 28,
    },
    messageBox: {
      backgroundColor: theme.colors.muted,
      borderRadius: theme.primitives.borderRadius.sm,
      marginBottom: 8,
      marginTop: 8,
      padding: 10,
    },
    page: {
      backgroundColor: theme.colors.background,
    },
    termsText: {
      color: theme.colors.mutedForeground,
      fontSize: 8,
      lineHeight: 1.4,
      textAlign: "center",
    },
    title: {
      color: accentColor,
      fontSize: 22,
      fontWeight: "bold",
      letterSpacing: 2,
      textAlign: "center",
      textTransform: "uppercase",
    },
  });

  return (
    <Document title={`Gift Certificate ${data.certificateCode}`}>
      <Page margin={24} size="A4">
        <View style={styles.page as never}>
          <View style={styles.decorativeBorder as never}>
            <View style={styles.innerBorder as never}>
              <Section noWrap style={styles.header}>
                {data.companyLogo && (
                  <PdfImage
                    src={data.companyLogo ?? "/favicon.png"}
                    style={styles.logo}
                  />
                )}
                <Text style={styles.title} noMargin>
                  Gift Certificate
                </Text>
                {data.companyName && (
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 13,
                      fontWeight: 500,
                      marginTop: 4,
                      textAlign: "center",
                    }}
                    noMargin
                  >
                    {data.companyName}
                  </Text>
                )}
              </Section>

              <Section noWrap style={styles.amountContainer}>
                <Text style={styles.amount} noMargin>
                  {currencySymbol}
                  {data.amount.toFixed(2)}
                </Text>
              </Section>

              <Section
                noWrap
                style={{
                  flexDirection: "row",
                  gap: 28,
                  marginBottom: 8,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel} noMargin>
                    To
                  </Text>
                  <Text style={styles.fieldValue} noMargin>
                    {data.recipientName}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel} noMargin>
                    From
                  </Text>
                  <Text style={styles.fieldValue} noMargin>
                    {data.senderName}
                  </Text>
                </View>
              </Section>

              {data.message && (
                <Section noWrap style={styles.messageBox}>
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 10,
                      fontStyle: "italic",
                      lineHeight: 1.4,
                      textAlign: "center",
                    }}
                    noMargin
                  >
                    "{data.message}"
                  </Text>
                </Section>
              )}

              <Section noWrap style={styles.codeBox}>
                <Text style={styles.fieldLabel} noMargin>
                  Certificate Code
                </Text>
                <Text style={styles.code} noMargin>
                  {data.certificateCode}
                </Text>
              </Section>

              <Section
                noWrap
                style={{
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={styles.fieldLabel} noMargin>
                  Valid Until
                </Text>
                <Text
                  style={{
                    color: accentColor,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                  noMargin
                >
                  {data.expiryDate}
                </Text>
              </Section>

              {data.redemptionInstructions && (
                <Section noWrap style={styles.instructionsBox}>
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 9,
                      lineHeight: 1.3,
                      textAlign: "center",
                    }}
                    noMargin
                  >
                    {data.redemptionInstructions}
                  </Text>
                </Section>
              )}

              {data.terms && (
                <Section
                  noWrap
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.termsText} noMargin>
                    {data.terms}
                  </Text>
                </Section>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const GiftCertificateDocument = ({
  theme,
  data = sampleData,
}: {
  theme?: PdfcnTheme;
  data?: GiftCertificateData;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <GiftCertificateContent data={data} />
  </PdfcnThemeProvider>
);
