"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

export function Intro() {
  const t = useTranslations("intro");

  return (
    <section
      className="lux-wash border-t border-border py-24 md:py-32"
      id="about-intro"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6" variant="fade-right">
            <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {t("body")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="primary">
                {t("cta")}
              </Button>
              <Button href="/contact" variant="secondary">
                {t("ctaSecondary")}
              </Button>
            </div>
          </Reveal>

          <Reveal
            className="relative pb-16 lg:col-span-6 lg:pb-8"
            variant="fade-left"
            delay={0.1}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl md:aspect-[5/6] md:rounded-2xl">
              <Image
                src={images.intro}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 grid grid-cols-3 gap-4 rounded-xl bg-dark px-6 py-5 text-on-dark shadow-[0_24px_60px_rgba(74,55,40,0.25)] sm:left-6 sm:right-auto sm:w-[min(100%,28rem)] md:bottom-[-1.25rem] md:right-[-1.25rem] md:left-auto md:w-[28rem] lg:w-[30rem]">
              {[1, 2, 3].map((n) => (
                <div key={n} className="min-w-0">
                  <p className="font-display text-2xl text-accent md:text-3xl">
                    {t(`stat${n}Value`)}
                  </p>
                  <p className="mt-1 whitespace-nowrap text-[0.65rem] tracking-wide text-on-dark-muted">
                    {t(`stat${n}Label`)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
