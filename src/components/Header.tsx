'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';

const NAV_ITEMS = [
  { number: '01', label: 'Services', href: '/services' },
  { number: '02', label: 'Process', href: '/#process' },
  { number: '03', label: 'Areas', href: '/#areas' },
  { number: '04', label: 'About', href: '/about' },
  { number: '05', label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-void/95 backdrop-blur-md border-b border-copper/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo-mark.png"
                alt={BUSINESS.name}
                width={48}
                height={48}
                className="h-11 w-11"
                priority
              />
              <span className="font-heading text-2xl lg:text-3xl font-semibold text-chalk tracking-tight">
                Two Brother&apos;s
              </span>
            </Link>

            {/* Right: CTA + Menu Icon */}
            <div className="flex items-center gap-6">
              {/* Estimate button hidden for now (phone-only CTA) */}
              {/* <Link
                href="/estimate"
                className="btn-copper text-sm px-5 py-2.5 tracking-wide hidden sm:inline-block"
              >
                Get Your Free Estimate
              </Link> */}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col gap-1.5 p-2 z-50"
                aria-label="Toggle menu"
              >
                <span className="block w-6 h-px bg-chalk" />
                <span className="block w-6 h-px bg-chalk" />
                <span className="block w-6 h-px bg-chalk" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-void/95"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 font-heading text-3xl text-chalk hover:text-copper transition-colors"
              aria-label="Close menu"
            >
              &times;
            </button>

            {/* Centered Nav */}
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.number}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-baseline gap-4 group"
                >
                  <span className="font-mono text-chalk/40 text-sm">
                    {item.number}
                  </span>
                  <span
                    className="font-heading text-chalk hover:text-copper transition-colors duration-300"
                    style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}

              {/* Bottom Contact Info */}
              <div className="mt-12 flex flex-col items-center gap-2">
                <a
                  href={`tel:+1${BUSINESS.phone1Raw}`}
                  className="font-mono text-xs text-limestone/50 hover:text-copper transition-colors"
                >
                  {BUSINESS.phone1}
                </a>
                <a
                  href={`tel:+1${BUSINESS.phone2Raw}`}
                  className="font-mono text-xs text-limestone/50 hover:text-copper transition-colors"
                >
                  {BUSINESS.phone2}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
