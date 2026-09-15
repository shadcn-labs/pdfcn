"use client";

import { EllipsisIcon, LinkIcon } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";

import type { ShareIconHandle } from "@/components/animated-icons/share";
import { ShareIcon } from "@/components/animated-icons/share";
import { XIcon, LinkedInIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export const DocsShareMenu = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => {
  const shareIconRef = useRef<ShareIconHandle>(null);
  const content = useIntlayer("docs-share-menu");
  const { copyToClipboard } = useCopyToClipboard();

  const absoluteUrl = useMemo(() => {
    if (url.startsWith("http")) {
      return url;
    }
    if (typeof window !== "undefined") {
      return new URL(url, window.location.origin).toString();
    }
    return url;
  }, [url]);

  const handleMouseEnter = useCallback(() => {
    shareIconRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    shareIconRef.current?.stopAnimation();
  }, []);

  const urlEncoded = encodeURIComponent(absoluteUrl);

  return (
    <DropdownMenu sounds>
      <DropdownMenuTrigger asChild>
        <Button
          className="hidden sm:flex size-7 border-none active:scale-none"
          variant="secondary"
          size="icon-sm"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ShareIcon ref={shareIconRef} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-fit"
        alignOffset={-6}
        collisionPadding={8}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem
          sound="copy"
          onClick={() => {
            copyToClipboard(absoluteUrl);
            toast.success(String(content.linkCopied));
          }}
        >
          <LinkIcon />
          {content.copyLink}
        </DropdownMenuItem>

        <DropdownMenuItem asChild sound="click">
          <a
            href={`https://x.com/intent/tweet?url=${urlEncoded}`}
            target="_blank"
            rel="noopener"
          >
            <XIcon />
            {content.shareOnX}
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild sound="click">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite?url=${urlEncoded}`}
            target="_blank"
            rel="noopener"
          >
            <LinkedInIcon />
            {content.shareOnLinkedIn}
          </a>
        </DropdownMenuItem>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <DropdownMenuItem
            sound="click"
            onClick={(e) => {
              e.preventDefault();
              navigator.share({ title, url: absoluteUrl });
            }}
          >
            <EllipsisIcon />
            {content.otherApp}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
