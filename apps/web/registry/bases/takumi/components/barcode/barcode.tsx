import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  Text as PDFText,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";
import { Rect, Svg } from "@/registry/bases/takumi/lib/pdf-svg";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";

import { createBarcodeStyles } from "./barcode.styles";
import type { BarcodeProps } from "./barcode.types";
import { encodeBarcode, QUIET_ZONE_MODULES } from "./barcode.utils";

export type { BarcodeFormat, BarcodeProps } from "./barcode.types";

const MODULE_WIDTH = 1.5;

export const Barcode = ({
  data,
  format = "Code128",
  caption,
  height = 44,
  accentColor,
  style,
}: BarcodeProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createBarcodeStyles(theme), [theme]);
  const encoded = useSafeMemo(
    () => encodeBarcode(data, format),
    [data, format]
  );
  const color = resolveColor(accentColor ?? "primary", theme.colors);
  const containerStyles: Style[] = [styles.container];
  if (style) {
    containerStyles.push(...[style].flat());
  }

  if (encoded === null) {
    return (
      <View style={containerStyles}>
        <View
          style={[
            styles.placeholder,
            { height, width: (QUIET_ZONE_MODULES * 2 + 60) * MODULE_WIDTH },
          ]}
        >
          <PDFText style={styles.placeholderText}>Invalid barcode</PDFText>
        </View>
        {caption && <PDFText style={styles.caption}>{caption}</PDFText>}
      </View>
    );
  }

  const width = (encoded.modules + QUIET_ZONE_MODULES * 2) * MODULE_WIDTH;
  return (
    <View style={containerStyles}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {encoded.bars.map((bar) => (
          <Rect
            key={`bar-${bar.x}`}
            x={(bar.x + QUIET_ZONE_MODULES) * MODULE_WIDTH}
            y={0}
            width={bar.width * MODULE_WIDTH}
            height={height}
            fill={color}
          />
        ))}
      </Svg>
      {caption && <PDFText style={styles.caption}>{caption}</PDFText>}
    </View>
  );
};
