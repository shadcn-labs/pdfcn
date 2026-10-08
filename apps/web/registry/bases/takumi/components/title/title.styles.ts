import { StyleSheet } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Creates all title styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createTitleStyles = (t: PdfcnTheme) => {
  const { heading, body } = t.typography;
  const { spacing, fontWeights, letterSpacing, lineHeights, typography } =
    t.primitives;
  const c = t.colors;

  return StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    eyebrow: {
      color: c.mutedForeground,
      fontFamily: body.fontFamily,
      fontSize: typography.xs,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.wider * 20,
      lineHeight: lineHeights.normal,
      marginBottom: spacing[2],
      textTransform: "uppercase",
    },
    subtitle: {
      color: c.mutedForeground,
      fontFamily: body.fontFamily,
      fontSize: typography.base,
      lineHeight: lineHeights.normal,
      marginTop: spacing[3],
    },
    title: {
      color: c.foreground,
      fontFamily: heading.fontFamily,
      // Hero scale: one step above the theme's h1.
      fontSize: Math.round(heading.fontSize.h1 * 1.25),
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.tight * 20,
      lineHeight: lineHeights.tight,
    },
  });
};
