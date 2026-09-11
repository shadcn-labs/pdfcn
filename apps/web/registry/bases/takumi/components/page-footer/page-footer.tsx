import type { ReactNode } from "react";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type PageFooterVariant =
  | "simple"
  | "centered"
  | "branded"
  | "minimal"
  | "three-column"
  | "detailed";

/**
 * Footer row with layout variants, optional sticky or fixed positioning, and contact info support.
 * Props - `leftText` | `rightText` | `centerText` | `variant` | `background` | `textColor` | `marginTop` | `address` | `phone` | `email` | `website` | `fixed` | `sticky` | `pagePadding` | `noWrap` | `style`
 * @see {@link PageFooterProps}
 */
export interface PageFooterProps extends Omit<PDFComponentProps, "children"> {
  leftText?: ReactNode;
  rightText?: ReactNode;
  centerText?: ReactNode;
  /**
   * @default 'simple'
   */
  variant?: PageFooterVariant;
  background?: string;
  textColor?: string;
  marginTop?: number;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  /**
   * @default false
   */
  fixed?: boolean;
  /**
   * @default false
   */
  sticky?: boolean;
  /**
   * @default 0
   */
  pagePadding?: number;
  /**
   * @default true
   */
  noWrap?: boolean;
}

const createPageFooterStyles = (t: PdfcnTheme) => {
  const { spacing, fontWeights } = t.primitives;
  const c = t.colors;
  const { body } = t.typography;

  const textBase = {
    color: c.mutedForeground,
    fontFamily: body.fontFamily,
    fontSize: t.primitives.typography.xs,
    lineHeight: body.lineHeight,
  };

  return {
    brandedContainer: {
      alignItems: "center",
      backgroundColor: c.primary,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
    },

    centeredContainer: {
      alignItems: "center",
      borderTopColor: c.border,
      borderTopStyle: "solid",
      borderTopWidth: spacing[0.5],
      display: "flex",
      flexDirection: "column",
      paddingTop: spacing[3],
    },

    companyBold: {
      ...textBase,
      color: c.foreground,
      fontWeight: fontWeights.bold,
    },

    companyName: {
      ...textBase,
      color: c.foreground,
      fontWeight: fontWeights.medium,
    },

    contactInfoCenter: {
      ...textBase,
      fontSize: t.primitives.typography.xs - 1,
      marginTop: spacing[0.5],
      textAlign: "center" as const,
    },
    detailedContainer: {
      borderTopColor: c.border,
      borderTopStyle: "solid",
      borderTopWidth: spacing[1],
      display: "flex",
      flexDirection: "column",
      paddingTop: spacing[3],
    },
    detailedLeft: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    detailedPageNumber: {
      ...textBase,
      borderTopColor: c.border,
      borderTopStyle: "solid",
      borderTopWidth: spacing[0.5],
      paddingTop: spacing[2],
      textAlign: "center" as const,
    },
    detailedRight: {
      alignItems: "flex-end",
      display: "flex",
      flexDirection: "column",
    },
    detailedTopRow: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing[2],
    },

    minimalContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: spacing[1],
      paddingTop: spacing[1],
    },
    simpleContainer: {
      alignItems: "center",
      borderTopColor: c.border,
      borderTopStyle: "solid",
      borderTopWidth: spacing[0.5],
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: spacing[3],
    },
    textBranded: {
      ...textBase,
      color: c.primaryForeground,
      fontWeight: fontWeights.medium,
    },
    textBrandedRight: {
      ...textBase,
      color: c.primaryForeground,
      textAlign: "right" as const,
    },
    textCenter: {
      ...textBase,
      flex: 1,
      textAlign: "center" as const,
    },
    textCenteredVariant: {
      ...textBase,
      marginBottom: spacing[1],
      textAlign: "center" as const,
    },

    textLeft: {
      ...textBase,
      flex: 1,
    },
    textRight: {
      ...textBase,
      textAlign: "right" as const,
    },
    threeColumnCenter: {
      alignItems: "center",
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    threeColumnContainer: {
      alignItems: "flex-start",
      borderTopColor: c.border,
      borderTopStyle: "solid",
      borderTopWidth: spacing[0.5],
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: spacing[3],
    },
    threeColumnLeft: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    threeColumnRight: {
      alignItems: "flex-end",
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
  } as Record<string, React.CSSProperties>;
};

