import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ExperienceBands } from "@/components/sections/ExperienceBands";
import { Frequent } from "@/components/sections/Frequent";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Packages } from "@/components/sections/Packages";
import { Principles } from "@/components/sections/Principles";
import { Process } from "@/components/sections/Process";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Values } from "@/components/sections/Values";
import { Work } from "@/components/sections/Work";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSlugs } from "@/i18n/routing";
import {
  buildPageMetadata,
  itemListJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
    absoluteTitle: true,
  });
}

/** Homepage follows the Oravi Lux marketing deck */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta");
  const ts = await getTranslations("services");

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({
            locale,
            path: "",
            title: t("title"),
            description: t("description"),
          }),
          itemListJsonLd(
            locale,
            serviceSlugs.map((slug) => ({
              name: ts(`${slug}.title`),
              path: `/services/${slug}`,
            })),
          ),
        ])}
      />
      <Hero />
      <Intro />
      <Principles />
      <ExperienceBands />
      <ServicesGrid />
      <Process />
      <Values />
      <Packages />
      <Frequent />
      <Work />
      <CtaBanner />
    </>
  );
}
