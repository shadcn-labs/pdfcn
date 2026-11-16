import type React from "react";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  View,
  Text as PDFText,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";

import { createTimelineStyles } from "./timeline.styles";
import type { TimelineItem, TimelineProps } from "./timeline.types";

type Styles = ReturnType<typeof createTimelineStyles>;

const renderItem = (
  item: TimelineItem,
  index: number,
  total: number,
  accent: string,
  styles: Styles
): React.ReactElement => {
  const isLast = index === total - 1;
  return (
    <View key={index} wrap={false} style={styles.row}>
      <PDFText style={styles.date}>{item.date}</PDFText>
      <View style={styles.rail}>
        <View style={[styles.dot, { backgroundColor: accent }]} />
        {isLast ? null : (
          <View style={[styles.spine, { backgroundColor: accent }]} />
        )}
      </View>
      <View style={[styles.content, isLast ? styles.contentLast : {}]}>
        <PDFText style={styles.title}>{item.title}</PDFText>
        {item.body ? <PDFText style={styles.body}>{item.body}</PDFText> : null}
      </View>
    </View>
  );
};

export const Timeline = ({
  items,
  accentColor = "primary",
  style,
  noWrap = false,
}: TimelineProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createTimelineStyles(theme), [theme]);
  const accent = resolveColor(accentColor, theme.colors);

  const containerStyles: Style[] = [styles.container];
  if (style) {
    containerStyles.push(...[style].flat());
  }

  return (
    <View wrap={!noWrap} style={containerStyles}>
      {items.map((item, index) =>
        renderItem(item, index, items.length, accent, styles)
      )}
    </View>
  );
};
