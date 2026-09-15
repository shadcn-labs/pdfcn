"use client";

import { useWebMCP } from "use-webmcp-tool";

import { SITE } from "@/constants/site";

interface BlockInfo {
  name: string;
  type: "invoice" | "report";
  title: string;
  description: string;
  bases: string[];
  installCommand: string;
}

const BLOCKS: BlockInfo[] = [
  {
    bases: ["takumi", "forme"],
    description:
      "Traditional invoice layout with company header, bill-to section, itemized table, and payment terms.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/invoice-classic.json"',
    name: "invoice-classic",
    title: "Classic Invoice",
    type: "invoice",
  },
  {
    bases: ["takumi", "forme"],
    description:
      "Professional invoice designed for consulting services with hourly billing sections.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/invoice-consultant.json"',
    name: "invoice-consultant",
    title: "Consultant Invoice",
    type: "invoice",
  },
  {
    bases: ["takumi", "forme"],
    description:
      "Clean corporate invoice with modern styling and structured data tables.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/invoice-corporate.json"',
    name: "invoice-corporate",
    title: "Corporate Invoice",
    type: "invoice",
  },
  {
    bases: ["takumi", "forme"],
    description:
      "Visually distinctive invoice with creative layout and accent colors.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/invoice-creative.json"',
    name: "invoice-creative",
    title: "Creative Invoice",
    type: "invoice",
  },
  {
    bases: ["takumi", "forme"],
    description:
      "Stripped-down invoice with clean typography and generous whitespace.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/invoice-minimal.json"',
    name: "invoice-minimal",
    title: "Minimal Invoice",
    type: "invoice",
  },
  {
    bases: ["takumi", "forme"],
    description:
      "Contemporary invoice with bold headers and a polished layout.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/invoice-modern.json"',
    name: "invoice-modern",
    title: "Modern Invoice",
    type: "invoice",
  },
  {
    bases: ["takumi", "forme"],
    description:
      "Comprehensive financial report with summary metrics, data tables, and charts.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/report-financial.json"',
    name: "report-financial",
    title: "Financial Report",
    type: "report",
  },
  {
    bases: ["takumi", "forme"],
    description:
      "Marketing performance report with KPI summaries, campaign data, and trend analysis.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/report-marketing.json"',
    name: "report-marketing",
    title: "Marketing Report",
    type: "report",
  },
  {
    bases: ["takumi", "forme"],
    description:
      "Operational metrics report with status tracking, progress indicators, and risk assessment.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/report-operations.json"',
    name: "report-operations",
    title: "Operations Report",
    type: "report",
  },
  {
    bases: ["takumi", "forme"],
    description:
      "Security audit report with compliance metrics, vulnerability tracking, and incident summary.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/report-security.json"',
    name: "report-security",
    title: "Security Report",
    type: "report",
  },
  {
    bases: ["takumi"],
    description:
      "Printable patient intake form with personal info, emergency contact, insurance, medical history checklist, and consent.",
    installCommand:
      'npx shadcn@latest add "https://pdfcn.vercel.app/r/takumi/medical-intake-form.json"',
    name: "medical-intake-form",
    title: "Medical Intake Form",
    type: "report",
  },
];

