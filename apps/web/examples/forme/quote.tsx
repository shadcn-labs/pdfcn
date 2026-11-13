import { Document, Page, View } from "@formepdf/react";

import { Quote } from "@/registry/bases/forme/components/quote/quote";

const DemoBody = () => (
  <View>
    <Quote
      text="Every household should be able to choose clean power, whether they own a roof or not."
      cite="Rosa Delgado, CEO of Solace Energy"
    />
    <Quote
      text="Good design in healthcare is measured in anxiety removed."
      cite="A principle I design by"
      align="center"
    />
    <Quote
      text="Orbit turned a two-hour chore into a five-minute task."
      cite="A happy customer"
      accentColor="success"
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
