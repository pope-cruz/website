# Pope Cruz's public notebook

A file-based personal website for projects, build logs, short notes, and longer essays. It uses the Next.js App Router, TypeScript, local Markdown or MDX, and static generation. There is no database or CMS.

## Start locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Before deploying, copy `.env.example` to `.env.local` and set the public site URL and contact email:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=you@your-domain.com
```

## Publish content

Publishing is a file operation:

1. Copy a file from `content/templates/` into `content/projects/`, `content/notes/`, or `content/writing/`.
2. Rename the file to the URL slug you want, such as `a-small-useful-tool.mdx`.
3. Fill in the frontmatter and write the body in Markdown or MDX.
4. Set `published: true`.
5. Commit and deploy.

Entries automatically appear in the correct index, sitemap, metadata, and RSS feed. Production builds omit files with `published: false`. Development mode includes them so drafts can be previewed.

The `/now` page is sourced from `content/pages/now.mdx`. Update that file in place and change its `date` field.

## Frontmatter

All dated entries support:

```yaml
title: Required title
date: 2026-07-22
summary: Used in indexes and metadata
published: true
tags: [one, two]
```

Projects also require `status`, one of `idea`, `building`, `maintained`, `paused`, or `archived`. They support `started`, `ended`, `featured`, `repository`, and `website`.

Writing supports `description` and an optional manual `readingTime`. Reading time is calculated when it is not provided.

Invalid frontmatter fails the build with the file name and field that needs attention.

## MDX components

The following restrained components are available in any content file without imports:

```mdx
<Callout title="Open question">Content here.</Callout>

<ProjectStatus status="building">A short status note.</ProjectStatus>

<ImageWithCaption
  src="/images/example.png"
  alt="Describe the image"
  caption="A useful caption."
  width={1200}
  height={800}
/>

<Aside>Supporting context that should not interrupt the main argument.</Aside>

<Details summary="Read the implementation note">Hidden detail.</Details>

<MediaEmbed src="https://www.youtube-nocookie.com/embed/video-id" title="Video title" />
```

Standard Markdown tables, footnotes, task lists, blockquotes, inline code, and fenced code blocks are styled automatically. Code blocks include syntax highlighting and a copy button.

## Verify a change

```bash
npm run typecheck
npm run build
```

The build statically generates the content routes, feed, sitemap, robots file, manifest, and Open Graph image.

## Project map

```text
app/                 Routes, metadata, feed, and global styles
components/          Document layout and MDX components
content/             Markdown and MDX source files
  pages/             About and now pages
  projects/          Projects and build logs
  notes/             Short entries
  writing/           Essays
  templates/         Copyable publishing templates
lib/content.ts       Typed frontmatter validation and content loading
lib/site.ts          Site identity and navigation
```
