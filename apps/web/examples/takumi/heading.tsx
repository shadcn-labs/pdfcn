import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <Section spacing="none">
    <Heading level={1}>Main Title</Heading>
    <Heading level={2} align="center" color="primary">
      Subtitle
    </Heading>
    <Heading level={3} style={{ color: "#1e3a5f" }}>
      Custom Styled
    </Heading>
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
