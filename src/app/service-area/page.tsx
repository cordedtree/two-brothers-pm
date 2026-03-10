"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BUSINESS, SERVICE_AREA } from "@/lib/constants";
import { CtaSection } from "@/components/cta-banner";
import { Reveal, StaggerGroup, staggerChild } from "@/components/motion";

export default function ServiceAreaPage() {
  return (
    <>
      {/* Landscape video hero */}
      <div className="relative h-72 md:h-96">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/ky-landscape.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/images/ky-landscape-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-warm-white via-dark-green/30 to-dark-green/10" />
      </div>

      <section className="relative z-10 mx-auto -mt-20 max-w-6xl px-4 pb-16 md:pb-24">
        <Reveal>
          <div className="inline-block bg-warm-white p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-field-green">Service Area</p>
            <h1 className="mt-2 font-heading text-3xl text-dark-green md:text-4xl">
              Where we work.
            </h1>
            <p className="mt-3 max-w-lg text-slate">
              Based in {BUSINESS.location}. We cover Magoffin County and the
              counties around it. Not sure if we reach you? Just ask.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-x-12 gap-y-0 sm:grid-cols-2 md:grid-cols-3" stagger={0.06}>
          {SERVICE_AREA.map((county) => (
            <motion.div
              key={county}
              variants={staggerChild}
              className="border-b border-light-gray py-4"
            >
              <span className="text-lg text-dark-green">{county}</span>
            </motion.div>
          ))}
        </StaggerGroup>

        <Reveal delay={0.3}>
          <p className="mt-8 text-sm text-slate">
            Not listed? Call us anyway. If we can get to you, we will.
          </p>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
