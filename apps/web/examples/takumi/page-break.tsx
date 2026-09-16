import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { PageBreak } from "@/registry/bases/takumi/components/page-break/page-break";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <div>
    <Heading level={1}>Section 1</Heading>
    <Text>Content on the first page.</Text>
    <PageBreak />
    <Heading level={1}>Section 2</Heading>
    <Text>Content on the second page.</Text>
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
