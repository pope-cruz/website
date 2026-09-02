# pope.dev

A minimal, static personal site for Pope Cruz. Built with the Next.js App Router, TypeScript, and Geist.

## Run locally

```bash
npm install
npm run dev
```

## Update the page

Edit `content/intro.md`. The first heading becomes the display name, regular Markdown paragraphs become the introduction, and a Markdown link list becomes the links at the bottom.

The page intentionally supports a small Markdown subset: one top-level heading, paragraphs, inline links, and one link list. This keeps the site static and dependency-free while leaving the writing in a portable format.

The public résumé is served from `public/resume.pdf`. Next.js adds `X-Robots-Tag: noindex, nofollow, noarchive` to that asset in `next.config.ts`.

## Verify

```bash
npm run typecheck
npm run build
```
