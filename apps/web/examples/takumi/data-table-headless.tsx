import { DataTable } from "@/registry/bases/takumi/components/data-table-headless/data-table-headless";
import { fitValue } from "@/registry/bases/takumi/components/data-table-headless/data-table-headless.utils";
import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import { Document, Page } from "@/registry/bases/takumi/lib/pdf-primitives";

interface LedgerEntry {
  category: string;
  line: string;
  region: string;
  revenue: number;
}

const ledger: LedgerEntry[] = [
  {
    category: "Subscriptions",
    line: "Enterprise plans",
    region: "North America",
    revenue: 482_000,
  },
  {
    category: "Subscriptions",
    line: "Team plans",
    region: "North America",
    revenue: 121_500,
  },
  {
    category: "Subscriptions",
    line: "Enterprise plans",
    region: "Europe",
    revenue: 366_200,
  },
  {
    category: "Services",
    line: "Onboarding",
    region: "Global",
    revenue: 88_400,
  },
  { category: "Services", line: "Training", region: "Global", revenue: 42_100 },
];

const columns = [
  {
    accessorKey: "category",
    header: "Category",
    id: "category",
  },
  {
    accessorKey: "line",
    header: "Line item",
    id: "line",
  },
  {
    accessorKey: "region",
    header: "Region",
    id: "region",
  },
  {
    accessorFn: (row: LedgerEntry) => `$${row.revenue.toLocaleString("en-US")}`,
    align: "right" as const,
    header: "Revenue",
    id: "revenue",
  },
];

const DemoBody = () => (
  <Section spacing="none">
    <Heading level={3}>Revenue Ledger</Heading>
    <DataTable
      columns={columns}
      data={ledger}
      footer={{ revenue: "$1,100,200" }}
      getSubRows={(row) =>
        row.line === "Enterprise plans"
          ? [{ ...row, category: "", line: "— incl. support tier" }]
          : undefined
      }
      stripe
      width={515}
    >
      <DataTable.Header />
      <DataTable.Body />
      <DataTable.Footer />
    </DataTable>
    <Heading level={3}>Adaptive Cells</Heading>
    <DataTable
      columns={[
        {
          accessorKey: "category",
          cell: ({ metadata, value }) =>
            metadata.maxChars === undefined
              ? fitValue(value, 18)
              : fitValue(value, Math.min(18, metadata.maxChars)),
          header: "Category",
          id: "category",
        },
        ...columns.slice(1),
      ]}
      data={ledger}
      density="auto"
      width={515}
    />
  </Section>
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
