'use client';

import Link from 'next/link';
import { useReveal } from '@/lib/useReveal';
import { CITIES } from '@/lib/services-data';

const tierStyles: Record<string, { size: string; weight: string; opacity: string }> = {
  primary: {
    size: 'clamp(48px, 6vw, 72px)',
    weight: 'bold',
    opacity: '1',
  },
  secondary: {
    size: 'clamp(32px, 4vw, 48px)',
    weight: '500',
    opacity: '0.4',
  },
  tertiary: {
    size: 'clamp(24px, 3vw, 32px)',
    weight: 'normal',
    opacity: '0.2',
  },
  quaternary: {
    size: 'clamp(18px, 2vw, 24px)',
    weight: 'normal',
    opacity: '0.15',
  },
};

export function ServiceAreas() {
  const revealRef = useReveal();

  return (
    <section id="areas" className="bg-chalk py-[120px] lg:py-[160px]">
      <div ref={revealRef} className="reveal max-w-7xl mx-auto px-6 lg:px-12">
        <p className="section-number mb-12">08 &mdash; Service Areas</p>
        <h2 className="font-heading text-4xl md:text-5xl text-ink font-light tracking-tight mb-16">
          Where we work.
        </h2>

        {/* Typographic Map */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-4 lg:gap-x-12 lg:gap-y-6 max-w-4xl mx-auto">
          {CITIES.map((city) => {
            const tier = tierStyles[city.importance] || tierStyles.tertiary;
            return (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="font-heading tracking-tight hover:text-copper transition-colors"
                style={{
                  fontSize: tier.size,
                  fontWeight: tier.weight,
                  opacity: tier.opacity,
                  fontStyle: (city.importance as string) === 'quaternary' ? 'italic' : 'normal',
                  color: 'var(--ink)',
                }}
              >
                {city.name}
              </Link>
            );
          })}
        </div>

        {/* Sub-text */}
        <div className="mt-16 text-center">
          <p className="text-ink/70 text-sm font-body">
            Don&apos;t see your area?
          </p>
          <p className="text-ink/70 text-sm font-body mt-1">
            Give us a call &mdash; we likely serve your neighborhood too.
          </p>
        </div>
      </div>
    </section>
  );
}
