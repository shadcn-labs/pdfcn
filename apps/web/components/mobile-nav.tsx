"use client";

import type { Root as PageTreeRoot } from "fumadocs-core/page-tree";
import { useIntlayer } from "next-intlayer";
import type { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Link, useLocalizedHref } from "@/components/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TOP_LEVEL_SECTIONS } from "@/constants/nav";
import { ROUTES } from "@/constants/routes";
import { useFeedback } from "@/hooks/use-feedback";
import { getCurrentBase, getTreeGroups } from "@/lib/page-tree";
import { cn } from "@/lib/utils";

const TOP_LEVEL_SECTION_KEYS: Record<
  string,
  | "introduction"
  | "installation"
  | "components"
  | "blocks"
  | "theming"
  | "mcp"
  | "registry"
  | "llmsTxt"
  | "changelog"
> = {
  Blocks: "blocks",
  Changelog: "changelog",
  Components: "components",
  Installation: "installation",
  Introduction: "introduction",
  MCP: "mcp",
  Registry: "registry",
  Theming: "theming",
  "llms.txt": "llmsTxt",
};

const MobileLink = ({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  const localizeHref = useLocalizedHref();
  const playClick = useFeedback({ sound: "click" });

  const handleClick = useCallback(() => {
    playClick();
    router.push(localizeHref(href.toString()));
    onOpenChange?.(false);
  }, [router, localizeHref, href, onOpenChange, playClick]);

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  );
};

const MobileNavGroup = ({
  label,
  pages,
  setOpen,
}: {
  label: React.ReactNode;
  pages: { url: string; name: React.ReactNode }[];
  setOpen: (open: boolean) => void;
}) => {
  if (pages.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="text-muted-foreground text-sm font-medium">{label}</div>
      <div className="flex flex-col gap-3">
        {pages.map((page) => (
          <MobileLink key={page.url} href={page.url} onOpenChange={setOpen}>
            {page.name}
          </MobileLink>
        ))}
      </div>
    </div>
  );
};

export const MobileNav = ({
  items,
  tree,
  className,
}: {
  items: { href: string; label: string }[];
  tree: PageTreeRoot;
  className?: string;
}) => {
  const content = useIntlayer("mobile-nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentBase = getCurrentBase(pathname);
  const treeGroups = useMemo(
    () => getTreeGroups(tree, currentBase),
    [tree, currentBase]
  );

  return (
    <Popover sounds open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">{content.toggleMenu}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">
              {content.menu}
            </div>
            <div className="flex flex-col gap-3">
              <MobileLink href={ROUTES.HOME} onOpenChange={setOpen}>
                {content.home}
              </MobileLink>
              {items.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">
              {content.sections}
            </div>
            <div className="flex flex-col gap-3">
              {TOP_LEVEL_SECTIONS.map(({ name, href }) => (
                <MobileLink key={name} href={href} onOpenChange={setOpen}>
                  {TOP_LEVEL_SECTION_KEYS[name]
                    ? content[TOP_LEVEL_SECTION_KEYS[name]]
                    : name}
                </MobileLink>
              ))}
            </div>
          </div>
          {treeGroups.map((group) => (
            <MobileNavGroup
              key={group.label}
              label={group.label}
              pages={group.pages.map((p) => ({
                name: p.name,
                url: p.url,
              }))}
              setOpen={setOpen}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
