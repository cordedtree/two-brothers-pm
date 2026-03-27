import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITIES, SERVICE_CATEGORIES } from '@/lib/services-data';
import { BUSINESS } from '@/lib/constants';

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) return {};
  return {
    title: `${city.name} Lawn Care & Property Management | Two Brother's Property Management`,
    description: `Professional lawn care and property management in ${city.name}, Kentucky. Mowing, weed control, storm cleanup, and more from Two Brother's Property Management.`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20">
      {/* ── Hero ── */}
      <section className="bg-deep py-[80px] lg:py-[100px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="eyebrow">Service Area</span>
          <h1 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight mt-4">
            {city.name} Lawn Care &amp; Property Management
          </h1>
          <p className="text-limestone/50 text-lg mt-4 max-w-2xl">
            Professional lawn care and property management for {city.name} and
            surrounding communities. Locally owned in Salyersville, KY.
          </p>
        </div>
      </section>

      {/* ── Neighborhoods ── */}
      <section className="bg-chalk py-[60px]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <span className="eyebrow mb-6 block">Communities We Serve</span>
          <div className="flex flex-wrap gap-3">
            {city.neighborhoods.map((neighborhood) => (
              <span
                key={neighborhood}
                className="bg-paper border border-limestone/30 px-4 py-2 text-sm text-ink/70 font-body"
              >
                {neighborhood}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-paper py-[80px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-ink font-light mb-10">
            Our Services in {city.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICE_CATEGORIES.map((category) => (
              <div
                key={category.slug}
                className="bg-chalk border border-limestone/30 p-8"
              >
                <span className="eyebrow">{category.title}</span>

                <div className="mt-4 space-y-2">
                  {category.subServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-copper rounded-full flex-shrink-0" />
                      <span className="text-ink/70 text-sm font-body">
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${category.slug}`}
                  className="text-copper font-mono text-sm mt-6 inline-block hover:text-copper-light transition-colors"
                >
                  View All {category.title} Services &rarr;
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
            Get your free estimate in {city.name}.
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
