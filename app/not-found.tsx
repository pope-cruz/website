import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="page-shell">
      <article className="profile">
        <header className="intro">
          <h1>Page not found</h1>
          <p>The page you were looking for does not exist.</p>
        </header>
        <Link href="/">Return home</Link>
      </article>
    </main>
  );
}
