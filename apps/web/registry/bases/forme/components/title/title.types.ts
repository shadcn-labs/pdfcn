import type { PDFComponentProps } from "@/registry/types/pdf-components";

/** Horizontal alignment for the whole title block. */
export type TitleAlign = "left" | "center" | "right";

/**
 * Document cover title with eyebrow, hero title, and subtitle.
 * Props - `eyebrow` | `title` | `subtitle` | `align` | `accentColor` | `color` | `marginBottom` | `style`
 * @see {@link TitleProps}
 */
export interface TitleProps extends Omit<PDFComponentProps, "children"> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /**
   * @default 'left'
   */
  align?: TitleAlign;
  /**
   * Color of the eyebrow. Accepts theme color keys or any CSS color.
   */
  accentColor?: string;
  /**
   * Color of the title. Accepts theme color keys or any CSS color.
   */
  color?: string;
  marginBottom?: number;
}
