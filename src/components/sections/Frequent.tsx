"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { images } from "@/lib/images";

const itemImages = [
  images.travel,
  images.hospitality,
  images.relocation,
  images.corporate,
  images.events,
] as const;

export function Frequent() {
  const t = useTranslations("frequent");
  const items = t.raw("items") as {
    title: string;
    body: string;
    href: string;
  }[];

  return (
    <section
      id="frequent"
      className="relative overflow-hidden border-t border-border bg-background py-24 md:py-32"
    >
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
            <Button href="/#services" variant="primary">
              {t("cta")}
            </Button>
            <Button href="/contact" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.06}
              variant="fade-up"
              className={index === 4 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <Link
                href={item.href}
                className="group block h-full overflow-hidden rounded-3xl border border-border bg-surface"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={itemImages[index] ?? images.concierge}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute top-4 left-4 font-display text-2xl text-white/35 md:text-3xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-6 py-6 md:px-7 md:py-7">
                  <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.22em] text-accent uppercase">
                    {t("learnMore")}
                    <span
                      aria-hidden
                      className="h-px w-6 bg-accent transition-all group-hover:w-10"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
