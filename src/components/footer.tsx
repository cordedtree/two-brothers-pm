import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS } from '@/lib/constants';
import { CITIES } from '@/lib/services-data';

export function Footer() {
  return (
    <footer className="bg-void text-limestone/70 border-t border-copper/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <Image
                src="/logo-mark.png"
                alt={BUSINESS.name}
                width={40}
                height={48}
                className="h-10 w-auto"
              />
              <span className="font-heading text-2xl text-chalk font-semibold">Two Brother&apos;s</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              {BUSINESS.tagline}. Lawn care and property management
              across Eastern Kentucky.
            </p>
            <p className="mt-4 font-mono text-[11px] text-copper">
              {BUSINESS.status}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services/lawn-maintenance" className="hover:text-copper transition-colors">Mowing &amp; Edging</Link></li>
              <li><Link href="/services/lawn-maintenance" className="hover:text-copper transition-colors">Weed Control</Link></li>
              <li><Link href="/services/lawn-maintenance" className="hover:text-copper transition-colors">Storage Clean-outs</Link></li>
              <li><Link href="/services/lawn-maintenance" className="hover:text-copper transition-colors">Storm Cleanup</Link></li>
              <li><Link href="/services/lawn-maintenance" className="hover:text-copper transition-colors">Seasonal Clean-ups</Link></li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-5">
              Service Areas
            </h4>
            <ul className="space-y-3 text-sm">
              {CITIES.map((city) => (
                <li key={city.slug}>
                  <Link href={`/areas/${city.slug}`} className="hover:text-copper transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:+1${BUSINESS.phone1Raw}`} className="hover:text-copper transition-colors">
                  {BUSINESS.phone1}
                </a>
              </li>
              <li>
                <a href={`tel:+1${BUSINESS.phone2Raw}`} className="hover:text-copper transition-colors">
                  {BUSINESS.phone2}
                </a>
              </li>
              <li>
                <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-copper transition-colors">
                  Facebook
                </a>
              </li>
              <li className="font-mono text-[11px] text-sage">
                {BUSINESS.availability}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-limestone/40">
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-xs text-limestone/40">
            Made by{' '}
            <a
              href="https://originforge.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/60 font-mono hover:text-copper transition-colors"
            >
              Origin Forge
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
