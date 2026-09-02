"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { images } from "@/lib/images";

const bands = [
  {
    key: "travel" as const,
    image: images.bandConcierge,
    href: "/services/concierge",
  },
  {
    key: "events" as const,
    image: images.bandCorporate,
    href: "/services/corporate-concierge",
  },
  {
    key: "concierge" as const,
    image: images.bandHospitality,
    href: "/services/hospitality",
  },
];

export function ExperienceBands() {
  const t = useTranslations("bands");

  return (
    <section aria-label={t("aria")} className="bg-dark">
      <div className="grid lg:grid-cols-3">
        {bands.map((band, index) => (
          <Reveal
            key={band.key}
            delay={index * 0.08}
            variant="scale"
            amount={0.15}
            className="relative min-h-[70vh] overflow-hidden lg:min-h-[78vh]"
          >
            <Link
              href={band.href}
              className="group absolute inset-0 flex flex-col justify-end p-8 md:p-10"
            >
              <Image
                src={band.image}
                alt=""
                fill
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="media-scrim absolute inset-0" />
              <div className="media-copy relative z-10">
                <p className="text-[0.65rem] tracking-[0.3em] text-accent-on-dark uppercase">
                  {t(`${band.key}.eyebrow`)}
                </p>
                <h3 className="font-display mt-3 max-w-xs text-3xl leading-tight text-on-dark md:text-4xl">
                  {t(`${band.key}.title`)}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-on-dark-muted">
                  {t(`${band.key}.body`)}
                </p>
                <span className="mt-8 inline-flex w-fit items-center gap-3 text-[0.65rem] tracking-[0.24em] text-on-dark uppercase transition-colors duration-500 group-hover:text-accent-on-dark">
                  {t(`${band.key}.cta`)}
                  <span
                    aria-hidden
                    className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
