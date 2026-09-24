import { Paragraph as UnlayerParagraph } from "@unlayer/react-elements";
import type { ReactNode } from "react";

import { usePdfcnTheme } from "@/registry/bases/elements/components/theme-provider";
import { resolveColor } from "@/registry/bases/elements/lib/resolve-color";
import type {
  UnlayerRenderProps,
  UnlayerRenderStatics,
} from "@/registry/bases/elements/lib/transparent";

/**
 * Rich text. Use `html` for inline formatting (`<b>`, `<a>`, …) or children
 * for plain text. Maps to Unlayer `<Paragraph>`.
 */
export interface PDFParagraphProps {
  children?: ReactNode;
  html?: string;
  fontSize?: string;
  color?: string;
  textAlign?: "left" | "center" | "right";
  lineHeight?: string;
}

const mapParagraphProps = (props: PDFParagraphProps) => {
  const theme = usePdfcnTheme();
  return {
    ...(props.html === undefined ? {} : { html: props.html }),
    color: props.color ? resolveColor(props.color, theme.colors) : undefined,
    fontSize: props.fontSize,
    lineHeight: props.lineHeight,
    textAlign: props.textAlign,
  };
};

export const PDFParagraph = ({
  children,
  html,
  fontSize,
  color,
  textAlign,
  lineHeight,
}: PDFParagraphProps) => {
  const theme = usePdfcnTheme();
  const resolvedColor = color ? resolveColor(color, theme.colors) : undefined;
  if (html !== undefined) {
    return (
      <UnlayerParagraph
        color={resolvedColor}
        fontSize={fontSize}
        html={html}
        lineHeight={lineHeight}
        textAlign={textAlign}
      />
    );
  }
  return (
    <UnlayerParagraph
      color={resolvedColor}
      fontSize={fontSize}
      lineHeight={lineHeight}
      textAlign={textAlign}
    >
      {children}
    </UnlayerParagraph>
  );
};

// Transparent wrapper: delegate through Unlayer's item renderer.
const unlayerParagraph = UnlayerParagraph as unknown as UnlayerRenderStatics;
(PDFParagraph as unknown as Record<string, unknown>).__unlayerRender = (
  props: UnlayerRenderProps & PDFParagraphProps
) =>
  unlayerParagraph.__unlayerRender({ ...props, ...mapParagraphProps(props) });
(PDFParagraph as unknown as Record<string, unknown>).__unlayerItemConfig =
  unlayerParagraph.__unlayerItemConfig;
PDFParagraph.displayName = "Paragraph";
