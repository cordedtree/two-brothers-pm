import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `About | ${BUSINESS.name}`,
  description: `Two brothers from Salyersville, KY — honest, reliable lawn care and property management across Eastern Kentucky. Locally owned, started in 2025.`,
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      {/* ── Hero ── */}
      <section className="bg-deep py-[80px] lg:py-[100px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="eyebrow">About Us</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-chalk font-light tracking-tight mt-4">
            Two brothers. One standard.
          </h1>
          <p className="text-limestone/50 text-lg mt-4 max-w-2xl">
            Locally owned in Salyersville, KY — serving Magoffin County and
            the surrounding Eastern Kentucky area.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-chalk py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Photo placeholder */}
            <div className="lg:col-span-2">
              <div className="aspect-[3/4] bg-limestone/50 border border-limestone flex items-center justify-center">
                <span className="text-ink/30 font-mono text-sm tracking-widest uppercase">
                  Photo
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3">
              <span className="eyebrow">Our Story</span>
              <h2 className="font-heading text-4xl text-ink font-light mt-3">
                Built on hard work, not promises.
              </h2>
              <div className="mt-6 space-y-4 text-ink/70 text-base lg:text-lg leading-relaxed font-body">
                <p>
                  We&apos;re two brothers from Salyersville, KY. We grew up
                  working outside &mdash; helping family, helping neighbors,
                  doing whatever needed doing. Mowing, clearing brush, fixing
                  fences, hauling off junk. That&apos;s just how it was.
                </p>
                <p>
                  We saw people around here who needed reliable help with their
                  yards and properties but kept running into the same problems
                  &mdash; no-shows, vague pricing, sloppy work. We figured we
                  could do better. So in 2025, we made it official.
                </p>
                <p>
                  Our approach is simple: show up when we say we will, do the
                  job right, and charge a fair price. No contracts, no fine
                  print, no runaround. If you&apos;re not happy with the work,
                  tell us and we&apos;ll make it right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-paper py-[80px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-heading text-3xl text-ink font-light mb-12">
            How we work.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-chalk border border-limestone/30 p-8">
              <span className="eyebrow">Reliability</span>
              <p className="text-ink/60 text-sm mt-3 font-body leading-relaxed">
                We show up when we say we will. Every time. No excuses, no
                rescheduling.
              </p>
            </div>
            <div className="bg-chalk border border-limestone/30 p-8">
              <span className="eyebrow">Quality</span>
              <p className="text-ink/60 text-sm mt-3 font-body leading-relaxed">
                Every cut, every edge, every detail matters. We don&apos;t do
                half-measures.
              </p>
            </div>
            <div className="bg-chalk border border-limestone/30 p-8">
              <span className="eyebrow">Communication</span>
              <p className="text-ink/60 text-sm mt-3 font-body leading-relaxed">
                You&apos;ll always know what&apos;s happening with your property.
                Clear updates, honest pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-deep py-[60px]">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-3xl text-chalk font-light">
            Work with us.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:+1${BUSINESS.phone1Raw}`}
              className="btn-copper"
            >
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
