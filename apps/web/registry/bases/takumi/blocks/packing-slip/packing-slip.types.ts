export interface PackingSlipRecipient {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  phone?: string;
}

export interface PackingSlipSender {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface PackingSlipItem {
  name: string;
  sku: string;
  qtyPacked: number;
  qtyOrdered: number;
  unitPrice: number;
}

export interface PackingSlipShipping {
  carrier: string;
  trackingNumber: string;
  method: string;
  estimatedDelivery?: string;
}

export interface PackingSlipProps {
  companyName: string;
  companyLogo?: string;
  orderNumber: string;
  orderDate: string;
  poNumber?: string;
  shipTo: PackingSlipRecipient;
  shipFrom: PackingSlipSender;
  items: PackingSlipItem[];
  shipping: PackingSlipShipping;
  totalPackages?: number;
  totalWeight?: string;
  returnsPolicy?: string;
  customerService?: string;
  thankYouMessage?: string;
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
}
