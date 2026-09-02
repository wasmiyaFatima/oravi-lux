"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-dark">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/suitcase-luggage.mp4"
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="media-scrim-hero pointer-events-none absolute inset-0" />
      </div>

      <Container className="media-copy relative flex min-h-[100dvh] flex-col justify-end pb-20 pt-32 md:pb-28 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p
              className="mb-6 max-w-xl text-[0.7rem] leading-relaxed tracking-[0.18em] text-accent-on-dark uppercase md:text-[0.75rem]"
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
              <span className="mt-2 block text-accent-on-dark italic">{t("line2")}</span>
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
                className="border-white/30 text-on-dark hover:border-accent-on-dark hover:text-accent-on-dark"
              >
                {t("secondary")}
              </Button>
              <Button
                href="/about"
                variant="secondary"
                className="border-white/30 text-on-dark hover:border-accent-on-dark hover:text-accent-on-dark"
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
          <span className="h-px w-10 bg-accent-on-dark/80" />
          <a
            href="#about-intro"
            className="text-[0.6rem] tracking-[0.28em] text-on-dark-muted uppercase transition-colors hover:text-accent-on-dark"
          >
            {t("scroll")}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
