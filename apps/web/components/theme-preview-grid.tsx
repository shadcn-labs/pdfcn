import { Link } from "@/components/link";
import { THEMES } from "@/registry/themes";
import type { RegistryThemeName } from "@/registry/themes";

interface ThemePreviewGridProps {
  themes?: RegistryThemeName[];
  className?: string;
}

export const ThemePreviewGrid = ({
  themes: requestedThemes,
  className,
}: ThemePreviewGridProps) => {
  const slugs = requestedThemes ?? THEMES.map((theme) => theme.name);
  const themes = slugs
    .map((slug) => {
      const theme = THEMES.find((item) => item.name === slug);
      if (!theme) {
        return null;
      }
      return {
        accent: theme.theme.colors.accent,
        foreground: theme.theme.colors.foreground,
        muted: theme.theme.colors.muted,
        name: theme.title,
        primary: theme.theme.colors.primary,
        slug: theme.name,
      };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return (
    <div
      className={`mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20 ${className ?? ""}`}
    >
      {themes.map((theme) => (
        <Link
          key={theme.slug}
          href={`/docs/themes/${theme.slug}`}
          className="inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
          transitionTypes={["nav-forward"]}
        >
          <div className="flex shrink-0 gap-0.5">
            {(["foreground", "primary", "accent", "muted"] as const).map(
              (color) => (
                <div
                  key={color}
                  className="flex h-4 w-2.5 shrink-0 rounded-xs inset-ring-1 inset-ring-foreground/15"
                  style={{ backgroundColor: theme[color] }}
                />
              )
            )}
          </div>
          <span className="truncate">{theme.name}</span>
        </Link>
      ))}
    </div>
  );
};
