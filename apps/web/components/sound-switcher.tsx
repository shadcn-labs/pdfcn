"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useIntlayer } from "next-intlayer";

import { useFeedback } from "@/hooks/use-feedback";
import { useMounted } from "@/hooks/use-mounted";
import { useSoundEnabled } from "@/hooks/use-sound-toggle";
import { cn } from "@/lib/utils";

const SOUND_OPTIONS = [
  { icon: Volume2, label: "on", value: true },
  { icon: VolumeX, label: "off", value: false },
] as const;

export const SoundSwitcher = () => {
  const content = useIntlayer("sound-switcher");
  const [value, setValue] = useSoundEnabled();
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
      aria-label={content.sound}
    >
      {SOUND_OPTIONS.map((option) => {
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
            aria-label={content.switchSound({ label: option.label })}
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
