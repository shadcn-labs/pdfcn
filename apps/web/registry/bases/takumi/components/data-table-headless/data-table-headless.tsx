import { Children, cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/registry/bases/takumi/components/table/table";
import type { TableVariant } from "@/registry/bases/takumi/components/table/table.types";
import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import { Text as PDFText } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";

import { createDataTableStyles } from "./data-table-headless.styles";
import type { DataTableTierStyles } from "./data-table-headless.styles";
import type {
  DataTableCellMetadata,
  DataTableCellProps,
  DataTableProps,
  DataTableRowProps,
  DataTableSectionProps,
  ResolvedDataTableDensity,
} from "./data-table-headless.types";
import {
  estimateCellChars,
  flattenDataTableRows,
  formatValue,
  getAccessorValue,
  resolveDensity,
} from "./data-table-headless.utils";
import type { LooseDataTableColumn } from "./data-table-headless.utils";

/**
 * State cloned into compound children by the root component. Carries the
 * resolved theme styles and configuration so sections, rows, and cells can
 * render themselves without React context (the takumi serializer walks the
 * tree by calling function components directly).
 */
interface DataTableFlow {
  columns: LooseDataTableColumn[];
  density: ResolvedDataTableDensity;
  tier: DataTableTierStyles;
  indent: number;
  stripe: boolean;
  variant: TableVariant;
  tableWidth?: number;
  /** Set on DataTable.Body: flattened rows to auto-render. */
  rows?: { depth: number; row: unknown }[];
  /** Set on DataTable.Body: message rendered when rows is empty. */
  emptyMessage?: string;
  /** Set on DataTable.Footer: totals keyed by column id. */
  footerRecord?: Partial<Record<string, string | number>>;
  /** Set on DataTable.Row: bound row data for auto cell rendering. */
  currentRow?: unknown;
  currentRowIndex?: number;
  currentDepth?: number;
  /** Set on DataTable.Cell: bound column for value + renderer. */
  currentColumn?: LooseDataTableColumn;
  currentColumnIndex?: number;
  currentColumnCount?: number;
}

const FLOW_KEY = "__pdfcnDataTableFlow";

const readFlow = (props: unknown): DataTableFlow | null => {
  if (!props || typeof props !== "object") {
    return null;
  }
  const flow = (props as Record<string, unknown>)[FLOW_KEY];
  return typeof flow === "object" && flow !== null
    ? (flow as DataTableFlow)
    : null;
};

const injectFlow = (
  element: ReactNode,
  extraProps: Record<string, unknown>,
  flow: DataTableFlow
): ReactNode => {
  if (!isValidElement(element)) {
    return element;
  }
  return cloneElement(element as ReactElement<Record<string, unknown>>, {
    ...extraProps,
    [FLOW_KEY]: flow,
  });
};

const createCellMetadata = (
  flow: DataTableFlow,
  options: {
    columnIndex: number;
    columnCount: number;
    rowIndex: number;
    depth: number;
  }
): DataTableCellMetadata => {
  const { columnIndex, columnCount, rowIndex, depth } = options;
  const metadata: DataTableCellMetadata = {
    cellFontSize: flow.tier.fontSize,
    cellPaddingX: flow.tier.padH,
    cellPaddingY: flow.tier.padV,
    columnCount,
    columnIndex,
    density: flow.density,
    depth,
    rowIndex,
  };
  if (typeof flow.tableWidth === "number") {
    metadata.cellWidth = flow.tableWidth / Math.max(1, columnCount);
    metadata.maxChars = estimateCellChars({
      availableWidth: flow.tableWidth,
      columnCount,
      fontSize: flow.tier.fontSize,
      paddingX: flow.tier.padH,
    });
  }
  return metadata;
};

const alignStyle = (align: "left" | "center" | "right" | undefined): Style =>
  align ? ({ textAlign: align } as Style) : {};

const renderHeaderRow = (flow: DataTableFlow) => (
  <TableRow header variant={flow.variant}>
    {flow.columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align ?? "left"}
        header
        width={column.width}
      >
        <PDFText style={[flow.tier.headerText, alignStyle(column.align)]}>
          {formatValue(column.header ?? column.id)}
        </PDFText>
      </TableCell>
    ))}
  </TableRow>
);

const renderBodyCell = (
  flow: DataTableFlow,
  column: LooseDataTableColumn,
  row: unknown,
  options: {
    columnIndex: number;
    rowIndex: number;
    depth: number;
  }
) => {
  const { columnIndex, rowIndex, depth } = options;
  const value = getAccessorValue(row, column);
  const metadata = createCellMetadata(flow, {
    columnCount: flow.columns.length,
    columnIndex,
    depth,
    rowIndex,
  });
  const rendered = column.cell ? column.cell({ metadata, row, value }) : null;
  return (
    <TableCell
      key={column.id}
      align={column.align ?? "left"}
      width={column.width}
    >
      {rendered ?? (
        <PDFText
          style={[
            flow.tier.text,
            alignStyle(column.align),
            depth > 0 && columnIndex === 0
              ? { marginLeft: flow.indent * depth }
              : {},
          ]}
        >
          {formatValue(value)}
        </PDFText>
      )}
    </TableCell>
  );
};

