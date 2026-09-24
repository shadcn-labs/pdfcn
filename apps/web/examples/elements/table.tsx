import { PDFTable } from "@/registry/bases/elements/components/table/table";

const Demo = () => (
  <PDFTable
    data={[
      ["Design", "1", "$800"],
      ["Automation", "2", "$1,200"],
    ]}
    headers={["Item", "Qty", "Price"]}
  />
);
export default Demo;
