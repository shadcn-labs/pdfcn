import { Document, Page, View } from "@formepdf/react";

import { Heading } from "@/registry/bases/forme/components/heading/heading";
import { Totals } from "@/registry/bases/forme/components/totals/totals";

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
    <Page size="A4" margin={30}>
      <DemoBody />
    </Page>
  </Document>
);

export default Demo;