type Styles = ReturnType<typeof createPageFooterStyles>;

const applyTextColor = (
  styles: React.CSSProperties[],
  color: string | undefined
): React.CSSProperties[] => {
  if (!color) {
    return styles;
  }
  return [...styles, { color }];
};

const renderBranded = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  leftStyle: React.CSSProperties[],
  rightStyle: React.CSSProperties[],
  leftText: ReactNode,
  rightText: ReactNode,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    {leftText && (
      <span style={Object.assign({}, ...leftStyle)}>{leftText}</span>
    )}
    {rightText && (
      <span style={Object.assign({}, ...rightStyle)}>{rightText}</span>
    )}
  </div>
);

const renderCentered = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  textStyle: React.CSSProperties[],
  leftText: ReactNode,
  rightText: ReactNode,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    {leftText && (
      <span style={Object.assign({}, ...textStyle)}>{leftText}</span>
    )}
    {rightText && (
      <span style={Object.assign({}, ...textStyle)}>{rightText}</span>
    )}
  </div>
);

const renderThreeColumn = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  leftStyle: React.CSSProperties[],
  centerStyle: React.CSSProperties[],
  rightStyle: React.CSSProperties[],
  leftText: ReactNode,
  rightText: ReactNode,
  address: string | undefined,
  phone: string | undefined,
  email: string | undefined,
  website: string | undefined,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    <div style={styles.threeColumnLeft}>
      {leftText && (
        <span style={Object.assign({}, ...leftStyle)}>{leftText}</span>
      )}
      {address && <span style={styles.textLeft}>{address}</span>}
    </div>
    <div style={styles.threeColumnCenter}>
      {phone && <span style={Object.assign({}, ...centerStyle)}>{phone}</span>}
      {email && <span style={Object.assign({}, ...centerStyle)}>{email}</span>}
      {website && (
        <span style={Object.assign({}, ...centerStyle)}>{website}</span>
      )}
    </div>
    <div style={styles.threeColumnRight}>
      {rightText && (
        <span style={Object.assign({}, ...rightStyle)}>{rightText}</span>
      )}
    </div>
  </div>
);

const renderDetailed = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  companyStyle: React.CSSProperties[],
  addrStyle: React.CSSProperties[],
  contactStyle: React.CSSProperties[],
  pageNumStyle: React.CSSProperties[],
  leftText: ReactNode,
  rightText: ReactNode,
  address: string | undefined,
  phone: string | undefined,
  email: string | undefined,
  website: string | undefined,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    <div style={styles.detailedTopRow}>
      <div style={styles.detailedLeft}>
        {leftText && (
          <span style={Object.assign({}, ...companyStyle)}>{leftText}</span>
        )}
        {address && (
          <span style={Object.assign({}, ...addrStyle)}>{address}</span>
        )}
      </div>
      <div style={styles.detailedRight}>
        {phone && (
          <span
            style={Object.assign({}, ...contactStyle)}
          >{`Phone: ${phone}`}</span>
        )}
        {email && (
          <span
            style={Object.assign({}, ...contactStyle)}
          >{`Email: ${email}`}</span>
        )}
        {website && (
          <span
            style={Object.assign({}, ...contactStyle)}
          >{`Web: ${website}`}</span>
        )}
      </div>
    </div>
    {rightText && (
      <span style={Object.assign({}, ...pageNumStyle)}>{rightText}</span>
    )}
  </div>
);

const renderMinimal = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  leftStyle: React.CSSProperties[],
  rightStyle: React.CSSProperties[],
  leftText: ReactNode,
  rightText: ReactNode,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    {leftText && (
      <span style={Object.assign({}, ...leftStyle)}>{leftText}</span>
    )}
    {rightText && (
      <span style={Object.assign({}, ...rightStyle)}>{rightText}</span>
    )}
  </div>
);

