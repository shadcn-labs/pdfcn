import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

import { LINK } from "./constants/links";
import { ROUTES } from "./constants/routes";

const nextConfig: NextConfig = {
  devIndicators: false,
  headers() {
    const link = [
      `<${ROUTES.API_CATALOG}>; rel="api-catalog"`,
      `<${ROUTES.OPENAPI}>; rel="service-desc"`,
      `<${ROUTES.DOCS}>; rel="service-doc"`,
      `<${LINK.SHADCN_MCP_DOCS}>; rel="service-doc"; title="shadcn MCP server"`,
      `<${ROUTES.AGENT_SKILLS_INDEX}>; rel="describedby"`,
    ].join(", ");

    return [{ headers: [{ key: "Link", value: link }], source: ROUTES.HOME }];
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },
  redirects() {
    return [
      {
        destination: ROUTES.SPONSOR,
        permanent: true,
        source: "/sponsor",
      },
      {
        destination: `/:locale${ROUTES.SPONSOR}`,
        permanent: true,
        source: "/:locale/sponsor",
      },
      {
        destination: `${ROUTES.DOCS}.md`,
        permanent: true,
        source: `${ROUTES.DOCS}.mdx`,
      },
      {
        destination: `${ROUTES.DOCS}/:path*.md`,
        permanent: true,
        source: `${ROUTES.DOCS}/:path*.mdx`,
      },
      {
        destination: `${ROUTES.DOCS_THEMING}/takumi`,
        permanent: true,
        source: ROUTES.DOCS_THEMING,
      },
      {
        destination: ROUTES.THEME_BUILDER_TAKUMI,
        permanent: false,
        source: ROUTES.THEME_BUILDER,
      },
    ];
  },
  serverExternalPackages: ["@formepdf/core"],
};

const withMDX = createMDX({});

export default withIntlayer(withMDX(nextConfig));
