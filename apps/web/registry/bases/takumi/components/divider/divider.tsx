import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerThickness = "thin" | "medium" | "thick";
export type DividerSpacing = "none" | "sm" | "md" | "lg";

/**
 * Horizontal rule with optional label, style variants, and spacing presets.
 * Props - `spacing` | `variant` | `color` | `thickness` | `label` | `width` | `style`
 * @see {@link DividerProps}
 */
export interface DividerProps extends Omit<PDFComponentProps, "children"> {
  /**
   * @default 'md'
   */
  spacing?: DividerSpacing;
  /**
   * @default 'solid'
   */
  variant?: DividerVariant;
  color?: string;
  /**
   * @default 'thin'
   */
  thickness?: DividerThickness;
  label?: string;
  width?: string | number;
}

const createDividerStyles = (t: PdfcnTheme) => {
  const { spacing, fontWeights } = t.primitives;
  return {
    base: {
      borderBottomColor: t.colors.border,
      borderBottomStyle: "solid" as const,
    },
    dashed: { borderBottomStyle: "dashed" as const },
    dotted: { borderBottomStyle: "dotted" as const },
    labelContainer: {
      alignItems: "center" as const,
      flexDirection: "row" as const,
    },
    labelLine: {
      borderBottomColor: t.colors.border,
      borderBottomStyle: "solid" as const,
      flex: 1,
    },
    labelText: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      fontWeight: fontWeights.medium,
      letterSpacing: t.primitives.letterSpacing.wider * 10,
      paddingHorizontal: spacing[3],
      textTransform: "uppercase" as const,
    },
    medium: { borderBottomWidth: spacing[1] },
    solid: { borderBottomStyle: "solid" as const },
    spacingLg: { marginVertical: t.spacing.sectionGap },
    spacingMd: { marginVertical: t.spacing.componentGap },
    spacingNone: { marginVertical: spacing[0] },
    spacingSm: { marginVertical: t.spacing.paragraphGap },
    thick: { borderBottomWidth: spacing[2] },
    thin: { borderBottomWidth: spacing[0.5] },
  } as Record<string, React.CSSProperties>;
};

export const Divider = ({
  spacing = "md",
  variant = "solid",
  color,
  thickness = "thin",
  label,
  width,
  style,
}: DividerProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createDividerStyles(theme), [theme]);
  const spacingMap = {
    lg: styles.spacingLg,
    md: styles.spacingMd,
    none: styles.spacingNone,
    sm: styles.spacingSm,
  };
  const variantMap = {
    dashed: styles.dashed,
    dotted: styles.dotted,
    solid: styles.solid,
  };
  const thicknessMap = {
    medium: styles.medium,
    thick: styles.thick,
    thin: styles.thin,
  };

  if (label) {
    const lineStyle: React.CSSProperties[] = [
      styles.labelLine,
      thicknessMap[thickness],
      variantMap[variant],
    ];
    if (color) {
      lineStyle.push({ borderBottomColor: resolveColor(color, theme.colors) });
    }
    const containerStyles: React.CSSProperties[] = [
      styles.labelContainer,
      spacingMap[spacing],
    ];
    if (width !== undefined) {
      containerStyles.push({ width } as React.CSSProperties);
    }
    if (style) {
      containerStyles.push(...[style].flat());
    }
    const labelTextStyle: React.CSSProperties[] = [styles.labelText];
    if (color) {
      labelTextStyle.push({ color: resolveColor(color, theme.colors) });
    }
    return (
      <div style={Object.assign({}, ...containerStyles) as React.CSSProperties}>
        <div style={Object.assign({}, ...lineStyle) as React.CSSProperties} />
        <span
          style={Object.assign({}, ...labelTextStyle) as React.CSSProperties}
        >
          {label}
        </span>
        <div style={Object.assign({}, ...lineStyle) as React.CSSProperties} />
      </div>
    );
  }

  const styleArray: React.CSSProperties[] = [
    styles.base,
    spacingMap[spacing],
    variantMap[variant],
    thicknessMap[thickness],
  ];
  if (color) {
    styleArray.push({ borderBottomColor: resolveColor(color, theme.colors) });
  }
  if (width !== undefined) {
    styleArray.push({ width } as React.CSSProperties);
  }
  if (style) {
    styleArray.push(...[style].flat());
  }
  return (
    <div style={Object.assign({}, ...styleArray) as React.CSSProperties} />
  );
};
