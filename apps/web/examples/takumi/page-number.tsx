import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { PageNumber } from "@/registry/bases/takumi/components/page-number/page-number";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <div style={{ minHeight: 680, position: "relative" }}>
    <div style={{ marginBottom: 60 }}>
      <Heading level={1}>Multi-Page Report</Heading>
      <Text>
        Page numbers make long reports easier to review, reference, and print.
      </Text>
      <Text>
        The format token displays the current page together with the total page
        count.
      </Text>
    </div>
    <div style={{ bottom: 0, left: 0, position: "absolute", right: 0 }}>
      <PageNumber format="Page 1 of 1" align="center" />
    </div>
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
