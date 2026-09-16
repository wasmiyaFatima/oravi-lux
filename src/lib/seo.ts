import type { Metadata } from "next";
import { locales, serviceSlugs, type Locale } from "@/i18n/routing";
import { serviceImages } from "@/lib/images";

/** Production origin — override with NEXT_PUBLIC_SITE_URL when needed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.oravilux.com";

/** Official brand as shown on the site and in SERP titles. */
export const SITE_NAME = "Oravi Lux";

/** Compact/domain form of the same brand (oravilux.com). */
export const SITE_COMPACT_NAME = "OraviLux";

/**
 * Same entity, different spellings people actually type.
 * Do not include "Oravi" alone — that matches a Finnish village.
 */
export const SITE_ALTERNATE_NAMES = [
  SITE_COMPACT_NAME,
  "ORAVI LUX",
  "ORAVILUX",
] as const;

/** Brand query variants for metadata.keywords (Bing still uses this field). */
export const SITE_KEYWORDS = [
  SITE_NAME,
  SITE_COMPACT_NAME,
  "ORAVI LUX",
  "ORAVILUX",
] as const;

/** Only fields consistent across locales (no conflicting or placeholder NAP). */
export const SITE_EMAIL = "contact@oravilux.com";

/** Confirmed public profile ranking for the brand query. */
export const SITE_SAME_AS = [
  "https://www.instagram.com/oravi_lux/",
] as const;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Default share image — real JPEG so Discord/Slack accept the MIME type. */
export const OG_IMAGE_PATH = "/og.jpg";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Square crest used for search favicon, PWA icons, and Organization.logo. */
export const LOGO_PATH = "/icon-512.png";
export const LOGO_WIDTH = 512;
export const LOGO_HEIGHT = 512;

/** Bust Discord/Google favicon caches after replacing the AV monogram. */
export const ICON_VERSION = "crest";

const ogLocaleByLang: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
};

/** BCP 47 tags for `<html lang>` — Luxembourg-focused language variants. */
const htmlLangByLocale: Record<Locale, string> = {
  en: "en-LU",
  fr: "fr-LU",
  de: "de-LU",
};

export type OfferInput = {
  name: string;
  description: string;
  path: string;
};

/** Path without locale prefix. "" = home, "/about", "/services/concierge", … */
export function localizedPath(locale: string, path: string = ""): string {
  const normalized =
    !path || path === "/"
      ? ""
      : path.startsWith("/")
        ? path.replace(/\/$/, "")
        : `/${path.replace(/\/$/, "")}`;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: string, path: string = ""): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

export function htmlLang(locale: string): string {
  return htmlLangByLocale[locale as Locale] ?? locale;
}

export function openGraphLocale(locale: string): string {
  return ogLocaleByLang[locale as Locale] ?? "en_US";
}

export function openGraphAlternateLocales(locale: string): string[] {
  const current = openGraphLocale(locale);
  return locales
    .map((lang) => ogLocaleByLang[lang])
    .filter((code) => code !== current);
}

export function pageAlternates(
  locale: string,
  path: string = "",
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: absoluteUrl(locale, path),
    languages: {
      en: absoluteUrl("en", path),
      fr: absoluteUrl("fr", path),
      de: absoluteUrl("de", path),
      "x-default": absoluteUrl("en", path),
    },
  };
}

export function defaultOgImage(): string {
  return `${SITE_URL}${OG_IMAGE_PATH}`;
}

export function indexableRobots(): NonNullable<Metadata["robots"]> {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

function ogImageObject(url: string, alt: string) {
  return {
    url,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt,
  };
}

export function buildPageMetadata(input: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  /** Homepage already includes the brand in `title`; skip the layout template. */
  absoluteTitle?: boolean;
}): Metadata {
  const alternates = pageAlternates(input.locale, input.path);
  const url = absoluteUrl(input.locale, input.path);
  const image = input.image ?? defaultOgImage();
  const imageAlt = input.imageAlt ?? input.title;
  const imageMeta = ogImageObject(image, imageAlt);

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    keywords: [...SITE_KEYWORDS],
    alternates,
    robots: indexableRobots(),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      url,
      locale: openGraphLocale(input.locale),
      alternateLocale: openGraphAlternateLocales(input.locale),
      images: [imageMeta],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imageMeta],
    },
  };
}

