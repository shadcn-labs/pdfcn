import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type LinkVariant = "default" | "muted" | "primary";
export type LinkUnderline = "always" | "none";

/**
 * Clickable hyperlink for PDF documents.
 * Props - `href` | `children` | `align` | `color` | `variant` | `underline` | `style`
 * @see {@link LinkProps}
 */
export interface LinkProps extends PDFComponentProps {
  href: string;
  /**
   * @default 'left'
   */
  align?: "left" | "center" | "right";
  color?: string;
  /**
   * @default 'default'
   */
  variant?: LinkVariant;
  /**
   * @default 'always'
   */
  underline?: LinkUnderline;
}

const createLinkStyles = (t: PdfcnTheme) => {
  const { fontWeights } = t.primitives;
  const base = {
    fontFamily: t.typography.body.fontFamily,
    fontSize: t.typography.body.fontSize,
    lineHeight: t.typography.body.lineHeight,
    marginBottom: t.spacing.paragraphGap,
  };
  return {
    default: {
      ...base,
      color: t.colors.accent,
      fontWeight: fontWeights.medium,
      textDecoration: "underline",
    },
    muted: {
      ...base,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.regular,
      textDecoration: "underline",
    },
    primary: {
      ...base,
      color: t.colors.primary,
      fontWeight: fontWeights.semibold,
      textDecoration: "underline",
    },
    underlineAlways: { textDecoration: "underline" },
    underlineNone: { textDecoration: "none" },
  } as Record<string, React.CSSProperties>;
};

export const Link = ({
  href,
  align,
  color,
  variant = "default",
  underline,
  children,
  style,
}: LinkProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createLinkStyles(theme), [theme]);
  const variantMap = {
    default: styles.default,
    muted: styles.muted,
    primary: styles.primary,
  };
  const underlineMap = {
    always: styles.underlineAlways,
    none: styles.underlineNone,
  };
  const styleArray: React.CSSProperties[] = [variantMap[variant]];
  if (underline && underline in underlineMap) {
    styleArray.push(underlineMap[underline]);
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
  return (
    <a href={href} style={Object.assign({}, ...styleArray)}>
      {children}
    </a>
  );
};
