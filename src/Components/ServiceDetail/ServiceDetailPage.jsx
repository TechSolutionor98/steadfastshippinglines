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
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Globe,
  Phone,
  Mail,
  HelpCircle,
  ChevronRight
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

export default function ServiceDetailPage({ service }) {
  const IconComp = iconMap[service.icon] || Ship;
  const otherServices = servicesData.filter((s) => s.id !== service.id).slice(0, 5);

  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName,
          email: inquiryEmail,
          phone: inquiryPhone,
          subject: `Inquiry for ${service.title}`,
          service: service.title,
          comments: inquiryMsg || `Customer requested quote for ${service.title}`,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

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
                <Link
                  href="/quote"
                  className="px-6 py-3.5 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C59B24]/20 flex items-center gap-2 transition-all"
                >
                  <span>Request Instant Rate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${companyDetails.phone.replace(/[\s+,]/g, "")}`}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-[#D7DCE0]/30 flex items-center gap-2 transition-all backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4 text-[#C59B24]" />
                  <span>Call Operations</span>
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

      {/* Main Content Body */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Detailed Overview */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-[#D7DCE0]">
              <h2 className="text-2xl font-bold text-[#1D2A4C] mb-4">
                Comprehensive {service.title} Solutions
              </h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                {service.overview}
              </p>
            </div>

            {/* Key Capabilities / Features */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Key Service Highlights</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D2A4C] mt-1">
                  What We Provide in {service.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {service.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-[#D7DCE0] hover:border-[#C59B24] hover:shadow-md transition-all group"
                  >
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
                ))}
              </div>
            </div>

            {/* Why Choose Steadfast for this Service */}
            <div className="bg-gradient-to-br from-[#141E36] to-[#1D2A4C] text-white p-8 sm:p-10 rounded-2xl shadow-md border border-[#D7DCE0]/15">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-[#C59B24]" />
                <span>Why Choose Steadfast Shipping Lines for {service.title}?</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.whyChoose.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-[#D7DCE0]/15">
                    <CheckCircle2 className="w-5 h-5 text-[#C59B24] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#D7DCE0] font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step by Step Process */}
            <div className="bg-[#F4F6F8] p-8 sm:p-10 rounded-2xl shadow-sm border border-[#D7DCE0]">
              <h3 className="text-2xl font-bold text-[#1D2A4C] mb-6">
                Our Operational Process
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {companyDetails.processSteps.slice(0, 3).map((st) => (
                  <div key={st.step} className="border-l-2 border-[#C59B24] pl-4">
                    <span className="text-xs font-black text-[#C59B24] tracking-wider uppercase">Stage {st.step}</span>
                    <h4 className="text-base font-bold text-[#1D2A4C] mt-1 mb-1">{st.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Quote Form Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#D7DCE0] sticky top-24">
              <h4 className="text-lg font-bold text-[#1D2A4C] mb-1">
                Request a Quick Rate
              </h4>
              <p className="text-xs text-slate-500 mb-5">
                Inquire about {service.title} rates and schedules
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-[#FDF9EE] border border-[#E2C876] text-[#C59B24] text-sm text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#C59B24] mx-auto mb-2" />
                  <p className="font-bold text-[#1D2A4C]">Inquiry Sent!</p>
                  <p className="text-xs text-slate-600 mt-1">Our freight coordinator will contact you promptly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="e.g. john@company.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="e.g. +92 312 7777952"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Shipment Notes / Route</label>
                    <textarea
                      rows={3}
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      placeholder="Cargo volume, origin, destination..."
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md shadow-[#C59B24]/20 transition-colors"
                  >
                    {submitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}

              {/* Sidebar other services list */}
              <div className="mt-8 pt-6 border-t border-[#D7DCE0]">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#1D2A4C] mb-3">
                  Other Logistics Services
                </h5>
                <ul className="space-y-1.5">
                  {otherServices.map((os) => (
                    <li key={os.slug}>
                      <Link
                        href={`/${os.slug}`}
                        className="text-xs font-semibold text-slate-700 hover:text-[#C59B24] flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[#F4F6F8] transition-colors"
                      >
                        <span>{os.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Need direct help */}
              <div className="mt-6 p-4 rounded-xl bg-[#FDF9EE] border border-[#E2C876]/60 text-xs">
                <p className="font-bold text-[#1D2A4C] mb-1">Need Urgent Freight Assistance?</p>
                <p className="text-slate-600 mb-2">Speak directly with our 24/7 operations team.</p>
                <div className="space-y-1">
                  <a
                    href="tel:+923127777952"
                    className="font-bold text-[#C59B24] hover:underline flex items-center gap-1.5 text-xs"
                  >
                    <Phone className="w-3.5 h-3.5" /> +92 312 7777952
                  </a>
                  <a
                    href="tel:+923127777951"
                    className="font-bold text-[#C59B24] hover:underline flex items-center gap-1.5 text-xs"
                  >
                    <Phone className="w-3.5 h-3.5" /> +92 312 7777951
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}