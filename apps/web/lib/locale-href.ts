import { getLocalizedUrl } from "intlayer";

/**
 * Route prefixes served outside the `[locale]` segment (API handlers, registry
 * JSON, MCP endpoint, well-known metadata). Prefixing them with a locale 404s.
 */
const UNLOCALIZED_PREFIXES = ["/api", "/mcp", "/r", "/.well-known", "/_next"];

/**
 * Prefixes an internal app path with the active locale (`prefix-no-default`,
 * so the default locale stays unprefixed). Idempotent: an already localized
 * path is re-localized to the given locale rather than double-prefixed.
 *
 * External URLs, protocol-relative URLs, hashes, query-only hrefs, static
 * files (`/llms.txt`, `/docs/x.md`) and non-localized routes pass through.
 */
export const localizeHref = (href: string, locale: string): string => {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const [path] = href.split(/[?#]/);

  if (
    /\.[a-z0-9]+$/i.test(path) ||
    UNLOCALIZED_PREFIXES.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`)
    )
  ) {
    return href;
  }

  return getLocalizedUrl(href, locale);
};
