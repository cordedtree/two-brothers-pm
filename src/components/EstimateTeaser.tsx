'use client';

import { useState, type FormEvent } from 'react';
import { useReveal } from '@/lib/useReveal';

export function EstimateTeaser() {
  const revealRef = useReveal();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="estimate" className="bg-paper py-[120px] lg:py-[160px]">
      <div
        ref={revealRef}
        className="reveal max-w-7xl mx-auto px-6 lg:px-12"
      >
        <p className="section-number mb-12">04 &mdash; Estimate</p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column — Text */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl text-ink font-light tracking-tight leading-[1.1]">
              Get your free estimate.
            </h2>
            <p className="text-ink/70 text-base lg:text-lg mt-6 leading-relaxed max-w-lg">
              Tell us about your property and the services you need. We&apos;ll
              get back to you with transparent, itemized pricing &mdash; usually
              within 24 hours.
            </p>
          </div>

          {/* Right Column — Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="font-heading text-2xl text-ink font-light">
                  Thank you.
                </span>
                <p className="text-ink/50 text-sm font-body mt-3">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <label className="font-heading text-[11px] uppercase tracking-[2px] text-ink/50 block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-0 border-b border-ink/20 text-ink font-body text-base py-3 px-0 focus:outline-none focus:border-copper transition-colors placeholder:text-ink/25"
                    placeholder="Full name"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="font-heading text-[11px] uppercase tracking-[2px] text-ink/50 block mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full bg-transparent border-0 border-b border-ink/20 text-ink font-body text-base py-3 px-0 focus:outline-none focus:border-copper transition-colors placeholder:text-ink/25"
                    placeholder="Property address"
                  />
                </div>

                {/* Phone & Email — 2-col */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-heading text-[11px] uppercase tracking-[2px] text-ink/50 block mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full bg-transparent border-0 border-b border-ink/20 text-ink font-body text-base py-3 px-0 focus:outline-none focus:border-copper transition-colors placeholder:text-ink/25"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="font-heading text-[11px] uppercase tracking-[2px] text-ink/50 block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-0 border-b border-ink/20 text-ink font-body text-base py-3 px-0 focus:outline-none focus:border-copper transition-colors placeholder:text-ink/25"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="font-heading text-[11px] uppercase tracking-[2px] text-ink/50 block mb-2">
                    Service
                  </label>
                  <select
                    name="service"
                    required
                    className="w-full bg-transparent border-0 border-b border-ink/20 text-ink font-body text-base py-3 px-0 focus:outline-none focus:border-copper transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option value="lawn-care">Lawn Care</option>
                    <option value="landscaping">Landscaping</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="font-heading text-[11px] uppercase tracking-[2px] text-ink/50 block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-transparent border-0 border-b border-ink/20 text-ink font-body text-base py-3 px-0 focus:outline-none focus:border-copper transition-colors resize-none placeholder:text-ink/25"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-copper text-void font-heading text-sm uppercase tracking-[3px] py-4 hover:bg-copper/90 transition-colors"
                >
                  Request Estimate
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
