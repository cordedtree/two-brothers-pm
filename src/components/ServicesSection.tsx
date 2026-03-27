'use client';

import Link from 'next/link';
import { useReveal } from '@/lib/useReveal';
import { LAWN_CARE_SERVICES } from '@/lib/services-data';

export function ServicesSection() {
  const revealRef = useReveal();

  return (
    <section id="services" className="bg-deep py-[120px] lg:py-[160px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="section-number mb-12">03 &mdash; Services</p>

        <h2 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight">
          The work we take on.
        </h2>
        <p className="text-limestone/50 text-lg max-w-2xl mt-4 mb-16">
          No contracts. No fine print. You tell us what you need, we tell you
          what it costs, and we get to work.
        </p>

        {/* Services Grid */}
        <div
          ref={revealRef}
          className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {LAWN_CARE_SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={`bg-moss/20 border border-moss/30 rounded-sm p-8 flex flex-col ${
                i === 0 ? 'lg:row-span-2' : ''
              }`}
            >
              <div className="border-l-2 border-copper/40 pl-4">
                <p className="eyebrow">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-heading text-2xl text-chalk mt-2">
                  {service.name}
                </h3>
              </div>

              <p className="text-limestone/60 text-sm leading-relaxed mt-5 flex-1">
                {service.description}
              </p>
            </div>
          ))}

          {/* CTA Card */}
          <div className="bg-copper rounded-sm p-8 flex flex-col justify-end">
            <h3 className="font-heading text-2xl text-void">
              Something else on your property?
            </h3>
            <p className="text-void/70 text-sm mt-2">
              If it needs doing and it&apos;s on your land, call us. We&apos;ll
              tell you straight whether we can handle it — and we usually can.
            </p>
            <Link
              href="/services/lawn-maintenance"
              className="text-void font-mono text-sm mt-4 inline-block"
            >
              See All Services &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
