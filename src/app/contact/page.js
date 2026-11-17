"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Globe,
  ShieldCheck,
  ArrowRight,
  Award
} from "lucide-react";
import { companyDetails } from "@/data/steadfastData";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "general",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit message");
      }

      setStatus({
        type: "success",
        msg: "Thank you for reaching out! Your message has been received by our operations team. We will contact you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        service: "general",
        comments: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Failed to send message. Please call our 24/7 desk directly at " + companyDetails.phone,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-800">
      {/* Hero Header (Navy #1D2A4C with Gold #C59B24 Accents) */}
      <section className="relative bg-gradient-to-br from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white py-16 sm:py-24 px-4 overflow-hidden border-b border-[#D7DCE0]/15">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C59B24]/15 border border-[#C59B24]/40 text-[#C59B24] text-xs font-bold mb-4 tracking-wider uppercase">
            <Phone className="w-3.5 h-3.5 text-[#C59B24]" />
            <span>Keep in Touch With Us for Help</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            CONTACT OUR GLOBAL TEAM
          </h1>
          <p className="text-base sm:text-lg text-[#D7DCE0] max-w-3xl mx-auto mt-4 leading-relaxed">
            We are always available to assist you with your logistics needs. Feel free to reach out to our regional desks or submit an online request.
          </p>
        </div>
      </section>

      {/* Official Offices Section (From Uploaded Card) */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">OFFICES DETAIL</span>
          <h2 className="text-3xl font-black text-[#1D2A4C] mt-1">
            Our Headquarters & Desks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Head Office (Faisalabad) */}
          <div className="bg-white rounded-2xl p-8 border-2 border-[#C59B24] shadow-md hover:shadow-xl transition-all space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#C59B24] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg">
              HEAD OFFICE
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/50 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C59B24]">Pakistan</span>
              <h3 className="text-xl font-bold text-[#1D2A4C] mt-0.5">Head Office (Faisalabad)</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-600 pt-3 border-t border-[#D7DCE0]/80">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C59B24] shrink-0 mt-0.5" />
                <span className="font-medium text-slate-700">P-3067, Office No. 01, 1st Floor, Razzaq Center, Behind Kia Motors, West Canal Road, Faisalabad, Pakistan.</span>
              </p>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C59B24] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href="tel:+923127777952" className="text-[#1D2A4C] font-bold hover:text-[#C59B24] block">
                    +92 312 7777952
                  </a>
                  <a href="tel:+923127777951" className="text-[#1D2A4C] font-bold hover:text-[#C59B24] block">
                    +92 312 7777951
                  </a>
                </div>
              </div>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C59B24] shrink-0" />
                <a href="mailto:info@steadfastshippinglines.com" className="text-[#1D2A4C] font-semibold hover:text-[#C59B24]">
                  info@steadfastshippinglines.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#C59B24] shrink-0" />
                <span className="text-slate-700 font-semibold">www.steadfastshippinglines.com</span>
              </p>
            </div>
          </div>

          {/* Karachi Office */}
          <div className="bg-white rounded-2xl p-8 border border-[#D7DCE0] shadow-md hover:shadow-xl hover:border-[#C59B24] transition-all space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#1D2A4C] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg">
              BRANCH DESK
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#1D2A4C]/10 text-[#1D2A4C] border border-[#D7DCE0] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D2A4C]">Pakistan</span>
              <h3 className="text-xl font-bold text-[#1D2A4C] mt-0.5">Karachi Office</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-600 pt-3 border-t border-[#D7DCE0]/80">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1D2A4C] shrink-0 mt-0.5" />
                <span className="font-medium text-slate-700">Saima Trade Tower, Block A 810 main I.I. Chundrigar road near Shaheen Complex, Karachi.</span>
              </p>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#1D2A4C] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href="tel:+923127777952" className="text-[#1D2A4C] font-bold hover:text-[#C59B24] block">
                    +92 312 7777952
                  </a>
                  <a href="tel:+923127777951" className="text-[#1D2A4C] font-bold hover:text-[#C59B24] block">
                    +92 312 7777951
                  </a>
                </div>
              </div>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#1D2A4C] shrink-0" />
                <a href="mailto:info@steadfastshippinglines.com" className="text-[#1D2A4C] font-semibold hover:text-[#C59B24]">
                  info@steadfastshippinglines.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#1D2A4C] shrink-0" />
                <span className="text-slate-700 font-semibold">www.steadfastshippinglines.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Company Profile Appreciation Banner (From Uploaded Card) */}
        <div className="max-w-4xl mx-auto mt-12 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white border-2 border-[#C59B24]/40 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C59B24]/20 border border-[#C59B24]/40 text-[#C59B24] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#C59B24] font-serif italic">
                Thank You! ......
              </h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#D7DCE0] leading-relaxed">
            Thank you for taking the time to explore our company profile and for considering <strong className="text-white">Steadfast Shipping Lines (Pvt) Ltd</strong> as your trusted logistics and supply chain partner.
          </p>
          <p className="text-xs sm:text-sm text-[#D7DCE0] leading-relaxed mt-3">
            We deeply appreciate your interest in our global freight forwarding, transportation, and cargo management solutions. It is our privilege to connect businesses with seamless trade networks, and we look forward to the opportunity of building a strong, reliable, and successful partnership with you in the future.
          </p>
        </div>
      </section>

      {/* Contact Form & Support Grid */}
      <section className="pb-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#D7DCE0] shadow-md p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Send an Inquiry</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D2A4C] mt-1">
                  How Can We Help You?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Fill in your details below and a freight coordinator will respond within 2 hours.
                </p>
              </div>

              {status.msg && (
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 ${
                    status.type === "success"
                      ? "bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {status.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#C59B24] shrink-0" />}
                  <span>{status.msg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl text-slate-800 focus:outline-none focus:border-[#C59B24]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl text-slate-800 focus:outline-none focus:border-[#C59B24]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +92 312 7777952"
                      className="w-full px-4 py-2.5 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl text-slate-800 focus:outline-none focus:border-[#C59B24]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Subject / Cargo Service</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Ocean FCL Rate Inquiry"
                      className="w-full px-4 py-2.5 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl text-slate-800 focus:outline-none focus:border-[#C59B24]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Message / Requirements *</label>
                  <textarea
                    rows={4}
                    name="comments"
                    required
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Describe your freight origin, destination, cargo volume, or general inquiry..."
                    className="w-full px-4 py-2.5 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl text-slate-800 focus:outline-none focus:border-[#C59B24]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-[#C59B24] hover:bg-[#B0891E] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-[#C59B24]/20 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            </div>

            {/* Quick Contact Info Column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#141E36] to-[#1D2A4C] text-white p-8 rounded-2xl flex flex-col justify-between border border-[#D7DCE0]/15 shadow-xl">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Fast Assistance</span>
                  <h4 className="text-2xl font-bold text-white mt-1">24/7 Operations Desk</h4>
                  <p className="text-xs text-[#D7DCE0] mt-2 leading-relaxed">
                    Our cargo coordinators monitor maritime schedules, customs filings, and flights around the clock.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-[#D7DCE0]/15">
                    <Phone className="w-5 h-5 text-[#C59B24] shrink-0" />
                    <div>
                      <span className="text-[#D7DCE0]/80 block text-[11px]">Direct Support Hotlines</span>
                      <a href="tel:+923127777952" className="font-bold text-white hover:text-[#C59B24] text-sm block">
                        +92 312 7777952
                      </a>
                      <a href="tel:+923127777951" className="font-bold text-white hover:text-[#C59B24] text-sm block">
                        +92 312 7777951
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-[#D7DCE0]/15">
                    <Mail className="w-5 h-5 text-[#C59B24] shrink-0" />
                    <div>
                      <span className="text-[#D7DCE0]/80 block text-[11px]">Electronic Mail</span>
                      <a href="mailto:info@steadfastshippinglines.com" className="font-bold text-white hover:text-[#C59B24] text-sm">
                        info@steadfastshippinglines.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-[#D7DCE0]/15">
                    <Clock className="w-5 h-5 text-[#C59B24] shrink-0" />
                    <div>
                      <span className="text-[#D7DCE0]/80 block text-[11px]">Business & Operations Desk</span>
                      <span className="font-bold text-white text-sm">24/7 Continuous Service</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#D7DCE0]/15 mt-6">
                <Link
                  href="/quote"
                  className="w-full py-3 bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#C59B24]/20"
                >
                  <span>Need an Instant Rate Calculation?</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}