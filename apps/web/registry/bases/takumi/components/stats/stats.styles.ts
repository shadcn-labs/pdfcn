import { StyleSheet } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all stats styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createStatsStyles = (t: PdfcnTheme) => {
  const { borderRadius, spacing, fontWeights, lineHeights, typography } =
    t.primitives;
  const valueBase = {
    color: t.colors.foreground,
    fontFamily: t.typography.heading.fontFamily,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    // Lets long values without spaces break inside the tile instead of
    // pushing past its edge.
    overflowWrap: "anywhere",
  };

  return StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: t.spacing.componentGap,
      width: "100%",
    },
    label: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: 8,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0.8,
      lineHeight: lineHeights.tight,
      marginBottom: spacing[1],
      overflowWrap: "anywhere",
      textTransform: "uppercase",
    },
    note: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: 9,
      lineHeight: lineHeights.normal,
      marginTop: spacing[1],
      overflowWrap: "anywhere",
    },
    row: {
      flexDirection: "row",
      gap: spacing[2],
    },
    rowGap: {
      marginBottom: spacing[2],
    },
    spacer: {
      // Keeps a short last row aligned to the same tile width as full rows.
      flexBasis: 0,
      flexGrow: 1,
      minWidth: 0,
    },
    tile: {
      backgroundColor: t.colors.muted,
      borderRadius: borderRadius.md,
      // A zero basis splits the row evenly regardless of content length, and
      // minWidth: 0 keeps long unbroken values from widening their tile much.
      flexBasis: 0,
      flexGrow: 1,
      minWidth: 0,
      padding: spacing[3],
    },
    valueLg: { ...valueBase, fontSize: typography.xl },
    valueMd: { ...valueBase, fontSize: typography.lg },
    valueSm: { ...valueBase, fontSize: typography.base },
  });
};
