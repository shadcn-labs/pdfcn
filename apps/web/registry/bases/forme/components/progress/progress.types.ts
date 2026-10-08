import type { Style } from "@formepdf/react";

/**
 * A single labeled progress bar.
 * Props - `label` | `value`
 * @see {@link ProgressItem}
 */
export interface ProgressItem {
  label: string;
  /** Percentage from 0 to 100. Values outside that range are clamped. */
  value: number;
}

/**
 * Labeled percentage bars for skills, goals, and initiative tracking.
 * Props - `items` | `showValues` | `accentColor` | `style` | `noWrap`
 * @see {@link PdfProgressProps}
 */
export interface PdfProgressProps {
  items: ProgressItem[];
  /**
   * @default true
   */
  showValues?: boolean;
  /**
   * Theme color key (e.g. `'success'`) or any CSS color.
   * @default 'primary'
   */
  accentColor?: string;
  style?: Style;
  /**
   * @default false
   */
  noWrap?: boolean;
}
