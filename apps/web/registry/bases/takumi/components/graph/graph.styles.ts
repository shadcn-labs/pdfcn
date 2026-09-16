import type { PdfcnTheme } from "@/registry/types/pdf-themes";

export const createGraphStyles = (t: PdfcnTheme) =>
  ({
    chartWithRightLegend: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "row",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: t.spacing.componentGap,
    },
    legendColumn: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginLeft: 12,
      marginTop: 18,
      minWidth: 120,
    },
    legendItem: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: 4,
    },
    legendRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginTop: 6,
    },
    legendText: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
    },
    subtitle: {
      color: t.colors.mutedForeground,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      marginBottom: 6,
    },
    title: {
      color: t.colors.foreground,
      fontFamily: t.typography.heading.fontFamily,
      fontSize: t.primitives.typography.base,
      fontWeight: t.primitives.fontWeights.semibold,
      marginBottom: 2,
    },
  }) as const;
