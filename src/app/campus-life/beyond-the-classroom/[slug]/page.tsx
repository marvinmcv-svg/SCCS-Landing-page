import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ensureContent } from "@/lib/content/store";
import { TRADITIONS, getTradition } from "@/data/traditions";
import { TraditionPage } from "@/components/pages/tradition-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TRADITIONS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await ensureContent();
  const t = getTradition((await params).slug);
  if (!t) return {};
  return { title: t.title.en, description: t.body[0].en, openGraph: { images: [{ url: t.image.src }] } };
}

export default async function Page({ params }: Props) {
  await ensureContent();
  const tradition = getTradition((await params).slug);
  if (!tradition) notFound();
  return <TraditionPage tradition={tradition} />;
}
