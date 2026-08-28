"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Values() {
  const t = useTranslations("values");
  const items = t.raw("items") as { title: string; body?: string }[];

  return (
    <section className="relative overflow-hidden border-t border-border bg-dark py-24 text-on-dark md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_0%_0%,rgba(166,137,102,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(166,137,102,0.12),transparent_50%)]" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-20">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28" variant="fade-right">
            <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-3xl tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-on-dark-muted md:text-lg">
              {t("body")}
            </p>
            <p className="mt-6 font-display text-xl text-accent md:text-2xl">
              {t("tagline")}
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="onDark">
                {t("cta")}
              </Button>
            </div>
          </Reveal>

          <ul className="space-y-0 lg:col-span-7">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} variant="fade-left">
                <li className="group flex items-baseline gap-6 border-b border-white/10 py-6 first:pt-0 last:border-b-0 md:gap-10 md:py-7">
                  <span className="font-display w-10 shrink-0 text-xl text-accent/50 transition-colors group-hover:text-accent md:w-12 md:text-2xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-medium tracking-wide text-on-dark md:text-xl">
                      {item.title}
                    </h3>
                    {item.body ? (
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-on-dark-muted">
                        {item.body}
                      </p>
                    ) : null}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
