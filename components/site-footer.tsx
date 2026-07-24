import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>Written and built by Pope Cruz.</p>
        <nav aria-label="Footer navigation">
          <Link href="/feed.xml">rss</Link>
          <Link href="/about#contact">contact</Link>
          <a href="#top">top</a>
        </nav>
      </div>
    </footer>
  );
}
