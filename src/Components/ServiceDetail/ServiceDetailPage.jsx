"use client";

import React from "react";
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
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Globe,
  Phone,
  Mail,
  HelpCircle,
  ChevronRight,
  Headphones,
  Route,
  Navigation,
  HeartHandshake
} from "lucide-react";
import { companyDetails, servicesData } from "@/data/steadfastData";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";

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

export default function ServiceDetailPage({ service }) {
  const IconComp = iconMap[service.icon] || Ship;
  const otherServices = servicesData.filter((s) => s.id !== service.id);

  return (
    <div className="bg-white min-h-screen text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white py-16 sm:py-24 px-4 overflow-hidden border-b border-[#D7DCE0]/15">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D7DCE0] mb-4 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#C59B24] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/services" className="hover:text-[#C59B24] transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[#C59B24] font-bold">{service.shortTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C59B24]/15 border border-[#C59B24]/40 text-[#C59B24] text-xs font-bold mb-4 tracking-wider uppercase">
                <IconComp className="w-4 h-4 text-[#C59B24]" />
                <span>Steadfast Specialized Freight</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight uppercase">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-[#D7DCE0] mt-4 max-w-3xl leading-relaxed">
                {service.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => openQuoteModal(service.title)}
                  className="px-6 py-3.5 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C59B24]/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Request Instant Rate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${companyDetails.phone.replace(/[\s+,]/g, "")}`}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-[#D7DCE0]/30 flex items-center gap-2 transition-all backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4 text-[#C59B24]" />
                  <span>Call Operations Desk</span>
                </a>
              </div>
            </div>

            {/* Quick Feature Badges */}
            <div className="lg:col-span-4 bg-white/5 border border-[#D7DCE0]/15 backdrop-blur-md p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 rounded-lg bg-[#C59B24]/20 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#D7DCE0]">Reliability Guarantee</div>
                  <div className="text-sm font-bold">100% Safe Handling</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 rounded-lg bg-[#C59B24]/20 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#D7DCE0]">Response Window</div>
                  <div className="text-sm font-bold">24/7 Live Monitoring</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 rounded-lg bg-[#C59B24]/20 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#D7DCE0]">Network Reach</div>
                  <div className="text-sm font-bold">120+ Global Ports</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body (Full-Width Clean Layout - Sidebar Form Removed) */}
      <section className="py-16 px-4 max-w-6xl mx-auto space-y-12">
        {/* Detailed Overview */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-[#D7DCE0]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D2A4C] mb-4">
            Comprehensive {service.title} Solutions
          </h2>
          <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
            {service.overview}
          </p>
        </div>

        {/* Key Capabilities / Features */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Key Service Highlights</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D2A4C] mt-1">
              What We Provide in {service.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#D7DCE0] hover:border-[#C59B24] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 group-hover:bg-[#C59B24] group-hover:text-white flex items-center justify-center font-bold text-sm mb-4 transition-colors">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-[#1D2A4C] mb-2 group-hover:text-[#C59B24] transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Steadfast for this Service */}
        <div className="bg-gradient-to-br from-[#141E36] to-[#1D2A4C] text-white p-8 sm:p-12 rounded-3xl shadow-md border border-[#D7DCE0]/15">
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-white flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#C59B24]" />
            <span>Why Choose Steadfast Shipping Lines for {service.title}?</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {service.whyChoose.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-[#D7DCE0]/15">
                <CheckCircle2 className="w-5 h-5 text-[#C59B24] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#D7DCE0] font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step by Step Process */}
        <div className="bg-[#F4F6F8] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#D7DCE0]">
          <div className="mb-8">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Operational Workflow</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D2A4C] mt-1">
              Step-by-Step Logistics Coordination
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyDetails.processSteps.slice(0, 3).map((st) => {
              const StepIcon =
                st.icon === "Headphones"
                  ? Headphones
                  : st.icon === "Route"
                  ? Route
                  : st.icon === "Boxes"
                  ? Boxes
                  : CheckCircle2;

              return (
                <div key={st.step} className="bg-white p-6 rounded-2xl border border-[#D7DCE0] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#1D2A4C] flex items-center justify-center text-[#C59B24] shadow-sm">
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-[#C59B24] tracking-wider uppercase">Stage {st.step}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#1D2A4C]">{st.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explore Other Services Horizontal List */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#D7DCE0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#D7DCE0]/60">
            <div>
              <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Explore More</span>
              <h4 className="text-xl font-bold text-[#1D2A4C]">Other Freight & Logistics Solutions</h4>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-[#C59B24] hover:underline inline-flex items-center gap-1"
            >
              <span>View All 10 Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {otherServices.map((os) => (
              <Link
                key={os.slug}
                href={`/${os.slug}`}
                className="p-3.5 rounded-xl bg-[#F4F6F8] hover:bg-[#FDF9EE] hover:border-[#C59B24] border border-[#D7DCE0] transition-colors text-center group"
              >
                <div className="text-xs font-bold text-[#1D2A4C] group-hover:text-[#C59B24] transition-colors line-clamp-1">
                  {os.shortTitle || os.title}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white border-2 border-[#C59B24]/40 text-center space-y-5 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Ready to Book Your {service.title}?
          </h3>
          <p className="text-sm text-[#D7DCE0] max-w-2xl mx-auto leading-relaxed">
            Get instant, competitive freight quotes tailored to your cargo origin, destination, and transit schedule.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => openQuoteModal(service.title)}
              className="px-8 py-3.5 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#C59B24]/20 transition-all hover:scale-105 cursor-pointer"
            >
              Get a Free Quote
            </button>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-[#D7DCE0]/30 transition-all"
            >
              Speak to a Representative
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}