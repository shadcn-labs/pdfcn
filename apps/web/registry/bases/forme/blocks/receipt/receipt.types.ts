/** A purchased line item shown in the receipt table. */
export interface ReceiptItem {
  name: string;
  qty: number;
  total: number;
}

/** An additional charge shown between the subtotal and the grand total. */
export interface ReceiptFee {
  label: string;
  value: number;
}

/**
 * Compact printable receipt (proof of payment) for A5 / half-page layouts.
 * Props - `companyName` | `companyLogo` | `receiptNumber` | `date` | `items` | `subtotal` | `fees` | `total` | `paymentMethod` | `barcodeValue` | `thankYouNote` | `currency` | `accentColor` | `renderingBase`
 * @see {@link ReceiptData}
 */
export interface ReceiptData {
  companyName: string;
  companyLogo?: string;
  receiptNumber: string;
  date: string;
  items: ReceiptItem[];
  subtotal: number;
  fees?: ReceiptFee[];
  total: number;
  paymentMethod: string;
  /** Barcode payload; falls back to `receiptNumber` when omitted. */
  barcodeValue?: string;
  thankYouNote?: string;
  /**
   * Currency symbol prepended to amounts.
   * @default '$'
   */
  currency?: string;
  accentColor?: string;
}
