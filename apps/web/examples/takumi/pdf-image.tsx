import { PREVIEW_IMAGE_DATA_URI } from "@/examples/preview-assets";
import { PdfImage } from "@/registry/bases/takumi/components/pdf-image/pdf-image";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <PdfImage
    src={PREVIEW_IMAGE_DATA_URI}
    variant="default"
    height={120}
    width={200}
    caption="Variant: default"
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
