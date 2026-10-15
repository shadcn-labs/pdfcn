import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/forme/components/theme-provider";
import {
  Text as PDFText,
  View,
} from "@/registry/bases/forme/lib/pdf-primitives";
import type { Style } from "@/registry/bases/forme/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/forme/lib/resolve-color";

import { createProgressStyles } from "./progress.styles";
import type { PdfProgressProps } from "./progress.types";

/** Clamps a percentage to 0-100; non-finite values render as an empty bar. */
const clampPercent = (value: number): number =>
  Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;

export const PdfProgress = ({
  items,
  showValues = true,
  accentColor = "primary",
  style,
  noWrap = false,
}: PdfProgressProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createProgressStyles(theme), [theme]);
  const fillColor = resolveColor(accentColor, theme.colors);

  const containerStyles: Style[] = style
    ? [styles.container, style]
    : [styles.container];

  return (
    <View wrap={!noWrap} style={containerStyles as never}>
      {items.map((item, index) => {
        const percent = clampPercent(item.value);
        const valueLabel = `${Math.round(percent)}%`;
        return (
          // Keep each label with its bar when the list breaks across pages.
          <View key={`${item.label}-${index}`} wrap={false} style={styles.item}>
            <View style={styles.labelRow}>
              <PDFText style={styles.label}>{item.label}</PDFText>
              {showValues ? (
                <PDFText style={styles.value}>{valueLabel}</PDFText>
              ) : null}
            </View>
            <View style={styles.track}>
              {/* A zero-width fill still draws a hairline, so skip it at 0%. */}
              {percent > 0 ? (
                <View
                  style={
                    [
                      styles.fill,
                      { backgroundColor: fillColor, width: `${percent}%` },
                    ] as never
                  }
                />
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};
