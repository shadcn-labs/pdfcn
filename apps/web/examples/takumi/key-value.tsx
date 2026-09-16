import { KeyValue } from "@/registry/bases/takumi/components/key-value/key-value";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <KeyValue
    direction="horizontal"
    divided
    items={[
      { key: "Invoice #", value: "INV-2026-0042" },
      { key: "Issue Date", value: "15 February 2026" },
      { key: "Due Date", value: "17 March 2026" },
      { key: "Status", value: "Unpaid", valueColor: "destructive" },
      { key: "Total", value: "$4,200.00", valueColor: "primary" },
    ]}
  />
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
