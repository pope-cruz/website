import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { getPageContent } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Now",
  description: "What Pope Cruz is focused on right now.",
};

export default function NowPage() {
  const page = getPageContent("now");
  if (!page) notFound();

  return (
    <div className="page">
      <header className="page-header">
        <h1>{page.title}</h1>
        <p>Last updated <time dateTime={page.date}>{formatDate(page.date)}</time>.</p>
      </header>
      <div className="prose">
        <MdxContent source={page.body} />
      </div>
    </div>
  );
}
