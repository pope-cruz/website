import type { MetadataRoute } from "next";
import { contentKinds, getAllContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/format";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/notes", "/writing", "/now"].map((route) => ({
    url: absoluteUrl(route || "/"),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const contentRoutes = contentKinds.flatMap((kind) =>
    getAllContent(kind).map((entry) => ({
      url: absoluteUrl(`/${kind}/${entry.slug}`),
      lastModified: entry.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticRoutes, ...contentRoutes];
}
