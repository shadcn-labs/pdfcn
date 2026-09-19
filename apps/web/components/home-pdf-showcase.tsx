"use client";

import { ArrowUpRightIcon, CodeXmlIcon, EyeIcon, FileIcon } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CodeBlockCommand } from "@/components/code-block-command";
import { ComponentCode } from "@/components/component-code";
import {
  getHomePdfSource,
  homePdfBases,
  homePdfComponentCatalog,
  homePdfPreviews,
} from "@/components/home-pdf-preview";
import type {
  ComponentPartId,
  HomePdfBase,
  PdfRecipe,
  PdfRecipeId,
} from "@/components/home-pdf-preview";
import { FormeIcon, TakumiIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const PdfPreview = dynamic(
  async () => {
    const mod = await import("@/components/pdf-preview");
    return mod.PdfPreview;
  },
  { ssr: false }
);

type WorkspaceTab = "preview" | "code";

interface HomePdfCodeOutput {
  code: string;
  highlightedCode: string;
}

const codeCache = new Map<string, HomePdfCodeOutput>();
const homePdfBaseIcons: Record<HomePdfBase, typeof TakumiIcon> = {
  forme: FormeIcon,
  takumi: TakumiIcon,
};

const PdfBaseIcon = ({
  base,
  className,
}: {
  base: HomePdfBase;
  className?: string;
}) => {
  const Icon = homePdfBaseIcons[base];
  return <Icon className={className} aria-hidden="true" />;
};

const findPdf = (id: PdfRecipeId): PdfRecipe =>
  homePdfPreviews.find((pdf) => pdf.id === id) ?? homePdfPreviews[0];

const recipeToDemoName: Record<PdfRecipeId, string> = {
  "corporate-invoice": "invoice-corporate",
  "financial-report": "report-financial",
  "minimal-invoice": "invoice-minimal",
};

const CodeViewer = ({
  code,
  error,
  highlightedCode,
  isLoading,
}: {
  code?: string;
  error?: string | null;
  highlightedCode?: string;
  isLoading?: boolean;
}) => (
  <div className="relative h-full min-h-140 bg-code text-code-foreground lg:min-h-0">
    <div className="no-scrollbar min-h-0 flex-1 overflow-auto">
      {isLoading ? (
        <div
          className="flex h-full min-h-72 items-center justify-center text-sm text-code-foreground/60"
          role="status"
        >
          Rendering code…
        </div>
      ) : null}
      {error ? (
        <div
          className="flex h-full min-h-72 items-center justify-center px-6 text-center text-sm text-red-400"
          role="alert"
        >
          {error}
        </div>
      ) : null}
      {highlightedCode && !isLoading ? (
        <ComponentCode
          code={code ?? ""}
          highlightedCode={highlightedCode}
          language="tsx"
          title={undefined}
          className="mt-0"
          copyButtonClassName="right-4"
        />
      ) : null}
    </div>
  </div>
);

export const HomePdfShowcase = () => {
  const content = useIntlayer("home-pdf-showcase");
  const [selectedPdfId, setSelectedPdfId] =
    useState<PdfRecipeId>("corporate-invoice");
  const [selectedComponentId, setSelectedComponentId] =
    useState<ComponentPartId>("page-header");
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>("preview");
  const [pdfBase, setPdfBase] = useState<HomePdfBase>("takumi");
  const [codeRequest, setCodeRequest] = useState<{
    data: HomePdfCodeOutput | null;
    error: string | null;
    isLoading: boolean;
    key: string;
  }>({
    data: null,
    error: null,
    isLoading: false,
    key: "",
  });

  const selectedPdf = findPdf(selectedPdfId);
  const selectedComponent = homePdfComponentCatalog[selectedComponentId];
  const registryItem = `@pdfcn/${pdfBase}/${selectedComponentId}`;
  const codeRequestKey = `${pdfBase}:${selectedPdf.id}:react`;
  const selectedCodeOutput =
    codeRequest.key === codeRequestKey ? codeRequest.data : null;

  useEffect(() => {
    if (workspaceTab !== "code") {
      return;
    }

    const cached = codeCache.get(codeRequestKey);
    if (cached) {
      setCodeRequest({
        data: cached,
        error: null,
        isLoading: false,
        key: codeRequestKey,
      });
      return;
    }

    let cancelled = false;
    const loadCode = async () => {
      setCodeRequest({
        data: null,
        error: null,
        isLoading: true,
        key: codeRequestKey,
      });

      try {
        const code = getHomePdfSource(selectedPdf, pdfBase);
        const { highlightCode } = await import("@/lib/highlight-code");
        const output = {
          code,
          highlightedCode: await highlightCode(code, "tsx"),
        };
        codeCache.set(codeRequestKey, output);

        if (cancelled) {
          return;
        }

        setCodeRequest({
          data: output,
          error: null,
          isLoading: false,
          key: codeRequestKey,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }
        setCodeRequest({
          data: null,
          error:
            error instanceof Error
              ? error.message
              : "Could not render this source.",
          isLoading: false,
          key: codeRequestKey,
        });
      }
    };

    void loadCode();
    return () => {
      cancelled = true;
    };
  }, [codeRequestKey, pdfBase, selectedPdf, workspaceTab]);

  const handlePdfBaseChange = (base: HomePdfBase) => {
    setPdfBase(base);
  };

  const handlePdfChange = (pdfId: PdfRecipeId) => {
    const nextPdf = findPdf(pdfId);
    setSelectedPdfId(pdfId);
    setSelectedComponentId(nextPdf.defaultComponentId);
  };

  const handleComponentChange = (componentId: ComponentPartId) => {
    setSelectedComponentId(componentId);
    setWorkspaceTab("preview");
  };

  return (
    <section className="container-wrapper pb-12 md:pb-16 lg:pb-24">
      <div className="container">
        <Card className="gap-0 overflow-hidden py-0">
          <CardHeader className="block px-0">
            <div className="grid min-h-12 grid-cols-[1fr_minmax(0,auto)_1fr] items-center gap-2 px-3 lg:gap-3 lg:px-4">
              <div
                className="col-start-1 row-start-1 hidden justify-self-start gap-1.5 lg:flex"
                aria-hidden="true"
              >
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <h2
                className="col-start-2 row-start-1 flex min-w-0 max-w-[70vw] items-center justify-self-center gap-2 px-2 text-sm font-medium text-muted-foreground lg:max-w-full"
                title={selectedPdf.filename}
              >
                <FileIcon className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{selectedPdf.filename}</span>
              </h2>

              <div
                className="col-start-3 row-start-1 hidden justify-self-end rounded-lg bg-muted p-0.5 lg:flex"
                role="radiogroup"
                aria-label={content.pdfBase}
              >
                {homePdfBases.map((base) => (
                  <Toggle
                    key={base.id}
                    size="sm"
                    pressed={pdfBase === base.id}
                    onPressedChange={() => handlePdfBaseChange(base.id)}
                    aria-label={base.label}
                    className="h-7 gap-1.5 border border-transparent px-2 text-xs data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm data-[state=on]:hover:bg-background data-[state=on]:hover:text-foreground dark:data-[state=on]:border-input dark:data-[state=on]:bg-input/30 dark:data-[state=on]:hover:bg-input/30"
                  >
                    <PdfBaseIcon base={base.id} className="size-3.5" />
                    {base.label}
                  </Toggle>
                ))}
              </div>
            </div>

            <Separator className="lg:hidden" />

            <div className="flex h-12 items-center justify-between gap-3 px-3 lg:hidden">
              <label
                htmlFor="home-pdf-base"
                className="text-sm font-medium text-muted-foreground"
              >
                {content.chooseBase}
              </label>
              <Select
                value={pdfBase}
                onValueChange={(value) =>
                  handlePdfBaseChange(value as HomePdfBase)
                }
              >
                <SelectTrigger
                  id="home-pdf-base"
                  size="sm"
                  aria-label={content.chooseBase}
                  className="w-40 min-w-0 sm:w-48"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  {homePdfBases.map((base) => (
                    <SelectItem key={base.id} value={base.id}>
                      {base.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="p-0 lg:grid lg:h-180 lg:grid-cols-[14rem_minmax(0,1fr)_20rem]">
            <aside
              aria-label={content.pdfExamples}
              className="hidden flex-col bg-card lg:flex lg:border-r"
            >
              <div className="flex h-12 shrink-0 items-center px-4">
                <CardTitle className="text-sm">{content.documents}</CardTitle>
              </div>
              <Separator />

              <div className="no-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto p-2">
                {homePdfPreviews.map((pdf) => {
                  const isSelected = selectedPdfId === pdf.id;

                  return (
                    <Button
                      key={pdf.id}
                      type="button"
                      variant="ghost"
                      size="sm"
                      sound="click"
                      aria-pressed={isSelected}
                      className={cn(
                        "h-9 justify-start border px-2 text-left",
                        isSelected
                          ? "border-border bg-muted text-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted"
                          : "border-transparent text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      )}
                      onClick={() => handlePdfChange(pdf.id)}
                    >
                      <span className="truncate">{pdf.name}</span>
                    </Button>
                  );
                })}
              </div>
            </aside>

            <Tabs
              value={workspaceTab}
              onValueChange={(value) => setWorkspaceTab(value as WorkspaceTab)}
              className="min-w-0 gap-0 lg:h-full"
            >
              <div className="flex h-12 shrink-0 items-center justify-between gap-3 bg-card px-3 lg:hidden">
                <label
                  htmlFor="home-pdf-template"
                  className="text-sm font-medium text-muted-foreground"
                >
                  {content.chooseTemplate}
                </label>
                <Select
                  value={selectedPdfId}
                  onValueChange={(value) =>
                    handlePdfChange(value as PdfRecipeId)
                  }
                >
                  <SelectTrigger
                    id="home-pdf-template"
                    size="sm"
                    aria-label={content.chooseTemplate}
                    className="w-40 min-w-0 sm:w-48"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {homePdfPreviews.map((pdf) => (
                      <SelectItem key={pdf.id} value={pdf.id}>
                        {pdf.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="lg:hidden" />

              <div className="flex h-12 shrink-0 items-center justify-between gap-2 bg-card px-4">
                <TabsList className="h-8 p-0.5">
                  <TabsTrigger
                    value="preview"
                    sound="toggleOn"
                    className="h-7 px-2.5 text-xs"
                  >
                    <EyeIcon className="size-3.5" aria-hidden="true" />
                    {content.preview}
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    sound="toggleOn"
                    className="h-7 px-2.5 text-xs"
                  >
                    <CodeXmlIcon className="size-3.5" aria-hidden="true" />
                    {content.code}
                  </TabsTrigger>
                </TabsList>
              </div>

              <Separator />

              <TabsContent value="preview" className="min-h-0">
                <PdfPreview
                  base={pdfBase}
                  name={recipeToDemoName[selectedPdf.id] ?? selectedPdf.id}
                  className="rounded-none bg-none border-none"
                  height={672}
                />
              </TabsContent>

              <TabsContent value="code" className="min-h-0">
                <CodeViewer
                  code={selectedCodeOutput?.code}
                  highlightedCode={selectedCodeOutput?.highlightedCode}
                  error={
                    codeRequest.key === codeRequestKey
                      ? codeRequest.error
                      : null
                  }
                  isLoading={
                    codeRequest.key === codeRequestKey && codeRequest.isLoading
                  }
                />
              </TabsContent>
            </Tabs>

            <aside
              aria-label={content.componentsInDoc}
              className="no-scrollbar border-t bg-card lg:overflow-y-auto lg:border-t-0 lg:border-l"
            >
              <div className="flex h-12 shrink-0 items-center justify-between gap-3 px-4">
                <CardTitle className="text-sm">
                  {content.componentsUsed}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="font-mono text-muted-foreground"
                >
                  {selectedPdf.componentIds.length}
                </Badge>
              </div>
              <Separator />

              <CardContent className="p-2">
                <div className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
                  {selectedPdf.componentIds.map((componentId, index) => {
                    const part = homePdfComponentCatalog[componentId];
                    const isSelected = selectedComponentId === componentId;

                    return (
                      <Button
                        key={componentId}
                        type="button"
                        variant="ghost"
                        size="sm"
                        sound="click"
                        aria-pressed={isSelected}
                        className={cn(
                          "h-9 min-w-48 justify-start gap-2.5 border px-2 text-left lg:min-w-0",
                          isSelected
                            ? "border-blue-500/40 bg-blue-500/10 text-blue-700 hover:bg-blue-500/10 hover:text-blue-700 dark:text-blue-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
                            : "border-transparent text-muted-foreground hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
                        )}
                        onClick={() => handleComponentChange(componentId)}
                      >
                        <Badge
                          variant="outline"
                          className={cn(
                            "size-6 bg-background px-0 font-mono",
                            isSelected && "border-blue-500/40 text-blue-600"
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </Badge>
                        <span className="min-w-0 flex-1 truncate font-medium">
                          {part.label}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>

              <Separator />

              <CardContent className="p-4" aria-live="polite">
                <h3 className="text-lg font-semibold tracking-tight">
                  <Link
                    href={`${ROUTES.DOCS_COMPONENTS}/${pdfBase}/${selectedComponent.docsPath}`}
                    className="group inline-flex items-center gap-1.5 rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    transitionTypes={["nav-forward"]}
                  >
                    {selectedComponent.label}
                    <ArrowUpRightIcon
                      className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                      aria-hidden="true"
                    />
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {selectedComponent.description}
                </p>

                <CodeBlockCommand
                  __bun__={`bunx --bun shadcn@latest add ${registryItem}`}
                  __npm__={`npx shadcn@latest add ${registryItem}`}
                  __pnpm__={`pnpm dlx shadcn@latest add ${registryItem}`}
                  __yarn__={`yarn shadcn@latest add ${registryItem}`}
                  className="mt-4 border border-border/70 dark:bg-background/60"
                />
              </CardContent>
            </aside>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
