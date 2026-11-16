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
  CheckCircle2,
  Send,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
  Calculator,
  Globe
} from "lucide-react";
import { companyDetails, servicesData } from "@/data/steadfastData";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    freightType: "Ocean Freight",
    origin: "",
    destination: "",
    cargoWeight: "",
    cargoVolume: "",
    cargoType: "",
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
      const formattedComments = `
[QUOTE ESTIMATE REQUEST]
Freight Service: ${formData.freightType}
Origin: ${formData.origin}
Destination: ${formData.destination}
Cargo Weight: ${formData.cargoWeight} kg
Estimated Volume: ${formData.cargoVolume} CBM
Cargo Nature / Classification: ${formData.cargoType}
Company: ${formData.company || "N/A"}
Additional Notes: ${formData.comments || "None"}
      `.trim();

      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Rate Quote: ${formData.freightType} (${formData.origin} -> ${formData.destination})`,
          service: formData.freightType,
          comments: formattedComments,
        }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus({
        type: "success",
        msg: "Quote request submitted successfully! Our freight desk is calculating the most cost-effective routing and will send a detailed estimation to your email.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        freightType: "Ocean Freight",
        origin: "",
        destination: "",
        cargoWeight: "",
        cargoVolume: "",
        cargoType: "",
        comments: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Failed to submit request. Please call our 24/7 quote desk at " + companyDetails.phone,
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
            <Calculator className="w-4 h-4 text-sky-400" />
            <span>Fast & Free Freight Estimation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            REQUEST A FREIGHT QUOTE
          </h1>
          <p className="text-base sm:text-xl text-sky-100/90 max-w-3xl mx-auto mt-4 leading-relaxed">
            Get instant, competitive freight rates tailored to your cargo specs, transit timeline, and international trade lane.
          </p>
        </div>
      </section>

      {/* Main Quote Container */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Column */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-md">
            <div>
              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">Online Rate Calculation</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b33] mt-1">
                Cargo Specifications & Routing
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Provide as much detail as possible to receive the most accurate shipping quotation.
              </p>
            </div>

            {status.msg && (
              <div
                className={`my-6 p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {status.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                <span>{status.msg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Freight Service Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select Required Freight Service *
                </label>
                <select
                  name="freightType"
                  value={formData.freightType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7] font-medium text-slate-800"
                >
                  <option value="Ocean Freight">Ocean Freight (FCL / LCL Container)</option>
                  <option value="Air Freight">Air Freight (Express & Consolidated)</option>
                  <option value="Road Freight">Road Freight (FTL & LTL Trucking)</option>
                  <option value="Warehousing">Warehousing & Storage Solution</option>
                  <option value="Cargo Services">Specialized Cargo Services</option>
                  <option value="Door to door delivery">Door to Door Delivery</option>
                  <option value="Cross Stuffing">Cross-Stuffing / Transshipment</option>
                  <option value="Break Bulk Cargo">Break Bulk & Heavy Lift Cargo</option>
                  <option value="Transportation">Multimodal Transportation</option>
                  <option value="Customs Clearance">Customs Clearance & Brokerage</option>
                </select>
              </div>

              {/* Origin and Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Origin Port / City / Country *
                  </label>
                  <input
                    type="text"
                    name="origin"
                    required
                    value={formData.origin}
                    onChange={handleChange}
                    placeholder="e.g. Shanghai Port, China or Dubai, UAE"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Destination Port / City / Country *
                  </label>
                  <input
                    type="text"
                    name="destination"
                    required
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. Karachi / Felixstowe / Rotterdam"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
              </div>

              {/* Weight, Volume, Nature */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Approx. Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="cargoWeight"
                    value={formData.cargoWeight}
                    onChange={handleChange}
                    placeholder="e.g. 1500"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Approx. Volume (CBM)
                  </label>
                  <input
                    type="text"
                    name="cargoVolume"
                    value={formData.cargoVolume}
                    onChange={handleChange}
                    placeholder="e.g. 12 CBM or Pallet Count"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Cargo Classification
                  </label>
                  <input
                    type="text"
                    name="cargoType"
                    value={formData.cargoType}
                    onChange={handleChange}
                    placeholder="e.g. General, Reefer, HazMat"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +92 321 8662222"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Company / Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Global Traders LLC"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Additional Instructions or Target Transit Time</label>
                <textarea
                  rows={3}
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Tell us if you need container loading, customs clearance at destination, or liftgate delivery..."
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0284c7]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Calculating Routing & Sending..." : "Submit Quote Request"}</span>
              </button>
            </form>
          </div>

          {/* Right Highlights & Global Offices */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-[#0c1f3d] to-[#122e54] text-white p-7 rounded-3xl shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">The Steadfast Advantage</span>
                <h3 className="text-xl font-bold text-white mt-1">Why Choose Steadfast Shipping?</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">24/7 Operations Support</h5>
                    <p className="text-xs text-slate-300 mt-0.5">Instant human response from dispatchers</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">On-Time Delivery Guarantee</h5>
                    <p className="text-xs text-slate-300 mt-0.5">Reliable maritime and air schedules</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <Globe className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Worldwide Port Service</h5>
                    <p className="text-xs text-slate-300 mt-0.5">Global agency network in 120+ ports</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Offices Mini-Cards */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0b1b33]">
                Direct Office Inquiries
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block">Head Office: Faisalabad</span>
                  <p className="text-slate-500 mt-0.5">Office No. 1, 1st Floor, Bilal Center</p>
                  <a href="tel:+923218662222" className="text-[#0284c7] font-semibold block mt-1">+92 321 8662 222</a>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block">United Kingdom Desk</span>
                  <p className="text-slate-500 mt-0.5">23A Wednesbury Road, Walsall</p>
                  <a href="tel:+447383783357" className="text-[#0284c7] font-semibold block mt-1">+44 7383 783357</a>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block">Dubai, UAE Desk</span>
                  <p className="text-slate-500 mt-0.5">Raja Building, Office 3, Bur Dubai</p>
                  <a href="tel:+971559682523" className="text-[#0284c7] font-semibold block mt-1">+971 55 9682523</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
