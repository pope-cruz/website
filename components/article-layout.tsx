import Link from "next/link";
import type { ReactNode } from "react";
import type { ContentEntry } from "@/lib/content";
import { absoluteUrl, formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site";

export function ArticleLayout({ entry, children }: { entry: ContentEntry; children: ReactNode }) {
  const isProject = entry.kind === "projects";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": isProject ? "CreativeWork" : "BlogPosting",
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    author: { "@type": "Person", name: siteConfig.name },
    url: absoluteUrl(`/${entry.kind}/${entry.slug}`),
  };

  return (
    <article className="article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <header className="article-header">
        <Link className="back-link" href={`/${entry.kind}`}>
          ← {entry.kind}
        </Link>
        <h1>{entry.title}</h1>
        {entry.summary ? <p className="article-summary">{entry.summary}</p> : null}
        <dl className="article-meta">
          <div>
            <dt>published</dt>
            <dd><time dateTime={entry.date}>{formatDate(entry.date)}</time></dd>
          </div>
          <div>
            <dt>reading time</dt>
            <dd>{entry.readingTimeLabel}</dd>
          </div>
          {isProject ? (
            <div>
              <dt>status</dt>
              <dd>{entry.status}</dd>
            </div>
          ) : null}
          {entry.tags.length > 0 ? (
            <div>
              <dt>tags</dt>
              <dd>{entry.tags.join(", ")}</dd>
            </div>
          ) : null}
        </dl>
        {isProject && (entry.repository || entry.website) ? (
          <div className="project-links">
            {entry.website ? <a href={entry.website}>website ↗</a> : null}
            {entry.repository ? <a href={entry.repository}>repository ↗</a> : null}
          </div>
        ) : null}
      </header>
      <div className="prose">{children}</div>
    </article>
  );
}
