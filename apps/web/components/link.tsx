"use client";

import { useLocale } from "next-intlayer";
import NextLink from "next/link";
import { useCallback } from "react";

import { localizeHref } from "@/lib/locale-href";

/**
 * Returns a stable localizer for imperative navigation (`router.push`) so
 * programmatic routes stay on the active locale.
 */
export const useLocalizedHref = () => {
  const { locale } = useLocale();

  return useCallback((href: string) => localizeHref(href, locale), [locale]);
};

/**
 * `next/link` bound to the active locale: every internal href is rewritten to
 * its locale-prefixed form. Use this instead of `next/link` app-wide.
 */
export const Link = ({
  href,
  ...props
}: React.ComponentProps<typeof NextLink>) => {
  const { locale } = useLocale();

  return (
    <NextLink
      href={typeof href === "string" ? localizeHref(href, locale) : href}
      {...props}
    />
  );
};