const renderSimple = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  leftStyle: React.CSSProperties[],
  centerStyle: React.CSSProperties[],
  rightStyle: React.CSSProperties[],
  leftText: ReactNode,
  centerText: ReactNode,
  rightText: ReactNode,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    {leftText && (
      <span style={Object.assign({}, ...leftStyle)}>{leftText}</span>
    )}
    {centerText && (
      <span style={Object.assign({}, ...centerStyle)}>{centerText}</span>
    )}
    {rightText && (
      <span style={Object.assign({}, ...rightStyle)}>{rightText}</span>
    )}
  </div>
);

export const PageFooter = ({
  leftText,
  rightText,
  centerText,
  variant = "simple",
  background,
  textColor,
  marginTop,
  address,
  phone,
  email,
  website,
  fixed = false,
  sticky = false,
  pagePadding = 0,
  noWrap = true,
  style,
}: PageFooterProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createPageFooterStyles(theme), [theme]);
  const _isFixed = fixed || sticky;
  const mt = sticky ? 0 : (marginTop ?? theme.spacing.sectionGap);
  const resolvedTextColor = textColor
    ? resolveColor(textColor, theme.colors)
    : undefined;
  // A footer passed as a render option lays out at full page width, so the
  // page padding has to come from the footer itself to line up with the content.
  const placement: React.CSSProperties = sticky
    ? {
        bottom: pagePadding,
        left: pagePadding,
        position: "absolute",
        right: pagePadding,
      }
    : { paddingLeft: pagePadding, paddingRight: pagePadding };

  const applyOverrides = (
    base: React.CSSProperties[]
  ): React.CSSProperties[] => {
    if (background) {
      base.push({ backgroundColor: resolveColor(background, theme.colors) });
    }
    if (style) {
      base.push(style);
    }
    base.push(placement);
    return base;
  };

  const variantRenderers: Record<PageFooterVariant, () => React.ReactNode> = {
    branded: () =>
      renderBranded(
        styles,
        applyOverrides([styles.brandedContainer, { marginTop: mt }]),
        applyTextColor([styles.textBranded], resolvedTextColor),
        applyTextColor([styles.textBrandedRight], resolvedTextColor),
        leftText,
        rightText,
        noWrap
      ),
    centered: () =>
      renderCentered(
        styles,
        applyOverrides([styles.centeredContainer, { marginTop: mt }]),
        applyTextColor([styles.textCenteredVariant], resolvedTextColor),
        leftText,
        rightText,
        noWrap
      ),
    detailed: () =>
      renderDetailed(
        styles,
        applyOverrides([styles.detailedContainer, { marginTop: mt }]),
        applyTextColor([styles.companyBold], resolvedTextColor),
        applyTextColor([styles.textLeft], resolvedTextColor),
        applyTextColor([styles.textRight], resolvedTextColor),
        applyTextColor([styles.detailedPageNumber], resolvedTextColor),
        leftText,
        rightText,
        address,
        phone,
        email,
        website,
        noWrap
      ),
    minimal: () =>
      renderMinimal(
        styles,
        applyOverrides([styles.minimalContainer, { marginTop: mt }]),
        applyTextColor([styles.textLeft], resolvedTextColor),
        applyTextColor([styles.textRight], resolvedTextColor),
        leftText,
        rightText,
        noWrap
      ),
    simple: () =>
      renderSimple(
        styles,
        applyOverrides([styles.simpleContainer, { marginTop: mt }]),
        applyTextColor([styles.textLeft], resolvedTextColor),
        applyTextColor([styles.textCenter], resolvedTextColor),
        applyTextColor([styles.textRight], resolvedTextColor),
        leftText,
        centerText,
        rightText,
        noWrap
      ),
    "three-column": () =>
      renderThreeColumn(
        styles,
        applyOverrides([styles.threeColumnContainer, { marginTop: mt }]),
        applyTextColor([styles.companyName], resolvedTextColor),
        applyTextColor([styles.contactInfoCenter], resolvedTextColor),
        applyTextColor([styles.textRight], resolvedTextColor),
        leftText,
        rightText,
        address,
        phone,
        email,
        website,
        noWrap
      ),
  };

  return variantRenderers[variant]() as React.ReactNode;
};
