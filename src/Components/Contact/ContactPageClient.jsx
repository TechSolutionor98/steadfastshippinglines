"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, Clock, Send, CheckCircle2, ArrowRight, ArrowUpRight,
  MapPin, Building2, Calculator, ShieldCheck, Headphones, AlertCircle, MessageSquareText,
} from "lucide-react";
import { companyDetails } from "@/data/steadfastData";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";
import { Reveal, Eyebrow, GoldButton, GhostButton } from "@/Components/Home/motion";
import PageHeroBackground from "@/Components/Banner/PageHeroBackground";

const EASE = [0.22, 1, 0.36, 1];

const SERVICE_OPTIONS = [
  "General Inquiry",
  "Ocean Freight",
  "Air Freight",
  "Road Freight",
  "Customs Clearance",
  "Warehousing & Storage",
  "Cargo Services",
  "Break Bulk Cargo",
  "Door to Door Delivery",
  "Cross Stuffing",
  "Transportation",
];

const QUICK_CARDS = [
  { icon: Phone, title: "Hotlines", lines: ["+92 312 7777952", "+92 312 7777951"], href: "tel:+923127777952", note: "Direct dispatch desk" },
  { icon: Mail, title: "Email Us", lines: ["info@steadfastshippinglines.com"], href: "mailto:info@steadfastshippinglines.com", note: "Reply within 2 hours" },
  { icon: Clock, title: "Working Hours", lines: ["24/7 Continuous Service"], note: "Operations never sleep" },
];

