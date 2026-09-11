import {
  PageNumber as PageNumberPrimitive,
  TotalPages as TotalPagesPrimitive,
} from "takumi-pdf/primitives";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type PageNumberAlign = "left" | "center" | "right";
export type PageNumberSize = "xs" | "sm" | "md";

/**
 * Auto page number rendered with a configurable format string at a or inline position.
 * Props - `format` | `align` | `size` | `fixed` | `muted` | `style`
 * @see {@link PageNumberProps}
 */
export interface PageNumberProps extends Omit<PDFComponentProps, "children"> {
  /**
   * Format string — use `{page}` for current page and `{total}` for total page count.
   * @default 'Page {page} of {total}'
   */
  format?: string;
  /**
   * @default 'center'
   */
  align?: PageNumberAlign;
  /**
   * @default 'sm'
   */
  size?: PageNumberSize;
  /**
   * @default false
   */
  fixed?: boolean;
  /**
   * @default true
   */
  muted?: boolean;
  children?: never;
}

const flatten = (
  style?: React.CSSProperties | React.CSSProperties[]
): React.CSSProperties | undefined => {
  if (!style) {
    return undefined;
  }
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.filter(Boolean));
  }
  return style;
};

const createPageNumberStyles = (t: PdfcnTheme) => {
  const { typography, colors, primitives } = t;
  return {
    alignCenter: { textAlign: "center" },
    alignLeft: { textAlign: "left" },
    alignRight: { textAlign: "right" },
    colorForeground: { color: colors.foreground },
    colorMuted: { color: colors.mutedForeground },
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    justifyCenter: { justifyContent: "center" },
    justifyLeft: { justifyContent: "flex-start" },
    justifyRight: { justifyContent: "flex-end" },
    sizeMd: { fontSize: primitives.typography.base },
    sizeSm: { fontSize: primitives.typography.sm },
    sizeXs: { fontSize: primitives.typography.xs },
    text: { fontFamily: typography.body.fontFamily },
  } as Record<string, React.CSSProperties>;
};

export const PageNumber = ({
  format = "Page {page} of {total}",
  align = "center",
  size = "sm",
  muted = true,
  style,
}: PageNumberProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createPageNumberStyles(theme), [theme]);
  const alignMap = {
    center: styles.alignCenter,
    left: styles.alignLeft,
    right: styles.alignRight,
  } as Record<PageNumberAlign, React.CSSProperties>;
  const sizeMap = {
    md: styles.sizeMd,
    sm: styles.sizeSm,
    xs: styles.sizeXs,
  } as Record<PageNumberSize, React.CSSProperties>;
  const justifyMap = {
    center: styles.justifyCenter,
    left: styles.justifyLeft,
    right: styles.justifyRight,
  } as Record<PageNumberAlign, React.CSSProperties>;
  const textStyles: React.CSSProperties[] = [
    styles.text,
    alignMap[align],
    sizeMap[size],
    muted ? styles.colorMuted : styles.colorForeground,
  ];
  if (style) {
    textStyles.push(...[style].flat());
  }
  return (
    <div style={{ ...styles.container, ...justifyMap[align] }}>
      {format.split(/({page}|{total})/).map((part, index) => {
        if (part === "{page}") {
          return (
            <PageNumberPrimitive
              key={`page-${index}`}
              style={flatten(textStyles)}
            />
          );
        }
        if (part === "{total}") {
          return (
            <TotalPagesPrimitive
              key={`total-${index}`}
              style={flatten(textStyles)}
            />
          );
        }
        return (
          <span key={`text-${index}`} style={Object.assign({}, ...textStyles)}>
            {part}
          </span>
        );
      })}
    </div>
  );
};
