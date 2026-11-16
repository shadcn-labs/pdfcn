import { Document, Page, View } from "@formepdf/react";

import { Columns } from "@/registry/bases/forme/components/columns/columns";

const Demo = () => (
  <Document>
    <Page margin={40} size="A4">
      <View>
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
      </View>
    </Page>
  </Document>
);

export default Demo;
