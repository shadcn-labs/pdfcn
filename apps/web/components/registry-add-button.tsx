"use client";

import { PlusIcon } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { useMemo, useState } from "react";

import { CodeBlockCommand } from "@/components/code-block-command";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UTM_PARAMS } from "@/constants/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackEvent } from "@/lib/events";
import { addQueryParams } from "@/lib/url";
import { cn } from "@/lib/utils";

const Description = ({ registryName }: { registryName: string }) => {
  const content = useIntlayer("registry-add-button");
  return (
    <>
      {content.runCommandDescription}{" "}
      <a
        className="text-foreground underline underline-offset-4"
        href={addQueryParams("https://ui.shadcn.com/docs/directory", {
          q: registryName,
          ...UTM_PARAMS.SOURCE,
        })}
        target="_blank"
        rel="noopener"
      >
        {registryName}
      </a>{" "}
      {content.addToProject}
    </>
  );
};

export const RegistryAddButton = ({
  children,
  className,
  registry,
  size = "sm",
  variant = "ghost",
  onClick,
  ...props
}: {
  registry: { name: string } | string;
} & Omit<React.ComponentProps<typeof Button>, "children"> & {
    children?: React.ReactNode;
  }) => {
  const content = useIntlayer("registry-add-button");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const registryName = typeof registry === "string" ? registry : registry.name;

  const commands = useMemo(
    () => ({
      bun: `bunx --bun shadcn@latest registry add ${registryName}`,
      npm: `npx shadcn@latest registry add ${registryName}`,
      pnpm: `pnpm dlx shadcn@latest registry add ${registryName}`,
      yarn: `yarn shadcn@latest registry add ${registryName}`,
    }),
    [registryName]
  );

  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackEvent({
      name: "click_registry_add_button",
      properties: {
        registry: registryName,
      },
    });
    onClick?.(e);
  };

  const trigger = (
    <Button
      size={size}
      variant={variant}
      className={cn(className)}
      onClick={handleTriggerClick}
      {...props}
    >
      {children ?? (
        <>
          <PlusIcon />
          <span className="hidden sm:inline">{content.add}</span>
        </>
      )}
    </Button>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen} sounds>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{content.addRegistry}</DrawerTitle>
              <DrawerDescription>
                <Description registryName={registryName} />
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <CodeBlockCommand
                __bun__={commands.bun}
                __npm__={commands.npm}
                __pnpm__={commands.pnpm}
                __yarn__={commands.yarn}
                copyEvent="copy_registry_command"
              />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button size="sm">{content.done}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen} sounds>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{content.addRegistry}</DialogTitle>
              <DialogDescription className="text-balance">
                <Description registryName={registryName} />
              </DialogDescription>
            </DialogHeader>
            <CodeBlockCommand
              __bun__={commands.bun}
              __npm__={commands.npm}
              __pnpm__={commands.pnpm}
              __yarn__={commands.yarn}
              copyEvent="copy_registry_command"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button size="sm">{content.done}</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
