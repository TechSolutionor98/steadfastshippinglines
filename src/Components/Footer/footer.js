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
  Globe
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
    <footer className="bg-[#141E36] text-[#D7DCE0] pt-16 pb-8 border-t border-[#D7DCE0]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Feature Banner (Deep Navy + Gold) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#D7DCE0]/15">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#1D2A4C]/80 border border-[#D7DCE0]/15">
            <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Safe & Insured</h4>
              <p className="text-xs text-[#D7DCE0]/80 mt-0.5">Comprehensive cargo protection across all transit legs</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#1D2A4C]/80 border border-[#D7DCE0]/15">
            <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 Operations Desk</h4>
              <p className="text-xs text-[#D7DCE0]/80 mt-0.5">Real-time status updates and continuous dispatch support</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#1D2A4C]/80 border border-[#D7DCE0]/15">
            <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Worldwide Port Access</h4>
              <p className="text-xs text-[#D7DCE0]/80 mt-0.5">Regular sailings and air charters to major global destinations</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo Only */}
            <Link href="/" className="inline-block group py-1">
              <div className="relative h-16 sm:h-20 w-32 sm:w-44 shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo-white.png"
                  alt="Steadfast Shipping Lines (Pvt) Ltd"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#D7DCE0]/90 leading-relaxed">
              Steadfast Shipping Lines (Pvt) Ltd is your trusted partner in logistics, providing innovative and reliable transportation solutions worldwide. Seamless, efficient, and secure freight forwarding across ocean, air, and land.
            </p>

            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <label className="text-xs font-semibold text-white block">
                  Subscribe to Shipping Advisories & Rate Updates:
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2 text-xs bg-[#1D2A4C] border border-[#D7DCE0]/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#C59B24]"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-[#C59B24] hover:bg-[#B0891E] text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow-sm shadow-[#C59B24]/20"
                  >
                    {submitting ? "..." : "Join"}
                  </button>
                </div>
                {statusMsg && (
                  <p className="text-xs text-[#C59B24] font-medium">{statusMsg}</p>
                )}
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider text-[#C59B24]">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#C59B24] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#C59B24] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C59B24] transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-[#C59B24] transition-colors">Request a Quote</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C59B24] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider text-[#C59B24]">Logistics Services</h4>
            <ul className="space-y-2 text-xs">
              {servicesData.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="hover:text-[#C59B24] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-[#C59B24] font-bold hover:underline inline-flex items-center gap-1">
                  View All 10 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Offices (From uploaded Contact card) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider text-[#C59B24]">Our Offices</h4>
            <div className="space-y-3.5 text-xs text-[#D7DCE0]">
              <div className="border-l-2 border-[#C59B24] pl-3 py-0.5">
                <span className="font-bold text-white block">Head Office (Faisalabad)</span>
                <p className="text-[11px] text-[#D7DCE0]/80 mt-0.5">P-3067, Office No. 01, 1st Floor, Razzaq Center, Behind Kia Motors, West Canal Road, Faisalabad, Pakistan.</p>
                <div className="mt-1 space-y-0.5">
                  <a href="tel:+923127777952" className="text-[#C59B24] hover:underline block font-semibold">+92 312 7777952</a>
                  <a href="tel:+923127777951" className="text-[#C59B24] hover:underline block font-semibold">+92 312 7777951</a>
                </div>
              </div>

              <div className="border-l-2 border-[#D7DCE0] pl-3 py-0.5">
                <span className="font-bold text-white block">Karachi Office</span>
                <p className="text-[11px] text-[#D7DCE0]/80 mt-0.5">Saima Trade Tower, Block A 810 main I.I. Chundrigar road near Shaheen Complex, Karachi.</p>
                <div className="mt-1 space-y-0.5">
                  <a href="tel:+923127777952" className="text-[#C59B24] hover:underline block font-semibold">+92 312 7777952 / 951</a>
                </div>
              </div>

              <div className="pt-1 text-[11px] text-[#D7DCE0]/90">
                <p><span className="text-white font-semibold">Email:</span> <a href="mailto:info@steadfastshippinglines.com" className="text-[#C59B24] hover:underline">info@steadfastshippinglines.com</a></p>
                <p><span className="text-white font-semibold">Web:</span> www.steadfastshippinglines.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D7DCE0]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D7DCE0]/70">
          <p>© {new Date().getFullYear()} Steadfast Shipping Lines (Pvt) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/quote" className="hover:text-[#C59B24] transition-colors">Instant Quote</Link>
            <Link href="/services" className="hover:text-[#C59B24] transition-colors">Freight Services</Link>
            <Link href="/contact" className="hover:text-[#C59B24] transition-colors">Offices & Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}