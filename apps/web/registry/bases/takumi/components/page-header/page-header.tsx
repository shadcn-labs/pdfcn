import type { ReactNode } from "react";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type PageHeaderVariant =
  | "simple"
  | "centered"
  | "minimal"
  | "branded"
  | "logo-left"
  | "logo-right"
  | "two-column";

/**
 * Header row with layout variants, logo support, and optional fixed positioning.
 * Props - `title` | `subtitle` | `rightText` | `rightSubText` | `variant` | `background` | `titleColor` | `marginBottom` | `address` | `phone` | `email` | `logo` | `fixed` | `noWrap` | `style`
 * @see {@link PageHeaderProps}
 */
export interface PageHeaderProps extends Omit<PDFComponentProps, "children"> {
  title: string;
  subtitle?: string;
  rightText?: string;
  rightSubText?: string;
  /**
   * @default 'simple'
   */
  variant?: PageHeaderVariant;
  background?: string;
  titleColor?: string;
  marginBottom?: number;
  address?: string;
  phone?: string;
  email?: string;
  logo?: ReactNode;
  /**
   * @default false
   */
  fixed?: boolean;
  /**
   * @default true
   */
  noWrap?: boolean;
}

const createPageHeaderStyles = (t: PdfcnTheme) => {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  const c = t.colors;
  const { heading, body } = t.typography;

  return {
    brandedContainer: {
      alignItems: "center",
      backgroundColor: c.primary,
      borderRadius: borderRadius.sm,
      display: "flex",
      flexDirection: "column",
      padding: spacing[6],
    },
    centeredContainer: {
      alignItems: "center",
      borderBottomColor: c.border,
      borderBottomStyle: "solid",
      borderBottomWidth: spacing[0.5],
      display: "flex",
      flexDirection: "column",
      paddingBottom: spacing[4],
    },
    contactInfo: {
      color: c.mutedForeground,
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      marginTop: spacing[0.5],
      textAlign: "right" as const,
    },

    logoContainer: {
      height: 48,
      marginRight: spacing[4],
      width: 48,
    },

    logoContent: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    logoLeftContainer: {
      alignItems: "center",
      borderBottomColor: c.border,
      borderBottomStyle: "solid",
      borderBottomWidth: spacing[0.5],
      display: "flex",
      flexDirection: "row",
      paddingBottom: spacing[4],
    },
    logoRightContainer: {
      alignItems: "center",
      borderBottomColor: c.border,
      borderBottomStyle: "solid",
      borderBottomWidth: spacing[0.5],
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: spacing[4],
    },

    logoRightContent: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },

    logoRightLogoContainer: {
      height: 48,
      marginLeft: spacing[4],
      width: 48,
    },
    minimalContainer: {
      alignItems: "center",
      borderBottomColor: c.primary,
      borderBottomStyle: "solid",
      borderBottomWidth: spacing[1],
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: spacing[3],
    },
    minimalLeft: {
      flex: 1,
    },
    minimalRight: {
      alignItems: "flex-end",
    },

    rightSubText: {
      color: c.mutedForeground,
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      marginTop: spacing[1],
      textAlign: "right" as const,
    },
    rightText: {
      color: c.foreground,
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      fontWeight: fontWeights.medium,
      textAlign: "right" as const,
    },
    simpleContainer: {
      alignItems: "flex-start",
      borderBottomColor: c.border,
      borderBottomStyle: "solid",
      borderBottomWidth: spacing[0.5],
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: spacing[4],
    },

    simpleLeft: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    simpleRight: {
      alignItems: "flex-end",
      display: "flex",
      flexDirection: "column",
    },

    subtitle: {
      color: c.mutedForeground,
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      lineHeight: body.lineHeight,
      marginTop: spacing[1],
    },
    subtitleBranded: {
      color: c.primaryForeground,
      marginTop: spacing[1],
    },
    subtitleCentered: {
      textAlign: "center" as const,
    },

    title: {
      color: c.foreground,
      fontFamily: heading.fontFamily,
      fontSize: heading.fontSize.h3,
      fontWeight: fontWeights.bold,
      lineHeight: heading.lineHeight,
      marginBottom: 0,
    },
    titleBranded: {
      color: c.primaryForeground,
    },
    titleCentered: {
      textAlign: "center" as const,
    },

    titleMinimal: {
      fontSize: heading.fontSize.h3,
      fontWeight: fontWeights.bold,
    },
    twoColumnContainer: {
      alignItems: "flex-start",
      borderBottomColor: c.border,
      borderBottomStyle: "solid",
      borderBottomWidth: spacing[0.5],
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: spacing[4],
    },
    twoColumnLeft: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    twoColumnRight: {
      alignItems: "flex-end",
      display: "flex",
      flexDirection: "column",
    },
  } as Record<string, React.CSSProperties>;
};

