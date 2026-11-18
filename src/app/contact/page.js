"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { companyDetails } from "@/data/steadfastData";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";

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
        body: JSON.stringify({ ...formData, formType: "contact" }),
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

      {/* Contact Form & Support Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
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
                      <span className="text-[#D7DCE0]/80 block text-[11px] mb-0.5">Direct Support Hotlines</span>
                      <div className="flex items-center flex-wrap gap-1.5 font-bold text-white text-sm">
                        <a href="tel:+923127777952" className="hover:text-[#C59B24]">
                          +92 312 7777952
                        </a>
                        <span className="text-white/60">/</span>
                        <a href="tel:+923127777951" className="hover:text-[#C59B24]">
                          +92 312 7777951
                        </a>
                      </div>
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
                <button
                  onClick={() => openQuoteModal()}
                  className="w-full py-3 bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#C59B24]/20 cursor-pointer"
                >
                  <span>Need an Instant Rate Calculation?</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}