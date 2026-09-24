import { Image as UnlayerImage } from "@unlayer/react-elements";

import type {
  UnlayerRenderProps,
  UnlayerRenderStatics,
} from "@/registry/bases/elements/lib/transparent";

/**
 * Responsive image. Maps to Unlayer `<Image>`.
 */
export interface PDFImageProps {
  src: string;
  altText?: string;
  width?: string;
  textAlign?: "left" | "center" | "right";
}

const mapImageProps = (props: PDFImageProps) => ({
  altText: props.altText,
  src: props.width ? { maxWidth: props.width, url: props.src } : props.src,
  textAlign: props.textAlign,
});

export const PDFImage = ({ src, altText, width, textAlign }: PDFImageProps) => (
  <UnlayerImage {...mapImageProps({ altText, src, textAlign, width })} />
);

// Transparent wrapper: delegate through Unlayer's item renderer.
const unlayerImage = UnlayerImage as unknown as UnlayerRenderStatics;
(PDFImage as unknown as Record<string, unknown>).__unlayerRender = (
  props: UnlayerRenderProps & PDFImageProps
) =>
  unlayerImage.__unlayerRender({
    ...props,
    ...mapImageProps(props),
  });
(PDFImage as unknown as Record<string, unknown>).__unlayerItemConfig =
  unlayerImage.__unlayerItemConfig;
PDFImage.displayName = "Image";
