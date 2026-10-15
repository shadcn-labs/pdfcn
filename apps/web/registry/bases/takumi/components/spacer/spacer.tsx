import { View } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PDFComponentProps } from "@/registry/types/pdf-components";

/**
 * Empty fixed-height vertical space.
 * Props - `size` | `style`
 * @see {@link SpacerProps}
 */
export interface SpacerProps extends Omit<PDFComponentProps, "children"> {
  /**
   * Height in points, clamped to 4–200.
   * @default 24
   */
  size?: number;
}

const clampSize = (size: number) =>
  Number.isFinite(size) ? Math.min(200, Math.max(4, size)) : 24;

export const Spacer = ({ size = 24, style }: SpacerProps) => {
  // flexShrink: 0 keeps a flex parent from squeezing the space away.
  // Applied after caller styles so `size` always sets the height.
  const styleArray: Style[] = [
    ...(style ? [style].flat() : []),
    { flexShrink: 0, height: clampSize(size) },
  ];
  return <View style={styleArray} />;
};
