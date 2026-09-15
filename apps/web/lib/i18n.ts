import { defineI18n } from "fumadocs-core/i18n";

/**
 * Fumadocs locale codes mirror the Intlayer locales configured in
 * `intlayer.config.ts`. Locale is resolved by the outer `[locale]` route
 * segment (via next-intlayer), so this config only drives content lookup:
 * `source.getPage(slug, locale)` and `source.getPageTree(locale)`.
 *
 * Uses 'dir' parser: MDX files are grouped by locale subdirectories
 * (e.g., `en/components/alert.mdx`, `es/components/alert.mdx`).
 */
export const i18n = defineI18n({
  defaultLanguage: "en",
  languages: ["en", "zh-CN", "ja", "ko", "es", "fr", "pt"],
  parser: "dir",
});
