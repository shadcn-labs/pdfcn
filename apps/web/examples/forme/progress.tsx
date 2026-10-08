import { Document, Page } from "@formepdf/react";

import { PdfProgress } from "@/registry/bases/forme/components/progress/progress";

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
    <Page size="A4" margin={40}>
      <DemoBody />
    </Page>
  </Document>
);

export default Demo;