type Styles = ReturnType<typeof createPageHeaderStyles>;

const buildContainerStyles = (
  base: React.CSSProperties,
  mb: number,
  background: string | undefined,
  theme: PdfcnTheme,
  style: React.CSSProperties | undefined,
  ...extras: React.CSSProperties[]
): React.CSSProperties[] => {
  const result: React.CSSProperties[] = [base, { marginBottom: mb }, ...extras];
  if (background) {
    result.push({ backgroundColor: resolveColor(background, theme.colors) });
  }
  if (style) {
    result.push(style);
  }
  return result;
};

const buildTitleStyles = (
  base: React.CSSProperties[],
  titleColor: string | undefined,
  theme: PdfcnTheme
): React.CSSProperties[] => {
  if (!titleColor) {
    return base;
  }
  return [...base, { color: resolveColor(titleColor, theme.colors) }];
};

const renderBranded = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  titleStyles: React.CSSProperties[],
  title: string,
  subtitle: string | undefined,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    <span style={Object.assign({}, ...titleStyles)}>{title}</span>
    {subtitle && (
      <span style={{ ...styles.subtitle, ...styles.subtitleBranded }}>
        {subtitle}
      </span>
    )}
  </div>
);

const renderCentered = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  titleStyles: React.CSSProperties[],
  title: string,
  subtitle: string | undefined,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    <span style={Object.assign({}, ...titleStyles)}>{title}</span>
    {subtitle && (
      <span style={{ ...styles.subtitle, ...styles.subtitleCentered }}>
        {subtitle}
      </span>
    )}
  </div>
);

const renderLogoRight = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  titleStyles: React.CSSProperties[],
  title: string,
  subtitle: string | undefined,
  logo: ReactNode | undefined,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    <div style={styles.logoRightContent}>
      <span style={Object.assign({}, ...titleStyles)}>{title}</span>
      {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
    </div>
    {logo && <div style={styles.logoRightLogoContainer}>{logo}</div>}
  </div>
);

const renderLogoLeft = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  titleStyles: React.CSSProperties[],
  title: string,
  subtitle: string | undefined,
  logo: ReactNode | undefined,
  rightText: string | undefined,
  rightSubText: string | undefined,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    {logo && <div style={styles.logoContainer}>{logo}</div>}
    <div style={styles.logoContent}>
      <span style={Object.assign({}, ...titleStyles)}>{title}</span>
      {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
    </div>
    {(rightText || rightSubText) && (
      <div style={styles.simpleRight}>
        {rightText && <span style={styles.rightText}>{rightText}</span>}
        {rightSubText && (
          <span style={styles.rightSubText}>{rightSubText}</span>
        )}
      </div>
    )}
  </div>
);

const renderTwoColumn = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  titleStyles: React.CSSProperties[],
  title: string,
  subtitle: string | undefined,
  address: string | undefined,
  phone: string | undefined,
  email: string | undefined,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    <div style={styles.twoColumnLeft}>
      <span style={Object.assign({}, ...titleStyles)}>{title}</span>
      {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
    </div>
    {(address || phone || email) && (
      <div style={styles.twoColumnRight}>
        {address && <span style={styles.contactInfo}>{address}</span>}
        {phone && <span style={styles.contactInfo}>{phone}</span>}
        {email && <span style={styles.contactInfo}>{email}</span>}
      </div>
    )}
  </div>
);

