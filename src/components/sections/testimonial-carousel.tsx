"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { reviews, type Review } from "@/lib/content/reviews";
import { StarRow, GoogleMark } from "@/components/ui/google-rating";

const INTERVAL_MS = 4000;
const EASE = [0.22, 1, 0.36, 1] as const;

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-6 shadow-[var(--shadow-elevated)] backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <StarRow rating={5} sizeClass="h-4 w-4" />
        <GoogleMark className="h-5 w-5 shrink-0" />
      </div>
      <blockquote
        className="flex-1 text-pretty text-[15px] leading-relaxed text-white/90"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 6,
          overflow: "hidden",
        }}
      >
        &ldquo;{review.body}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-yellow text-sm font-semibold text-yellow-foreground">
          {review.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">{review.name}</div>
          <div className="text-xs text-white/55">Verified Google review</div>
        </div>
      </div>
    </div>
  );
}

function Dots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Show review ${i + 1} of ${count}`}
          aria-current={i === active}
          onClick={() => onSelect(i)}
          className="grid h-5 w-5 place-items-center"
        >
          <span className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-yellow" : "w-1.5 bg-white/30"}`} />
        </button>
      ))}
    </div>
  );
}

/**
 * Auto-advancing testimonial carousel. `orientation` controls the slide axis,
 * vertical for the dark estimate panel (desktop), horizontal for the stacked
 * mobile/tablet layout, both sharing the same data, timing, and controls.
 */
export function TestimonialCarousel({
  className = "",
  orientation = "vertical",
}: {
  className?: string;
  orientation?: "vertical" | "horizontal";
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, index]);

  const axis = orientation === "vertical" ? "y" : "x";
  const offset = 28;
  const variants = {
    enter: { opacity: 0, [axis]: offset },
    center: { opacity: 1, [axis]: 0 },
    exit: { opacity: 0, [axis]: -offset },
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-[340px] overflow-hidden sm:h-[320px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={reducedMotion ? { opacity: 0 } : variants.enter}
            animate={reducedMotion ? { opacity: 1 } : variants.center}
            exit={reducedMotion ? { opacity: 0 } : variants.exit}
            transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: EASE }}
            className="absolute inset-0"
          >
            <ReviewCard review={reviews[index]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-5">
        <Dots count={reviews.length} active={index} onSelect={setIndex} />
      </div>
    </div>
  );
}
