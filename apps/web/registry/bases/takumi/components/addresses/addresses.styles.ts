import { StyleSheet } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all addresses styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createAddressesStyles = (t: PdfcnTheme) => {
  const { spacing, fontWeights, typography } = t.primitives;

  return StyleSheet.create({
    addressText: {
      // No flex here — Text nodes with flex shorthand get flexBasis:0, which causes
      // Yoga to under-measure multi-line text height. flex lives on the column View.
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
    },
    column: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    columnGap: {
      width: spacing[8],
    },
    container: {
      display: "flex",
      flexDirection: "row",
      marginBottom: t.spacing.componentGap,
      width: "100%",
    },
    label: {
      color: t.colors.primary,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      fontWeight: fontWeights.semibold,
      letterSpacing: 1,
      marginBottom: spacing[1],
    },
  });
};
