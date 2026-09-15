import { Document, Page, StyleSheet, View } from "@formepdf/react";

import { KeyValue } from "@/registry/bases/forme/components/key-value/key-value";
import { PageFooter } from "@/registry/bases/forme/components/page-footer/page-footer";
import { PageHeader } from "@/registry/bases/forme/components/page-header/page-header";
import { PdfImage } from "@/registry/bases/forme/components/pdf-image/pdf-image";
import { Section } from "@/registry/bases/forme/components/section/section";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/registry/bases/forme/components/table/table";
import { Text } from "@/registry/bases/forme/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/forme/components/theme-provider";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { PackingSlipProps, PackingSlipSender } from "./packing-slip.types";

// Sample data — replace with your own props or data source
const sampleData: PackingSlipProps = {
  accentColor: "#059669",
  companyName: "Acme Store",
  customerService: "support@acme-store.com",
  items: [
    {
      name: "Widget Pro",
      qtyOrdered: 2,
      qtyPacked: 2,
      sku: "WP-001",
      unitPrice: 49.99,
    },
    {
      name: "Gadget Lite",
      qtyOrdered: 1,
      qtyPacked: 1,
      sku: "GL-010",
      unitPrice: 29.99,
    },
    {
      name: "Cable Kit",
      qtyOrdered: 3,
      qtyPacked: 2,
      sku: "CK-204",
      unitPrice: 9.5,
    },
  ],
  orderDate: "Sep 10, 2026",
  orderNumber: "ORD-2026-0891",
  poNumber: "PO-4471",
  returnsPolicy: "Returns accepted within 30 days with original packaging.",
  shipFrom: {
    address: "100 Industrial Blvd",
    city: "Seattle",
    name: "Acme Warehouse",
    state: "WA",
    zip: "98101",
  },
  shipTo: {
    address: "456 Oak Ave",
    city: "Portland",
    name: "Jane Doe",
    phone: "(503) 555-0142",
    state: "OR",
    zip: "97201",
  },
  shipping: {
    carrier: "UPS",
    estimatedDelivery: "Sep 15, 2026",
    method: "Ground",
    trackingNumber: "1Z999AA10123456784",
  },
  thankYouMessage: "Thank you for your order!",
  totalPackages: 1,
  totalWeight: "3.2 kg",
};

const formatAddress = (a: PackingSlipSender & { country?: string }) =>
  `${a.address}, ${a.city}, ${a.state} ${a.zip}${a.country ? `, ${a.country}` : ""}`;

