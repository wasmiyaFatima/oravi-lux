import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

/** Matches Oravi Lux English marketing deck services */
export const serviceSlugs = [
  "concierge",
  "corporate-concierge",
  "relocation",
  "hospitality",
  "personal-assistance",
  "executive-family-office",
  "luxury-travel",
  "events",
  "property",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
