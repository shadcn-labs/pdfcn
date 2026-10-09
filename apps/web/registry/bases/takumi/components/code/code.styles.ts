import { StyleSheet } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all code-block styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createCodeStyles = (t: PdfcnTheme) => {
  const { spacing, borderRadius, typography } = t.primitives;
  return StyleSheet.create({
    code: {
      color: t.colors.foreground,
      fontFamily: "Courier",
      fontSize: typography.xs,
      lineHeight: 1.45,
    },
    container: {
      backgroundColor: t.colors.muted,
      borderColor: t.colors.border,
      borderRadius: borderRadius.sm,
      borderStyle: "solid",
      borderWidth: 0.5,
      marginBottom: t.spacing.componentGap,
      padding: spacing[3],
    },
    ellipsis: { color: t.colors.mutedForeground },
    title: {
      borderBottomColor: t.colors.border,
      borderBottomStyle: "solid",
      borderBottomWidth: 0.5,
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      letterSpacing: 0.5,
      marginBottom: spacing[2],
      paddingBottom: spacing[1],
    },
    tokenComment: { color: t.colors.mutedForeground },
    tokenKeyword: { color: t.colors.accent },
    tokenNumber: { color: t.colors.warning },
    tokenString: { color: t.colors.success },
  });
};
