import { getIntlayer } from "intlayer";
import { ExternalLink, Heart, Plus, Star } from "lucide-react";
import type { Metadata } from "next";
import { useIntlayer } from "next-intlayer";
import Image from "next/image";

import { ExternalLinkButton } from "@/components/external-link-button";
import { PageTransition } from "@/components/page-transition";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { getStargazers } from "@/lib/github";
import type { Sponsor } from "@/lib/sponsors";
import { tiers } from "@/lib/sponsors";
import { createPageMetadata } from "@/seo/metadata";

const logoClassName =
  "h-8 w-auto opacity-60 transition-opacity group-hover:opacity-100";

const SponsorLogo = ({ sponsor }: { sponsor: Sponsor }) => {
  if (sponsor.logoLight || sponsor.logoDark) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sponsor.logoLight ?? sponsor.logoDark}
          alt={sponsor.name}
          className={`${logoClassName} dark:hidden`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sponsor.logoDark ?? sponsor.logoLight}
          alt={sponsor.name}
          className={`hidden ${logoClassName} dark:block`}
        />
      </>
    );
  }

  if (sponsor.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={sponsor.logo} alt={sponsor.name} className={logoClassName} />
    );
  }

  return (
    <span className="text-sm font-medium text-foreground">{sponsor.name}</span>
  );
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const content = getIntlayer("sponsor-page", locale);

  return createPageMetadata({
    description: content.metadataDescription,
    path: ROUTES.SPONSOR,
    title: content.metadataTitle,
  });
};

const SponsorPage = async () => {
  const stargazers = await getStargazers();
  const content = useIntlayer("sponsor-page");

  return (
    <PageTransition>
      <section className="container-wrapper relative">
        <div className="container max-w-2xl flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl from-foreground via-foreground to-foreground/65 bg-linear-to-b bg-clip-text text-transparent">
            {content.heroTitle}
          </h1>
          <p className="text-base text-muted-foreground text-balance">
            {content.heroDescriptionPrimary}
          </p>
          <p className="text-sm text-muted-foreground text-balance">
            {content.heroDescriptionSecondary}
          </p>
          <p className="text-sm text-muted-foreground text-balance">
            {content.heroDescriptionTertiary}
          </p>
          <ExternalLinkButton
            sound="heart"
            size="lg"
            className="mt-4"
            href={LINK.SPONSOR}
          >
            <Heart />
            {content.sponsorOnGithubLabel}
            <ExternalLink className="size-3.5 opacity-60" />
          </ExternalLinkButton>
        </div>
      </section>

      <section className="container-wrapper relative">
        <div className="container max-w-2xl flex flex-col">
          {tiers.map((tier) => {
            const filled = tier.sponsors.length;
            const empty = tier.slots - filled;

            return (
              <div
                key={tier.name}
                className="flex flex-col gap-3 py-6 first-of-type:pt-0"
              >
                <div
                  className="relative flex items-center justify-center rounded-md px-8 py-2.5"
                  style={{
                    background: tier.colors.bg,
                    boxShadow:
                      "inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.12)",
                  }}
                >
                  {[
                    "left-2.5 top-1/2 -translate-y-1/2",
                    "right-2.5 top-1/2 -translate-y-1/2",
                  ].map((pos) => (
                    <span
                      key={pos}
                      className={`absolute size-2 rounded-full ${pos}`}
                      style={{
                        background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), transparent 50%), ${tier.colors.bg}`,
                        border: "1px solid rgba(0,0,0,0.15)",
                        boxShadow:
                          "inset 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 1px rgba(255,255,255,0.2), 0 1px 1px rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                  <h3
                    className="text-xs font-extrabold uppercase tracking-[0.2em]"
                    style={{ color: tier.colors.text }}
                  >
                    {tier.name}
                  </h3>
                </div>

                <div
                  className="grid gap-2 max-sm:grid-cols-[repeat(1,1fr)]! max-lg:grid-cols-[repeat(2,1fr)]!"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(tier.slots, 4)}, 1fr)`,
                  }}
                >
                  {tier.sponsors.map((sponsor) => (
                    <a
                      key={sponsor.name}
                      href={sponsor.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center rounded-md border p-6 transition-all hover:scale-[1.02]"
                      style={{
                        backgroundColor: tier.colors.slotBg,
                        borderColor: tier.colors.slotBorder,
                      }}
                    >
                      <SponsorLogo sponsor={sponsor} />
                    </a>
                  ))}

                  {Array.from({ length: empty }).map((_, i) => (
                    <a
                      key={`empty-${tier.name}-${i}`}
                      href={LINK.SPONSOR}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-md border border-dashed p-8 transition-all hover:scale-[1.02]"
                      style={{ borderColor: tier.colors.slotBorder }}
                    >
                      <Plus
                        className="size-5"
                        style={{ color: tier.colors.border, opacity: 0.5 }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {stargazers.length > 0 && (
        <section className="container-wrapper relative">
          <div className="container max-w-2xl pt-6">
            <Card className="shadow-none gap-4 py-4">
              <CardHeader className="flex items-center gap-3 px-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-foreground">
                  {content.stargazersLabel}
                </h3>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {stargazers.length}
                </span>
              </CardHeader>
              <CardContent className="flex flex-wrap justify-center gap-0 px-4">
                {stargazers.map((user) => (
                  <a
                    key={user.login}
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={user.login}
                    className="group relative p-1.5 transition-colors hover:bg-accent/50"
                  >
                    <Image
                      src={user.avatar_url}
                      alt={user.login}
                      width={36}
                      height={36}
                      className="rounded-full ring-1 ring-border transition-all group-hover:ring-foreground/30 group-hover:scale-110"
                      unoptimized
                    />
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="container-wrapper relative">
        <div className="container flex flex-col items-center gap-4 py-16 md:py-20 lg:py-24">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-lg font-bold tracking-tight">
              {content.ctaTitle}
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              {content.ctaDescription}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ExternalLinkButton sound="heart" href={LINK.SPONSOR}>
              <Heart />
              {content.becomeSponsorLabel}
            </ExternalLinkButton>
            <ExternalLinkButton
              sound="star"
              variant="outline"
              href={LINK.GITHUB}
            >
              <Star />
              {content.starOnGithubLabel}
            </ExternalLinkButton>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default SponsorPage;
