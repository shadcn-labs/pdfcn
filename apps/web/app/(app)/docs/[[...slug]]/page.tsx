import { findNeighbour } from "fumadocs-core/page-tree";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsAds } from "@/components/docs-ads";
import {
  DocsBaseSwitcher,
  getDocsBaseSwitcherProps,
} from "@/components/docs-base-switcher";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsKeyboardShortcuts } from "@/components/docs-keyboard-shortcuts";
import { DocsNavLink } from "@/components/docs-nav-link";
import { DocsShareMenu } from "@/components/docs-share-menu";
import { DocsTableOfContents } from "@/components/docs-toc";
import { DocsTocFooter } from "@/components/docs-toc-footer";
import { PageTransition } from "@/components/page-transition";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { formatTitleFromSlug } from "@/lib/docs";
import { getPageMarkdownUrl, source } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { createPageMetadata } from "@/seo/metadata";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = () => source.generateParams();

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;

  return createPageMetadata({
    description: doc.description,
    ogType: "article",
    path: page.url,
    title: doc.title,
  });
};

const buildBreadcrumbs = (
  slugs: string[],
  pageTitle: string,
  pageUrl: string
) => {
  const items: { name: string; path: string }[] = [
    { name: "Home", path: ROUTES.HOME },
  ];

  if (slugs.length === 0) {
    items.push({ name: pageTitle, path: pageUrl });
    return items;
  }

  items.push({ name: "Docs", path: ROUTES.DOCS });

  let currentPath = ROUTES.DOCS;
  for (let i = 0; i < slugs.length - 1; i += 1) {
    currentPath += `/${slugs[i]}`;
    items.push({ name: formatTitleFromSlug(slugs[i]), path: currentPath });
  }

  items.push({ name: pageTitle, path: pageUrl });
  return items;
};

const Page = async (props: { params: Promise<{ slug?: string[] }> }) => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;
  const MdxContent = doc.body;
  const neighbours = findNeighbour(source.pageTree, page.url);
  const markdownUrl = getPageMarkdownUrl(page).url;

  const { links } = doc as { links?: { doc?: string; api?: string } };
  const breadcrumbs = buildBreadcrumbs(params.slug ?? [], doc.title, page.url);
  const baseSwitcher = getDocsBaseSwitcherProps(params.slug);

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <DocsKeyboardShortcuts
        previous={neighbours.previous ? neighbours.previous.url : null}
        next={neighbours.next ? neighbours.next.url : null}
      />

      <PageTransition>
        <div
          data-slot="docs"
          className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="h-(--top-spacing) shrink-0" />
            <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                      {doc.title}
                    </h1>
                    <div className="docs-nav flex items-center gap-2">
                      <div className="hidden sm:block">
                        <DocsCopyPage
                          markdownUrl={markdownUrl}
                          url={absoluteUrl(page.url)}
                        />
                      </div>
                      <div className="ml-auto flex gap-2">
                        <DocsShareMenu
                          title={doc.title}
                          url={absoluteUrl(page.url)}
                        />
                        {neighbours.previous && (
                          <DocsNavLink
                            href={neighbours.previous.url}
                            transitionTypes={["nav-back"]}
                            className="extend-touch-target size-8 md:size-7"
                            tooltip={{
                              icon: <ArrowLeftIcon />,
                              title: "Previous Page",
                            }}
                          >
                            <span className="sr-only">Previous</span>
                          </DocsNavLink>
                        )}
                        {neighbours.next && (
                          <DocsNavLink
                            href={neighbours.next.url}
                            transitionTypes={["nav-forward"]}
                            className="extend-touch-target size-8 md:size-7"
                            tooltip={{
                              icon: <ArrowRightIcon />,
                              title: "Next Page",
                            }}
                          >
                            <span className="sr-only">Next</span>
                          </DocsNavLink>
                        )}
                      </div>
                    </div>
                  </div>
                  {doc.description && (
                    <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                      {doc.description}
                    </p>
                  )}
                </div>
                {links ? (
                  <div className="flex items-center space-x-2 pt-4">
                    {links?.doc && (
                      <Badge asChild variant="secondary">
                        <Link href={links.doc} target="_blank" rel="noreferrer">
                          Docs <ArrowUpRightIcon />
                        </Link>
                      </Badge>
                    )}
                    {links?.api && (
                      <Badge asChild variant="secondary">
                        <Link href={links.api} target="_blank" rel="noreferrer">
                          API Reference <ArrowUpRightIcon />
                        </Link>
                      </Badge>
                    )}
                  </div>
                ) : null}
              </div>
              <DocsAds slot="content" />
              <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0 *:data-[slot=pdf-preview]:first:mt-0">
                {baseSwitcher && (
                  <DocsBaseSwitcher {...baseSwitcher} className="mb-4" />
                )}
                <MdxContent components={mdxComponents} />
              </div>
            </div>
            <div className="mx-auto hidden h-16 w-full max-w-2xl items-center gap-2 px-4 sm:flex md:px-0">
              {neighbours.previous && (
                <DocsNavLink
                  href={neighbours.previous.url}
                  transitionTypes={["nav-back"]}
                  size="sm"
                >
                  {neighbours.previous.name}
                </DocsNavLink>
              )}
              {neighbours.next && (
                <DocsNavLink
                  href={neighbours.next.url}
                  transitionTypes={["nav-forward"]}
                  className="ml-auto"
                  size="sm"
                >
                  {neighbours.next.name}
                </DocsNavLink>
              )}
            </div>
          </div>
          <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--footer-height)+2rem)] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
            <div className="h-(--top-spacing) shrink-0" />
            {doc.toc?.length ? (
              <div className="no-scrollbar overflow-y-auto mx-8 border-b">
                <DocsTableOfContents toc={doc.toc} />
              </div>
            ) : null}
            <DocsTocFooter docId={page.path} className="mx-8" />
            <DocsAds slot="sidebar" className="mx-8 shrink-0" />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Page;
