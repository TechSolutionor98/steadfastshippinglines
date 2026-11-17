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
  title: "Services | Steadfast Shipping Lines",
  description: "Explore our full spectrum of freight & logistics services: Ocean Freight, Air Freight, Road Freight, Warehousing, Cargo, Cross-Stuffing, Customs Clearance, and Door-to-Door Delivery.",
  alternates: {
    canonical: "https://www.steadfastshippinglines.com/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white py-16 sm:py-24 px-4 overflow-hidden border-b border-[#D7DCE0]/15">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C59B24]/15 border border-[#C59B24]/40 text-[#C59B24] text-xs font-bold mb-4 tracking-wider uppercase">
            <Globe className="w-4 h-4 text-[#C59B24]" />
            <span>We Provide Best Logistics Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            OUR COMPREHENSIVE SERVICES
          </h1>
          <p className="text-base sm:text-lg text-[#D7DCE0] max-w-3xl mx-auto mt-4 leading-relaxed">
            Tailored logistics and worldwide freight solutions designed to streamline your international supply chain with speed, reliability, and precision.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#C59B24]/20 transition-all flex items-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-[#D7DCE0]/30 transition-all"
            >
              Contact Offices
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">What We Provide</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1D2A4C] mt-2">
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
                className="bg-white rounded-2xl p-7 border border-[#D7DCE0] shadow-sm hover:shadow-xl hover:border-[#C59B24] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 group-hover:bg-[#C59B24] group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-black text-[#D7DCE0] group-hover:text-[#C59B24] transition-colors">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1D2A4C] mb-2 group-hover:text-[#C59B24] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#C59B24] mb-3">
                    {svc.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {svc.shortDescription}
                  </p>

                  <div className="mt-5 space-y-2 pt-4 border-t border-[#D7DCE0]/60">
                    {svc.features.slice(0, 2).map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B24] shrink-0" />
                        <span className="line-clamp-1">{f.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D7DCE0]/60">
                  <Link
                    href={`/${svc.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D2A4C] hover:text-[#C59B24] group-hover:translate-x-1 transition-all"
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
      <section className="bg-gradient-to-r from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white py-16 px-4 border-y border-[#D7DCE0]/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {companyDetails.stats.map((st, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-[#D7DCE0]/15 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-black text-[#C59B24] mb-1">{st.value}</div>
              <div className="text-xs uppercase tracking-wider text-[#D7DCE0] font-bold">{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <div className="bg-white p-8 sm:p-14 rounded-3xl border border-[#D7DCE0] shadow-md">
          <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Fast Freight Estimations</span>
          <h2 className="text-3xl font-extrabold text-[#1D2A4C] mt-2 mb-4">
            Ready to Ship Your Cargo Safely Across the Globe?
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto mb-8">
            Get in touch with our team today to discuss your shipment specs and receive competitive, transparent pricing tailored to your routes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-3.5 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#C59B24]/20 transition-colors"
            >
              Get an Instant Quote
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-[#F4F6F8] hover:bg-[#D7DCE0]/60 text-[#1D2A4C] font-bold text-xs uppercase tracking-wider transition-colors border border-[#D7DCE0]"
            >
              Speak to a Representative
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}