import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  Text as PDFText,
  StyleSheet,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type TitleAlign = "left" | "center" | "right";

/**
 * Document cover title with eyebrow, hero title, and subtitle.
 * Props - `eyebrow` | `title` | `subtitle` | `align` | `accentColor` | `color` | `marginBottom` | `style`
 * @see {@link TitleProps}
 */
export interface TitleProps extends Omit<PDFComponentProps, "children"> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /**
   * @default 'left'
   */
  align?: TitleAlign;
  /**
   * Color of the eyebrow. Accepts theme color keys or any CSS color.
   */
  accentColor?: string;
  /**
   * Color of the title. Accepts theme color keys or any CSS color.
   */
  color?: string;
  marginBottom?: number;
}

const createTitleStyles = (t: PdfcnTheme) => {
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

export const Title = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  accentColor,
  color,
  marginBottom,
  style,
}: TitleProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createTitleStyles(theme), [theme]);
  const alignment: Style = { textAlign: align };

  const containerStyles: Style[] = [
    styles.container,
    { marginBottom: marginBottom ?? theme.spacing.sectionGap },
  ];
  if (style) {
    containerStyles.push(...[style].flat());
  }

  const eyebrowStyles: Style[] = [styles.eyebrow, alignment];
  if (accentColor) {
    eyebrowStyles.push({ color: resolveColor(accentColor, theme.colors) });
  }

  const titleStyles: Style[] = [styles.title, alignment];
  if (color) {
    titleStyles.push({ color: resolveColor(color, theme.colors) });
  }

  return (
    <View style={containerStyles}>
      {eyebrow && <PDFText style={eyebrowStyles}>{eyebrow}</PDFText>}
      <PDFText style={titleStyles}>{title}</PDFText>
      {subtitle && (
        <PDFText style={[styles.subtitle, alignment]}>{subtitle}</PDFText>
      )}
    </View>
  );
};
