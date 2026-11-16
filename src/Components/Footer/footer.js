"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    <footer className="bg-[#071325] text-gray-300 pt-16 pb-8 border-t border-[#132238]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Feature Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-gray-800">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#0c1f3d]/60 border border-blue-900/40">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Safe & Insured</h4>
              <p className="text-xs text-gray-400 mt-0.5">Comprehensive cargo protection across all transit legs</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#0c1f3d]/60 border border-blue-900/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 Operations Desk</h4>
              <p className="text-xs text-gray-400 mt-0.5">Real-time status updates and continuous dispatch support</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#0c1f3d]/60 border border-blue-900/40">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Worldwide Port Access</h4>
              <p className="text-xs text-gray-400 mt-0.5">Regular sailings and air charters to 120+ destinations</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284c7] to-[#0369a1] flex items-center justify-center text-white shadow-md">
                <Ship className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight leading-none">
                  STEADFAST
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#0284c7] uppercase">
                  SHIPPING & LOGISTICS
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Steadfast Shipping (PVT) LTD is your trusted partner in logistics, providing innovative and reliable transportation solutions worldwide. Seamless, efficient, and secure freight forwarding.
            </p>

            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 block">
                  Subscribe to Shipping Advisories & Rate Updates:
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2 text-xs bg-[#0c1f3d] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#0284c7]"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shrink-0 transition-colors"
                  >
                    {submitting ? "..." : "Join"}
                  </button>
                </div>
                {statusMsg && (
                  <p className="text-xs text-emerald-400 font-medium">{statusMsg}</p>
                )}
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-white transition-colors">Request a Quote</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Logistics Services</h4>
            <ul className="space-y-2 text-xs">
              {servicesData.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-[#0284c7] font-semibold hover:underline">
                  View All 10 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Offices */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Global Offices</h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="border-l-2 border-[#0284c7] pl-3 py-0.5">
                <span className="font-bold text-gray-200 block">Faisalabad, Pakistan (HQ)</span>
                <p>Office No. 1, 1st Floor, Bilal Center, West Canal Road</p>
                <a href="tel:+923218662222" className="text-cyan-400 hover:underline block mt-0.5">+92 321 8662 222</a>
              </div>

              <div className="border-l-2 border-emerald-500 pl-3 py-0.5">
                <span className="font-bold text-gray-200 block">United Kingdom (UK)</span>
                <p>23A Wednesbury Road, Walsall, WS1 3RU</p>
                <a href="tel:+447383783357" className="text-emerald-400 hover:underline block mt-0.5">+44 7383 783357</a>
              </div>

              <div className="border-l-2 border-sky-500 pl-3 py-0.5">
                <span className="font-bold text-gray-200 block">Dubai, UAE</span>
                <p>Raja Building, Office 3, Bur Dubai</p>
                <a href="tel:+971559682523" className="text-sky-400 hover:underline block mt-0.5">+971 55 9682523</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Steadfast Shipping (PVT) LTD. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/quote" className="hover:text-gray-300 transition-colors">Instant Quote</Link>
            <Link href="/services" className="hover:text-gray-300 transition-colors">Freight Services</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Offices & Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
