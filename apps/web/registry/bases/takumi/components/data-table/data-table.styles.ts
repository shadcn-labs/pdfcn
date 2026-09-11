import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates compact-mode cell and text styles for the DataTable component.
 * Used when `size="compact"` to render denser rows with smaller font sizes.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createCompactStyles = (t: PdfcnTheme) => {
  const { spacing, fontWeights, lineHeights } = t.primitives;
  return {
    cell: {
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[0.5],
    },
    footerText: {
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.normal,
    },
    headerText: {
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.normal,
    },
    text: {
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: lineHeights.normal,
    },
  };
};

/**
 * Converts an arbitrary cell value to a display string.
 * Returns an empty string for null/undefined values.
 * @param value - The raw cell value to format.
 */
export const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "number") {
    return String(value);
  }
  return String(value);
};
