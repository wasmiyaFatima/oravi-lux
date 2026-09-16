import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { SITE_URL, absoluteUrl, sitemapEntries } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = sitemapEntries();
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    entries.map((entry) => ({
      url: absoluteUrl(locale, entry.path),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      images: [`${SITE_URL}${entry.image}`],
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((lang) => [lang, absoluteUrl(lang, entry.path)]),
          ),
          "x-default": absoluteUrl("en", entry.path),
        },
      },
    })),
  );
}
