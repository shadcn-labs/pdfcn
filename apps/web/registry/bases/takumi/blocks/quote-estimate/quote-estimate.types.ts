export interface QuotePhase {
  cost: number;
  duration: string;
  phase: string;
}

export interface QuoteAdjustment {
  label: string;
  value: number;
}

export interface QuoteEstimateProps {
  accentColor?: string;
  adjustments?: QuoteAdjustment[];
  client: string;
  companyContact?: string;
  companyLogo?: string;
  companyName: string;
  companyTagline?: string;
  currency?: string;
  date: string;
  depositNote?: string;
  phases: QuotePhase[];
  projectTitle: string;
  quoteNumber: string;
  renderingBase?: "takumi" | "forme";
  scope: string[];
  terms?: string;
  validUntil: string;
}
