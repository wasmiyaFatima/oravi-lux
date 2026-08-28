import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { serviceSlugs, type ServiceSlug } from "@/i18n/routing";
import { serviceImages } from "@/lib/images";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!serviceSlugs.includes(slug as ServiceSlug)) {
    return {};
  }
  const t = await getTranslations({
    locale,
    namespace: `services.${slug as ServiceSlug}`,
  });
  return {
    title: t("title"),
    description: t("body").slice(0, 160),
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!serviceSlugs.includes(slug as ServiceSlug)) {
    notFound();
  }
  setRequestLocale(locale);

  const serviceSlug = slug as ServiceSlug;
  const t = await getTranslations(`services.${serviceSlug}`);
  const tn = await getTranslations("nav");
  const points = t.raw("points") as string[];
  const approachSteps = t.raw("approachSteps") as string[];
  const benefit = t("benefit");

  return (
    <article>
      <section className="relative min-h-[78vh] overflow-hidden pt-20 md:min-h-[88vh]">
        <Image
          src={serviceImages[serviceSlug]}
          alt={t("title")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/55 to-dark/25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(166,137,102,0.22),transparent_55%)]" />
        <Container className="relative flex min-h-[78vh] flex-col justify-end pb-16 md:min-h-[88vh] md:pb-20">
          <Reveal>
            <p className="mb-4 text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="font-display max-w-4xl text-4xl tracking-tight text-white md:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75 md:text-xl">
              {t("subtitle")}
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="onDark">
                {t("cta")}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="lux-wash py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              {t("introEyebrow")}
            </p>
            <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
              {t("introTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              {t("body")}
            </p>
            {benefit ? (
              <p className="mt-8 rounded-2xl border border-border bg-surface/80 p-6 text-sm leading-relaxed text-foreground md:p-7 md:text-base">
                {benefit}
              </p>
            ) : null}
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-surface p-7 shadow-[0_24px_60px_rgba(23,15,0,0.06)] md:p-8">
              <p className="text-[0.65rem] tracking-[0.22em] text-accent uppercase">
                {t("pointsTitle")}
              </p>
              <ul className="mt-6 space-y-4">
                {points.map((point) => (
                  <li
                    key={point}
                    className="border-b border-border pb-4 text-sm leading-relaxed text-foreground last:border-0 last:pb-0"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="lux-wash-surface border-t border-border py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
                {t("forWhomEyebrow")}
              </p>
              <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
                {t("forWhomTitle")}
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                {t("forWhomBody")}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="lux-wash border-t border-border py-20 md:py-28">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              {t("approachEyebrow")}
            </p>
            <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl">
              {t("approachTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {t("approachBody")}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {approachSteps.map((step, index) => (
              <Reveal key={step} delay={index * 0.07}>
                <div className="h-full rounded-3xl border border-border bg-surface/90 p-7 md:p-8">
                  <span className="font-display text-3xl text-accent/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-foreground md:text-base">
                    {step}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-border bg-dark px-3 py-16 text-on-dark sm:px-5 md:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(166,137,102,0.28),transparent_55%)]" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-12 text-center backdrop-blur-sm md:px-14 md:py-16">
            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-on-dark-muted md:text-lg">
              {t("ctaBody")}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="onDark">
                {t("cta")}
              </Button>
              <Button
                href="/about"
                variant="secondary"
                className="border-white/30 text-on-dark hover:border-accent hover:text-accent"
              >
                {tn("about")}
              </Button>
              <Button
                href="/#services"
                variant="secondary"
                className="border-white/30 text-on-dark hover:border-accent hover:text-accent"
              >
                {tn("services")}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
