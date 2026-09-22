import { Document, Page, StyleSheet, View } from "@formepdf/react";

import { PdfQRCode } from "@/registry/bases/forme/components/qrcode/qrcode";
import { Text } from "@/registry/bases/forme/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/forme/components/theme-provider";
import { Image } from "@/registry/bases/forme/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/forme/lib/resolve-color";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type {
  ShippingLabelAddress,
  ShippingLabelData,
} from "./shipping-label.types";

// Sample data — replace with your own props or data source
const sampleData: ShippingLabelData = {
  carrier: "UPS",
  dimensions: '12" x 8" x 6"',
  from: {
    address: "456 Industrial Blvd",
    city: "Los Angeles",
    country: "USA",
    name: "ACME Corporation",
    state: "CA",
    zip: "90001",
  },
  handlingLabels: ["FRAGILE", "THIS SIDE UP"],
  packageCount: 1,
  postage: "$18.40",
  serviceLevel: "Ground",
  to: {
    address: "123 Main Street, Apt 4B",
    city: "New York",
    country: "USA",
    name: "John Doe",
    phone: "(503) 555-0142",
    state: "NY",
    zip: "10001",
  },
  trackingNumber: "TRACK123456789US",
  weight: "2.5 kg",
};

// Standard 4" x 6" shipping label, expressed in PDF points (72 dpi)
const LABEL_SIZE = { height: 432, width: 288 };

// Quiet zone kept clear of the printed label frame, plus the frame itself
const LABEL_MARGIN = 8;
const LABEL_BORDER = 2;
const LABEL_PADDING = 10;

// Forme scales an image with the Image element's own width/height (style
// dimensions only size the box), so the barcode is measured in points from
// the label's content box instead of a percentage width.
const BARCODE_WIDTH =
  LABEL_SIZE.width - 2 * (LABEL_MARGIN + LABEL_BORDER + LABEL_PADDING);
const BARCODE_HEIGHT = 72;

const formatCityLine = (party: ShippingLabelAddress) => {
  const cityStateZip = `${party.city}, ${party.state} ${party.zip}`;
  return party.country ? `${cityStateZip}, ${party.country}` : cityStateZip;
};

// Shared address block — same treatment for both parties (10pt, bold name).
// Forme's serializer drops components that return a Fragment, so the lines are
// wrapped in a View; inside the column parent the stacking is identical.
const AddressLines = ({
  party,
}: {
  party: ShippingLabelAddress & { phone?: string };
}) => (
  <View>
    <Text noMargin variant="xs" weight="bold">
      {party.name}
    </Text>
    <Text noMargin variant="xs">
      {party.address}
    </Text>
    <Text noMargin variant="xs">
      {formatCityLine(party)}
    </Text>
    {party.phone && (
      <Text noMargin variant="xs" color="mutedForeground">
        {party.phone}
      </Text>
    )}
  </View>
);

