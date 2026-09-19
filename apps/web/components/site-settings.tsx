"use client";

import { SettingsIcon } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { useState } from "react";

import { HapticsSwitcher } from "@/components/haptics-switcher";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ModeSwitcher } from "@/components/mode-switcher";
import { SoundSwitcher } from "@/components/sound-switcher";
import { Button } from "@/components/ui/button";
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
import { Kbd } from "@/components/ui/kbd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useHapticsToggle } from "@/hooks/use-haptic-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSoundToggle } from "@/hooks/use-sound-toggle";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export const SiteSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const text = useIntlayer("site-settings");

  // Hotkeys must stay mounted outside the popover content.
  useThemeToggle();
  useSoundToggle();
  useHapticsToggle();

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      className="group/settings extend-touch-target size-8"
      aria-label={String(text.settingsAriaLabel)}
    >
      <SettingsIcon />
    </Button>
  );

  const content = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-12 text-sm">{text.theme}</span>
          {!isMobile && <Kbd>D</Kbd>}
        </div>
        <ModeSwitcher />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-12 text-sm">{text.sound}</span>
          {!isMobile && <Kbd>S</Kbd>}
        </div>
        <SoundSwitcher />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-12 text-sm">{text.haptics}</span>
          {!isMobile && <Kbd>H</Kbd>}
        </div>
        <HapticsSwitcher />
      </div>
      {isMobile && (
        <div className="flex items-center justify-between gap-4">
          <span className="w-12 text-sm">{text.language}</span>
          <LocaleSwitcher variant="outline" />
        </div>
      )}
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen} sounds>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{text.settingsTitle}</DrawerTitle>
              <DrawerDescription>
                {text.manageSitePreferences}
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">{content}</div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button size="sm">{text.done}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen} sounds>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-56 p-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-100 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-100 dark:bg-black"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            {content}
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};
