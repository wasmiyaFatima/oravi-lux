import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  const pillars = [
    { title: t("missionTitle"), body: t("missionBody") },
    { title: t("visionTitle"), body: t("visionBody") },
    { title: t("valueTitle"), body: t("valueBody") },
  ] as const;

  return (
    <section className="lux-wash pt-28 pb-24 md:pt-36 md:pb-32">
      <Container className="max-w-4xl">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
            {t("title")}
          </p>
          <h1 className="font-display mt-4 text-4xl tracking-tight md:text-6xl">
            {t("lead")}
          </h1>
          <p className="mt-4 text-lg text-accent">{t("subtitle")}</p>
          <p className="mt-8 text-base leading-relaxed text-muted md:text-lg">
            {t("body")}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {pillars.map((item, index) => (
            <Reveal key={item.title} delay={0.05 * index}>
              <div className="rounded-3xl border border-border bg-surface p-8 md:p-10">
                <h2 className="text-lg font-medium text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            {t("whyTitle")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {t("whyBody")}
          </p>
          <p className="mt-4 font-display text-xl text-accent">{t("whyTagline")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">
              {t("cta")}
            </Button>
            <Button href="/#services" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
