import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ensureContent } from "@/lib/content/store";
import { NEWS } from "@/data/sccs-content";
import { NewsArticle } from "@/components/pages/other-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await ensureContent();
  const { slug } = await params;
  const post = NEWS.find((n) => n.slug === slug);
  if (!post) return {};
  return { title: post.title.en, description: post.excerpt.en, openGraph: { type: "article", images: [{ url: post.image.src }] } };
}

export default async function Page({ params }: Props) {
  await ensureContent();
  const { slug } = await params;
  const post = NEWS.find((n) => n.slug === slug);
  if (!post) notFound();
  return <NewsArticle post={post} />;
}
