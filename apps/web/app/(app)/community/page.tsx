import { ArrowUpRight, FilePlus2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CommunityBrowser } from "@/components/community/community-browser";
import { ExternalLinkButton } from "@/components/external-link-button";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { createPageMetadata } from "@/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  description:
    "Browse and share PDF templates built with pdfcn. Discover invoices, tickets, reports, and more from the community.",
  path: ROUTES.COMMUNITY,
  title: "Community",
});

const SUBMIT_STEPS = [
  {
    description:
      "Fork the repo and add your template as a self-contained block with a preview.",
    title: "1. Build your template",
  },
  {
    description:
      "Include component code, a preview image, and metadata: name, description, author, tags, and base.",
    title: "2. Add metadata",
  },
  {
    description:
      "Open a PR. Maintainers review for quality before merging — no spam, working install command required.",
    title: "3. Open a PR",
  },
] as const;

const CommunityPage = () => (
  <>
    <BreadcrumbJsonLd
      items={[
        { name: "Home", path: ROUTES.HOME },
        { name: "Community", path: ROUTES.COMMUNITY },
      ]}
    />
    <PageTransition>
      <section className="container-wrapper relative">
        <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20">
          <PageHero
            title="Community"
            titleClassName="max-w-3xl"
            description="Browse and share PDF templates built with pdfcn. Discover invoices, receipts, reports, and more from the community."
            descriptionClassName="max-w-2xl text-lg"
          />
        </div>
      </section>

      <section className="container-wrapper relative">
        <div className="container max-w-6xl pb-8">
          <CommunityBrowser />
        </div>
      </section>

      <section className="container-wrapper relative">
        <div className="container max-w-6xl py-12">
          <div className="flex flex-col gap-6 rounded-xl border p-6 md:p-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold tracking-tight">
                Want to share your template?
              </h2>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Templates are submitted as PRs adding a block entry with
                metadata (name, description, author, tags, base) and a preview.
                Popular templates signal which components and blocks need
                improvement.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {SUBMIT_STEPS.map((step) => (
                <div
                  key={step.title}
                  className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-4"
                >
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <ExternalLinkButton href={LINK.GITHUB} sound="click">
                <FilePlus2 />
                Submit a PR
                <ArrowUpRight className="size-3.5 opacity-60" />
              </ExternalLinkButton>
              <Button asChild variant="outline">
                <Link href={ROUTES.DOCS_BLOCKS}>Browse blocks</Link>
              </Button>
            </div>
            <pre className="overflow-x-auto rounded-md border bg-muted/50 p-3 font-mono text-xs">
              {`npx shadcn@latest add @pdfcn/takumi/invoice-classic`}
            </pre>
          </div>
        </div>
      </section>
    </PageTransition>
  </>
);

export default CommunityPage;
