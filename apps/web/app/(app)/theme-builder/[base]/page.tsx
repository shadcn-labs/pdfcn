import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemeBuilder } from "@/components/theme-builder/theme-builder";
import { BASE_NAMES } from "@/registry/bases";
import type { BaseName } from "@/registry/bases";
import { createPageMetadata } from "@/seo/metadata";

export const dynamicParams = false;

const BASE_COPY: Record<BaseName, string> = {
  forme:
    "Design and export a reusable pdfcn theme with a live PDF preview powered by Forme.",
  pdfme:
    "Design and export a reusable pdfcn theme with a live PDF preview powered by pdfme.",
  takumi:
    "Design and export a reusable pdfcn theme with a live PDF preview powered by Takumi.",
};

interface ThemeBuilderBasePageProps {
  params: Promise<{ base: BaseName }>;
}

export const generateStaticParams = () => BASE_NAMES.map((base) => ({ base }));

export const generateMetadata = async ({
  params,
}: ThemeBuilderBasePageProps): Promise<Metadata> => {
  const { base } = await params;

  return createPageMetadata({
    description: BASE_COPY[base],
    path: `/theme-builder/${base}`,
    title: "Theme Builder",
  });
};

const ThemeBuilderBasePage = async ({ params }: ThemeBuilderBasePageProps) => {
  const { base } = await params;

  if (!BASE_NAMES.includes(base)) {
    notFound();
  }

  return <ThemeBuilder base={base} />;
};

export default ThemeBuilderBasePage;
