import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICE_CATEGORIES } from '@/lib/services-data';
import { BUSINESS } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = SERVICE_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.title} | Two Brother's Property Management`,
    description: category.description,
  };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = SERVICE_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20">
      {/* ── Hero ── */}
      <section className="bg-deep py-[80px] lg:py-[100px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="font-mono text-[11px] text-sage tracking-[2px]">
            <Link href="/services" className="hover:text-chalk transition-colors">
              Services
            </Link>
            {' / '}
            <span>{category.title}</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-chalk font-light tracking-tight mt-4">
            {category.headline}
          </h1>
          <p className="text-limestone/60 text-lg mt-6 max-w-3xl leading-relaxed">
            {category.longDescription}
          </p>
        </div>
      </section>

      {/* ── Services List ── */}
      <section className="bg-chalk py-[80px]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <span className="eyebrow mb-8 block">Services</span>
          <div>
            {category.subServices.map((service, i) => (
              <div
                key={service.id}
                className={`py-8 ${
                  i < category.subServices.length - 1
                    ? 'border-b border-limestone/30'
                    : ''
                }`}
              >
                <h3 className="font-heading text-2xl text-ink font-light">
                  {service.name}
                </h3>
                <p className="text-ink/60 text-base mt-3 leading-relaxed font-body max-w-2xl">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-paper py-[80px]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-ink font-light mb-10">
            Frequently Asked Questions
          </h2>
          <div>
            {category.faq.map((item, i) => (
              <div
                key={i}
                className={`py-6 ${
                  i < category.faq.length - 1
                    ? 'border-b border-limestone/30'
                    : ''
                }`}
              >
                <h3 className="text-ink font-body font-medium">
                  {item.question}
                </h3>
                <p className="text-ink/60 text-sm font-body mt-3 leading-relaxed">
                  {item.answer}
                </p>
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
