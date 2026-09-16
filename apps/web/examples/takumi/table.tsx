import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/registry/bases/takumi/components/table/table";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <Table variant="line" zebraStripe={false}>
    <TableHeader>
      <TableRow header>
        <TableCell>Item</TableCell>
        <TableCell align="center">Qty</TableCell>
        <TableCell align="right">Price</TableCell>
        <TableCell align="right">Total</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Design</TableCell>
        <TableCell align="center">1</TableCell>
        <TableCell align="right">$150.00</TableCell>
        <TableCell align="right">$150.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Development</TableCell>
        <TableCell align="center">1</TableCell>
        <TableCell align="right">$2,500.00</TableCell>
        <TableCell align="right">$2,500.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Testing</TableCell>
        <TableCell align="center">1</TableCell>
        <TableCell align="right">$800.00</TableCell>
        <TableCell align="right">$800.00</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow footer>
        <TableCell>Total</TableCell>
        <TableCell> </TableCell>
        <TableCell> </TableCell>
        <TableCell align="right">$3,450.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
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
