import { Stats } from "@/registry/bases/takumi/components/stats/stats";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import {
  Document,
  Page,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";

const DemoBody = () => (
  <View>
    <Stats
      items={[
        { label: "Revenue", note: "+18% vs Q2", value: "$1.2M" },
        { label: "Customers", note: "+412 new", value: "3,480" },
        { label: "Churn", note: "-0.4 pts", value: "1.9%" },
      ]}
    />
    <Stats
      columns={2}
      items={[
        { label: "Timeline", note: "Oct to Jan", value: "14 weeks" },
        { label: "Investment", note: "Fixed price", value: "$84k" },
      ]}
    />
    <Stats
      columns={4}
      accentColor="success"
      items={[
        { label: "Uptime", note: "Above SLA", value: "99.98%" },
        { label: "Avg. response", note: "-120 ms", value: "180 ms" },
        { label: "Tickets closed", value: "1,284" },
        {
          label: "Annual recurring revenue",
          note: "+32% YoY",
          value: "$12,480,000",
        },
        { label: "NPS", note: "+6 pts", value: "62" },
      ]}
    />
  </View>
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