const renderMinimal = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  titleStyles: React.CSSProperties[],
  title: string,
  subtitle: string | undefined,
  rightText: string | undefined,
  rightSubText: string | undefined,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    <div style={styles.minimalLeft}>
      <span style={Object.assign({}, ...titleStyles)}>{title}</span>
      {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
    </div>
    {(rightText || rightSubText) && (
      <div style={styles.minimalRight}>
        {rightText && <span style={styles.rightText}>{rightText}</span>}
        {rightSubText && (
          <span style={styles.rightSubText}>{rightSubText}</span>
        )}
      </div>
    )}
  </div>
);

const renderSimple = (
  styles: Styles,
  containerStyles: React.CSSProperties[],
  titleStyles: React.CSSProperties[],
  title: string,
  subtitle: string | undefined,
  rightText: string | undefined,
  rightSubText: string | undefined,
  _noWrap: boolean
) => (
  <div style={Object.assign({}, ...containerStyles)}>
    <div style={styles.simpleLeft}>
      <span style={Object.assign({}, ...titleStyles)}>{title}</span>
      {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
    </div>
    {(rightText || rightSubText) && (
      <div style={styles.simpleRight}>
        {rightText && <span style={styles.rightText}>{rightText}</span>}
        {rightSubText && (
          <span style={styles.rightSubText}>{rightSubText}</span>
        )}
      </div>
    )}
  </div>
);

export const PageHeader = ({
  title,
  subtitle,
  rightText,
  rightSubText,
  variant = "simple",
  background,
  titleColor,
  marginBottom,
  logo,
  address,
  phone,
  email,
  noWrap = true,
  style,
}: PageHeaderProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createPageHeaderStyles(theme), [theme]);
  const mb = marginBottom ?? theme.spacing.sectionGap;

  const variantRenderers: Record<PageHeaderVariant, () => React.ReactNode> = {
    branded: () =>
      renderBranded(
        styles,
        buildContainerStyles(
          styles.brandedContainer,
          mb,
          background,
          theme,
          style
        ),
        buildTitleStyles(
          [styles.title, styles.titleBranded, styles.titleCentered],
          titleColor,
          theme
        ),
        title,
        subtitle,
        noWrap
      ),
    centered: () =>
      renderCentered(
        styles,
        buildContainerStyles(
          styles.centeredContainer,
          mb,
          background,
          theme,
          style
        ),
        buildTitleStyles(
          [styles.title, styles.titleCentered],
          titleColor,
          theme
        ),
        title,
        subtitle,
        noWrap
      ),
    "logo-left": () =>
      renderLogoLeft(
        styles,
        buildContainerStyles(
          styles.logoLeftContainer,
          mb,
          background,
          theme,
          style
        ),
        buildTitleStyles([styles.title], titleColor, theme),
        title,
        subtitle,
        logo,
        rightText,
        rightSubText,
        noWrap
      ),
    "logo-right": () =>
      renderLogoRight(
        styles,
        buildContainerStyles(
          styles.logoRightContainer,
          mb,
          background,
          theme,
          style
        ),
        buildTitleStyles([styles.title], titleColor, theme),
        title,
        subtitle,
        logo,
        noWrap
      ),
    minimal: () =>
      renderMinimal(
        styles,
        buildContainerStyles(
          styles.minimalContainer,
          mb,
          background,
          theme,
          style
        ),
        buildTitleStyles(
          [styles.title, styles.titleMinimal],
          titleColor,
          theme
        ),
        title,
        subtitle,
        rightText,
        rightSubText,
        noWrap
      ),
    simple: () =>
      renderSimple(
        styles,
        buildContainerStyles(
          styles.simpleContainer,
          mb,
          background,
          theme,
          style
        ),
        buildTitleStyles([styles.title], titleColor, theme),
        title,
        subtitle,
        rightText,
        rightSubText,
        noWrap
      ),
    "two-column": () =>
      renderTwoColumn(
        styles,
        buildContainerStyles(
          styles.twoColumnContainer,
          mb,
          background,
          theme,
          style
        ),
        buildTitleStyles([styles.title], titleColor, theme),
        title,
        subtitle,
        address,
        phone,
        email,
        noWrap
      ),
  };

  return variantRenderers[variant]() as React.ReactNode;
};
