export interface ShippingLabelAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}

export interface ShippingLabelDestination extends ShippingLabelAddress {
  phone?: string;
}

export interface ShippingLabelData {
  from: ShippingLabelAddress;
  to: ShippingLabelDestination;
  carrier: string;
  serviceLevel: string;
  trackingNumber: string;
  barcodeUrl?: string;
  weight?: string;
  dimensions?: string;
  packageCount?: number;
  handlingLabels?: string[];
  postage?: string;
  accentColor?: string;
}
