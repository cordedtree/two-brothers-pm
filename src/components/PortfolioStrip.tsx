'use client';

import { useReveal } from '@/lib/useReveal';

const GRADIENTS = [
  'from-moss/30 to-deep',
  'from-copper/20 to-void',
  'from-sage/30 to-moss/50',
  'from-deep to-void',
  'from-moss/30 to-deep',
  'from-copper/20 to-void',
  'from-sage/30 to-moss/50',
  'from-deep to-void',
];

function ProjectCard({ index, gradient }: { index: number; gradient: string }) {
  const label = `Project ${String(index + 1).padStart(2, '0')}`;
  return (
    <div
      className={`shrink-0 w-[300px] h-[200px] lg:w-[400px] lg:h-[280px] bg-gradient-to-br ${gradient} relative overflow-hidden`}
    >
      <span className="absolute bottom-4 left-4 font-mono text-[10px] text-chalk/40 uppercase tracking-[2px]">
        {label}
      </span>
    </div>
  );
}

export function PortfolioStrip() {
  const revealRef = useReveal();

  const cards = GRADIENTS.map((gradient, i) => (
    <ProjectCard key={`a-${i}`} index={i} gradient={gradient} />
  ));

  const cardsDuplicate = GRADIENTS.map((gradient, i) => (
    <ProjectCard key={`b-${i}`} index={i} gradient={gradient} />
  ));

  return (
    <section id="portfolio" className="bg-chalk py-[80px] lg:py-[100px]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-number mb-8">05 &mdash; Work</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="font-heading text-3xl text-ink font-light">
          Selected work.
        </h2>
      </div>
      <div ref={revealRef} className="reveal overflow-hidden relative">
        <div className="flex gap-4 animate-marquee">
          {cards}
          {cardsDuplicate}
        </div>
      </div>
    </section>
  );
}
