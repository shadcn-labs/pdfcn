import { Badge } from "@/registry/bases/takumi/components/badge/badge";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginBottom: 12,
    }}
  >
    <Badge label="Small" variant="default" size="sm" />
    <Badge label="Medium" variant="default" size="md" />
    <Badge label="Large" variant="default" size="lg" />
  </div>
);

const Demo = () => (
  <div data-pdf-document>
    <div
      data-pdf-page
      style={{
        display: "flex",
        flexDirection: "column",
        height: 200,
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
