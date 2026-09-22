"use client";

import { useWebMCP } from "use-webmcp-tool";

import { SITE } from "@/constants/site";

const BLOCK_NAMES = [
  "event-ticket",
  "gift-certificate",
  "invoice-classic",
  "invoice-consultant",
  "invoice-corporate",
  "invoice-creative",
  "invoice-minimal",
  "invoice-modern",
  "medical-intake-form",
  "meeting-minutes",
  "packing-slip",
  "press-release",
  "report-financial",
  "report-marketing",
  "report-operations",
  "report-security",
  "shipping-label",
];

export const GeneratePdfTool = () => {
  useWebMCP({
    description:
      "Generate and download a PDF document. Opens the PDF in a new browser tab for viewing or downloading. Uses the template's default sample data.",
    execute: ({ block, base = "takumi" }: { block: string; base?: string }) => {
      if (!BLOCK_NAMES.includes(block)) {
        throw new Error(
          `Unknown block: ${block}. Available: ${BLOCK_NAMES.join(", ")}`
        );
      }
      const url = `/api/pdf/${base}?name=${block}`;
      window.open(url, "_blank");
      return {
        base,
        block,
        message: `Opening ${block} PDF in a new tab using ${base} engine.`,
        ok: true,
        url,
      };
    },
    inputSchema: {
      properties: {
        base: {
          description: "PDF rendering engine (default: takumi)",
          enum: ["takumi", "forme"],
          type: "string",
        },
        block: {
          description:
            "The document template to generate (e.g. invoice-classic)",
          enum: BLOCK_NAMES,
          type: "string",
        },
      },
      required: ["block"],
      type: "object",
    },
    name: `${SITE.NAME}_generate_pdf`,
  });

  return null;
};
