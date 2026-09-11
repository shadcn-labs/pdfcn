import { PdfForm } from "@/registry/bases/takumi/components/form/form";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";

const DemoBody = () => (
  <PdfForm
    title="Job Application"
    subtitle="Please complete all fields clearly in block capitals."
    variant="underline"
    groups={[
      {
        fields: [
          { hint: "First and last name", label: "Full Name" },
          { hint: "DD / MM / YYYY", label: "Date of Birth" },
          { label: "Email Address" },
          { hint: "+1 (555) 000-0000", label: "Phone Number" },
        ],
        title: "Personal Information",
      },
      {
        fields: [
          { label: "Street Address", width: "100%" },
          { label: "City" },
          { label: "State / Province" },
          { label: "Postal Code" },
        ],
        layout: "two-column",
        title: "Address",
      },
      {
        fields: [{ height: 60, label: "Cover Letter" }],
        title: "Additional Information",
      },
    ]}
  />
);

const Demo = () => (
  <div data-pdf-document>
    <div data-pdf-page style={{ display: "flex", flexDirection: "column" }}>
      <PdfcnThemeProvider>
        <DemoBody />
      </PdfcnThemeProvider>
    </div>
  </div>
);

export default Demo;
