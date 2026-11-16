import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";

/** Horizontal layout of the totals block. */
export type TotalsAlign = "right" | "full";

/**
 * A single breakdown line shown above the grand total.
 * Props - `label` | `value`
 * @see {@link TotalsItem}
 */
export interface TotalsItem {
  label: string;
  value: string;
}

/**
 * Breakdown lines with an emphasized grand-total row, for invoices, quotes, and receipts.
 * Props - `items` | `totalLabel` | `total` | `align` | `accentColor` | `renderingBase` | `style`
 * @see {@link TotalsProps}
 */
export interface TotalsProps {
  items: TotalsItem[];
  totalLabel: string;
  total: string;
  /**
   * @default 'right'
   */
  align?: TotalsAlign;
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
  style?: Style;
}
