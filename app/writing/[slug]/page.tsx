import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { MdxContent } from "@/components/mdx-content";
import { getAllContent, getContentBySlug } from "@/lib/content";

type WritingPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllContent("writing").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getContentBySlug("writing", slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.description || essay.summary,
    alternates: { canonical: `/writing/${essay.slug}` },
    openGraph: { type: "article", publishedTime: essay.date, tags: essay.tags },
  };
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const essay = getContentBySlug("writing", slug);
  if (!essay) notFound();

  return (
    <ArticleLayout entry={essay}>
      <MdxContent source={essay.body} />
    </ArticleLayout>
  );
}
