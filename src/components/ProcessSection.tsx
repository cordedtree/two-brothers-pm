'use client';

import { useReveal } from '@/lib/useReveal';

const STEPS = [
  {
    number: '01',
    title: 'Assess',
    description:
      'We walk the property with you, identify priorities, and understand your vision.',
    bullets: [
      'On-site walkthrough',
      'Photo documentation',
      'Priority mapping',
    ],
  },
  {
    number: '02',
    title: 'Quote',
    description:
      'You receive a transparent, itemized estimate — no hidden fees, no surprises.',
    bullets: [
      'Line-item pricing',
      'Scope of work detail',
      'Flexible scheduling',
    ],
  },
  {
    number: '03',
    title: 'Execute',
    description:
      'Our crew arrives on schedule and completes the work to specification.',
    bullets: [
      'On-time arrival',
      'Clean job site',
      'Progress updates',
    ],
  },
  {
    number: '04',
    title: 'Verify',
    description:
      'We do a final walkthrough to make sure everything meets our standard — and yours.',
    bullets: [
      'Final inspection',
      'Photo comparison',
      'Satisfaction guarantee',
    ],
  },
];

export function ProcessSection() {
  const revealRef = useReveal();

  return (
    <section className="bg-paper py-[120px] lg:py-[160px]">
      <div
        ref={revealRef}
        className="reveal max-w-7xl mx-auto px-6 lg:px-12"
      >
        <p className="section-number mb-12">02 &mdash; Process</p>
        <h2 className="font-heading text-4xl md:text-5xl text-ink font-light tracking-tight mb-16">
          How we work.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group border-t-2 border-transparent hover:border-copper transition-colors duration-300 pt-8"
            >
              <span
                className="font-heading font-bold text-ink/10 block leading-none"
                style={{ fontSize: 'clamp(60px, 8vw, 80px)' }}
              >
                {step.number}
              </span>

              <h3 className="font-heading text-xl text-ink font-bold mt-4">
                {step.title}
              </h3>

              <p className="text-ink/70 text-sm font-body mt-3 leading-relaxed">
                {step.description}
              </p>

              <ul className="mt-4 space-y-2">
                {step.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-ink/70 text-sm font-body flex items-start gap-2"
                  >
                    <span className="text-copper font-bold shrink-0">
                      &mdash;
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
