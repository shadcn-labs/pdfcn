import type React from "react";
import type { CSSProperties } from "react";

import {
  usePdfcnTheme,
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import { createGraphStyles } from "./graph.styles";
import type { ChartLayout, GraphProps, GraphSeries } from "./graph.types";
import {
  GRAPH_SAFE_WIDTHS,
  arcPath,
  buildLayout,
  fmtNum,
  getDefaultPalette,
  getGraphWidth,
  normalizeData,
  polarToCartesian,
  smoothPath,
  truncate,
} from "./graph.utils";

/**
 * Shared Y-axis grid lines and tick labels for cartesian charts (bar, line, area).
 * Extracted to avoid duplicating the identical block across render functions.
 */
const renderGridAndYAxis = (
  ticks: number[],
  toY: (v: number) => number,
  chartX: number,
  chartW: number,
  showGrid: boolean,
  gridColor: string,
  textColor: string
) => (
  <>
    {ticks.map((tick) => {
      const ty = toY(tick);
      return (
        <g key={`grid-${tick}`}>
          {showGrid && (
            <line
              x1={chartX}
              y1={ty}
              x2={chartX + chartW}
              y2={ty}
              stroke={gridColor}
              strokeWidth={0.5}
              strokeDasharray="3 3"
            />
          )}
          <text
            x={chartX - 4}
            y={ty + 3}
            fill={textColor}
            textAnchor="end"
            fontSize={7}
          >
            {fmtNum(tick)}
          </text>
        </g>
      );
    })}
  </>
);

const renderBarChart = (
  series: GraphSeries[],
  layout: ChartLayout,
  palette: string[],
  showGrid: boolean,
  showValues: boolean,
  theme: PdfcnTheme
) => {
  const { chartX, chartY, chartW, chartH, yMin, yMax, yTicks, xLabels } =
    layout;
  const nCategories = xLabels.length;
  const nSeries = series.length;
  const groupGap = 0.25;
  const groupW = chartW / nCategories;
  const barW = (groupW * (1 - groupGap)) / nSeries;
  const textColor = theme.colors.mutedForeground;
  const gridColor = theme.colors.border;
  const axisColor = theme.colors.foreground;
  const range = yMax - yMin || 1;
  const toY = (v: number) => chartY + chartH - ((v - yMin) / range) * chartH;

  return (
    <>
      {renderGridAndYAxis(
        yTicks,
        toY,
        chartX,
        chartW,
        showGrid,
        gridColor,
        textColor
      )}

      <line
        x1={chartX}
        y1={chartY + chartH}
        x2={chartX + chartW}
        y2={chartY + chartH}
        stroke={axisColor}
        strokeWidth={1}
      />

      {xLabels.map((label, ci) => {
        const groupLeft = chartX + ci * groupW + groupW * (groupGap / 2);
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
          <g key={`group-${ci}`}>
            {series.map((s, si) => {
              const val = s.data[ci]?.value ?? 0;
              const color =
                s.data[ci]?.color ?? s.color ?? palette[si % palette.length];
              const barH = ((val - yMin) / range) * chartH;
              const bx = groupLeft + si * barW;
              const by = chartY + chartH - barH;
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
                <g key={`bar-${ci}-${si}`}>
                  <rect
                    x={bx}
                    y={by}
                    width={barW - 1}
                    height={barH}
                    fill={color}
                  />
                  {showValues && barH > 10 && (
                    <text
                      x={bx + barW / 2 - 0.5}
                      y={by - 2}
                      fill={axisColor}
                      textAnchor="middle"
                      fontSize={6}
                    >
                      {fmtNum(val)}
                    </text>
                  )}
                </g>
              );
            })}
            <text
              x={groupLeft + (nSeries * barW) / 2}
              y={chartY + chartH + 10}
              fill={textColor}
              textAnchor="middle"
              fontSize={7}
            >
              {truncate(label, 10)}
            </text>
          </g>
        );
      })}
    </>
  );
};

