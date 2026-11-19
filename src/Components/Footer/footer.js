"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Facebook, Instagram, Linkedin, Send, Phone, Mail, MapPin,
  ArrowUpRight, ArrowRight, CheckCircle2, AlertCircle,
} from "lucide-react";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";

const EASE = [0.22, 1, 0.36, 1];

const SOCIALS = [
  { name: "Facebook", icon: Facebook },
  { name: "X (Twitter)", icon: null },
  { name: "Instagram", icon: Instagram },
  { name: "LinkedIn", icon: Linkedin },
];

const SERVICES_LIST = [
  { title: "Ocean Freight", href: "/ocean-freight" },
  { title: "Air Freight", href: "/air-freight" },
  { title: "Customs Clearance", href: "/customs-clearance-service" },
  { title: "Warehousing", href: "/warehousing-service" },
  { title: "Cargo Services", href: "/cargo-services" },
  { title: "Break Bulk Cargo", href: "/break-bulk-cargo-service" },
  { title: "Door to Door", href: "/door-to-door-delievery" },
  { title: "Cross Stuffing", href: "/cross-stuffing-service" },
  { title: "Transportation", href: "/transportation-service" },
  { title: "Road Freight", href: "/road-freight" },
];

const COMPANY_LIST = [
  { title: "About Us", href: "/about-us" },
  { title: "Our Services", href: "/services" },
  { title: "Request a Quote", href: "/quote", action: "quote" },
  { title: "Contact Us", href: "/contact" },
  { title: "Blogs", href: "/blogs" },
];

