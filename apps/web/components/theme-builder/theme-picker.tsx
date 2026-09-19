"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { THEMES } from "@/registry/themes";
import type { ThemePresetName } from "@/registry/themes";
import type { ColorTokens } from "@/registry/types/pdf-themes";

const THEME_PALETTE_KEYS = [
  "primary",
  "accent",
  "muted",
  "background",
] as const;

type ThemeColors = Pick<ColorTokens, (typeof THEME_PALETTE_KEYS)[number]>;

const ThemePalette = ({ colors }: { colors?: ThemeColors }) => (
  <div className="flex shrink-0 gap-1">
    {THEME_PALETTE_KEYS.map((key) => (
      <div
        key={key}
        className="h-4 w-2.5 shrink-0 rounded-xs ring-1 ring-foreground/10"
        style={{ backgroundColor: colors?.[key] ?? `var(--${key})` }}
      />
    ))}
  </div>
);

// const SHADCN_THEMES: { name: string; title: string; colors: ThemeColors }[] = [
//   {
//     colors: {
//       accent: "#f5f5f5",
//       background: "#ffffff",
//       muted: "#f5f5f5",
//       primary: "#171717",
//     },
//     name: "default",
//     title: "Default",
//   },
//   {
//     colors: {
//       accent: "#dbeafe",
//       background: "#ffffff",
//       muted: "#f1f5f9",
//       primary: "#1d4ed8",
//     },
//     name: "blue",
//     title: "Blue",
//   },
//   {
//     colors: {
//       accent: "#dcfce7",
//       background: "#ffffff",
//       muted: "#f0fdf4",
//       primary: "#15803d",
//     },
//     name: "green",
//     title: "Green",
//   },
//   {
//     colors: {
//       accent: "#f5f5f5",
//       background: "#ffffff",
//       muted: "#f5f5f5",
//       primary: "#171717",
//     },
//     name: "neutral",
//     title: "Neutral",
//   },
//   {
//     colors: {
//       accent: "#f5f5f4",
//       background: "#ffffff",
//       muted: "#f5f5f4",
//       primary: "#1c1917",
//     },
//     name: "stone",
//     title: "Stone",
//   },
//   {
//     colors: {
//       accent: "#f4f4f5",
//       background: "#ffffff",
//       muted: "#f4f4f5",
//       primary: "#18181b",
//     },
//     name: "zinc",
//     title: "Zinc",
//   },
//   {
//     colors: {
//       accent: "#f1f5f9",
//       background: "#ffffff",
//       muted: "#f1f5f9",
//       primary: "#0f172a",
//     },
//     name: "slate",
//     title: "Slate",
//   },
//   {
//     colors: {
//       accent: "#f3f4f6",
//       background: "#ffffff",
//       muted: "#f3f4f6",
//       primary: "#111827",
//     },
//     name: "gray",
//     title: "Gray",
//   },
// ];

// const TWEAKCN_THEMES: { name: string; title: string; colors: ThemeColors }[] = [
//   {
//     colors: {
//       accent: "#caf0f8",
//       background: "#ffffff",
//       muted: "#f0f8ff",
//       primary: "#0077b6",
//     },
//     name: "ocean",
//     title: "Ocean",
//   },
//   {
//     colors: {
//       accent: "#d8f3dc",
//       background: "#ffffff",
//       muted: "#f0fdf4",
//       primary: "#2d6a4f",
//     },
//     name: "forest",
//     title: "Forest",
//   },
//   {
//     colors: {
//       accent: "#ffedd8",
//       background: "#ffffff",
//       muted: "#fff7ed",
//       primary: "#e85d04",
//     },
//     name: "sunset",
//     title: "Sunset",
//   },
//   {
//     colors: {
//       accent: "#ede9fe",
//       background: "#ffffff",
//       muted: "#f5f3ff",
//       primary: "#7c3aed",
//     },
//     name: "lavender",
//     title: "Lavender",
//   },
//   {
//     colors: {
//       accent: "#ffe4e6",
//       background: "#ffffff",
//       muted: "#fff1f2",
//       primary: "#e11d48",
//     },
//     name: "rose",
//     title: "Rose",
//   },
//   {
//     colors: {
//       accent: "#fef3c7",
//       background: "#ffffff",
//       muted: "#fffbeb",
//       primary: "#d97706",
//     },
//     name: "amber",
//     title: "Amber",
//   },
// ];

interface ThemePickerProps {
  onThemeSelect: (name: ThemePresetName) => void;
  selectedTheme: ThemePresetName;
}

export const ThemePicker = ({
  onThemeSelect,
  selectedTheme,
}: ThemePickerProps) => {
  const content = useIntlayer("theme-picker");
  const [open, setOpen] = useState(false);

  const selectedThemeData = useMemo(
    () => THEMES.find((t) => t.name === selectedTheme),
    [selectedTheme]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 justify-start gap-2 px-2"
          aria-label={content.selectTheme}
        >
          <ThemePalette colors={selectedThemeData?.theme.colors} />
          <span className="flex-1 text-left">{selectedThemeData?.title}</span>
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <Command>
          <CommandInput placeholder={content.searchTheme} />
          <CommandList>
            <CommandEmpty>{content.noThemeFound}</CommandEmpty>

            <CommandGroup>
              {THEMES.map(({ name, theme, title }) => (
                <CommandItem
                  key={name}
                  onSelect={() => {
                    onThemeSelect(name);
                    setOpen(false);
                  }}
                >
                  <ThemePalette colors={theme.colors} />
                  <span className="flex-1">{title}</span>
                  {selectedTheme === name && (
                    <CheckIcon className="size-4 shrink-0" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>

            {/* <CommandGroup heading="shadcn/ui Themes">
              {SHADCN_THEMES.map((theme) => (
                <CommandItem key={theme.name} disabled>
                  <ThemePalette colors={theme.colors} />
                  <span className="flex-1">{theme.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="tweakcn Themes">
              {TWEAKCN_THEMES.map((theme) => (
                <CommandItem key={theme.name} disabled>
                  <ThemePalette colors={theme.colors} />
                  <span className="flex-1">{theme.title}</span>
                </CommandItem>
              ))}
            </CommandGroup> */}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
