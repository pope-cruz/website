import { getAllContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/format";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '\"': "&quot;",
    };
    return entities[character];
  });
}

export function GET() {
  const entries = [...getAllContent("writing"), ...getAllContent("notes")]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30);

  const items = entries
    .map((entry) => {
      const url = absoluteUrl(`/${entry.kind}/${entry.slug}`);
      return `
        <item>
          <title>${escapeXml(entry.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(`${entry.date}T12:00:00Z`).toUTCString()}</pubDate>
          <description>${escapeXml(entry.summary)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.title)}</title>
        <link>${siteConfig.url}</link>
        <description>${escapeXml(siteConfig.description)}</description>
        <language>en</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