const BLOCK_SCHEMAS: Record<string, object> = {
  "invoice-classic": {
    properties: {
      billTo: {
        properties: {
          address: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
          phone: { type: "string" },
        },
        required: ["name", "address", "email", "phone"],
        type: "object",
      },
      companyAddress: { description: "Sender address", type: "string" },
      companyEmail: { description: "Sender email", type: "string" },
      companyName: { description: "Sender company name", type: "string" },
      dueDate: { description: "Payment due date", type: "string" },
      invoiceDate: { description: "Issue date", type: "string" },
      invoiceNumber: {
        description: "Invoice identifier (e.g. INV-001)",
        type: "string",
      },
      items: {
        items: {
          properties: {
            description: { type: "string" },
            quantity: { type: "number" },
            unitPrice: { type: "number" },
          },
          required: ["description", "quantity", "unitPrice"],
          type: "object",
        },
        type: "array",
      },
      notes: { description: "Optional notes", type: "string" },
      paymentTerms: {
        properties: {
          dueDate: { type: "string" },
          gst: { type: "string" },
          method: { type: "string" },
        },
        type: "object",
      },
      subtitle: { description: "Tagline or subtitle", type: "string" },
      summary: {
        properties: {
          subtotal: { type: "number" },
          tax: { type: "number" },
          total: { type: "number" },
        },
        type: "object",
      },
    },
    required: [
      "invoiceNumber",
      "invoiceDate",
      "dueDate",
      "companyName",
      "billTo",
      "items",
    ],
    type: "object",
  },
  "report-marketing": {
    properties: {
      author: { type: "string" },
      generatedAt: { type: "string" },
      highlights: { items: { type: "string" }, type: "array" },
      period: {
        description: "Reporting period (e.g. Q1 2026)",
        type: "string",
      },
      rows: {
        items: {
          properties: {
            label: { type: "string" },
            owner: { type: "string" },
            progress: { type: "number" },
            status: { type: "string" },
          },
          type: "object",
        },
        type: "array",
      },
      series: {
        items: {
          properties: {
            label: { type: "string" },
            value: { type: "number" },
          },
          type: "object",
        },
        type: "array",
      },
      subtitle: { type: "string" },
      summary: {
        items: {
          properties: {
            label: { type: "string" },
            tone: {
              enum: ["success", "warning", "destructive", "info"],
              type: "string",
            },
            trend: { type: "string" },
            value: { type: "string" },
          },
          type: "object",
        },
        type: "array",
      },
      title: { description: "Report title", type: "string" },
    },
    required: ["title", "subtitle", "generatedAt", "period", "author"],
    type: "object",
  },
};

export const ListBlocksTool = () => {
  useWebMCP({
    description:
      "List all available PDF document templates (invoices and reports). Use this to find the right template before generating a PDF.",
    execute: ({ type = "all" }: { type?: string }) => {
      const filtered =
        type === "all" ? BLOCKS : BLOCKS.filter((b) => b.type === type);
      return filtered;
    },
    inputSchema: {
      properties: {
        type: {
          description: "Filter by template type (default: all)",
          enum: ["invoice", "report", "all"],
          type: "string",
        },
      },
      type: "object",
    },
    name: `${SITE.NAME}_list_blocks`,
  });

  return null;
};

export const GetBlockTool = () => {
  useWebMCP({
    description:
      "Get the data schema and installation command for a specific PDF template. Use this to understand what data fields are needed to populate the template.",
    execute: ({ name }: { name: string }) => {
      const block = BLOCKS.find((b) => b.name === name);
      if (!block) {
        throw new Error(
          `Unknown block: ${name}. Available: ${BLOCKS.map((b) => b.name).join(", ")}`
        );
      }
      const schema = BLOCK_SCHEMAS[name] ?? null;
      return { ...block, dataSchema: schema, docsUrl: `/docs/blocks#${name}` };
    },
    inputSchema: {
      properties: {
        name: {
          description: "Template name (e.g. invoice-classic, report-marketing)",
          type: "string",
        },
      },
      required: ["name"],
      type: "object",
    },
    name: `${SITE.NAME}_get_block`,
  });

  return null;
};

export const PreviewBlockTool = () => {
  useWebMCP({
    description:
      "Open a PDF preview for a template in a new browser tab. The preview uses sample data and the current theme.",
    execute: ({ name, base = "takumi" }: { name: string; base?: string }) => {
      const block = BLOCKS.find((b) => b.name === name);
      if (!block) {
        throw new Error(`Unknown block: ${name}`);
      }
      const url = `/api/pdf/${base}?name=${name}`;
      window.open(url, "_blank");
      return { base, block: name, ok: true, url };
    },
    inputSchema: {
      properties: {
        base: {
          description: "PDF rendering engine (default: takumi)",
          enum: ["takumi", "forme"],
          type: "string",
        },
        name: {
          description: "Template name (e.g. invoice-classic)",
          type: "string",
        },
      },
      required: ["name"],
      type: "object",
    },
    name: `${SITE.NAME}_preview_block`,
  });

  return null;
};
