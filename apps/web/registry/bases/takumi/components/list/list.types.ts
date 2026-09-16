import type { CSSProperties } from "react";

/** List visual style variant. */
export type ListVariant =
  | "bullet"
  | "numbered"
  | "checklist"
  | "icon"
  | "multi-level"
  | "descriptive";

/**
 * A single list item, optionally with nested children.
 * Props - `text` | `description` | `checked` | `children`
 * @see {@link ListItem}
 */
export interface ListItem {
  text: string;
  description?: string;
  checked?: boolean;
  children?: ListItem[];
}

/**
 * List of items with multiple style variants including bullet, numbered, checklist, and descriptive.
 * Props - `items` | `variant` | `gap` | `style` | `_level` | `noWrap`
 * @see {@link PdfListProps}
 */
export interface PdfListProps {
  items: ListItem[];
  /**
   * @default 'bullet'
   */
  variant?: ListVariant;
  /**
   * @default 'sm'
   */
  gap?: "xs" | "sm" | "md";
  style?: CSSProperties;
  _level?: number;
  /**
   * @default false
   */
  noWrap?: boolean;
}
