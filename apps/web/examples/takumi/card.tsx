import { PdfCard } from "@/registry/bases/takumi/components/card/card";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <PdfCard title="Project Summary" variant="default" padding="md">
    <Text noMargin>
      This card groups related content with a title and body area. Use cards to
      visually separate sections of your PDF document.
    </Text>
  </PdfCard>
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
