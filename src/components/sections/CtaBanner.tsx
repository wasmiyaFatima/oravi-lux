"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

export function CtaBanner() {
  const t = useTranslations("cta");
  const site = useTranslations("site");

  return (
    <section className="relative min-h-[70dvh] overflow-hidden border-t border-border">
      <Image
        src={images.cta}
        alt=""
        fill
        className="object-cover object-[55%_38%] md:object-[72%_center]"
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgba(97, 64, 40, 0.22)" }}
      />

      <Container className="media-copy relative flex min-h-[70dvh] flex-col justify-center py-24 md:py-32">
        <Reveal className="max-w-xl md:max-w-2xl" variant="fade-right">
          <h2 className="font-display text-4xl tracking-tight text-on-dark md:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-lg text-base text-on-dark-muted md:text-lg">
            {t("body")}
          </p>
          <p className="mt-4 max-w-2xl text-sm tracking-wide text-accent-on-dark md:text-base">
            {t("audiences")}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact" variant="onDark">
              {t("button")}
            </Button>
            <Button
              href="/about"
              variant="secondary"
              className="border-white/40 text-on-dark hover:border-accent-on-dark hover:text-accent-on-dark"
            >
              {t("secondary")}
            </Button>
            <Button
              href="/#services"
              variant="secondary"
              className="border-white/40 text-on-dark hover:border-accent-on-dark hover:text-accent-on-dark"
            >
              {t("tertiary")}
            </Button>
          </div>
          <a
            href={`mailto:${site("email")}`}
            className="mt-8 inline-block text-sm tracking-wide text-on-dark-muted transition-colors hover:text-accent-on-dark"
          >
            {t("email")}: {site("email")}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
