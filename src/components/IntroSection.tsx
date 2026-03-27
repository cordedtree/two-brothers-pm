'use client';

import { useReveal } from '@/lib/useReveal';

const STATS = [
  { value: '5', label: 'Counties Served' },
  { value: '2', label: 'Brothers' },
  { value: '7', label: 'Days a Week' },
];

export function IntroSection() {
  const revealRef = useReveal();

  return (
    <section id="intro" className="bg-chalk py-[120px] lg:py-[160px]">
      <div ref={revealRef} className="reveal max-w-7xl mx-auto px-6 lg:px-12">
        <p className="section-number mb-12">01 &mdash; About</p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ink font-light tracking-tight leading-[1.1]">
              Not another
              <br />
              mow-and-go operation.
            </h2>
          </div>

          {/* Right Column */}
          <div>
            <p className="text-ink/70 text-base lg:text-lg leading-relaxed font-body">
              We&apos;re two brothers from Salyersville, KY. We grew up working
              outside &mdash; helping family, helping neighbors, doing whatever
              needed doing. We saw people around here who needed reliable help
              with their yards and properties but kept running into the same
              problems &mdash; no-shows, vague pricing, sloppy work.
            </p>
            <p className="text-ink/70 text-base lg:text-lg leading-relaxed font-body mt-6">
              We figured we could do better. From routine lawn maintenance to
              storm cleanup and property clean-outs, we do honest,
              straightforward work. No shortcuts. No half-measures. Just two
              brothers who show up and get it done.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-3xl text-copper">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/50 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
