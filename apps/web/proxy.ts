import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { intlayerProxy, multipleProxies } from "next-intlayer/proxy";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROUTES } from "@/constants/routes";
import { docsContentRoute, homeContentRoute } from "@/lib/docs";

const { rewrite: rewriteDocs } = rewritePath(
  `${ROUTES.DOCS}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${ROUTES.DOCS}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`
);

const docsMarkdownProxy = (request: NextRequest) => {
  if (
    request.nextUrl.pathname === ROUTES.HOME &&
    (request.method === "GET" || request.method === "HEAD") &&
    isMarkdownPreferred(request)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = homeContentRoute;

    return NextResponse.rewrite(url);
  }

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result2 = rewriteDocs(request.nextUrl.pathname);

    if (result2) {
      return NextResponse.rewrite(new URL(result2, request.nextUrl));
    }
  }

  return NextResponse.next();
};

export default multipleProxies([intlayerProxy, docsMarkdownProxy]);

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
