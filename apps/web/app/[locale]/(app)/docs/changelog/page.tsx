import { RssIcon } from "lucide-react";
import Link from "next/link";

import { DocsTocFooter } from "@/components/docs-toc-footer";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { getChangelogPages } from "@/lib/changelog";
import type { ChangelogPageData } from "@/lib/changelog";
import { mdxComponents } from "@/mdx-components";
import { createPageMetadata } from "@/seo/metadata";

export const revalidate = false;
export const dynamic = "force-static";

const NUMBER_OF_LATEST_PAGES = 5;

export const metadata = createPageMetadata({
  description: "Latest updates and announcements for pdfcn.",
  ogType: "article",
  path: ROUTES.DOCS_CHANGELOG,
  title: "Changelog",
});

export default function ChangelogPage() {
  const pages = getChangelogPages();
  const latestPages = pages.slice(0, NUMBER_OF_LATEST_PAGES);
  const olderPages = pages.slice(NUMBER_OF_LATEST_PAGES);

  return (
    <PageTransition>
      <div
        className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
        data-slot="docs"
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="h-(--top-spacing) shrink-0" />
          <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                  Changelog
                </h1>
                <Button asChild size="sm" variant="secondary">
                  <a
                    href={ROUTES.RSS}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <RssIcon />
                    RSS
                  </a>
                </Button>
              </div>
              <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                Latest updates and announcements for pdfcn.
              </p>
            </div>
            <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
              {latestPages.map((page) => {
                const data = page.data as ChangelogPageData;
                const MDX = page.data.body;

                return (
                  <article className="mb-12 border-b pb-12" key={page.url}>
                    <h2 className="font-heading text-xl font-semibold tracking-tight">
                      {data.title}
                    </h2>
                    <div className="prose-changelog mt-6 *:first:mt-0">
                      <MDX components={mdxComponents} />
                    </div>
                  </article>
                );
              })}
              {olderPages.length > 0 && (
                <div className="mb-24 scroll-mt-24" id="more-updates">
                  <h2 className="mb-6 font-heading text-xl font-semibold tracking-tight">
                    More Updates
                  </h2>
                  <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
                    {olderPages.map((page) => {
                      const data = page.data as ChangelogPageData;
                      const [date, ...titleParts] = data.title.split(" - ");
                      const title = titleParts.join(" - ");

                      return (
                        <Link
                          className="flex w-full flex-col rounded-xl bg-surface px-4 py-3 text-surface-foreground transition-colors hover:bg-surface/80"
                          href={page.url}
                          key={page.url}
                        >
                          <span className="text-xs text-muted-foreground">
                            {date}
                          </span>
                          <span className="text-sm font-medium">{title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--footer-height)+2rem)] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
          <div className="h-(--top-spacing) shrink-0" />
          <div className="no-scrollbar mx-8 overflow-y-auto border-b">
            <div className="flex flex-col gap-2 p-4 pt-0 text-sm">
              <p className="sticky top-0 h-6 bg-background text-xs font-medium text-muted-foreground">
                On This Page
              </p>
              {latestPages.map((page) => {
                const data = page.data as ChangelogPageData;

                return (
                  <Link
                    className="text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground"
                    href={page.url}
                    key={page.url}
                  >
                    {data.title}
                  </Link>
                );
              })}
              {olderPages.length > 0 && (
                <a
                  className="text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground"
                  href="#more-updates"
                >
                  More Updates
                </a>
              )}
            </div>
          </div>
          <DocsTocFooter className="mx-8" docId="" />
        </div>
      </div>
    </PageTransition>
  );
}
