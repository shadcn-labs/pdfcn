import { StyleSheet } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { ResolvedDataTableDensity } from "./data-table-headless.types";

/** Per-density tier styles for cells and text. */
export interface DataTableTierStyles {
  cell: Style;
  text: Style;
  headerText: Style;
  footerText: Style;
  fontSize: number;
  padH: number;
  padV: number;
}

/** Shared styles plus the density tiers and indent unit. */
export interface DataTableStyles {
  cellFixed: Style;
  empty: Style;
  emptyText: Style;
  indent: number;
  row: Style;
  tiers: Record<ResolvedDataTableDensity, DataTableTierStyles>;
}

/**
 * Creates all headless data-table styles derived from the active theme.
 * Density tiers scale font size and padding: default uses the body size,
 * compact steps down to `sm`, and dense to `xs` with tight padding.
 * @param t - The resolved PdfcnTheme instance.
 */
export const createDataTableStyles = (t: PdfcnTheme): DataTableStyles => {
  const { spacing, fontWeights, typography } = t.primitives;

  const textBase = {
    fontFamily: t.typography.body.fontFamily,
    lineHeight: 1.2,
  };

  const createTier = (
    fontSize: number,
    padV: number,
    padH: number
  ): DataTableTierStyles => ({
    cell: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: padH,
      paddingVertical: padV,
    },
    fontSize,
    footerText: {
      ...textBase,
      color: t.colors.foreground,
      fontSize,
      fontWeight: fontWeights.semibold,
    },
    headerText: {
      ...textBase,
      color: t.colors.foreground,
      fontSize,
      fontWeight: fontWeights.semibold,
    },
    padH,
    padV,
    text: {
      ...textBase,
      color: t.colors.foreground,
      fontSize,
    },
  });

  const tiers: Record<ResolvedDataTableDensity, DataTableTierStyles> = {
    compact: createTier(typography.sm, spacing[1], spacing[2]),
    default: createTier(
      t.typography.body.fontSize,
      spacing[2] - 2,
      spacing[2] + 2
    ),
    dense: createTier(typography.xs, spacing[0.5], spacing[1]),
  };

  return {
    ...StyleSheet.create({
      cellFixed: {
        flexGrow: 0,
        flexShrink: 0,
        justifyContent: "center",
      },
      empty: {
        paddingBottom: spacing[2],
        paddingTop: spacing[2],
      },
      emptyText: {
        ...textBase,
        color: t.colors.mutedForeground,
        fontSize: typography.sm,
      },
      row: {
        display: "flex",
        flexDirection: "row",
      },
    }),
    indent: spacing[2],
    tiers,
  };
};
