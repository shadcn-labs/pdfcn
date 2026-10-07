export type CommunityBase = "takumi" | "forme" | "pdfme" | "elements";

export interface CommunityAuthor {
  github: string;
  name?: string;
}

export interface CommunityTemplate {
  base: CommunityBase;
  blockSlug: string;
  dateAdded: string;
  description: string;
  id: string;
  likes: number;
  author: CommunityAuthor;
  sourceUrl?: string;
  tags: string[];
  title: string;
}

export const COMMUNITY_BASES: {
  label: string;
  value: CommunityBase | "all";
}[] = [
  { label: "All bases", value: "all" },
  { label: "Takumi", value: "takumi" },
  { label: "Forme", value: "forme" },
  { label: "pdfme", value: "pdfme" },
  { label: "Elements", value: "elements" },
];

export const COMMUNITY_SORTS = [
  { label: "Newest", value: "newest" },
  { label: "Most liked", value: "liked" },
  { label: "A–Z", value: "az" },
] as const;

export type CommunitySort = (typeof COMMUNITY_SORTS)[number]["value"];

export const COMMUNITY_TEMPLATES: CommunityTemplate[] = [
  {
    author: { github: "MayurK-cmd" },
    base: "takumi",
    blockSlug: "invoice-classic",
    dateAdded: "2026-09-10",
    description:
      "Classic invoice document with header, line items, totals, and footer. A solid starting point for billing flows.",
    id: "takumi-invoice-classic",
    likes: 128,
    tags: ["invoice", "billing", "business"],
    title: "Modern Invoice",
  },
  {
    author: { github: "danmolitor" },
    base: "forme",
    blockSlug: "invoice-classic",
    dateAdded: "2026-09-08",
    description:
      "Forme port of the classic invoice block. Same layout, rendered with Forme's WASM layout engine.",
    id: "forme-invoice-classic",
    likes: 96,
    tags: ["invoice", "billing", "business"],
    title: "Classic Invoice (Forme)",
  },
  {
    author: { github: "mdiniz97" },
    base: "takumi",
    blockSlug: "event-ticket",
    dateAdded: "2026-09-12",
    description:
      "Event ticket with QR code, venue details, and seat info. Great for concerts, conferences, and meetups.",
    id: "takumi-event-ticket",
    likes: 84,
    tags: ["ticket", "event", "qr"],
    title: "Event Ticket",
  },
  {
    author: { github: "madanlalit" },
    base: "forme",
    blockSlug: "event-ticket",
    dateAdded: "2026-09-05",
    description:
      "Printable event ticket with scannable QR and compact layout for mobile wallets and print.",
    id: "forme-event-ticket",
    likes: 61,
    tags: ["ticket", "event", "qr"],
    title: "Event Ticket (Forme)",
  },
  {
    author: { github: "mdiniz97" },
    base: "takumi",
    blockSlug: "lesson-plan",
    dateAdded: "2026-09-18",
    description:
      "Weekly lesson plan with objectives, activities, and assessment sections for educators.",
    id: "takumi-lesson-plan",
    likes: 73,
    tags: ["education", "plan", "report"],
    title: "Lesson Plan",
  },
  {
    author: { github: "balhyo-younjisang" },
    base: "forme",
    blockSlug: "work-order",
    dateAdded: "2026-09-15",
    description:
      "Work order sheet with tasks, parts, labor, and signature line for field service teams.",
    id: "forme-work-order",
    likes: 58,
    tags: ["operations", "service", "report"],
    title: "Work Order",
  },
  {
    author: { github: "neutron420" },
    base: "takumi",
    blockSlug: "event-agenda",
    dateAdded: "2026-09-02",
    description:
      "Single-page event agenda with schedule, speakers, and venue notes.",
    id: "takumi-event-agenda",
    likes: 47,
    tags: ["event", "agenda", "schedule"],
    title: "Event Agenda",
  },
  {
    author: { github: "dineshv97" },
    base: "forme",
    blockSlug: "medical-intake-form",
    dateAdded: "2026-08-28",
    description:
      "Medical intake form with patient details, history checkboxes, and consent section.",
    id: "forme-medical-intake-form",
    likes: 52,
    tags: ["form", "medical", "intake"],
    title: "Medical Intake Form",
  },
  {
    author: { github: "MayurK-cmd" },
    base: "takumi",
    blockSlug: "gift-certificate",
    dateAdded: "2026-08-20",
    description:
      "Elegant gift certificate with single-page layout. Perfect for retail and hospitality.",
    id: "takumi-gift-certificate",
    likes: 66,
    tags: ["certificate", "retail", "gift"],
    title: "Gift Certificate",
  },
  {
    author: { github: "danmolitor" },
    base: "takumi",
    blockSlug: "report-financial",
    dateAdded: "2026-08-15",
    description:
      "Financial report with tables, key metrics, and charts-ready sections.",
    id: "takumi-report-financial",
    likes: 91,
    tags: ["report", "finance", "business"],
    title: "Financial Report",
  },
  {
    author: { github: "madanlalit" },
    base: "takumi",
    blockSlug: "shipping-label",
    dateAdded: "2026-08-10",
    description:
      "Compact shipping label with addresses, barcode area, and handling notes.",
    id: "takumi-shipping-label",
    likes: 39,
    tags: ["logistics", "label", "shipping"],
    title: "Shipping Label",
  },
  {
    author: { github: "mdiniz97" },
    base: "forme",
    blockSlug: "packing-slip",
    dateAdded: "2026-08-05",
    description:
      "Packing slip with order lines, quantities, and fulfillment checklist.",
    id: "forme-packing-slip",
    likes: 44,
    tags: ["logistics", "packing", "order"],
    title: "Packing Slip",
  },
];

