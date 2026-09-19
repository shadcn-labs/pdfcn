"use client";

import { useIntlayer } from "next-intlayer";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { PdfInspection } from "./inspect-pdf";
import type { RenderError, RenderSuccess } from "./use-render-worker";

const PdfPreview = ({
  url,
  dimmed,
  content,
}: {
  url: string | undefined;
  dimmed: boolean;
  content: ReturnType<typeof useIntlayer>;
}) => {
  if (!url) {
    return null;
  }
  return (
    <object
      data={url}
      type="application/pdf"
      aria-label={content.renderedPdf}
      className={cn("size-full", dimmed && "opacity-40")}
    >
      <div className="flex h-full items-center justify-center p-6 text-center font-mono text-xs text-muted-foreground">
        <a href={url} target="_blank" rel="noreferrer" className="underline">
          {content.openPdfInNewTab}
        </a>
      </div>
    </object>
  );
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex gap-3 border-b py-1.5 last:border-b-0">
    <span className="w-24 shrink-0 text-muted-foreground">{label}</span>
    <div className="min-w-0 flex-1">{children}</div>
  </div>
);

const DocumentPanel = ({
  inspection,
  content,
}: {
  inspection: PdfInspection;
  content: ReturnType<typeof useIntlayer>;
}) => (
  <div className="h-full overflow-auto bg-muted/20 px-4 py-3 font-mono text-xs">
    <Field label={content.standards}>
      {inspection.standards.length > 0 ? (
        <span className="text-primary">{inspection.standards.join(" · ")}</span>
      ) : (
        <span className="text-muted-foreground">{content.plainPdf}</span>
      )}
    </Field>
    <Field label={content.tagged}>
      {inspection.tagged ? content.yes : content.no}
    </Field>
    <Field label={content.pages}>{inspection.pages}</Field>
    {inspection.title && (
      <Field label={content.title}>{inspection.title}</Field>
    )}
    {inspection.authors && (
      <Field label={content.authors}>{inspection.authors.join(", ")}</Field>
    )}
    {inspection.created && (
      <Field label={content.created}>{inspection.created}</Field>
    )}
    <Field label={content.bookmarks}>
      {inspection.bookmarks.length === 0 ? (
        <span className="text-muted-foreground">{content.none}</span>
      ) : (
        inspection.bookmarks.map((bookmark, index) => (
          <div
            key={`${bookmark.title}-${index}`}
            style={{ paddingLeft: bookmark.depth * 12 }}
            className="truncate"
          >
            {bookmark.title}
          </div>
        ))
      )}
    </Field>
    <Field label={content.attachments}>
      {inspection.attachments.length === 0 ? (
        <span className="text-muted-foreground">{content.none}</span>
      ) : (
        inspection.attachments.map((attachment) => (
          <div key={attachment.name} className="truncate">
            {attachment.name}
            {attachment.description && (
              <span className="text-muted-foreground">
                {" "}
                — {attachment.description}
              </span>
            )}
          </div>
        ))
      )}
    </Field>
  </div>
);

export type PdfView = "preview" | "document";

export const OutputPanel = ({
  lastSuccess,
  error,
  isReady,
  pdfView,
}: {
  lastSuccess: RenderSuccess | undefined;
  error: RenderError | undefined;
  isReady: boolean;
  pdfView: PdfView;
}) => {
  const content = useIntlayer("output-panel");

  if (!lastSuccess && !error) {
    return (
      <div className="flex h-full items-center justify-center gap-2 bg-muted/20 font-mono text-xs text-muted-foreground">
        <div className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        {isReady ? content.rendering : content.loadingWasm}
      </div>
    );
  }

  if (
    lastSuccess?.outputKind === "pdf" &&
    pdfView === "document" &&
    lastSuccess.inspection
  ) {
    return (
      <DocumentPanel inspection={lastSuccess.inspection} content={content} />
    );
  }

  const output =
    lastSuccess &&
    (lastSuccess.outputKind === "pdf" ? (
      <PdfPreview
        url={lastSuccess.outputUrl}
        dimmed={Boolean(error)}
        content={content}
      />
    ) : (
      // eslint-disable-next-line eslint(nextjs/no-img-element) -- Dynamic render output, not static content
      <img
        src={lastSuccess.outputUrl}
        alt={content.renderedOutput}
        className={cn(
          "border max-h-full max-w-full object-contain",
          error && "opacity-40"
        )}
      />
    ));

  return (
    <div className="relative h-full min-w-0 overflow-hidden bg-muted/20">
      {lastSuccess?.outputKind === "pdf" ? (
        <div className="absolute inset-0">{output}</div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {output}
        </div>
      )}
      {error && (
        <div className="absolute inset-x-0 bottom-0 border-t bg-background/95 px-3 py-2 font-mono text-xs">
          <pre className="max-h-40 overflow-auto whitespace-pre-wrap text-muted-foreground">
            {error.message}
          </pre>
        </div>
      )}
    </div>
  );
};
