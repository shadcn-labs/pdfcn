import type { PDFComponentProps } from "@/registry/types/pdf-components";

export interface PageBreakProps extends Omit<PDFComponentProps, "children"> {
  children?: never;
}

export const PageBreak = ({ style }: PageBreakProps) => (
  <div
    style={Object.assign(
      {},
      { breakBefore: "page" as const },
      ...(style ? [style] : [])
    )}
  />
);
