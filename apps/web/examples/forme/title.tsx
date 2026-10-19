import { Document, Page, View } from "@formepdf/react";

import { Divider } from "@/registry/bases/forme/components/divider/divider";
import { Title } from "@/registry/bases/forme/components/title/title";

const DemoBody = () => (
  <View>
    <Title eyebrow="Invoice" title="#2026-042" />
    <Divider />
    <Title
      eyebrow="Q3 2026"
      title="Quarterly business review"
      subtitle="Performance, customers and priorities for next quarter."
      accentColor="primary"
    />
    <Divider />
    <Title
      eyebrow="Certificate of completion"
      title="Priya Shah"
      subtitle="has successfully completed Advanced Data Visualisation"
      align="center"
    />
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
