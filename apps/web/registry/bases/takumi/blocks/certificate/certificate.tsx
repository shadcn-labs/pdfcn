import { PdfImage } from "@/registry/bases/takumi/components/pdf-image/pdf-image";
import { Text } from "@/registry/bases/takumi/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  View,
  Document,
  Page,
  StyleSheet,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { CertificateData } from "./certificate.types";

// Sample data — replace with your own props or data source
const sampleData: CertificateData = {
  courseTitle: "Advanced Data Visualisation",
  date: "13 September 2026",
  eyebrow: "Certificate of completion",
  message:
    "Awarded in recognition of outstanding work across twelve weeks of study.",
  recipient: "Priya Shah",
  signers: [
    { name: "Dr. Helen Moore", role: "Programme Director" },
    { name: "Marcus Lee", role: "Head of Faculty" },
  ],
};

/** A4 landscape — certificates print landscape by convention. */
const CERTIFICATE_SIZE = { height: 595, width: 842 };
const PAGE_PADDING = 20;
const CONTENT_HEIGHT = CERTIFICATE_SIZE.height - PAGE_PADDING * 2;
const FRAME_PADDING = 4;
const FRAME_BORDER = 1.5;
const INNER_HEIGHT = CONTENT_HEIGHT - 2 * (FRAME_PADDING + FRAME_BORDER);

const CertificateContent = ({ data }: { data: CertificateData }) => {
  const theme = usePdfcnTheme();
  const { spacing, typography } = theme.primitives;
  const accent = resolveColor(data.accentColor ?? "primary", theme.colors);
  const showBorder = data.showBorder ?? true;

  const styles = StyleSheet.create({
    bodyFull: {
      alignItems: "center",
      height: CONTENT_HEIGHT,
      justifyContent: "center",
      paddingHorizontal: spacing[8],
    },
    courseTitle: {
      color: theme.colors.foreground,
      fontSize: typography.lg,
      fontWeight: "bold",
      marginTop: spacing[2],
      textAlign: "center",
    },
    dateLine: {
      color: theme.colors.mutedForeground,
      fontSize: typography.xs,
      marginTop: spacing[3],
      textAlign: "center",
    },
    divider: {
      borderTopColor: accent,
      borderTopStyle: "solid",
      borderTopWidth: 2,
      marginTop: spacing[4],
      width: 80,
    },
    eyebrow: {
      color: theme.colors.mutedForeground,
      fontSize: typography.xs,
      letterSpacing: 2,
      textAlign: "center",
      textTransform: "uppercase",
    },
    frameInner: {
      alignItems: "center",
      borderColor: theme.colors.border,
      borderStyle: "solid",
      borderWidth: 0.5,
      height: INNER_HEIGHT,
      justifyContent: "center",
      paddingHorizontal: spacing[8],
    },
    frameOuter: {
      borderColor: accent,
      borderStyle: "solid",
      borderWidth: FRAME_BORDER,
      height: CONTENT_HEIGHT,
      padding: FRAME_PADDING,
    },
    logo: {
      alignSelf: "center",
      height: 36,
      marginBottom: spacing[4],
    },
    message: {
      color: theme.colors.mutedForeground,
      fontSize: typography.sm,
      marginTop: spacing[4],
      maxWidth: 440,
      textAlign: "center",
    },
    page: {
      boxSizing: "border-box",
      flexDirection: "column",
      height: CERTIFICATE_SIZE.height,
      padding: PAGE_PADDING,
      width: CERTIFICATE_SIZE.width,
    },
    recipient: {
      color: theme.colors.foreground,
      fontSize: 30,
      fontWeight: "bold",
      marginTop: spacing[4],
      textAlign: "center",
    },
    signerBlock: {
      alignItems: "center",
      width: 170,
    },
    signerLine: {
      borderTopColor: theme.colors.foreground,
      borderTopStyle: "solid",
      borderTopWidth: 1,
      marginBottom: spacing[2],
      width: "100%",
    },
    signerName: {
      color: theme.colors.foreground,
      fontSize: typography.sm,
      fontWeight: "bold",
      textAlign: "center",
    },
    signerRole: {
      color: theme.colors.mutedForeground,
      fontSize: typography.xs,
      marginTop: spacing[1],
      textAlign: "center",
    },
    signersRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: spacing[8],
      width: "100%",
    },
    subtitle: {
      color: theme.colors.mutedForeground,
      fontSize: typography.sm,
      marginTop: spacing[4],
      textAlign: "center",
    },
    watermark: {
      alignItems: "center",
      bottom: 0,
      justifyContent: "center",
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
    },
  });

  const content = (
    <>
      {data.watermarkImageUrl ? (
        <View style={styles.watermark}>
          <PdfImage
            fit="contain"
            height={240}
            src={data.watermarkImageUrl}
            style={{ opacity: data.watermarkOpacity ?? 0.08 }}
          />
        </View>
      ) : null}
      {data.logoUrl ? (
        <PdfImage src={data.logoUrl} style={styles.logo} />
      ) : null}
      <Text noMargin style={styles.eyebrow}>
        {data.eyebrow ?? "Certificate of completion"}
      </Text>
      <Text noMargin style={styles.recipient}>
        {data.recipient}
      </Text>
      <Text noMargin style={styles.subtitle}>
        has successfully completed
      </Text>
      <Text noMargin style={styles.courseTitle}>
        {data.courseTitle}
      </Text>

      <View style={styles.divider} />

      {data.message ? (
        <Text noMargin style={styles.message}>
          {data.message}
        </Text>
      ) : null}
      <Text noMargin style={styles.dateLine}>
        {`Awarded on ${data.date}`}
      </Text>

      <View style={styles.signersRow}>
        {data.signers.map((signer) => (
          <View key={signer.name} style={styles.signerBlock}>
            <View style={styles.signerLine} />
            <Text noMargin style={styles.signerName}>
              {signer.name}
            </Text>
            <Text noMargin style={styles.signerRole}>
              {signer.role}
            </Text>
          </View>
        ))}
      </View>
    </>
  );

  return (
    <Document title={`Certificate - ${data.recipient}`}>
      <Page size={CERTIFICATE_SIZE} style={styles.page}>
        {showBorder ? (
          <View style={styles.frameOuter}>
            <View style={styles.frameInner}>{content}</View>
          </View>
        ) : (
          <View style={styles.bodyFull}>{content}</View>
        )}
      </Page>
    </Document>
  );
};

export const CertificateDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: CertificateData;
} & Partial<CertificateData>) => (
  <PdfcnThemeProvider theme={theme}>
    <CertificateContent data={{ ...sampleData, ...data, ...props }} />
  </PdfcnThemeProvider>
);
