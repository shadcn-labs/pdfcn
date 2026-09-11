import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type StackGap = "none" | "sm" | "md" | "lg" | "xl";
export type StackDirection = "vertical" | "horizontal";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between" | "around";

/**
 * Flex layout container with gap and direction control.
 * Props - `gap` | `direction` | `align` | `justify` | `wrap` | `noWrap` | `children` | `style`
 * @see {@link StackProps}
 */
export interface StackProps extends PDFComponentProps {
  /**
   * @default 'md'
   */
  gap?: StackGap;
  /**
   * @default 'vertical'
   */
  direction?: StackDirection;
  /**
   * @default 'start'
   */
  align?: StackAlign;
  /**
   * @default 'start'
   */
  justify?: StackJustify;
  /**
   * @default false
   */
  wrap?: boolean;
  /**
   * @default false
   */
  noWrap?: boolean;
}

const createStackStyles = (t: PdfcnTheme) => {
  const { spacing } = t.primitives;
  return {
    alignCenter: { alignItems: "center" },
    alignEnd: { alignItems: "flex-end" },
    alignStart: { alignItems: "flex-start" },
    alignStretch: { alignItems: "stretch" },
    gapLg: { gap: spacing[6] },
    gapMd: { gap: spacing[4] },
    gapNone: { gap: spacing[0] },
    gapSm: { gap: spacing[2] },
    gapXl: { gap: spacing[8] },
    horizontal: { flexDirection: "row" },
    justifyAround: { justifyContent: "space-around" },
    justifyBetween: { justifyContent: "space-between" },
    justifyCenter: { justifyContent: "center" },
    justifyEnd: { justifyContent: "flex-end" },
    justifyStart: { justifyContent: "flex-start" },
    vertical: { flexDirection: "column" },
    wrap: { flexWrap: "wrap" as const },
  } as Record<string, React.CSSProperties>;
};

export const Stack = ({
  gap = "md",
  direction = "vertical",
  align,
  justify,
  wrap,
  children,
  style,
}: StackProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createStackStyles(theme), [theme]);
  const gapMap = {
    lg: styles.gapLg,
    md: styles.gapMd,
    none: styles.gapNone,
    sm: styles.gapSm,
    xl: styles.gapXl,
  };
  const alignMap = {
    center: styles.alignCenter,
    end: styles.alignEnd,
    start: styles.alignStart,
    stretch: styles.alignStretch,
  };
  const justifyMap = {
    around: styles.justifyAround,
    between: styles.justifyBetween,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    start: styles.justifyStart,
  };
  const styleArray: React.CSSProperties[] = [
    { display: "flex", flexDirection: "column" },
    direction === "horizontal" ? styles.horizontal : styles.vertical,
    gapMap[gap],
  ];
  if (align && align in alignMap) {
    styleArray.push(alignMap[align]);
  }
  if (justify && justify in justifyMap) {
    styleArray.push(justifyMap[justify]);
  }
  if (wrap) {
    styleArray.push(styles.wrap);
  }
  if (style) {
    styleArray.push(...[style].flat());
  }
  return <div style={Object.assign({}, ...styleArray)}>{children}</div>;
};
