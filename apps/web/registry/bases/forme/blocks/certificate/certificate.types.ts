/** A person signing the certificate (name + role under a signature line). */
export interface CertificateSigner {
  name: string;
  role: string;
}

/**
 * Landscape award/completion certificate with centered title, accent divider,
 * muted award paragraph, and signature lines. Formal award — not a voucher.
 * Props - `recipient` | `courseTitle` | `date` | `eyebrow` | `message` | `signers` | `logoUrl` | `showBorder` | `accentColor` | `renderingBase`
 * @see {@link CertificateData}
 */
export interface CertificateData {
  recipient: string;
  courseTitle: string;
  date: string;
  /**
   * Small caps line above the recipient name.
   * @default 'Certificate of completion'
   */
  eyebrow?: string;
  /** Muted paragraph below the accent divider describing the award. */
  message?: string;
  signers: CertificateSigner[];
  logoUrl?: string;
  /** Image drawn low-opacity behind the content (org seal, crest). */
  watermarkImageUrl?: string;
  /**
   * Opacity of the watermark image, 0-1.
   * @default 0.08
   */
  watermarkOpacity?: number;
  /**
   * Draw the double outer frame around the page.
   * @default true
   */
  showBorder?: boolean;
  accentColor?: string;
}
