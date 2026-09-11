import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { PdfQRCode } from "@/registry/bases/takumi/components/qrcode/qrcode";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { Stack } from "@/registry/bases/takumi/components/stack/stack";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <Section spacing="none">
    <Heading level={1}>Invoice #12345</Heading>
    <Text>Amount Due: $500.00</Text>
    <Section>
      <Stack direction="horizontal" gap="lg" align="start">
        <PdfQRCode
          value="https://pdfcn.dev/pay/invoice-12345"
          size={100}
          caption="Scan to pay"
        />
        <PdfQRCode
          value="https://pdfcn.dev/verify/invoice-12345"
          size={80}
          caption="Verify document"
        />
      </Stack>
    </Section>
    <Text variant="sm" color="mutedForeground">
      QR codes are rendered as crisp vector graphics in the generated PDF.
    </Text>
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
