import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { MdxContent } from "@/components/mdx-content";
import { getAllContent, getContentBySlug } from "@/lib/content";

type NotePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllContent("notes").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getContentBySlug("notes", slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: { type: "article", publishedTime: note.date, tags: note.tags },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getContentBySlug("notes", slug);
  if (!note) notFound();

  return (
    <ArticleLayout entry={note}>
      <MdxContent source={note.body} />
    </ArticleLayout>
  );
}
