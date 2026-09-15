"use client";

import { SquarePenIcon } from "lucide-react";
import { useIntlayer } from "next-intlayer";

import { DiscordIcon, XIcon } from "@/components/icons";
import { GITHUB, LINK } from "@/constants/links";
import { DOCS_DIR } from "@/lib/docs";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export const DocsTocFooter = ({
  docId,
  className,
}: {
  docId: string;
  className?: string;
}) => {
  const content = useIntlayer("docs-toc-footer");

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {docId && (
        <a
          href={`${LINK.GITHUB}/edit/${GITHUB.branch}/${DOCS_DIR}/${docId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors text-[0.8rem] hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
          onClick={() =>
            trackEvent({
              name: "click_edit_page",
              properties: { doc: docId },
            })
          }
        >
          <SquarePenIcon />
          {content.editThisPage}
        </a>
      )}
      <a
        href={LINK.X_SHADCN_LABS}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors text-[0.8rem] hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
      >
        <XIcon />
        {content.followHandle}
      </a>
      <a
        href={LINK.DISCORD}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors text-[0.8rem] hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
      >
        <DiscordIcon />
        {content.joinCommunity}
      </a>
    </div>
  );
};
