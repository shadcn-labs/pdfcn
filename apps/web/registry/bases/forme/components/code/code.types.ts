import type { Style } from "@/registry/bases/forme/lib/pdf-primitives";

import type { CodeLanguage } from "./code.utils";

/**
 * Monospaced code snippet on a muted filled background with rounded corners.
 * Props - `code` | `title` | `language` | `maxLines` | `accentColor` | `renderingBase` | `style`
 * @see {@link CodeProps}
 */
export interface CodeProps {
  /** Source text. Line breaks are preserved; long lines wrap within the block. */
  code: string;
  /** Small label bar above the code (filename, language, or command). */
  title?: string;
  /**
   * Syntax highlighting language. When omitted, the language is inferred from
   * a filename-like `title` (e.g. `"app.ts"`); plain text is used if unknown.
   */
  language?: CodeLanguage;
  /** Truncate the snippet after this many lines, adding an ellipsis line. */
  maxLines?: number;
  /**
   * Accent color for a left rule on the block. Omit for a plain filled block.
   */
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
  style?: Style;
}
