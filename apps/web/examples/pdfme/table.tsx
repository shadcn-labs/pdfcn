import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/registry/bases/pdfme/components/table/table";

const Demo = () => (
  <Table variant="grid" zebraStripe>
    <TableHeader>
      <TableRow header>
        <TableCell>Item</TableCell>
        <TableCell align="center">Qty</TableCell>
        <TableCell align="right">Price</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Design</TableCell>
        <TableCell align="center">1</TableCell>
        <TableCell align="right">$800</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Automation</TableCell>
        <TableCell align="center">2</TableCell>
        <TableCell align="right">$1,200</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
export default Demo;
