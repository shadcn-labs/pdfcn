import { getLocalizedUrl } from "intlayer";
import type { Locale } from "intlayer";
import { useIntlayer } from "next-intlayer";

import { BrandContextMenu } from "@/components/brand-context-menu";
import { CommandMenu } from "@/components/command-menu";
import { LabsNav } from "@/components/labs-nav";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { NavItemGithub } from "@/components/nav-item-github";
import { SiteSettings } from "@/components/site-settings";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import { source } from "@/lib/source";

export const SiteHeader = ({ locale }: { locale: string }) => {
  const tree = source.getPageTree(locale);
  const content = useIntlayer("site-header");

  const navItems = [
    { href: ROUTES.DOCS, label: String(content.navDocs) },
    { href: ROUTES.DOCS_COMPONENTS, label: String(content.navComponents) },
    { href: ROUTES.DOCS_BLOCKS, label: String(content.navBlocks) },
    { href: ROUTES.THEME_BUILDER, label: String(content.navThemeBuilder) },
    {
      href: getLocalizedUrl(ROUTES.SPONSOR, locale as Locale),
      label: String(content.navSponsors),
    },
  ];

  return (
    <header
      className="bg-background sticky top-0 z-50 w-full"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="container-wrapper 3xl:fixed:px-0 relative px-6">
        <div className="3xl:fixed:container relative flex h-(--header-height) items-center">
          <MobileNav
            items={navItems}
            tree={tree}
            className="flex lg:hidden mr-2"
          />
          <div className="flex items-center">
            <BrandContextMenu />
            <span className="text-muted-foreground/50 ml-1">/</span>
            <LabsNav />
          </div>
          <MainNav items={navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-1 md:gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu navItems={navItems} tree={tree} />
            </div>
            <Separator
              className="hidden h-5! md:block"
              orientation="vertical"
            />
            <NavItemGithub />
            <Separator
              className="hidden h-5! md:block"
              orientation="vertical"
            />
            <LocaleSwitcher className="hidden md:flex" />
            <Separator
              className="hidden h-5! md:block"
              orientation="vertical"
            />
            <SiteSettings />
          </div>
        </div>
      </div>
    </header>
  );
};
