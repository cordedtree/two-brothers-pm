"use client";

import Image from "next/image";
import { BUSINESS } from "@/lib/constants";
import { CtaBlock, CtaSection } from "@/components/cta-banner";
import { Reveal, ZoomImage, DrawLine } from "@/components/motion";

export function AboutContent() {
  return (
    <>
      {/* Full-bleed landscape */}
      <div className="relative h-64 md:h-80">
        <Image
          src="/images/ky-landscape.jpg"
          alt="Eastern Kentucky rolling hills"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-white via-transparent to-transparent" />
      </div>

      {/* Story — overlapping the image */}
      <section className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 md:-mt-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <div className="bg-warm-white p-6 md:p-10">
                <p className="text-xs uppercase tracking-[0.2em] text-field-green">About</p>
                <h1 className="mt-2 font-heading text-3xl text-dark-green md:text-4xl">
                  Started in {BUSINESS.founded}.
                  <br />
                  Still answering our own phones.
                </h1>
                <div className="mt-6 space-y-4 leading-relaxed text-slate">
                  <p>
                    We&apos;re two brothers from {BUSINESS.location}. We grew up
                    working outside — helping family, helping neighbors, doing
                    whatever needed doing. Starting a property management business
                    wasn&apos;t some big master plan. We just kept getting asked,
                    so we made it official.
                  </p>
                  <p>
                    We saw a lot of people around here who needed reliable help with
                    their yards and properties but kept running into the same problems —
                    no-shows, vague pricing, sloppy work. We figured we could do better.
                  </p>
                  <p>
                    So here we are. Two guys, the equipment to get it done, and the
                    reputation we&apos;re building one yard at a time.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="md:col-span-5 md:mt-12" delay={0.2}>
            <ZoomImage className="relative aspect-[3/4] rounded-sm">
              <Image
                src="/images/brothers-flyer.jpg"
                alt="Two Brother's Property Management"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </ZoomImage>
          </Reveal>
        </div>
      </section>

      {/* What to expect */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <DrawLine className="mb-10" />
        <Reveal>
          <h2 className="font-heading text-2xl text-dark-green md:text-3xl">
            What to expect when you call.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-x-16 gap-y-8 sm:grid-cols-2">
          {[
            {
              label: "You tell us what you need.",
              text: "Call or text. We'll ask a few questions and set up a time to come look.",
            },
            {
              label: "We give you a straight price.",
              text: "After seeing the property, we tell you what it'll cost. That number doesn't change.",
            },
            {
              label: "We show up and do the work.",
              text: "When we say we'll be there, we're there. No chasing us down.",
            },
            {
              label: "You enjoy your yard.",
              text: "That's the whole point. Your property looks good without you spending your weekend on it.",
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <p className="font-medium text-dark-green">{item.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{item.text}</p>
            </Reveal>
          ))}
        </div>
        <CtaBlock text="Want to talk about your property? Call or text either number." />
      </section>

      {/* Bottom images */}
      <div className="grid grid-cols-2 gap-0.5 bg-light-gray">
        <ZoomImage className="relative aspect-[16/10]">
          <Image
            src="/images/tidy-yard.jpg"
            alt="Well-maintained property"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </ZoomImage>
        <ZoomImage className="relative aspect-[16/10]">
          <Image
            src="/images/fall-cleanup.jpg"
            alt="Seasonal cleanup"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </ZoomImage>
      </div>

      <CtaSection />
    </>
  );
}
