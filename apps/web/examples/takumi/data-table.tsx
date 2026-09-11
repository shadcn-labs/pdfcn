import { DataTable } from "@/registry/bases/takumi/components/data-table/data-table";
import { Heading } from "@/registry/bases/takumi/components/heading/heading";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <Section spacing="none">
    <Heading level={3}>Team Directory</Heading>
    <DataTable
      size="compact"
      variant="striped"
      columns={[
        { align: "center", header: "ID", key: "id" },
        { header: "Name", key: "name" },
        { header: "Department", key: "dept" },
        { align: "center", header: "Status", key: "status" },
      ]}
      data={[
        { dept: "Engineering", id: 1, name: "Alice Johnson", status: "Active" },
        { dept: "Marketing", id: 2, name: "Bob Smith", status: "Active" },
        { dept: "Design", id: 3, name: "Carol Lee", status: "Inactive" },
        { dept: "Engineering", id: 4, name: "Dan Wilson", status: "Active" },
        { dept: "Sales", id: 5, name: "Eve Brown", status: "Active" },
        { dept: "Support", id: 6, name: "Frank Chen", status: "Active" },
        { dept: "Product", id: 7, name: "Grace Kim", status: "Active" },
        { dept: "Marketing", id: 8, name: "Hank Davis", status: "Inactive" },
      ]}
    />
  </Section>
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
