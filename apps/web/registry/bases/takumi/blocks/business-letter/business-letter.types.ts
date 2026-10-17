export interface BusinessLetterRecipient {
  name: string;
  company?: string;
  address: string;
}

export interface BusinessLetterSender {
  name: string;
  role: string;
}

export interface BusinessLetterProps {
  companyName: string;
  companyLogo?: string;
  companyTagline?: string;
  companyAddress?: string;
  date: string;
  recipient: BusinessLetterRecipient;
  salutation?: string;
  body: string[];
  closing?: string;
  sender: BusinessLetterSender;
  reference?: string;
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
}
