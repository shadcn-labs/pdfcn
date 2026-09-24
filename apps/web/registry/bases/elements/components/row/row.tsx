import {
  Column as UnlayerColumn,
  ColumnLayouts,
  Row as UnlayerRow,
} from "@unlayer/react-elements";
import type { ReactNode } from "react";

export { ColumnLayouts };

export type ElementsLayout =
  | typeof ColumnLayouts.OneColumn
  | typeof ColumnLayouts.TwoEqual
  | typeof ColumnLayouts.TwoWideNarrow
  | typeof ColumnLayouts.TwoNarrowWide
  | typeof ColumnLayouts.ThreeEqual
  | typeof ColumnLayouts.ThreeNarrowWideNarrow
  | typeof ColumnLayouts.FourEqual
  | typeof ColumnLayouts.FiveEqual;

/**
 * Layout container. Must contain `<PDFColumn>` children matching the layout.
 */
export interface PDFRowProps {
  children: ReactNode;
  layout?: ElementsLayout;
  cells?: number[];
  backgroundColor?: string;
  padding?: string;
}

export const PDFRow = ({
  children,
  layout = ColumnLayouts.OneColumn,
  cells,
  backgroundColor,
  padding,
  ...rest
}: PDFRowProps & Record<string, unknown>) => {
  const optional = {
    ...(backgroundColor === undefined ? {} : { backgroundColor }),
    ...(padding === undefined ? {} : { padding }),
    ...rest,
  };
  if (cells) {
    return (
      <UnlayerRow cells={cells} {...optional}>
        {children}
      </UnlayerRow>
    );
  }
  return (
    <UnlayerRow layout={layout} {...optional}>
      {children}
    </UnlayerRow>
  );
};

// Transparent wrapper: Unlayer matches Row children by displayName/name.
PDFRow.displayName = "Row";

export interface PDFColumnProps {
  children: ReactNode;
  padding?: string;
  backgroundColor?: string;
}

export const PDFColumn = ({
  children,
  padding,
  backgroundColor,
  ...rest
}: PDFColumnProps & Record<string, unknown>) => {
  // NOTE: Unlayer's Row calls Column as a plain function and reads
  // `dangerouslySetInnerHTML` off the result, so delegate directly instead
  // of returning JSX (which would be an unrendered element and get skipped).
  const ColumnFn = UnlayerColumn as unknown as (
    props: Record<string, unknown>
  ) => ReactNode;
  return ColumnFn({
    ...rest,
    ...(backgroundColor === undefined ? {} : { backgroundColor }),
    ...(padding === undefined ? {} : { padding }),
    children,
  });
};

// Transparent wrapper: Unlayer Row only accepts children named "Column".
PDFColumn.displayName = "Column";
