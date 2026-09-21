"use client";

import { useWebMCP } from "use-webmcp-tool";

import { useLocalizedHref } from "@/components/link";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { THEME_NAMES, getTheme, THEMES } from "@/registry/themes";
import type { ThemePresetName } from "@/registry/themes";

const themeSummary = (entry: (typeof THEMES)[number]) => ({
  colors: {
    accent: entry.theme.colors.accent,
    background: entry.theme.colors.background,
    foreground: entry.theme.colors.foreground,
    primary: entry.theme.colors.primary,
  },
  name: entry.name,
  page: entry.theme.page,
  title: entry.title,
  typography: {
    bodyFont: entry.theme.typography.body.fontFamily,
    headingFont: entry.theme.typography.heading.fontFamily,
  },
});

export const ListThemesTool = () => {
  useWebMCP({
    description:
      "List all available PDF themes with their color palettes, typography, and page settings. Use this to discover themes before applying one.",
    execute: () => THEMES.map(themeSummary),
    inputSchema: {
      properties: {
        category: {
          description: "Filter category (currently only 'all' is supported)",
          enum: ["all"],
          type: "string",
        },
      },
      type: "object",
    },
    name: `${SITE.NAME}_list_themes`,
  });

  return null;
};

export const GetThemeTool = () => {
  useWebMCP({
    description:
      "Get the full token details for a specific PDF theme, including all colors, typography, spacing, and page settings.",
    execute: ({ name }: { name: ThemePresetName }) => {
      const entry = getTheme(name);
      if (!entry) {
        throw new Error(`Unknown theme: ${name}`);
      }
      return entry.theme;
    },
    inputSchema: {
      properties: {
        name: {
          description: "The theme preset name to retrieve",
          enum: [...THEME_NAMES],
          type: "string",
        },
      },
      required: ["name"],
      type: "object",
    },
    name: `${SITE.NAME}_get_theme`,
  });

  return null;
};

export const ApplyThemeTool = () => {
  const localizeHref = useLocalizedHref();

  useWebMCP({
    description:
      "Navigate to the Theme Builder with a specific theme pre-loaded. The user can then customize it visually. Returns the URL the browser will navigate to.",
    execute: ({
      name,
      base = "takumi",
    }: {
      name: ThemePresetName;
      base?: string;
    }) => {
      const entry = getTheme(name);
      if (!entry) {
        throw new Error(`Unknown theme: ${name}`);
      }

      const state = JSON.stringify({
        basePreset: name,
        theme: entry.theme,
      });
      const hash = new URLSearchParams({ theme: state }).toString();
      const builderBase =
        base === "forme"
          ? ROUTES.THEME_BUILDER_FORME
          : ROUTES.THEME_BUILDER_TAKUMI;
      const url = localizeHref(`${builderBase}#${hash}`);

      window.location.assign(url);
      return { base, ok: true, theme: name, url };
    },
    inputSchema: {
      properties: {
        base: {
          description: "PDF rendering engine (default: takumi)",
          enum: ["takumi", "forme"],
          type: "string",
        },
        name: {
          description: "The theme preset to apply",
          enum: [...THEME_NAMES],
          type: "string",
        },
      },
      required: ["name"],
      type: "object",
    },
    name: `${SITE.NAME}_apply_theme`,
  });

  return null;
};
