import { View } from "@/registry/bases/pdfme/lib/pdf-primitives";
import type { Style } from "@/registry/bases/pdfme/lib/pdf-primitives";
import type { PDFComponentProps } from "@/registry/types/pdf-components";

export interface StackProps extends PDFComponentProps {
  gap?: number;
  direction?: "vertical" | "horizontal";
  align?: "start" | "center" | "end" | "stretch";
}

/**
 * Vertical/horizontal stack. Maps to pdfme `Stack` and `Row` primitives.
 */
export const Stack = ({
  gap = 8,
  direction = "vertical",
  align = "stretch",
  children,
  style,
}: StackProps) => {
  const alignMap = {
    center: "center",
    end: "flex-end",
    start: "flex-start",
    stretch: "stretch",
  } as const;
  const styleArray: Style[] = [
    {
      alignItems: alignMap[align],
      display: "flex",
      flexDirection: direction === "horizontal" ? "row" : "column",
      gap,
    },
  ];
  if (style) {
    styleArray.push(...[style].flat());
  }
  return <View style={styleArray}>{children}</View>;
};
