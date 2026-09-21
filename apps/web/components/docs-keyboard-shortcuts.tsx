"use client";

import { useRouter } from "next/navigation";
import { addTransitionType, startTransition } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useLocalizedHref } from "@/components/link";
import { useFeedback } from "@/hooks/use-feedback";
import { trackEvent } from "@/lib/events";

export const DocsKeyboardShortcuts = ({
  previous,
  next,
}: {
  previous: string | null;
  next: string | null;
}) => {
  const router = useRouter();
  const localizeHref = useLocalizedHref();
  const playClick = useFeedback({ sound: "click" });

  const navigate = (
    href: string | null,
    direction: "previous" | "next",
    keys: string
  ) => {
    if (href) {
      playClick();
      trackEvent({
        name: "keyboard_shortcut_navigate",
        properties: { direction, keys, path: href },
      });
      startTransition(() => {
        addTransitionType(direction === "next" ? "nav-forward" : "nav-back");
        router.push(localizeHref(href));
      });
    }
  };

  useHotkeys(
    "ArrowRight",
    () => {
      navigate(next, "next", "ArrowRight");
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ArrowLeft",
    () => {
      navigate(previous, "previous", "ArrowLeft");
    },
    { preventDefault: true }
  );

  return null;
};
