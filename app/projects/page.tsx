import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects, experiments, and build logs by Pope Cruz.",
};

export default function ProjectsPage() {
  const projects = getAllContent("projects");

  return (
    <div className="page page--wide">
      <header className="page-header">
        <h1>Projects</h1>
        <p>Small tools, ongoing experiments, and records of what changed while building them.</p>
      </header>
      <ContentList entries={projects} showSummary />
    </div>
  );
}
