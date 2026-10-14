import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXPERIENCES, getExperience } from "@/data/experiences";
import { ExperiencePage } from "@/components/pages/experience-page";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EXPERIENCES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exp = getExperience((await params).slug);
  if (!exp) return {};
  return { title: exp.title.en, description: exp.lede.en, openGraph: { images: [{ url: exp.hero.src }] } };
}

export default async function Page({ params }: Props) {
  const exp = getExperience((await params).slug);
  if (!exp) notFound();
  return <ExperiencePage exp={exp} />;
}
