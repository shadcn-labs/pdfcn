"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import type { HTMLMotionProps, Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useIntlayer } from "next-intlayer";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { Event } from "@/lib/events";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export const motionIconVariants: Variants = {
  animate: { filter: "blur(0px)", opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  initial: { filter: "blur(2px)", opacity: 0, scale: 0.8 },
};

export const motionIconProps: HTMLMotionProps<"span"> = {
  animate: "animate",
  exit: "exit",
  initial: "initial",
  transition: { duration: 0.15, ease: "easeOut" },
  variants: motionIconVariants,
};

export interface CopyButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "value"
> {
  value: string | (() => Promise<string> | string);
  src?: string;
  event?: Event["name"];
  showTooltip?: boolean;
}

export const CopyButton = ({
  value,
  className,
  variant = "ghost",
  event,
  children,
  showTooltip = true,
  ...props
}: CopyButtonProps) => {
  const content = useIntlayer("copy-button");

  const getValue = useCallback(() => {
    if (typeof value === "function") {
      return value();
    }

    return value;
  }, [value]);

  const { copyToClipboard, isCopied } = useCopyToClipboard({
    timeout: 1000,
  });

  const handleCopy = useCallback(async () => {
    const text = await getValue();
    const hasCopied = await copyToClipboard(text);

    if (hasCopied && event) {
      trackEvent({
        name: event,
        properties: {
          code: text,
        },
      });
    }
  }, [copyToClipboard, event, getValue]);

  const copyButton = (
    <Button
      data-slot="copy-button"
      size={children ? "sm" : "icon"}
      variant={variant}
      className={cn(
        children
          ? ""
          : "bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100",
        className
      )}
      sound="copy"
      onClick={handleCopy}
      {...props}
    >
      <span className="sr-only">{content.copy}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        {isCopied ? (
          <motion.span key="done" {...motionIconProps}>
            <CheckIcon strokeWidth={3} />
          </motion.span>
        ) : (
          <motion.span key="idle" {...motionIconProps}>
            <CopyIcon />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </Button>
  );

  if (!showTooltip) {
    return copyButton;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{copyButton}</TooltipTrigger>
      <TooltipContent>
        {isCopied ? content.copied : content.copyToClipboard}
      </TooltipContent>
    </Tooltip>
  );
};
