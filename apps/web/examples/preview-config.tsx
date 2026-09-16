import type { RenderOptions } from "takumi-pdf";

const pointToCssPixel = (value: number) => value * (96 / 72);

const DEFAULT_MARGIN = 40;

const BLOCK_NAMES = new Set([
  "invoice-classic",
  "invoice-consultant",
  "invoice-corporate",
  "invoice-creative",
  "invoice-minimal",
  "invoice-modern",
  "report-financial",
  "report-marketing",
  "report-operations",
  "report-security",
]);

const COMPONENT_MARGINS: Record<string, number> = {
  divider: 30,
  heading: 30,
  link: 30,
  "page-break": 30,
  "page-footer": 30,
  "page-header": 30,
  section: 30,
  stack: 30,
  text: 30,
};

const COMPONENT_SIZES: Record<
  string,
  Extract<RenderOptions, { viewport?: never }>["size"]
> = {
  badge: { height: pointToCssPixel(200), width: pointToCssPixel(595) },
  "page-footer": {
    height: pointToCssPixel(300),
    width: pointToCssPixel(595),
  },
  "page-header": {
    height: pointToCssPixel(240),
    width: pointToCssPixel(595),
  },
};

export const getTakumiPreviewOptions = (name: string): RenderOptions => {
  const margin = BLOCK_NAMES.has(name)
    ? 0
    : pointToCssPixel(COMPONENT_MARGINS[name] ?? DEFAULT_MARGIN);

  return {
    margin,
    size: COMPONENT_SIZES[name] ?? "a4",
  };
};
