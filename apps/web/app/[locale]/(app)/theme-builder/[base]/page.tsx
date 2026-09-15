import { getIntlayer } from "intlayer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemeBuilder } from "@/components/theme-builder/theme-builder";
import { BASE_NAMES } from "@/registry/bases";
import type { BaseName } from "@/registry/bases";
import { createPageMetadata } from "@/seo/metadata";

export const dynamicParams = false;

interface ThemeBuilderBasePageProps {
  params: Promise<{ locale: string; base: BaseName }>;
}

export const generateStaticParams = () => BASE_NAMES.map((base) => ({ base }));

export const generateMetadata = async ({
  params,
}: ThemeBuilderBasePageProps): Promise<Metadata> => {
  const { base, locale } = await params;
  const content = getIntlayer("theme-builder-page", locale);

  return createPageMetadata({
    description:
      base === "forme"
        ? content.metadataDescriptionForme
        : content.metadataDescriptionTakumi,
    path: `/theme-builder/${base}`,
    title: content.metadataTitle,
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
