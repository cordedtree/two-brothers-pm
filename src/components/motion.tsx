"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Fade + slide up on scroll into view */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger children on scroll */
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Image with zoom on hover */
export function ZoomImage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.05 },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Horizontal line that draws itself on scroll */
export function DrawLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-px w-full bg-field-green/30"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

/** Counter that animates from 0 to target number */
export function Counter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}{suffix}
        </motion.span>
      ) : (
        "0"
      )}
    </motion.span>
  );
}

/** Parallax wrapper — shifts Y position based on scroll */
export function Parallax({
  children,
  className = "",
  offset = 30,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: offset }}
      whileInView={{ y: -offset }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0, type: "tween" }}
    >
      {children}
    </motion.div>
  );
}
