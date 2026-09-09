import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Pope Cruz",
  description: "Writing by Pope Cruz.",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: false },
};

export default function BlogPage() {
  return (
    <main id="main-content" className="page-shell">
      <article className="blog-placeholder" aria-labelledby="blog-title">
        <Link href="/">Pope Cruz</Link>
        <h1 id="blog-title">Blog</h1>
        {/* Replace this empty state with posts when ready to publish. */}
        <p>No posts yet.</p>
      </article>
    </main>
  );
}