function renderXIcon() {
  return (
    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const reduce = useReducedMotion();
  const [emailInput, setEmailInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusOk, setStatusOk] = useState(true);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setStatusOk(false);
      setStatusMsg("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setStatusMsg("");
    try {
      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: emailInput,
          phone: "",
          subject: "Newsletter Subscription",
          service: "subscription",
          comments: "Subscribed via footer form",
        }),
      });
      setStatusOk(true);
      setStatusMsg(res.ok ? "Thank you! You are subscribed." : "Subscription received. Thank you!");
      setEmailInput("");
    } catch (err) {
      setStatusOk(true);
      setStatusMsg("Thank you for subscribing!");
      setEmailInput("");
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatusMsg(""), 5000);
    }
  };

  const heading = "font-anton text-[15px] uppercase leading-none tracking-[0.1em] text-[#E2C876]";

  return (
    <footer className="relative overflow-hidden bg-[#0D1424] text-white">
      {/* ambient decor */}
      <div className="sf-dots absolute inset-0 opacity-[0.15]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#C59B24]/[0.07] blur-[120px]" aria-hidden="true" />
      {/* gold top edge */}
      <div className="relative h-[3px] w-full bg-gradient-to-r from-transparent via-[#C59B24] to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        {/* ============ TOP CTA STRIP ============ */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-14 flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-10 text-center md:flex-row md:text-left"
        >
          <div className="max-w-xl">
            <h3 className="font-anton text-2xl uppercase leading-tight text-white sm:text-3xl">
              Ready to Move <span className="text-[#E2C876]">Your Cargo?</span>
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white sm:text-sm">
              Get a competitive freight estimation within 2 business hours — dispatch desk active 24/7.
            </p>
          </div>
          <button
            onClick={() => openQuoteModal()}
            className="group relative inline-flex shrink-0 cursor-pointer items-center gap-2.5 bg-[#C59B24] px-7 py-4 text-[12px] font-black uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#1D2A4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1424]"
          >
            <span className="absolute inset-y-0 left-0 w-[3px] bg-[#E2C876]" aria-hidden="true" />
            <span className="relative z-10 inline-flex items-center gap-2.5">
              Get Instant Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>

        {/* ============ MAIN GRID ============ */}
        <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand column */}
          <div className="flex flex-col items-center space-y-5 text-center lg:col-span-4 lg:items-start lg:text-left">
            <Link href="/" className="group inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] rounded-lg" aria-label="Steadfast Shipping Lines — Home">
              <div className="relative h-16 w-48 transition-transform duration-300 group-hover:scale-[1.03] sm:h-20 sm:w-60">
                <Image
                  src="/images/logo-white-main.png"
                  alt="Steadfast Shipping Lines"
                  fill
                  unoptimized
                  className="object-contain object-center lg:object-left"
                />
              </div>
            </Link>

            <p className="max-w-xs text-xs leading-relaxed text-white">
              Your trusted partner in global logistics — innovative multimodal freight solutions
              delivered with precision across 120+ ports worldwide.
            </p>

            {/* socials */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.name}
                    href="#"
                    aria-label={s.name}
                    whileHover={reduce ? {} : { y: -3 }}
                    whileTap={reduce ? {} : { scale: 0.94 }}
                    className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.06] text-white transition-colors duration-300 hover:border-[#C59B24] hover:bg-[#C59B24] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24]"
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : renderXIcon()}
                  </motion.a>
                );
              })}
            </div>

            {/* newsletter */}
            <div className="w-full max-w-sm space-y-2.5">
              <p className="font-anton text-[11px] uppercase tracking-[0.1em] text-white">
                Stay updated — no spam, ever
              </p>
              <form onSubmit={handleSubscribe} className="flex w-full" noValidate>
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full border border-white/20 border-r-0 bg-white/[0.07] px-4 py-3 text-xs text-white placeholder-white/60 transition-colors focus:border-[#C59B24] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  aria-label="Subscribe to newsletter"
                  className="flex shrink-0 cursor-pointer items-center justify-center border border-[#C59B24] bg-[#C59B24] px-4 text-white transition-colors hover:bg-[#B0891E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1424] disabled:opacity-60"
                >
                  {submitting ? (
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                      animate={reduce ? {} : { rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </form>
              {statusMsg && (
                <p className={`flex items-center gap-1.5 text-xs font-semibold ${statusOk ? "text-emerald-400" : "text-red-400"}`} role="status">
                  {statusOk ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                  {statusMsg}
                </p>
              )}
            </div>
          </div>

          {/* Services column */}
          <nav className="lg:col-span-3" aria-label="Footer services">
            <h4 className={heading}>Our Services</h4>
            <span className="mt-2 block h-[2px] w-7 bg-[#C59B24]/60" aria-hidden="true" />
            <ul className="mt-5 grid grid-cols-1 gap-2.5 text-xs sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
              {SERVICES_LIST.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group inline-flex items-center gap-2.5 py-0.5 text-white transition-colors duration-200 hover:text-[#E2C876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] rounded"
                  >
                    <span className="h-px w-3 bg-white/50 transition-all duration-300 group-hover:w-5 group-hover:bg-[#C59B24]" aria-hidden="true" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company column */}
          <nav className="lg:col-span-2" aria-label="Footer company">
            <h4 className={heading}>Company</h4>
            <span className="mt-2 block h-[2px] w-7 bg-[#C59B24]/60" aria-hidden="true" />
            <ul className="mt-5 space-y-2.5 text-xs">
              {COMPANY_LIST.map((item) => (
                <li key={item.href}>
                  {item.action === "quote" ? (
                    <button
                      onClick={() => openQuoteModal()}
                      className="group inline-flex cursor-pointer items-center gap-2.5 py-0.5 text-white transition-colors duration-200 hover:text-[#E2C876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] rounded"
                    >
                      <span className="h-px w-3 bg-white/50 transition-all duration-300 group-hover:w-5 group-hover:bg-[#C59B24]" aria-hidden="true" />
                      {item.title}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2.5 py-0.5 text-white transition-colors duration-200 hover:text-[#E2C876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] rounded"
                    >
                      <span className="h-px w-3 bg-white/50 transition-all duration-300 group-hover:w-5 group-hover:bg-[#C59B24]" aria-hidden="true" />
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div className="lg:col-span-3">
            <h4 className={heading}>Get In Touch</h4>
            <span className="mt-2 block h-[2px] w-7 bg-[#C59B24]/60" aria-hidden="true" />
            <div className="mt-5 space-y-4 text-xs">
              {/* phones */}
              <div>
                <span className="mb-1.5 flex items-center gap-1.5 font-montserrat text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
                  <Phone className="h-3 w-3 text-[#C59B24]" /> Phones
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-semibold">
                  <a href="tel:+923127777952" className="text-white transition-colors hover:text-[#E2C876]">+92 312 7777952</a>
                  <span className="text-white/50">/</span>
                  <a href="tel:+923127777951" className="text-white transition-colors hover:text-[#E2C876]">+92 312 7777951</a>
                </div>
              </div>

              {/* email */}
              <div>
                <span className="mb-1 flex items-center gap-1.5 font-montserrat text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
                  <Mail className="h-3 w-3 text-[#C59B24]" /> Email
                </span>
                <a href="mailto:info@steadfastshippinglines.com" className="font-semibold text-white transition-colors hover:text-[#E2C876]">
                  info@steadfastshippinglines.com
                </a>
              </div>

              {/* offices */}
              <div>
                <span className="mb-1.5 flex items-center gap-1.5 font-montserrat text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
                  <MapPin className="h-3 w-3 text-[#C59B24]" /> Head Office — Faisalabad
                </span>
                <p className="text-[11px] leading-relaxed text-white">
                  P-3067, Office No. 01, 1st Floor, Razzaq Center, Behind Kia Motors, West Canal Road, Faisalabad, Pakistan.
                </p>
              </div>
              <div>
                <span className="mb-1.5 flex items-center gap-1.5 font-montserrat text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
                  <MapPin className="h-3 w-3 text-[#C59B24]" /> Branch Office — Karachi
                </span>
                <p className="text-[11px] leading-relaxed text-white">
                  Saima Trade Tower, Block A 810, Main I.I. Chundrigar Road, Near Shaheen Complex, Karachi, Pakistan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ BOTTOM BAR ============ */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white sm:flex-row">
          <p>© {new Date().getFullYear()} Steadfast Shipping Lines (Pvt) Ltd. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Developed by
            <a
              href="https://techsolutionor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#E2C876] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] rounded"
            >
              Tech Solutionor <ArrowUpRight className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