const ShippingLabelContent = ({ data }: { data: ShippingLabelData }) => {
  const theme = usePdfcnTheme();

  const accent = resolveColor(
    data.accentColor ?? theme.colors.primary,
    theme.colors
  );

  const detailRows = [
    ...(data.weight ? [{ key: "Weight", value: data.weight }] : []),
    ...(data.dimensions ? [{ key: "Dimensions", value: data.dimensions }] : []),
    ...(typeof data.packageCount === "number"
      ? [{ key: "Packages", value: `${data.packageCount}` }]
      : []),
    { key: "Postage", value: data.postage ?? "PAID" },
  ];

  const styles = StyleSheet.create({
    addresses: { flex: 1, flexDirection: "row" },
    badgesRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 8,
    },
    barcodeArea: { alignItems: "center", marginTop: 10 },
    carrierName: { fontSize: 16, fontWeight: "bold" },
    fromColumn: { flex: 1, paddingLeft: 12 },
    handlingTag: {
      alignItems: "center",
      backgroundColor: theme.colors.foreground,
      justifyContent: "center",
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    handlingTagText: {
      color: theme.colors.background,
      fontSize: 8,
      fontWeight: "bold",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    headerRow: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    label: {
      borderColor: theme.colors.foreground,
      borderWidth: LABEL_BORDER,
      flex: 1,
      padding: LABEL_PADDING,
    },
    page: {
      backgroundColor: theme.colors.background,
      flex: 1,
      flexDirection: "column",
      height: LABEL_SIZE.height - LABEL_MARGIN * 2,
      overflow: "hidden",
    },
    rule: {
      backgroundColor: theme.colors.foreground,
      height: 2,
      marginVertical: 6,
    },
    sectionLabel: {
      color: accent,
      fontSize: 8,
      fontWeight: "bold",
      letterSpacing: 1,
      marginBottom: 4,
      textTransform: "uppercase",
    },
    serviceRight: { alignItems: "flex-end" },
    shipToColumn: {
      borderRightColor: theme.colors.foreground,
      borderRightWidth: 2,
      flex: 1.4,
      paddingRight: 12,
    },
    table: {
      borderColor: theme.colors.foreground,
      borderWidth: 2,
    },
    tableKey: {
      color: theme.colors.mutedForeground,
      fontSize: 8,
      fontWeight: "bold",
      letterSpacing: 0.5,
      textTransform: "uppercase",
      width: 84,
    },
    tableRow: {
      alignItems: "center",
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      flexDirection: "row",
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    tableRowLast: {
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    tableValue: { flex: 1 },
    trackingText: {
      fontWeight: "bold",
      letterSpacing: 2,
      marginTop: 6,
      textTransform: "uppercase",
    },
  });

  return (
    <Document title={`Shipping Label ${data.trackingNumber}`}>
      <Page size={LABEL_SIZE} margin={LABEL_MARGIN}>
        <View style={styles.page as never}>
          <View style={styles.label}>
            <View style={styles.headerRow}>
              <Text noMargin style={styles.carrierName}>
                {data.carrier}
              </Text>
              <View style={styles.serviceRight}>
                <Text noMargin style={styles.sectionLabel}>
                  {data.serviceLevel}
                </Text>
              </View>
            </View>

            <View style={styles.rule} />

            <View style={styles.addresses}>
              <View style={styles.shipToColumn}>
                <Text noMargin style={styles.sectionLabel}>
                  Ship To
                </Text>
                <AddressLines party={data.to} />
              </View>
              <View style={styles.fromColumn}>
                <Text noMargin style={styles.sectionLabel}>
                  From
                </Text>
                <AddressLines party={data.from} />
              </View>
            </View>

            <View style={styles.rule} />

            <View style={styles.table}>
              {detailRows.map((row, index) => (
                <View
                  key={row.key}
                  style={
                    index === detailRows.length - 1
                      ? styles.tableRowLast
                      : styles.tableRow
                  }
                >
                  <Text noMargin style={styles.tableKey}>
                    {row.key}
                  </Text>
                  <Text noMargin style={styles.tableValue} variant="xs">
                    {row.value}
                  </Text>
                </View>
              ))}
            </View>

            {data.handlingLabels && data.handlingLabels.length > 0 && (
              <View style={styles.badgesRow}>
                {data.handlingLabels.map((label, index) => (
                  <View key={`${label}-${index}`} style={styles.handlingTag}>
                    <Text noMargin style={styles.handlingTagText}>
                      {label}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.barcodeArea}>
              {data.barcodeUrl ? (
                <Image
                  height={BARCODE_HEIGHT}
                  src={data.barcodeUrl}
                  width={BARCODE_WIDTH}
                />
              ) : (
                <PdfQRCode
                  backgroundColor="#ffffff"
                  color="#000000"
                  size={80}
                  value={data.trackingNumber}
                />
              )}
              <Text
                noMargin
                style={styles.trackingText}
                variant="xs"
                weight="bold"
              >
                {data.trackingNumber}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const ShippingLabelDocument = ({
  theme,
  data = sampleData,
}: {
  theme?: PdfcnTheme;
  data?: ShippingLabelData;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <ShippingLabelContent data={data} />
  </PdfcnThemeProvider>
);
