"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; body?: string }[];

  return (
    <section id="approach" className="lux-wash-surface border-t border-border py-24 md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-3xl tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl font-display text-xl text-foreground/80 md:text-2xl">
              {t("subtitle")}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {t("body")}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-self-end">
            <Button href="/contact" variant="primary">
              {t("cta")}
            </Button>
            <Button href="/about" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.07} variant="fade-up">
              <li className="border-t border-border py-8 pr-5 lg:pr-6">
                <span className="font-display text-5xl text-accent/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-medium tracking-wide uppercase">
                  {step.title}
                </h3>
                {step.body ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
