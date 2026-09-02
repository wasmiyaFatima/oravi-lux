"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const site = useTranslations("site");

  return (
    <>
      <ContactHero />
      <section className="lux-wash pt-20 pb-24 md:pt-28 md:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="text-muted">{t("subtitle")}</p>
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
    </>
  );
}
