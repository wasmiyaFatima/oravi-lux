"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Packages() {
  const t = useTranslations("packages");
  const items = t.raw("items") as {
    name: string;
    tag: string;
    points: string[];
  }[];

  return (
    <section id="packages" className="lux-wash border-t border-border py-24 md:py-32">
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
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">
              {t("cta")}
            </Button>
            <Button href="/#services" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {items.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.07} variant="fade-up">
              <article
                className={`h-full lg:px-8 ${
                  index > 0 ? "lg:border-l lg:border-border" : "lg:pl-0"
                } ${index === items.length - 1 ? "lg:pr-0" : ""}`}
              >
                <p className="text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                  {item.tag}
                </p>
                <h3 className="font-display mt-3 text-2xl text-foreground md:text-[1.65rem]">
                  {item.name}
                </h3>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm leading-relaxed text-muted before:mr-2 before:text-accent before:content-['—']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <p className="max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {t("note")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
