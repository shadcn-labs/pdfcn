import { Heading as UnlayerHeading } from "@unlayer/react-elements";
import type { ReactNode } from "react";

import { usePdfcnTheme } from "@/registry/bases/elements/components/theme-provider";
import { resolveColor } from "@/registry/bases/elements/lib/resolve-color";
import type {
  UnlayerRenderStatics,
  UnlayerRenderProps,
} from "@/registry/bases/elements/lib/transparent";

export type PDFHeadingLevel = "h1" | "h2" | "h3" | "h4";

/**
 * Heading (h1-h4). Maps to Unlayer `<Heading>`.
 */
export interface PDFHeadingProps {
  children: ReactNode;
  level?: PDFHeadingLevel;
  fontSize?: string;
  fontWeight?: number;
  color?: string;
  textAlign?: "left" | "center" | "right";
}

const mapHeadingProps = (props: PDFHeadingProps) => {
  const theme = usePdfcnTheme();
  return {
    color: props.color
      ? resolveColor(props.color, theme.colors)
      : theme.colors.foreground,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    headingType: props.level ?? "h1",
    textAlign: props.textAlign,
  };
};

export const PDFHeading = ({
  children,
  level: _level,
  fontSize,
  fontWeight,
  color,
  textAlign,
}: PDFHeadingProps) => {
  const theme = usePdfcnTheme();
  return (
    <UnlayerHeading
      color={
        color ? resolveColor(color, theme.colors) : theme.colors.foreground
      }
      fontSize={fontSize}
      fontWeight={fontWeight}
      headingType={_level}
      textAlign={textAlign}
    >
      {children}
    </UnlayerHeading>
  );
};

// Transparent wrapper: Unlayer items render via a `__unlayerRender` static,
// so delegate with pdfcn props mapped (theme tokens resolved).
const unlayerHeading = UnlayerHeading as unknown as UnlayerRenderStatics;
(PDFHeading as unknown as Record<string, unknown>).__unlayerRender = (
  props: UnlayerRenderProps & PDFHeadingProps
) => unlayerHeading.__unlayerRender({ ...props, ...mapHeadingProps(props) });
(PDFHeading as unknown as Record<string, unknown>).__unlayerItemConfig =
  unlayerHeading.__unlayerItemConfig;
PDFHeading.displayName = "Heading";
