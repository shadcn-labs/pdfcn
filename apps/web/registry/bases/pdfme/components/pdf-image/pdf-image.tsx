import { Image as PDFImage } from "@/registry/bases/pdfme/lib/pdf-primitives";
import type { Style } from "@/registry/bases/pdfme/lib/pdf-primitives";

export interface PdfImageProps {
  src: string | { uri: string };
  style?: Style | Style[];
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Image component. Maps to pdfme's `image` schema.
 */
export const PdfImage = ({ src, style, width, height }: PdfImageProps) => {
  const sizeStyle = {} as Style;
  if (width !== undefined) {
    sizeStyle.width = width;
  }
  if (height !== undefined) {
    sizeStyle.height = height;
  }
  const styleArray: Style[] = [sizeStyle];
  if (style) {
    styleArray.push(...[style].flat());
  }
  return <PDFImage src={src} style={styleArray} />;
};
