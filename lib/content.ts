import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

export const contentKinds = ["projects", "notes", "writing"] as const;
export type ContentKind = (typeof contentKinds)[number];

const contentRoot = path.join(process.cwd(), "content");

const dateField = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use dates in YYYY-MM-DD format"),
);

const optionalDateField = z.preprocess(
  (value) => {
    if (value === null || value === "" || typeof value === "undefined") return undefined;
    return value instanceof Date ? value.toISOString().slice(0, 10) : value;
  },
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
);

const sharedSchema = z.object({
  title: z.string().min(1),
  date: dateField,
  summary: z.string().default(""),
  published: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});

const schemas = {
  notes: sharedSchema,
  writing: sharedSchema.extend({
    description: z.string().default(""),
    readingTime: z.string().optional(),
  }),
  projects: sharedSchema.extend({
    status: z.enum(["idea", "building", "maintained", "paused", "archived"]),
    started: optionalDateField,
    ended: optionalDateField,
    featured: z.boolean().default(false),
    repository: z.string().url().optional(),
    website: z.string().url().optional(),
  }),
} satisfies Record<ContentKind, z.ZodType>;

type NoteFrontmatter = z.infer<(typeof schemas)["notes"]>;
type WritingFrontmatter = z.infer<(typeof schemas)["writing"]>;
type ProjectFrontmatter = z.infer<(typeof schemas)["projects"]>;

export type NoteEntry = NoteFrontmatter & EntryFields & { kind: "notes" };
export type WritingEntry = WritingFrontmatter & EntryFields & { kind: "writing" };
export type ProjectEntry = ProjectFrontmatter & EntryFields & { kind: "projects" };
export type ContentEntry = NoteEntry | WritingEntry | ProjectEntry;

type EntryFields = {
  slug: string;
  body: string;
  readingTimeLabel: string;
};

type EntryFor<K extends ContentKind> = K extends "projects"
  ? ProjectEntry
  : K extends "writing"
    ? WritingEntry
    : NoteEntry;

function directoryFor(kind: ContentKind) {
  return path.join(contentRoot, kind);
}

function parseEntry<K extends ContentKind>(kind: K, fileName: string): EntryFor<K> {
  const fullPath = path.join(directoryFor(kind), fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const parsed = schemas[kind].safeParse(data);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in ${path.relative(process.cwd(), fullPath)}:\n${issues}`);
  }

  const slug = fileName.replace(/\.(md|mdx)$/, "");
  const stats = readingTime(content);
  const frontmatter = parsed.data as Record<string, unknown>;
  const readingTimeLabel =
    typeof frontmatter.readingTime === "string"
      ? frontmatter.readingTime
      : `${Math.max(1, Math.ceil(stats.minutes))} min read`;

  return {
    ...frontmatter,
    kind,
    slug,
    body: content,
    readingTimeLabel,
  } as EntryFor<K>;
}

export const getAllContent = cache(<K extends ContentKind>(kind: K): EntryFor<K>[] => {
  const directory = directoryFor(kind);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => parseEntry(kind, fileName))
    .filter((entry) => entry.published || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getContentBySlug = cache(
  <K extends ContentKind>(kind: K, slug: string): EntryFor<K> | null => {
    const safeSlug = path.basename(slug);
    const directory = directoryFor(kind);

    for (const extension of ["mdx", "md"]) {
      const fileName = `${safeSlug}.${extension}`;
      if (fs.existsSync(path.join(directory, fileName))) {
        const entry = parseEntry(kind, fileName);
        if (!entry.published && process.env.NODE_ENV !== "development") return null;
        return entry;
      }
    }

    return null;
  },
);

export const getPageContent = cache((slug: string) => {
  const directory = path.join(contentRoot, "pages");
  for (const extension of ["mdx", "md"]) {
    const fullPath = path.join(directory, `${path.basename(slug)}.${extension}`);
    if (!fs.existsSync(fullPath)) continue;
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    const parsed = sharedSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in ${path.relative(process.cwd(), fullPath)}`);
    }
    return { ...parsed.data, body: content };
  }
  return null;
});
