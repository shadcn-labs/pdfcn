import type { Root } from "fumadocs-core/page-tree";
import { getLocale } from "next-intlayer/server";
import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import type { PageTreeFolder, PageTreePage } from "@/lib/page-tree";
import { getFolderPages } from "@/lib/page-tree";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { DEFAULT_BASE } from "@/registry/bases";

const getFolder = (tree: Root, name: string): PageTreeFolder | undefined => {
  for (const node of tree.children) {
    if (node.type === "folder" && node.name === name) {
      return node;
    }
  }
};

const ComponentGrid = ({
  className,
  pages,
}: {
  className?: string;
  pages: PageTreePage[];
}) => (
  <div
    className={cn(
      "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20",
      className
    )}
  >
    {pages.map((component) => (
      <Link
        className="inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
        href={component.url}
        key={component.$id}
        transitionTypes={["nav-forward"]}
      >
        {component.name}
      </Link>
    ))}
  </div>
);

export const ComponentsList = async ({
  folderName = "Components",
  base = DEFAULT_BASE,
  className,
}: {
  folderName?: string;
  base?: string;
  className?: string;
}) => {
  const locale = await getLocale();
  const folder = getFolder(source.getPageTree(locale), folderName);
  if (!folder) {
    return null;
  }

  const sectionUrl =
    folderName.toLowerCase() === "blocks"
      ? ROUTES.DOCS_BLOCKS
      : ROUTES.DOCS_COMPONENTS;
  const basePages = getFolderPages(folder, base);
  const pages = (
    basePages.length > 0 ? basePages : getFolderPages(folder)
  ).filter(
    (page) => page.url !== sectionUrl && page.url !== `${sectionUrl}/${base}`
  );

  return pages.length > 0 ? (
    <ComponentGrid className={className} pages={pages} />
  ) : null;
};
