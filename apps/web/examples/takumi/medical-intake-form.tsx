import { MedicalIntakeFormDocument } from "@/registry/bases/takumi/blocks/medical-intake-form/medical-intake-form";

const Demo = () => (
  <MedicalIntakeFormDocument
    clinicName="Sunrise Family Medicine"
    clinicAddress="200 Health Plaza, Denver, CO 80202"
    clinicPhone="(303) 555-0180"
    personalInfo
    emergencyContact
    insurance
    medicalHistory
    medications
    allergies
    reasonForVisit
    consent
    accentColor="#0d9488"
  />
);

export default Demo;
