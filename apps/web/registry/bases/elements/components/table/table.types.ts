export interface ElementsTableProps {
  headers: string[];
  data: string[][];
  repeatHeaderOnEachPage?: boolean;
}

/**
 * Data table with header/row shorthands. Maps to Unlayer `<Table>`.
 */
export const toElementsTableProps = ({
  headers,
  data,
}: {
  headers: string[];
  data: (string | number)[][];
}): ElementsTableProps => ({
  data: data.map((row) => row.map(String)),
  headers,
});
