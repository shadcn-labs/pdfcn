import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "outline";
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Inline label for status, tags, or categories.
 *
 * Accepts text via either `label` prop or `children` (string). `label` takes
 * precedence when both are provided. The children pattern (`<Badge>text</Badge>`)
 * is supported for compatibility with common React idioms, but note that
 * `Takumi primitives` doesn't support JSX children the way HTML does — only
 * string children are accepted.
 *
 * Props - `label` | `children` | `variant` | `size` | `background` | `color` | `style`
 * @see {@link BadgeProps}
 */
export interface BadgeProps extends Omit<PDFComponentProps, "children"> {
  /** Text to display. Takes precedence over children when both are provided. */
  label?: string;
  /** String children as an alternative to the label prop. */
  children?: string;
  /**
   * @default 'default'
   */
  variant?: BadgeVariant;
  /**
   * @default 'md'
   */
  size?: BadgeSize;
  background?: string;
  color?: string;
}

const createBadgeStyles = (t: PdfcnTheme) => {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  const c = t.colors;
  const textBase = {
    fontFamily: t.typography.body.fontFamily,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.3,
  };
  const variantBox = (borderColor: string, bgColor: string = c.muted) => ({
    backgroundColor: bgColor,
    borderColor,
    borderStyle: "solid" as const,
    borderWidth: spacing[0.5],
  });
  return {
    containerBase: {
      alignItems: "center" as const,
      alignSelf: "flex-start" as const,
      borderRadius: borderRadius.full,
      display: "flex" as const,
      flexDirection: "row" as const,
    },
    containerSizeMap: {
      lg: { paddingHorizontal: spacing[4], paddingVertical: spacing[2] },
      md: { paddingHorizontal: spacing[3], paddingVertical: spacing[1] },
      sm: { paddingHorizontal: spacing[2], paddingVertical: spacing[0.5] },
    } as Record<BadgeSize, object>,
    containerVariantMap: {
      default: variantBox(c.border),
      destructive: variantBox(c.destructive),
      info: variantBox(c.info),
      outline: variantBox(c.border, c.background),
      primary: variantBox(c.primary, c.primary),
      success: variantBox(c.success),
      warning: variantBox(c.warning),
    } as Record<BadgeVariant, object>,
    textSizeMap: {
      lg: { fontSize: t.primitives.typography.sm },
      md: { fontSize: t.primitives.typography.xs },
      sm: { fontSize: t.primitives.typography.xs - 1 },
    } as Record<BadgeSize, object>,
    textVariantMap: {
      default: { ...textBase, color: c.mutedForeground },
      destructive: { ...textBase, color: c.destructive },
      info: { ...textBase, color: c.info },
      outline: { ...textBase, color: c.foreground },
      primary: { ...textBase, color: c.primaryForeground },
      success: { ...textBase, color: c.success },
      warning: { ...textBase, color: c.warning },
    } as Record<BadgeVariant, object>,
  };
};

export const Badge = ({
  label,
  children,
  variant = "default",
  size = "md",
  background,
  color,
  style,
}: BadgeProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createBadgeStyles(theme), [theme]);
  const text = label ?? children ?? "";
  const containerStyles = [
    styles.containerBase,
    styles.containerVariantMap[variant],
    styles.containerSizeMap[size],
    ...(background
      ? [{ backgroundColor: resolveColor(background, theme.colors) }]
      : []),
    ...(style ? [style].flat() : []),
  ];
  const textStyles = [
    styles.textVariantMap[variant],
    styles.textSizeMap[size],
    ...(color ? [{ color: resolveColor(color, theme.colors) }] : []),
  ];
  return (
    <div style={Object.assign({}, ...containerStyles)}>
      <span style={Object.assign({}, ...textStyles)}>{text}</span>
    </div>
  );
};
