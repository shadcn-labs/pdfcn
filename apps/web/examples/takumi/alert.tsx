import { PdfAlert } from "@/registry/bases/takumi/components/alert/alert";
import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <Section spacing="none">
    <Heading level={1}>Document Alerts</Heading>
    <Text>
      The PdfAlert component displays callout boxes with different severity
      levels.
    </Text>
    <Section>
      <PdfAlert variant="info" title="Information">
        This document contains important information about your account.
      </PdfAlert>
      <PdfAlert variant="success" title="Success">
        Your payment has been processed successfully.
      </PdfAlert>
      <PdfAlert variant="warning" title="Warning">
        Please review the terms and conditions before proceeding.
      </PdfAlert>
      <PdfAlert variant="error" title="Error">
        Missing required fields. Please complete all sections.
      </PdfAlert>
    </Section>
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
