import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";

/** Number of tiles rendered per row. */
export type StatsColumns = 2 | 3 | 4;

/**
 * A single metric tile with a label, a headline value and an optional note.
 * Props - `label` | `value` | `note`
 * @see {@link StatItem}
 */
export interface StatItem {
  label: string;
  value: string;
  note?: string;
}

/**
 * Row of KPI metric tiles for reports and proposals.
 * Props - `items` | `columns` | `accentColor` | `noWrap` | `style`
 * @see {@link StatsProps}
 */
export interface StatsProps {
  items: StatItem[];
  /**
   * Tiles per row. Extra items wrap onto a new row with the same tile width.
   * @default 3
   */
  columns?: StatsColumns;
  /**
   * Theme color token or CSS color used for the note line.
   * @default 'primary'
   */
  accentColor?: string;
  /**
   * @default false
   */
  noWrap?: boolean;
  style?: Style;
}
