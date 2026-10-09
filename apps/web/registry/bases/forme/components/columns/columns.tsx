import { Strong } from "@formepdf/react";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/forme/components/theme-provider";
import {
  View,
  Text as PDFText,
} from "@/registry/bases/forme/lib/pdf-primitives";
import type { Style } from "@/registry/bases/forme/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/forme/lib/resolve-color";

import { createColumnsStyles } from "./columns.styles";
import type { ColumnsProps } from "./columns.types";
import { parseEmphasis, RATIO_FLEX } from "./columns.utils";

const Column = ({
  text,
  flex,
  lineStyle,
}: {
  text: string;
  flex: number;
  lineStyle: Style;
}) => (
  <View style={{ flexBasis: 0, flexGrow: flex, flexShrink: 1, minWidth: 0 }}>
    {text.split("\n").map((line, i) => (
      <PDFText key={`${i}-${line.length}`} style={lineStyle}>
        {line.length === 0
          ? " "
          : parseEmphasis(line).map((segment, j) =>
              // Raw <Strong> required: Forme only produces styled runs from
              // elements whose type it recognises (Text, Strong, Em…).
              segment.bold ? (
                <Strong key={`${i}-${j}`}>{segment.text}</Strong>
              ) : (
                segment.text
              )
            )}
      </PDFText>
    ))}
  </View>
);

export const Columns = ({
  left,
  right,
  ratio = "1:1",
  gap,
  accentColor,
  style,
}: ColumnsProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createColumnsStyles(theme), [theme]);

  const [leftFlex, rightFlex] = RATIO_FLEX[ratio];
  const columnGap = gap ?? theme.primitives.spacing[3];
  const accent = accentColor
    ? resolveColor(accentColor, theme.colors)
    : undefined;
  const containerStyles: Style[] = [styles.container];
  if (style) {
    containerStyles.push(style);
  }

  return (
    <View style={containerStyles}>
      <Column flex={leftFlex} lineStyle={styles.line} text={left} />
      {accent ? (
        <View
          style={[
            styles.divider,
            {
              alignSelf: "stretch",
              backgroundColor: accent,
              marginHorizontal: columnGap / 2 - 0.25,
            },
          ]}
        />
      ) : (
        <View style={[styles.spacer, { width: columnGap }]} />
      )}
      <Column flex={rightFlex} lineStyle={styles.line} text={right} />
    </View>
  );
};
