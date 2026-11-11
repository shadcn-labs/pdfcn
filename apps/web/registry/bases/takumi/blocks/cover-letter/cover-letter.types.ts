export interface CoverLetterHighlight {
  quote: string;
  cite: string;
}

export interface CoverLetterProps {
  applicantName: string;
  role: string;
  company: string;
  contactLine?: string;
  greeting?: string;
  body: string[];
  highlight?: CoverLetterHighlight;
  closing?: string;
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
}
