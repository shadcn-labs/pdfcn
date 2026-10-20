import { PdfAddresses } from "@/registry/bases/takumi/components/addresses/addresses";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import { Document, Page } from "@/registry/bases/takumi/lib/pdf-primitives";

const DemoBody = () => (
  <>
    <PdfAddresses
      fromLabel="From"
      from={"Northwind Studio\n12 Market Street\nLisbon, Portugal"}
      toLabel="Bill to"
      to={"Harbour & Co.\n400 Harbour Road\nSydney, Australia"}
    />
    <PdfAddresses
      fromLabel="Ship from"
      from={"Tallow Supply\nUnit 4, Dock Road\nRotterdam, NL"}
      toLabel="Ship to"
      to={"Jamie Ortiz\n19 Rue des Lilas\nLyon, FR"}
    />
  </>
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
