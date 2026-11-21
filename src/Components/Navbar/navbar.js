"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Ship, Plane, Truck, Warehouse, Package, Boxes, Anchor, FileCheck, Building2,
  ChevronDown, Menu, X, Phone, Mail, Clock, ArrowRight, Globe,
} from "lucide-react";
import { servicesData, companyDetails } from "@/data/steadfastData";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";
import "./Navbar.css";

const EASE = [0.22, 1, 0.36, 1];

const iconMap = {
  Ship, Plane, Truck, Warehouse, Package, Boxes, Anchor, FileCheck, Building2,
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimer = useRef(null);
  const mobileMenuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open + Escape to close + focus return
  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus?.();
    };
  }, [mobileMenuOpen]);

  const openDropdown = () => {
    clearTimeout(dropdownTimer.current);
    setServicesDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setServicesDropdownOpen(false), 120);
  };

  const isActive = (path) => pathname === path;
  const isServicesActive =
    pathname.startsWith("/services") || servicesData.some((s) => pathname === `/${s.slug}`);

  const linkCls = (active) =>
    `relative py-2 text-[13px] font-extrabold uppercase tracking-[0.08em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] focus-visible:rounded-md ${
      active ? "text-[#B0891E]" : "text-[#1D2A4C] hover:text-[#B0891E]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ============ MAIN NAVIGATION ============ */}
      <nav
        aria-label="Main navigation"
        className={`w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-[#D7DCE0]/70 bg-white/85 shadow-lg shadow-[#1D2A4C]/[0.06] backdrop-blur-xl"
            : "border-[#D7DCE0]/50 bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] rounded-lg" aria-label="Steadfast Shipping Lines — Home">
            <div className="relative h-12 w-44 transition-transform duration-300 group-hover:scale-[1.02] sm:h-14 sm:w-52 md:w-56 lg:h-14 lg:w-60 xl:h-16 xl:w-72">
              <Image
                src="/images/logo-main.png"
                alt="Steadfast Shipping Lines"
                fill
                unoptimized
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-4 lg:flex xl:gap-8">
            <Link href="/" className={linkCls(isActive("/"))}>
              Home
              {isActive("/") && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[2.5px] rounded-full bg-[#C59B24]" />
              )}
            </Link>

            <Link href="/about-us" className={linkCls(isActive("/about-us"))}>
              About Us
              {isActive("/about-us") && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[2.5px] rounded-full bg-[#C59B24]" />
              )}
            </Link>

            {/* Services mega dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <Link
                href="/services"
                aria-haspopup="true"
                aria-expanded={servicesDropdownOpen}
                className={`${linkCls(isServicesActive)} inline-flex items-center gap-1.5`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180 text-[#C59B24]" : ""}`}
                />
                {isServicesActive && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[2.5px] rounded-full bg-[#C59B24]" />
                )}
              </Link>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white shadow-2xl shadow-[#1D2A4C]/15">
                      {/* dropdown header */}
                      <div className="relative overflow-hidden bg-gradient-to-r from-[#141E36] to-[#0D1424] px-5 py-3.5">
                        <div className="sf-dots absolute inset-0 opacity-30" aria-hidden="true" />
                        <div className="relative flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E2C876]">
                            Full-Spectrum Logistics
                          </span>
                          <Link
                            href="/services"
                            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-white/80 transition-colors hover:text-[#E2C876]"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            All Services <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                      {/* grid */}
                      <div className="grid grid-cols-2 gap-1 p-3">
                        {servicesData.map((svc, i) => {
                          const IconComp = iconMap[svc.icon] || Ship;
                          const active = pathname === `/${svc.slug}`;
                          return (
                            <motion.div
                              key={svc.slug}
                              initial={reduce ? {} : { opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03, duration: 0.25, ease: EASE }}
                            >
                              <Link
                                href={`/${svc.slug}`}
                                onClick={() => setServicesDropdownOpen(false)}
                                className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] ${
                                  active ? "bg-[#FDF9EE]" : "hover:bg-[#FDF9EE]"
                                }`}
                              >
                                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 transition-all duration-200 ${
                                  active
                                    ? "bg-[#C59B24] text-white ring-[#C59B24]"
                                    : "bg-[#F4F6F8] text-[#1D2A4C] ring-[#D7DCE0] group-hover:bg-[#C59B24] group-hover:text-white group-hover:ring-[#C59B24]"
                                }`}>
                                  <IconComp className="h-4 w-4" strokeWidth={2.1} />
                                </span>
                                <span className="min-w-0">
                                  <span className={`block truncate text-xs font-extrabold transition-colors ${active ? "text-[#B0891E]" : "text-[#1D2A4C] group-hover:text-[#B0891E]"}`}>
                                    {svc.title}
                                  </span>
                                  <span className="block truncate text-[10px] text-slate-400">
                                    {svc.shortTitle === svc.title ? svc.tagline : svc.shortTitle}
                                  </span>
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/contact" className={linkCls(isActive("/contact"))}>
              Contact Us
              {isActive("/contact") && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[2.5px] rounded-full bg-[#C59B24]" />
              )}
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden shrink-0 lg:block">
            <motion.button
              onClick={() => openQuoteModal()}
              whileTap={reduce ? {} : { scale: 0.97 }}
              className="group relative inline-flex cursor-pointer items-center gap-2 bg-[#C59B24] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#1D2A4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A4C] focus-visible:ring-offset-2 xl:px-6 xl:py-3 xl:text-[12px]"
            >
              {/* left gold edge stays on navy hover */}
              <span className="absolute inset-y-0 left-0 w-[3px] bg-[#E2C876]" aria-hidden="true" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-[#1D2A4C] transition-colors hover:bg-[#F4F6F8] hover:text-[#B0891E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* ============ MOBILE DRAWER ============ */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-menu"
              ref={mobileMenuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden border-t border-[#D7DCE0] bg-white lg:hidden"
            >
              <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-4 pb-8 pt-4 sm:px-6">
                {/* main links */}
                <div className="flex flex-col gap-1">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/about-us", label: "About Us" },
                  ].map((l, i) => (
                    <motion.div
                      key={l.href}
                      initial={reduce ? {} : { opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.05, duration: 0.3, ease: EASE }}
                    >
                      <Link
                        href={l.href}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-extrabold uppercase tracking-wider transition-colors ${
                          isActive(l.href)
                            ? "bg-[#FDF9EE] text-[#B0891E] ring-1 ring-[#E2C876]/60"
                            : "text-[#1D2A4C] hover:bg-[#F4F6F8]"
                        }`}
                      >
                        {l.label}
                        <ArrowRight className="h-4 w-4 opacity-40" />
                      </Link>
                    </motion.div>
                  ))}

                  {/* Services accordion */}
                  <motion.div
                    initial={reduce ? {} : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.16, duration: 0.3, ease: EASE }}
                  >
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      aria-expanded={servicesDropdownOpen}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-extrabold uppercase tracking-wider transition-colors ${
                        isServicesActive
                          ? "bg-[#FDF9EE] text-[#B0891E] ring-1 ring-[#E2C876]/60"
                          : "text-[#1D2A4C] hover:bg-[#F4F6F8]"
                      }`}
                    >
                      Services
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180 text-[#C59B24]" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="my-1.5 flex flex-col gap-1 rounded-2xl border border-[#D7DCE0]/60 bg-[#F4F6F8] p-2">
                            <Link
                              href="/services"
                              className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-xs font-black uppercase tracking-wider text-[#B0891E] shadow-sm transition-colors hover:bg-[#FDF9EE]"
                            >
                              <Globe className="h-4 w-4" /> All Services Overview
                            </Link>
                            {servicesData.map((svc, i) => {
                              const IconComp = iconMap[svc.icon] || Ship;
                              const active = pathname === `/${svc.slug}`;
                              return (
                                <motion.div
                                  key={svc.slug}
                                  initial={reduce ? {} : { opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.03, duration: 0.25, ease: EASE }}
                                >
                                  <Link
                                    href={`/${svc.slug}`}
                                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors ${
                                      active ? "bg-[#C59B24] text-white" : "bg-white text-[#1D2A4C] hover:text-[#B0891E]"
                                    }`}
                                  >
                                    <IconComp className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-[#C59B24]"}`} />
                                    <span className="truncate">{svc.title}</span>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={reduce ? {} : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.21, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      href="/contact"
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-extrabold uppercase tracking-wider transition-colors ${
                        isActive("/contact")
                          ? "bg-[#FDF9EE] text-[#B0891E] ring-1 ring-[#E2C876]/60"
                          : "text-[#1D2A4C] hover:bg-[#F4F6F8]"
                      }`}
                    >
                      Contact Us
                      <ArrowRight className="h-4 w-4 opacity-40" />
                    </Link>
                  </motion.div>
                </div>

                {/* CTA + contact info */}
                <motion.div
                  initial={reduce ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.35, ease: EASE }}
                  className="mt-5 flex flex-col gap-3 border-t border-[#D7DCE0] pt-5"
                >
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openQuoteModal();
                    }}
                    className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-[#C59B24] py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-[#C59B24]/25 transition-colors hover:bg-[#B0891E]"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
                    <span className="relative z-10">Request a Quote</span>
                  </button>

                  <div className="space-y-1.5 rounded-2xl bg-[#0D1424] p-4 text-xs">
                    <a href={`tel:${companyDetails.phone.replace(/[\s+,]/g, "")}`} className="flex items-center gap-2 font-semibold text-slate-200 transition-colors hover:text-[#E2C876]">
                      <Phone className="h-3.5 w-3.5 text-[#C59B24]" /> {companyDetails.phone}
                    </a>
                    <a href={`mailto:${companyDetails.email}`} className="flex items-center gap-2 font-semibold text-slate-200 transition-colors hover:text-[#E2C876]">
                      <Mail className="h-3.5 w-3.5 text-[#C59B24]" /> {companyDetails.email}
                    </a>
                    <span className="flex items-center gap-2 text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-[#C59B24]" /> {companyDetails.workingHours}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
