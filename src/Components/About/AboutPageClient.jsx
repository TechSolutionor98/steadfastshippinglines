"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck, Globe, Clock, CheckCircle2, ArrowRight, ArrowUpRight,
  TrendingUp, Award, Compass, Phone, MapPin, Building2, Calculator,
  Ship, Anchor, Sparkles,
} from "lucide-react";
import { companyDetails } from "@/data/steadfastData";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";
import { Reveal, Eyebrow, CountUp, GoldButton, GhostButton } from "@/Components/Home/motion";
import PageHeroBackground from "@/Components/Banner/PageHeroBackground";

const EASE = [0.22, 1, 0.36, 1];

const QUICK_STATS = [
  { icon: Award, value: 15, suffix: "+", label: "Years of Excellence" },
  { icon: Globe, value: 120, suffix: "+", label: "Global Ports Served" },
  { icon: Ship, value: 18000, suffix: "+", label: "Shipments Delivered" },
  { icon: Clock, value: 24, suffix: "/7", label: "Operations Desk" },
];

const CAPABILITIES = [
  { icon: TrendingUp, title: "Advanced Technology", tag: "Telematics",
    text: "Cutting-edge telematics, route-optimization algorithms, and digital milestone alerts keep you informed at every transit stage." },
  { icon: ShieldCheck, title: "Sustainable Practices", tag: "Green Freight",
    text: "Environmentally conscious freight management — fuel-efficient routing and responsible cargo packing protocols." },
  { icon: Award, title: "Industry-Specific Solutions", tag: "Sector Expertise",
    text: "Tailored handling standards for pharmaceuticals, heavy machinery, automotive components, textiles, and commercial goods." },
];

const WHY_ICONS = { Clock, CheckCircle2, Globe, ShieldCheck };

const VALUES = [
  { title: "Integrity", text: "Transparent pricing, honest timelines, and documentation you can audit — no hidden surprises, ever." },
  { title: "Reliability", text: "A 99% on-time record built on direct carrier contracts and a control tower that never sleeps." },
  { title: "Precision", text: "Every shipment follows a 6-step audited procedure, from booking to final consignee handoff." },
  { title: "Partnership", text: "Dedicated coordinators who know your cargo, your lanes, and your business goals by name." },
];

