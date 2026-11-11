import { ROUTES } from "./routes";

export interface LabsNavLink {
  href: string;
  name: string;
  description?: string;
}

export const LABS_LATEST = {
  description: "Beautiful transitions, made simple",
  href: "https://transition-kit.space",
  name: "transition-kit",
} as const satisfies LabsNavLink;

export const LABS_REGISTRIES = [
  { href: "https://termcn.dev", name: "termcn" },
  { href: "https://emailcn.run", name: "emailcn" },
  { href: "https://framecn.dev", name: "framecn" },
  { href: "https://ogimagecn.com", name: "ogimagecn" },
  { href: "https://agentcn.run", name: "agentcn" },
  { href: "https://mcpcn.dev", name: "mcpcn" },
  { href: "https://editorcn.vercel.app", name: "editorcn" },
  { href: "https://shadercn.run", name: "shadercn" },
  { href: "https://mdxcn.dev", name: "mdxcn" },
  { href: "https://snapcn.dev", name: "snapcn" },
  { href: "https://www.shadcn-form.com", name: "form-builder" },
  { href: "https://sensory-ui.com", name: "sensory-ui" },
  { href: "https://pinui.xyz", name: "pin-ui" },
] as const satisfies readonly LabsNavLink[];

export const LABS_TEMPLATES = [
  { href: "https://startercn.vercel.app", name: "startercn" },
] as const satisfies readonly LabsNavLink[];

export const LABS_PORTS = [
  { href: "https://shadcn-cssinjs.com", name: "shadcn-cssinjs" },
] as const satisfies readonly LabsNavLink[];

export const LABS_SKILLS = [
  {
    href: "https://skills.sh/shadcn-labs/skills/launch-shadcn-registry",
    name: "launch-shadcn-registry",
  },
  {
    href: "https://skills.sh/shadcn-labs/skills/tailwind-to-stylex",
    name: "tailwind-to-stylex",
  },
  {
    href: "https://skills.sh/shadcn-labs/skills/mastra-file-agents",
    name: "mastra-file-agents",
  },
] as const satisfies readonly LabsNavLink[];

export const LABS_NAV_SECTIONS = [
  { id: "registries", items: LABS_REGISTRIES, title: "Registries" },
  { id: "templates", items: LABS_TEMPLATES, title: "Templates" },
  { id: "ports", items: LABS_PORTS, title: "Ports" },
  { id: "skills", items: LABS_SKILLS, title: "Skills" },
] as const;

export const TOP_LEVEL_SECTIONS = [
  { href: ROUTES.DOCS, name: "Introduction" },
  { href: ROUTES.DOCS_INSTALLATION, name: "Installation" },
  { href: ROUTES.DOCS_COMPONENTS, name: "Components" },
  { href: ROUTES.DOCS_BLOCKS, name: "Blocks" },
  { href: ROUTES.DOCS_THEMING, name: "Theming" },
  { href: ROUTES.DOCS_MCP, name: "MCP" },
  { href: ROUTES.DOCS_REGISTRY, name: "Registry" },
  { href: ROUTES.LLMS, name: "llms.txt" },
  { href: ROUTES.DOCS_CHANGELOG, name: "Changelog" },
];
