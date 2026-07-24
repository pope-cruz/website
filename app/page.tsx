import Link from "next/link";
import { ContentList } from "@/components/content-list";
import { getAllContent } from "@/lib/content";

export default function HomePage() {
  const writing = getAllContent("writing").slice(0, 4);
  const notes = getAllContent("notes").slice(0, 5);
  const projects = getAllContent("projects")
    .filter((project) => project.featured || ["building", "maintained"].includes(project.status))
    .slice(0, 4);

  return (
    <div className="page page--wide">
      <section className="home-intro" aria-labelledby="intro-title">
        <h1 id="intro-title">hi i'm pope</h1>
        <p>
          junior studying cs at nyu; currently somewhere between software, startups,
          and tech policy.
        </p>
        <nav className="home-links" aria-label="Introduction links">
          <Link href="/about">stuff about me →</Link>
          <Link href="/now">what I am doing now →</Link>
        </nav>
      </section>

      <section className="index-section" aria-labelledby="recent-writing">
        <div className="section-heading">
          <h2 id="recent-writing">recent writing</h2>
          <Link href="/writing">all writing</Link>
        </div>
        <ContentList entries={writing} />
      </section>

      <section className="index-section" aria-labelledby="recent-notes">
        <div className="section-heading">
          <h2 id="recent-notes">recent notes</h2>
          <Link href="/notes">all notes</Link>
        </div>
        <ContentList entries={notes} />
      </section>

      <section className="index-section" aria-labelledby="selected-projects">
        <div className="section-heading">
          <h2 id="selected-projects">active projects</h2>
          <Link href="/projects">all projects</Link>
        </div>
        <ContentList entries={projects} />
      </section>
    </div>
  );
}
