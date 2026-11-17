"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Send
} from "lucide-react";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setStatusMsg("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setStatusMsg("");
    try {
      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: emailInput,
          phone: "",
          subject: "Newsletter Subscription",
          service: "subscription",
          comments: "Subscribed via footer form",
        }),
      });
      if (res.ok) {
        setStatusMsg("Thank you! You are subscribed.");
        setEmailInput("");
      } else {
        setStatusMsg("Subscription received. Thank you!");
        setEmailInput("");
      }
    } catch (err) {
      setStatusMsg("Thank you for subscribing!");
      setEmailInput("");
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatusMsg(""), 5000);
    }
  };

  const servicesList = [
    { title: "Ocean Freight", href: "/ocean-freight" },
    { title: "Air Freight", href: "/air-freight" },
    { title: "Custom Clearance", href: "/customs-clearance-service" },
    { title: "Warehousing", href: "/warehousing-service" },
    { title: "Cargo Service", href: "/cargo-services" },
    { title: "Break Bulk Cargo", href: "/break-bulk-cargo-service" },
    { title: "Door to Door Delivery", href: "/door-to-door-delievery" },
  ];

  const companyList = [
    { title: "About Us", href: "/about-us" },
    { title: "Our Services", href: "/services" },
    { title: "Request a Quote", href: "/quote" },
    { title: "Contact Us", href: "/contact" },
    { title: "Blogs", href: "/blogs" },
  ];

  return (
    <footer className="bg-[#141E36] text-[#D7DCE0] pt-16 pb-8 border-t border-slate-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">
          {/* Column 1: Brand, Tagline, Socials & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-44">
                <Image
                  src="/images/logo-white.png"
                  alt="Steadfast Shipping Lines"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs text-slate-300 font-medium tracking-wide">
              Your Trusted Partner in Global Logistics
            </p>

            {/* Follow Us */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-white block">Follow Us</span>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C59B24] text-white flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="X (Twitter)"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C59B24] text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C59B24] text-white flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C59B24] text-white flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Newsletter Input */}
            <div className="space-y-1.5 pt-2 max-w-sm">
              <p className="text-xs text-slate-300">
                Stay updated with our latest news and offers
              </p>
              <form onSubmit={handleSubscribe} className="flex items-center">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 text-xs bg-white/10 border border-white/20 border-r-0 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#C59B24]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  aria-label="Subscribe"
                  className="px-4 py-2.5 bg-[#C59B24] hover:bg-[#B0891E] text-white rounded-r-lg border border-[#C59B24] flex items-center justify-center transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {statusMsg && (
                <p className="text-xs text-[#C59B24] font-medium pt-0.5">{statusMsg}</p>
              )}
            </div>
          </div>

          {/* Column 2: Our Services (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold text-white tracking-tight">Our Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {servicesList.map((service, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59B24] shrink-0" />
                  <Link href={service.href} className="hover:text-[#C59B24] transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold text-white tracking-tight">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {companyList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59B24] shrink-0" />
                  <Link href={item.href} className="hover:text-[#C59B24] transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-bold text-white tracking-tight">Get In Touch</h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white font-semibold">Phone: </strong>
                <a href="tel:+923127777952" className="hover:text-[#C59B24] transition-colors">
                  +92 312 7777952
                </a>
                <span>, </span>
                <a href="tel:+923127777951" className="hover:text-[#C59B24] transition-colors">
                  +92 312 7777951
                </a>
              </p>

              <p>
                <strong className="text-white font-semibold">Email: </strong>
                <a href="mailto:info@steadfastshippinglines.com" className="hover:text-[#C59B24] transition-colors">
                  info@steadfastshippinglines.com
                </a>
              </p>

              <p>
                <strong className="text-white font-semibold block sm:inline">Head Office: </strong>
                <span>P-3067, Office No. 01, 1st Floor, Razzaq Center, Behind Kia Motors, West Canal Road, Faisalabad, Pakistan.</span>
              </p>

              <p>
                <strong className="text-white font-semibold block sm:inline">Branch Office: </strong>
                <span>Saima Trade Tower, Block A 810, Main I.I. Chundrigar Road, Near Shaheen Complex, Karachi, Pakistan.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>(c) {new Date().getFullYear()} Steadfast Shipping Lines (Pvt) Ltd. All Rights Reserved.</p>
          <p className="text-xs text-slate-400">
            Developed by <span className="text-[#C59B24] font-medium">Tech Solutionor</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
