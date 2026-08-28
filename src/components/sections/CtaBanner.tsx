"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

export function CtaBanner() {
  const t = useTranslations("cta");
  const site = useTranslations("site");

  return (
    <section className="relative overflow-hidden border-t border-border py-28 text-on-dark md:py-36">
      <ParallaxImage src={images.cta} overlay="heavy" />
      <div className="absolute inset-0 bg-dark/50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(166,137,102,0.28),transparent_58%)]" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center" variant="scale">
          <h2 className="font-display text-4xl tracking-tight md:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base text-on-dark-muted md:text-lg">
            {t("body")}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm tracking-wide text-accent md:text-base">
            {t("audiences")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="onDark">
              {t("button")}
            </Button>
            <Button
              href="/about"
              variant="secondary"
              className="border-white/30 text-on-dark hover:border-accent hover:text-accent"
            >
              {t("secondary")}
            </Button>
            <Button
              href="/#services"
              variant="secondary"
              className="border-white/30 text-on-dark hover:border-accent hover:text-accent"
            >
              {t("tertiary")}
            </Button>
          </div>
          <a
            href={`mailto:${site("email")}`}
            className="mt-8 inline-block text-sm tracking-wide text-on-dark-muted transition-colors hover:text-accent"
          >
            {t("email")}: {site("email")}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
