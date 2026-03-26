"use client";

import { Phone } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { BUSINESS } from "@/lib/constants";
import { LazyVideo } from "./lazy-video";

/** Inline CTA — left-bordered block within content flow */
export function CtaBlock({ text = "Free estimates — just call or text." }: { text?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="my-8 border-l-4 border-field-green bg-white px-6 py-5"
      initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
      animate={prefersReduced ? {} : inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <p className="text-slate">{text}</p>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a href={BUSINESS.phone1Tel} className="flex items-center gap-1.5 font-medium text-field-green hover:text-dark-green">
          <Phone size={15} weight="fill" />
          {BUSINESS.phone1}
        </a>
        <a href={BUSINESS.phone2Tel} className="flex items-center gap-1.5 font-medium text-field-green hover:text-dark-green">
          <Phone size={15} weight="fill" />
          {BUSINESS.phone2}
        </a>
      </div>
    </motion.div>
  );
}

/** Full-section CTA with video background — used sparingly */
export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReduced = useReducedMotion();

  const anim = (y: number, delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6 + delay * 0.3, delay },
        };

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-dark-green py-20 md:py-28">
      <LazyVideo
        src="/images/ky-landscape-video.mp4"
        poster="/images/ky-landscape.jpg"
        className="absolute inset-0 h-full w-full opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-green via-dark-green/80 to-dark-green/60" />

      <div className="relative mx-auto max-w-6xl px-4">
        <motion.p
          className="text-xs uppercase tracking-[0.25em] text-white/30"
          {...anim(20, 0)}
        >
          Free estimates
        </motion.p>
        <motion.h2
          className="mt-3 max-w-lg font-heading text-3xl text-white md:text-4xl"
          {...anim(30, 0.15)}
        >
          Ready to talk about your property?
        </motion.h2>
        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          {...anim(20, 0.3)}
        >
          <a
            href={BUSINESS.phone1Tel}
            className="group flex items-center gap-3 rounded-none border border-white/20 px-6 py-3 text-white transition-all hover:border-white/50 hover:bg-white/5"
          >
            <Phone size={18} weight="fill" />
            <span>{BUSINESS.phone1}</span>
          </a>
          <a
            href={BUSINESS.phone2Tel}
            className="group flex items-center gap-3 rounded-none border border-white/20 px-6 py-3 text-white transition-all hover:border-white/50 hover:bg-white/5"
          >
            <Phone size={18} weight="fill" />
            <span>{BUSINESS.phone2}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
