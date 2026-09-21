"use client";

import { useWebMCP } from "use-webmcp-tool";

import { useLocalizedHref } from "@/components/link";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

const DOC_PAGES = [
  {
    description: "Overview of pdfcn and its features",
    path: ROUTES.DOCS,
    title: "Introduction",
  },
  {
    description: "How to install and set up pdfcn",
    path: ROUTES.DOCS_INSTALLATION,
    title: "Installation",
  },
  {
    description: "Browse all PDF components",
    path: ROUTES.DOCS_COMPONENTS,
    title: "Components",
  },
  {
    description: "Pre-built document templates (invoices, reports)",
    path: ROUTES.DOCS_BLOCKS,
    title: "Blocks",
  },
  {
    description: "How to customize PDF themes",
    path: ROUTES.DOCS_THEMING,
    title: "Theming",
  },
  {
    description: "Built-in theme gallery",
    path: ROUTES.DOCS_THEMES,
    title: "Theme Presets",
  },
  {
    description: "Using pdfcn with MCP servers",
    path: ROUTES.DOCS_MCP,
    title: "MCP Integration",
  },
  {
    description: "shadcn registry format and usage",
    path: ROUTES.DOCS_REGISTRY,
    title: "Registry",
  },
  {
    description: "Recent updates and releases",
    path: ROUTES.DOCS_CHANGELOG,
    title: "Changelog",
  },
  {
    description: "LLM-friendly documentation index",
    path: ROUTES.LLMS,
    title: "llms.txt",
  },
];

export const OpenDocsTool = () => {
  const localizeHref = useLocalizedHref();

  useWebMCP({
    description:
      "Navigate to a pdfcn documentation page. Use this to learn about components, theming, installation, or any other topic.",
    execute: ({ path }: { path?: string }) => {
      const target = localizeHref(path || ROUTES.DOCS);
      window.location.assign(target);
      return { ok: true, path: target };
    },
    inputSchema: {
      properties: {
        path: {
          description:
            "Documentation path (e.g. /docs/installation, /docs/components). If omitted, opens the main docs page.",
          type: "string",
        },
      },
      type: "object",
    },
    name: `${SITE.NAME}_open_docs`,
  });

  return null;
};

export const ListDocsTool = () => {
  useWebMCP({
    annotations: {
      readOnlyHint: true,
    },
    description:
      "List all available documentation pages with their paths and descriptions. Use this to discover what documentation is available.",
    execute: () => DOC_PAGES,
    inputSchema: {
      properties: {},
      type: "object",
    },
    name: `${SITE.NAME}_list_docs`,
  });

  return null;
};

export const GetInstallCommandTool = () => {
  useWebMCP({
    annotations: {
      readOnlyHint: true,
    },
    description:
      "Get the npx shadcn add command to install a specific pdfcn component or block into the user's project.",
    execute: ({ component }: { component: string }) => {
      const registryUrl = `https://pdfcn.vercel.app/r/${component}.json`;
      const command = `npx shadcn@latest add "${registryUrl}"`;
      return {
        command,
        component,
        docsUrl: ROUTES.DOCS_INSTALLATION,
        registryUrl,
      };
    },
    inputSchema: {
      properties: {
        component: {
          description:
            "Component or block name (e.g. takumi/text, forme/invoice-classic)",
          type: "string",
        },
      },
      required: ["component"],
      type: "object",
    },
    name: `${SITE.NAME}_get_install_command`,
  });

  return null;
};