export const ALL_COMMUNITY_TAGS = [
  ...new Set(COMMUNITY_TEMPLATES.flatMap((t) => t.tags)),
].toSorted();

export const getInstallCommand = (template: CommunityTemplate) =>
  `npx shadcn@latest add @pdfcn/${template.base}/${template.blockSlug}`;

export const getDocsUrl = (template: CommunityTemplate) =>
  `/docs/blocks/${template.base}/${template.blockSlug}`;

export const getRelativeTime = (isoDate: string) => {
  const then = new Date(isoDate).getTime();
  const now = Date.now();
  const diffDays = Math.max(0, Math.round((now - then) / 86_400_000));

  if (diffDays <= 0) {
    return "today";
  }

  if (diffDays === 1) {
    return "yesterday";
  }

  if (diffDays < 30) {
    return `${diffDays} days ago`;
  }

  const months = Math.floor(diffDays / 30);

  if (months < 12) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years = Math.floor(months / 12);

  return years === 1 ? "1 year ago" : `${years} years ago`;
};

export interface CommunityFilters {
  base: CommunityBase | "all";
  query: string;
  sort: CommunitySort;
  tag: string | "all";
}

export const filterCommunityTemplates = (
  templates: CommunityTemplate[],
  filters: CommunityFilters
): CommunityTemplate[] => {
  const query = filters.query.trim().toLowerCase();
  const filtered = templates.filter((template) => {
    if (filters.base !== "all" && template.base !== filters.base) {
      return false;
    }

    if (filters.tag !== "all" && !template.tags.includes(filters.tag)) {
      return false;
    }

    if (!query) {
      return true;
    }

    return (
      template.title.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.author.github.toLowerCase().includes(query) ||
      template.tags.some((tag) => tag.includes(query))
    );
  });

  return filtered.toSorted((a, b) => {
    if (filters.sort === "liked") {
      return b.likes - a.likes;
    }

    if (filters.sort === "az") {
      return a.title.localeCompare(b.title);
    }

    return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
  });
};
