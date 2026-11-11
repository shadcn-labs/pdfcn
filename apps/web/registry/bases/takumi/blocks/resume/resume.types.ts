export interface ResumeContact {
  email: string;
  phone?: string;
  location?: string;
  website?: string;
}

export interface ResumeExperience {
  period: string;
  title: string;
  company: string;
  details: string;
}

export interface ResumeEducation {
  degree: string;
  school: string;
  year?: string;
}

export interface ResumeProps {
  name: string;
  role: string;
  contact: ResumeContact;
  summary: string;
  experience: ResumeExperience[];
  skills: string[];
  education: ResumeEducation[];
  photoUrl?: string;
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
}
