import { StyleSheet } from "@/registry/bases/forme/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all columns styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createColumnsStyles = (t: PdfcnTheme) => {
  const { spacing, fontWeights } = t.primitives;

  return StyleSheet.create({
    column: {
      flexBasis: 0,
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
    },
    container: {
      flexDirection: "row",
      marginBottom: spacing[3],
    },
    divider: {
      flexShrink: 0,
      width: 0.5,
    },
    emphasis: {
      fontWeight: fontWeights.bold,
    },
    line: {
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
    },
    spacer: {
      flexShrink: 0,
    },
  });
};
