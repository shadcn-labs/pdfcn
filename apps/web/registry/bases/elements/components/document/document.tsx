import { Document as UnlayerDocument } from "@unlayer/react-elements";
import type { ReactNode } from "react";

import { usePdfcnTheme } from "@/registry/bases/elements/components/theme-provider";
import { resolveColor } from "@/registry/bases/elements/lib/resolve-color";

export type ElementsDocumentSize =
  | "A3"
  | "A4"
  | "A5"
  | "Legal"
  | "Letter"
  | "Tabloid";

/**
 * Root wrapper for print/PDF rendering. Maps to Unlayer `<Document>`.
 */
export interface PDFDocumentProps {
  children: ReactNode;
  backgroundColor?: string;
  contentWidth?: number | `${number}px` | `${number}%` | "auto";
  documentSize?: ElementsDocumentSize;
  documentOrientation?: "portrait" | "landscape";
}

export const PDFDocument = ({
  children,
  backgroundColor,
  contentWidth = "800px",
  documentSize = "A4",
  documentOrientation = "portrait",
  ...rest
}: PDFDocumentProps & Record<string, unknown>) => {
  const theme = usePdfcnTheme();
  return (
    <UnlayerDocument
      backgroundColor={
        backgroundColor
          ? resolveColor(backgroundColor, theme.colors)
          : theme.colors.background
      }
      contentWidth={contentWidth}
      documentOrientation={documentOrientation}
      documentSize={documentSize}
      {...rest}
    >
      {children}
    </UnlayerDocument>
  );
};
