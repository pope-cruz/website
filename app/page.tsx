import { KineticName } from "@/components/kinetic-name";
import { readIntro } from "@/lib/intro";

export default async function HomePage() {
  const intro = await readIntro();

  return (
    <main id="main-content" className="page-shell">
      <article className="intro-card" aria-labelledby="page-title">
        <div className="intro-rule" aria-hidden="true" />

        <header className="intro-heading">
          <p className="intro-kicker">New York · {new Date().getFullYear()}</p>
          <KineticName name={intro.title} />
        </header>

        <div className="intro-body">
          {intro.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <nav className="intro-links" aria-label="Elsewhere">
          {intro.links.map((link) => (
            link.href ? (
              <a key={link.href} href={link.href}>
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="plain-link" key={link.label}>{link.label}</span>
            )
          ))}
        </nav>

      </article>
    </main>
  );
}
