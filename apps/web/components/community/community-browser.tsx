"use client";

import { ArrowUpRight, Calendar, FileText, Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ALL_COMMUNITY_TAGS,
  COMMUNITY_BASES,
  COMMUNITY_SORTS,
  COMMUNITY_TEMPLATES,
  filterCommunityTemplates,
  getDocsUrl,
  getInstallCommand,
  getRelativeTime,
} from "@/lib/community";
import type {
  CommunityBase,
  CommunitySort,
  CommunityTemplate,
} from "@/lib/community";
import { cn } from "@/lib/utils";

const LIKES_KEY = "pdfcn-community-likes";

const readLikedIds = (): string[] => {
  try {
    const raw = localStorage.getItem(LIKES_KEY);

    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const baseBadgeClass: Record<CommunityBase, string> = {
  elements: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  forme: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  pdfme: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  takumi: "bg-sky-500/10 text-sky-600 border-sky-500/20",
};

const TemplatePreview = ({ template }: { template: CommunityTemplate }) => (
  <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-md border bg-gradient-to-br from-muted via-muted/60 to-background">
    <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:20px_20px]" />
    <div className="relative flex flex-col items-center gap-2 p-4 text-center">
      <span className="flex size-10 items-center justify-center rounded-md border bg-background shadow-xs">
        <FileText className="size-5 text-muted-foreground" />
      </span>
      <span className="max-w-[200px] truncate text-xs font-medium text-muted-foreground">
        {template.base}/{template.blockSlug}
      </span>
    </div>
    <Badge
      variant="outline"
      className={cn(
        "absolute top-2 left-2 capitalize",
        baseBadgeClass[template.base]
      )}
    >
      {template.base}
    </Badge>
  </div>
);

const AuthorLine = ({ template }: { template: CommunityTemplate }) => (
  <a
    href={`https://github.com/${template.author.github}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
    onClick={(event) => event.stopPropagation()}
  >
    <Image
      src={`https://github.com/${template.author.github}.png`}
      alt={template.author.github}
      width={20}
      height={20}
      className="rounded-full ring-1 ring-border"
      unoptimized
    />
    <span className="truncate">@{template.author.github}</span>
  </a>
);

export const CommunityBrowser = () => {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | "all">("all");
  const [base, setBase] = useState<CommunityBase | "all">("all");
  const [sort, setSort] = useState<CommunitySort>("newest");
  const [selected, setSelected] = useState<CommunityTemplate | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : readLikedIds()
  );

  const results = useMemo(
    () =>
      filterCommunityTemplates(COMMUNITY_TEMPLATES, {
        base,
        query,
        sort,
        tag,
      }),
    [base, query, sort, tag]
  );

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((liked) => liked !== id)
        : [...prev, id];

      try {
        localStorage.setItem(LIKES_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }

      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search templates..."
              className="pl-9"
              aria-label="Search templates"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={base}
              onValueChange={(value) => setBase(value as CommunityBase | "all")}
            >
              <SelectTrigger className="w-36" aria-label="Filter by base">
                <SelectValue placeholder="Base" />
              </SelectTrigger>
              <SelectContent>
                {COMMUNITY_BASES.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={sort}
              onValueChange={(value) => setSort(value as CommunitySort)}
            >
              <SelectTrigger className="w-32" aria-label="Sort templates">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {COMMUNITY_SORTS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Button
            size="xs"
            variant={tag === "all" ? "default" : "outline"}
            onClick={() => setTag("all")}
          >
            All
          </Button>
          {ALL_COMMUNITY_TAGS.map((communityTag) => (
            <Button
              key={communityTag}
              size="xs"
              variant={tag === communityTag ? "default" : "outline"}
              onClick={() =>
                setTag(tag === communityTag ? "all" : communityTag)
              }
            >
              {communityTag}
            </Button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-16 text-center">
          <p className="text-sm font-medium">No templates found</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try a different search term or clear the tag and base filters.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-2"
            onClick={() => {
              setQuery("");
              setTag("all");
              setBase("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((template) => {
            const liked = likedIds.includes(template.id);

            return (
              <Card
                key={template.id}
                className="cursor-pointer gap-0 overflow-hidden py-0 transition-all hover:scale-[1.01] hover:shadow-md"
                onClick={() => setSelected(template)}
              >
                <div className="p-3 pb-0">
                  <TemplatePreview template={template} />
                </div>
                <CardHeader className="gap-1 px-4 pt-3">
                  <CardTitle className="text-base leading-tight">
                    {template.title}
                  </CardTitle>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1 px-4 pt-2">
                  {template.tags.slice(0, 3).map((templateTag) => (
                    <Badge key={templateTag} variant="secondary">
                      {templateTag}
                    </Badge>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto flex items-center justify-between px-4 py-3">
                  <AuthorLine template={template} />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {getRelativeTime(template.dateAdded)}
                    </span>
                    <button
                      type="button"
                      aria-label={liked ? "Unlike" : "Like"}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleLike(template.id);
                      }}
                      className={cn(
                        "flex items-center gap-1 rounded-md px-1.5 py-1 transition-colors hover:bg-accent",
                        liked && "text-rose-500"
                      )}
                    >
                      <Heart
                        className={cn("size-3.5", liked && "fill-current")}
                      />
                      <span className="tabular-nums">
                        {template.likes + (liked ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <TemplatePreview template={selected} />
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="outline"
                  className={cn("capitalize", baseBadgeClass[selected.base])}
                >
                  {selected.base}
                </Badge>
                {selected.tags.map((templateTag) => (
                  <Badge key={templateTag} variant="secondary">
                    {templateTag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <AuthorLine template={selected} />
                <span className="text-xs text-muted-foreground">
                  Added {getRelativeTime(selected.dateAdded)} ·{" "}
                  {selected.likes + (likedIds.includes(selected.id) ? 1 : 0)}{" "}
                  likes
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 font-mono text-xs">
                <span className="flex-1 truncate">
                  {getInstallCommand(selected)}
                </span>
                <CopyButton value={getInstallCommand(selected)} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link href={getDocsUrl(selected)}>
                    Open in docs
                    <ArrowUpRight />
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => selected && toggleLike(selected.id)}
                >
                  <Heart
                    className={cn(
                      selected &&
                        likedIds.includes(selected.id) &&
                        "fill-current text-rose-500"
                    )}
                  />
                  {selected && likedIds.includes(selected.id)
                    ? "Liked"
                    : "Like"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
