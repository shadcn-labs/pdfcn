"use client";

import { DownloadIcon } from "lucide-react";
import { createElement, useEffect, useRef, useState } from "react";
import takumiWasmUrl from "takumi-pdf/wasm-url";

import { Button } from "@/components/ui/button";
import { replacePreviewImageSources } from "@/examples/preview-assets";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  getPreviewFonts,
  getPreviewFontUrls,
} from "@/lib/theme-builder/preview-fonts";
import { cn } from "@/lib/utils";
import type { BaseName } from "@/registry/bases";
import type { PdfcnTheme } from "@/registry/themes";

const PREVIEW_LOGO_PATH = "/favicon.png";

let takumiWasmReady: Promise<unknown> | undefined;

interface PdfPreviewProps {
  base: BaseName;
  name: string;
  theme?: PdfcnTheme;
  className?: string;
  height?: React.CSSProperties["height"];
  onUrlChange?: (url: string | null) => void;
}

const startTakumi = async (
  initialize: (input: { module_or_path: URL }) => Promise<unknown>
) => {
  try {
    return await initialize({ module_or_path: takumiWasmUrl });
  } catch (error) {
    takumiWasmReady = undefined;
    throw error;
  }
};

const initializeTakumi = (
  initialize: (input: { module_or_path: URL }) => Promise<unknown>
) => {
  takumiWasmReady ??= startTakumi(initialize);

  return takumiWasmReady;
};

const loadTakumiElement = async (name: string, theme?: PdfcnTheme) => {
  if (theme) {
    const { InvoiceClassicDocument } =
      await import("@/registry/bases/takumi/blocks/invoice-classic/invoice-classic");

    return createElement(InvoiceClassicDocument, { theme });
  }

  const { demos } = await import("@/examples/__index__");
  const Demo = demos.takumi[name];
  if (!Demo) {
    throw new Error(`Unknown Takumi demo: ${name}`);
  }

  return createElement(Demo);
};

const loadPreviewLogo = async () => {
  const response = await fetch(PREVIEW_LOGO_PATH);
  if (!response.ok) {
    throw new Error(`Unable to load preview logo (${response.status})`);
  }

  return {
    sources: [
      {
        data: await response.arrayBuffer(),
        src: PREVIEW_LOGO_PATH,
      },
    ],
  };
};

const assertPdfHasPages = (pdfBytes: Uint8Array) => {
  const source = new TextDecoder("latin1").decode(pdfBytes);
  const pageCounts = [...source.matchAll(/\/Count\s+(\d+)/g)].map((match) =>
    Number(match[1])
  );
  if (pageCounts.length > 0 && Math.max(...pageCounts) === 0) {
    throw new Error("PDF renderer returned a document with no pages");
  }
};

