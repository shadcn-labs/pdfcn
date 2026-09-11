import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { PdfFormVariant } from "./form.types";

/** Style factory for fillable form layouts, derived from the active theme. */
export const createFormStyles = (
  t: PdfcnTheme,
  variant: PdfFormVariant = "underline"
) => {
  const { spacing, borderRadius, fontWeights, typography } = t.primitives;
  const borderColor = t.colors.border;
  // lighter than spacing[0.5]=2pt — more refined
  const hairline = 0.75;
  // group title rule
  const rule = 1;

  const fieldAreaByVariant: Record<PdfFormVariant, object> = {
    box: {
      borderColor,
      borderRadius: borderRadius.sm,
      borderStyle: "solid",
      borderWidth: hairline,
    },
    ghost: {
      backgroundColor: t.colors.muted,
      borderRadius: borderRadius.sm,
    },
    outlined: {
      borderColor: t.colors.foreground,
      borderRadius: borderRadius.md,
      borderStyle: "solid",
      borderWidth: hairline,
    },
    underline: {
      borderBottomColor: borderColor,
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
    },
  };

  const hasPadding =
    variant === "box" || variant === "outlined" || variant === "ghost";

  return {
    column: {
      flex: 1,
    },

    columnsRow: {
      flexDirection: "row",
      gap: spacing[4],
    },
    fieldAbove: {
      marginBottom: spacing[3],
      width: "100%",
    },
    fieldArea: {
      width: "100%" as const,
      ...fieldAreaByVariant[variant],
    },

    fieldLeft: {
      alignItems: "flex-end",
      flexDirection: "row",
      gap: spacing[2],
      marginBottom: spacing[3],
    },
    fieldLeftArea: {
      flex: 1,
    },

    formDivider: {
      borderBottomColor: borderColor,
      borderBottomStyle: "solid",
      borderBottomWidth: rule,
      marginBottom: spacing[4],
    },
    formSubtitle: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      marginBottom: spacing[3],
    },

    formTitle: {
      color: t.colors.foreground,
      fontFamily: t.typography.heading.fontFamily,
      fontSize: typography.xl,
      fontWeight: fontWeights.bold,
      lineHeight: t.typography.heading.lineHeight,
      marginBottom: spacing[1],
    },
    group: {
      marginBottom: spacing[5],
    },

    groupTitle: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0.8,
      lineHeight: 1.2,
      marginBottom: spacing[3],
      textTransform: "uppercase",
    },
    hint: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      opacity: 0.14,
      paddingBottom: hasPadding ? spacing[1] : 0,
      paddingHorizontal: hasPadding ? spacing[2] : 0,
      paddingTop: hasPadding ? spacing[1] : spacing[0.5],
    },
    labelAbove: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      fontWeight: fontWeights.medium,
      letterSpacing: 0.5,
      lineHeight: 1.2,
      marginBottom: spacing[1],
      textTransform: "uppercase",
    },

    labelLeft: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      fontWeight: fontWeights.medium,
      lineHeight: t.typography.body.lineHeight,
      paddingBottom: hasPadding ? spacing[1] : 0,
      width: 80,
    },

    root: {
      marginBottom: t.spacing.componentGap,
      width: "100%",
    },
  } as Record<string, React.CSSProperties>;
};