const PackingSlipContent = ({ data }: { data: PackingSlipProps }) => {
  const theme = usePdfcnTheme();

  const styles = StyleSheet.create({
    columnHeading: {
      fontSize: 9,
      fontWeight: "bold",
      marginBottom: 2,
    },
    page: {
      backgroundColor: theme.colors.background,
    },
  });

  const totalPacked = data.items.reduce((sum, item) => sum + item.qtyPacked, 0);
  const totalOrdered = data.items.reduce(
    (sum, item) => sum + item.qtyOrdered,
    0
  );

  const summaryItems = [
    { key: "Items Packed", value: `${totalPacked} of ${totalOrdered}` },
    ...(data.totalPackages === undefined
      ? []
      : [{ key: "Packages", value: `${data.totalPackages}` }]),
    ...(data.totalWeight
      ? [{ key: "Total Weight", value: data.totalWeight }]
      : []),
  ];

  return (
    <Document title={`Packing Slip ${data.orderNumber}`}>
      <Page size="A4" margin={{ bottom: 25, left: 56, right: 56, top: 56 }}>
        <PageFooter
          leftText={data.customerService ?? data.companyName}
          rightText="Page 1 of 1"
          sticky
          pagePadding={25}
        />
        <View style={styles.page as never}>
          <PageHeader
            variant="logo-left"
            logo={
              data.companyLogo ? (
                <PdfImage src={data.companyLogo} style={{ margin: 0 }} />
              ) : undefined
            }
            title="PACKING SLIP"
            titleColor={data.accentColor}
            subtitle={data.companyName}
            rightText={data.orderNumber}
            rightSubText={`Order Date: ${data.orderDate}`}
            style={{ marginBottom: 0 }}
          />
          <Section noWrap style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, paddingRight: 15 }}>
              <Text
                style={styles.columnHeading}
                color="mutedForeground"
                transform="uppercase"
                noMargin
              >
                Ship To
              </Text>
              <Text noMargin variant="xs">
                {data.shipTo.name}
              </Text>
              <Text noMargin variant="xs">
                {formatAddress(data.shipTo)}
              </Text>
              {data.shipTo.phone && (
                <Text noMargin variant="xs">
                  {data.shipTo.phone}
                </Text>
              )}
            </View>
            <View style={{ flex: 1, paddingRight: 15 }}>
              <Text
                style={styles.columnHeading}
                color="mutedForeground"
                transform="uppercase"
                noMargin
              >
                From
              </Text>
              <Text noMargin variant="xs">
                {data.shipFrom.name}
              </Text>
              <Text noMargin variant="xs">
                {formatAddress(data.shipFrom)}
              </Text>
            </View>
            <View style={{ flex: 1, paddingRight: 15 }}>
              <Text
                style={styles.columnHeading}
                color="mutedForeground"
                transform="uppercase"
                noMargin
              >
                Order
              </Text>
              <Text noMargin variant="xs">
                {data.orderNumber}
              </Text>
              {data.poNumber && (
                <Text noMargin variant="xs">
                  {`PO: ${data.poNumber}`}
                </Text>
              )}
            </View>
          </Section>
          <Table variant="grid" zebraStripe>
            <TableHeader>
              <TableRow header>
                <TableCell>Item</TableCell>
                <TableCell align="center">SKU</TableCell>
                <TableCell align="center">Packed</TableCell>
                <TableCell align="center">Ordered</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.sku}</TableCell>
                  <TableCell align="center">{`${item.qtyPacked}`}</TableCell>
                  <TableCell align="center">{`${item.qtyOrdered}`}</TableCell>
                  <TableCell align="right">{`$${item.unitPrice.toFixed(2)}`}</TableCell>
                  <TableCell align="right">{`$${(item.qtyPacked * item.unitPrice).toFixed(2)}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Section noWrap style={{ flexDirection: "row", marginTop: 16 }}>
            <View style={{ flex: 1, paddingRight: 15 }}>
              <Text
                style={styles.columnHeading}
                color="mutedForeground"
                transform="uppercase"
                noMargin
              >
                Shipping
              </Text>
              <Text noMargin variant="xs">
                {`${data.shipping.carrier} — ${data.shipping.method}`}
              </Text>
              <Text noMargin variant="xs">
                {`Tracking: ${data.shipping.trackingNumber}`}
              </Text>
              {data.shipping.estimatedDelivery && (
                <Text noMargin variant="xs">
                  {`Est. Delivery: ${data.shipping.estimatedDelivery}`}
                </Text>
              )}
            </View>
            <View style={{ marginLeft: "auto", width: 220 }}>
              <KeyValue
                size="sm"
                dividerThickness={1}
                items={summaryItems}
                divided
              />
            </View>
          </Section>
          {(data.thankYouMessage || data.returnsPolicy) && (
            <Section spacing="sm">
              {data.thankYouMessage && (
                <Text variant="sm" weight="medium" noMargin>
                  {data.thankYouMessage}
                </Text>
              )}
              {data.returnsPolicy && (
                <Text variant="xs" color="mutedForeground" noMargin>
                  {data.returnsPolicy}
                </Text>
              )}
            </Section>
          )}
        </View>
      </Page>
    </Document>
  );
};

export const PackingSlipDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: PackingSlipProps;
} & Partial<PackingSlipProps>) => (
  <PdfcnThemeProvider theme={theme}>
    <PackingSlipContent data={{ ...sampleData, ...data, ...props }} />
  </PdfcnThemeProvider>
);
