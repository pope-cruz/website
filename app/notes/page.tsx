import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes",
  description: "Short observations and working thoughts by Pope Cruz.",
};

export default function NotesPage() {
  const notes = getAllContent("notes");

  return (
    <div className="page page--wide">
      <header className="page-header">
        <h1>Notes</h1>
        <p>Short entries that are useful before they are complete.</p>
      </header>
      <ContentList entries={notes} showSummary />
    </div>
  );
}
