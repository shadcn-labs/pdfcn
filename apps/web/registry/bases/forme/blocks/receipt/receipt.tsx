import { Document, Page, StyleSheet, View } from "@formepdf/react";

import { Barcode } from "@/registry/bases/forme/components/barcode/barcode";
import { PdfImage } from "@/registry/bases/forme/components/pdf-image/pdf-image";
import {
  Table,
  TableCell,
  TableRow,
} from "@/registry/bases/forme/components/table/table";
import { Text } from "@/registry/bases/forme/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/forme/components/theme-provider";
import { Totals } from "@/registry/bases/forme/components/totals/totals";
import { Rect, Svg } from "@/registry/bases/forme/lib/pdf-svg";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { ReceiptData } from "./receipt.types";

// Sample data — replace with your own props or data source
const sampleData: ReceiptData = {
  companyName: "Corner Café",
  date: "September 13, 2026, 09:42",
  fees: [{ label: "Tip", value: 2 }],
  items: [
    { name: "Flat white", qty: 2, total: 9 },
    { name: "Almond croissant", qty: 1, total: 4.5 },
    { name: "Sparkling water", qty: 1, total: 3 },
  ],
  paymentMethod: "card",
  receiptNumber: "004812",
  subtotal: 16.5,
  thankYouNote: "Thanks for visiting. See you tomorrow.",
  total: 18.5,
};

/** A5 portrait — compact half-page receipt. */
const RECEIPT_SIZE = { height: 595, width: 420 };
const COLUMN_WIDTH = 300;
const PAGE_MARGIN = 24;

/** Dashed rule built from small rects — renderers ignore stroke-dasharray. */
const DASH_LENGTH = 4;
const DASH_GAP = 3;

const DashedRule = ({ color, width }: { color: string; width: number }) => {
  const dashes = Math.ceil(width / (DASH_LENGTH + DASH_GAP));
  return (
    <Svg height={1} width={width}>
      {Array.from({ length: dashes }, (_, i) => (
        <Rect
          fill={color}
          height={1}
          key={i * (DASH_LENGTH + DASH_GAP)}
          width={DASH_LENGTH}
          x={i * (DASH_LENGTH + DASH_GAP)}
          y={0}
        />
      ))}
    </Svg>
  );
};

const ReceiptContent = ({ data }: { data: ReceiptData }) => {
  const theme = usePdfcnTheme();
  const { spacing, typography } = theme.primitives;
  const styles = StyleSheet.create({
    barcodeArea: {
      alignItems: "center",
      marginTop: spacing[4],
    },
    column: {
      alignSelf: "center",
      width: COLUMN_WIDTH,
    },
    companyName: {
      color: theme.colors.foreground,
      fontSize: typography.lg,
      fontWeight: "bold",
      textAlign: "center",
    },
    date: {
      color: theme.colors.mutedForeground,
      fontSize: typography.xs,
      marginTop: spacing[1],
      textAlign: "center",
    },
    divider: {
      marginVertical: spacing[3],
    },
    eyebrow: {
      color: theme.colors.mutedForeground,
      fontSize: typography.xs,
      letterSpacing: 2,
      marginBottom: spacing[2],
      textAlign: "center",
      textTransform: "uppercase",
    },
    header: {
      marginBottom: spacing[2],
    },
    logo: {
      alignSelf: "center",
      height: 32,
      marginBottom: spacing[2],
    },
    thankYou: {
      color: theme.colors.mutedForeground,
      fontSize: typography.xs,
      marginTop: spacing[4],
      textAlign: "center",
    },
  });
  const currency = data.currency ?? "$";
  const fmt = (value: number) => `${currency}${value.toFixed(2)}`;

  const totalsItems = [
    { label: "Subtotal", value: fmt(data.subtotal) },
    ...(data.fees ?? []).map((fee) => ({
      label: fee.label,
      value: fmt(fee.value),
    })),
  ];

  return (
    <Document title={`Receipt ${data.receiptNumber}`}>
      <Page margin={PAGE_MARGIN} size={RECEIPT_SIZE}>
        <View style={styles.column}>
          <View style={styles.header}>
            <Text noMargin style={styles.eyebrow}>
              Receipt
            </Text>
            {data.companyLogo ? (
              <PdfImage src={data.companyLogo} style={styles.logo} />
            ) : null}
            <Text noMargin style={styles.companyName}>
              {data.companyName}
            </Text>
            <Text noMargin style={styles.date}>
              {data.date}
            </Text>
          </View>

          <View style={styles.divider}>
            <DashedRule color={theme.colors.border} width={COLUMN_WIDTH} />
          </View>

          <Table variant="compact">
            <TableRow header>
              <TableCell>Item</TableCell>
              <TableCell align="center" width={40}>
                Qty
              </TableCell>
              <TableCell align="right" width={64}>
                Total
              </TableCell>
            </TableRow>
            {data.items.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center" width={40}>
                  {`${item.qty}`}
                </TableCell>
                <TableCell align="right" width={64}>
                  {fmt(item.total)}
                </TableCell>
              </TableRow>
            ))}
          </Table>

          <View style={styles.divider}>
            <DashedRule color={theme.colors.border} width={COLUMN_WIDTH} />
          </View>

          <Totals
            align="full"
            items={totalsItems}
            total={fmt(data.total)}
            totalLabel={`Paid by ${data.paymentMethod}`}
          />

          <View style={styles.divider}>
            <DashedRule color={theme.colors.border} width={COLUMN_WIDTH} />
          </View>

          <View style={styles.barcodeArea}>
            <Barcode
              caption={data.receiptNumber}
              data={data.barcodeValue ?? data.receiptNumber}
              height={36}
            />
          </View>

          {data.thankYouNote ? (
            <Text noMargin style={styles.thankYou}>
              {data.thankYouNote}
            </Text>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};

export const ReceiptDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: ReceiptData;
} & Partial<ReceiptData>) => (
  <PdfcnThemeProvider theme={theme}>
    <ReceiptContent data={{ ...sampleData, ...data, ...props }} />
  </PdfcnThemeProvider>
);
