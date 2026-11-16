/**
 * Width ratio between the left and right column.
 * `"1:1"` equal, `"2:1"` wide left, `"1:2"` wide right.
 */
export type ColumnsRatio = "1:1" | "2:1" | "1:2";

/** Flex grow factors applied to `[left, right]` for a given ratio. */
export const RATIO_FLEX: Record<ColumnsRatio, [number, number]> = {
  "1:1": [1, 1],
  "1:2": [1, 2],
  "2:1": [2, 1],
};

/** A piece of column text, optionally bold (`**segment**`). */
export interface InlineSegment {
  text: string;
  bold: boolean;
}

const BOLD_RE = /\*\*([^*]+)\*\*/g;

/**
 * Splits one line of column text into plain and bold segments.
 * `"Total: **$120**"` → `[{text:"Total: ",bold:false},{text:"$120",bold:true}]`
 */
export const parseEmphasis = (line: string): InlineSegment[] => {
  const segments: InlineSegment[] = [];
  let cursor = 0;
  for (const match of line.matchAll(BOLD_RE)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      segments.push({ bold: false, text: line.slice(cursor, index) });
    }
    segments.push({ bold: true, text: match[1] ?? "" });
    cursor = index + match[0].length;
  }
  if (cursor < line.length) {
    segments.push({ bold: false, text: line.slice(cursor) });
  }
  return segments;
};
