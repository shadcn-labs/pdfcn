import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all list styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createListStyles = (t: PdfcnTheme) => {
  const { borderRadius, spacing, fontWeights, typography } = t.primitives;

  return {
    checkBox: {
      alignItems: "center",
      backgroundColor: t.colors.background,
      borderColor: t.colors.border,
      borderRadius: 3,
      borderStyle: "solid",
      borderWidth: 1.5,
      height: spacing[4],
      justifyContent: "center",
      marginRight: spacing[2],
      width: spacing[4],
    },
    checkBoxChecked: {
      backgroundColor: t.colors.success,
      borderColor: t.colors.success,
    },
    childrenContainer: {
      display: "flex",
      flexDirection: "column",
      marginLeft: spacing[5],
      marginTop: spacing[1],
    },
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: t.spacing.componentGap,
      width: "100%",
    },
    descriptiveAccent: {
      backgroundColor: t.colors.primary,
      borderRadius: borderRadius.sm,
      marginRight: spacing[3],
      minHeight: spacing[4],
      width: 3,
    },
    descriptiveContent: {
      flex: 1,
    },
    descriptiveDesc: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      marginTop: 1,
    },
    descriptiveTitle: {
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      fontWeight: fontWeights.semibold,
      lineHeight: t.typography.body.lineHeight,
    },
    iconBox: {
      alignItems: "center",
      backgroundColor: t.colors.primary,
      borderRadius: borderRadius.md,
      height: spacing[5],
      justifyContent: "center",
      marginRight: spacing[2],
      width: spacing[5],
    },
    iconMark: {
      color: t.colors.primaryForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: 9,
      fontWeight: fontWeights.bold,
    },
    itemRow: {
      alignItems: "flex-start",
      flexDirection: "row",
    },
    itemRowCenter: {
      alignItems: "center",
      flexDirection: "row",
    },
    itemRowGapMd: { marginBottom: spacing[3] },
    itemRowGapSm: { marginBottom: spacing[2] },
    itemRowGapXs: { marginBottom: spacing[1] },
    itemText: {
      // No flex here — Text nodes with flex shorthand get flexBasis:0, which causes
      // Yoga to under-measure multi-line text height → overlapping rows.
      // flex:1 must live on the wrapping View, not on the Text itself.
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
    },
    itemTextBold: {
      fontWeight: fontWeights.semibold,
    },
    itemTextSub: {
      // Same: no flex — see itemText comment.
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize - 0.5,
      lineHeight: t.typography.body.lineHeight,
    },
    itemTextWrap: {
      // Companion to itemText / itemTextSub. Apply this to the View that wraps
      // the Text so flex expansion happens at the View level, not the Text level.
      flex: 1,
    },
    markerBulletDot: {
      backgroundColor: t.colors.primary,
      borderRadius: 3,
      height: 5,
      width: 5,
    },
    markerBulletSubDot: {
      backgroundColor: "transparent",
      borderColor: t.colors.mutedForeground,
      borderRadius: 2,
      borderStyle: "solid",
      borderWidth: 1,
      height: 4,
      width: 4,
    },
    markerBulletSubWrap: {
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: spacing[1],
      width: spacing[4],
    },
    markerBulletWrap: {
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: spacing[1],
      width: spacing[4],
    },
    markerNumberBadge: {
      alignItems: "center",
      backgroundColor: t.colors.primary,
      borderRadius: spacing[5],
      height: spacing[5],
      justifyContent: "center",
      marginRight: spacing[2],
      width: spacing[5],
    },
    markerNumberText: {
      color: t.colors.primaryForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      fontWeight: fontWeights.bold,
    },
  } as Record<string, React.CSSProperties>;
};
