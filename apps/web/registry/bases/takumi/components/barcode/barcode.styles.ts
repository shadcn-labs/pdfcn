import { StyleSheet } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all barcode styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createBarcodeStyles = (t: PdfcnTheme) =>
  StyleSheet.create({
    caption: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      marginTop: t.primitives.spacing[1],
      textAlign: "center",
    },
    container: {
      alignItems: "center",
      marginBottom: t.spacing.componentGap,
    },
    placeholder: {
      alignItems: "center",
      borderColor: t.colors.border,
      borderRadius: t.primitives.borderRadius.sm,
      borderStyle: "dashed",
      borderWidth: 1,
      justifyContent: "center",
    },
    placeholderText: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
    },
  });
