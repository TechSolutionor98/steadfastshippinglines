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
  ArrowRight,
  ShieldCheck,
  Clock,
  Globe,
  ChevronRight,
  CheckCircle2,
  Phone
} from "lucide-react";
import { servicesData, companyDetails } from "@/data/steadfastData";

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

export const metadata = {
  title: "Services | Steadfast Shipping",
  description: "Explore our full spectrum of freight & logistics services: Ocean Freight, Air Freight, Road Freight, Warehousing, Cargo, Cross-Stuffing, Customs Clearance, and Door-to-Door Delivery.",
  alternates: {
    canonical: "https://steadfastshipping.com/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#071325] via-[#0b1b33] to-[#132c52] text-white py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-bold mb-4">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>We Provide Best Logistics Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            OUR COMPREHENSIVE SERVICES
          </h1>
          <p className="text-base sm:text-xl text-sky-100/90 max-w-3xl mx-auto mt-4 leading-relaxed">
            Tailored logistics and worldwide freight solutions designed to streamline your international supply chain with speed, reliability, and precision.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Contact Offices
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">What We Provide</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b33] mt-2">
            End-to-End Freight Forwarding & Supply Chain
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            From single pallet air deliveries to chartered bulk maritime vessels, we coordinate every leg of your freight journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((svc, idx) => {
            const IconComp = iconMap[svc.icon] || Ship;
            return (
              <div
                key={svc.slug}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-black text-slate-300 group-hover:text-sky-300 transition-colors">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0b1b33] mb-2 group-hover:text-[#0284c7] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs font-semibold text-sky-600 mb-3">
                    {svc.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {svc.shortDescription}
                  </p>

                  <div className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                    {svc.features.slice(0, 2).map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{f.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/${svc.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0284c7] hover:text-[#0369a1] group-hover:translate-x-1 transition-all"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="bg-gradient-to-r from-[#0b1b33] to-[#132c52] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {companyDetails.stats.map((st, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 mb-1">{st.value}</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-bold">{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <div className="bg-white p-8 sm:p-14 rounded-3xl border border-slate-200/80 shadow-md">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">Fast Freight Estimations</span>
          <h2 className="text-3xl font-extrabold text-[#0b1b33] mt-2 mb-4">
            Ready to Ship Your Cargo Safely Across the Globe?
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto mb-8">
            Get in touch with our team today to discuss your shipment specs and receive competitive, transparent pricing tailored to your routes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-3.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm shadow-md transition-colors"
            >
              Get an Instant Quote
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0b1b33] font-bold text-sm transition-colors"
            >
              Speak to a Representative
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
