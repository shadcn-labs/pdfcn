import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
import { PageHeader } from "@/registry/bases/takumi/components/page-header/page-header";
import { PdfImage } from "@/registry/bases/takumi/components/pdf-image/pdf-image";
import { PdfSignatureBlock } from "@/registry/bases/takumi/components/signature/signature";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/registry/bases/takumi/components/table/table";
import { Text } from "@/registry/bases/takumi/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  Document,
  Page,
  StyleSheet,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { Style } from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { MedicalIntakeFormProps } from "./medical-intake-form.types";

const defaultProps: MedicalIntakeFormProps = {
  accentColor: "#0d9488",
  allergies: true,
  clinicAddress: "200 Health Plaza, Denver, CO 80202",
  clinicName: "Sunrise Family Medicine",
  clinicPhone: "(303) 555-0180",
  consent: true,
  emergencyContact: true,
  insurance: true,
  medicalHistory: true,
  medications: true,
  personalInfo: true,
  reasonForVisit: true,
  renderingBase: "takumi",
};

const medicalConditionsList = [
  "High Blood Pressure",
  "Heart Disease",
  "Diabetes (Type 1 / 2)",
  "Asthma / Respiratory",
  "Cancer / Tumor",
  "Thyroid Disorder",
  "Depression / Anxiety",
  "High Cholesterol",
  "Kidney Disease",
  "Arthritis",
  "Stroke / TIA",
  "Previous Surgeries",
];

const allergyChecklist = [
  "Penicillin / Antibiotics",
  "Latex / Rubber",
  "Aspirin / NSAIDs",
  "Food / Environmental",
];

const medicationChecklist = [
  "Taking Prescription Meds",
  "Taking Blood Thinners",
  "Taking Daily Insulin",
  "Taking OTC Supplements",
];

interface StylesProps {
  styles: Record<string, Style>;
  theme: PdfcnTheme;
  clinicName?: string;
}

const PersonalInfoSection = ({ styles }: StylesProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>1. Personal Information</Text>
    </View>
    <View style={styles.fieldRow}>
      <View style={[styles.fieldGroup, { flex: 2 }]}>
        <Text style={styles.fieldLabel}>Full Name (Last, First, Middle)</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Date of Birth (MM/DD/YYYY)</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={[styles.fieldGroup, { marginRight: 0 }]}>
        <Text style={styles.fieldLabel}>Gender</Text>
        <View style={styles.blankLine} />
      </View>
    </View>
    <View style={styles.fieldRow}>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Phone Number</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={[styles.fieldGroup, { flex: 1.5, marginRight: 0 }]}>
        <Text style={styles.fieldLabel}>Email Address</Text>
        <View style={styles.blankLine} />
      </View>
    </View>
    <View style={styles.fieldRow}>
      <View style={[styles.fieldGroup, { flex: 2 }]}>
        <Text style={styles.fieldLabel}>Street Address</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>City</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={{ flex: 0.5, flexDirection: "column", marginRight: 10 }}>
        <Text style={styles.fieldLabel}>State</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={{ flex: 0.8, flexDirection: "column" }}>
        <Text style={styles.fieldLabel}>ZIP Code</Text>
        <View style={styles.blankLine} />
      </View>
    </View>
  </View>
);

const EmergencyContactSection = ({ styles }: StylesProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>2. Emergency Contact</Text>
    </View>
    <View style={styles.fieldRow}>
      <View style={[styles.fieldGroup, { flex: 1.5 }]}>
        <Text style={styles.fieldLabel}>Contact Name</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Relationship</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={[styles.fieldGroup, { marginRight: 0 }]}>
        <Text style={styles.fieldLabel}>Primary Phone</Text>
        <View style={styles.blankLine} />
      </View>
    </View>
  </View>
);

const InsuranceSection = ({ styles }: StylesProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>3. Insurance Information</Text>
    </View>
    <View style={styles.fieldRow}>
      <View style={[styles.fieldGroup, { flex: 1.5 }]}>
        <Text style={styles.fieldLabel}>Insurance Provider</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Policy / Member ID</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={[styles.fieldGroup, { marginRight: 0 }]}>
        <Text style={styles.fieldLabel}>Group Number</Text>
        <View style={styles.blankLine} />
      </View>
    </View>
    <View style={styles.fieldRow}>
      <View style={[styles.fieldGroup, { flex: 1.5 }]}>
        <Text style={styles.fieldLabel}>Subscriber / Policyholder Name</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Relationship to Patient</Text>
        <View style={styles.blankLine} />
      </View>
      <View style={[styles.fieldGroup, { marginRight: 0 }]}>
        <Text style={styles.fieldLabel}>Subscriber DOB</Text>
        <View style={styles.blankLine} />
      </View>
    </View>
  </View>
);

