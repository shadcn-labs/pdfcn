import { Document, Page } from "@formepdf/react";

import { Barcode } from "@/registry/bases/forme/components/barcode/barcode";
import { Heading } from "@/registry/bases/forme/components/heading/heading";
import { PdfcnThemeProvider } from "@/registry/bases/forme/components/theme-provider";
import { View } from "@/registry/bases/forme/lib/pdf-primitives";

const DemoBody = () => (
  <View>
    <Heading level={3}>Code 128</Heading>
    <Barcode
      caption="Order ORB-2026-0042"
      data="ORB-2026-0042"
      format="Code128"
    />
    <Heading level={3}>Code 39</Heading>
    <Barcode caption="Receipt RC004812" data="RC004812" format="Code39" />
    <Heading level={3}>EAN-13</Heading>
    <Barcode caption="EAN 5901234123457" data="5901234123457" format="EAN13" />
    <Heading level={3}>Invalid input</Heading>
    <Barcode caption="Not a valid EAN-13" data="12ab" format="EAN13" />
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
