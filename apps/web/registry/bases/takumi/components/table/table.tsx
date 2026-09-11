import { Children, cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";

import { createTableStyles } from "./table.styles";
import type {
  TableCellProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableVariant,
} from "./table.types";

export const TableHeader = ({ children, style }: TableSectionProps) => (
  <div style={style as React.CSSProperties}>{children}</div>
);

export const TableBody = ({ children, style }: TableSectionProps) => (
  <div style={style as React.CSSProperties}>{children}</div>
);

export const TableFooter = ({ children, style }: TableSectionProps) => (
  <div style={style as React.CSSProperties}>{children}</div>
);

export const TableCell = ({
  header,
  footer,
  align,
  width,
  children,
  style,
  variant = "line",
  _last,
}: TableCellProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);
  const cellStyles: React.CSSProperties[] =
    width === undefined
      ? [styles.cell]
      : [styles.cellFixed, { width } as React.CSSProperties];

  const cellVariantStyle = (
    {
      bordered: styles.cellBordered,
      compact: styles.cellCompact,
      minimal: styles.cellMinimal,
      "primary-header": styles.cellPrimaryHeader,
      striped: styles.cellStriped,
    } as Partial<Record<TableVariant, React.CSSProperties>>
  )[variant];
  if (cellVariantStyle) {
    cellStyles.push(cellVariantStyle);
  }

  if (variant === "grid" && !_last) {
    cellStyles.push(styles.cellGridBorder);
  } else if (variant === "bordered" && !_last) {
    cellStyles.push(styles.cellBorderedBorder);
  }

  if (align) {
    cellStyles.push({ textAlign: align } as React.CSSProperties);
  }

  const styleArray = style ? [...cellStyles, style] : cellStyles;

  let textStyle: React.CSSProperties = styles.cellText;
  if (header) {
    textStyle = (
      {
        bordered: styles.cellTextHeaderBordered,
        compact: styles.cellTextHeaderCompact,
        grid: styles.cellTextHeaderGrid,
        line: styles.cellTextHeaderLine,
        minimal: styles.cellTextHeaderMinimal,
        "primary-header": styles.cellTextHeaderPrimaryHeader,
        striped: styles.cellTextHeaderStriped,
      } as Record<string, React.CSSProperties>
    )[variant];
  } else if (footer) {
    textStyle = styles.cellTextFooter;
  } else if (variant === "compact") {
    textStyle = styles.cellTextCompact;
  }

  const content =
    typeof children === "string" ? (
      <span
        style={{
          ...textStyle,
          ...(align ? { textAlign: align } : {}),
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </span>
    ) : (
      children
    );

  return <div style={Object.assign({}, ...styleArray)}>{content}</div>;
};

export const TableRow = ({
  header,
  footer,
  stripe,
  children,
  style,
  variant = "line",
}: TableRowProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);
  const rowStyles: React.CSSProperties[] = [
    styles.row,
    (
      {
        bordered: styles.rowBordered,
        compact: styles.rowCompact,
        grid: styles.rowGrid,
        line: styles.rowLine,
        minimal: styles.rowMinimal,
        "primary-header": styles.rowPrimaryHeader,
        striped: styles.rowStriped,
      } as Record<string, React.CSSProperties>
    )[variant],
  ];

  if (header) {
    rowStyles.push(
      (
        {
          bordered: styles.rowHeaderBordered,
          compact: styles.rowHeaderCompact,
          grid: styles.rowHeaderGrid,
          line: styles.rowHeaderLine,
          minimal: styles.rowHeaderMinimal,
          "primary-header": styles.rowHeaderPrimaryHeader,
          striped: styles.rowHeaderStriped,
        } as Record<string, React.CSSProperties>
      )[variant]
    );
  }

  if (footer) {
    if (variant === "striped") {
      rowStyles.push(styles.rowFooterStriped);
    } else {
      rowStyles.push(styles.rowFooter);
    }
  }

  if (stripe && !header && !footer) {
    rowStyles.push(styles.rowStripe);
  }

  const styleArray = style ? [...rowStyles, style] : rowStyles;
  const childArray = Children.toArray(children);
  const processedChildren = childArray.map((child, i) => {
    if (isValidElement(child) && child.type === TableCell) {
      return cloneElement(child as ReactElement<TableCellProps>, {
        _last: i === childArray.length - 1,
        footer,
        header,
        variant,
      });
    }
    return child;
  });

  return (
    <div
      style={Object.assign(
        {},
        { breakInside: "avoid" as const },
        ...styleArray
      )}
    >
      {processedChildren}
    </div>
  );
};

const processTableChildren = (
  children: ReactNode,
  variant: TableVariant,
  zebraStripe: boolean
): ReactNode => {
  let bodyRowIndex = 0;

  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if (
      child.type === TableHeader ||
      child.type === TableBody ||
      child.type === TableFooter
    ) {
      const isBody = child.type === TableBody;
      const sectionChild = child as ReactElement<TableSectionProps>;
      const sectionChildren = Children.map(
        sectionChild.props.children,
        (rowChild) => {
          if (isValidElement(rowChild) && rowChild.type === TableRow) {
            const rowProps: Partial<TableRowProps> = { variant };

            if (isBody && zebraStripe) {
              const isStripe = bodyRowIndex % 2 === 1;
              bodyRowIndex += 1;
              if (isStripe) {
                rowProps.stripe = true;
              }
            }

            return cloneElement(
              rowChild as ReactElement<TableRowProps>,
              rowProps
            );
          }
          return rowChild;
        }
      );

      return cloneElement(child, {}, sectionChildren);
    }

    if (child.type === TableRow) {
      return cloneElement(child as ReactElement<TableRowProps>, { variant });
    }

    return child;
  });
};

export const Table = ({
  children,
  style,
  variant = "line",
  zebraStripe = false,
  noWrap = false,
}: TableProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);
  const tableStyles: React.CSSProperties[] = [styles.table];
  const effectiveZebra = variant === "striped" ? true : zebraStripe;

  tableStyles.push(
    (
      {
        bordered: styles.tableBordered,
        compact: styles.tableCompact,
        grid: styles.tableGrid,
        line: styles.tableLine,
        minimal: styles.tableMinimal,
        "primary-header": styles.tablePrimaryHeader,
        striped: styles.tableStriped,
      } as Record<string, React.CSSProperties>
    )[variant]
  );

  const styleArray = style ? [...tableStyles, style] : tableStyles;
  const processedChildren = processTableChildren(
    children,
    variant,
    effectiveZebra
  );

  const inner = (
    <div style={Object.assign({}, ...styleArray)}>{processedChildren}</div>
  );
  return noWrap ? (
    <div style={{ breakInside: "avoid" as const }}>{inner}</div>
  ) : (
    inner
  );
};
