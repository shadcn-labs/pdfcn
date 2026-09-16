import { PdfSignatureBlock } from "@/registry/bases/takumi/components/signature/signature";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <PdfSignatureBlock
    variant="single"
    label="Authorized By"
    name="John Doe"
    title="CEO, Acme Corp"
    date="15 February 2026"
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
