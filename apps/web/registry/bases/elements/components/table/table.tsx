import { Table as UnlayerTable } from "@unlayer/react-elements";

import type {
  UnlayerRenderProps,
  UnlayerRenderStatics,
} from "@/registry/bases/elements/lib/transparent";

import type { ElementsTableProps } from "./table.types";

/**
 * Data table. Maps to Unlayer `<Table>` (`headers` + `data`).
 */
export interface PDFTableProps extends ElementsTableProps {
  repeatHeaderOnEachPage?: boolean;
}

export const PDFTable = ({
  headers,
  data,
  repeatHeaderOnEachPage = true,
}: PDFTableProps) => (
  <UnlayerTable
    data={data}
    headers={headers}
    repeatHeaderOnEachPage={repeatHeaderOnEachPage}
  />
);

// Transparent wrapper: delegate through Unlayer's item renderer.
const unlayerTable = UnlayerTable as unknown as UnlayerRenderStatics;
(PDFTable as unknown as Record<string, unknown>).__unlayerRender = (
  props: UnlayerRenderProps & PDFTableProps
) =>
  unlayerTable.__unlayerRender({
    ...props,
    data: props.data,
    headers: props.headers,
    repeatHeaderOnEachPage: props.repeatHeaderOnEachPage ?? true,
  });
(PDFTable as unknown as Record<string, unknown>).__unlayerItemConfig =
  unlayerTable.__unlayerItemConfig;
PDFTable.displayName = "Table";
