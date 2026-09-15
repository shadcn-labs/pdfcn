"use client";

import { useIntlayer } from "next-intlayer";

import { GithubIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LINK } from "@/constants/links";
import { UTM_PARAMS } from "@/constants/site";
import { useFeedback } from "@/hooks/use-feedback";
import { addQueryParams } from "@/lib/url";
import { cn } from "@/lib/utils";

export const GitHubStars = ({
  stargazersCount,
}: {
  stargazersCount: number;
}) => {
  const content = useIntlayer("github-stars");
  const play = useFeedback({ sound: "success" });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
          href={addQueryParams(LINK.GITHUB, UTM_PARAMS.SOURCE)}
          onClick={play}
          rel="noopener"
          target="_blank"
        >
          <GithubIcon className="-translate-y-px" />
          <span className="text-muted-foreground text-xs tabular-nums">
            {new Intl.NumberFormat("en-US", {
              compactDisplay: "short",
              notation: "compact",
            })
              .format(stargazersCount)
              .toLowerCase()}
          </span>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        {new Intl.NumberFormat("en-US").format(stargazersCount)} {content.stars}
      </TooltipContent>
    </Tooltip>
  );
};
