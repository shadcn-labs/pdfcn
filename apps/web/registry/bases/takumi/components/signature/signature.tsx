import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type SignatureVariant = "single" | "double" | "inline";

/**
 * Signature signer properties.
 * Props - `label` | `name` | `title` | `date`
 * @see {@link SignatureSigner}
 */
export interface SignatureSigner {
  label?: string;
  name?: string;
  title?: string;
  date?: string;
}

/**
 * Signature block properties.
 * Props - `variant` | `label` | `name` | `title` | `date` | `signers` | `style`
 * @see {@link PdfSignatureBlockProps}
 */
export interface PdfSignatureBlockProps {
  /**
   * Layout variant: [single, double, inline]
   * @default 'single'
   */
  variant?: SignatureVariant;
  label?: string;
  name?: string;
  title?: string;
  date?: string;
  signers?: [SignatureSigner, SignatureSigner];
  style?: React.CSSProperties;
}

const createSignatureStyles = (t: PdfcnTheme) => {
  const { spacing, fontWeights, typography } = t.primitives;
  return {
    block: { flex: 1, minWidth: 140 },
    container: {
      marginBottom: t.spacing.componentGap,
      marginTop: t.spacing.sectionGap,
    },
    dateText: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      marginTop: 1,
    },
    doubleRow: {
      display: "flex",
      flexDirection: "row",
      gap: spacing[8],
      justifyContent: "space-between",
    },
    inlineLabel: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
    },
    inlineLine: {
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
      height: spacing[5],
      minWidth: 120,
      paddingHorizontal: spacing[2],
    },
    inlineName: {
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
    },
    inlineRow: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing[3],
    },
    label: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      marginBottom: spacing[1],
    },
    line: {
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
      marginBottom: spacing[1],
      minHeight: spacing[6],
      paddingHorizontal: spacing[2],
    },
    name: {
      color: t.colors.foreground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      fontWeight: fontWeights.semibold,
    },
    titleText: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
    },
  } as Record<string, React.CSSProperties>;
};

const renderSignerBlock = (
  signer: SignatureSigner,
  styles: ReturnType<typeof createSignatureStyles>
) => (
  <div style={styles.block}>
    {signer.label ? <span style={styles.label}>{signer.label}</span> : null}
    <div style={styles.line} />
    {signer.name ? <span style={styles.name}>{signer.name}</span> : null}
    {signer.title ? <span style={styles.titleText}>{signer.title}</span> : null}
    {signer.date ? <span style={styles.dateText}>{signer.date}</span> : null}
  </div>
);

export const PdfSignatureBlock = ({
  variant = "single",
  label = "Signature",
  name,
  title,
  date,
  signers,
  style,
}: PdfSignatureBlockProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createSignatureStyles(theme), [theme]);
  const containerStyles: React.CSSProperties[] = [styles.container];
  if (style) {
    containerStyles.push(style);
  }

  if (variant === "inline") {
    return (
      <div
        style={Object.assign(
          {},
          { breakInside: "avoid" as const },
          ...containerStyles
        )}
      >
        <div style={styles.inlineRow}>
          <span style={styles.inlineLabel}>{`${label}:`}</span>
          <div style={styles.inlineLine} />
          {name ? <span style={styles.inlineName}>{name}</span> : null}
        </div>
      </div>
    );
  }

  if (variant === "double") {
    const [first, second] = signers ?? [
      { date: "", label: "Authorized by", name: "", title: "" },
      { date: "", label: "Approved by", name: "", title: "" },
    ];
    return (
      <div
        style={Object.assign(
          {},
          { breakInside: "avoid" as const },
          ...containerStyles
        )}
      >
        <div style={styles.doubleRow}>
          {renderSignerBlock(first, styles)}
          {renderSignerBlock(second, styles)}
        </div>
      </div>
    );
  }

  return (
    <div
      style={Object.assign(
        {},
        { breakInside: "avoid" as const },
        ...containerStyles
      )}
    >
      {renderSignerBlock({ date, label, name, title }, styles)}
    </div>
  );
};
