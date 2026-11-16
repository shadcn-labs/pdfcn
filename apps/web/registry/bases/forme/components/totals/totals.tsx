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

import { createTotalsStyles } from "./totals.styles";
import type { TotalsProps } from "./totals.types";

export type { TotalsAlign, TotalsItem, TotalsProps } from "./totals.types";

export const Totals = ({
  items,
  totalLabel,
  total,
  align = "right",
  accentColor,
  style,
}: TotalsProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createTotalsStyles(theme), [theme]);
  const emphasis = resolveColor(accentColor ?? "primary", theme.colors);

  const isFull = align === "full";
  const containerStyles: Style[] = isFull
    ? [styles.container]
    : [styles.container, styles.alignRight];
  if (style) {
    containerStyles.push(...[style].flat());
  }
  const blockStyles: Style[] = [
    styles.block,
    isFull ? styles.blockFull : styles.blockRight,
  ];
  const labelWrapStyle = isFull ? styles.labelWrapFull : styles.labelWrap;
  const labelStyles: Style[] = isFull
    ? [styles.label]
    : [styles.label, styles.labelRight];
  const valueStyle = isFull ? styles.valueFull : styles.value;
  const totalRowStyles: Style[] = [
    styles.row,
    styles.totalRow,
    { borderTopColor: emphasis },
  ];
  const totalTextStyle: Style = { ...styles.totalText, color: emphasis };

  return (
    <View wrap={false} style={containerStyles as never}>
      <View style={blockStyles as never}>
        {items.map((item) => (
          <View key={item.label} style={styles.row}>
            <View style={labelWrapStyle}>
              <PDFText style={labelStyles as never}>{item.label}</PDFText>
            </View>
            <PDFText style={valueStyle}>{item.value}</PDFText>
          </View>
        ))}
        <View style={totalRowStyles as never}>
          <View style={labelWrapStyle}>
            <PDFText style={[...labelStyles, totalTextStyle] as never}>
              {totalLabel}
            </PDFText>
          </View>
          <PDFText style={[valueStyle, totalTextStyle] as never}>
            {total}
          </PDFText>
        </View>
      </View>
    </View>
  );
};
