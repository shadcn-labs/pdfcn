import { Link } from "@/components/link";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { BASE_NAMES, BASES, getBase } from "@/registry/bases";
import type { BaseName } from "@/registry/bases";

// Slug depth at which a page carries the switcher: `theming/<base>` is itself a
// doc, while `components/<base>` and `blocks/<base>` only list that base's items.
const SWITCHER_SLUG_DEPTH: Record<string, number | undefined> = {
  blocks: 3,
  components: 3,
  theming: 2,
};

export const getDocsBaseSwitcherProps = (slug?: string[]) => {
  const [section = "", base = "", ...rest] = slug ?? [];
  const depth = SWITCHER_SLUG_DEPTH[section];

  if (
    !depth ||
    rest.length + 2 < depth ||
    !BASE_NAMES.includes(base as BaseName)
  ) {
    return null;
  }

  return { base, section, slug: rest.join("/") || undefined };
};

export const DocsBaseSwitcher = ({
  base,
  slug,
  section,
  className,
}: {
  base: string;
  slug?: string;
  section: string;
  className?: string;
}) => {
  const activeBase = getBase(base as (typeof BASES)[number]["name"]);

  return (
    <div className={cn("inline-flex w-full items-center gap-6", className)}>
      {BASES.map((baseItem) => (
        <Link
          key={baseItem.name}
          href={`${ROUTES.DOCS}/${section}/${baseItem.name}${slug ? `/${slug}` : ""}`}
          data-active={base === baseItem.name}
          className="relative inline-flex items-center justify-center gap-1 pt-1 pb-0.5 text-base font-medium text-muted-foreground transition-colors after:absolute after:inset-x-0 after:bottom-[-4px] after:h-0.5 after:bg-foreground after:opacity-0 after:transition-opacity hover:text-foreground data-[active=true]:text-foreground data-[active=true]:after:opacity-100"
        >
          {baseItem.title}
        </Link>
      ))}
      {activeBase?.meta?.logo ? (
        <div className="ml-auto shrink-0 text-muted-foreground opacity-80 [&_svg]:h-5 [&_svg]:w-fit">
          <activeBase.meta.logo aria-label={`${activeBase.title} logo`} />
        </div>
      ) : null}
    </div>
  );
};