const renderHorizontalBarChart = (
  series: GraphSeries[],
  layout: ChartLayout,
  palette: string[],
  showValues: boolean,
  theme: PdfcnTheme
) => {
  const { chartX, chartY, chartW, chartH, xLabels } = layout;
  const nCategories = xLabels.length;
  const allValues = series.flatMap((s) => s.data.map((d) => d.value));
  const maxVal = Math.max(...allValues, 1);
  const rowH = chartH / nCategories;
  const barH = rowH * 0.5;
  const textColor = theme.colors.mutedForeground;
  const axisColor = theme.colors.foreground;
  const labelW = 60;

  return (
    <>
      {xLabels.map((label, ci) => {
        const rowY = chartY + ci * rowH;
        const val = series[0]?.data[ci]?.value ?? 0;
        const color =
          series[0]?.data[ci]?.color ??
          series[0]?.color ??
          palette[ci % palette.length];
        const barW = (val / maxVal) * (chartW - labelW);
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
          <g key={`hbar-${ci}`}>
            <text
              x={chartX + labelW - 4}
              y={rowY + rowH / 2 + 3}
              fill={textColor}
              textAnchor="end"
              fontSize={7}
            >
              {truncate(label, 14)}
            </text>
            <rect
              x={chartX + labelW}
              y={rowY + (rowH - barH) / 2}
              width={Math.max(barW, 1)}
              height={barH}
              fill={color}
            />
            {showValues && (
              <text
                x={chartX + labelW + barW + 3}
                y={rowY + rowH / 2 + 3}
                fill={axisColor}
                textAnchor="start"
                fontSize={6}
              >
                {fmtNum(val)}
              </text>
            )}
          </g>
        );
      })}
      <line
        x1={chartX + labelW}
        y1={chartY}
        x2={chartX + labelW}
        y2={chartY + chartH}
        stroke={axisColor}
        strokeWidth={1}
      />
    </>
  );
};

const renderLineAreaChart = (
  series: GraphSeries[],
  layout: ChartLayout,
  palette: string[],
  showGrid: boolean,
  showValues: boolean,
  showDots: boolean,
  smooth: boolean,
  isArea: boolean,
  theme: PdfcnTheme
) => {
  const { chartX, chartY, chartW, chartH, yMin, yMax, yTicks, xLabels } =
    layout;
  const range = yMax - yMin || 1;
  const textColor = theme.colors.mutedForeground;
  const gridColor = theme.colors.border;
  const axisColor = theme.colors.foreground;
  const nPoints = xLabels.length;

  const xFor = (i: number) => chartX + (i / Math.max(nPoints - 1, 1)) * chartW;
  const yFor = (v: number) => chartY + chartH - ((v - yMin) / range) * chartH;

  return (
    <>
      {renderGridAndYAxis(
        yTicks,
        yFor,
        chartX,
        chartW,
        showGrid,
        gridColor,
        textColor
      )}

      <line
        x1={chartX}
        y1={chartY + chartH}
        x2={chartX + chartW}
        y2={chartY + chartH}
        stroke={axisColor}
        strokeWidth={1}
      />

      {series.map((s, si) => {
        const color = s.color ?? palette[si % palette.length];
        const points = s.data.map((d, i) => ({ x: xFor(i), y: yFor(d.value) }));

        const lineDStr = smooth
          ? smoothPath(points)
          : `M ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}`;

        const lastPoint = points.at(-1);
        const firstPoint = points.at(0);
        const areaPath =
          isArea && points.length > 1 && lastPoint && firstPoint
            ? `${lineDStr} L ${lastPoint.x} ${chartY + chartH} L ${firstPoint.x} ${chartY + chartH} Z`
            : null;

        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
          <g key={`series-${si}`}>
            {isArea && areaPath && (
              <path d={areaPath} fill={color} fillOpacity={0.2} stroke="none" />
            )}
            <path d={lineDStr} stroke={color} strokeWidth={2} fill="none" />
            {showDots &&
              points.map((p, pi) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
                <circle
                  key={`dot-${pi}`}
                  cx={p.x}
                  cy={p.y}
                  r={3}
                  fill={color}
                />
              ))}
            {showValues &&
              points.map((p, pi) => (
                <text
                  // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
                  key={`val-${pi}`}
                  x={p.x}
                  y={p.y - 5}
                  fill={color}
                  textAnchor="middle"
                  fontSize={6}
                >
                  {fmtNum(s.data[pi].value)}
                </text>
              ))}
          </g>
        );
      })}

      {xLabels.map((label, i) => (
        <text
          key={`xlabel-${label}`}
          x={xFor(i)}
          y={chartY + chartH + 10}
          fill={textColor}
          textAnchor="middle"
          fontSize={7}
        >
          {truncate(label, 8)}
        </text>
      ))}
    </>
  );
};

