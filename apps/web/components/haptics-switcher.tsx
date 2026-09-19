"use client";

import { Vibrate, VibrateOff } from "lucide-react";
import { useIntlayer } from "next-intlayer";

import { useFeedback } from "@/hooks/use-feedback";
import { useHapticsEnabled } from "@/hooks/use-haptic-toggle";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const HAPTICS_OPTIONS = [
  { icon: Vibrate, label: "on", value: true },
  { icon: VibrateOff, label: "off", value: false },
] as const;

export const HapticsSwitcher = () => {
  const content = useIntlayer("haptics-switcher");
  const [value, setValue] = useHapticsEnabled();
  const isMounted = useMounted();
  const feedbackOn = useFeedback({ sound: "toggleOn" });
  const feedbackOff = useFeedback({ sound: "toggleOff" });

  if (!isMounted) {
    return <div className="flex h-8 w-20" />;
  }

  return (
    <div
      className="inline-flex items-center rounded-full bg-background inset-ring-1 inset-ring-border"
      role="radiogroup"
      aria-label={content.haptics}
    >
      {HAPTICS_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = value === option.value;

        return (
          <button
            key={option.label}
            type="button"
            data-active={isActive}
            className={cn(
              "relative flex size-8 items-center justify-center rounded-full text-muted-foreground transition-[color,box-shadow] hover:text-foreground data-[active=true]:text-foreground data-[active=true]:inset-ring-1 data-[active=true]:inset-ring-border [&_svg]:size-4"
            )}
            role="radio"
            aria-checked={isActive}
            aria-label={content.switchHaptics({ label: option.label })}
            onClick={() => {
              if (option.value === value) {
                return;
              }
              if (option.value) {
                feedbackOn();
              } else {
                feedbackOff();
              }
              setValue(option.value);
            }}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};
