'use client';

import { useReveal } from '@/lib/useReveal';
import { TESTIMONIALS } from '@/lib/services-data';

export function TestimonialsSection() {
  const revealRef = useReveal();

  const featured = TESTIMONIALS.filter((t) => t.featured);
  const others = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <section id="testimonials" className="bg-deep py-[120px] lg:py-[160px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="section-number mb-12">07 &mdash; Testimonials</p>
        <h2 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight mb-16">
          What they say.
        </h2>

        <div ref={revealRef} className="reveal grid lg:grid-cols-3 gap-4">
          {/* Featured Testimonial */}
          {featured.map((testimonial) => (
            <div
              key={testimonial.name}
              className="lg:col-span-2 lg:row-span-2 bg-moss/15 border border-moss/20 p-8 lg:p-12"
            >
              <span className="font-heading text-6xl text-copper/30 leading-none mb-4 block">
                &ldquo;
              </span>
              <p className="font-heading text-2xl lg:text-3xl text-chalk/90 font-light leading-relaxed italic">
                {testimonial.text}
              </p>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[3px] text-copper">
                {testimonial.name}
              </p>
            </div>
          ))}

          {/* Other Testimonials */}
          {others.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-void border border-sage/10 p-6 lg:p-8"
            >
              <span className="font-heading text-3xl text-copper/20 leading-none mb-3 block">
                &ldquo;
              </span>
              <p className="text-limestone/70 text-sm font-body leading-relaxed italic">
                {testimonial.text}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[2px] text-sage">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
