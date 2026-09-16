import type { CSSProperties } from "react";

/** Visual style variant for the fillable form. */
export type PdfFormVariant = "underline" | "box" | "outlined" | "ghost";

/** Column layout for a form section. */
export type FormLayout = "single" | "two-column" | "three-column";

/** Label position relative to the field. */
export type FormLabelPosition = "above" | "left";

/**
 * A single fillable field definition.
 * Props - `label` | `hint` | `height` | `width`
 * @see {@link PdfFormField}
 */
export interface PdfFormField {
  label: string;
  hint?: string;
  /**
   * Height of the blank field area in points.
   * @default 18
   */
  height?: number;
  width?: number | string;
}

/**
 * A logical group of fields with an optional section title.
 * Props - `title` | `fields` | `layout`
 * @see {@link PdfFormGroup}
 */
export interface PdfFormGroup {
  title?: string;
  fields: PdfFormField[];
  /**
   * @default 'single'
   */
  layout?: FormLayout;
}

/**
 * Fillable PDF form with grouped fields, layout variants, and label positioning options.
 * Props - `title` | `subtitle` | `groups` | `variant` | `labelPosition` | `noWrap` | `style`
 * @see {@link PdfFormProps}
 */
export interface PdfFormProps {
  title?: string;
  subtitle?: string;
  groups: PdfFormGroup[];
  /**
   * @default 'underline'
   */
  variant?: PdfFormVariant;
  /**
   * @default 'above'
   */
  labelPosition?: FormLabelPosition;
  noWrap?: boolean;
  style?: CSSProperties;
}