const renderPieDonutChart = (
  series: GraphSeries[],
  layout: ChartLayout,
  palette: string[],
  centerLabel: string | undefined,
  isDonut: boolean,
  theme: PdfcnTheme
) => {
  const { svgW, svgH } = layout;
  const cx = svgW / 2;
  const cy = svgH / 2;
  const r = Math.min(svgW, svgH) / 2 - 20;
  const innerR = isDonut ? r * 0.52 : 0;
  const textColor = theme.colors.mutedForeground;

  const data = series[0]?.data ?? [];
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  let currentAngle = 0;

  return (
    <>
      {data.map((d, i) => {
        const color = d.color ?? palette[i % palette.length];
        const sweep = (d.value / total) * 360;
        const midAngle = currentAngle + sweep / 2;
        const path = arcPath(
          cx,
          cy,
          r,
          currentAngle,
          currentAngle + sweep,
          innerR
        );
        currentAngle += sweep;

        const labelR = r * 1.18;
        const lp = polarToCartesian(cx, cy, labelR, midAngle);
        const anchor = lp.x > cx ? "start" : "end";

        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
          <g key={`slice-${i}`}>
            <path d={path} fill={color} stroke="white" strokeWidth={1} />
            {/* Show label only if slice is large enough to label */}
            {sweep > 15 && (
              <text
                x={lp.x}
                y={lp.y + 3}
                fill={textColor}
                textAnchor={anchor}
                fontSize={7}
              >
                {truncate(d.label, 10)}
              </text>
            )}
          </g>
        );
      })}

      {isDonut && centerLabel && (
        <>
          <circle cx={cx} cy={cy} r={innerR} fill="white" />
          <text
            x={cx}
            y={cy + 4}
            fill={theme.colors.foreground}
            textAnchor="middle"
            fontSize={9}
            fontWeight="bold"
          >
            {centerLabel}
          </text>
        </>
      )}
    </>
  );
};

const Legend = ({
  series,
  palette,
  styles,
  position = "bottom",
}: {
  series: GraphSeries[];
  palette: string[];
  styles: ReturnType<typeof createGraphStyles>;
  position?: "bottom" | "right";
}) => {
  const containerStyle =
    position === "right" ? styles.legendColumn : styles.legendRow;

  return (
    <div style={containerStyle}>
      {series.map((s, i) => (
        <div key={s.name} style={styles.legendItem}>
          <svg width={10} height={10}>
            <rect
              x={0}
              y={2}
              width={8}
              height={8}
              fill={s.color ?? palette[i % palette.length]}
            />
          </svg>
          <span style={styles.legendText}>{s.name}</span>
        </div>
      ))}
    </div>
  );
};

