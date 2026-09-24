import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/pdfme/components/theme-provider";
import {
  Text as PDFText,
  StyleSheet,
} from "@/registry/bases/pdfme/lib/pdf-primitives";
import type { Style } from "@/registry/bases/pdfme/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/pdfme/lib/resolve-color";
import type { PDFComponentProps } from "@/registry/types/pdf-components";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4";

/**
 * Heading with level-based sizing. Maps to pdfme `text` schema with larger sizes.
 */
export interface HeadingProps extends PDFComponentProps {
  /**
   * @default 'h1'
   */
  level?: HeadingLevel;
  align?: "left" | "center" | "right";
  color?: string;
}

const createHeadingStyles = (t: PdfcnTheme) =>
  StyleSheet.create({
    base: {
      color: t.colors.foreground,
      fontFamily: t.typography.heading.fontFamily,
      fontWeight: t.primitives.fontWeights.bold,
      lineHeight: t.typography.heading.lineHeight,
      marginBottom: t.spacing.paragraphGap,
      marginTop: 0,
    },
    h1: { fontSize: t.primitives.typography["3xl"] },
    h2: { fontSize: t.primitives.typography["2xl"] },
    h3: { fontSize: t.primitives.typography.xl },
    h4: { fontSize: t.primitives.typography.lg },
  });

export const Heading = ({
  level = "h1",
  align,
  color,
  children,
  style,
}: HeadingProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createHeadingStyles(theme), [theme]);
  const styleArray: Style[] = [styles.base, styles[level]];
  if (align) {
    styleArray.push({ textAlign: align });
  }
  if (color) {
    styleArray.push({ color: resolveColor(color, theme.colors) });
  }
  if (style) {
    styleArray.push(...[style].flat());
  }
  return <PDFText style={styleArray}>{children}</PDFText>;
};
