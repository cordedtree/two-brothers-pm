import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_CATEGORIES } from '@/lib/services-data';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Services | Two Brother's Property Management`,
  description:
    'Professional lawn care and property management in Eastern Kentucky. Mowing, weed control, storm cleanup, seasonal maintenance, and more.',
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20 bg-chalk">
      {/* ── Hero ── */}
      <section className="bg-deep py-[80px] lg:py-[100px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="eyebrow">What We Do</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-chalk font-light tracking-tight mt-4">
            Two divisions. One standard.
          </h1>
          <p className="text-limestone/50 text-lg mt-4 max-w-2xl">
            From routine lawn maintenance to full landscape transformations, every
            job gets the same level of care, communication, and craftsmanship.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="bg-chalk py-[80px] lg:py-[100px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICE_CATEGORIES.map((category) => (
              <div
                key={category.slug}
                className="bg-paper border border-limestone/50 p-8 lg:p-10"
              >
                <span className="eyebrow">{category.title}</span>
                <h2 className="font-heading text-3xl text-ink font-light mt-3">
                  {category.headline}
                </h2>
                <p className="text-ink/60 text-base mt-4 leading-relaxed font-body">
                  {category.description}
                </p>

                <div className="mt-6 space-y-3">
                  {category.subServices.map((service) => (
                    <div
                      key={service.id}
                      className="border-l-2 border-copper/30 pl-4 py-1"
                    >
                      <p className="text-ink/80 text-sm font-body font-medium">
                        {service.name}
                      </p>
                      <p className="text-ink/50 text-xs font-body mt-0.5">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${category.slug}`}
                  className="mt-8 inline-block text-copper font-mono text-sm hover:text-copper-light transition-colors"
                >
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-deep py-[60px]">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-3xl text-chalk font-light">
            Ready to get started?
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:+1${BUSINESS.phone1Raw}`} className="btn-copper">
              Call {BUSINESS.phone1}
            </a>
            <a
              href={`tel:+1${BUSINESS.phone2Raw}`}
              className="btn-outline text-chalk border-chalk/30"
            >
              Call {BUSINESS.phone2}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
