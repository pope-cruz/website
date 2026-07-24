export const siteConfig = {
  name: "Pope Cruz",
  title: "Pope Cruz - notes, projects, and writing",
  description:
    "A public notebook of projects, build logs, essays, and short notes by Pope Cruz.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@popecruz.com",
} as const;

export const navigation = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/notes", label: "notes" },
  { href: "/writing", label: "writing" },
  { href: "/now", label: "now" },
] as const;
