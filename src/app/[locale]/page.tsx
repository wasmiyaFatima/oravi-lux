import { setRequestLocale } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ExperienceBands } from "@/components/sections/ExperienceBands";
import { Frequent } from "@/components/sections/Frequent";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Packages } from "@/components/sections/Packages";
import { Principles } from "@/components/sections/Principles";
import { Process } from "@/components/sections/Process";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Values } from "@/components/sections/Values";
import { Work } from "@/components/sections/Work";

type Props = {
  params: Promise<{ locale: string }>;
};

/** Homepage follows the Oravi Lux marketing deck */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Intro />
      <Principles />
      <ExperienceBands />
      <ServicesGrid />
      <Process />
      <Values />
      <Packages />
      <Frequent />
      <Work />
      <CtaBanner />
    </>
  );
}
