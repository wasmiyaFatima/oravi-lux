import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  jsonLdGraph,
  webPageJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t("contactTitle"),
    description: t("contactDescription"),
    absoluteTitle: true,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const tn = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({
            locale,
            path: "/contact",
            title: t("title"),
            description: t("subtitle"),
            type: "ContactPage",
          }),
          breadcrumbJsonLd(locale, [
            { name: tn("home"), path: "" },
            { name: tn("contact"), path: "/contact" },
          ]),
        ])}
      />
      <ContactPageContent />
    </>
  );
}
