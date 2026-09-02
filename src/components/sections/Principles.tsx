"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

export function Principles() {
  const t = useTranslations("luxembourg");
  const items = t.raw("items") as {
    title: string;
    subtitle: string;
    body: string;
  }[];

  return (
    <section
      id="luxembourg"
      className="relative overflow-hidden border-t border-border bg-dark py-24 text-on-dark md:py-32"
    >
      <ParallaxImage src={images.principles} overlay="heavy" />

      <Container className="media-copy relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" variant="fade-right">
            <p className="text-[0.65rem] tracking-[0.28em] text-accent-on-dark uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-3xl tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-on-dark-muted md:text-base">
              {t("body")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/#services" variant="onDark">
                {t("cta")}
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="border-white/30 text-on-dark hover:border-accent-on-dark hover:text-accent-on-dark"
              >
                {t("ctaSecondary")}
              </Button>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-1 lg:col-span-7">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} variant="fade-left">
                <div className="border-t border-white/10 pt-5">
                  <p className="font-display text-4xl text-accent-on-dark md:text-5xl">
                    {item.title}
                  </p>
                  <h3 className="mt-2 text-base font-medium tracking-wide text-on-dark uppercase">
                    {item.subtitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
