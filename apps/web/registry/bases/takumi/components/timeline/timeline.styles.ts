import { StyleSheet } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all timeline styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createTimelineStyles = (t: PdfcnTheme) => {
  const { spacing, fontWeights, typography } = t.primitives;

  return StyleSheet.create({
    body: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      marginTop: spacing[1],
    },
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: t.spacing.componentGap,
      width: "100%",
    },
    content: {
      flex: 1,
      paddingBottom: spacing[4],
      paddingLeft: spacing[3],
    },
    contentLast: {
      paddingBottom: 0,
    },
    date: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      width: 80,
    },
    dot: {
      borderRadius: 4,
      height: 8,
      width: 8,
    },
    rail: {
      alignItems: "center",
      alignSelf: "stretch",
      paddingTop: spacing[1],
      width: spacing[4],
    },
    row: {
      alignItems: "flex-start",
      flexDirection: "row",
    },
    spine: {
      flex: 1,
      marginTop: spacing[1],
      width: 2,
    },
    title: {
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      fontWeight: fontWeights.semibold,
      lineHeight: t.typography.body.lineHeight,
    },
  });
};
