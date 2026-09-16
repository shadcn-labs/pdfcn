import { Link } from "@/registry/bases/takumi/components/link/link";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <Section spacing="none">
    <Link href="https://pdfcn.dev">Documentation</Link>
    <Link href="#section-1" color="primary">
      Internal link
    </Link>
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
