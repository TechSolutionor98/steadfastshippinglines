import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Globe,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Compass,
  Building,
  Plane,
  Ship,
  Truck
} from "lucide-react";
import { companyDetails, servicesData } from "@/data/steadfastData";

export const metadata = {
  title: "About Us | Steadfast Shipping",
  description: "Learn about Steadfast Shipping (PVT) LTD - your trusted partner in global freight forwarding, logistics, warehousing, and worldwide multimodal transportation.",
  alternates: {
    canonical: "https://steadfastshipping.com/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#071325] via-[#0b1b33] to-[#132c52] text-white py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>We are Global Transport & Logistics Service Provider</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            ABOUT STEADFAST SHIPPING
          </h1>
          <p className="text-base sm:text-xl text-sky-100/90 max-w-3xl mx-auto mt-4 leading-relaxed">
            Delivering excellence across borders with innovative multimodal logistics, dedicated customer service, and reliable global operations.
          </p>
        </div>
      </section>

      {/* Corporate Overview */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">Company Background</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b33] mt-2 leading-tight">
                We Are Steadfast Shipping (PVT) LTD
              </h2>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Steadfast Shipping (PVT) LTD is your trusted partner in logistics, providing innovative and reliable transportation solutions worldwide. Our expert team and advanced technology ensure seamless, efficient, and secure delivery of your goods.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We are dedicated to exceeding expectations with personalized service, uncompromising integrity, and a steadfast commitment to excellence. Whether managing heavy industrial projects or delicate express shipments, we connect businesses to international markets with precision.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0284c7] flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0b1b33]">120+ Ports</h4>
                  <p className="text-xs text-slate-500">Global trade coverage</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0b1b33]">24/7 Support</h4>
                  <p className="text-xs text-slate-500">Live operational dispatch</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Card / Visual Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b33]">Advanced Technology</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cutting-edge telematics, route optimization algorithms, and digital milestone alerts keeping you informed at every transit stage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b33]">Sustainable Practices</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Committed to environmentally conscious freight management, fuel-efficient routing, and responsible cargo packing protocols.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b33]">Industry-Specific Solutions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailored handling standards for pharmaceuticals, heavy machinery, automotive components, textiles, and perishable goods.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b1b33] text-white shadow-md space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Fast Turnaround</span>
                <h3 className="text-lg font-bold text-white mt-1">100% Safe & Secure</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Rigorous chain of custody, insured transit, and experienced cargo surveyors at all major commercial terminals.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-cyan-400 text-xs font-bold flex items-center gap-1">
                <span>Reach Destination Safely</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-white py-20 px-4 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-100 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-[#0b1b33]">OUR MISSION</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To provide top-tier, reliable, and cost-effective logistics and transportation services that empower our clients to expand their reach across international borders. We strive to innovate continuously, offering seamless supply chain integration, transparent tracking, and personalized customer care.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0b1b33] text-white border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500 text-[#0b1b33] flex items-center justify-center shadow-md">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">OUR VISION</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                To be universally recognized as the world's most dependable logistics ally, celebrated for operational excellence, customer satisfaction, and technological prowess. We envision a connected world where cross-border cargo transit is frictionless, secure, and accessible to businesses of all sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl font-black text-[#0b1b33] mt-2">
            Why Choose Steadfast Shipping (PVT) LTD
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Built on a legacy of punctuality, safety, and deep maritime and aviation relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyDetails.whyChooseUs.map((w, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#0b1b33] mb-2">{w.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{w.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Offices Strip */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Worldwide Presence</span>
            <h2 className="text-3xl font-black text-white mt-2">
              Our Strategic Global Offices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyDetails.offices.map((off, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">{off.country}</span>
                <h4 className="text-lg font-bold text-white">{off.city}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{off.address}</p>
                <div className="pt-2 border-t border-white/10">
                  <a href={`tel:${off.phone.replace(/\s+/g, "")}`} className="text-xs text-emerald-400 font-bold hover:underline block">
                    {off.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
