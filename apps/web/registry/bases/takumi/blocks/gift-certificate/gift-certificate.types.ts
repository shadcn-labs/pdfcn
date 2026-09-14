export interface GiftCertificateData {
  companyName: string;
  companyLogo?: string;
  amount: number;
  currency?: string;
  recipientName: string;
  senderName: string;
  message?: string;
  certificateCode: string;
  expiryDate: string;
  redemptionInstructions?: string;
  terms?: string;
  companyContact?: string;
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
}
