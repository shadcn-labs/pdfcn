import { Divider } from "@/registry/bases/takumi/components/divider/divider";
import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { Stack } from "@/registry/bases/takumi/components/stack/stack";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <Stack gap="md">
    <Heading level={2}>Section</Heading>
    <Text>First paragraph in the stack.</Text>
    <Text>Second paragraph with consistent spacing.</Text>
    <Divider spacing="lg" />
    <Stack gap="lg">
      <Heading level={3}>Wider gap</Heading>
      <Text>Content grouped with a larger vertical rhythm.</Text>
    </Stack>
  </Stack>
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
