import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  display: "swap",
  preload: true,
  variable: "--font-geist",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pope.dev"),
  title: "Pope Cruz",
  description: "Computer science student at NYU interested in GTM, AI products, and community-building.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://pope.dev",
    siteName: "Pope Cruz",
    title: "Pope Cruz",
    description: "Computer science student at NYU.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pope Cruz, computer science student at NYU.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pope Cruz",
    description: "Computer science student at NYU.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f6f3ec",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