/** Routes included in the XML sitemap (active services only). */
export function sitemapEntries(): {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
  image: string;
}[] {
  const entries: {
    path: string;
    changeFrequency: "weekly" | "monthly";
    priority: number;
    image: string;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1, image: OG_IMAGE_PATH },
    {
      path: "/about",
      changeFrequency: "monthly",
      priority: 0.8,
      image: OG_IMAGE_PATH,
    },
    {
      path: "/contact",
      changeFrequency: "monthly",
      priority: 0.8,
      image: OG_IMAGE_PATH,
    },
  ];

  for (const slug of serviceSlugs) {
    entries.push({
      path: `/services/${slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      image: serviceImages[slug],
    });
  }

  return entries;
}

export function jsonLdGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function organizationJsonLd(input?: {
  locale?: string;
  offers?: OfferInput[];
  description?: string;
}) {
  const locale = input?.locale ?? "en";
  const node: Record<string, unknown> = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: [...SITE_ALTERNATE_NAMES],
    url: SITE_URL,
    sameAs: [...SITE_SAME_AS],
    email: SITE_EMAIL,
    ...(input?.description ? { description: input.description } : {}),
    disambiguatingDescription:
      "Luxury concierge and hospitality company in Luxembourg.",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
    },
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${LOGO_PATH}`,
      width: LOGO_WIDTH,
      height: LOGO_HEIGHT,
    },
    image: defaultOgImage(),
    areaServed: [
      {
        "@type": "Country",
        name: "Luxembourg",
      },
      {
        "@type": "City",
        name: "Luxembourg",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SITE_EMAIL,
      availableLanguage: ["English", "French", "German"],
      url: absoluteUrl(locale, "/contact"),
    },
    knowsLanguage: ["en", "fr", "de"],
  };

  if (input?.offers?.length) {
    node.knowsAbout = input.offers.map((offer) => offer.name);
    node.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: SITE_NAME,
      itemListElement: input.offers.map((offer, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: offer.name,
          description: offer.description,
          url: absoluteUrl(locale, offer.path),
        },
      })),
    };
  }

  return node;
}

export function websiteJsonLd(description?: string) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: [...SITE_ALTERNATE_NAMES],
    ...(description ? { description } : {}),
    inLanguage: locales.map((locale) => htmlLang(locale)),
    publisher: { "@id": ORGANIZATION_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

export function webPageJsonLd(input: {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage";
  image?: string;
}) {
  const url = absoluteUrl(input.locale, input.path);
  const imageUrl = input.image?.startsWith("http")
    ? input.image
    : `${SITE_URL}${input.image ?? OG_IMAGE_PATH}`;
  const node: Record<string, unknown> = {
    "@type": input.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.title,
    description: input.description,
    inLanguage: htmlLang(input.locale),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
    },
  };

  if (input.path) {
    node.breadcrumb = { "@id": `${url}#breadcrumb` };
  }

  return node;
}

export function breadcrumbJsonLd(
  locale: string,
  items: { name: string; path: string }[],
) {
  const pageUrl = absoluteUrl(locale, items.at(-1)?.path ?? "");
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function serviceJsonLd(input: {
  locale: string;
  name: string;
  description: string;
  path: string;
  image: string;
}) {
  const url = absoluteUrl(input.locale, input.path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    url,
    image: `${SITE_URL}${input.image}`,
    serviceType: input.name,
    inLanguage: htmlLang(input.locale),
    provider: { "@id": ORGANIZATION_ID },
    availableLanguage: ["English", "French", "German"],
    areaServed: [
      {
        "@type": "Country",
        name: "Luxembourg",
      },
      {
        "@type": "City",
        name: "Luxembourg",
      },
    ],
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };
}

export function itemListJsonLd(
  locale: string,
  items: { name: string; path: string }[],
) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(locale, item.path),
    })),
  };
}
