import type { ReactNode } from "react";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type AlertVariant = "info" | "success" | "warning" | "error";

/**
 * Alert box with severity variants for info, success, warning, and error states.
 * Props - `variant` | `title` | `children` | `showIcon` | `showBorder` | `style`
 * @see {@link PdfAlertProps}
 */
export interface PdfAlertProps extends Omit<PDFComponentProps, "children"> {
  /**
   * @default 'info'
   */
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  /**
   * @default true
   */
  showIcon?: boolean;
  /**
   * @default true
   */
  showBorder?: boolean;
}

/** Stroke width for all alert SVG icons (SVG user units). */
const ICON_STROKE_WIDTH = 1.5;

const SvgWrap = ({ children }: { children: ReactNode }) => (
  <svg width={16} height={16} viewBox="0 0 16 16">
    {children}
  </svg>
);

const ICON_MAP = {
  error: ({ color }: { color: string }) => (
    <SvgWrap>
      <circle
        cx={8}
        cy={8}
        r={7}
        fill="none"
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
      />
      <line
        x1={5.5}
        y1={5.5}
        x2={10.5}
        y2={10.5}
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
      <line
        x1={10.5}
        y1={5.5}
        x2={5.5}
        y2={10.5}
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
    </SvgWrap>
  ),
  info: ({ color }: { color: string }) => (
    <SvgWrap>
      <circle
        cx={8}
        cy={8}
        r={7}
        fill="none"
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
      />
      <circle cx={8} cy={4.5} r={1} fill={color} />
      <line
        x1={8}
        y1={7}
        x2={8}
        y2={11.5}
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
    </SvgWrap>
  ),
  success: ({ color }: { color: string }) => (
    <SvgWrap>
      <circle
        cx={8}
        cy={8}
        r={7}
        fill="none"
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
      />
      <path
        d="M5 8 L7 10 L11 6"
        fill="none"
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgWrap>
  ),
  warning: ({ color }: { color: string }) => (
    <SvgWrap>
      <path
        d="M8 1.5 L15 14.5 L1 14.5 Z"
        fill="none"
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <line
        x1={8}
        y1={6}
        x2={8}
        y2={10}
        stroke={color}
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
      <circle cx={8} cy={12.5} r={0.75} fill={color} />
    </SvgWrap>
  ),
};

const AlertIcon = ({
  variant,
  color,
}: {
  variant: AlertVariant;
  color: string;
}) => {
  const Icon = ICON_MAP[variant];
  return <Icon color={color} />;
};

const borderLeft = (color: string) => ({
  borderLeftColor: color,
  borderLeftWidth: 4,
});

const createAlertStyles = (theme: PdfcnTheme) => {
  const { typography, colors, primitives } = theme;

  const variantColors = {
    error: colors.destructive ?? "#EF4444",
    info: colors.info ?? "#3B82F6",
    success: colors.success ?? "#22C55E",
    warning: colors.warning ?? "#F59E0B",
  } satisfies Record<AlertVariant, string>;

  return {
    bg: {
      backgroundColor: colors.muted,
    },
    borderError: borderLeft(variantColors.error),
    borderInfo: borderLeft(variantColors.info),
    borderSuccess: borderLeft(variantColors.success),
    borderWarning: borderLeft(variantColors.warning),
    container: {
      borderRadius: 4,
      display: "flex",
      flexDirection: "row" as const,
      marginBottom: theme.spacing.componentGap,
      padding: 12,
    },
    contentContainer: { flex: 1 },
    description: {
      color: colors.mutedForeground,
      fontFamily: typography.body.fontFamily,
      fontSize: primitives.typography.sm,
      lineHeight: typography.body.lineHeight,
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "flex-start",
      marginRight: 10,
      paddingTop: 2,
      width: 20,
    },
    title: {
      color: colors.foreground,
      fontFamily: typography.heading.fontFamily,
      fontSize: primitives.typography.sm,
      fontWeight: primitives.fontWeights.semibold,
      marginBottom: 4,
    },
    variantColors,
  };
};

export const PdfAlert = ({
  variant = "info",
  title,
  children,
  showIcon = true,
  showBorder = true,
  style,
}: PdfAlertProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createAlertStyles(theme), [theme]);

  if (!title && !children) {
    return null;
  }

  const borderMap = {
    error: styles.borderError,
    info: styles.borderInfo,
    success: styles.borderSuccess,
    warning: styles.borderWarning,
  } as Record<AlertVariant, React.CSSProperties>;

  const containerStyles: React.CSSProperties[] = [
    styles.container,
    styles.bg,
    ...(showBorder ? [borderMap[variant]] : []),
    ...(style ? [style].flat() : []),
  ];

  return (
    <div
      style={Object.assign(
        {},
        { breakInside: "avoid" as const },
        ...containerStyles
      )}
    >
      {showIcon && (
        <div style={styles.iconContainer}>
          <AlertIcon variant={variant} color={styles.variantColors[variant]} />
        </div>
      )}
      <div style={styles.contentContainer}>
        {title && <span style={styles.title}>{title}</span>}
        {typeof children === "string" ? (
          <span style={styles.description}>{children}</span>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
