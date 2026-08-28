import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { Link } from "@/i18n/navigation";
import { serviceSlugs } from "@/i18n/routing";

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const ts = await getTranslations("services");
  const site = await getTranslations("site");

  return (
    <footer className="lux-wash-dark border-t border-white/10 text-on-dark">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-2">
          <Logo size="footer" tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-on-dark-muted">
            {t("tagline")}
          </p>
        </div>
        <div>
          <p className="text-[0.65rem] tracking-[0.22em] text-accent uppercase">
            {t("navigation")}
          </p>
          <ul className="mt-5 space-y-3 text-sm text-on-dark-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-on-dark">
                {tn("home")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-on-dark">
                {tn("about")}
              </Link>
            </li>
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/services/${slug}`}
                  className="transition-colors hover:text-on-dark"
                >
                  {ts(`${slug}.nav`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="transition-colors hover:text-on-dark">
                {tn("contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[0.65rem] tracking-[0.22em] text-accent uppercase">
            {t("contact")}
          </p>
          <ul className="mt-5 space-y-3 text-sm text-on-dark-muted">
            <li>{site("address")}</li>
            <li>
              <a
                href={`mailto:${site("email")}`}
                className="transition-colors hover:text-on-dark"
              >
                {site("email")}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site("phone").replace(/\s/g, "")}`}
                className="transition-colors hover:text-on-dark"
              >
                {site("phone")}
              </a>
            </li>
            <li>{site("hours")}</li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-on-dark-muted md:flex-row md:justify-between">
        <p>
          Copyright {new Date().getFullYear()} {t("brand")}. {t("rights")}
        </p>
        <div className="flex gap-6">
          <span>{t("privacy")}</span>
          <span>{t("legal")}</span>
        </div>
      </Container>
    </footer>
  );
}
