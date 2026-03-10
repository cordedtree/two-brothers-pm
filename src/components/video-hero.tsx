"use client";

import { motion } from "framer-motion";
import { Phone } from "@phosphor-icons/react";
import { BUSINESS } from "@/lib/constants";

export function VideoHero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-dark-green">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-lawn.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-dark-green/40 to-dark-green/20" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end px-4 pb-16 md:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <motion.p
            className="text-xs uppercase tracking-[0.25em] text-white/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {BUSINESS.location} &middot; Est. {BUSINESS.founded}
          </motion.p>

          <motion.h1
            className="mt-4 max-w-3xl font-heading text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your yard.
            <br />
            Our word.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-lg text-lg text-white/60 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Two brothers. Honest work. Lawn care and property management
            for Eastern Kentucky.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <a
              href={BUSINESS.phone1Tel}
              className="group flex items-center gap-3 text-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-white/50 group-hover:bg-white/10">
                <Phone size={20} weight="fill" />
              </span>
              <span>
                <span className="block text-xs text-white/40">Call or text</span>
                <span className="text-lg font-medium">{BUSINESS.phone1}</span>
              </span>
            </a>

            <a
              href={BUSINESS.phone2Tel}
              className="group flex items-center gap-3 text-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-white/50 group-hover:bg-white/10">
                <Phone size={20} weight="fill" />
              </span>
              <span>
                <span className="block text-xs text-white/40">Call or text</span>
                <span className="text-lg font-medium">{BUSINESS.phone2}</span>
              </span>
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-12 flex items-center gap-2 text-xs text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div
              className="h-8 w-px bg-white/30"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
            Scroll
          </motion.div>
        </div>
      </div>
    </section>
  );
}
