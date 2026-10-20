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

import { createAddressesStyles } from "./addresses.styles";
import type { AddressesProps } from "./addresses.types";

type Styles = ReturnType<typeof createAddressesStyles>;

const splitLines = (address: string): string[] => address.split(/\r?\n/);

const renderAddressColumn = (
  label: string,
  address: string,
  accent: string,
  styles: Styles,
  columnKey: string,
  columnStyle?: Style
): React.ReactElement => (
  <View key={columnKey} style={columnStyle ? [styles.column, columnStyle] : styles.column}>
    <PDFText style={[styles.label, { color: accent }]}>
      {label.toUpperCase()}
    </PDFText>
    <View>
      {splitLines(address).map((line, index) => (
        <PDFText
          key={
            line ? `${columnKey}-line-${index}-${line}` : `${columnKey}-blank-${index}`
          }
          style={styles.addressText}
        >
          {line}
        </PDFText>
      ))}
    </View>
  </View>
);

export const PdfAddresses = ({
  from,
  to,
  fromLabel = "From",
  toLabel = "Bill to",
  accentColor,
  style,
}: AddressesProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createAddressesStyles(theme), [theme]);
  const accent = accentColor ?? theme.colors.primary;

  const containerStyles: Style[] = [styles.container];
  if (style) {
    containerStyles.push(style);
  }

  return (
    <View style={containerStyles}>
      {renderAddressColumn(fromLabel, from, accent, styles, "from")}
      <View style={styles.columnGap} />
      {renderAddressColumn(toLabel, to, accent, styles, "to")}
    </View>
  );
};
