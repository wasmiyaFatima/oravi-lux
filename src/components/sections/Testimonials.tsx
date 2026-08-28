"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as {
    quote: string;
    name: string;
    role: string;
  }[];

  return (
    <section className="lux-wash border-t border-border py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-4xl tracking-tight text-foreground md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-muted">{t("body")}</p>
            <p className="mt-3 text-sm text-muted/80">{t("note")}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <Button href="/contact" variant="secondary">
              {t("cta")}
            </Button>
            <Button href="/about" variant="primary">
              {t("ctaSecondary")}
            </Button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.1} variant="fade-up">
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-surface/80 p-7 md:p-8">
                <blockquote className="flex-1 font-display text-xl leading-snug text-foreground/90 md:text-2xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="mt-1 text-xs text-muted">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
