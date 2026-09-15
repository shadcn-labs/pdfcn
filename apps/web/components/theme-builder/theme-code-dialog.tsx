"use client";

import { Check, Copy, Download } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  generateDeltaCode,
  generateThemeCode,
} from "@/lib/theme-builder/generate-code";
import { getRemoteFontFamilies } from "@/lib/theme-builder/preview-fonts";
import { cn } from "@/lib/utils";
import type { PdfcnTheme, ThemePresetName } from "@/registry/themes";

type CodeTab = "delta" | "full";

interface ThemeCodeDialogProps {
  basePreset: ThemePresetName;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  theme: PdfcnTheme;
}

export const ThemeCodeDialog = ({
  basePreset,
  onOpenChange,
  open,
  theme,
}: ThemeCodeDialogProps) => {
  const content = useIntlayer("theme-code-dialog");
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [tab, setTab] = useState<CodeTab>("full");

  const code = useMemo(
    () =>
      tab === "full"
        ? generateThemeCode(theme)
        : generateDeltaCode(theme, basePreset),
    [basePreset, tab, theme]
  );

  const remoteFonts = useMemo(
    () =>
      getRemoteFontFamilies([
        theme.typography.body.fontFamily,
        theme.typography.heading.fontFamily,
      ]),
    [theme.typography.body.fontFamily, theme.typography.heading.fontFamily]
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;

    (async () => {
      const { highlightCode } = await import("@/lib/highlight-code");
      const html = await highlightCode(code, "ts");
      if (!cancelled) {
        setHighlightedCode(html);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code, open]);

  const safeName =
    theme.name
      .trim()
      .toLowerCase()
      .replaceAll(/[^a-z0-9-]+/g, "-") || "custom-theme";

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setCopied(false);
      setTab("full");
    }
    onOpenChange(nextOpen);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success(content.themeCodeCopied);
    } catch {
      toast.error(content.couldNotCopyThemeCode);
    }
  };

  const downloadCode = () => {
    const objectUrl = URL.createObjectURL(
      new Blob([code], { type: "text/typescript;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.download = `${safeName}.ts`;
    link.href = objectUrl;
    link.click();
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent className="flex max-h-[85svh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="border-b p-5 pr-12">
          <DialogTitle>{content.generatedThemeCode}</DialogTitle>
          <DialogDescription>
            {content.copyInto}{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">
              src/lib/{safeName}.ts
            </code>{" "}
            {content.inYourProjectAndPassItToAnyThemedPdfcnDocument}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/40 px-4 py-2">
          <div className="flex overflow-hidden rounded-lg border bg-background">
            <Button
              className={cn(
                "h-7 rounded-none border-0 px-3 text-xs",
                tab === "full"
                  ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                  : "text-muted-foreground"
              )}
              onClick={() => setTab("full")}
              size="sm"
              variant="ghost"
            >
              {content.fullTheme}
            </Button>
            <Button
              className={cn(
                "h-7 rounded-none border-l px-3 text-xs",
                tab === "delta"
                  ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                  : "text-muted-foreground"
              )}
              onClick={() => setTab("delta")}
              size="sm"
              variant="ghost"
            >
              {content.deltaFrom}{" "}
              <span className="capitalize">{basePreset}</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={downloadCode} size="sm" variant="ghost">
              <Download />
              {content.downloadTs}
            </Button>
            <Button onClick={copyCode} size="sm" variant="outline">
              {copied ? <Check /> : <Copy />}
              {copied ? content.copied : content.copy}
            </Button>
          </div>
        </div>
        {tab === "full" && remoteFonts.length > 0 ? (
          <div className="border-b border-amber-500/20 bg-amber-500/10 px-5 py-3">
            <p className="text-[11px] text-amber-900 dark:text-amber-200">
              <strong className="font-semibold">
                {content.productionNote}
              </strong>{" "}
              {content.productionNoteDescription}
            </p>
          </div>
        ) : null}
        <div className="min-h-0 flex-1 overflow-auto bg-code [&_pre]:m-0">
          {highlightedCode ? (
            <div
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
              dir="ltr"
            />
          ) : (
            <pre className="p-5 font-mono text-xs leading-relaxed text-code-foreground">
              <code>{code}</code>
            </pre>
          )}
        </div>
        <div className="border-t bg-muted/20 px-5 py-3">
          <p className="text-[11px] text-muted-foreground">
            <strong className="text-foreground/70">{content.tip}</strong>{" "}
            {content.deltaTip}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
