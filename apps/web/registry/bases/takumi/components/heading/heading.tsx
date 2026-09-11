import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type HeadingWeight = "normal" | "medium" | "semibold" | "bold";
export type HeadingTracking = "tighter" | "tight" | "normal" | "wide" | "wider";

/**
 * PDF heading mapped to h1–h6 font sizes from the theme.
 * Props - `level` | `align` | `color` | `transform` | `weight` | `tracking` | `noMargin` | `keepWithNext` | `children` | `style`
 * @see {@link HeadingProps}
 */
export interface HeadingProps extends PDFComponentProps {
  /**
   * @default 1
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * @default 'left'
   */
  align?: "left" | "center" | "right";
  color?: string;
  transform?: "uppercase" | "lowercase" | "capitalize";
  /**
   * @default 'bold'
   */
  weight?: HeadingWeight;
  /**
   * @default 'normal'
   */
  tracking?: HeadingTracking;
  /**
   * @default false
   */
  noMargin?: boolean;
  keepWithNext?: boolean;
}

const createHeadingStyles = (t: PdfcnTheme) => {
  const { heading } = t.typography;
  const { spacing, fontWeights, letterSpacing } = t.primitives;
  const { sectionGap, componentGap, paragraphGap } = t.spacing;
  const base = {
    color: t.colors.foreground,
    fontFamily: heading.fontFamily,
    fontWeight: fontWeights.bold,
    lineHeight: heading.lineHeight,
  };
  return {
    capitalize: { textTransform: "capitalize" },
    h1: {
      ...base,
      fontSize: heading.fontSize.h1,
      marginBottom: paragraphGap,
      marginTop: spacing[0],
    },
    h2: {
      ...base,
      fontSize: heading.fontSize.h2,
      marginBottom: paragraphGap,
      marginTop: sectionGap,
    },
    h3: {
      ...base,
      fontSize: heading.fontSize.h3,
      marginBottom: paragraphGap,
      marginTop: componentGap,
    },
    h4: {
      ...base,
      fontSize: heading.fontSize.h4,
      marginBottom: paragraphGap,
      marginTop: paragraphGap,
    },
    h5: {
      ...base,
      fontSize: heading.fontSize.h5,
      marginBottom: spacing[1],
      marginTop: paragraphGap,
    },
    h6: {
      ...base,
      fontSize: heading.fontSize.h6,
      marginBottom: spacing[1],
      marginTop: paragraphGap,
    },
    lowercase: { textTransform: "lowercase" },
    noMargin: { marginBottom: 0, marginTop: 0 },
    trackingNormal: { letterSpacing: letterSpacing.normal },
    trackingTight: { letterSpacing: letterSpacing.tight * 10 },
    trackingTighter: { letterSpacing: letterSpacing.tight * 15 },
    trackingWide: { letterSpacing: letterSpacing.wide * 10 },
    trackingWider: { letterSpacing: letterSpacing.wider * 10 },
    uppercase: {
      letterSpacing: letterSpacing.wider * 10,
      textTransform: "uppercase",
    },
    weightBold: { fontWeight: fontWeights.bold },
    weightMedium: { fontWeight: fontWeights.medium },
    weightNormal: { fontWeight: fontWeights.regular },
    weightSemibold: { fontWeight: fontWeights.semibold },
  } as Record<string, React.CSSProperties>;
};

export const Heading = ({
  level = 1,
  align,
  color,
  transform,
  weight,
  tracking,
  noMargin,
  children,
  style,
}: HeadingProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createHeadingStyles(theme), [theme]);
  const safeLevel = Math.min(Math.max(Math.round(level), 1), 6) as
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6;
  const weightMap = {
    bold: styles.weightBold,
    medium: styles.weightMedium,
    normal: styles.weightNormal,
    semibold: styles.weightSemibold,
  };
  const trackingMap = {
    normal: styles.trackingNormal,
    tight: styles.trackingTight,
    tighter: styles.trackingTighter,
    wide: styles.trackingWide,
    wider: styles.trackingWider,
  };
  const transformMap = {
    capitalize: styles.capitalize,
    lowercase: styles.lowercase,
    uppercase: styles.uppercase,
  };
  const styleArray: React.CSSProperties[] = [
    styles[`h${safeLevel}` as keyof typeof styles] as React.CSSProperties,
  ];
  if (weight && weight in weightMap) {
    styleArray.push(weightMap[weight]);
  }
  if (tracking && tracking in trackingMap) {
    styleArray.push(trackingMap[tracking]);
  }
  if (transform && transform in transformMap) {
    styleArray.push(transformMap[transform as keyof typeof transformMap]);
  }
  if (noMargin) {
    styleArray.push(styles.noMargin);
  }
  const semantic = {} as React.CSSProperties;
  if (align) {
    semantic.textAlign = align;
  }
  if (color) {
    semantic.color = resolveColor(color, theme.colors);
  }
  if (Object.keys(semantic).length > 0) {
    styleArray.push(semantic);
  }
  if (style) {
    styleArray.push(...[style].flat());
  }
  return <span style={Object.assign({}, ...styleArray)}>{children}</span>;
};
