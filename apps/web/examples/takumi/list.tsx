import { PdfList } from "@/registry/bases/takumi/components/list/list";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <PdfList
    variant="bullet"
    items={[
      {
        description: "Match all components to the design specification.",
        text: "Design system alignment",
      },
      {
        description: "Build PDF-native components for both renderer bases.",
        text: "Component implementation",
      },
      {
        description: "Cover all variants and edge cases.",
        text: "Write unit tests",
      },
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