export const PdfPreview = ({
  base,
  name,
  theme,
  className,
  height = 640,
  onUrlChange,
}: PdfPreviewProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isHtmlPreview = base === "elements";
  const previewKind = isHtmlPreview ? "HTML" : "PDF";
  const downloadExtension = isHtmlPreview ? "html" : "pdf";

  useEffect(() => {
    let cancelled = false;
    let nextPdfUrl: string | undefined;
    setPdfUrl(null);
    setError(null);
    onUrlChange?.(null);

    (async () => {
      try {
        let pdfBytes: Uint8Array;

        if (base === "takumi") {
          const [
            { default: initialize, render },
            { getTakumiPreviewOptions },
            images,
            element,
          ] = await Promise.all([
            import("takumi-pdf/no-init"),
            import("@/examples/preview-config"),
            loadPreviewLogo(),
            loadTakumiElement(name, theme),
          ]);

          await initializeTakumi(initialize);
          const buffer = await render(element, {
            ...getTakumiPreviewOptions(name),
            fonts: theme
              ? getPreviewFontUrls([
                  theme.typography.body.fontFamily,
                  theme.typography.heading.fontFamily,
                ])
              : undefined,
            images,
          });
          pdfBytes = new Uint8Array(buffer);
        } else if (base === "elements") {
          const [{ demos }, { renderElementsHtml }] = await Promise.all([
            import("@/examples/__index__"),
            import("@/registry/bases/elements/lib/html"),
          ]);
          const Demo = demos.elements[name];
          if (!Demo) {
            throw new Error(`Unknown Elements demo: ${name}`);
          }
          const html = renderElementsHtml(createElement(Demo), {
            title: name,
          });
          nextPdfUrl = URL.createObjectURL(
            new Blob([html], { type: "text/html" })
          );
          if (cancelled) {
            URL.revokeObjectURL(nextPdfUrl);
            return;
          }
          setPdfUrl(nextPdfUrl);
          onUrlChange?.(nextPdfUrl);
          return;
        } else if (theme) {
          const [
            { InvoiceClassicDocument },
            { renderSerializedDoc },
            { serialize },
          ] = await Promise.all([
            import("@/registry/bases/forme/blocks/invoice-classic/invoice-classic"),
            import("@formepdf/core/browser"),
            import("@formepdf/react"),
          ]);

          const document = replacePreviewImageSources(
            serialize(createElement(InvoiceClassicDocument, { theme }))
          );
          const previewFonts = getPreviewFonts([
            theme.typography.body.fontFamily,
            theme.typography.heading.fontFamily,
          ]);
          if (previewFonts.length > 0) {
            document.fonts = [...(document.fonts ?? []), ...previewFonts];
          }
          const buffer = await renderSerializedDoc(
            document as unknown as Record<string, unknown>
          );
          pdfBytes = new Uint8Array(buffer);
        } else {
          const [{ demos }, { renderSerializedDoc }, { serialize }] =
            await Promise.all([
              import("@/examples/__index__"),
              import("@formepdf/core/browser"),
              import("@formepdf/react"),
            ]);
          const Demo = demos.forme[name];
          if (!Demo) {
            throw new Error(`Unknown Forme demo: ${name}`);
          }

          const document = replacePreviewImageSources(
            serialize(createElement(Demo))
          );
          const buffer = await renderSerializedDoc(
            document as unknown as Record<string, unknown>
          );
          pdfBytes = new Uint8Array(buffer);
        }

        assertPdfHasPages(pdfBytes);
        nextPdfUrl = URL.createObjectURL(
          new Blob([pdfBytes as BlobPart], { type: "application/pdf" })
        );
        if (cancelled) {
          URL.revokeObjectURL(nextPdfUrl);
          return;
        }
        setPdfUrl(nextPdfUrl);
        onUrlChange?.(nextPdfUrl);
      } catch (renderError) {
        if (!cancelled) {
          setError(
            renderError instanceof Error
              ? renderError.message
              : "Failed to render PDF"
          );
        }
      }
    })();

    return () => {
      cancelled = true;
      if (nextPdfUrl) {
        URL.revokeObjectURL(nextPdfUrl);
        onUrlChange?.(null);
      }
    };
  }, [base, name, onUrlChange, theme]);

  return (
    <div
      ref={containerRef}
      data-slot="pdf-preview"
      className={cn("overflow-hidden rounded-lg border bg-muted/30", className)}
      style={{ minHeight: height }}
    >
      {error ? (
        <div
          className="flex items-center justify-center p-8 text-sm text-muted-foreground"
          style={{ minHeight: height }}
        >
          {error}
        </div>
      ) : null}
      {!error && !pdfUrl ? (
        <div
          className="flex items-center justify-center p-8 text-sm text-muted-foreground"
          style={{ minHeight: height }}
        >
          {`Rendering ${previewKind}…`}
        </div>
      ) : null}
      {pdfUrl && isMobile ? (
        <div
          className="flex flex-col items-center justify-center gap-4 bg-muted/10 p-6"
          style={{ minHeight: height }}
        >
          <p className="text-sm text-muted-foreground text-center">
            {`${previewKind} preview is optimized for larger screens.`}
          </p>
          <Button asChild>
            <a href={pdfUrl} download={`${name}.${downloadExtension}`}>
              <DownloadIcon />
              {`Download ${previewKind}`}
            </a>
          </Button>
        </div>
      ) : null}
      {pdfUrl && !isMobile ? (
        <iframe
          className="block w-full bg-background"
          src={isHtmlPreview ? pdfUrl : `${pdfUrl}#toolbar=1&navpanes=0`}
          style={{ height }}
          title={`${name} ${previewKind} preview`}
        />
      ) : null}
    </div>
  );
};
