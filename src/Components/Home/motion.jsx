"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ============================================================
   Shared motion + presentation primitives for the home page
   ============================================================ */

const EASE = [0.22, 1, 0.36, 1];

/** Scroll-triggered reveal (fade + rise). Honors reduced motion. */
export function Reveal({ children, delay = 0, y = 28, className = "", once = true }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Gold eyebrow label with animated dash */
export function Eyebrow({ children, dark = false, center = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] ${
        dark ? "text-[#E2C876]" : "text-[#C59B24]"
      } ${center ? "justify-center" : ""}`}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`h-[2px] w-7 origin-left ${dark ? "bg-[#E2C876]" : "bg-[#C59B24]"}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

/** Section heading block: eyebrow + display title + optional subcopy */
export function SectionHead({ eyebrow, title, sub, center = false, dark = false, className = "" }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      <Reveal>
        <Eyebrow dark={dark} center={center}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-anton uppercase leading-[1.04] tracking-tight mt-3 text-[clamp(1.9rem,1.2rem+2.6vw,3.4rem)] ${
            dark ? "text-white" : "text-[#1D2A4C]"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={0.16}>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed max-w-2xl ${center ? "mx-auto" : ""} ${dark ? "text-slate-300" : "text-slate-600"}`}>
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Animated number counter — starts when scrolled into view */
export function CountUp({ to, suffix = "", prefix = "", duration = 1.8, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Decorative animated dashed route line (brand motif) */
export function RouteDash({ className = "", stroke = "#C59B24", vertical = false }) {
  return (
    <svg
      className={`pointer-events-none ${vertical ? "h-full w-2" : "w-full h-2"} ${className}`}
      viewBox={vertical ? "0 0 8 100" : "0 0 100 8"}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1={vertical ? 4 : 0}
        y1={vertical ? 0 : 4}
        x2={vertical ? 4 : 100}
        y2={vertical ? 100 : 4}
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="5 6"
        strokeLinecap="round"
        className="sf-dash-flow"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Primary gold button (link or button) with shine sweep on hover */
export function GoldButton({ href, onClick, children, className = "", type, disabled }) {
  const cls = `group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[#C59B24] px-7 py-3.5 text-[13px] font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-[#C59B24]/30 transition-all duration-300 hover:bg-[#B0891E] hover:shadow-xl hover:shadow-[#C59B24]/40 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A4C] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none ${className}`;
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type || "button"} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

/** Ghost outline button */
export function GhostButton({ href, onClick, children, dark = false, className = "" }) {
  const cls = `inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-[13px] font-black uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] focus-visible:ring-offset-2 ${
    dark
      ? "border border-white/30 text-white hover:bg-white/10 hover:border-white/60"
      : "border border-[#D7DCE0] text-[#1D2A4C] hover:border-[#1D2A4C] hover:bg-[#1D2A4C] hover:text-white"
  } ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
