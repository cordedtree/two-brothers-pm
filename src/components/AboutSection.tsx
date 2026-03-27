'use client';

import Image from 'next/image';
import { useReveal } from '@/lib/useReveal';
import { BUSINESS } from '@/lib/constants';

export function AboutSection() {
  const revealRef = useReveal();

  return (
    <section id="about" className="bg-paper py-[120px] lg:py-[160px]">
      <div ref={revealRef} className="reveal max-w-7xl mx-auto px-6 lg:px-12">
        <p className="section-number mb-12">06 &mdash; About Us</p>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column — Salyersville Aerial */}
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] relative overflow-hidden border border-limestone">
              <Image
                src="/salyersville-aerial.jpg"
                alt="Aerial view of Salyersville, Kentucky — The Gateway to Appalachia"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Right Column — Bio */}
          <div className="lg:col-span-3">
            <p className="eyebrow mb-6">Who we are</p>
            <h2 className="font-heading text-4xl md:text-5xl text-ink font-light tracking-tight">
              Two brothers. Honest work.
            </h2>

            <div className="mt-6 space-y-4">
              <p className="text-ink/70 text-base lg:text-lg leading-relaxed font-body">
                We&apos;re two brothers from Salyersville, KY. We grew up
                working outside &mdash; helping family, helping neighbors,
                doing whatever needed doing. That&apos;s just how it was around
                here.
              </p>
              <p className="text-ink/70 text-base lg:text-lg leading-relaxed font-body">
                We started {BUSINESS.name} because we saw too many
                people getting let down &mdash; no-shows, vague pricing, work
                that didn&apos;t hold up. Our approach is simple: show up on
                time, do the job right, and leave your property better than we
                found it.
              </p>
            </div>

            {/* Contact Details */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/50">
                  Phone 1
                </p>
                <p className="text-ink text-sm font-body mt-1">
                  {BUSINESS.phone1}
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/50">
                  Phone 2
                </p>
                <p className="text-ink text-sm font-body mt-1">
                  {BUSINESS.phone2}
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/50">
                  Availability
                </p>
                <p className="text-ink text-sm font-body mt-1">
                  7 Days a Week
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/50">
                  Area
                </p>
                <p className="text-ink text-sm font-body mt-1">{BUSINESS.serviceArea}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
