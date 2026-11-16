import { Divider } from "@/registry/bases/takumi/components/divider/divider";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import { Title } from "@/registry/bases/takumi/components/title/title";
import {
  Document,
  Page,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";

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
    <Page size="A4">
      <PdfcnThemeProvider>
        <DemoBody />
      </PdfcnThemeProvider>
    </Page>
  </Document>
);

export default Demo;
