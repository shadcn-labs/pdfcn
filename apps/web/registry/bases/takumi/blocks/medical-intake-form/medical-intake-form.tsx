import { PdfForm } from "@/registry/bases/takumi/components/form/form";
import { PdfList } from "@/registry/bases/takumi/components/list/list";
import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
import { PageHeader } from "@/registry/bases/takumi/components/page-header/page-header";
import { PdfImage } from "@/registry/bases/takumi/components/pdf-image/pdf-image";
import { Section } from "@/registry/bases/takumi/components/section/section";
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
  useSafeMemo,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  View,
  StyleSheet,
  Document,
  Page,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import { resolveColor } from "@/registry/bases/takumi/lib/resolve-color";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { MedicalIntakeFormProps } from "./medical-intake-form.types";

const FORM_VERSION = "Form v1.0 · Revised 09/2026";
const FORM_STYLE = { marginBottom: 0 };

const MEDICAL_CONDITIONS = [
  "Diabetes",
  "High Blood Pressure",
  "Heart Disease",
  "Asthma",
  "COPD",
  "Cancer",
  "Stroke",
  "Thyroid Disorder",
  "Kidney Disease",
  "Liver Disease",
  "Seizures / Epilepsy",
  "Other",
];

const CONSENT_ACKNOWLEDGMENTS = [
  { checked: false, text: "I have read and understand the consent above." },
  { checked: false, text: "I have received the Notice of Privacy Practices." },
];

const MEDICATION_ROWS = [
  "medication-1",
  "medication-2",
  "medication-3",
  "medication-4",
];

const ALLERGY_ROWS = ["allergy-1", "allergy-2", "allergy-3"];

const BLANK_CELL = <View style={{ minHeight: 14 }} />;

const blankChecklist = (labels: string[]) =>
  labels.map((text) => ({ checked: false, text }));

