import Link from "next/link";
import type { ContentEntry } from "@/lib/content";

type ContentListProps = {
  entries: ContentEntry[];
  emptyMessage?: string;
  showSummary?: boolean;
};

function rowMeta(entry: ContentEntry) {
  if (entry.kind === "projects") return entry.status;
  if (entry.kind === "writing") return entry.readingTimeLabel;
  return entry.tags[0] ?? "note";
}

export function ContentList({ entries, emptyMessage = "Nothing published yet.", showSummary = false }: ContentListProps) {
  if (entries.length === 0) return <p className="empty-state">{emptyMessage}</p>;

  return (
    <ol className="content-list">
      {entries.map((entry) => (
        <li key={`${entry.kind}-${entry.slug}`}>
          <time dateTime={entry.date}>{entry.date}</time>
          <div>
            <Link href={`/${entry.kind}/${entry.slug}`}>{entry.title}</Link>
            {showSummary && entry.summary ? <p>{entry.summary}</p> : null}
          </div>
          <span className="content-list__meta">{rowMeta(entry)}</span>
        </li>
      ))}
    </ol>
  );
}
