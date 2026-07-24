import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { CopyCodeBlock } from "@/components/copy-code-block";
import { siteConfig } from "@/lib/site";

export function Callout({ children, title = "Note" }: { children: ReactNode; title?: string }) {
  return (
    <aside className="callout" aria-label={title}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function ProjectStatus({ status, children }: { status: string; children?: ReactNode }) {
  return (
    <div className="project-status">
      <span>status</span>
      <strong>{status}</strong>
      {children ? <div>{children}</div> : null}
    </div>
  );
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  width = 1200,
  height = 800,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="image-with-caption">
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 760px) 100vw, 720px" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Aside({ children }: { children: ReactNode }) {
  return <aside className="margin-aside">{children}</aside>;
}

export function Details({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details>
      <summary>{summary}</summary>
      <div>{children}</div>
    </details>
  );
}

export function MediaEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="media-embed">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function ContactLink() {
  return (
    <a
      href="https://x.com/popedotdev"
      target="_blank"
      rel="noopener noreferrer"
    >
      x.com/popedotdev
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  pre: CopyCodeBlock,
  Callout,
  ProjectStatus,
  ImageWithCaption,
  Aside,
  Details,
  MediaEmbed,
  ContactLink,
  a: (props: ComponentPropsWithoutRef<"a">) => {
    const external = typeof props.href === "string" && props.href.startsWith("http");
    return <a {...props} rel={external ? "noreferrer" : props.rel} />;
  },
};
