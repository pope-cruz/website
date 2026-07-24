import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "A concise introduction to Pope Cruz and the things he builds.",
};

export default function AboutPage() {
  const page = getPageContent("about");
  if (!page) notFound();

  return (
    <div className="page">
      <header className="page-header">
        <h1>{page.title}</h1>
        {page.summary ? <p>{page.summary}</p> : null}
      </header>
      <div className="prose">
        <MdxContent source={page.body} />
      </div>
    </div>
  );
}
