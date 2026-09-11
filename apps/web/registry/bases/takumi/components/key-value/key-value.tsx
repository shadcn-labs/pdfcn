import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type KeyValueDirection = "horizontal" | "vertical";
export type KeyValueSize = "sm" | "md" | "lg";

/**
 * A single key-value row with optional per-item color and style overrides.
 * Props - `key` | `value` | `valueColor` | `valueStyle` | `keyStyle`
 * @see {@link KeyValueEntry}
 */
export interface KeyValueEntry {
  key: string;
  value: string;
  valueColor?: string;
  valueStyle?: React.CSSProperties;
  keyStyle?: React.CSSProperties;
}

/**
 * List of key-value pairs with layout and style options.
 * Props - `items` | `direction` | `divided` | `size` | `labelFlex` | `labelColor` | `valueColor` | `boldValue` | `noWrap` | `dividerColor` | `dividerThickness` | `dividerMargin` | `style`
 * @see {@link KeyValueProps}
 */
export interface KeyValueProps extends Omit<PDFComponentProps, "children"> {
  items: KeyValueEntry[];
  /**
   * @default 'horizontal'
   */
  direction?: KeyValueDirection;
  /**
   * @default false
   */
  divided?: boolean;
  /**
   * @default 'md'
   */
  size?: KeyValueSize;
  /**
   * @default 1
   */
  labelFlex?: number;
  labelColor?: string;
  valueColor?: string;
  /**
   * @default false
   */
  boldValue?: boolean;
  /**
   * @default false
   */
  noWrap?: boolean;
  dividerColor?: string;
  dividerThickness?: number;
  dividerMargin?: number;
}

const createKeyValueStyles = (t: PdfcnTheme) => {
  const { spacing, fontWeights } = t.primitives;
  const c = t.colors;
  const { body } = t.typography;
  const keyBase = {
    color: c.mutedForeground,
    fontFamily: body.fontFamily,
    fontWeight: fontWeights.medium,
  };
  const valueBase = {
    color: c.foreground,
    fontFamily: body.fontFamily,
    fontWeight: fontWeights.regular,
  };
  return {
    container: { display: "flex", flexDirection: "column" },
    divider: {
      borderBottomColor: c.border,
      borderBottomStyle: "solid",
      borderBottomWidth: spacing[0.5],
    },
    keyLg: { ...keyBase, fontSize: t.primitives.typography.base },
    keyMd: { ...keyBase, fontSize: body.fontSize },
    keySm: { ...keyBase, fontSize: t.primitives.typography.xs },
    rowHorizontal: {
      alignItems: "flex-start",
      flexDirection: "row",
      paddingVertical: spacing[1],
    },
    rowVertical: {
      flexDirection: "column",
      marginBottom: t.spacing.paragraphGap,
    },
    valueBold: { fontWeight: fontWeights.bold },
    valueLg: { ...valueBase, fontSize: t.primitives.typography.base },
    valueMd: { ...valueBase, fontSize: body.fontSize },
    valueSm: { ...valueBase, fontSize: t.primitives.typography.xs },
  } as Record<string, React.CSSProperties>;
};

export const KeyValue = ({
  items,
  direction = "horizontal",
  divided = false,
  size = "md",
  labelFlex = 1,
  labelColor,
  valueColor,
  boldValue = false,
  _noWrap = false,
  dividerColor,
  dividerThickness,
  dividerMargin,
  style,
}: KeyValueProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createKeyValueStyles(theme), [theme]);
  const keyStyleMap = {
    lg: styles.keyLg,
    md: styles.keyMd,
    sm: styles.keySm,
  } as Record<KeyValueSize, React.CSSProperties>;
  const valueStyleMap = {
    lg: styles.valueLg,
    md: styles.valueMd,
    sm: styles.valueSm,
  } as Record<KeyValueSize, React.CSSProperties>;
  const containerStyles: React.CSSProperties[] = [styles.container];
  if (style) {
    containerStyles.push(...[style].flat());
  }

  return (
    <div style={Object.assign({}, ...containerStyles)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const keyStyles: React.CSSProperties[] = [keyStyleMap[size]];
        if (labelColor) {
          keyStyles.push({ color: resolveColor(labelColor, theme.colors) });
        }
        if (item.keyStyle) {
          keyStyles.push(item.keyStyle);
        }
        const valStyles: React.CSSProperties[] = [valueStyleMap[size]];
        if (boldValue) {
          valStyles.push(styles.valueBold);
        }
        const resolvedValueColor = item.valueColor ?? valueColor;
        if (resolvedValueColor) {
          valStyles.push({
            color: resolveColor(resolvedValueColor, theme.colors),
          });
        }
        if (item.valueStyle) {
          valStyles.push(item.valueStyle);
        }

        if (direction === "horizontal") {
          const rowStyles: React.CSSProperties[] = [styles.rowHorizontal];
          if (divided && !isLast) {
            const dividerStyle: React.CSSProperties = {};
            if (dividerColor) {
              dividerStyle.borderBottomColor = resolveColor(
                dividerColor,
                theme.colors
              );
            }
            if (dividerThickness) {
              dividerStyle.borderBottomWidth = dividerThickness;
            }
            if (dividerMargin) {
              dividerStyle.marginBottom = dividerMargin;
            }
            rowStyles.push({ ...styles.divider, ...dividerStyle });
          }
          return (
            <div key={item.key} style={Object.assign({}, ...rowStyles)}>
              <span
                style={Object.assign({}, ...keyStyles, { flex: labelFlex })}
              >
                {item.key}
              </span>
              <span
                style={Object.assign({}, ...valStyles, {
                  flex: 1,
                  textAlign: "right" as const,
                })}
              >
                {item.value}
              </span>
            </div>
          );
        }

        const rowStyles: React.CSSProperties[] = [styles.rowVertical];
        if (divided && !isLast) {
          rowStyles.push(styles.divider);
        }
        return (
          <div key={item.key} style={Object.assign({}, ...rowStyles)}>
            <span style={Object.assign({}, ...keyStyles)}>{item.key}</span>
            <span style={Object.assign({}, ...valStyles)}>{item.value}</span>
          </div>
        );
      })}
    </div>
  );
};
