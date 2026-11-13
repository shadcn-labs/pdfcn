import { StyleSheet } from "@/registry/bases/forme/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all quote styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createQuoteStyles = (t: PdfcnTheme) => {
  const { heading, body } = t.typography;
  const { spacing, fontWeights, lineHeights, typography } = t.primitives;
  const c = t.colors;

  return StyleSheet.create({
    bar: {
      borderLeftWidth: 3,
      paddingLeft: spacing[4],
      paddingVertical: spacing[1],
    },
    centered: {
      alignItems: "center",
    },
    cite: {
      color: c.mutedForeground,
      fontFamily: body.fontFamily,
      fontSize: typography.xs,
      lineHeight: lineHeights.normal,
      marginTop: spacing[2],
    },
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: t.spacing.componentGap,
    },
    mark: {
      fontFamily: heading.fontFamily,
      // Oversized opening quote; tight line height keeps it close to the text.
      fontSize: Math.round(typography["3xl"] * 1.5),
      fontWeight: fontWeights.bold,
      lineHeight: 1,
      marginBottom: -spacing[3],
    },
    text: {
      color: c.foreground,
      fontFamily: body.fontFamily,
      fontSize: typography.lg,
      fontStyle: "italic",
      lineHeight: lineHeights.normal,
    },
  });
};
