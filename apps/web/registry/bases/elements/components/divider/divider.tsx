import { Divider as UnlayerDivider } from "@unlayer/react-elements";

import { usePdfcnTheme } from "@/registry/bases/elements/components/theme-provider";
import { resolveColor } from "@/registry/bases/elements/lib/resolve-color";
import type {
  UnlayerRenderProps,
  UnlayerRenderStatics,
} from "@/registry/bases/elements/lib/transparent";

/**
 * Horizontal separator. Maps to Unlayer `<Divider>`.
 */
export interface PDFDividerProps {
  color?: string;
  thickness?: string;
}

const mapDividerProps = (props: PDFDividerProps) => {
  const theme = usePdfcnTheme();
  return {
    borderTopColor: resolveColor(props.color ?? "border", theme.colors),
    borderTopStyle: "solid",
    borderTopWidth: props.thickness ?? "1px",
  };
};

export const PDFDivider = ({ color, thickness = "1px" }: PDFDividerProps) => (
  <UnlayerDivider {...mapDividerProps({ color, thickness })} />
);

// Transparent wrapper: delegate through Unlayer's item renderer.
const unlayerDivider = UnlayerDivider as unknown as UnlayerRenderStatics;
(PDFDivider as unknown as Record<string, unknown>).__unlayerRender = (
  props: UnlayerRenderProps & PDFDividerProps
) => unlayerDivider.__unlayerRender({ ...props, ...mapDividerProps(props) });
(PDFDivider as unknown as Record<string, unknown>).__unlayerItemConfig =
  unlayerDivider.__unlayerItemConfig;
PDFDivider.displayName = "Divider";
