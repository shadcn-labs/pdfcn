import type { PDFComponentProps } from "@/registry/types/pdf-components";

/** Table visual style variant. */
export type TableVariant =
  | "line"
  | "grid"
  | "minimal"
  | "striped"
  | "compact"
  | "bordered"
  | "primary-header";

/**
 * Table container with visual style variants and optional zebra striping.
 * Maps to pdfme `table` schema (`head` + `rows`).
 */
export interface TableProps extends PDFComponentProps {
  /**
   * @default 'line'
   */
  variant?: TableVariant;
  /**
   * @default false
   */
  zebraStripe?: boolean;
  /**
   * @default false
   */
  noWrap?: boolean;
}

export type TableSectionProps = PDFComponentProps;

export interface TableRowProps extends PDFComponentProps {
  header?: boolean;
  footer?: boolean;
  stripe?: boolean;
  variant?: TableVariant;
}

export interface TableCellProps extends PDFComponentProps {
  header?: boolean;
  footer?: boolean;
  align?: "left" | "center" | "right";
  width?: string | number;
  variant?: TableVariant;
  _last?: boolean;
}
