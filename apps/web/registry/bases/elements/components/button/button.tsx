import { Button as UnlayerButton } from "@unlayer/react-elements";
import type { ReactNode } from "react";

import { usePdfcnTheme } from "@/registry/bases/elements/components/theme-provider";
import { resolveColor } from "@/registry/bases/elements/lib/resolve-color";
import type {
  UnlayerRenderProps,
  UnlayerRenderStatics,
} from "@/registry/bases/elements/lib/transparent";

/**
 * CTA button. Maps to Unlayer `<Button>`.
 */
export interface PDFButtonProps {
  children: ReactNode;
  href?: string;
  backgroundColor?: string;
  color?: string;
}

const mapButtonProps = (props: PDFButtonProps) => {
  const theme = usePdfcnTheme();
  return {
    backgroundColor: props.backgroundColor
      ? resolveColor(props.backgroundColor, theme.colors)
      : theme.colors.primary,
    color: props.color ? resolveColor(props.color, theme.colors) : "#ffffff",
    href: props.href,
  };
};

export const PDFButton = ({
  children,
  href,
  backgroundColor,
  color,
}: PDFButtonProps) => (
  <UnlayerButton
    {...mapButtonProps({ backgroundColor, children, color, href })}
  >
    {children}
  </UnlayerButton>
);

// Transparent wrapper: delegate through Unlayer's item renderer.
const unlayerButton = UnlayerButton as unknown as UnlayerRenderStatics;
(PDFButton as unknown as Record<string, unknown>).__unlayerRender = (
  props: UnlayerRenderProps & PDFButtonProps
) => unlayerButton.__unlayerRender({ ...props, ...mapButtonProps(props) });
(PDFButton as unknown as Record<string, unknown>).__unlayerItemConfig =
  unlayerButton.__unlayerItemConfig;
PDFButton.displayName = "Button";
