import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page not-found">
      <header className="page-header">
        <h1>Not found</h1>
        <p>This file either moved or was never published.</p>
      </header>
      <p><Link href="/">Return to the index.</Link></p>
    </div>
  );
}
