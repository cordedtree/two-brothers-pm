"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { ServiceIcon } from "@/components/service-icon";
import { VideoHero } from "@/components/video-hero";
import { BeforeAfter } from "@/components/before-after";
import { CtaSection } from "@/components/cta-banner";
import { Reveal, StaggerGroup, staggerChild, ZoomImage, DrawLine } from "@/components/motion";

export function HomeContent() {
  return (
    <>
      <VideoHero />

      {/* The brothers — asymmetric overlap layout */}
      <section className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
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

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-field-green">
                Who we are
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 font-heading text-3xl text-dark-green md:text-4xl">
                Two brothers. Your neighbors.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 leading-relaxed text-slate">
                We&apos;re not a franchise. When you call, you&apos;re talking to one
                of us. We live in {BUSINESS.location}, and every property we work on
                is in our own community. Started in {BUSINESS.founded} because people
                around here needed someone reliable — and that&apos;s what we are.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-field-green transition-colors hover:text-dark-green"
              >
                More about us <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <DrawLine />

      {/* Services — editorial list */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-field-green">
            What we do
          </p>
          <h2 className="mt-3 font-heading text-3xl text-dark-green md:text-4xl">
            The work we take on.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 space-y-0" stagger={0.08}>
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerChild}
              className="group grid items-start gap-x-8 border-t border-light-gray py-6 transition-colors hover:bg-white/50 md:grid-cols-12 md:px-4"
            >
              <div className="flex items-center gap-3 md:col-span-4">
                <ServiceIcon
                  icon={service.icon}
                  size={20}
                  className="text-field-green transition-transform group-hover:scale-110"
                />
                <h3 className="text-lg text-dark-green">{service.title}</h3>
              </div>
              <p className="mt-1.5 leading-relaxed text-slate md:col-span-8 md:mt-0">
                {service.description}
              </p>
            </motion.div>
          ))}
        </StaggerGroup>

        <Reveal delay={0.2}>
          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-field-green hover:text-dark-green"
          >
            See all services in detail <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>

      {/* Image mosaic */}
      <div className="grid grid-cols-3 gap-0.5 bg-light-gray">
        <ZoomImage className="relative col-span-2 aspect-[2/1]">
          <Image
            src="/images/trimmer-action.jpg"
            alt="Trimming grass along a fence line"
            fill
            className="object-cover"
            sizes="67vw"
          />
        </ZoomImage>
        <ZoomImage className="relative aspect-square">
          <Image
            src="/images/mow-pattern.jpg"
            alt="Aerial view of mowing pattern"
            fill
            className="object-cover"
            sizes="33vw"
          />
        </ZoomImage>
      </div>

      {/* Before / After */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-field-green">
                The difference
              </p>
              <h2 className="mt-3 font-heading text-3xl text-dark-green md:text-4xl">
                See what a good crew can do.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Drag the slider to see a property before and after we got to it.
                This is the kind of work we do — no filters, no tricks.
              </p>
            </Reveal>
          </div>
          <Reveal className="md:col-span-8" delay={0.15}>
            <BeforeAfter
              before={{ src: "/images/before-yard.jpg", alt: "Overgrown yard before cleanup" }}
              after={{ src: "/images/after-yard.jpg", alt: "Clean yard after our work" }}
              className="aspect-[16/10] rounded-sm"
            />
          </Reveal>
        </div>
      </section>

      {/* Plain-spoken pitch */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Reveal>
                <h2 className="font-heading text-3xl text-dark-green md:text-4xl">
                  We keep it simple.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-6 space-y-4 leading-relaxed text-slate">
                  <p>
                    You call. We come look at your property and tell you what
                    it&apos;ll cost — no surprises, no upsells. If you want it done,
                    we schedule it and show up.
                  </p>
                  <p>
                    We don&apos;t do contracts. We don&apos;t do hidden fees. If
                    you&apos;re not happy with the work, tell us and we&apos;ll
                    make it right.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <ZoomImage className="relative aspect-[4/3] rounded-sm">
                <Image
                  src="/images/weed-detail.jpg"
                  alt="Detail of garden work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </ZoomImage>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
