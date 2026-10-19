import { StyleSheet } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

const LABEL_COLUMN_WIDTH = 120;
const VALUE_COLUMN_WIDTH = 76;
const COLUMN_GAP = 12;

/**
 * Creates all totals styles derived from the active theme.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createTotalsStyles = (t: PdfcnTheme) => {
  const { fontWeights, spacing, typography } = t.primitives;
  const text = {
    fontFamily: t.typography.body.fontFamily,
    fontSize: typography.xs,
    lineHeight: t.typography.body.lineHeight,
  };

  return StyleSheet.create({
    // Right alignment uses main-axis justification: Forme ignores alignSelf.
    alignRight: {
      justifyContent: "flex-end",
    },
    block: {
      display: "flex",
      flexDirection: "column",
    },
    blockFull: {
      flex: 1,
    },
    blockRight: {
      maxWidth: "100%",
      width: LABEL_COLUMN_WIDTH + COLUMN_GAP + VALUE_COLUMN_WIDTH,
    },
    container: {
      display: "flex",
      flexDirection: "row",
      marginBottom: t.spacing.componentGap,
      width: "100%",
    },
    label: {
      ...text,
      color: t.colors.mutedForeground,
    },
    labelRight: {
      textAlign: "right",
    },
    // Fixed label column so breakdown labels hug the value column
    labelWrap: {
      flexShrink: 1,
      minWidth: 0,
      paddingRight: COLUMN_GAP,
      width: LABEL_COLUMN_WIDTH + COLUMN_GAP,
    },
    // flex lives on the wrapping View, not the Text: see list.styles.ts
    labelWrapFull: {
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
      paddingRight: spacing[4],
    },
    row: {
      alignItems: "flex-start",
      flexDirection: "row",
      paddingVertical: spacing[1],
    },
    totalRow: {
      borderTopStyle: "solid",
      borderTopWidth: 1,
      marginTop: spacing[1],
      paddingTop: spacing[2],
    },
    totalText: {
      fontSize: typography.base,
      fontWeight: fontWeights.bold,
    },
    value: {
      ...text,
      color: t.colors.foreground,
      flexShrink: 0,
      textAlign: "right",
      width: VALUE_COLUMN_WIDTH,
    },
    valueFull: {
      ...text,
      color: t.colors.foreground,
      flexShrink: 0,
      textAlign: "right",
    },
  });
};
