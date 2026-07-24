import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Longer essays about software, learning, and systems by Pope Cruz.",
};

export default function WritingPage() {
  const writing = getAllContent("writing");

  return (
    <div className="page page--wide">
      <header className="page-header">
        <h1>Writing</h1>
        <p>Longer attempts to understand an idea well enough to explain it.</p>
      </header>
      <ContentList entries={writing} showSummary />
    </div>
  );
}
