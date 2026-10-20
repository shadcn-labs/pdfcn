import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";

/**
 * Sender and recipient address blocks side by side ("From" / "Bill to",
 * "Ship from" / "Ship to"). Used by invoice, quote, and packing-slip blocks.
 * Props - `from` | `to` | `fromLabel` | `toLabel` | `accentColor` | `style` | `renderingBase`
 * @see {@link PdfAddresses}
 */
export interface AddressesProps {
  /** Sender address. Multiline strings render as stacked lines. */
  from: string;
  /** Recipient address. Multiline strings render as stacked lines. */
  to: string;
  /**
   * Label above the sender address.
   * @default 'From'
   */
  fromLabel?: string;
  /**
   * Label above the recipient address.
   * @default 'Bill to'
   */
  toLabel?: string;
  /**
   * Color of the labels. Falls back to the theme primary color.
   */
  accentColor?: string;
  style?: Style;
  /**
   * @default 'takumi'
   * Forme rendering ships as a follow-up (shadcn-labs/pdfcn#71).
   */
  renderingBase?: "takumi";
}
