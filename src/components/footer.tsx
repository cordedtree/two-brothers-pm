import Link from "next/link";
import { Phone, MapPin } from "@phosphor-icons/react/dist/ssr";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-dark-green/10 bg-dark-green text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Two-column: brand left, nav + contact right */}
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-xs">
            <p className="font-heading text-xl text-white">
              Two Brother&apos;s
            </p>
            <p className="mt-1 text-sm italic text-white/40">
              {BUSINESS.tagline}
            </p>
            <div className="mt-4 flex items-start gap-2 text-sm">
              <MapPin size={16} weight="fill" className="mt-0.5 shrink-0 text-white/40" />
              <span>{BUSINESS.location}</span>
            </div>
          </div>

          <div className="flex gap-12">
            {/* Nav */}
            <nav aria-label="Footer navigation">
              <ul className="space-y-1.5 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="space-y-1.5 text-sm">
              <a href={BUSINESS.phone1Tel} className="flex items-center gap-1.5 hover:text-white">
                <Phone size={14} weight="fill" />
                {BUSINESS.phone1}
              </a>
              <a href={BUSINESS.phone2Tel} className="flex items-center gap-1.5 hover:text-white">
                <Phone size={14} weight="fill" />
                {BUSINESS.phone2}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-4 text-xs text-white/30">
          &copy; {new Date().getFullYear()} {BUSINESS.name}
        </p>
      </div>
    </footer>
  );
}
