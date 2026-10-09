import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";

/** Linear barcode symbology. */
export type BarcodeFormat = "Code128" | "Code39" | "EAN13";

/**
 * Linear barcode (Code 128, Code 39, or EAN-13) rendered with SVG primitives.
 * Props - `data` | `format` | `caption` | `height` | `accentColor` | `renderingBase` | `style`
 * @see {@link BarcodeProps}
 */
export interface BarcodeProps {
  data: string;
  /**
   * @default 'Code128'
   */
  format?: BarcodeFormat;
  caption?: string;
  /**
   * Bar height in points.
   * @default 44
   */
  height?: number;
  /**
   * @default 'primary'
   */
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
  style?: Style;
}
