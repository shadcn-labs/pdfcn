import type { CSSProperties } from "react";

/**
 * Options for calculating graph width based on theme page margins and container context.
 * Props - `containerPadding` | `wrapperPadding` | `pageWidth`
 * @see {@link GraphWidthOptions}
 */
export interface GraphWidthOptions {
  containerPadding?: number;
  wrapperPadding?: number;
  pageWidth?: number;
}

export type GraphVariant =
  | "bar"
  | "horizontal-bar"
  | "line"
  | "area"
  | "pie"
  | "donut";

export type GraphLegendPosition = "bottom" | "right" | "none";

/**
 * A single data point with a label, numeric value, and optional color override.
 * Props - `label` | `value` | `color`
 * @see {@link GraphDataPoint}
 */
export interface GraphDataPoint {
  label: string;
  value: number;
  color?: string;
}

/**
 * A named data series containing multiple data points, used for multi-series charts.
 * Props - `name` | `data` | `color`
 * @see {@link GraphSeries}
 */
export interface GraphSeries {
  name: string;
  data: GraphDataPoint[];
  color?: string;
}

/**
 * Multi-variant PDF chart (bar, line, area, pie, donut) rendered with SVG primitives.
 * Props - `variant` | `data` | `title` | `subtitle` | `xLabel` | `yLabel` | `width` | `height` | `fullWidth` | `containerPadding` | `wrapperPadding` | `colors` | `showValues` | `showGrid` | `legend` | `centerLabel` | `showDots` | `smooth` | `yTicks` | `noWrap` | `style`
 * @see {@link GraphProps}
 */
export interface GraphProps {
  /**
   * @default 'bar'
   */
  variant?: GraphVariant;
  data: GraphDataPoint[] | GraphSeries[];
  title?: string;
  subtitle?: string;
  xLabel?: string;
  yLabel?: string;
  /**
   * @default 420
   */
  width?: number;
  /**
   * @default 260
   */
  height?: number;
  /**
   * @default false
   */
  fullWidth?: boolean;
  containerPadding?: number;
  wrapperPadding?: number;
  colors?: string[];
  /**
   * @default false
   */
  showValues?: boolean;
  /**
   * @default true
   */
  showGrid?: boolean;
  /**
   * @default 'bottom'
   */
  legend?: GraphLegendPosition;
  centerLabel?: string;
  /**
   * @default true
   */
  showDots?: boolean;
  /**
   * @default false
   */
  smooth?: boolean;
  /**
   * @default 5
   */
  yTicks?: number;
  /**
   * @default true
   */
  noWrap?: boolean;
  style?: CSSProperties;
}

/** Internal chart layout dimensions computed from props and data. */
export interface ChartLayout {
  svgW: number;
  svgH: number;
  chartX: number;
  chartY: number;
  chartW: number;
  chartH: number;
  yMin: number;
  yMax: number;
  yTicks: number[];
  xLabels: string[];
}
