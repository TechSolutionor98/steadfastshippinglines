"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  Globe
} from "lucide-react";
import { servicesData, companyDetails } from "@/data/steadfastData";

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

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;
  const isServicesActive = pathname.startsWith("/services") || servicesData.some(s => pathname === `/${s.slug}`);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#0b1b33] text-gray-200 text-xs py-2 px-4 sm:px-8 border-b border-[#1b2b46]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <a
              href={`tel:${companyDetails.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{companyDetails.phone}</span>
            </a>
            <span className="hidden sm:inline text-gray-600">|</span>
            <a
              href={`mailto:${companyDetails.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{companyDetails.email}</span>
            </a>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{companyDetails.workingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 hidden sm:inline">Offices: Pakistan | UK | Dubai</span>
            <Link
              href="/quote"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <span>Instant Rate Estimation</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${scrolled ? "py-3" : "py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#0b1b33] to-[#1e3a8a] flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <Ship className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0b1b33] leading-none">
                STEADFAST
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#0284c7] uppercase">
                SHIPPING & LOGISTICS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-semibold tracking-wide transition-colors ${
                isActive("/") ? "text-[#0284c7]" : "text-gray-700 hover:text-[#0b1b33]"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className={`text-sm font-semibold tracking-wide transition-colors ${
                isActive("/about-us") ? "text-[#0284c7]" : "text-gray-700 hover:text-[#0b1b33]"
              }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors py-2 ${
                  isServicesActive ? "text-[#0284c7]" : "text-gray-700 hover:text-[#0b1b33]"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-[#0284c7]" : ""
                  }`}
                />
              </Link>

              {/* Mega Dropdown Panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-2 gap-3 transition-all animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="col-span-2 pb-2 mb-1 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">Global Freight & Logistics</h4>
                      <p className="text-xs text-gray-500">Comprehensive end-to-end cargo and transportation services</p>
                    </div>
                    <Link
                      href="/services"
                      className="text-xs font-semibold text-[#0b1b33] hover:text-[#0284c7] flex items-center gap-1"
                    >
                      View All Services <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {servicesData.map((svc) => {
                    const IconComp = iconMap[svc.icon] || Ship;
                    return (
                      <Link
                        key={svc.slug}
                        href={`/${svc.slug}`}
                        className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0284c7] flex items-center justify-center shrink-0 group-hover/item:bg-[#0284c7] group-hover/item:text-white transition-colors">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 group-hover/item:text-[#0284c7] transition-colors leading-snug">
                            {svc.title}
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {svc.shortDescription}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`text-sm font-semibold tracking-wide transition-colors ${
                isActive("/contact") ? "text-[#0284c7]" : "text-gray-700 hover:text-[#0b1b33]"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white text-sm font-bold shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:text-[#0b1b33] hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className={`px-4 py-3 rounded-xl text-sm font-bold ${
                  isActive("/") ? "bg-blue-50 text-[#0284c7]" : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className={`px-4 py-3 rounded-xl text-sm font-bold ${
                  isActive("/about-us") ? "bg-blue-50 text-[#0284c7]" : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                About Us
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                    isServicesActive ? "bg-blue-50 text-[#0284c7]" : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {servicesDropdownOpen && (
                  <div className="pl-4 pr-2 py-2 flex flex-col gap-1 bg-slate-50/70 rounded-xl my-1">
                    <Link
                      href="/services"
                      className="px-3 py-2 text-xs font-bold text-[#0284c7] hover:underline"
                    >
                      All Services Overview →
                    </Link>
                    {servicesData.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/${svc.slug}`}
                        className="px-3 py-2 text-xs font-medium text-gray-700 hover:text-[#0284c7] hover:bg-white rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>{svc.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className={`px-4 py-3 rounded-xl text-sm font-bold ${
                  isActive("/contact") ? "bg-blue-50 text-[#0284c7]" : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                Contact Us
              </Link>

              <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
                <Link
                  href="/quote"
                  className="w-full text-center py-3 rounded-xl bg-[#0284c7] text-white font-bold text-sm shadow-md"
                >
                  Request a Quote
                </Link>

                <div className="text-xs text-gray-500 px-2 space-y-1">
                  <p className="flex items-center gap-1.5 font-medium text-gray-700">
                    <Phone className="w-3.5 h-3.5 text-[#0284c7]" /> {companyDetails.phone}
                  </p>
                  <p className="flex items-center gap-1.5 font-medium text-gray-700">
                    <Mail className="w-3.5 h-3.5 text-[#0284c7]" /> {companyDetails.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