const renderChartContent = (
  variant: string,
  series: GraphSeries[],
  layout: ChartLayout,
  palette: string[],
  showGrid: boolean,
  showValues: boolean,
  showDots: boolean,
  smooth: boolean,
  centerLabel: string | undefined,
  theme: PdfcnTheme
): React.ReactNode => {
  switch (variant) {
    case "bar": {
      return renderBarChart(
        series,
        layout,
        palette,
        showGrid,
        showValues,
        theme
      );
    }
    case "horizontal-bar": {
      return renderHorizontalBarChart(
        series,
        layout,
        palette,
        showValues,
        theme
      );
    }
    case "line":
    case "area": {
      return renderLineAreaChart(
        series,
        layout,
        palette,
        showGrid,
        showValues,
        showDots,
        smooth,
        variant === "area",
        theme
      );
    }
    case "pie": {
      return renderPieDonutChart(
        series,
        layout,
        palette,
        undefined,
        false,
        theme
      );
    }
    case "donut": {
      return renderPieDonutChart(
        series,
        layout,
        palette,
        centerLabel,
        true,
        theme
      );
    }
    default: {
      return null;
    }
  }
};

const renderAxisLabels = (
  isPieOrDonut: boolean,
  xLabel: string | undefined,
  yLabel: string | undefined,
  chartX: number,
  chartW: number,
  height: number,
  mutedForeground: string
) => (
  <>
    {!isPieOrDonut && xLabel && (
      <text
        x={chartX + chartW / 2}
        y={height - 2}
        fill={mutedForeground}
        textAnchor="middle"
        fontSize={8}
      >
        {xLabel}
      </text>
    )}
    {!isPieOrDonut && yLabel && (
      <text x={2} y={10} fill={mutedForeground} textAnchor="start" fontSize={8}>
        {yLabel}
      </text>
    )}
  </>
);

