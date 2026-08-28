"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

const workImages = [
  images.work1,
  images.work2,
  images.work3,
  images.work4,
  images.work5,
];

export function Work() {
  const t = useTranslations("work");
  const items = t.raw("items") as { title: string; caption?: string }[];
  const eyebrow = t("eyebrow");

  return (
    <section id="work" className="lux-wash-surface border-t border-border py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            {eyebrow ? (
              <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h2
              className={`font-display text-4xl tracking-tight md:text-5xl ${eyebrow ? "mt-4" : ""}`}
            >
              {t("title")}
            </h2>
            <p className="mt-5 text-base text-muted md:text-lg">{t("body")}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <Button href="/contact" variant="secondary">
              {t("cta")}
            </Button>
            <Button href="/#services" variant="primary">
              {t("ctaSecondary")}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.06}
              variant="scale"
              className={index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <article className="group relative aspect-[16/11] overflow-hidden bg-surface">
                <Image
                  src={workImages[index] ?? images.work1}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-display text-2xl text-white md:text-3xl">
                    {item.title}
                  </h3>
                  {item.caption ? (
                    <p className="mt-2 text-sm text-white/70">{item.caption}</p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
