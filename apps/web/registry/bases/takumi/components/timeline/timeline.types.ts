import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";

/**
 * A single dated milestone on the timeline.
 * Props - `date` | `title` | `body`
 * @see {@link TimelineItem}
 */
export interface TimelineItem {
  date: string;
  title: string;
  body?: string;
}

/**
 * Vertical timeline of dated milestones with an accent spine and dot markers.
 * Props - `items` | `accentColor` | `style` | `noWrap`
 * @see {@link TimelineProps}
 */
export interface TimelineProps {
  items: TimelineItem[];
  /**
   * Theme color token or CSS color applied to the spine and dot markers.
   * @default 'primary'
   */
  accentColor?: string;
  style?: Style;
  /**
   * @default false
   */
  noWrap?: boolean;
}