const MedicalHistorySection = ({ styles }: StylesProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>4. Medical History Checklist</Text>
    </View>
    <Text style={styles.sectionSubTitle}>Medical Conditions</Text>
    <View style={styles.checkboxGrid}>
      {medicalConditionsList.map((condition) => (
        <View key={condition} style={styles.checkboxItem}>
          <View style={styles.checkbox} />
          <Text style={{ fontSize: 8 }}>{condition}</Text>
        </View>
      ))}
    </View>

    <View style={{ flexDirection: "row", marginTop: 4 }}>
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={styles.sectionSubTitle}>Known Allergies Checklist</Text>
        <View style={styles.checkboxGrid}>
          {allergyChecklist.map((item) => (
            <View key={item} style={[styles.checkboxItem, { width: "50%" }]}>
              <View style={styles.checkbox} />
              <Text style={{ fontSize: 8 }}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionSubTitle}>Medication History Checklist</Text>
        <View style={styles.checkboxGrid}>
          {medicationChecklist.map((item) => (
            <View key={item} style={[styles.checkboxItem, { width: "50%" }]}>
              <View style={styles.checkbox} />
              <Text style={{ fontSize: 8 }}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  </View>
);

const MedicationsSection = ({ styles }: StylesProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>5. Current Medications</Text>
    </View>
    <Table variant="grid">
      <TableHeader>
        <TableRow header>
          <TableCell>Medication</TableCell>
          <TableCell align="center">Dosage</TableCell>
          <TableCell align="center">Frequency</TableCell>
          <TableCell>Prescribing Doctor</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {["med-1", "med-2", "med-3"].map((rowId) => (
          <TableRow key={rowId} style={styles.blankRow}>
            <TableCell> </TableCell>
            <TableCell align="center"> </TableCell>
            <TableCell align="center"> </TableCell>
            <TableCell> </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </View>
);

const AllergiesSection = ({ styles }: StylesProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>6. Allergies & Sensitivities</Text>
    </View>
    <Table variant="grid">
      <TableHeader>
        <TableRow header>
          <TableCell>Allergen</TableCell>
          <TableCell>Reaction</TableCell>
          <TableCell align="center">Severity</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {["alg-1", "alg-2", "alg-3"].map((rowId) => (
          <TableRow key={rowId} style={styles.blankRow}>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell align="center"> </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </View>
);

const ReasonForVisitSection = ({ styles }: StylesProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>7. Reason for Visit</Text>
    </View>
    <View style={styles.reasonBox}>
      <Text style={styles.reasonText}>
        Please describe your primary symptoms, chief complaints, or goals for
        today's appointment:
      </Text>
    </View>
  </View>
);

const ConsentSection = ({ styles, clinicName }: StylesProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>8. Consent & HIPAA Acknowledgment</Text>
    </View>
    <View style={styles.consentBox}>
      <Text style={styles.consentText}>
        By signing below, I certify that the information provided in this intake
        form is true, accurate, and complete to the best of my knowledge. I
        authorize {clinicName} to provide medical treatment and disclose
        protected health information as necessary for treatment, payment, and
        healthcare operations under HIPAA guidelines.
      </Text>
    </View>
    <PdfSignatureBlock
      variant="double"
      signers={[
        {
          date: "",
          label: "Patient / Guardian Signature",
          name: "",
          title: "",
        },
        { date: "", label: "Date (MM/DD/YYYY)", name: "", title: "" },
      ]}
      style={{ marginTop: 6 }}
    />
  </View>
);

type SectionKey = keyof Omit<
  MedicalIntakeFormProps,
  | "clinicName"
  | "clinicLogo"
  | "clinicAddress"
  | "clinicPhone"
  | "accentColor"
  | "renderingBase"
>;

const sectionsMap: {
  key: SectionKey;
  component: React.ComponentType<StylesProps>;
}[] = [
  { component: PersonalInfoSection, key: "personalInfo" },
  { component: EmergencyContactSection, key: "emergencyContact" },
  { component: InsuranceSection, key: "insurance" },
  { component: MedicalHistorySection, key: "medicalHistory" },
  { component: MedicationsSection, key: "medications" },
  { component: AllergiesSection, key: "allergies" },
  { component: ReasonForVisitSection, key: "reasonForVisit" },
  { component: ConsentSection, key: "consent" },
];

const MedicalIntakeFormContent = (props: MedicalIntakeFormProps) => {
  const theme = usePdfcnTheme();
  const accentColor = props.accentColor ?? "#0d9488";
  const { clinicName } = props;

  const styles = StyleSheet.create({
    blankLine: {
      borderBottomColor: theme.colors.mutedForeground,
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
      flex: 1,
      minHeight: 16,
    },
    blankRow: {
      minHeight: 20,
    },
    checkbox: {
      borderColor: theme.colors.mutedForeground,
      borderRadius: 2,
      borderStyle: "solid",
      borderWidth: 1,
      height: 9,
      marginRight: 5,
      width: 9,
    },
    checkboxGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 3,
    },
    checkboxItem: {
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 4,
      width: "33.33%",
    },
    consentBox: {
      backgroundColor: theme.colors.muted,
      borderColor: theme.colors.border,
      borderRadius: 4,
      borderStyle: "solid",
      borderWidth: 1,
      marginBottom: 8,
      padding: 8,
    },
    consentText: {
      color: theme.colors.foreground,
      fontSize: 7.5,
      leadingHeight: 1.3,
    },
    fieldGroup: {
      flex: 1,
      flexDirection: "column",
      marginBottom: 6,
      marginRight: 10,
    },
    fieldLabel: {
      color: theme.colors.mutedForeground,
      fontSize: 8,
      fontWeight: "bold",
      marginBottom: 2,
      textTransform: "uppercase",
    },
    fieldRow: {
      flexDirection: "row",
      marginBottom: 3,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative",
    },
    reasonBox: {
      borderColor: theme.colors.border,
      borderRadius: 4,
      borderStyle: "solid",
      borderWidth: 1,
      minHeight: 50,
      padding: 6,
    },
    reasonText: {
      color: theme.colors.mutedForeground,
      fontSize: 8,
    },
    section: {
      breakInside: "avoid",
      marginBottom: 10,
    },
    sectionHeader: {
      alignItems: "center",
      borderBottomColor: accentColor,
      borderBottomStyle: "solid",
      borderBottomWidth: 1.5,
      flexDirection: "row",
      marginBottom: 6,
      paddingBottom: 2,
    },
    sectionSubTitle: {
      color: theme.colors.foreground,
      fontSize: 8,
      fontWeight: "bold",
      marginBottom: 3,
      marginTop: 4,
    },
    sectionTitle: {
      color: accentColor,
      fontSize: 9.5,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  });

  const footerText = [
    props.clinicAddress,
    props.clinicPhone ? `Phone: ${props.clinicPhone}` : "",
    "Form Rev. 2026.09",
  ]
    .filter(Boolean)
    .join("  •  ");

  return (
    <Document title={`${clinicName} - Patient Intake Form`}>
      <Page size="A4" style={styles.page}>
        <PageHeader
          variant="logo-left"
          logo={
            props.clinicLogo ? (
              <PdfImage src={props.clinicLogo} style={{ margin: 0 }} />
            ) : undefined
          }
          title={clinicName}
          subtitle="PATIENT INTAKE FORM"
          rightText={props.clinicPhone ?? ""}
          rightSubText={props.clinicAddress ?? ""}
          style={{ marginBottom: 10 }}
        />

        {sectionsMap.map(({ key, component: Component }) => {
          if (props[key] === false) {
            return null;
          }
          return (
            <Component
              key={key}
              styles={styles}
              theme={theme}
              clinicName={clinicName}
            />
          );
        })}

        <PageFooter
          leftText={footerText}
          rightText="Page 1 of 1"
          sticky
          pagePadding={20}
        />
      </Page>
    </Document>
  );
};

export const MedicalIntakeForm = ({
  theme,
  ...props
}: MedicalIntakeFormProps & { theme?: PdfcnTheme }) => {
  const mergedProps = { ...defaultProps, ...props };
  return (
    <PdfcnThemeProvider theme={theme}>
      <MedicalIntakeFormContent {...mergedProps} />
    </PdfcnThemeProvider>
  );
};

export const MedicalIntakeFormDocument = MedicalIntakeForm;
