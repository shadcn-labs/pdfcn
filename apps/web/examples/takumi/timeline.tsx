import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import { Timeline } from "@/registry/bases/takumi/components/timeline/timeline";
import { Document, Page } from "@/registry/bases/takumi/lib/pdf-primitives";

const DemoBody = () => (
  <Timeline
    items={[
      {
        body: "Goals and scope agreed with all stakeholders.",
        date: "Mar 2026",
        title: "Kick-off",
      },
      {
        body: "Component API reviewed; design tokens finalized.",
        date: "Apr 2026",
        title: "Design sign-off",
      },
      {
        body: "Takumi base shipped; Forme base in progress.",
        date: "May 2026",
        title: "Implementation",
      },
      {
        date: "Jun 2026",
        title: "Release",
      },
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
