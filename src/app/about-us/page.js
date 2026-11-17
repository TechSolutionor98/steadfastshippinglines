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
  title: "About Us | Steadfast Shipping Lines",
  description: "Learn about Steadfast Shipping Lines (Pvt) Ltd - your trusted partner in global freight forwarding, logistics, warehousing, and worldwide multimodal transportation.",
  alternates: {
    canonical: "https://www.steadfastshippinglines.com/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen text-slate-800">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white py-16 sm:py-24 px-4 overflow-hidden border-b border-[#D7DCE0]/15">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C59B24]/15 border border-[#C59B24]/40 text-[#C59B24] text-xs font-bold mb-4 tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-[#C59B24]" />
            <span>Global Transport & Logistics Service Provider</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            ABOUT STEADFAST SHIPPING LINES
          </h1>
          <p className="text-base sm:text-lg text-[#D7DCE0] max-w-3xl mx-auto mt-4 leading-relaxed">
            Delivering excellence across borders with innovative multimodal logistics, dedicated customer service, and reliable global operations.
          </p>
        </div>
      </section>

      {/* Corporate Overview */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Company Background</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1D2A4C] mt-2 leading-tight">
                We Are Steadfast Shipping Lines (Pvt) Ltd
              </h2>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Steadfast Shipping Lines (Pvt) Ltd is your trusted partner in logistics, providing innovative and reliable transportation solutions worldwide. Our expert team and advanced technology ensure seamless, efficient, and secure delivery of your goods.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We are dedicated to exceeding expectations with personalized service, uncompromising integrity, and a steadfast commitment to excellence. Whether managing heavy industrial projects or delicate express shipments, we connect businesses to international markets with precision.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D7DCE0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1D2A4C]">120+ Ports</h4>
                  <p className="text-xs text-slate-500">Global trade coverage</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1D2A4C]">24/7 Support</h4>
                  <p className="text-xs text-slate-500">Live operational dispatch</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#C59B24]/20 transition-all"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Card / Visual Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-[#D7DCE0] shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1D2A4C]">Advanced Technology</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cutting-edge telematics, route optimization algorithms, and digital milestone alerts keeping you informed at every transit stage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D7DCE0] shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#1D2A4C]/10 text-[#1D2A4C] border border-[#D7DCE0] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1D2A4C]">Sustainable Practices</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Committed to environmentally conscious freight management, fuel-efficient routing, and responsible cargo packing protocols.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D7DCE0] shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1D2A4C]">Industry-Specific Solutions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailored handling standards for pharmaceuticals, heavy machinery, automotive components, textiles, and commercial goods.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141E36] to-[#1D2A4C] text-white shadow-md space-y-3 flex flex-col justify-between border border-[#D7DCE0]/15">
              <div>
                <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Fast Turnaround</span>
                <h3 className="text-lg font-bold text-white mt-1">100% Safe & Secure</h3>
                <p className="text-xs text-[#D7DCE0] mt-2 leading-relaxed">
                  Rigorous chain of custody, insured transit, and experienced cargo surveyors at all major commercial terminals.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D7DCE0]/15 text-[#C59B24] text-xs font-bold flex items-center gap-1">
                <span>Reach Destination Safely</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-[#F4F6F8] py-20 px-4 border-y border-[#D7DCE0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#D7DCE0] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 flex items-center justify-center shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-[#1D2A4C]">OUR MISSION</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                At Steadfast Shipping Lines (Pvt) Ltd, our mission is to provide innovative, reliable, and efficient logistics and transportation solutions that exceed our clients&apos; expectations. We strive to simplify global trade, ensuring seamless movement of goods with unparalleled service and support.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#141E36] to-[#1D2A4C] text-white border border-[#D7DCE0]/15 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24] text-white flex items-center justify-center shadow-sm">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">OUR VISION</h3>
              <p className="text-[#D7DCE0] text-sm sm:text-base leading-relaxed">
                Our vision is to be a leading global logistics provider, recognized for our commitment to excellence, customer satisfaction, and sustainable practices. We aim to set new standards in the industry, driving growth and success for our clients and partners worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl font-black text-[#1D2A4C] mt-2">
            Why Choose Steadfast Shipping Lines (Pvt) Ltd
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Built on a legacy of punctuality, safety, and deep maritime and aviation relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyDetails.whyChooseUs.map((w, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#D7DCE0] shadow-sm hover:shadow-md hover:border-[#C59B24] transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C59B24] group-hover:text-white transition-colors">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1D2A4C] mb-2">{w.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{w.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Offices Strip */}
      <section className="bg-[#141E36] text-white py-16 px-4 border-t border-[#D7DCE0]/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Offices Detail</span>
            <h2 className="text-3xl font-black text-white mt-2">
              Our Strategic Corporate Desks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {companyDetails.offices.map((off, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-[#D7DCE0]/15 backdrop-blur-sm space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C59B24]">{off.country}</span>
                <h4 className="text-lg font-bold text-white">{off.city}</h4>
                <p className="text-xs text-[#D7DCE0] leading-relaxed">{off.address}</p>
                <div className="pt-2 border-t border-[#D7DCE0]/15">
                  <a href={`tel:${off.phone.split(',')[0].replace(/\s+/g, "")}`} className="text-xs text-[#C59B24] font-bold hover:underline block">
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