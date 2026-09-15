export interface MedicalIntakeFormProps {
  clinicName: string;
  clinicLogo?: string;
  clinicAddress?: string;
  clinicPhone?: string;
  personalInfo?: boolean;
  emergencyContact?: boolean;
  insurance?: boolean;
  medicalHistory?: boolean;
  medications?: boolean;
  allergies?: boolean;
  reasonForVisit?: boolean;
  consent?: boolean;
  accentColor?: string;
  renderingBase?: "takumi" | "forme";
}
