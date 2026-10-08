import { Quote } from "@/registry/bases/takumi/components/quote/quote";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import {
  Document,
  Page,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";

const DemoBody = () => (
  <View>
    <Quote
      text="Every household should be able to choose clean power, whether they own a roof or not."
      cite="Rosa Delgado, CEO of Solace Energy"
    />
    <Quote
      text="Good design in healthcare is measured in anxiety removed."
      cite="A principle I design by"
      align="center"
    />
    <Quote
      text="Orbit turned a two-hour chore into a five-minute task."
      cite="A happy customer"
      accentColor="success"
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
