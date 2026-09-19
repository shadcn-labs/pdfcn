import { CommandBox } from "@/components/command-box";
import { HomeCtas } from "@/components/home-ctas";
import { HomePdfShowcase } from "@/components/home-pdf-showcase";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

export const revalidate = false;

const IndexPage = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <PageTransition>
      <section className="container-wrapper relative">
        <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
          <PageHero
            showAnnouncement
            title="Beautiful PDFs, made simple"
            titleClassName="max-w-7xl"
            description={
              <>
                Ready to use, customizable pdf components for React.
                <br className="hidden sm:block" />
                Built on Takumi and Forme. Distributed via shadcn.
              </>
            }
            descriptionClassName="max-w-2xl text-lg sm:text-xl"
          />

          <CommandBox className="mt-4 w-full max-w-xl" />

          <HomeCtas className="mt-4" />
        </div>
      </section>
    </PageTransition>

    <HomePdfShowcase />
  </>
);
export default IndexPage;
