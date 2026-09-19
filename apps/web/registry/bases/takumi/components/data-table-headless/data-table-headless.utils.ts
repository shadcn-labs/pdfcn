import type {
  DataTableCellMetadata,
  DataTableColumnDef,
  DataTableDensity,
  DataTableFlatRow,
  ResolvedDataTableDensity,
} from "./data-table-headless.types";

/**
 * Converts an arbitrary cell value to a display string.
 * Returns an empty string for null/undefined values.
 * @param value - The raw cell value to format.
 */
export const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "";
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return String(value);
};

/**
 * Truncates a value to fit a character budget, appending an ellipsis.
 * @param value - The raw cell value to fit.
 * @param maxChars - Maximum number of characters to display.
 * @param ellipsis - Ellipsis string appended to truncated values.
 */
export const fitValue = (
  value: unknown,
  maxChars: number,
  ellipsis = "…"
): string => {
  const text = formatValue(value);
  if (maxChars <= 0) {
    return "";
  }
  if (text.length <= maxChars) {
    return text;
  }
  if (maxChars <= 1) {
    return ellipsis.slice(0, maxChars);
  }
  return `${text.slice(0, maxChars - 1)}${ellipsis}`;
};

/**
 * Estimates how many characters fit in one cell of an evenly divided row.
 * Uses a rough average glyph width ratio for proportional fonts.
 * @param options.availableWidth - Full content width of the table (pt).
 * @param options.columnCount - Number of columns sharing the width.
 * @param options.fontSize - Cell font size (pt).
 * @param options.paddingX - Horizontal cell padding (pt).
 * @param options.charWidthRatio - Average glyph width as a font-size ratio.
 */
export const estimateCellChars = (options: {
  availableWidth: number;
  columnCount: number;
  fontSize: number;
  paddingX: number;
  charWidthRatio?: number;
}): number => {
  const {
    availableWidth,
    columnCount,
    fontSize,
    paddingX,
    charWidthRatio = 0.5,
  } = options;
  if (columnCount <= 0 || fontSize <= 0) {
    return 0;
  }
  const columnWidth = availableWidth / columnCount;
  const contentWidth = Math.max(0, columnWidth - paddingX * 2);
  return Math.floor(contentWidth / (fontSize * charWidthRatio));
};

/**
 * Picks a concrete density tier from column count and cell content length.
 * Samples the first 50 rows to keep the estimate cheap on large datasets.
 * @param columnCount - Number of columns in the table.
 * @param data - Flat row data (sub rows are not sampled).
 */
export const getAutoDensity = (
  columnCount: number,
  data: readonly unknown[]
): ResolvedDataTableDensity => {
  let maxCellLength = 0;
  const sampleSize = 50;
  const limit = Math.min(data.length, sampleSize);
  for (let index = 0; index < limit; index += 1) {
    const row = data[index];
    if (!row || typeof row !== "object") {
      continue;
    }
    for (const value of Object.values(row as Record<string, unknown>)) {
      const { length } = formatValue(value);
      if (length > maxCellLength) {
        maxCellLength = length;
      }
    }
  }
  if (columnCount >= 8 || maxCellLength >= 40) {
    return "dense";
  }
  if (columnCount >= 6 || maxCellLength >= 24) {
    return "compact";
  }
  return "default";
};

/**
 * Resolves the `auto` density to a concrete tier; explicit tiers pass through.
 * @param density - Requested density.
 * @param columnCount - Number of columns in the table.
 * @param data - Flat row data.
 */
export const resolveDensity = (
  density: DataTableDensity,
  columnCount: number,
  data: readonly unknown[]
): ResolvedDataTableDensity =>
  density === "auto" ? getAutoDensity(columnCount, data) : density;

/**
 * Flattens a row tree into a depth-annotated list, pre-order.
 * @param data - Top-level rows.
 * @param getSubRows - Returns child rows for a parent row.
 * @param depth - Current nesting depth (internal).
 */
export const flattenDataTableRows = <T>(
  data: readonly T[],
  getSubRows?: (row: T) => T[] | undefined,
  depth = 0
): DataTableFlatRow<T>[] => {
  const flattened: DataTableFlatRow<T>[] = [];
  for (const row of data) {
    flattened.push({ depth, row });
    const subRows = getSubRows?.(row);
    if (subRows && subRows.length > 0) {
      flattened.push(...flattenDataTableRows(subRows, getSubRows, depth + 1));
    }
  }
  return flattened;
};

/**
 * Reads a cell value using the column's accessor function or key.
 * Dot-path accessor keys (`"user.name"`) traverse nested objects.
 * @param row - The row to read from.
 * @param column - The column definition providing the accessor.
 */
export const getAccessorValue = (
  row: unknown,
  column: {
    accessorKey?: string;
    accessorFn?: (row: never) => unknown;
  }
): unknown => {
  if (column.accessorFn) {
    return (column.accessorFn as (row: unknown) => unknown)(row);
  }
  const key = column.accessorKey;
  if (!key) {
    return undefined;
  }
  if (key.includes(".")) {
    let value = row;
    for (const part of key.split(".")) {
      value =
        value && typeof value === "object"
          ? (value as Record<string, unknown>)[part]
          : undefined;
    }
    return value;
  }
  return (row as Record<string, unknown>)[key];
};

/** Column type accepted by the internal render helpers. */
export type LooseDataTableColumn = Omit<
  DataTableColumnDef<never>,
  "cell" | "accessorFn"
> & {
  accessorFn?: (row: unknown) => unknown;
  cell?: (context: {
    metadata: DataTableCellMetadata;
    row: unknown;
    value: unknown;
  }) => React.ReactNode;
};
