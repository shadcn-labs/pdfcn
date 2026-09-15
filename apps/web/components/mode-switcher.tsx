"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { useTheme } from "next-themes";

import { useFeedback } from "@/hooks/use-feedback";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { icon: MonitorIcon, value: "system" },
  { icon: SunIcon, value: "light" },
  { icon: MoonIcon, value: "dark" },
] as const;

export const ModeSwitcher = () => {
  const content = useIntlayer("mode-switcher");
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();
  const feedbackOn = useFeedback({ sound: "toggleOn" });
  const feedbackOff = useFeedback({ sound: "toggleOff" });

  if (!isMounted) {
    return <div className="flex h-8 w-24" />;
  }

  return (
    <div
      className="inline-flex items-center rounded-full bg-background inset-ring-1 inset-ring-border"
      role="radiogroup"
      aria-label={content.theme}
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            data-active={isActive}
            className={cn(
              "relative flex size-8 items-center justify-center rounded-full text-muted-foreground transition-[color,box-shadow] hover:text-foreground data-[active=true]:text-foreground data-[active=true]:inset-ring-1 data-[active=true]:inset-ring-border [&_svg]:size-4"
            )}
            role="radio"
            aria-checked={isActive}
            aria-label={content.switchToTheme({ value: option.value })}
            onClick={() => {
              if (option.value === "dark") {
                feedbackOff();
              } else {
                feedbackOn();
              }
              setTheme(option.value);
            }}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};
