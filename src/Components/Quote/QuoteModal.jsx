"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calculator,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Ship,
  Plane,
  Truck,
  Warehouse,
} from "lucide-react";
import { companyDetails } from "@/data/steadfastData";

// Helper function to trigger quote modal from anywhere in the application
export function openQuoteModal(service = "Ocean Freight") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-quote-modal", { detail: { service } })
    );
  }
}

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const handleOpen = (e) => {
      if (e.detail?.service) {
        setFormData((prev) => ({ ...prev, freightType: e.detail.service }));
      }
      setStatus({ type: "", msg: "" });
      setIsOpen(true);
    };

    window.addEventListener("open-quote-modal", handleOpen);

    // Support query param ?quote=true for direct link redirection
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("quote") === "true") {
        setIsOpen(true);
      }
    }

    return () => {
      window.removeEventListener("open-quote-modal", handleOpen);
    };
  }, []);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
Cargo Weight: ${formData.cargoWeight ? formData.cargoWeight + " kg" : "N/A"}
Estimated Volume: ${formData.cargoVolume ? formData.cargoVolume + " CBM" : "N/A"}
Cargo Nature / Classification: ${formData.cargoType || "N/A"}
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
        msg: "Quote request submitted successfully! Our freight desk will calculate the best rates and email you shortly.",
      });

      // Clear fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        freightType: formData.freightType,
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
        msg:
          "Failed to submit request. Please call our 24/7 quote desk at " +
          companyDetails.phone,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#D7DCE0] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#141E36] via-[#1D2A4C] to-[#141E36] px-6 py-5 text-white flex items-center justify-between border-b border-[#C59B24]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C59B24]/20 border border-[#C59B24]/40 flex items-center justify-center text-[#C59B24]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C59B24] block">
                Instant Rate Calculation
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase">
                Request a Freight Quote
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-5 text-slate-800">
          {status.msg && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
                status.type === "success"
                  ? "bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {status.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-[#C59B24] shrink-0" />
              )}
              <span>{status.msg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Freight Service Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Freight Service Required *
              </label>
              <select
                name="freightType"
                value={formData.freightType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24] font-medium text-slate-800"
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

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Origin Port / City *
                </label>
                <input
                  type="text"
                  name="origin"
                  required
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="e.g. Shanghai Port or Dubai"
                  className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Destination Port / City *
                </label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Karachi or Felixstowe"
                  className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                />
              </div>
            </div>

            {/* Cargo Specs (Weight, Volume, Nature) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="cargoWeight"
                  value={formData.cargoWeight}
                  onChange={handleChange}
                  placeholder="e.g. 1500"
                  className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Volume (CBM)
                </label>
                <input
                  type="text"
                  name="cargoVolume"
                  value={formData.cargoVolume}
                  onChange={handleChange}
                  placeholder="e.g. 12 CBM"
                  className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Cargo Type
                </label>
                <input
                  type="text"
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleChange}
                  placeholder="e.g. General, Reefer"
                  className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-3 border-t border-[#D7DCE0]/70">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D2A4C] block mb-3">
                Your Contact Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@company.com"
                    className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +92 312 7777952"
                    className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Global Logistics LLC"
                    className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
                  />
                </div>
              </div>
            </div>

            {/* Additional Comments */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Additional Instructions / Requirements
              </label>
              <textarea
                rows={2}
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Mention customs clearance, target delivery date, or special cargo handling..."
                className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#D7DCE0] rounded-xl focus:outline-none focus:border-[#C59B24]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#C59B24]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "Calculating & Submitting..." : "Submit Quote Request"}</span>
            </button>
          </form>

          {/* Mini Guarantee Footer */}
          <div className="pt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C59B24]" />
            <span>Guaranteed competitive rates within 2 hours • 24/7 Dispatch Desk</span>
          </div>
        </div>
      </div>
    </div>
  );
}

