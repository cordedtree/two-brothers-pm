"use client";

import Image from "next/image";
import { Phone, ChatText, MapPin } from "@phosphor-icons/react";
import { BUSINESS } from "@/lib/constants";
import { Reveal, ZoomImage, DrawLine } from "@/components/motion";

export function ContactContent() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="grid gap-12 md:grid-cols-12">
        {/* Contact info */}
        <div className="md:col-span-7">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-field-green">Contact</p>
            <h1 className="mt-2 font-heading text-3xl text-dark-green md:text-4xl lg:text-5xl">
              Give us a call.
            </h1>
            <p className="mt-4 max-w-md text-slate">
              Best way to reach us is by phone or text. We answer — and if
              we&apos;re out on a job, we&apos;ll get back to you quick.
            </p>
          </Reveal>

          {/* Phone numbers — large */}
          <Reveal delay={0.15}>
            <div className="mt-10 space-y-4">
              <a
                href={BUSINESS.phone1Tel}
                className="group flex items-center gap-4"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-field-green/20 text-field-green transition-colors group-hover:border-field-green group-hover:bg-field-green group-hover:text-white">
                  <Phone size={22} weight="fill" />
                </span>
                <span className="font-heading text-2xl text-dark-green md:text-3xl">
                  {BUSINESS.phone1}
                </span>
              </a>

              <a
                href={BUSINESS.phone2Tel}
                className="group flex items-center gap-4"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-field-green/20 text-field-green transition-colors group-hover:border-field-green group-hover:bg-field-green group-hover:text-white">
                  <Phone size={22} weight="fill" />
                </span>
                <span className="font-heading text-2xl text-dark-green md:text-3xl">
                  {BUSINESS.phone2}
                </span>
              </a>
            </div>
          </Reveal>

          <DrawLine className="my-8" />

          <Reveal delay={0.25}>
            <div className="space-y-5 text-sm text-slate">
              <div className="flex items-start gap-3">
                <ChatText size={18} className="mt-0.5 shrink-0 text-field-green" />
                <p>
                  Texting works just as well. Send us a message with what you need
                  and we&apos;ll get right back to you.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-field-green" />
                <p>
                  {BUSINESS.location} — serving Magoffin County and the surrounding
                  area in Eastern Kentucky.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 text-sm text-slate">
              Every estimate is free. No obligation, no pressure.
            </p>
          </Reveal>
        </div>

        {/* Image stack */}
        <div className="space-y-3 md:col-span-5">
          <Reveal delay={0.1}>
            <ZoomImage className="relative aspect-[4/3] rounded-sm">
              <Image
                src="/images/tidy-yard.jpg"
                alt="Well-maintained property"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </ZoomImage>
          </Reveal>
          <Reveal delay={0.2}>
            <ZoomImage className="relative aspect-[3/2] rounded-sm">
              <Image
                src="/images/mow-pattern.jpg"
                alt="Clean mowing lines"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </ZoomImage>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
