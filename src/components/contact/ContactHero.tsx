"use client";

import { useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";

export function ContactHero() {
  const t = useTranslations("contactPage");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[72dvh] overflow-hidden bg-dark md:min-h-[78dvh]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/woman-laptop.mp4"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="media-scrim-hero pointer-events-none absolute inset-0" />

      <Container className="media-copy relative flex min-h-[72dvh] flex-col justify-end pb-16 pt-32 md:min-h-[78dvh] md:pb-24 md:pt-36">
        <p className="text-[0.68rem] tracking-[0.28em] text-accent-on-dark uppercase">
          {t("heroEyebrow")}
        </p>
        <h1 className="font-display mt-4 max-w-4xl text-4xl leading-[0.95] tracking-tight text-on-dark md:text-6xl lg:text-[4.5rem]">
          {t("title")}
        </h1>
      </Container>
    </section>
  );
}
