import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

/** Full service catalogue, including offerings paused until they are provided again */
export const allServiceSlugs = [
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

export type ServiceSlug = (typeof allServiceSlugs)[number];

/**
 * Hidden for now: not currently offered.
 * To restore a service later, remove its slug from this list.
 * - relocation: Relocation Services
 * - property: Property & Lifestyle
 */
export const pausedServiceSlugs = [
  "relocation",
  "property",
] as const satisfies readonly ServiceSlug[];

const paused = new Set<string>(pausedServiceSlugs);

/** Public services shown in nav, footer, grid, and generated pages */
export const serviceSlugs = allServiceSlugs.filter((slug) => !paused.has(slug));
