"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plane, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const SESSION_KEY = "sf-intro-played";
const TOTAL_DURATION_MS = 3800; // Increased to 3.8s for smooth, majestic flight

/**
 * First-visit loading experience:
 * A cargo aircraft glides smoothly across the international flight corridor
 * with GPU-accelerated motion, glowing golden contrail, and live telemetry counter.
 * On localhost, plays on reload for testing; in production, plays once per browser session.
 */
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  const cbRef = useRef(onComplete);
  cbRef.current = onComplete;

  useEffect(() => {
    // Check if in local development
    const isLocalDev =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.search.includes("intro=1"));

    // Skip in production if already seen this session
    if (!isLocalDev) {
      try {
        if (sessionStorage.getItem(SESSION_KEY)) {
          cbRef.current();
          return;
        }
      } catch (e) {
        /* storage unavailable — proceed */
      }
    }

    // Reduced motion check
    if (reduce) {
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
      cbRef.current();
      return;
    }

    document.body.style.overflow = "hidden";

    // Smooth counter animation from 0 to 100 over TOTAL_DURATION_MS
    const startTime = performance.now();
    let animId;
    let finishTimer;

    const updateFrame = (now) => {
      const elapsed = now - startTime;
      const rawPct = Math.min(elapsed / TOTAL_DURATION_MS, 1);
      // Smooth cubic easing for natural acceleration and landing deceleration
      const eased =
        rawPct < 0.5
          ? 2 * rawPct * rawPct
          : 1 - Math.pow(-2 * rawPct + 2, 2) / 2;

      const currentVal = Math.round(eased * 100);
      setProgress(currentVal);

      if (rawPct < 1) {
        animId = requestAnimationFrame(updateFrame);
      } else {
        setProgress(100);
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
        finishTimer = setTimeout(() => {
          cbRef.current();
        }, 550);
      }
    };

    animId = requestAnimationFrame(updateFrame);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white select-none"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      {/* Background Watermark */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-anton text-[22vw] uppercase leading-none text-[#1D2A4C]/[0.035] select-none">
        Steadfast
      </span>

      {/* Brand Lockup */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-2xl border-2 border-[#E2C876]/60 bg-white p-2 shadow-xl shadow-[#1D2A4C]/10 ring-4 ring-[#FDF9EE]">
          <Image
            src="/images/logo-emblem.png"
            alt="Steadfast Logo"
            fill
            className="object-contain p-2"
            sizes="64px"
            priority
          />
        </div>
        <div className="font-montserrat text-sm sm:text-base font-black uppercase tracking-[0.45em] text-[#1D2A4C]">
          Steadfast
        </div>
        <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.35em] text-[#C59B24]">
          Shipping Lines (Pvt) Ltd
        </div>
      </motion.div>

      {/* Flight Corridor & Moving Aircraft */}
      <div className="relative z-10 mt-14 w-full max-w-[500px] px-8 sm:px-12">
        {/* Track Container */}
        <div className="relative h-14 flex items-center">
          {/* Base Inactive Dashed Route Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#1D2A4C]/20" />

          {/* Active Golden Flight Line (Fills dynamically with motion) */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: TOTAL_DURATION_MS / 1000,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              background: "linear-gradient(90deg, #1D2A4C 0%, #C59B24 85%, #E2C876 100%)",
              boxShadow: "0 0 12px rgba(197, 155, 36, 0.5)",
            }}
          />

          {/* Departure Airport Node (Left) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C59B24] opacity-50" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#1D2A4C] border-2 border-white shadow-sm" />
            </span>
          </div>

          {/* Hardware-Accelerated Gliding Airplane */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none"
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{
              duration: TOTAL_DURATION_MS / 1000,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Contrail / Vapor Trail behind the Aircraft engines */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-16 sm:w-20 h-2 bg-gradient-to-l from-[#C59B24]/70 via-[#C59B24]/25 to-transparent blur-[1.5px] rounded-full" />

            {/* Aerodynamic Aircraft Badge with Flight Physics Tilt */}
            <motion.div
              animate={{
                y: [0, -4, 0, -3, 0],
                rotate: [15, 8, 4, 0],
              }}
              transition={{
                y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: TOTAL_DURATION_MS / 1000, ease: "easeInOut" },
              }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl shadow-[#1D2A4C]/25 border-2 border-[#C59B24] ring-4 ring-[#C59B24]/20"
            >
              {/* Airplane Icon rotated to face the flight direction (left-to-right) */}
              <Plane
                className="h-6 w-6 text-[#C59B24] drop-shadow-sm rotate-45"
                strokeWidth={2.4}
              />
            </motion.div>
          </motion.div>

          {/* Arrival Airport Node (Right) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 flex flex-col items-center">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                progress >= 100
                  ? "border-[#C59B24] bg-[#C59B24] scale-125 shadow-md shadow-[#C59B24]/50"
                  : "border-[#1D2A4C]/40 bg-white"
              }`}
            >
              {progress >= 100 && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
            </span>
          </div>
        </div>

        {/* Airport Codes Strip */}
        <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-slate-400 -mt-1 px-1">
          <span>ORIGIN · HUB</span>
          <span>GLOBAL DESTINATION</span>
        </div>

        {/* Status Indicator & Percentage Counter */}
        <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C59B24] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B24] animate-pulse" />
              {progress < 30
                ? "Initiating Flight Route..."
                : progress < 75
                ? "Cruising Global Air Corridor..."
                : progress < 100
                ? "Approaching Port Arrival..."
                : "Flight Landed · Welcome to Steadfast"}
            </span>
            <div className="text-[11px] font-semibold text-slate-500">
              International Cargo Express
            </div>
          </div>

          <div className="font-anton text-4xl sm:text-5xl leading-none text-[#1D2A4C] tabular-nums">
            {progress}
            <span className="text-[#C59B24] text-3xl sm:text-4xl ml-0.5">%</span>
          </div>
        </div>
      </div>

      {/* Bottom Gold Edge Accent for Curtain Lift */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B0891E] via-[#C59B24] to-[#B0891E]" />
    </motion.div>
  );
}
