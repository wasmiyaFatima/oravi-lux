"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

/** Famous Luxembourg landmarks — buildings stay front and center */
const landmarks = [
  {
    src: "/luxembourg/bridge.jpg",
    alt: "Adolphe Bridge, Luxembourg City",
  },
  {
    src: "/luxembourg/casemates.jpg",
    alt: "Bock Casemates and Grund, Luxembourg City",
  },
  {
    src: "/luxembourg/skyline.jpg",
    alt: "Luxembourg City skyline",
  },
  {
    src: "/luxembourg/grund.jpg",
    alt: "Grund district, Luxembourg City",
  },
] as const;

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % landmarks.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-dark">
      <div className="absolute inset-0">
        {landmarks.map((shot, i) => {
          const active = reduce ? i === 0 : i === index;
          return (
            <motion.div
              key={shot.src}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: active ? 1 : 0,
                scale: active && !reduce ? 1.08 : 1,
              }}
              transition={{
                opacity: { duration: 1.4, ease },
                scale: { duration: 6.5, ease: "linear" },
              }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                priority={i === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/55 via-dark/30 to-dark/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/25 to-dark/15" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_20%,rgba(166,137,102,0.2),transparent_60%)]" />
      </div>

      <Container className="relative flex min-h-[100dvh] flex-col justify-end pb-20 pt-32 md:pb-28 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p
              className="mb-6 max-w-xl text-[0.7rem] leading-relaxed tracking-[0.18em] text-accent uppercase md:text-[0.75rem]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
            >
              {t("partner")}
            </motion.p>
            <motion.h1
              className="font-display max-w-4xl text-[3.25rem] leading-[0.95] tracking-tight text-on-dark md:text-6xl lg:text-[5.5rem]"
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.28, ease }}
            >
              <span className="block">{t("line1")}</span>
              <span className="mt-2 block text-accent italic">{t("line2")}</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-4">
            <motion.p
              className="max-w-md text-base leading-relaxed text-on-dark/75 md:text-lg"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease }}
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.55, ease }}
            >
              <Button href="/contact" variant="onDark">
                {t("cta")}
              </Button>
              <Button
                href="/#services"
                variant="secondary"
                className="border-white/30 text-on-dark hover:border-accent hover:text-accent"
              >
                {t("secondary")}
              </Button>
              <Button
                href="/about"
                variant="secondary"
                className="border-white/30 text-on-dark hover:border-accent hover:text-accent"
              >
                {t("tertiary")}
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-16 flex items-center gap-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="h-px w-10 bg-accent/70" />
          <a
            href="#about-intro"
            className="text-[0.6rem] tracking-[0.28em] text-on-dark-muted uppercase transition-colors hover:text-accent"
          >
            {t("scroll")}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
