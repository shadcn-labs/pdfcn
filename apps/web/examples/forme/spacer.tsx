import { Document, Page, View } from "@formepdf/react";

import { Heading } from "@/registry/bases/forme/components/heading/heading";
import { PdfSignatureBlock } from "@/registry/bases/forme/components/signature/signature";
import { Spacer } from "@/registry/bases/forme/components/spacer/spacer";
import { Text } from "@/registry/bases/forme/components/text/text";

const DemoBody = () => (
  <View>
    <Spacer size={48} />
    <Text align="center" color="mutedForeground" transform="uppercase" noMargin>
      Certificate of completion
    </Text>
    <Spacer size={12} />
    <Heading level={1} align="center" noMargin>
      Priya Shah
    </Heading>
    <Spacer size={24} />
    <Text align="center" noMargin>
      has successfully completed the Advanced Typography course.
    </Text>
    <Spacer size={96} />
    <PdfSignatureBlock
      variant="single"
      label="Course Director"
      name="Daniel Reyes"
      date="9 October 2026"
    />
  </View>
);

const Demo = () => (
  <Document>
    <Page size="A4" margin={30}>
      <DemoBody />
    </Page>
  </Document>
);

export default Demo;
