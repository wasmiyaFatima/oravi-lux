"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { serviceSlugs } from "@/i18n/routing";
import { serviceImages } from "@/lib/images";

export function ServicesGrid() {
  const t = useTranslations("servicesSection");
  const ts = useTranslations("services");

  return (
    <section id="services" className="lux-wash border-t border-border py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-4xl tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {t("body")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/contact" variant="primary">
              {t("cta")}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceSlugs.map((slug, index) => (
            <Reveal key={slug} delay={index * 0.05} variant="scale">
              <Link
                href={`/services/${slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-surface"
              >
                <Image
                  src={serviceImages[slug]}
                  alt={ts(`${slug}.title`)}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-dark/10 transition-opacity duration-500 group-hover:from-dark/95" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <span className="font-display text-4xl text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">
                    {ts(`${slug}.title`)}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/65">
                    {ts(`${slug}.subtitle`)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.22em] text-accent uppercase opacity-0 translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {t("learnMore")}
                    <span aria-hidden className="h-px w-6 bg-accent" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
