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
  ArrowRight
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
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#071325] via-[#0b1b33] to-[#132c52] text-white py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-bold mb-4">
            <Phone className="w-4 h-4 text-sky-400" />
            <span>Keep in Touch With Us for Help</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            CONTACT OUR GLOBAL TEAM
          </h1>
          <p className="text-base sm:text-xl text-sky-100/90 max-w-3xl mx-auto mt-4 leading-relaxed">
            Reach out to any of our regional headquarters or send a direct inquiry to our freight operations desk.
          </p>
        </div>
      </section>

      {/* Global Offices Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">Offices Detail</span>
          <h2 className="text-3xl font-black text-[#0b1b33] mt-1">
            Global Locations & Contact Desks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companyDetails.offices.map((off, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">{off.country}</span>
                <h3 className="text-xl font-bold text-[#0b1b33] mt-0.5">{off.city}</h3>
              </div>
              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{off.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`tel:${off.phone.replace(/\s+/g, "")}`} className="text-[#0284c7] font-semibold hover:underline">
                    {off.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{off.email}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Support Grid */}
      <section className="pb-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">Send an Inquiry</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b33] mt-1">
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
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {status.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  <span>{status.msg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Subject / Cargo Service</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Ocean FCL Rate Inquiry"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Message / Requirements *</label>
                  <textarea
                    rows={4}
                    name="comments"
                    required
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Describe your freight origin, destination, cargo volume, or general inquiry..."
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            </div>

            {/* Quick Contact Info Column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0c1f3d] to-[#122e54] text-white p-8 rounded-2xl flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Fast Assistance</span>
                  <h4 className="text-2xl font-bold text-white mt-1">24/7 Operations Desk</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Our cargo coordinators monitor maritime schedules, customs filings, and flights around the clock.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-gray-400 block text-[11px]">Direct Support Hotline</span>
                      <a href={`tel:${companyDetails.phone.replace(/\s+/g, "")}`} className="font-bold text-white hover:underline text-sm">
                        {companyDetails.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-gray-400 block text-[11px]">Electronic Mail</span>
                      <a href={`mailto:${companyDetails.email}`} className="font-bold text-white hover:underline text-sm">
                        {companyDetails.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <Clock className="w-5 h-5 text-sky-400 shrink-0" />
                    <div>
                      <span className="text-gray-400 block text-[11px]">Business & Transit Hours</span>
                      <span className="font-bold text-white text-sm">{companyDetails.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <Link
                  href="/quote"
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0b1b33] font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
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

