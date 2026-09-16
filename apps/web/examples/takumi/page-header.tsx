import { PageHeader } from "@/registry/bases/takumi/components/page-header/page-header";
import { Text } from "@/registry/bases/takumi/components/text/text";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <div>
    <PageHeader
      title="Invoice #1042"
      subtitle="Acme Corp"
      rightText="March 2026"
      rightSubText="Due: 2026-03-31"
      variant="simple"
    />
    <Text
      style={{
        color: "#555555",
        fontSize: 10,
        lineHeight: 1.6,
        marginBottom: 6,
      }}
    >
      Prepared for Northwind Industries
    </Text>
    <Text
      style={{
        color: "#555555",
        fontSize: 10,
        lineHeight: 1.6,
        marginBottom: 6,
      }}
    >
      This document demonstrates the simple page header variant.
    </Text>
  </div>
);

const Demo = () => (
  <div data-pdf-document>
    <div
      data-pdf-page
      style={{
        display: "flex",
        flexDirection: "column",
        height: 240,
        width: 595,
      }}
    >
      <PdfcnThemeProvider>
        <DemoBody />
      </PdfcnThemeProvider>
    </div>
  </div>
);

export default Demo;
