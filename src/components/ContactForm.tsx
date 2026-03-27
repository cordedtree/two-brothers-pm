'use client';

import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    alert("Thank you! We'll be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
    setSubmitted(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-paper border border-limestone/30 p-8 lg:p-10"
    >
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-[10px] uppercase tracking-[2px] text-ink/50 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-3 bg-chalk border border-limestone text-ink font-body text-sm focus:outline-none focus:border-copper transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block font-mono text-[10px] uppercase tracking-[2px] text-ink/50 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-3 bg-chalk border border-limestone text-ink font-body text-sm focus:outline-none focus:border-copper transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block font-mono text-[10px] uppercase tracking-[2px] text-ink/50 mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full p-3 bg-chalk border border-limestone text-ink font-body text-sm focus:outline-none focus:border-copper transition-colors"
          />
        </div>

        {/* Service Needed */}
        <div>
          <label
            htmlFor="service"
            className="block font-mono text-[10px] uppercase tracking-[2px] text-ink/50 mb-2"
          >
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            required
            className="w-full p-3 bg-chalk border border-limestone text-ink font-body text-sm focus:outline-none focus:border-copper transition-colors"
          >
            <option value="">Select a service</option>
            <option value="lawn-care">Lawn Care</option>
            <option value="landscaping">Landscaping</option>
            <option value="both">Both</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block font-mono text-[10px] uppercase tracking-[2px] text-ink/50 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="w-full p-3 bg-chalk border border-limestone text-ink font-body text-sm focus:outline-none focus:border-copper transition-colors min-h-[120px]"
          />
        </div>
      </div>

      <button type="submit" className="btn-copper w-full py-3 mt-6">
        Send Message
      </button>
    </form>
  );
}
