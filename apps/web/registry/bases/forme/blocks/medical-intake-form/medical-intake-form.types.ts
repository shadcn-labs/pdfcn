import type { PdfcnTheme } from "@/registry/types/pdf-themes";

/**
 * Medical intake form properties.
 * Props - `clinicName` | `clinicLogo` | `clinicAddress` | `clinicPhone` |
 * `personalInfo` | `emergencyContact` | `insurance` | `medicalHistory` |
 * `medications` | `allergies` | `reasonForVisit` | `consent` | `accentColor` | `theme`
 * @see {@link MedicalIntakeFormDocument}
 */
export interface MedicalIntakeFormProps {
  clinicName: string;
  clinicLogo?: string;
  clinicAddress?: string;
  clinicPhone?: string;
  /**
   * @default true
   */
  personalInfo?: boolean;
  /**
   * @default true
   */
  emergencyContact?: boolean;
  /**
   * @default true
   */
  insurance?: boolean;
  /**
   * @default true
   */
  medicalHistory?: boolean;
  /**
   * @default true
   */
  medications?: boolean;
  /**
   * @default true
   */
  allergies?: boolean;
  /**
   * @default true
   */
  reasonForVisit?: boolean;
  /**
   * @default true
   */
  consent?: boolean;
  /**
   * Theme color token (e.g. `"primary"`) or raw CSS color (e.g. `"#0d9488"`)
   * applied to section rules, table accents, and the consent callout.
   */
  accentColor?: string;
  theme?: PdfcnTheme;
}
