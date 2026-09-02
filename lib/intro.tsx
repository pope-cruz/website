import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";

type IntroLink = {
  label: string;
  href?: string;
};

type IntroDocument = {
  title: string;
  paragraphs: ReactNode[];
  links: IntroLink[];
};

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInlineMarkdown(value: string): ReactNode {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of value.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0;

    if (index > cursor) parts.push(value.slice(cursor, index));
    parts.push(
      <a key={`${match[2]}-${index}`} href={match[2]}>
        {match[1]}
      </a>,
    );
    cursor = index + match[0].length;
  }

  if (cursor < value.length) parts.push(value.slice(cursor));
  return parts.length === 1 ? parts[0] : parts;
}

export async function readIntro(): Promise<IntroDocument> {
  const filePath = path.join(process.cwd(), "content", "intro.md");
  const source = await readFile(filePath, "utf8");
  const blocks = source.trim().split(/\n\s*\n/);
  const heading = blocks.shift();

  if (!heading?.startsWith("# ")) {
    throw new Error("content/intro.md must start with a level-one heading");
  }

  const linkBlockIndex = blocks.findIndex((block) => block.split("\n").every((line) => line.startsWith("- ")));
  const paragraphBlocks = linkBlockIndex === -1 ? blocks : blocks.slice(0, linkBlockIndex);
  const linkLines = linkBlockIndex === -1 ? [] : blocks[linkBlockIndex].split("\n");

  const links = linkLines.map((line) => {
    const match = line.match(/^- \[([^\]]+)\]\(([^)]+)\)$/);
    if (match) return { label: match[1], href: match[2] };
    return { label: line.slice(2) };
  });

  return {
    title: heading.slice(2).trim(),
    paragraphs: paragraphBlocks.map((paragraph) => renderInlineMarkdown(paragraph.replace(/\n/g, " "))),
    links,
  };
}
