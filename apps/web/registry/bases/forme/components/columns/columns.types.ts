import type { Style } from "@/registry/bases/forme/lib/pdf-primitives";

import type { ColumnsRatio } from "./columns.utils";

/**
 * Side-by-side two-column text with equal or weighted widths.
 * Each column is multi-line text; `**segment**` renders bold.
 * Props - `left` | `right` | `ratio` | `gap` | `accentColor` | `renderingBase` | `style`
 * @see {@link ColumnsProps}
 */
export interface ColumnsProps {
  /** Left column text. `\n` splits lines; `**segment**` renders bold. */
  left: string;
  /** Right column text. `\n` splits lines; `**segment**` renders bold. */
  right: string;
  /**
   * Width ratio between the columns.
   * @default '1:1'
   */
  ratio?: ColumnsRatio;
  /** Horizontal gap between columns in points. Defaults to the theme gap. */
  gap?: number;
  /**
   * Accent color for a vertical rule between the columns. Omit for none.
   */
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
  style?: Style;
}
