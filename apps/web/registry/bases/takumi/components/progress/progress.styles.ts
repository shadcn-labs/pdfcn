import { StyleSheet } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all progress styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createProgressStyles = (t: PdfcnTheme) => {
  const { borderRadius, spacing, fontWeights, typography } = t.primitives;

  return StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: spacing[3],
      marginBottom: t.spacing.componentGap,
      width: "100%",
    },
    fill: {
      borderRadius: borderRadius.full,
      height: spacing[2],
    },
    item: {
      display: "flex",
      flexDirection: "column",
      gap: spacing[1],
    },
    label: {
      color: t.colors.foreground,
      flex: 1,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      fontWeight: fontWeights.medium,
    },
    labelRow: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    track: {
      backgroundColor: t.colors.muted,
      borderRadius: borderRadius.full,
      height: spacing[2],
      width: "100%",
    },
    value: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      marginLeft: spacing[3],
    },
  });
};
