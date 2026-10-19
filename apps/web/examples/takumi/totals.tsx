import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import { Totals } from "@/registry/bases/takumi/components/totals/totals";
import {
  Document,
  Page,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";

const DemoBody = () => (
  <View>
    <Heading level={3}>Invoice</Heading>
    <Totals
      items={[
        { label: "Subtotal", value: "$8,250" },
        { label: "Tax (20%)", value: "$1,650" },
      ]}
      totalLabel="Total due"
      total="$9,900"
    />
    <Heading level={3}>Receipt</Heading>
    <View style={{ width: 180 }}>
      <Totals
        align="full"
        items={[
          { label: "Subtotal", value: "$16.50" },
          { label: "Tip", value: "$2.00" },
        ]}
        totalLabel="Paid by card"
        total="$18.50"
      />
    </View>
  </View>
);

const Demo = () => (
  <Document>
    <Page size="A4">
      <PdfcnThemeProvider>
        <DemoBody />
      </PdfcnThemeProvider>
    </Page>
  </Document>
);

export default Demo;
