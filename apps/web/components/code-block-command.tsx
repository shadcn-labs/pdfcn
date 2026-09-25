"use client";

import { useCallback, useMemo } from "react";

import { CopyButton } from "@/components/copy-button";
import { getIconForCommandTab } from "@/components/icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { PackageManager } from "@/hooks/use-package-manager";
import { usePackageManager, useCommandTab } from "@/hooks/use-package-manager";
import type { Event } from "@/lib/events";
import { cn } from "@/lib/utils";

const PROMPT_TEMPLATE = (cmd: string) =>
  `Run \`${cmd}\` in this project to install it with the shadcn CLI. Don't rewrite the files it adds; if the command fails, show me the error.`;

export const CodeBlockCommand = ({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
  className,
  copyEvent = "copy_npm_command",
}: {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
  className?: string;
  copyEvent?: Event["name"];
}) => {
  const [packageManager, setPackageManager] = usePackageManager();
  const [commandTab, setCommandTab] = useCommandTab();

  const commandTabs = useMemo(
    () => ({
      bun: __bun__,
      npm: __npm__,
      pnpm: __pnpm__,
      yarn: __yarn__,
    }),
    [__npm__, __pnpm__, __yarn__, __bun__]
  );

  const isShadcnCommand = useMemo(
    () => __npm__?.startsWith("npx shadcn@latest") ?? false,
    [__npm__]
  );

  const allTabs = useMemo(() => {
    if (!isShadcnCommand) {
      return ["bun", "npm", "pnpm", "yarn"];
    }
    return ["bun", "npm", "pnpm", "yarn", "shadcn", "prompt"];
  }, [isShadcnCommand]);

  const handleCommandTabChange = useCallback(
    (value: string) => {
      if (["bun", "npm", "pnpm", "yarn"].includes(value)) {
        setCommandTab(value as PackageManager);
        setPackageManager(value as PackageManager);
      } else {
        setCommandTab(value as "shadcn" | "prompt");
      }
    },
    [setCommandTab, setPackageManager]
  );

  const shadcnCommand = useMemo(
    () => __npm__?.replace("npx shadcn@latest ", "shadcn ") ?? "",
    [__npm__]
  );

  const promptCommand = useMemo(
    () => (__npm__ ? PROMPT_TEMPLATE(__npm__) : ""),
    [__npm__]
  );

  const copyValue = useMemo(() => {
    if (commandTab === "shadcn") {
      return shadcnCommand;
    }
    if (commandTab === "prompt") {
      return promptCommand;
    }
    return commandTabs[packageManager] || "";
  }, [commandTab, shadcnCommand, promptCommand, commandTabs, packageManager]);

  const copyEventForTab = useMemo(() => {
    if (commandTab === "prompt") {
      return "copy_agent_prompt";
    }
    return copyEvent;
  }, [commandTab, copyEvent]);

  return (
    <div
      className={cn(
        "bg-code text-code-foreground relative overflow-hidden rounded-lg text-sm",
        className
      )}
    >
      <Tabs
        className="gap-0"
        onValueChange={handleCommandTabChange}
        value={commandTab}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <TabsList className="rounded-none bg-transparent p-0 [&_svg]:me-2 [&_svg]:size-4 [&_svg]:text-muted-foreground">
            {getIconForCommandTab(commandTab)}

            {allTabs.map((key) => (
              <TabsTrigger
                key={key}
                className="data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
                sound="tabSwitch"
                value={key}
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(commandTabs).map(([key, value]) => (
            <TabsContent key={key} className="mt-0 px-4 py-3.5" value={key}>
              <pre>
                <code
                  data-slot="code-block"
                  data-language="bash"
                  className="font-mono text-sm/none"
                >
                  <span className="select-none">$ </span>
                  {value}
                </code>
              </pre>
            </TabsContent>
          ))}
          {isShadcnCommand && (
            <>
              <TabsContent
                className="mt-0 px-4 py-3.5"
                value="shadcn"
              >
                <pre>
                  <code
                    data-slot="code-block"
                    data-language="bash"
                    className="font-mono text-sm/none"
                  >
                    <span className="select-none">$ </span>
                    {shadcnCommand}
                  </code>
                </pre>
              </TabsContent>
              <TabsContent className="mt-0 px-4 py-3.5" value="prompt">
                <p className="whitespace-normal text-sm leading-relaxed">
                  {promptCommand}
                </p>
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
      <CopyButton
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        value={copyValue}
        event={copyEventForTab}
      />
    </div>
  );
};
