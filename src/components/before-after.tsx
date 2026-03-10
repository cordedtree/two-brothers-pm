"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  className?: string;
}

export function BeforeAfter({ before, after, className = "" }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      // Capture on the container itself so touch events keep firing
      containerRef.current?.setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      // Only track if we have pointer capture
      if (!containerRef.current?.hasPointerCapture(e.pointerId)) return;
      e.preventDefault();
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  return (
    <div
      ref={containerRef}
      className={`group relative cursor-col-resize select-none overflow-hidden ${className}`}
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      role="slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after comparison slider"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(2, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(98, p + 2));
      }}
    >
      {/* After image (full, behind) */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        className="pointer-events-none object-cover"
        sizes="(max-width: 768px) 100vw, 60vw"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          className="pointer-events-none object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        {/* Handle — bigger on mobile for easier touch target */}
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-dark-green/80 shadow-lg backdrop-blur-sm md:h-10 md:w-10">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L14 8L11 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute top-3 left-3 z-10 rounded bg-dark-green/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 z-10 rounded bg-field-green/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
        After
      </span>
    </div>
  );
}
