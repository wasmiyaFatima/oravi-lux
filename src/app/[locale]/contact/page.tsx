"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const site = useTranslations("site");

  return (
    <section className="lux-wash pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h1 className="font-display text-4xl tracking-tight md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-muted">{t("subtitle")}</p>
            <div className="mt-10 space-y-4 text-sm text-muted">
              <p>
                <span className="text-foreground">{t("office")}</span>
                <br />
                {site("address")}
              </p>
              <p>
                <span className="text-foreground">{t("phone")}</span>
                <br />
                {site("phone")}
              </p>
              <p>
                <span className="text-foreground">{t("hours")}</span>
                <br />
                {site("hours")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