const renderBodyRow = (
  flow: DataTableFlow,
  { depth, row }: { depth: number; row: unknown },
  index: number
) => (
  // biome-ignore lint/suspicious/noArrayIndexKey: flattened rows have no stable id; order is stable for static data
  <TableRow
    key={index}
    stripe={flow.stripe && index % 2 === 1}
    variant={flow.variant}
  >
    {flow.columns.map((column, columnIndex) =>
      renderBodyCell(flow, column, row, {
        columnIndex,
        depth,
        rowIndex: index,
      })
    )}
  </TableRow>
);

const renderBodyRows = (flow: DataTableFlow): ReactNode => {
  const rows = flow.rows ?? [];
  if (rows.length === 0) {
    return (
      <TableRow variant={flow.variant}>
        <TableCell>
          <PDFText style={flow.tier.text}>
            {flow.emptyMessage ?? "No data available"}
          </PDFText>
        </TableCell>
      </TableRow>
    );
  }
  return rows.map((flatRow, index) => renderBodyRow(flow, flatRow, index));
};

const renderFooterRow = (flow: DataTableFlow) => {
  const footerRecord = flow.footerRecord ?? {};
  return (
    <TableRow footer variant={flow.variant}>
      {flow.columns.map((column) => {
        const hasTotal = column.id in footerRecord;
        const hasColumnFooter = column.footer !== undefined;
        if (!hasTotal && !hasColumnFooter) {
          return (
            <TableCell key={column.id} width={column.width}>
              {null}
            </TableCell>
          );
        }
        const value = hasTotal ? footerRecord[column.id] : "";
        const rendered = hasColumnFooter ? column.footer : formatValue(value);
        return (
          <TableCell
            key={column.id}
            align={column.align ?? "left"}
            footer={Boolean(value) || hasColumnFooter}
            width={column.width}
          >
            <PDFText style={[flow.tier.footerText, alignStyle(column.align)]}>
              {rendered}
            </PDFText>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

/**
 * Headless table header. Under `DataTable` it renders the column headers
 * automatically when no children are provided; explicit children (rows or
 * cells) always take precedence.
 */
export const DataTableHeader = (props: DataTableSectionProps) => {
  const { children } = props;
  const flow = readFlow(props);
  return (
    <TableHeader>
      {children ?? (flow ? renderHeaderRow(flow) : null)}
    </TableHeader>
  );
};

/**
 * Headless table body. Under `DataTable` it renders the data rows
 * automatically when no children are provided; explicit children always take
 * precedence.
 */
export const DataTableBody = (props: DataTableSectionProps) => {
  const { children } = props;
  const flow = readFlow(props);
  return (
    <TableBody>{children ?? (flow ? renderBodyRows(flow) : null)}</TableBody>
  );
};

/**
 * Headless table footer. Under `DataTable` with footer totals it renders the
 * totals row when no children are provided; explicit children always take
 * precedence.
 */
export const DataTableFooter = (props: DataTableSectionProps) => {
  const { children } = props;
  const flow = readFlow(props);
  if (children) {
    return <TableFooter>{children}</TableFooter>;
  }
  if (flow?.footerRecord && Object.keys(flow.footerRecord).length > 0) {
    return <TableFooter>{renderFooterRow(flow)}</TableFooter>;
  }
  return null;
};

/**
 * Headless table row. Provide `row` to render cells automatically from the
 * bound columns, or compose explicit `DataTable.Cell` children — including
 * render-prop cells receiving `{ value, row, metadata }`.
 */
export const DataTableRow = (props: DataTableRowProps) => {
  const {
    children,
    row,
    header,
    footer,
    stripe,
    depth = 0,
    rowIndex = 0,
  } = props;
  const flow = readFlow(props);
  if (!flow) {
    return (
      <TableRow footer={footer} header={header} stripe={stripe}>
        {children}
      </TableRow>
    );
  }
  if (row !== undefined) {
    return (
      <TableRow
        footer={footer}
        header={header}
        stripe={stripe}
        variant={flow.variant}
      >
        {flow.columns.map((column, columnIndex) =>
          renderBodyCell(flow, column, row, {
            columnIndex,
            depth,
            rowIndex,
          })
        )}
      </TableRow>
    );
  }
  const childArray = Children.toArray(children);
  const decorated = childArray.map((child, index) => {
    // The compound row decorator intentionally references the cell component declared below.
    // eslint-disable-next-line no-use-before-define
    if (!isValidElement(child) || child.type !== DataTableCell) {
      return child;
    }
    return cloneElement(child as ReactElement<Record<string, unknown>>, {
      _last: index === childArray.length - 1,
      currentDepth: depth,
      currentRowIndex: rowIndex,
      footer,
      header,
      variant: flow.variant,
      [FLOW_KEY]: flow,
    });
  });
  return (
    <TableRow
      footer={footer}
      header={header}
      stripe={stripe}
      variant={flow.variant}
    >
      {decorated}
    </TableRow>
  );
};

/**
 * Headless table cell. With a bound `column` (or a column inherited from a
 * `DataTable.Row` bound with `row`) it resolves and renders the cell value;
 * function children receive `{ value, row, metadata }` so content can adapt
 * to the resolved density and estimated cell width.
 */
export const DataTableCell = (props: DataTableCellProps) => {
  const {
    children,
    column,
    row,
    value,
    align,
    width,
    header,
    footer,
    variant,
    _last,
    style,
  } = props;
  const flow = readFlow(props);
  const cellProps = {
    _last,
    align,
    footer,
    header,
    style,
    variant,
    width,
  };
  const isRenderProp = typeof children === "function";
  if (!flow) {
    return (
      <TableCell {...cellProps}>{isRenderProp ? null : children}</TableCell>
    );
  }
  const boundColumn = column ?? flow.currentColumn;
  if (!isRenderProp && !boundColumn) {
    return <TableCell {...cellProps}>{children}</TableCell>;
  }
  const boundRow = row ?? flow.currentRow;
  let resolvedValue: unknown;
  if (value !== undefined) {
    resolvedValue = value;
  } else if (boundRow !== undefined && boundColumn) {
    resolvedValue = getAccessorValue(boundRow, boundColumn);
  }
  const metadata = createCellMetadata(flow, {
    columnCount: flow.currentColumnCount ?? flow.columns.length,
    columnIndex: flow.currentColumnIndex ?? 0,
    depth: flow.currentDepth ?? 0,
    rowIndex: flow.currentRowIndex ?? 0,
  });
  const rendered = isRenderProp
    ? (
        children as (context: {
          metadata: DataTableCellMetadata;
          row: unknown;
          value: unknown;
        }) => ReactNode
      )({ metadata, row: boundRow, value: resolvedValue })
    : (children ?? (
        <PDFText
          style={[flow.tier.text, alignStyle(align ?? boundColumn?.align)]}
        >
          {formatValue(resolvedValue)}
        </PDFText>
      ));
  return <TableCell {...cellProps}>{rendered}</TableCell>;
};

/**
 * Headless data table for data-intensive PDF reports. Composes the base table
 * primitives with TanStack-style column definitions, nested rows via
 * `getSubRows`, auto density scaling, and per-cell layout metadata.
 *
 * Renders the full table from `columns`/`data`, or compose headlessly:
 *
 * ```tsx
 * <DataTable columns={columns} data={data}>
 *   <DataTable.Header />
 *   <DataTable.Body />
 *   <DataTable.Footer />
 * </DataTable>
 * ```
 */
type DataTableCompound = (<T>(props: DataTableProps<T>) => ReactNode) & {
  Body: typeof DataTableBody;
  Cell: typeof DataTableCell;
  Footer: typeof DataTableFooter;
  Header: typeof DataTableHeader;
  Row: typeof DataTableRow;
};

export const DataTable = (({
  columns,
  data,
  getSubRows,
  density = "auto",
  variant = "grid",
  stripe = false,
  footer,
  noWrap = false,
  emptyMessage = "No data available",
  width,
  style,
  children,
}: DataTableProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createDataTableStyles(theme), [theme]);
  const resolvedDensity = resolveDensity(density, columns.length, data);
  const tier = styles.tiers[resolvedDensity];
  const flattened = getSubRows
    ? flattenDataTableRows(data, getSubRows)
    : data.map((row) => ({ depth: 0 as const, row }));

  const flow: DataTableFlow = {
    columns: columns as unknown as LooseDataTableColumn[],
    density: resolvedDensity,
    emptyMessage,
    footerRecord: footer,
    indent: styles.indent,
    rows: flattened,
    stripe,
    tableWidth: width,
    tier,
    variant,
  };

  const tableChildren = children
    ? Children.map(children, (child) => injectFlow(child, {}, flow))
    : [
        injectFlow(<DataTableHeader />, {}, flow),
        injectFlow(<DataTableBody />, {}, flow),
        injectFlow(<DataTableFooter />, {}, flow),
      ];

  return (
    <Table noWrap={noWrap} style={style} variant={variant}>
      {tableChildren}
    </Table>
  );
}) as DataTableCompound;

DataTable.Header = DataTableHeader;
DataTable.Body = DataTableBody;
DataTable.Footer = DataTableFooter;
DataTable.Row = DataTableRow;
DataTable.Cell = DataTableCell;

export { formatValue } from "./data-table-headless.utils";
