import { Columns } from "@/registry/bases/takumi/components/columns/columns";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import { Document, Page } from "@/registry/bases/takumi/lib/pdf-primitives";

const DemoBody = () => (
  <>
    <Columns
      left={
        "**Highlights**\nEnterprise plan launched in July.\nThree new partners in APAC."
      }
      right={
        "**Watch list**\nSupport response time rose to 6h.\nTwo large renewals due in Q4."
      }
    />
    <Columns
      accentColor="primary"
      left={"**Acme Corp**\nProduct design partners"}
      ratio="2:1"
      right={"Invoice INV-1187\nIssued 13 Sep 2026"}
    />
    <Columns
      left={"**Left third**\nNarrow column content wraps within its share."}
      ratio="1:2"
      right={
        "**Right two-thirds**\nThe wider column takes the remaining space and still wraps long lines without overflowing the page."
      }
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
