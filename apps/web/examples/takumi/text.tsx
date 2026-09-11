import { Section } from "@/registry/bases/takumi/components/section/section";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <Section spacing="none">
    <Text>
      Default body text for paragraphs, descriptions, and document content.
    </Text>
    <Text variant="xs" color="mutedForeground">
      Caption text for metadata and supporting details.
    </Text>
    <Text variant="lg">Lead paragraph with a larger typographic scale.</Text>
  </Section>
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
