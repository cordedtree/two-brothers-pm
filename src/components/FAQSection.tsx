'use client';

import { useState } from 'react';
import { useReveal } from '@/lib/useReveal';

const FAQ_ITEMS = [
  {
    question: 'How quickly can you start on my property?',
    answer:
      'Most new customers are scheduled within one week. For urgent needs like storm cleanup, call us directly and we\'ll get there as fast as we can.',
  },
  {
    question: 'Do you require contracts or long-term commitments?',
    answer:
      'No. We don\'t do contracts and we don\'t do hidden fees. We offer recurring service plans, but everything is flexible. You can pause, adjust, or cancel at any time.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We serve Magoffin County and the surrounding Eastern Kentucky area — Floyd, Johnson, Morgan, and Breathitt counties. Not listed? Call us anyway. If we can get to you, we will.',
  },
  {
    question: 'How do I get an estimate?',
    answer:
      'Just call or text either number. We\'ll ask a few questions, set up a time to come look at your property, and give you a straight price. Every estimate is free — no pressure, no obligation.',
  },
  {
    question: 'How does your estimate process work?',
    answer:
      'Give us a call or use the free estimate tool on our website. We\'ll assess the property and deliver transparent, straightforward pricing. No surprises.',
  },
  {
    question: 'What happens if I\'m not satisfied with the work?',
    answer:
      'We stand behind every job. If something doesn\'t meet your expectations, let us know and we\'ll make it right at no additional cost.',
  },
];

export function FAQSection() {
  const revealRef = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-deep py-[120px] lg:py-[160px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div ref={revealRef} className="reveal max-w-3xl mx-auto px-6 lg:px-12">
        <p className="section-number mb-12">09 &mdash; FAQ</p>
        <h2 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight mb-16">
          Common questions.
        </h2>

        <div>
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border-b border-chalk/5">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-heading text-xl md:text-2xl text-chalk/90 pr-8">
                  {item.question}
                </span>
                <span
                  className={`text-copper text-2xl shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="font-body text-base text-limestone/70 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
