import type { PDFComponentProps } from "@/registry/types/pdf-components";

/** Horizontal alignment for the quote block. */
export type QuoteAlign = "left" | "center";

/**
 * Pull quote with optional attribution, for testimonials, press citations and epigraphs.
 * Props - `text` | `cite` | `align` | `accentColor` | `style`
 * @see {@link QuoteProps}
 */
export interface QuoteProps extends Omit<PDFComponentProps, "children"> {
  text: string;
  /**
   * Attribution rendered below the quote as "— {cite}".
   */
  cite?: string;
  /**
   * `left` draws an accent bar beside the quote; `center` draws an oversized
   * quotation mark above it.
   * @default 'left'
   */
  align?: QuoteAlign;
  /**
   * Color of the accent bar or quotation mark. Accepts theme color keys or any CSS color.
   * @default 'primary'
   */
  accentColor?: string;
}
