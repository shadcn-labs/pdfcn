import {
  mergePdfStyles,
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/forme/components/theme-provider";
import {
  Text as PDFText,
  View,
} from "@/registry/bases/forme/lib/pdf-primitives";
import type { Style } from "@/registry/bases/forme/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/forme/lib/resolve-color";

import { createTitleStyles } from "./title.styles";
import type { TitleProps } from "./title.types";

export type { TitleAlign, TitleProps } from "./title.types";

export const Title = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  accentColor,
  color,
  marginBottom,
  style,
}: TitleProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createTitleStyles(theme), [theme]);
  const alignment: Style = { textAlign: align };

  const containerStyles: Style[] = [
    styles.container,
    { marginBottom: marginBottom ?? theme.spacing.sectionGap },
  ];
  if (style) {
    containerStyles.push(...[style].flat());
  }

  const eyebrowStyles: Style[] = [styles.eyebrow, alignment];
  if (accentColor) {
    eyebrowStyles.push({ color: resolveColor(accentColor, theme.colors) });
  }

  const titleStyles: Style[] = [styles.title, alignment];
  if (color) {
    titleStyles.push({ color: resolveColor(color, theme.colors) });
  }

  return (
    <View style={mergePdfStyles(containerStyles)}>
      {eyebrow && (
        <PDFText style={mergePdfStyles(eyebrowStyles)}>{eyebrow}</PDFText>
      )}
      <PDFText style={mergePdfStyles(titleStyles)}>{title}</PDFText>
      {subtitle && (
        <PDFText style={mergePdfStyles(styles.subtitle, alignment)}>
          {subtitle}
        </PDFText>
      )}
    </View>
  );
};
