"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "index" },
  { href: "/projects", label: "projects" },
  { href: "/gallery", label: "gallery" },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-base/95 backdrop-blur-sm">
      <div className="wrap flex h-14 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold text-zinc-100">
          vantage<span className="text-zinc-600">/</span>
        </Link>

        <nav className="hidden gap-1 sm:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className={`px-3 py-1.5 font-mono text-sm ${
                active(l.href)
                  ? "border border-zinc-700 text-zinc-100"
                  : "border border-transparent text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="border border-zinc-800 px-3 py-1.5 font-mono text-sm text-zinc-300 sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "close" : "menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-zinc-800 sm:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`wrap block border-b border-zinc-900 py-3 font-mono text-sm ${
                active(l.href) ? "text-zinc-100" : "text-zinc-500"
              }`}
            >
              {active(l.href) ? "> " : "  "}
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
