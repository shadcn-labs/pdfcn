import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import { PdfWatermark } from "@/registry/bases/takumi/components/watermark/watermark";

const DemoBody = () => (
  <div style={{ minHeight: 680, position: "relative" }}>
    <PdfWatermark text="DRAFT" />
    <Heading level={1}>Draft Document</Heading>
    <Text>
      This report is under review and should not be distributed externally.
    </Text>
    <Text>
      The watermark sits behind the content while remaining clearly visible.
    </Text>
    <Text>
      Use watermarks for draft, confidential, sample, or approval states.
    </Text>
  </div>
);

const Demo = () => (
  <div data-pdf-document>
    <div data-pdf-page style={{ display: "flex", flexDirection: "column" }}>
      <PdfcnThemeProvider>
        <DemoBody />
      </PdfcnThemeProvider>
    </div>
  </div>
);

export default Demo;
