import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  Text as PDFText,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";

import { createQuoteStyles } from "./quote.styles";
import type { QuoteProps } from "./quote.types";

export type { QuoteAlign, QuoteProps } from "./quote.types";

export const Quote = ({
  text,
  cite,
  align = "left",
  accentColor = "primary",
  style,
}: QuoteProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createQuoteStyles(theme), [theme]);
  const accent = resolveColor(accentColor, theme.colors);
  const alignment: Style = { textAlign: align };
  const centered = align === "center";

  const containerStyles: Style[] = [
    { breakInside: "avoid" as const },
    styles.container,
    ...(centered
      ? [styles.centered]
      : [styles.bar, { borderLeftColor: accent }]),
  ];
  if (style) {
    containerStyles.push(...[style].flat());
  }

  return (
    <View style={containerStyles}>
      {centered && (
        <PDFText style={[styles.mark, { color: accent }]}>“</PDFText>
      )}
      <PDFText style={[styles.text, alignment]}>{text}</PDFText>
      {cite && (
        <PDFText style={[styles.cite, alignment]}>{`— ${cite}`}</PDFText>
      )}
    </View>
  );
};
