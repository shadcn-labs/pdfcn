"use client";

import { getLocaleName, getLocalizedUrl } from "intlayer";
import { LanguagesIcon } from "lucide-react";
import { useIntlayer, useLocale, useLocaleStorage } from "next-intlayer";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const LocaleSwitcher = ({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) => {
  const content = useIntlayer("locale-switcher");
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocale } = useLocaleStorage();

  return (
    <DropdownMenu sounds>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size={compact ? "icon-sm" : "sm"}
              className={className}
              aria-label={content.changeLanguage}
            >
              {compact ? (
                <LanguagesIcon className="size-4" />
              ) : (
                <span>{getLocaleName(locale, locale)}</span>
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{getLocaleName(locale, locale)}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        align="end"
        className="animate-none! rounded-lg shadow-none"
      >
        {availableLocales.map((availableLocale) => (
          <DropdownMenuItem
            asChild
            className={cn(
              availableLocale === locale && "font-medium text-foreground"
            )}
            key={availableLocale}
            sound="click"
          >
            <Link
              href={getLocalizedUrl(pathWithoutLocale, availableLocale)}
              hrefLang={availableLocale}
              onClick={() => setLocale(availableLocale)}
            >
              {getLocaleName(availableLocale, availableLocale)}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
