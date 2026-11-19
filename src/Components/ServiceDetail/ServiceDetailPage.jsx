"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Ship, Plane, Truck, Warehouse, Package, Boxes, Anchor, FileCheck, Building2,
  CheckCircle2, ArrowRight, ArrowUpRight, ShieldCheck, Phone, ChevronRight,
  Headphones, Route as RouteIcon, Navigation, Calculator, Sparkles,
} from "lucide-react";
import { companyDetails, servicesData } from "@/data/steadfastData";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";
import { Reveal, Eyebrow, GoldButton, GhostButton } from "@/Components/Home/motion";
import PageHeroBackground from "@/Components/Banner/PageHeroBackground";
import { serviceImage } from "@/Components/Services/serviceMeta";

const EASE = [0.22, 1, 0.36, 1];

const iconMap = {
  Ship, Plane, Truck, Warehouse, Package, Boxes, Anchor, FileCheck, Building2,
};

const PROCESS_ICONS = { Headphones, Route: RouteIcon, Boxes, Navigation };

export default function ServiceDetailPage({ service }) {
  const reduce = useReducedMotion();
  const IconComp = iconMap[service.icon] || Ship;
  const otherServices = servicesData.filter((s) => s.id !== service.id);

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#C59B24] selection:text-white">
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[#0D1424]">
        <PageHeroBackground page={`/${service.slug}`} darkOverlay={false}>
          {/* light readability gradients — banner stays vivid */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0A1224]/70 via-[#0A1224]/25 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0D1424]/60 via-transparent to-transparent" aria-hidden="true" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            {/* breadcrumbs */}
            <motion.nav
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider"
            >
              <Link href="/" className="text-slate-300 transition-colors hover:text-[#C59B24]">Home</Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              <Link href="/services" className="text-slate-300 transition-colors hover:text-[#C59B24]">Services</Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              <span className="text-[#E2C876]" aria-current="page">{service.shortTitle}</span>
            </motion.nav>

            <div className="max-w-4xl">
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
                className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#E2C876]/30 bg-white/5 py-2 pl-2 pr-4 backdrop-blur-md"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C59B24] text-white">
                  <IconComp className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                  Steadfast Specialized Freight
                </span>
              </motion.div>

              <h1 className="font-anton uppercase leading-[0.98] tracking-tight text-white">
                {service.title.split(" ").reduce((lines, word) => {
                  const last = lines[lines.length - 1];
                  if (last && (last + " " + word).length <= 22) {
                    lines[lines.length - 1] = last + " " + word;
                  } else {
                    lines.push(word);
                  }
                  return lines;
                }, []).map((line, li, arr) => (
                  <span key={li} className="block overflow-hidden pb-1">
                    <motion.span
                      className="mr-[0.24em] inline-block text-[clamp(2.1rem,1.2rem+4vw,4.4rem)]"
                      initial={{ y: "110%" }}
                      animate={reduce ? {} : { y: 0 }}
                      transition={{ duration: 0.7, delay: 0.22 + li * 0.12, ease: EASE }}
                    >
                      {li === arr.length - 1 && arr.length > 1 ? (
                        <span className="text-[#E2C876]">{line}</span>
                      ) : (
                        line
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
                className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base"
              >
                {service.tagline}
              </motion.p>

              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.68, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <GoldButton onClick={() => openQuoteModal(service.title)} className="px-8 py-4 text-sm">
                  <Calculator className="h-4 w-4" /> Request Instant Rate
                </GoldButton>
                <GhostButton dark href={`tel:${companyDetails.phone.replace(/[\s+,]/g, "")}`} className="px-6 py-4 text-sm">
                  <Phone className="h-4 w-4 text-[#E2C876]" /> Call Operations Desk
                </GhostButton>
              </motion.div>
            </div>
          </div>
        </PageHeroBackground>
      </section>

      {/* ============ OVERVIEW + HIGHLIGHT STATS ============ */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <span
          className="pointer-events-none absolute -right-6 top-8 hidden select-none font-anton text-[10rem] uppercase leading-none text-[#1D2A4C]/[0.035] xl:block"
          aria-hidden="true"
        >
          {service.shortTitle}
        </span>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          {/* Left: overview */}
          <div className="space-y-7 lg:col-span-7">
            <Reveal><Eyebrow>Service Overview</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-anton text-[clamp(1.8rem,1.1rem+2.4vw,3rem)] uppercase leading-[1.03] text-[#1D2A4C]">
                Comprehensive <span className="text-[#C59B24]">{service.title}</span> Solutions
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="border-l-4 border-[#C59B24] pl-5 text-base font-medium italic leading-relaxed text-slate-700 sm:text-lg">
                {service.shortDescription}
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {service.overview}
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="flex flex-wrap gap-4 pt-2">
                <GoldButton onClick={() => openQuoteModal(service.title)}>
                  Get This Service <ArrowRight className="h-4 w-4" />
                </GoldButton>
                <GhostButton href="/services">All Services</GhostButton>
              </div>
            </Reveal>
          </div>

          {/* Right: sticky image card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative mx-auto max-w-md lg:sticky lg:top-28">
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#1D2A4C]/10 via-[#C59B24]/25 to-transparent blur-xl" aria-hidden="true" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-[#D7DCE0] shadow-2xl">
                  <Image
                    src={serviceImage(service.slug)}
                    alt={service.title}
                    fill
                    sizes="(min-width:1024px) 40vw, 90vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/55 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C59B24] text-white shadow-lg">
                      <IconComp className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-white drop-shadow">
                      {service.shortTitle}
                    </span>
                  </div>
                </div>

                {/* floating assurance badge */}
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
                  animate={reduce ? {} : { y: [0, -7, 0] }}
                  className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-[#D7DCE0] bg-white/95 p-3.5 shadow-2xl backdrop-blur-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-extrabold text-[#1D2A4C]">100% Insured Transit</span>
                    <span className="block text-[10px] font-semibold text-slate-500">Licensed & bonded handling</span>
                  </span>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FEATURES GRID ============ */}
      <section className="border-y border-[#D7DCE0]/60 bg-[#F4F6F8] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Reveal><Eyebrow center>Key Service Highlights</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] uppercase leading-[1.03] text-[#1D2A4C]">
                What We Provide in <span className="text-[#C59B24]">{service.shortTitle}</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feat, idx) => (
              <Reveal key={feat.title} delay={0.06 + idx * 0.07}>
                <motion.div
                  whileHover={reduce ? {} : { y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white p-7 shadow-sm transition-shadow duration-300 hover:border-[#C59B24]/60 hover:shadow-2xl"
                >
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#B0891E] to-[#E2C876] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                  <span className="pointer-events-none absolute -right-4 -top-6 font-anton text-[5rem] leading-none text-slate-100 transition-colors duration-500 group-hover:text-[#C59B24]/15" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className={`relative z-10 mb-5 flex h-13 w-13 items-center justify-center rounded-xl shadow-sm ring-1 transition-all duration-300 group-hover:scale-110 ${
                    idx % 2 === 0
                      ? "bg-[#FDF9EE] text-[#C59B24] ring-[#E2C876]/60 group-hover:bg-[#C59B24] group-hover:text-white"
                      : "bg-[#1D2A4C]/[0.06] text-[#1D2A4C] ring-[#D7DCE0] group-hover:bg-[#1D2A4C] group-hover:text-[#E2C876]"
                  }`}>
                    <CheckCircle2 className="h-6 w-6" strokeWidth={2.1} />
                  </div>
                  <h3 className="relative z-10 text-base font-extrabold text-[#1D2A4C]">{feat.title}</h3>
                  <p className="relative z-10 mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{feat.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE (navy) ============ */}
      <section className="relative overflow-hidden bg-[#0D1424] py-20 text-white lg:py-28">
        <div className="sf-dots absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#C59B24]/10 blur-[130px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Reveal><Eyebrow dark center>The Steadfast Advantage</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] uppercase leading-[1.03] text-white">
                Why Choose Us for <span className="text-[#E2C876]">{service.shortTitle}</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {service.whyChoose.map((item, idx) => (
              <Reveal key={idx} delay={0.08 + idx * 0.1}>
                <motion.div
                  whileHover={reduce ? {} : { x: 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-colors duration-300 hover:border-[#C59B24]/50 hover:bg-white/[0.07]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C59B24]/15 font-anton text-sm text-[#E2C876] ring-1 ring-[#C59B24]/30 transition-all duration-300 group-hover:bg-[#C59B24] group-hover:text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-200">{item}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS STRIP ============ */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Reveal><Eyebrow center>Operational Workflow</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] uppercase leading-[1.03] text-[#1D2A4C]">
                Step-by-Step <span className="text-[#C59B24]">Coordination</span>
              </h2>
            </Reveal>
          </div>

          {/* connecting dashed line */}
          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-[2px] lg:block" aria-hidden="true">
              <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="h-full w-full">
                <line x1="0" y1="1" x2="100" y2="1" stroke="#C59B24" strokeWidth="2" strokeDasharray="0.8 1.2" strokeLinecap="round" className="sf-dash-flow" vectorEffect="non-scaling-stroke" opacity="0.5" />
              </svg>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {companyDetails.processSteps.slice(0, 3).map((st, i) => {
                const StepIcon = PROCESS_ICONS[st.icon] || CheckCircle2;
                return (
                  <Reveal key={st.step} delay={0.08 + i * 0.1}>
                    <motion.div
                      whileHover={reduce ? {} : { y: -8 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="group relative h-full overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white p-7 shadow-sm transition-shadow duration-300 hover:border-[#C59B24]/60 hover:shadow-2xl"
                    >
                      <span className="pointer-events-none absolute -right-6 -top-8 font-anton text-[5.5rem] leading-none text-slate-100 transition-colors duration-500 group-hover:text-[#C59B24]/15" aria-hidden="true">
                        {st.step}
                      </span>
                      <div className="relative z-10">
                        <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#1D2A4C] text-[#E2C876] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-white">
                          <StepIcon className="h-6 w-6" strokeWidth={2.1} />
                        </div>
                        <div className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-[#B0891E]">Stage {st.step}</div>
                        <h3 className="mt-1 font-anton text-lg uppercase tracking-wide text-[#1D2A4C]">{st.title}</h3>
                        <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">{st.description}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ OTHER SERVICES ============ */}
      <section className="border-y border-[#D7DCE0]/60 bg-[#F4F6F8] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-[#D7DCE0] pb-6 sm:flex-row sm:items-center">
            <div>
              <Reveal><Eyebrow>Explore More</Eyebrow></Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-2 font-anton text-2xl uppercase tracking-wide text-[#1D2A4C] sm:text-3xl">
                  Other Freight & Logistics Solutions
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#B0891E] transition-colors hover:text-[#1D2A4C]"
              >
                View All 10 Services <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {otherServices.map((os, i) => {
              const OIcon = iconMap[os.icon] || Ship;
              return (
                <Reveal key={os.slug} delay={0.04 + i * 0.05}>
                  <Link
                    href={`/${os.slug}`}
                    className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-[#D7DCE0] bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C59B24]/60 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] focus-visible:ring-offset-2"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6F8] text-[#1D2A4C] ring-1 ring-[#D7DCE0] transition-all duration-300 group-hover:bg-[#C59B24] group-hover:text-white">
                      <OIcon className="h-5 w-5" strokeWidth={2.1} />
                    </span>
                    <span className="line-clamp-2 text-xs font-extrabold text-[#1D2A4C] transition-colors group-hover:text-[#B0891E]">
                      {os.shortTitle || os.title}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden border-y border-[#C59B24]/30 bg-[#0D1424] py-16 text-white lg:py-20">
        <div className="sf-dots absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C59B24]/15 blur-[120px]" aria-hidden="true" />
        <Sparkles className="absolute left-10 top-10 h-5 w-5 text-[#C59B24]/40" aria-hidden="true" />
        <Sparkles className="absolute bottom-10 right-10 h-5 w-5 text-[#C59B24]/40" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div className="max-w-2xl space-y-3">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C59B24]/40 bg-[#C59B24]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#E2C876]">
                <ShieldCheck className="h-3.5 w-3.5" /> Ready When You Are
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-anton text-[clamp(1.7rem,1.1rem+2.4vw,2.8rem)] uppercase leading-[1.05] text-white">
                Ready to Book Your <span className="text-[#E2C876]">{service.shortTitle}?</span>
              </h3>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                Get instant, competitive freight quotes tailored to your cargo origin, destination, and transit schedule.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <GoldButton onClick={() => openQuoteModal(service.title)} className="px-8 py-4">
                <Calculator className="h-4 w-4" /> Get a Free Quote
              </GoldButton>
              <GhostButton dark href="/contact" className="px-6 py-4">
                Speak to a Representative <ArrowUpRight className="h-4 w-4" />
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
