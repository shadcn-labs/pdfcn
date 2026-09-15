"use client";

import { useIntlayer } from "next-intlayer";

import { LINK } from "@/constants/links";
import { SITE, UTM_PARAMS } from "@/constants/site";
import { useFeedback } from "@/hooks/use-feedback";
import { addQueryParams } from "@/lib/url";

export const SiteFooter = () => {
  const playClick = useFeedback({ sound: "click" });
  const content = useIntlayer("site-footer");

  return (
    <footer
      className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
            {content.builtBy}{" "}
            <a
              href={addQueryParams(LINK.PORTFOLIO, UTM_PARAMS.SOURCE)}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
              onClick={playClick}
            >
              {SITE.AUTHOR.NAME}
            </a>
            {content.sourceAvailableOn}{" "}
            <a
              href={addQueryParams(LINK.GITHUB, UTM_PARAMS.SOURCE)}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
              onClick={playClick}
            >
              GitHub
            </a>
            {content.trailingPeriod}
          </div>
        </div>
      </div>
    </footer>
  );
};