export default function ContactPageClient({ initialBanners = [] }) {
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "General Inquiry",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "contact" }),
      });
      if (!res.ok) throw new Error("Failed to submit message");
      setStatus({
        type: "success",
        msg: "Thank you for reaching out! Your message has been received by our operations team. We will contact you shortly.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", service: "General Inquiry", comments: "" });
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Failed to send message. Please call our 24/7 desk directly at " + companyDetails.phone,
      });
    } finally {
      setLoading(false);
    }
  };

  const fieldCls =
    "w-full rounded-xl border border-[#D7DCE0] bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B24]";
  const labelCls = "mb-1.5 block text-[11px] font-black uppercase tracking-wider text-[#1D2A4C]";

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#C59B24] selection:text-white">
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[#0D1424] lg:min-h-[560px]">
        <PageHeroBackground page="/contact" initialBanners={initialBanners} darkOverlay={false}>
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#E2C876]/30 bg-white/5 py-2 pl-2 pr-4 backdrop-blur-md"
              >
                <span className="flex h-6 items-center rounded-full bg-[#C59B24] px-3 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                  24/7 Desk
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                  Keep in Touch With Us for Help
                </span>
              </motion.div>

              <h1 className="font-anton uppercase leading-[0.98] tracking-tight text-white">
                {["Contact Our", "Global Team"].map((line, li) => (
                  <span key={li} className="block overflow-hidden pb-1">
                    <motion.span
                      className="mr-[0.24em] inline-block text-[clamp(2.2rem,1.3rem+4.2vw,4.6rem)]"
                      initial={{ y: "110%" }}
                      animate={reduce ? {} : { y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 + li * 0.12, ease: EASE }}
                    >
                      {li === 1 ? <span className="text-[#E2C876]">{line}</span> : line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
                className="mt-6 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base"
              >
                We are always available to assist you with your logistics needs. Reach out to our
                regional desks or submit an online request — a freight coordinator responds
                within 2 hours.
              </motion.p>
            </div>
          </div>
        </PageHeroBackground>
      </section>

      {/* ============ QUICK CONTACT CARDS (overlap) ============ */}
      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Quick contact methods">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {QUICK_CARDS.map((c, i) => {
            const Wrapper = c.href ? "a" : "div";
            return (
              <Reveal key={c.title} delay={0.08 + i * 0.08}>
                <motion.div whileHover={reduce ? {} : { y: -6 }} transition={{ duration: 0.3, ease: EASE }}>
                  <Wrapper
                    {...(c.href ? { href: c.href } : {})}
                    className="group block h-full rounded-2xl border border-[#D7DCE0] bg-white p-6 shadow-xl shadow-[#1D2A4C]/[0.07] transition-colors duration-300 hover:border-[#C59B24]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] focus-visible:ring-offset-2"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FDF9EE] text-[#C59B24] ring-1 ring-[#E2C876]/60 transition-all duration-300 group-hover:bg-[#C59B24] group-hover:text-white">
                        <c.icon className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{c.title}</div>
                        {c.lines.map((l) => (
                          <div key={l} className="truncate text-sm font-extrabold text-[#1D2A4C]">{l}</div>
                        ))}
                        <div className="text-[11px] text-slate-500">{c.note}</div>
                      </div>
                    </div>
                  </Wrapper>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ FORM + INFO PANEL ============ */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#D7DCE0] bg-white shadow-2xl shadow-[#1D2A4C]/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Form */}
              <div className="p-8 sm:p-12 lg:col-span-7">
                <Reveal>
                  <Eyebrow>Send an Inquiry</Eyebrow>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="mt-3 font-anton text-[clamp(1.7rem,1.1rem+2.2vw,2.6rem)] uppercase leading-[1.03] text-[#1D2A4C]">
                    How Can We <span className="text-[#C59B24]">Help You?</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="mt-3 text-xs text-slate-500 sm:text-sm">
                    Fill in your details below and a freight coordinator will respond within 2 hours.
                  </p>
                </Reveal>

                <div className="mt-8">
                  <AnimatePresence>
                    {status.msg && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        role={status.type === "error" ? "alert" : "status"}
                        className={`mb-6 flex items-start gap-2.5 rounded-xl border p-4 text-xs font-medium sm:text-sm ${
                          status.type === "success"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border-red-200 bg-red-50 text-red-800"
                        }`}
                      >
                        {status.type === "success" ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        )}
                        <span>{status.msg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="cf-name" className={labelCls}>Your Name *</label>
                        <input id="cf-name" type="text" name="name" required autoComplete="name"
                          value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" className={fieldCls} />
                      </div>
                      <div>
                        <label htmlFor="cf-email" className={labelCls}>Your Email *</label>
                        <input id="cf-email" type="email" name="email" required autoComplete="email"
                          value={formData.email} onChange={handleChange} placeholder="e.g. john@example.com" className={fieldCls} />
                      </div>
                      <div>
                        <label htmlFor="cf-phone" className={labelCls}>Phone Number *</label>
                        <input id="cf-phone" type="tel" name="phone" required autoComplete="tel"
                          value={formData.phone} onChange={handleChange} placeholder="e.g. +92 312 7777952" className={fieldCls} />
                      </div>
                      <div>
                        <label htmlFor="cf-service" className={labelCls}>Service of Interest</label>
                        <select id="cf-service" name="service" value={formData.service} onChange={handleChange}
                          className={`${fieldCls} cursor-pointer appearance-none font-semibold`}>
                          {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="cf-subject" className={labelCls}>Subject / Cargo Service *</label>
                        <input id="cf-subject" type="text" name="subject" required
                          value={formData.subject} onChange={handleChange} placeholder="e.g. Ocean FCL Rate Inquiry" className={fieldCls} />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="cf-comments" className={labelCls}>Message / Requirements *</label>
                        <textarea id="cf-comments" rows={4} name="comments" required
                          value={formData.comments} onChange={handleChange}
                          placeholder="Describe your freight origin, destination, cargo volume, or general inquiry..."
                          className={`${fieldCls} resize-none`} />
                      </div>
                    </div>

                    <GoldButton type="submit" disabled={loading} className="w-full py-4 text-sm sm:w-auto sm:px-10">
                      {loading ? (
                        <>
                          <motion.span
                            className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                            animate={reduce ? {} : { rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Transmitting…
                        </>
                      ) : (
                        <><Send className="h-4 w-4" /> Send Message</>
                      )}
                    </GoldButton>
                  </form>
                </div>
              </div>

              {/* Info panel */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#141E36] to-[#0D1424] p-8 text-white sm:p-12 lg:col-span-5">
                <div className="sf-dots absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#C59B24]/15 blur-[90px]" aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                  <div className="space-y-6">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-[0.24em] text-[#E2C876]">Fast Assistance</span>
                      <h3 className="mt-2 font-anton text-3xl uppercase tracking-wide text-white">24/7 Operations Desk</h3>
                      <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                        Our cargo coordinators monitor maritime schedules, customs filings, and flights around the clock.
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      {[
                        { icon: Phone, label: "Direct Support Hotlines", content: (
                          <span className="flex flex-wrap items-center gap-1.5">
                            <a href="tel:+923127777952" className="font-bold text-white transition-colors hover:text-[#E2C876]">+92 312 7777952</a>
                            <span className="text-white/40">/</span>
                            <a href="tel:+923127777951" className="font-bold text-white transition-colors hover:text-[#E2C876]">+92 312 7777951</a>
                          </span>
                        )},
                        { icon: Mail, label: "Electronic Mail", content: (
                          <a href="mailto:info@steadfastshippinglines.com" className="font-bold text-white transition-colors hover:text-[#E2C876]">
                            info@steadfastshippinglines.com
                          </a>
                        )},
                        { icon: MapPin, label: "Head Office", content: (
                          <span className="text-xs leading-relaxed text-slate-200">
                            Razzaq Center, West Canal Road, Faisalabad, Pakistan
                          </span>
                        )},
                        { icon: Clock, label: "Business & Operations", content: (
                          <span className="font-bold text-white">24/7 Continuous Service</span>
                        )},
                      ].map((row, i) => (
                        <Reveal key={row.label} delay={0.1 + i * 0.08}>
                          <div className="group flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-[#C59B24]/40 hover:bg-white/[0.07]">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C59B24]/15 text-[#E2C876] ring-1 ring-[#C59B24]/30 transition-all duration-300 group-hover:bg-[#C59B24] group-hover:text-white">
                              <row.icon className="h-5 w-5" strokeWidth={2.1} />
                            </span>
                            <div className="min-w-0 text-xs">
                              <span className="mb-0.5 block text-[11px] text-slate-400">{row.label}</span>
                              {row.content}
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>

                  <Reveal delay={0.3}>
                    <div className="border-t border-white/10 pt-6">
                      <GoldButton onClick={() => openQuoteModal()} className="w-full py-4">
                        <Calculator className="h-4 w-4" /> Need an Instant Rate?
                      </GoldButton>
                      <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Response within 2 business hours
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OFFICES ============ */}
      <section className="relative overflow-hidden bg-[#0D1424] py-20 text-white lg:py-24">
        <div className="sf-dots absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#C59B24]/10 blur-[130px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Reveal><Eyebrow dark center>Offices Detail</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] uppercase leading-[1.03] text-white">
                Visit Our <span className="text-[#E2C876]">Regional Desks</span>
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
                    <div className="space-y-1.5 border-t border-white/10 pt-4 text-xs">
                      <a href={`tel:${off.phone.split(",")[0].replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 font-bold text-[#E2C876] transition-colors hover:text-white">
                        <Phone className="h-3.5 w-3.5" /> {off.phone}
                      </a>
                      <a href={`mailto:${off.email}`} className="inline-flex items-center gap-2 font-semibold text-slate-300 transition-colors hover:text-white">
                        <Mail className="h-3.5 w-3.5" /> {off.email}
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
      <section className="relative overflow-hidden border-t border-[#C59B24]/30 bg-[#0D1424] py-16 text-white lg:py-20">
        <div className="sf-dots absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C59B24]/15 blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div className="max-w-2xl space-y-3">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C59B24]/40 bg-[#C59B24]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#E2C876]">
                <Headphones className="h-3.5 w-3.5" /> Still Deciding?
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-anton text-[clamp(1.7rem,1.1rem+2.4vw,2.8rem)] uppercase leading-[1.05] text-white">
                Get a Competitive <span className="text-[#E2C876]">Freight Estimation</span>
              </h3>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="flex items-center justify-center gap-2 text-xs leading-relaxed text-slate-300 sm:text-sm lg:justify-start">
                <MessageSquareText className="h-4 w-4 shrink-0 text-[#E2C876]" />
                Skip the inbox — calculate your rate instantly with our quote desk.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <GoldButton onClick={() => openQuoteModal()} className="px-8 py-4">
                <Calculator className="h-4 w-4" /> Request Instant Quote
              </GoldButton>
              <GhostButton dark href="/services" className="px-6 py-4">
                Browse Services <ArrowUpRight className="h-4 w-4" />
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
