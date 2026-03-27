import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Contact | ${BUSINESS.name}`,
  description:
    "Get in touch with Two Brother's Property Management. Call or text us for a free estimate — serving Eastern Kentucky.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      {/* ── Hero ── */}
      <section className="bg-deep py-[60px] lg:py-[80px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="eyebrow">Contact</span>
          <h1 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight mt-4">
            Let&apos;s talk about your property.
          </h1>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-chalk py-[80px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="eyebrow mb-6 block">Get in Touch</span>

            <p className="text-ink/70 text-base lg:text-lg leading-relaxed font-body mb-10">
              The easiest way to reach us is by phone or text. Give us a call,
              tell us what you need, and we&apos;ll set up a time to come look
              at your property. Every estimate is free.
            </p>

            <div className="space-y-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40">
                  Phone 1
                </p>
                <a
                  href={`tel:+1${BUSINESS.phone1Raw}`}
                  className="text-ink text-lg font-body hover:text-copper transition-colors"
                >
                  {BUSINESS.phone1}
                </a>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40">
                  Phone 2
                </p>
                <a
                  href={`tel:+1${BUSINESS.phone2Raw}`}
                  className="text-ink text-lg font-body hover:text-copper transition-colors"
                >
                  {BUSINESS.phone2}
                </a>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40">
                  Available
                </p>
                <p className="text-ink text-base font-body">7 Days a Week</p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40">
                  Service Area
                </p>
                <p className="text-ink text-base font-body">
                  Eastern Kentucky &mdash; Magoffin, Floyd, Johnson, Morgan &amp; Breathitt Counties
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="mt-10">
              <span className="eyebrow mb-4 block">Follow Us</span>
              <div className="flex flex-col gap-2">
                <a
                  href={BUSINESS.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/60 hover:text-copper text-sm font-body transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