const renderTextFallback = (
  variant: GraphProps["variant"],
  series: GraphSeries[],
  layout: ChartLayout,
  showValues: boolean,
  textColor: string
) => {
  if (variant === "pie" || variant === "donut") {
    const data = series[0]?.data ?? [];
    const total = data.reduce((sum, point) => sum + point.value, 0) || 1;
    const cx = layout.svgW / 2;
    const cy = layout.svgH / 2;
    const radius = Math.min(layout.svgW, layout.svgH) / 2 - 20;
    const labelRadius = radius * 1.18;
    let currentAngle = 0;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: layout.svgH,
          left: 0,
          position: "absolute",
          top: 0,
          width: layout.svgW,
        }}
      >
        {data.map((point, index) => {
          const sweep = (point.value / total) * 360;
          const midAngle = currentAngle + sweep / 2;
          currentAngle += sweep;
          if (sweep <= 15) {
            return null;
          }
          const labelPoint = polarToCartesian(cx, cy, labelRadius, midAngle);
          const onRight = labelPoint.x > cx;
          return (
            <span
              key={`fallback-pie-${point.label}-${index}`}
              style={{
                color: textColor,
                fontSize: 7,
                left: onRight ? labelPoint.x : labelPoint.x - 60,
                lineHeight: 1,
                position: "absolute",
                textAlign: onRight ? "left" : "right",
                top: labelPoint.y - 4,
                width: 60,
              }}
            >
              {truncate(point.label, 10)}
            </span>
          );
        })}
      </div>
    );
  }

  const {
    chartH,
    chartW,
    chartX,
    chartY,
    svgH,
    svgW,
    xLabels,
    yMax,
    yMin,
    yTicks,
  } = layout;
  const range = yMax - yMin || 1;
  const toY = (value: number) =>
    chartY + chartH - ((value - yMin) / range) * chartH;
  const labelStyle = {
    color: textColor,
    fontSize: 7,
    lineHeight: 1,
    position: "absolute" as const,
  };

  if (variant === "horizontal-bar") {
    const labelWidth = 60;
    const rowHeight = chartH / Math.max(xLabels.length, 1);
    const maxValue = Math.max(
      ...series.flatMap((item) => item.data.map((point) => point.value)),
      1
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: svgH,
          left: 0,
          position: "absolute",
          top: 0,
          width: svgW,
        }}
      >
        {xLabels.map((label, index) => {
          const value = series[0]?.data[index]?.value ?? 0;
          const barWidth = (value / maxValue) * (chartW - labelWidth);
          return (
            <div key={`fallback-horizontal-${label}`}>
              <span
                style={{
                  ...labelStyle,
                  left: chartX,
                  textAlign: "right",
                  top: chartY + index * rowHeight + rowHeight / 2 - 4,
                  width: labelWidth - 4,
                }}
              >
                {truncate(label, 14)}
              </span>
              {showValues ? (
                <span
                  style={{
                    ...labelStyle,
                    color: textColor,
                    fontSize: 6,
                    left: chartX + labelWidth + barWidth + 3,
                    top: chartY + index * rowHeight + rowHeight / 2 - 4,
                    width: 28,
                  }}
                >
                  {fmtNum(value)}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  const pointX = (index: number) =>
    chartX + (index / Math.max(xLabels.length - 1, 1)) * chartW;
  const groupWidth = chartW / Math.max(xLabels.length, 1);
  const barGap = 2;
  const barWidth = Math.max(
    (groupWidth - barGap * (series.length + 1)) / Math.max(series.length, 1),
    1
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: svgH,
        left: 0,
        position: "absolute",
        top: 0,
        width: svgW,
      }}
    >
      {yTicks.map((tick) => (
        <span
          key={`fallback-y-${tick}`}
          style={{
            ...labelStyle,
            left: 0,
            textAlign: "right",
            top: toY(tick) - 4,
            width: chartX - 4,
          }}
        >
          {fmtNum(tick)}
        </span>
      ))}
      {(variant === "line" || variant === "area") &&
        xLabels.map((label, index) => (
          <span
            key={`fallback-x-${label}`}
            style={{
              ...labelStyle,
              left: pointX(index) - 12,
              textAlign: "center",
              top: chartY + chartH + 3,
              width: 24,
            }}
          >
            {truncate(label, 8)}
          </span>
        ))}
      {variant === "bar" &&
        showValues &&
        xLabels.flatMap((label, categoryIndex) =>
          series.map((item, seriesIndex) => {
            const value = item.data[categoryIndex]?.value ?? 0;
            const left =
              chartX +
              categoryIndex * groupWidth +
              barGap +
              seriesIndex * (barWidth + barGap);
            return (
              <span
                key={`fallback-bar-${label}-${item.name}-${seriesIndex}`}
                style={{
                  ...labelStyle,
                  fontSize: 6,
                  left,
                  textAlign: "center",
                  top: toY(value) - 8,
                  width: barWidth,
                }}
              >
                {fmtNum(value)}
              </span>
            );
          })
        )}
    </div>
  );
};

const renderGraphContent = (
  title: string | undefined,
  subtitle: string | undefined,
  chartContent: React.ReactNode,
  chartLabels: React.ReactNode,
  axisLabels: React.ReactNode,
  textFallback: React.ReactNode,
  width: number,
  height: number,
  legend: string,
  showLegend: boolean,
  isPieOrDonut: boolean,
  series: GraphSeries[],
  palette: string[],
  styles: ReturnType<typeof createGraphStyles>
) => (
  <>
    {title && <span style={styles.title}>{title}</span>}
    {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
    <div style={legend === "right" ? styles.chartWithRightLegend : undefined}>
      <div style={{ height, position: "relative", width }}>
        <svg width={width} height={height}>
          {chartContent}
          {axisLabels}
        </svg>
        {textFallback}
      </div>
      {showLegend &&
        legend === "right" &&
        Legend({ palette, position: "right", series, styles })}
    </div>
    {chartLabels}
    {showLegend &&
      legend === "bottom" &&
      Legend({ palette, position: "bottom", series, styles })}
  </>
);

const renderBarLabels = (
  variant: GraphProps["variant"],
  series: GraphSeries[],
  chartX: number,
  chartW: number
) => {
  if (variant !== "bar") {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: chartX,
        width: chartW,
      }}
    >
      {(series[0]?.data ?? []).map((point) => (
        <div key={point.label} style={{ alignItems: "center", flex: 1 }}>
          <span style={{ fontSize: 7 }}>{truncate(point.label, 10)}</span>
        </div>
      ))}
    </div>
  );
};

/**
 * PdfGraph — renders bar, horizontal-bar, line, area, pie, and donut charts
 * natively inside react-pdf documents using SVG primitives.
 *
 * No external chart libraries are required or used — all rendering is done via
 * react-pdf's built-in SVG support (`<svg>`, `<rect>`, `<path>`, `<line>`, etc.).
 *
 * @example Bar chart
 * ```tsx
 * <PdfGraph
 *   variant="bar"
 *   title="Monthly Revenue"
 *   data={[
 *     { label: 'Jan', value: 42000 },
 *     { label: 'Feb', value: 38000 },
 *     { label: 'Mar', value: 55000 },
 *   ]}
 * />
 * ```
 *
 * @example Donut chart with center label
 * ```tsx
 * <PdfGraph
 *   variant="donut"
 *   data={[
 *     { label: 'Product A', value: 45 },
 *     { label: 'Product B', value: 30 },
 *     { label: 'Other', value: 25 },
 *   ]}
 *   centerLabel="$1.2M"
 * />
 * ```
 *
 * **Limitations (by design):**
 * - No interactivity (PDFs are static)
 * - No animations
 * - SVG Text inside charts uses SVG font attributes (not react-pdf StyleSheet fonts)
 * - For print PDFs use SVG-friendly fonts registered with Font.register()
 */
export const PdfGraph = ({
  variant = "bar",
  data,
  title,
  subtitle,
  xLabel,
  yLabel,
  width: explicitWidth,
  height = 260,
  fullWidth = false,
  containerPadding = 0,
  wrapperPadding = 0,
  colors,
  showValues = false,
  showGrid = true,
  legend = "bottom",
  centerLabel,
  showDots = true,
  smooth = false,
  yTicks: yTickCount = 5,
  noWrap = true,
  style,
}: GraphProps) => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createGraphStyles(theme), [theme]);
  const palette = colors ?? getDefaultPalette(theme);
  const series = normalizeData(data);

  const width = useSafeMemo(() => {
    if (fullWidth) {
      return getGraphWidth(theme, { containerPadding, wrapperPadding });
    }
    return explicitWidth ?? GRAPH_SAFE_WIDTHS.default;
  }, [fullWidth, explicitWidth, theme, containerPadding, wrapperPadding]);

  const isPieOrDonut = variant === "pie" || variant === "donut";
  const layout = buildLayout(series, width, height, isPieOrDonut, yTickCount);
  const { chartX, chartW } = layout;

  const chartContent = renderChartContent(
    variant,
    series,
    layout,
    palette,
    showGrid,
    showValues,
    showDots,
    smooth,
    centerLabel,
    theme
  );

  const showLegend = legend !== "none" && !isPieOrDonut;
  const chartLabels = renderBarLabels(variant, series, chartX, chartW);

  const containerStyles: CSSProperties[] = [styles.container];
  if (style) {
    containerStyles.push(style);
  }

  const content = (
    <div style={Object.assign({}, ...containerStyles)}>
      {renderGraphContent(
        title,
        subtitle,
        chartContent,
        chartLabels,
        renderAxisLabels(
          isPieOrDonut,
          xLabel,
          yLabel,
          chartX,
          chartW,
          height,
          theme.colors.mutedForeground
        ),
        renderTextFallback(
          variant,
          series,
          layout,
          showValues,
          theme.colors.mutedForeground
        ),
        width,
        height,
        legend,
        showLegend,
        isPieOrDonut,
        series,
        palette,
        styles
      )}
    </div>
  );

  return noWrap ? (
    <div
      style={{
        breakInside: "avoid",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {content}
    </div>
  ) : (
    content
  );
};
