"use client";

import { getLocaleName, getLocalizedUrl } from "intlayer";
import { CheckIcon, ChevronDownIcon, LanguagesIcon } from "lucide-react";
import { useIntlayer, useLocale, useLocaleStorage } from "next-intlayer";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const LocaleSwitcher = ({
  className,
  variant = "ghost",
}: {
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
}) => {
  const content = useIntlayer("locale-switcher");
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocale } = useLocaleStorage();

  return (
    <DropdownMenu sounds>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          className={cn("gap-1.5", className)}
          aria-label={content.changeLanguage}
        >
          <LanguagesIcon />
          <span>{locale.split("-")[0]}</span>
          <ChevronDownIcon className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="animate-none! rounded-lg shadow-none"
      >
        {availableLocales.map((availableLocale) => (
          <DropdownMenuItem
            asChild
            className={cn(
              "justify-between gap-6",
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
              {availableLocale === locale && (
                <CheckIcon className="size-4 shrink-0" />
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
