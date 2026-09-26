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

import { createStatsStyles } from "./stats.styles";
import type { StatItem, StatsColumns, StatsProps } from "./stats.types";

type Styles = ReturnType<typeof createStatsStyles>;

const getValueStyle = (columns: StatsColumns, styles: Styles): Style => {
  if (columns === 2) {
    return styles.valueLg;
  }
  if (columns === 4) {
    return styles.valueSm;
  }
  return styles.valueMd;
};

const chunkItems = (items: StatItem[], size: number): StatItem[][] => {
  const rows: StatItem[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
};

export const Stats = ({
  items,
  columns = 3,
  accentColor = "primary",
  noWrap = false,
  style,
}: StatsProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createStatsStyles(theme), [theme]);

  if (items.length === 0) {
    return null;
  }

  const rows = chunkItems(items, columns);
  const valueStyle = getValueStyle(columns, styles);
  const noteStyle: Style[] = [
    styles.note,
    { color: resolveColor(accentColor, theme.colors) },
  ];
  const containerStyles: Style[] = [styles.container];
  if (style) {
    containerStyles.push(style);
  }

  return (
    <View wrap={!noWrap} style={containerStyles}>
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          wrap={false}
          style={
            rowIndex === rows.length - 1
              ? styles.row
              : [styles.row, styles.rowGap]
          }
        >
          {row.map((item, index) => (
            <View key={index} style={styles.tile}>
              <PDFText style={styles.label}>{item.label}</PDFText>
              <PDFText style={valueStyle}>{item.value}</PDFText>
              {item.note ? (
                <PDFText style={noteStyle}>{item.note}</PDFText>
              ) : null}
            </View>
          ))}
          {Array.from({ length: columns - row.length }, (_, index) => (
            <View key={`spacer-${index}`} style={styles.spacer} />
          ))}
        </View>
      ))}
    </View>
  );
};
