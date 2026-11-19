"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Ship, Plane, Truck, Warehouse, Package, Boxes, Anchor, FileCheck, Building2,
  ArrowRight, ArrowUpRight, Globe, CheckCircle2, Calculator, ChevronRight, Sparkles,
} from "lucide-react";
import { companyDetails, servicesData } from "@/data/steadfastData";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";
import { Reveal, Eyebrow, CountUp, GoldButton, GhostButton } from "@/Components/Home/motion";
import PageHeroBackground from "@/Components/Banner/PageHeroBackground";
import { SERVICE_CATEGORIES, serviceCategory, serviceImage } from "./serviceMeta";

const EASE = [0.22, 1, 0.36, 1];

const iconMap = {
  Ship, Plane, Truck, Warehouse, Package, Boxes, Anchor, FileCheck, Building2,
};

export default function ServicesPageClient({ initialBanners = [] }) {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState("all");

  const filtered = useMemo(
    () => (tab === "all" ? servicesData : servicesData.filter((s) => serviceCategory(s.slug) === tab)),
    [tab]
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#C59B24] selection:text-white">
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-[#0D1424]">
        <PageHeroBackground page="/services" initialBanners={initialBanners} darkOverlay={false}>
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0A1224]/70 via-[#0A1224]/25 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0D1424]/60 via-transparent to-transparent" aria-hidden="true" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#E2C876]/30 bg-white/5 py-2 pl-2 pr-4 backdrop-blur-md"
              >
                <span className="flex h-6 items-center rounded-full bg-[#C59B24] px-3 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                  10 Solutions
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                  We Provide Best Logistics Services
                </span>
              </motion.div>

              <h1 className="font-anton uppercase leading-[0.98] tracking-tight text-white">
                {["Our Comprehensive", "Freight &", "Logistics Services"].map((line, li) => (
                  <span key={li} className="block overflow-hidden pb-1">
                    <motion.span
                      className="mr-[0.24em] inline-block text-[clamp(2.1rem,1.2rem+4vw,4.4rem)]"
                      initial={{ y: "110%" }}
                      animate={reduce ? {} : { y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 + li * 0.12, ease: EASE }}
                    >
                      {li === 2 ? <span className="text-[#E2C876]">{line}</span> : line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
                className="mt-6 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base"
              >
                Tailored logistics and worldwide freight solutions designed to streamline your
                international supply chain with speed, reliability, and precision.
              </motion.p>

              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.82, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <GoldButton onClick={() => openQuoteModal()} className="px-8 py-4 text-sm">
                  <Calculator className="h-4 w-4" /> Request a Quote
                </GoldButton>
                <GhostButton dark href="/contact" className="px-8 py-4 text-sm">
                  Contact Offices <ArrowRight className="h-4 w-4" />
                </GhostButton>
              </motion.div>
            </div>
          </div>
        </PageHeroBackground>
      </section>

      {/* ============ SERVICES GRID (filterable) ============ */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Reveal><Eyebrow center>What We Provide</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] uppercase leading-[1.03] text-[#1D2A4C]">
                End-to-End Freight <span className="text-[#C59B24]">Solutions</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                From single pallet air deliveries to chartered bulk maritime vessels — we coordinate every leg of your freight journey.
              </p>
            </Reveal>
          </div>

          {/* filter tabs */}
          <Reveal delay={0.1}>
            <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5" role="tablist" aria-label="Service categories">
              {SERVICE_CATEGORIES.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className={`relative rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] focus-visible:ring-offset-2 ${
                      active ? "text-white" : "text-slate-600 hover:text-[#1D2A4C]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="services-tab-pill"
                        className="absolute inset-0 rounded-full bg-[#1D2A4C] shadow-lg shadow-[#1D2A4C]/25"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* cards */}
          <motion.div layout className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((svc, idx) => {
                const Icon = iconMap[svc.icon] || Ship;
                return (
                  <motion.article
                    key={svc.slug}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
                  >
                    {/* image header */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={serviceImage(svc.slug)}
                        alt={svc.title}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/85 via-[#0D1424]/20 to-transparent" />
                      <span className="absolute right-3 top-3 font-anton text-2xl text-white/30 drop-shadow" aria-hidden="true">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C59B24] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white drop-shadow">
                          {serviceCategory(svc.slug) === "warehousing" ? "Warehousing" : serviceCategory(svc.slug) === "customs" ? "Customs & Heavy Lift" : "Freight Forwarding"}
                        </span>
                      </div>
                    </div>

                    {/* body */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-anton text-xl uppercase tracking-wide text-[#1D2A4C] transition-colors group-hover:text-[#B0891E]">
                        {svc.title}
                      </h3>
                      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C59B24]">{svc.tagline}</p>
                      <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{svc.shortDescription}</p>

                      <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                        {svc.features.slice(0, 2).map((f) => (
                          <li key={f.title} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#C59B24]" />
                            <span className="line-clamp-1">{f.title}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex items-center justify-between pt-5">
                        <Link
                          href={`/${svc.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#1D2A4C] px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#C59B24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A4C] focus-visible:ring-offset-2"
                        >
                          Explore Details
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <button
                          onClick={() => openQuoteModal(svc.title)}
                          className="inline-flex items-center gap-1 rounded px-1 text-[11px] font-black uppercase tracking-wider text-[#B0891E] transition-colors hover:text-[#1D2A4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24]"
                        >
                          <Calculator className="h-3.5 w-3.5" /> Rate
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="relative overflow-hidden border-y border-[#C59B24]/20 bg-[#0D1424] py-16 text-white lg:py-20">
        <div className="sf-dots absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C59B24]/10 blur-[130px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { v: 2500, s: "+", l: "Happy Customers" },
            { v: 18000, s: "+", l: "Projects Completed" },
            { v: 99, s: "%", l: "5-Star Reviews" },
            { v: 120, s: "+", l: "Ports Covered" },
          ].map((st, i) => (
            <Reveal key={st.l} delay={0.08 + i * 0.1}>
              <motion.div
                whileHover={reduce ? {} : { y: -6 }}
                className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center shadow-xl backdrop-blur-md transition-colors duration-300 hover:border-[#C59B24]/50 hover:bg-white/[0.08]"
              >
                <div className="font-anton text-3xl tracking-tight text-[#E2C876] sm:text-4xl">
                  <CountUp to={st.v} suffix={st.s} />
                </div>
                <div className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-300">{st.l}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <span className="pointer-events-none absolute -right-8 top-6 hidden select-none font-anton text-[10rem] uppercase leading-none text-[#1D2A4C]/[0.035] xl:block" aria-hidden="true">
          Ship It
        </span>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-[#E2C876]/50 bg-gradient-to-b from-[#FDF9EE] to-white p-8 text-center shadow-2xl shadow-[#1D2A4C]/[0.08] sm:p-14">
              <Sparkles className="absolute left-8 top-8 h-5 w-5 text-[#C59B24]/40" aria-hidden="true" />
              <Sparkles className="absolute bottom-8 right-8 h-5 w-5 text-[#C59B24]/40" aria-hidden="true" />
              <Reveal><Eyebrow center>Fast Freight Estimations</Eyebrow></Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-3 font-anton text-[clamp(1.8rem,1.1rem+2.6vw,3rem)] uppercase leading-[1.03] text-[#1D2A4C]">
                  Ready to Ship Your Cargo <span className="text-[#C59B24]">Safely?</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Get in touch with our team today to discuss your shipment specs and receive
                  competitive, transparent pricing tailored to your routes.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <GoldButton onClick={() => openQuoteModal()} className="px-8 py-4">
                    Get an Instant Quote <ArrowUpRight className="h-4 w-4" />
                  </GoldButton>
                  <GhostButton href="/contact" className="px-8 py-4">
                    Speak to a Representative
                  </GhostButton>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
