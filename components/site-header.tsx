"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-name" href="/" aria-current={pathname === "/" ? "page" : undefined}>
          pope.dev
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isCurrent = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} aria-current={isCurrent ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
