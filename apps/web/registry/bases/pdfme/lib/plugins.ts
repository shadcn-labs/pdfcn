import type { Plugin } from "@pdfme/common";
import {
  barcodes,
  checkbox,
  date,
  dateTime,
  ellipse,
  image,
  line,
  list,
  multiVariableText,
  radioGroup,
  rectangle,
  select,
  signature,
  svg,
  table,
  text,
  time,
} from "@pdfme/schemas";

/**
 * Default pdfme plugin map for pdfcn's pdfme base.
 * Covers text, tables, images, SVG/shapes, lists, barcodes and form fields.
 *
 * Pass the result to `generate({ template, inputs, plugins })`.
 */
export const getPdfmePlugins = (): Record<string, Plugin> => ({
  ...barcodes,
  checkbox,
  date,
  dateTime,
  ellipse,
  image,
  line,
  list,
  multiVariableText,
  radioGroup,
  rectangle,
  select,
  signature,
  svg,
  table,
  text,
  time,
});

export const pdfmePlugins = getPdfmePlugins();
