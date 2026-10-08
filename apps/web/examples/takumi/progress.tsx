import { PdfProgress } from "@/registry/bases/takumi/components/progress/progress";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import { Document, Page } from "@/registry/bases/takumi/lib/pdf-primitives";

const DemoBody = () => (
  <PdfProgress
    items={[
      { label: "Self-serve onboarding", value: 70 },
      { label: "SOC 2 Type II", value: 45 },
      { label: "Mobile app beta", value: 20 },
    ]}
  />
);

const Demo = () => (
  <Document>
    <Page size="A4">
      <PdfcnThemeProvider>
        <DemoBody />
      </PdfcnThemeProvider>
    </Page>
  </Document>
);

export default Demo;