const createIntakeStyles = (t: PdfcnTheme) =>
  StyleSheet.create({
    column: { flex: 1 },
    consentText: {
      fontSize: t.primitives.typography.xs,
      lineHeight: 1.4,
      marginBottom: 6,
    },
    labelText: { fontSize: 9, fontWeight: "bold", letterSpacing: 0.6 },
    page: {
      backgroundColor: t.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      paddingBottom: t.spacing.page.marginBottom,
      paddingLeft: t.spacing.page.marginLeft,
      paddingRight: t.spacing.page.marginRight,
      paddingTop: t.spacing.page.marginTop,
      position: "relative",
    },
    pageBreak: { breakAfter: "page" },
    pageTwo: { paddingBottom: 44, paddingTop: 24 },
    pageTwoHeader: {
      alignItems: "flex-end",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    reasonBox: {
      borderColor: t.colors.border,
      borderRadius: t.primitives.borderRadius.sm,
      borderStyle: "solid",
      borderWidth: 1,
      minHeight: 40,
    },
    row: { flexDirection: "row", gap: 20 },
    section: { marginBottom: 4 },
    signature: { marginBottom: 0, marginTop: 8 },
    title: { fontSize: 13, fontWeight: "bold" },
  });

type IntakeStyles = ReturnType<typeof createIntakeStyles>;

const useIntakeStyles = (): { styles: IntakeStyles; theme: PdfcnTheme } => {
  const theme = usePdfcnTheme();
  const styles = useSafeMemo(() => createIntakeStyles(theme), [theme]);
  return { styles, theme };
};

const SectionLabel = ({ accent, label }: { accent: string; label: string }) => {
  const { styles } = useIntakeStyles();

  return (
    <View
      style={{
        borderBottomColor: accent,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        marginBottom: 4,
        paddingBottom: 2,
      }}
    >
      <Text noMargin style={styles.labelText} transform="uppercase">
        {label}
      </Text>
    </View>
  );
};

const IntakeHeader = ({
  clinicAddress,
  clinicLogo,
  clinicName,
  clinicPhone,
}: Pick<
  MedicalIntakeFormProps,
  "clinicAddress" | "clinicLogo" | "clinicName" | "clinicPhone"
>) => (
  <PageHeader
    logo={
      clinicLogo ? (
        <PdfImage
          height={48}
          src={clinicLogo}
          style={{ margin: 0 }}
          width={48}
        />
      ) : undefined
    }
    marginBottom={16}
    rightSubText={clinicAddress}
    rightText={clinicPhone}
    subtitle="Patient Intake Form"
    title={clinicName}
    variant="logo-left"
  />
);

const SecondPageHeader = ({
  clinicName,
  clinicPhone,
}: Pick<MedicalIntakeFormProps, "clinicName" | "clinicPhone">) => {
  const { styles } = useIntakeStyles();

  return (
    <View style={styles.pageTwoHeader}>
      <Text noMargin style={styles.title}>
        {`${clinicName} — Patient Intake Form (continued)`}
      </Text>
      <Text color="mutedForeground" noMargin variant="xs">
        {clinicPhone}
      </Text>
    </View>
  );
};

const IntakeFooter = ({
  clinicAddress,
  clinicPhone,
  page,
  totalPages,
}: Pick<MedicalIntakeFormProps, "clinicAddress" | "clinicPhone"> & {
  page: number;
  totalPages: number;
}) => {
  const { theme } = useIntakeStyles();

  return (
    <PageFooter
      address={clinicAddress}
      leftText={FORM_VERSION}
      pagePadding={theme.spacing.page.marginLeft}
      phone={clinicPhone}
      rightText={`Page ${page} of ${totalPages}`}
      sticky
      variant="three-column"
    />
  );
};

const PersonalInfoSection = () => (
  <PdfForm
    groups={[
      {
        fields: [
          { height: 14, label: "Full Name" },
          { height: 14, hint: "DD / MM / YYYY", label: "Date of Birth" },
          { height: 14, label: "Gender" },
          { height: 14, hint: "+1 (555) 000-0000", label: "Phone Number" },
          { height: 14, label: "Email Address" },
        ],
        layout: "two-column",
        title: "Patient Information",
      },
      {
        fields: [
          { height: 14, label: "Street Address", width: "100%" },
          { height: 14, label: "City" },
          { height: 14, label: "State / Province" },
          { height: 14, label: "Postal Code" },
        ],
        layout: "two-column",
        title: "Address",
      },
    ]}
    style={FORM_STYLE}
    variant="underline"
  />
);

const EmergencyContactSection = () => (
  <PdfForm
    groups={[
      {
        fields: [
          { height: 14, label: "Emergency Contact Name" },
          { height: 14, label: "Relationship" },
          { height: 14, label: "Phone Number" },
        ],
        layout: "two-column",
        title: "Emergency Contact",
      },
    ]}
    style={FORM_STYLE}
    variant="underline"
  />
);

const InsuranceSection = () => (
  <PdfForm
    groups={[
      {
        fields: [
          { height: 14, label: "Insurance Provider" },
          { height: 14, label: "Policy Number" },
          { height: 14, label: "Group Number" },
          { height: 14, label: "Subscriber Name" },
        ],
        layout: "two-column",
        title: "Insurance",
      },
    ]}
    style={FORM_STYLE}
    variant="underline"
  />
);

const MedicalHistorySection = ({ accent }: { accent: string }) => {
  const { styles } = useIntakeStyles();

  return (
    <View style={styles.section}>
      <SectionLabel accent={accent} label="Medical History" />
      <View style={styles.row}>
        <View style={styles.column}>
          <PdfList
            gap="xs"
            items={blankChecklist(MEDICAL_CONDITIONS.slice(0, 4))}
            variant="checklist"
          />
        </View>
        <View style={styles.column}>
          <PdfList
            gap="xs"
            items={blankChecklist(MEDICAL_CONDITIONS.slice(4, 8))}
            variant="checklist"
          />
        </View>
        <View style={styles.column}>
          <PdfList
            gap="xs"
            items={blankChecklist(MEDICAL_CONDITIONS.slice(8))}
            variant="checklist"
          />
        </View>
      </View>
    </View>
  );
};

const MedicationsSection = ({ accent }: { accent: string }) => {
  const { styles } = useIntakeStyles();

  return (
    <View style={styles.section}>
      <SectionLabel accent={accent} label="Current Medications" />
      <Table variant="grid">
        <TableHeader>
          <TableRow header>
            <TableCell>Medication</TableCell>
            <TableCell>Dosage</TableCell>
            <TableCell>Frequency</TableCell>
            <TableCell>Prescribing Doctor</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MEDICATION_ROWS.map((row) => (
            <TableRow key={row}>
              <TableCell>{BLANK_CELL}</TableCell>
              <TableCell>{BLANK_CELL}</TableCell>
              <TableCell>{BLANK_CELL}</TableCell>
              <TableCell>{BLANK_CELL}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </View>
  );
};

const AllergiesSection = ({ accent }: { accent: string }) => {
  const { styles } = useIntakeStyles();

  return (
    <View style={styles.section}>
      <SectionLabel accent={accent} label="Allergies" />
      <Table variant="grid">
        <TableHeader>
          <TableRow header>
            <TableCell>Allergen</TableCell>
            <TableCell>Reaction</TableCell>
            <TableCell>Severity</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ALLERGY_ROWS.map((row) => (
            <TableRow key={row}>
              <TableCell>{BLANK_CELL}</TableCell>
              <TableCell>{BLANK_CELL}</TableCell>
              <TableCell>{BLANK_CELL}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </View>
  );
};

const ReasonForVisitSection = ({ accent }: { accent: string }) => {
  const { styles } = useIntakeStyles();

  return (
    <View style={styles.section}>
      <SectionLabel accent={accent} label="Reason for Visit" />
      <View style={styles.reasonBox} />
    </View>
  );
};

const ConsentSection = ({
  accent,
  accentColor,
  clinicName,
}: Pick<MedicalIntakeFormProps, "accentColor" | "clinicName"> & {
  accent: string;
}) => {
  const { styles } = useIntakeStyles();

  return (
    <View style={styles.section}>
      <SectionLabel accent={accent} label="Consent & Authorization" />
      <Section
        accentColor={accentColor}
        padding="sm"
        spacing="none"
        variant="highlight"
      >
        <Text color="mutedForeground" noMargin style={styles.consentText}>
          {`I authorize ${clinicName} to provide treatment and to release the information required to process insurance claims for this visit, and I acknowledge that I have received the Notice of Privacy Practices (HIPAA) explaining how my health information may be used.`}
        </Text>
        <PdfList gap="xs" items={CONSENT_ACKNOWLEDGMENTS} variant="checklist" />
      </Section>
      <PdfSignatureBlock
        signers={[{ label: "Patient / Guardian Signature" }, { label: "Date" }]}
        style={styles.signature}
        variant="double"
      />
    </View>
  );
};

type IntakeSections = Required<
  Pick<
    MedicalIntakeFormProps,
    | "allergies"
    | "consent"
    | "emergencyContact"
    | "insurance"
    | "medicalHistory"
    | "medications"
    | "personalInfo"
    | "reasonForVisit"
  >
>;

const resolveSections = (props: MedicalIntakeFormProps): IntakeSections => ({
  allergies: props.allergies ?? true,
  consent: props.consent ?? true,
  emergencyContact: props.emergencyContact ?? true,
  insurance: props.insurance ?? true,
  medicalHistory: props.medicalHistory ?? true,
  medications: props.medications ?? true,
  personalInfo: props.personalInfo ?? true,
  reasonForVisit: props.reasonForVisit ?? true,
});

const hasSecondPage = (sections: IntakeSections) =>
  sections.allergies ||
  sections.consent ||
  sections.medications ||
  sections.reasonForVisit;

const FirstPage = ({
  clinicAddress,
  clinicLogo,
  clinicName,
  clinicPhone,
  sections,
  totalPages,
}: Pick<
  MedicalIntakeFormProps,
  "clinicAddress" | "clinicLogo" | "clinicName" | "clinicPhone"
> & {
  sections: IntakeSections;
  totalPages: number;
}) => {
  const { styles } = useIntakeStyles();

  return (
    <Page
      size="A4"
      style={totalPages > 1 ? [styles.page, styles.pageBreak] : styles.page}
    >
      <IntakeHeader
        clinicAddress={clinicAddress}
        clinicLogo={clinicLogo}
        clinicName={clinicName}
        clinicPhone={clinicPhone}
      />
      {sections.personalInfo ? <PersonalInfoSection /> : null}
      {sections.emergencyContact ? <EmergencyContactSection /> : null}
      {sections.insurance ? <InsuranceSection /> : null}
      <IntakeFooter
        clinicAddress={clinicAddress}
        clinicPhone={clinicPhone}
        page={1}
        totalPages={totalPages}
      />
    </Page>
  );
};

const SecondPage = ({
  accent,
  accentColor,
  clinicAddress,
  clinicName,
  clinicPhone,
  sections,
  totalPages,
}: Pick<
  MedicalIntakeFormProps,
  "accentColor" | "clinicAddress" | "clinicName" | "clinicPhone"
> & {
  accent: string;
  sections: IntakeSections;
  totalPages: number;
}) => {
  const { styles } = useIntakeStyles();

  return (
    <Page size="A4" style={[styles.page, styles.pageTwo]}>
      <SecondPageHeader clinicName={clinicName} clinicPhone={clinicPhone} />
      {sections.medicalHistory ? (
        <MedicalHistorySection accent={accent} />
      ) : null}
      {sections.medications ? <MedicationsSection accent={accent} /> : null}
      {sections.allergies ? <AllergiesSection accent={accent} /> : null}
      {sections.reasonForVisit ? (
        <ReasonForVisitSection accent={accent} />
      ) : null}
      {sections.consent ? (
        <ConsentSection
          accent={accent}
          accentColor={accentColor}
          clinicName={clinicName}
        />
      ) : null}
      <IntakeFooter
        clinicAddress={clinicAddress}
        clinicPhone={clinicPhone}
        page={2}
        totalPages={totalPages}
      />
    </Page>
  );
};

const MedicalIntakeFormContent = (props: MedicalIntakeFormProps) => {
  const { theme } = useIntakeStyles();
  const sections = resolveSections(props);
  const accent = props.accentColor
    ? resolveColor(props.accentColor, theme.colors)
    : theme.colors.primary;
  const totalPages = hasSecondPage(sections) ? 2 : 1;

  return (
    <Document title={`${props.clinicName} — Patient Intake Form`}>
      <FirstPage
        clinicAddress={props.clinicAddress}
        clinicLogo={props.clinicLogo}
        clinicName={props.clinicName}
        clinicPhone={props.clinicPhone}
        sections={sections}
        totalPages={totalPages}
      />
      {totalPages > 1 ? (
        <SecondPage
          accent={accent}
          accentColor={props.accentColor}
          clinicAddress={props.clinicAddress}
          clinicName={props.clinicName}
          clinicPhone={props.clinicPhone}
          sections={sections}
          totalPages={totalPages}
        />
      ) : null}
    </Document>
  );
};

/**
 * Print-ready medical intake form with patient, emergency contact, insurance,
 * medical history, medication, allergy, reason for visit, and consent
 * sections. Every section can be hidden through its boolean prop, and all
 * fields are left blank for the patient to complete by hand.
 */
export const MedicalIntakeFormDocument = ({
  theme,
  ...props
}: MedicalIntakeFormProps) => (
  <PdfcnThemeProvider theme={theme}>
    <MedicalIntakeFormContent {...props} />
  </PdfcnThemeProvider>
);
