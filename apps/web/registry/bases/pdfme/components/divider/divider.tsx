import { usePdfcnTheme } from "@/registry/bases/pdfme/components/theme-provider";
import { View } from "@/registry/bases/pdfme/lib/pdf-primitives";
import type { Style } from "@/registry/bases/pdfme/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/pdfme/lib/resolve-color";

export interface DividerProps {
  color?: string;
  thickness?: number;
  style?: Style | Style[];
}

/**
 * Horizontal divider. Maps to pdfme `Line` schema.
 */
export const Divider = ({ color, thickness = 1, style }: DividerProps) => {
  const theme = usePdfcnTheme();
  const styleArray: Style[] = [
    {
      borderTopColor: resolveColor(color ?? "border", theme.colors),
      borderTopStyle: "solid",
      borderTopWidth: thickness,
      marginVertical: theme.spacing.paragraphGap,
      width: "100%",
    },
  ];
  if (style) {
    styleArray.push(...[style].flat());
  }
  return <View style={styleArray} />;
};
