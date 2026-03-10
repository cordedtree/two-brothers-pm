"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, Phone } from "@phosphor-icons/react";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";
import { Logo } from "./logo";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* Top strip — phone numbers, always visible */}
      <div className="bg-dark-green px-4 py-1.5 text-sm text-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="hidden text-xs text-white/50 sm:inline">
            {BUSINESS.location}
          </span>
          <div className="flex gap-4 text-xs sm:text-sm">
            <a href={BUSINESS.phone1Tel} className="flex items-center gap-1 hover:text-white">
              <Phone size={12} weight="fill" />
              {BUSINESS.phone1}
            </a>
            <a href={BUSINESS.phone2Tel} className="flex items-center gap-1 hover:text-white">
              <Phone size={12} weight="fill" />
              {BUSINESS.phone2}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-light-gray bg-warm-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto text-dark-green" />
          </Link>

          {/* Desktop nav — right-aligned, no CTA button */}
          <nav className="hidden gap-6 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    active
                      ? "text-field-green"
                      : "text-slate hover:text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="p-2 text-charcoal md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="border-t border-light-gray px-4 pb-4 md:hidden" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 text-sm ${
                    active ? "text-field-green" : "text-slate"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
