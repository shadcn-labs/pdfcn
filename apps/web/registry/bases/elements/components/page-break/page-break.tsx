import { PageBreak as UnlayerPageBreak } from "@unlayer/react-elements";

import type {
  UnlayerRenderProps,
  UnlayerRenderStatics,
} from "@/registry/bases/elements/lib/transparent";

/**
 * Force subsequent content onto a new PDF page. Inert in email/web output.
 * Maps to Unlayer `<PageBreak>`.
 */
export const PDFPageBreak = () => <UnlayerPageBreak />;

// Transparent wrapper: no pdfcn props to map, delegate directly.
const unlayerPageBreak = UnlayerPageBreak as unknown as UnlayerRenderStatics;
(PDFPageBreak as unknown as Record<string, unknown>).__unlayerRender = (
  props: UnlayerRenderProps
) => unlayerPageBreak.__unlayerRender(props);
(PDFPageBreak as unknown as Record<string, unknown>).__unlayerItemConfig =
  unlayerPageBreak.__unlayerItemConfig;
PDFPageBreak.displayName = "PageBreak";