export default function AboutPageClient({ initialBanners = [] }) {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#C59B24] selection:text-white">
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[#0D1424] lg:min-h-[560px]">
        <PageHeroBackground page="/about-us" initialBanners={initialBanners} darkOverlay={false}>
          {/* light readability gradient — left only, banner colors stay vivid */}
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
                  Since Day One
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                  Global Transport & Logistics Provider
                </span>
              </motion.div>

              <h1 className="font-anton uppercase leading-[0.98] tracking-tight text-white">
                {["The Story", "Behind Every", "Safe Delivery"].map((line, li) => (
                  <span key={li} className="block overflow-hidden pb-1">
                    <motion.span
                      className="mr-[0.24em] inline-block text-[clamp(2.2rem,1.3rem+4.2vw,4.6rem)]"
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
                Delivering excellence across borders with innovative multimodal logistics,
                dedicated customer service, and reliable global operations — from Faisalabad
                to 120+ ports worldwide.
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
                <GhostButton dark href="#offices" className="px-8 py-4 text-sm">
                  Visit Our Offices <ArrowRight className="h-4 w-4" />
                </GhostButton>
              </motion.div>
            </div>
          </div>
        </PageHeroBackground>
      </section>

      {/* ============ QUICK STATS (overlapping hero) ============ */}
      <section className="relative z-20 mx-auto -mt-14 max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Company key figures">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {QUICK_STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.08 + i * 0.08}>
              <motion.div
                whileHover={reduce ? {} : { y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group flex h-full flex-col items-center rounded-2xl border border-[#D7DCE0] bg-white p-6 text-center shadow-xl shadow-[#1D2A4C]/[0.07] transition-colors duration-300 hover:border-[#C59B24]/60"
              >
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDF9EE] text-[#C59B24] ring-1 ring-[#E2C876]/60 transition-all duration-300 group-hover:bg-[#C59B24] group-hover:text-white">
                  <s.icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span className="font-anton text-3xl tracking-tight text-[#1D2A4C] sm:text-4xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                  {s.label}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ COMPANY BACKGROUND (editorial split) ============ */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <span className="pointer-events-none absolute -left-6 top-10 hidden select-none font-anton text-[11rem] uppercase leading-none text-[#1D2A4C]/[0.035] xl:block" aria-hidden="true">
          Steadfast
        </span>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="space-y-7 lg:col-span-6">
            <Reveal><Eyebrow>Company Background</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.4rem)] uppercase leading-[1.02] text-[#1D2A4C]">
                We Are Steadfast <span className="text-[#C59B24]">Shipping Lines</span> (Pvt) Ltd
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="border-l-4 border-[#C59B24] pl-5 text-base font-medium italic leading-relaxed text-slate-700 sm:text-lg">
                &ldquo;Your trusted partner in logistics — innovative, reliable transportation
                solutions delivered worldwide.&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Our expert teams and advanced technology ensure seamless, efficient, and secure
                delivery of your goods. We are dedicated to exceeding expectations with
                personalized service, uncompromising integrity, and a steadfast commitment to
                excellence — whether managing heavy industrial projects or delicate express
                shipments, we connect businesses to international markets with precision.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="grid grid-cols-2 gap-4 border-t border-[#D7DCE0] pt-6">
                {[
                  { icon: Globe, t: "120+ Ports", s: "Global trade coverage" },
                  { icon: Clock, t: "24/7 Support", s: "Live operational dispatch" },
                ].map((f) => (
                  <div key={f.t} className="group flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FDF9EE] text-[#C59B24] ring-1 ring-[#E2C876]/50 transition-all duration-300 group-hover:bg-[#C59B24] group-hover:text-white">
                      <f.icon className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold text-[#1D2A4C]">{f.t}</span>
                      <span className="block text-xs text-slate-500">{f.s}</span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="flex flex-wrap gap-4 pt-2">
                <GoldButton onClick={() => openQuoteModal()}>
                  Request a Free Quote <ArrowRight className="h-4 w-4" />
                </GoldButton>
                <GhostButton href="/services">Explore Our Services</GhostButton>
              </div>
            </Reveal>
          </div>

          {/* Image collage */}
          <div className="relative lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="relative mx-auto max-w-xl">
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#1D2A4C]/10 via-[#C59B24]/25 to-transparent blur-xl" aria-hidden="true" />

                <div className="relative grid grid-cols-12 gap-4">
                  <div className="col-span-8 overflow-hidden rounded-[1.5rem] border border-[#D7DCE0] shadow-2xl">
                    <div className="relative aspect-[4/3]">
                      <Image src="/images/home/how-we-help.jpg" alt="Steadfast Shipping terminal operations" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/45 to-transparent" />
                    </div>
                  </div>
                  <div className="col-span-4 flex flex-col gap-4">
                    <div className="overflow-hidden rounded-[1.25rem] border border-[#D7DCE0] shadow-xl">
                      <div className="relative aspect-square">
                        <Image src="/images/home/ocean.jpg" alt="Ocean freight vessel" fill sizes="20vw" className="object-cover transition-transform duration-700 hover:scale-110" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center rounded-[1.25rem] bg-gradient-to-br from-[#141E36] to-[#0D1424] p-4 text-center shadow-xl">
                      <span className="font-anton text-2xl text-[#E2C876]">100%</span>
                      <span className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-300">Safe & Secure Transit</span>
                    </div>
                  </div>
                </div>

                {/* floating badge */}
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.45, ease: EASE }}
                  animate={reduce ? {} : { y: [0, -8, 0] }}
                  className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-[#D7DCE0] bg-white/95 p-3.5 shadow-2xl backdrop-blur-md sm:left-8"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C59B24] text-white">
                    <Anchor className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-extrabold text-[#1D2A4C]">Tier-1 Carrier Contracts</span>
                    <span className="block text-[10px] font-semibold text-slate-500">Direct slot allocations</span>
                  </span>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="border-y border-[#D7DCE0]/60 bg-[#F4F6F8] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><Eyebrow center>Guiding Principles</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] uppercase leading-[1.03] text-[#1D2A4C]">
                Mission & <span className="text-[#C59B24]">Vision</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Mission — gold */}
            <Reveal delay={0.1}>
              <motion.div
                whileHover={reduce ? {} : { y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group relative h-full overflow-hidden rounded-[1.75rem] border-2 border-[#E2C876]/60 bg-gradient-to-b from-[#FDF9EE] to-white p-8 sm:p-10"
              >
                <Compass className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 text-[#C59B24]/[0.08] transition-colors duration-500 group-hover:text-[#C59B24]/15" aria-hidden="true" />
                <div className="relative z-10 space-y-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C59B24] text-white shadow-md ring-1 ring-[#E2C876] transition-transform duration-300 group-hover:scale-110">
                    <Compass className="h-7 w-7" />
                  </span>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.24em] text-[#B0891E]">Core Commitment</span>
                    <h3 className="mt-1 font-anton text-3xl uppercase tracking-wide text-[#1D2A4C]">Our Mission</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    To provide innovative, reliable, and efficient logistics and transportation
                    solutions that exceed our clients&rsquo; expectations. We simplify global trade,
                    ensuring seamless movement of goods with unparalleled service and support.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Innovation", "Reliability", "Efficiency"].map((t) => (
                      <span key={t} className="rounded-full border border-[#E2C876]/60 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Vision — navy */}
            <Reveal delay={0.22}>
              <motion.div
                whileHover={reduce ? {} : { y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group relative h-full overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#141E36] to-[#0D1424] p-8 text-white shadow-xl sm:p-10"
              >
                <div className="sf-dots absolute inset-0 opacity-25" aria-hidden="true" />
                <Globe className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 text-white/[0.05]" aria-hidden="true" />
                <div className="relative z-10 space-y-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C59B24] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <Globe className="h-7 w-7" />
                  </span>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.24em] text-[#E2C876]">Global Horizon</span>
                    <h3 className="mt-1 font-anton text-3xl uppercase tracking-wide text-white">Our Vision</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    To be a leading global logistics provider, recognized for our commitment to
                    excellence, customer satisfaction, and sustainable practices — setting new
                    standards that drive growth and success for our clients and partners worldwide.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Excellence", "Sustainability", "Leadership"].map((t) => (
                      <span key={t} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Reveal><Eyebrow center>What We Stand For</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] uppercase leading-[1.03] text-[#1D2A4C]">
                The Values That <span className="text-[#C59B24]">Move Us</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Built on a legacy of punctuality, safety, and deep maritime and aviation relationships.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...companyDetails.whyChooseUs].map((w, i) => {
              const Icon = WHY_ICONS[w.icon] || CheckCircle2;
              return (
                <Reveal key={w.title} delay={0.08 + i * 0.1}>
                  <motion.div
                    whileHover={reduce ? {} : { y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white p-7 shadow-sm transition-shadow duration-300 hover:border-[#C59B24]/60 hover:shadow-2xl"
                  >
                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#B0891E] to-[#E2C876] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                    <span className="pointer-events-none absolute -right-4 -top-6 font-anton text-[5rem] leading-none text-slate-100 transition-colors duration-500 group-hover:text-[#C59B24]/15" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={`relative z-10 mb-5 flex h-13 w-13 items-center justify-center rounded-xl shadow-sm ring-1 transition-all duration-300 group-hover:scale-110 ${
                      i % 2 === 0
                        ? "bg-[#FDF9EE] text-[#C59B24] ring-[#E2C876]/60 group-hover:bg-[#C59B24] group-hover:text-white"
                        : "bg-[#1D2A4C]/[0.06] text-[#1D2A4C] ring-[#D7DCE0] group-hover:bg-[#1D2A4C] group-hover:text-[#E2C876]"
                    }`}>
                      <Icon className="h-6 w-6" strokeWidth={2.1} />
                    </div>
                    <h3 className="relative z-10 text-base font-extrabold text-[#1D2A4C]">{w.title}</h3>
                    <p className="relative z-10 mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{w.description}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          {/* values ribbon */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.06 + i * 0.08}>
                <div className="flex h-full gap-4 rounded-2xl border border-[#E2C876]/40 bg-[#FDF9EE]/60 p-5 transition-colors duration-300 hover:bg-[#FDF9EE]">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#C59B24]" aria-hidden="true" />
                  <div>
                    <h4 className="text-sm font-extrabold uppercase tracking-wide text-[#1D2A4C]">{v.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES BENTO ============ */}
      <section className="border-y border-[#D7DCE0]/60 bg-[#F4F6F8] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Reveal><Eyebrow center>Corporate Strengths</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] uppercase leading-[1.03] text-[#1D2A4C]">
                Built Different, <span className="text-[#C59B24]">Built Better</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={0.08 + i * 0.1}>
                <motion.div
                  whileHover={reduce ? {} : { y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-2xl"
                >
                  <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#C59B24]/[0.07] transition-transform duration-500 group-hover:scale-[2.2]" aria-hidden="true" />
                  <div className="flex items-start justify-between">
                    <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#1D2A4C] text-[#E2C876] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-white">
                      <c.icon className="h-6 w-6" strokeWidth={2.1} />
                    </span>
                    <span className="rounded-full bg-[#FDF9EE] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#B0891E] ring-1 ring-[#E2C876]/50">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-anton text-lg uppercase tracking-wide text-[#1D2A4C]">{c.title}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">{c.text}</p>
                </motion.div>
              </Reveal>
            ))}

            {/* CTA card */}
            <Reveal delay={0.38}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#141E36] to-[#0D1424] p-7 text-white shadow-xl">
                <div className="sf-dots absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#E2C876]">Fast Turnaround</span>
                  <h3 className="mt-2 font-anton text-2xl uppercase leading-tight text-white">
                    100% Safe & <span className="text-[#E2C876]">Secure</span> Transit
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    Rigorous chain of custody, insured transit, and experienced cargo surveyors
                    at all major commercial terminals.
                  </p>
                </div>
                <div className="relative z-10 mt-6 border-t border-white/10 pt-5">
                  <GoldButton onClick={() => openQuoteModal()} className="w-full py-3.5">
                    Reach Destination Safely <ArrowUpRight className="h-4 w-4" />
                  </GoldButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ OFFICES ============ */}
      <section id="offices" className="relative overflow-hidden bg-[#0D1424] py-20 text-white lg:py-28">
        <div className="sf-dots absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#C59B24]/10 blur-[130px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Reveal><Eyebrow dark center>Offices Detail</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] uppercase leading-[1.03] text-white">
                Our Strategic <span className="text-[#E2C876]">Corporate Desks</span>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {companyDetails.offices.map((off, i) => (
              <Reveal key={off.city} delay={0.12 + i * 0.14}>
                <motion.div
                  whileHover={reduce ? {} : { y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition-colors duration-300 hover:border-[#C59B24]/50 hover:bg-white/[0.07]"
                >
                  <Building2 className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 text-white/[0.04] transition-colors duration-500 group-hover:text-[#C59B24]/10" aria-hidden="true" />
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#C59B24]/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#E2C876] ring-1 ring-[#C59B24]/30">
                        {off.country}
                      </span>
                      {i === 0 && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                          <span className={`h-1.5 w-1.5 rounded-full bg-emerald-400 ${reduce ? "" : "animate-pulse"}`} /> HQ
                        </span>
                      )}
                    </div>
                    <h3 className="font-anton text-xl uppercase tracking-wide text-white">{off.city}</h3>
                    <p className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E2C876]" />
                      {off.address}
                    </p>
                    <div className="border-t border-white/10 pt-4">
                      <a
                        href={`tel:${off.phone.split(",")[0].replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#E2C876] transition-colors hover:text-white"
                      >
                        <Phone className="h-3.5 w-3.5" /> {off.phone}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="relative overflow-hidden border-y border-[#C59B24]/30 bg-[#0D1424] py-16 text-white lg:py-20">
        <div className="sf-dots absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C59B24]/15 blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div className="max-w-2xl space-y-3">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C59B24]/40 bg-[#C59B24]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#E2C876]">
                <ShieldCheck className="h-3.5 w-3.5" /> Let&rsquo;s Move Something Together
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-anton text-[clamp(1.7rem,1.1rem+2.4vw,2.8rem)] uppercase leading-[1.05] text-white">
                Ready to Ship With <span className="text-[#E2C876]">Steadfast?</span>
              </h3>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                Get a competitive freight estimation within 2 business hours — our dispatch desk is active 24/7.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <GoldButton onClick={() => openQuoteModal()} className="px-8 py-4">
                <Calculator className="h-4 w-4" /> Request Instant Quote
              </GoldButton>
              <GhostButton dark href="/contact" className="px-6 py-4">
                Contact Our Team <ArrowRight className="h-4 w-4" />
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
