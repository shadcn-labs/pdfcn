export interface QuarterlyReportStat {
  label: string;
  value: string;
  note?: string;
}

export interface QuarterlyReportDataPoint {
  label: string;
  value: number;
}

export interface QuarterlyReportTrend {
  title: string;
  seriesName: string;
  data: QuarterlyReportDataPoint[];
}

export interface QuarterlyReportBreakdown {
  title: string;
  data: QuarterlyReportDataPoint[];
}

export interface QuarterlyReportPriority {
  label: string;
  value: number;
}

export interface QuarterlyReportProps {
  company: string;
  quarter: string;
  subtitle?: string;
  stats?: QuarterlyReportStat[];
  trend?: QuarterlyReportTrend;
  highlights?: string[];
  watchList?: string[];
  breakdown?: QuarterlyReportBreakdown;
  priorities?: QuarterlyReportPriority[];
  accentColor?: string;
  renderingBase?: "takumi";
}
