import type React from "react";

import type { TableVariant } from "@/registry/bases/forme/components/table/table.types";
import type { PDFComponentProps } from "@/registry/types/pdf-components";

/** Row density tier for the headless data table. */
export type DataTableDensity = "auto" | "default" | "compact" | "dense";

/** Density tier after resolution — `auto` collapses to a concrete tier. */
export type ResolvedDataTableDensity = Exclude<DataTableDensity, "auto">;

/**
 * Layout metadata handed to cell renderers so content can adapt to the space
 * available — for example, shortening a date format when the table resolves
 * to a dense tier or a narrow column.
 */
export interface DataTableCellMetadata {
  density: ResolvedDataTableDensity;
  columnCount: number;
  columnIndex: number;
  rowIndex: number;
  /** Nesting depth: 0 for top-level rows, 1+ for nested sub rows. */
  depth: number;
  /** Resolved body font size (pt) at this density. */
  cellFontSize: number;
  /** Resolved horizontal cell padding (pt). */
  cellPaddingX: number;
  /** Resolved vertical cell padding (pt). */
  cellPaddingY: number;
  /** Estimated cell content width (pt), when the table width is known. */
  cellWidth?: number;
  /** Estimated characters that fit in the cell, when the width is known. */
  maxChars?: number;
}

/**
 * Render context passed to column `cell` functions and to function children
 * of `DataTable.Cell`.
 */
export interface DataTableCellContext<T = Record<string, unknown>> {
  value: unknown;
  row: T;
  metadata: DataTableCellMetadata;
}

export type DataTableCellRenderer<T = Record<string, unknown>> = (
  context: DataTableCellContext<T>
) => React.ReactNode;

/**
 * TanStack Table-style column definition. `accessorKey` supports dot paths
 * (`"user.name"`), or use `accessorFn` for computed values. `cell` receives
 * the value, the row, and layout metadata.
 */
export interface DataTableColumnDef<T = Record<string, unknown>> {
  id: string;
  header?: React.ReactNode;
  accessorKey?: string;
  accessorFn?: (row: T) => unknown;
  cell?: DataTableCellRenderer<T>;
  footer?: string;
  align?: "left" | "center" | "right";
  width?: string | number;
}

/** A row flattened from the data tree, carrying its nesting depth. */
export interface DataTableFlatRow<T = unknown> {
  row: T;
  depth: number;
}

/**
 * Headless data table for data-intensive PDF reports with TanStack-style
 * column definitions, nested rows, auto density, and cell metadata.
 * Props - `columns` | `data` | `getSubRows` | `density` | `variant` | `stripe` | `footer` | `noWrap` | `emptyMessage` | `width` | `style` | `children`
 * @see {@link DataTableProps}
 */
export interface DataTableProps<T = Record<string, unknown>> extends Omit<
  PDFComponentProps,
  "children"
> {
  children?: React.ReactNode;
  columns: DataTableColumnDef<T>[];
  data: T[];
  /** TanStack-style sub-row accessor for nested/tree data. */
  getSubRows?: (row: T) => T[] | undefined;
  /**
   * `auto` picks a tier from column count and cell content length.
   * @default 'auto'
   */
  density?: DataTableDensity;
  /**
   * @default 'grid'
   */
  variant?: TableVariant;
  /**
   * @default false
   */
  stripe?: boolean;
  /** Totals keyed by column id; `column.footer` takes precedence. */
  footer?: Partial<Record<string, string | number>>;
  /**
   * @default false
   */
  noWrap?: boolean;
  /**
   * @default 'No data available'
   */
  emptyMessage?: string;
  /** Table content width (pt); enables `cellWidth`/`maxChars` cell metadata. */
  width?: number;
}

export interface DataTableSectionProps extends Omit<
  PDFComponentProps,
  "children"
> {
  children?: React.ReactNode;
}

/**
 * Headless table row. Under `DataTable`, cells render automatically from the
 * bound columns when `row` is provided; explicit `DataTable.Cell` children
 * take precedence. Standalone usage falls back to plain table primitives.
 * Props - `row` | `header` | `footer` | `stripe` | `depth` | `rowIndex` | `children` | `style`
 * @see {@link DataTableRowProps}
 */
export interface DataTableRowProps extends Omit<PDFComponentProps, "children"> {
  children?: React.ReactNode;
  /** Row data for automatic cell rendering via the injected columns. */
  row?: unknown;
  header?: boolean;
  footer?: boolean;
  stripe?: boolean;
  /** Nesting depth — indents the first cell. */
  depth?: number;
  /** Body row index used in cell metadata. */
  rowIndex?: number;
}

/**
 * Headless table cell. Accepts plain children, a render function receiving
 * `{ value, row, metadata }`, or renders the bound column's value
 * automatically when used with `column` (and `row` from the parent row).
 * Props - `column` | `value` | `row` | `align` | `width` | `header` | `footer` | `children` | `style`
 * @see {@link DataTableCellProps}
 */
export interface DataTableCellProps extends Omit<
  PDFComponentProps,
  "children"
> {
  children?: React.ReactNode;
  /** Column definition binding this cell to an accessor and renderer. */
  column?: DataTableColumnDef<never>;
  /** Explicit cell value (skips the accessor). */
  value?: unknown;
  /** Explicit row data for render-prop cells. */
  row?: unknown;
  align?: "left" | "center" | "right";
  width?: string | number;
  header?: boolean;
  footer?: boolean;
  variant?: TableVariant;
  /** Injected by the parent row; marks the last cell for grid borders. */
  _last?: boolean;
}
