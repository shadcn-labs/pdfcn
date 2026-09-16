import { Divider } from "@/registry/bases/takumi/components/divider/divider";
import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <div>
    <Heading level={2}>Section 1</Heading>
    <Text>Content here.</Text>
    <Divider />
    <Heading level={2}>Section 2</Heading>
    <Text>More content.</Text>
    <Divider variant="dashed" />
    <Heading level={2}>Section 3</Heading>
    <Text>More content.</Text>
    <Divider variant="dotted" />
    <Heading level={2}>Section 4</Heading>
    <Text>More content.</Text>
    <Divider label="Section Divider" />
    <Heading level={2}>Section 5</Heading>
    <Text>More content.</Text>
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
