'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { BUSINESS } from '@/lib/constants';

/* ── Rotating headline words ── */
const ROTATING_WORDS = ['lawn', 'landscape', 'property', 'home'];

/* ── Stagger orchestration ── */
const EASE = [0.16, 1, 0.3, 1] as const;

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.85,
    delay: i * 0.18 + 0.2,
    ease: EASE,
  },
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  /* ── Scroll-driven parallax & fade ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  /* ── Video load detection ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setTimeout(() => setLoaded(true), 300);
    video.addEventListener('canplay', onReady);
    const fallback = setTimeout(() => setLoaded(true), 2500);

    return () => {
      video.removeEventListener('canplay', onReady);
      clearTimeout(fallback);
    };
  }, []);

  /* ── Rotating word timer ── */
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length),
      3400,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-void overflow-hidden"
    >
      {/* ═══════════════════════════════════════════
          LAYER 1 — Background Video (Ken Burns)
         ═══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 will-change-transform origin-center"
        style={{ scale: videoScale }}
      >
        <video
          ref={videoRef}
          className={`hero-video ${loaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster-new.jpg"
        >
          <source src="/hero-ground-cinematic.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ═══════════════════════════════════════════
          LAYER 2 — Cinematic Overlay System
         ═══════════════════════════════════════════ */}
      {/* Directional gradient — darker left for text contrast */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(105deg, rgba(8,12,10,0.72) 0%, rgba(8,12,10,0.38) 50%, rgba(8,12,10,0.18) 100%)',
        }}
      />

      {/* Radial vignette */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* Bottom fade to --void */}
      <div className="hero-gradient" aria-hidden="true" />

      {/* Watermark cover (kept for fallback video) */}
      <div
        className="absolute bottom-0 right-0 z-[3] pointer-events-none"
        style={{ width: 120, height: 40, background: '#080C0A' }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════
          LAYER 3 — Decorative Accent Line (desktop)
         ═══════════════════════════════════════════ */}
      <motion.div
        className="hidden lg:block absolute left-12 top-28 bottom-28 w-px z-10"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--copper) 25%, var(--copper) 75%, transparent 100%)',
          opacity: 0.2,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ═══════════════════════════════════════════
          LAYER 4 — Content
         ═══════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-20 w-full"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* ── Eyebrow ── */}
        <motion.p className="eyebrow mb-5" {...stagger(0)}>
          Lawn Care &amp; Landscaping &mdash; {BUSINESS.serviceArea}
        </motion.p>

        {/* ── Headline with rotating word ── */}
        <motion.h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] text-chalk font-light tracking-tight leading-[0.9]"
          {...stagger(1)}
        >
          Your{' '}
          <span className="relative inline-block align-bottom">
            {/* Invisible spacer — width of longest word prevents layout shift */}
            <span className="invisible italic">landscape</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                className="absolute left-0 top-0 text-copper italic whitespace-nowrap"
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          ,
          <br />
          elevated.
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          className="text-limestone/70 text-base sm:text-lg md:text-xl max-w-lg mt-8 leading-relaxed"
          {...stagger(2)}
        >
          Two brothers, one standard of work. Serving {BUSINESS.serviceArea}&nbsp;&mdash;
          every day of the week.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          className="mt-10 flex gap-4 flex-wrap items-center"
          {...stagger(3)}
        >
          <a href={`tel:+1${BUSINESS.phone1Raw}`} className="btn-copper">
            Call {BUSINESS.phone1}
          </a>
          <a href={`tel:+1${BUSINESS.phone2Raw}`} className="btn-outline">
            Call {BUSINESS.phone2}
          </a>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          LAYER 5 — Scroll Indicator
         ═══════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[3px] text-limestone/40">
          Scroll
        </span>
        <motion.svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          className="text-copper/60"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M1 1L10 10L19 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>

      {/* ═══════════════════════════════════════════
          Scoped Styles
         ═══════════════════════════════════════════ */}
      <style jsx>{`
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1);
          filter: brightness(0.5) saturate(1.15) contrast(1.05);
        }
        .hero-video.loaded {
          opacity: 1;
        }
        .hero-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 60% 50%,
            transparent 35%,
            rgba(8, 12, 10, 0.75) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        .hero-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 55%;
          background: linear-gradient(
            to top,
            var(--void) 0%,
            rgba(8, 12, 10, 0.75) 35%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }
      `}</style>
    </section>
  );
}
