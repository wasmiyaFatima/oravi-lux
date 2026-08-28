"use client";

import { CaretDown, List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, serviceSlugs, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
};

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative whitespace-nowrap py-1 text-[0.68rem] tracking-[0.18em] text-on-dark-muted uppercase transition-colors duration-300 hover:text-on-dark"
    >
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-accent/80 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </Link>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const ts = useTranslations("services");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-500 ${
        scrolled
          ? "bg-dark/88 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          : "bg-gradient-to-b from-dark via-dark/95 to-dark/80"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />

      <Container className="grid h-[4.75rem] grid-cols-[auto_1fr_auto] items-center gap-4 md:h-[5.75rem]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.6 }}
        >
          <Logo tone="light" />
        </motion.div>

        <nav
          className="hidden items-center justify-center gap-7 xl:gap-9 lg:flex"
          aria-label="Primary"
        >
          <NavLink href="/about">{t("about")}</NavLink>

          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              className="group relative inline-flex items-center gap-1 whitespace-nowrap py-1 text-[0.68rem] tracking-[0.18em] text-on-dark-muted uppercase transition-colors duration-300 hover:text-on-dark"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              {t("services")}
              <CaretDown
                size={11}
                weight="bold"
                className={`transition-transform duration-300 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-1 h-px origin-center bg-accent/80 transition-transform duration-500 ease-out ${
                  servicesOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-full z-50 mt-6 w-[min(280px,70vw)] -translate-x-1/2 border border-white/10 bg-dark/96 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-md"
                >
                  {serviceSlugs.map((slug, i) => (
                    <motion.div
                      key={slug}
                      initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : 0.04 * i,
                        duration: 0.25,
                      }}
                    >
                      <Link
                        href={`/services/${slug}`}
                        className="block whitespace-nowrap px-4 py-3 text-[0.68rem] tracking-[0.14em] text-on-dark-muted uppercase transition-colors duration-300 hover:bg-white/[0.04] hover:text-on-dark"
                        onClick={closeAll}
                      >
                        {ts(`${slug}.nav`)}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <NavLink href="/#approach">{t("approach")}</NavLink>
          <NavLink href="/#work">{t("work")}</NavLink>
          <NavLink href="/contact">{t("contact")}</NavLink>
        </nav>

        <div className="hidden items-center gap-5 justify-self-end lg:flex">
          <div className="flex items-center" aria-label={t("language")}>
            {locales.map((code, i) => (
              <span key={code} className="flex items-center">
                {i > 0 ? (
                  <span className="mx-2 text-[0.55rem] text-white/25" aria-hidden>
                    /
                  </span>
                ) : null}
                <Link
                  href={pathname}
                  locale={code}
                  className={`text-[0.62rem] tracking-[0.16em] transition-colors duration-300 ${
                    code === locale
                      ? "text-accent"
                      : "text-on-dark-muted hover:text-on-dark"
                  }`}
                >
                  {localeLabels[code]}
                </Link>
              </span>
            ))}
          </div>

          <Link
            href="/contact"
            className="group relative overflow-hidden whitespace-nowrap border border-accent/50 px-5 py-2.5 text-[0.62rem] tracking-[0.2em] text-on-dark uppercase transition-colors duration-500 hover:border-accent hover:text-dark"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
            <span className="relative">{t("speak")}</span>
          </Link>
        </div>

        <button
          type="button"
          className="col-start-3 justify-self-end p-2 text-on-dark transition-opacity duration-300 hover:opacity-70 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={reduceMotion ? false : { opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {open ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.08] bg-dark lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-8">
              {[
                { href: "/about", label: t("about") },
                { href: "/#approach", label: t("approach") },
                { href: "/#work", label: t("work") },
                { href: "/contact", label: t("contact") },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className="block py-2.5 text-sm tracking-[0.18em] text-on-dark uppercase"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <p className="mt-4 mb-1 text-[0.6rem] tracking-[0.28em] text-accent uppercase">
                {t("services")}
              </p>
              {serviceSlugs.map((slug, i) => (
                <motion.div
                  key={slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + 0.04 * i, duration: 0.28 }}
                >
                  <Link
                    href={`/services/${slug}`}
                    onClick={closeAll}
                    className="block py-2 pl-1 text-sm tracking-[0.12em] text-on-dark-muted uppercase"
                  >
                    {ts(`${slug}.nav`)}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-6 flex items-center border-t border-white/10 pt-6">
                {locales.map((code, i) => (
                  <span key={code} className="flex items-center">
                    {i > 0 ? (
                      <span className="mx-3 text-white/20" aria-hidden>
                        /
                      </span>
                    ) : null}
                    <Link
                      href={pathname}
                      locale={code}
                      onClick={closeAll}
                      className={`text-[0.7rem] tracking-[0.2em] ${
                        code === locale ? "text-accent" : "text-on-dark-muted"
                      }`}
                    >
                      {localeLabels[code]}
                    </Link>
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                onClick={closeAll}
                className="mt-6 w-fit border border-accent/50 px-5 py-3 text-[0.65rem] tracking-[0.2em] text-on-dark uppercase"
              >
                {t("speak")}
              </Link>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
