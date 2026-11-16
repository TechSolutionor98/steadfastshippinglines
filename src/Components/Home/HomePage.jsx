"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Ship,
  Plane,
  Truck,
  Warehouse,
  Package,
  Boxes,
  Anchor,
  FileCheck,
  Building2,
  Clock,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Send,
  MapPin,
  TrendingUp,
  Award,
  Search
} from "lucide-react";
import { companyDetails, servicesData } from "@/data/steadfastData";

const iconMap = {
  Ship: Ship,
  Plane: Plane,
  Truck: Truck,
  Warehouse: Warehouse,
  Package: Package,
  Boxes: Boxes,
  Anchor: Anchor,
  FileCheck: FileCheck,
  Building2: Building2,
};

export default function HomePage({ cmsContent }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setTrackingResult(
      `Shipment ${trackingNumber.toUpperCase()}: In transit. Scheduled for on-time clearance and delivery. Please contact our 24/7 dispatch desk for detailed milestone telemetry.`
    );
  };

  return (
    <div className="bg-slate-50 text-slate-800 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#050f1d] via-[#0b1b33] to-[#132c52] text-white py-20 lg:py-28 px-4 overflow-hidden">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        {/* Glowing orb accent */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide">
                <Ship className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Welcome to Steadfast Shipping (PVT) LTD</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Tailored Logistics Services for Every Need
              </h1>

              <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed max-w-2xl">
                Reliable worldwide freight forwarding across ocean, air, and road. Delivering your cargo on time, within budget, and with complete 24/7 security.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/quote"
                  className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#0369a1] hover:to-[#075985] text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Request Instant Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 flex items-center gap-2 backdrop-blur-md transition-all"
                >
                  <span>Explore 10 Services</span>
                </Link>
              </div>

              {/* Quick Tracking Tool */}
              <div className="pt-4 max-w-lg">
                <form onSubmit={handleTrack} className="flex gap-2 p-1.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                  <div className="flex items-center pl-3 text-slate-400">
                    <Search className="w-4 h-4 text-sky-400" />
                  </div>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter Container / Airway Bill No."
                    className="w-full px-2 py-2 text-xs bg-transparent text-white placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0b1b33] text-xs font-bold shrink-0 transition-colors"
                  >
                    Track
                  </button>
                </form>
                {trackingResult && (
                  <p className="mt-2.5 text-xs text-cyan-300 font-medium bg-white/5 p-3 rounded-xl border border-white/10 animate-in fade-in">
                    {trackingResult}
                  </p>
                )}
              </div>
            </div>

            {/* Right Hero Visual Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Freight Network Status</span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    All Ports Active
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Ship className="w-5 h-5 text-cyan-400" />
                    <div className="text-xs">
                      <div className="font-bold text-white">Ocean Freight (FCL & LCL)</div>
                      <div className="text-slate-400">Weekly sailings to 120+ international ports</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Plane className="w-5 h-5 text-sky-400" />
                    <div className="text-xs">
                      <div className="font-bold text-white">Express Air Cargo</div>
                      <div className="text-slate-400">Priority tarmac handling & express customs</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Truck className="w-5 h-5 text-emerald-400" />
                    <div className="text-xs">
                      <div className="font-bold text-white">Road & Cross-Border Freight</div>
                      <div className="text-slate-400">Dedicated fleets & bonded intermodal transport</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Need rate estimation?</span>
                  <Link href="/quote" className="text-cyan-400 font-bold hover:underline flex items-center gap-1">
                    Calculate Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW WE CAN HELP YOU (Three Core Pillars) */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">How We Can Help You</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b33] mt-2">
            Tailored Freight Management Designed for Your Growth
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            At Steadfast Shipping (PVT) LTD, we provide comprehensive logistics solutions tailored to meet your business needs:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white flex items-center justify-center mb-6 transition-colors shadow-sm">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#0b1b33] mb-3">Innovative Technology</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Leveraging cutting-edge technology, we optimize routes and track shipments in real-time for maximum efficiency and total shipment visibility.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white flex items-center justify-center mb-6 transition-colors shadow-sm">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#0b1b33] mb-3">Worldwide Reach</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              With a vast network of global partners, we provide reliable logistics solutions across international borders, ports, and continents.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center mb-6 transition-colors shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#0b1b33] mb-3">Comprehensive Services</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              From warehousing and packaging to air, sea, and road freight, we provide a full spectrum of logistics services to streamline your supply chain.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES SHOWCASE (10 Services Grid) */}
      <section className="bg-slate-100/60 py-20 px-4 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">What We Provide</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b33] mt-1">
                Our Full Logistics Spectrum
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs sm:text-sm font-bold text-[#0284c7] hover:underline flex items-center gap-1.5"
            >
              <span>Explore All 10 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((svc) => {
              const IconComp = iconMap[svc.icon] || Ship;
              return (
                <div
                  key={svc.slug}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b1b33] mb-1 group-hover:text-[#0284c7] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs font-medium text-sky-600 mb-2">
                      {svc.tagline}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {svc.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/${svc.slug}`}
                      className="text-xs font-bold text-[#0284c7] hover:text-[#0369a1] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/quote"
                      className="text-[11px] font-semibold text-slate-400 hover:text-slate-700"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ABOUT US SECTION PREVIEW */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b33] leading-tight">
              We Are Steadfast Shipping (PVT) LTD
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Steadfast Shipping (PVT) LTD is your trusted partner in logistics, providing innovative and reliable transportation solutions worldwide. Our expert team and advanced technology ensure seamless, efficient, and secure delivery of your goods.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              We are dedicated to exceeding expectations with personalized service, strict adherence to timelines, and a steadfast commitment to excellence.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                <h4 className="font-bold text-sm text-[#0b1b33]">Our Mission</h4>
                <p className="text-xs text-slate-600 mt-1">To deliver reliable, cost-effective global logistics that empower businesses.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                <h4 className="font-bold text-sm text-[#0b1b33]">Our Vision</h4>
                <p className="text-xs text-slate-600 mt-1">To be the most trusted global logistics brand known for punctuality and security.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0b1b33] hover:bg-[#132c52] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="text-3xl font-black text-[#0284c7]">18k+</div>
              <div className="text-xs font-bold text-[#0b1b33]">Successful Shipments</div>
              <p className="text-xs text-slate-500">Delivered safely across all trade routes</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="text-3xl font-black text-emerald-600">99%</div>
              <div className="text-xs font-bold text-[#0b1b33]">On-Time Arrival</div>
              <p className="text-xs text-slate-500">Precision maritime & flight schedule matching</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="text-3xl font-black text-cyan-600">120+</div>
              <div className="text-xs font-bold text-[#0b1b33]">Global Seaports</div>
              <p className="text-xs text-slate-500">Direct connections across Asia, Europe & Americas</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="text-3xl font-black text-indigo-600">24/7</div>
              <div className="text-xs font-bold text-[#0b1b33]">Operations Desk</div>
              <p className="text-xs text-slate-500">Live human coordinators monitoring cargo</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR PROCESS (6 Operational Steps) */}
      <section className="bg-gradient-to-br from-[#0c1f3d] to-[#122e54] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Our Process at Steadfast Shipping (PVT) LTD
            </h2>
            <p className="text-slate-300 text-sm mt-3">
              A transparent, step-by-step workflow designed to eliminate delays and maximize safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyDetails.processSteps.map((st) => (
              <div
                key={st.step}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3 hover:bg-white/10 transition-colors"
              >
                <div className="text-2xl font-black text-cyan-400">{st.step}</div>
                <h4 className="text-lg font-bold text-white">{st.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SERVICE AREAS & GLOBAL TRADE LANES */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">Service Areas</span>
          <h2 className="text-3xl font-black text-[#0b1b33] mt-2">
            Regular Services from All Major Ports
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            We run regular weekly services and direct air consolidations across all principal global commerce hubs:
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
          {companyDetails.serviceAreas.map((c) => (
            <span
              key={c}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-sm hover:border-[#0284c7] hover:text-[#0284c7] transition-colors"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 max-w-3xl mx-auto">
          We extend our dedicated services to CIS countries including Afghanistan, Georgia, Azerbaijan, Turkmenistan, and other CIS destinations.
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-slate-100/70 py-20 px-4 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">FAQS</span>
            <h2 className="text-3xl font-black text-[#0b1b33] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {companyDetails.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#0b1b33]"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#0284c7] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INSTANT QUOTE CTA BANNER */}
      <section className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Move Your Goods Without Delays?
          </h2>
          <p className="text-sky-100 text-sm max-w-2xl mx-auto leading-relaxed">
            Submit your freight specifications today and receive competitive, transparent quotations backed by 24/7 dedicated dispatch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-3.5 bg-white hover:bg-slate-100 text-[#0b1b33] font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              Get a Free Freight Quote
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#0b1b33] hover:bg-[#132c52] text-white font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              Contact Nearest Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
