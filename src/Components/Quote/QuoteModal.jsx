"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  Calculator,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Phone,
  Mail,
  ShieldCheck,
  Ship,
  Plane,
  Truck,
  Warehouse,
} from "lucide-react";
import { companyDetails } from "@/data/steadfastData";

const EASE = [0.22, 1, 0.36, 1];
const fieldCls =
  "w-full rounded-xl border border-[#D7DCE0] bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B24]";
const labelCls = "mb-1.5 block text-[11px] font-black uppercase tracking-wider text-[#1D2A4C]";

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
  const reduce = useReducedMotion();
  const panelRef = useRef(null);

  // Focus the modal panel when opened; restore focus to opener on close
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement;
    panelRef.current?.focus();
    return () => opener?.focus?.();
  }, [isOpen]);

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
          formType: "quote",
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
    <AnimatePresence>
      <motion.div
        key="quote-backdrop"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => setIsOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <motion.div
          ref={panelRef}
          tabIndex={-1}
          className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#D7DCE0] bg-white shadow-2xl outline-none"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.2 } }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden border-b border-[#C59B24]/30 bg-gradient-to-r from-[#141E36] via-[#1D2A4C] to-[#141E36] px-6 py-5 text-white">
          <div className="sf-dots absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#C59B24]/20 blur-[60px]" aria-hidden="true" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <motion.span
                initial={reduce ? {} : { rotate: -12, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 16 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C59B24]/40 bg-[#C59B24]/20 text-[#E2C876]"
              >
                <Calculator className="h-5 w-5" />
              </motion.span>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-[#E2C876]">
                  Instant Rate Calculation
                </span>
                <h3 id="quote-modal-title" className="font-anton text-lg uppercase tracking-wide text-white sm:text-xl">
                  Request a Freight Quote
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 transition-all hover:rotate-90 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24]"
              aria-label="Close quote modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="space-y-5 overflow-y-auto p-5 text-slate-800 sm:p-7">
          <AnimatePresence>
            {status.msg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role={status.type === "error" ? "alert" : "status"}
                className={`flex items-start gap-2.5 rounded-xl border p-4 text-xs font-medium sm:text-sm ${
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                )}
                <span>{status.msg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Freight Service Selection */}
            <div>
              <label htmlFor="qm-freight" className={labelCls}>Freight Service Required *</label>
              <div className="relative">
                <select
                  id="qm-freight"
                  name="freightType"
                  value={formData.freightType}
                  onChange={handleChange}
                  className={`${fieldCls} cursor-pointer appearance-none font-semibold`}
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
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label htmlFor="qm-origin" className={labelCls}>Origin Port / City *</label>
                <input id="qm-origin" type="text" name="origin" required value={formData.origin}
                  onChange={handleChange} placeholder="e.g. Shanghai Port or Dubai" className={fieldCls} />
              </div>
              <div>
                <label htmlFor="qm-destination" className={labelCls}>Destination Port / City *</label>
                <input id="qm-destination" type="text" name="destination" required value={formData.destination}
                  onChange={handleChange} placeholder="e.g. Karachi or Felixstowe" className={fieldCls} />
              </div>
            </div>

            {/* Cargo Specs (Weight, Volume, Nature) */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              <div>
                <label htmlFor="qm-weight" className={labelCls}>Weight (kg)</label>
                <input id="qm-weight" type="number" min="0" name="cargoWeight" value={formData.cargoWeight}
                  onChange={handleChange} placeholder="e.g. 1500" className={fieldCls} />
              </div>
              <div>
                <label htmlFor="qm-volume" className={labelCls}>Volume (CBM)</label>
                <input id="qm-volume" type="text" name="cargoVolume" value={formData.cargoVolume}
                  onChange={handleChange} placeholder="e.g. 12" className={fieldCls} />
              </div>
              <div>
                <label htmlFor="qm-cargotype" className={labelCls}>Cargo Type</label>
                <input id="qm-cargotype" type="text" name="cargoType" value={formData.cargoType}
                  onChange={handleChange} placeholder="e.g. General, Reefer" className={fieldCls} />
              </div>
            </div>

            {/* Contact Details */}
            <div className="border-t border-[#D7DCE0]/70 pt-4">
              <span className="mb-3.5 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#1D2A4C]">
                <span className="h-[2px] w-5 bg-[#C59B24]" aria-hidden="true" />
                Your Contact Information
              </span>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="qm-name" className={labelCls}>Full Name *</label>
                  <input id="qm-name" type="text" name="name" required autoComplete="name" value={formData.name}
                    onChange={handleChange} placeholder="e.g. Sarah Jenkins" className={fieldCls} />
                </div>
                <div>
                  <label htmlFor="qm-email" className={labelCls}>Email Address *</label>
                  <input id="qm-email" type="email" name="email" required autoComplete="email" value={formData.email}
                    onChange={handleChange} placeholder="e.g. sarah@company.com" className={fieldCls} />
                </div>
                <div>
                  <label htmlFor="qm-phone" className={labelCls}>Phone / WhatsApp *</label>
                  <input id="qm-phone" type="tel" name="phone" required autoComplete="tel" value={formData.phone}
                    onChange={handleChange} placeholder="e.g. +92 312 7777952" className={fieldCls} />
                </div>
                <div>
                  <label htmlFor="qm-company" className={labelCls}>Company Name</label>
                  <input id="qm-company" type="text" name="company" autoComplete="organization" value={formData.company}
                    onChange={handleChange} placeholder="e.g. Global Logistics LLC" className={fieldCls} />
                </div>
              </div>
            </div>

            {/* Additional Comments */}
            <div>
              <label htmlFor="qm-comments" className={labelCls}>Additional Instructions / Requirements</label>
              <textarea id="qm-comments" rows={2} name="comments" value={formData.comments}
                onChange={handleChange}
                placeholder="Mention customs clearance, target delivery date, or special cargo handling..."
                className={`${fieldCls} resize-none`} />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={reduce ? {} : { scale: 0.98 }}
              className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-[#C59B24] py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-[#C59B24]/30 transition-all hover:bg-[#B0891E] hover:shadow-xl disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A4C] focus-visible:ring-offset-2"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                {loading ? (
                  <>
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                      animate={reduce ? {} : { rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Calculating & Submitting…
                  </>
                ) : (
                  <><Send className="h-4 w-4" /> Submit Quote Request</>
                )}
              </span>
            </motion.button>
          </form>

          {/* Mini Guarantee Footer */}
          <div className="flex items-center justify-center gap-2 pt-2 text-center text-[11px] text-slate-500">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#C59B24]" />
            <span>Guaranteed competitive rates within 2 hours • 24/7 Dispatch Desk</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
}

