import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { KeepTogether } from "@/registry/bases/takumi/components/keep-together/keep-together";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <Section spacing="none">
    <KeepTogether>
      <Heading level={2}>Section Title</Heading>
      <Section variant="callout" padding="sm">
        <Text noMargin>
          This heading and callout stay together as one atomic block when the
          document flows onto another page.
        </Text>
      </Section>
    </KeepTogether>
    <KeepTogether minPresenceAhead={80}>
      <Heading level={3}>Subsection Heading</Heading>
      <Text>
        Reserve enough room before starting this subsection so its heading is
        never stranded at the bottom of a page.
      </Text>
    </KeepTogether>
    <KeepTogether>
      <Heading level={4}>Signature Block</Heading>
      <Section variant="card" padding="sm">
        <Text noMargin>Approved by: ____________________</Text>
      </Section>
    </KeepTogether>
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
