'use client';

import { useReveal } from '@/lib/useReveal';
import { BUSINESS } from '@/lib/constants';

export function CTASection() {
  const revealRef = useReveal();

  return (
    <section id="cta" className="bg-void py-[120px] lg:py-[160px]">
      <div ref={revealRef} className="reveal max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-chalk font-light tracking-tight">
          Your property deserves better.
        </h2>
        <p className="text-limestone/50 text-lg mt-6 max-w-xl mx-auto">
          Call or text us for a free estimate. No obligation. No pressure.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:+1${BUSINESS.phone1Raw}`}
            className="btn-copper"
          >
            Call {BUSINESS.phone1}
          </a>
          <a
            href={`tel:+1${BUSINESS.phone2Raw}`}
            className="btn-outline text-chalk border-chalk/30 hover:bg-chalk/10 hover:text-chalk"
          >
            Call {BUSINESS.phone2}
          </a>
        </div>
      </div>
    </section>
  );
}
