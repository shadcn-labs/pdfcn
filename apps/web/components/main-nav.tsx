"use client";

import { useLocale } from "next-intlayer";

import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const MainNav = ({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { href: string; label: string }[];
}) => {
  const { pathWithoutLocale } = useLocale();

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      {items.map((item) => (
        <Button key={item.href} variant="ghost" asChild size="sm" sound="click">
          <Link
            href={item.href}
            className={cn(pathWithoutLocale === item.href && "text-primary")}
            transitionTypes={["nav-forward"]}
          >
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
};
