"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Ship,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  CheckCircle2,
  Globe,
  Building2,
  ChevronRight,
  MessageCircle
} from "lucide-react";
import { companyDetails, servicesData } from "@/data/steadfastData";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
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
      if (res.ok) {
        setStatusMsg("Thank you! You are subscribed to logistics updates.");
        setEmailInput("");
      } else {
        setStatusMsg("Subscription received. Thank you!");
        setEmailInput("");
      }
    } catch (err) {
      setStatusMsg("Thank you for subscribing!");
      setEmailInput("");
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatusMsg(""), 5000);
    }
  };

  return (
    <footer className="relative bg-[#0E1626] text-[#D7DCE0] pt-14 pb-8 border-t border-[#D7DCE0]/15 overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C59B24]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#1D2A4C]/40 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Pre-Footer Action Banner (Executive Corporate Callout) */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#141E36] via-[#1D2A4C] to-[#141E36] p-6 sm:p-8 mb-14 border border-[#C59B24]/30 shadow-2xl overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-[11px] font-bold text-[#C59B24] uppercase tracking-widest px-3 py-1 rounded-full bg-[#C59B24]/10 border border-[#C59B24]/25 inline-block">
                GLOBAL FREIGHT FORWARDING & LOGISTICS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Ready to Move Your Cargo Worldwide?
              </h3>
              <p className="text-xs sm:text-sm text-[#D7DCE0]/85">
                Connect with our freight specialists for schedule confirmations, immediate container allocation, and customized route rates.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:+923127777952"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-[#D7DCE0]/25 text-xs font-bold transition-all hover:border-[#C59B24]"
              >
                <Phone className="w-4 h-4 text-[#C59B24]" />
                <span>+92 312 7777952</span>
              </a>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#C59B24]/20 hover:scale-105"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Column 1: Brand Info & Newsletter (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group py-1">
              <div className="relative h-16 sm:h-20 w-36 sm:w-48 shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo-white.png"
                  alt="Steadfast Shipping Lines (Pvt) Ltd"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#D7DCE0]/85 leading-relaxed">
              Steadfast Shipping Lines (Pvt) Ltd is your trusted partner in multimodal logistics, providing innovative and dependable freight forwarding solutions across international ocean, air, and overland routes.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="pt-2">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C59B24]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Shipping Advisories & Rate Alerts
                  </span>
                </div>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter your corporate email"
                      className="w-full px-3.5 py-2 text-xs bg-[#141E36] border border-[#D7DCE0]/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#C59B24]"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 bg-[#C59B24] hover:bg-[#B0891E] text-white rounded-lg text-xs font-bold shrink-0 transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? "..." : "Join"}</span>
                    </button>
                  </div>
                  {statusMsg && (
                    <p className="text-xs text-[#C59B24] font-medium">{statusMsg}</p>
                  )}
                </form>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>100% Confidential • Zero Spam • Unsubscribe anytime</span>
                </div>
              </div>
            </div>

            {/* Direct Instant Channels */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://wa.me/923127777952"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium transition-colors"
                title="Direct WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
              <a
                href="mailto:info@steadfastshippinglines.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#D7DCE0] border border-white/10 text-xs font-medium transition-colors hover:text-[#C59B24]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Email</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-wider">Quick Links</h4>
              <div className="w-8 h-0.5 bg-[#C59B24] mt-2 rounded-full" />
            </div>
            <ul className="space-y-2.5 text-xs">
              {[
                { title: "Home", href: "/" },
                { title: "About Us", href: "/about-us" },
                { title: "Our Services", href: "/services" },
                { title: "Request a Quote", href: "/quote" },
                { title: "Contact Us", href: "/contact" },
                { title: "News & Insights", href: "/blogs" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-[#D7DCE0]/80 hover:text-[#C59B24] transition-all hover:translate-x-1"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C59B24] shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Logistics Services (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-wider">Logistics Services</h4>
              <div className="w-8 h-0.5 bg-[#C59B24] mt-2 rounded-full" />
            </div>
            <ul className="space-y-2.5 text-xs">
              {servicesData.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="group flex items-center gap-1.5 text-[#D7DCE0]/80 hover:text-[#C59B24] transition-all hover:translate-x-1"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C59B24] shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/services"
                  className="text-xs font-bold text-[#C59B24] hover:underline inline-flex items-center gap-1.5 group"
                >
                  <span>View All 10 Services</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Offices (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-wider">Our Offices</h4>
              <div className="w-8 h-0.5 bg-[#C59B24] mt-2 rounded-full" />
            </div>

            <div className="space-y-3">
              {/* Head Office (Faisalabad) */}
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#C59B24]/50 transition-colors space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#C59B24]" />
                    Head Office (Faisalabad)
                  </span>
                  <span className="text-[10px] font-bold text-[#C59B24] uppercase tracking-wider bg-[#C59B24]/10 border border-[#C59B24]/30 px-2 py-0.5 rounded">
                    HQ
                  </span>
                </div>
                <p className="text-[11px] text-[#D7DCE0]/80 leading-relaxed pl-5">
                  P-3067, Office No. 01, 1st Floor, Razzaq Center, Behind Kia Motors, West Canal Road, Faisalabad, Pakistan.
                </p>
                <div className="pl-5 pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <a href="tel:+923127777952" className="text-[#C59B24] hover:underline font-bold inline-flex items-center gap-1">
                    <Phone className="w-3 h-3" /> +92 312 7777952
                  </a>
                  <a href="tel:+923127777951" className="text-[#C59B24] hover:underline font-bold inline-flex items-center gap-1">
                    <Phone className="w-3 h-3" /> +92 312 7777951
                  </a>
                </div>
              </div>

              {/* Karachi Regional Office */}
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#C59B24]/50 transition-colors space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-[#C59B24]" />
                    Karachi Regional Office
                  </span>
                  <span className="text-[10px] font-bold text-[#D7DCE0]/80 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">
                    Port Hub
                  </span>
                </div>
                <p className="text-[11px] text-[#D7DCE0]/80 leading-relaxed pl-5">
                  Saima Trade Tower, Block A 810 main I.I. Chundrigar road near Shaheen Complex, Karachi.
                </p>
                <div className="pl-5 pt-1 text-xs">
                  <a href="tel:+923127777952" className="text-[#C59B24] hover:underline font-bold inline-flex items-center gap-1">
                    <Phone className="w-3 h-3" /> +92 312 7777952 / 951
                  </a>
                </div>
              </div>

              {/* Contact Channels */}
              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C59B24] shrink-0" />
                  <span className="text-[#D7DCE0]">Email:</span>
                  <a href="mailto:info@steadfastshippinglines.com" className="text-[#C59B24] hover:underline truncate">
                    info@steadfastshippinglines.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#C59B24] shrink-0" />
                  <span className="text-[#D7DCE0]">Web:</span>
                  <span className="text-white font-medium">www.steadfastshippinglines.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D7DCE0]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#D7DCE0]/70">
          <p>© {new Date().getFullYear()} Steadfast Shipping Lines (Pvt) Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
            <Link href="/quote" className="hover:text-[#C59B24] transition-colors">Instant Quote</Link>
            <span className="text-slate-600">•</span>
            <Link href="/services" className="hover:text-[#C59B24] transition-colors">Freight Services</Link>
            <span className="text-slate-600">•</span>
            <Link href="/contact" className="hover:text-[#C59B24] transition-colors">Offices & Contact</Link>
            <span className="text-slate-600">•</span>
            <span className="text-[#C59B24] font-medium">Global Multimodal Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
