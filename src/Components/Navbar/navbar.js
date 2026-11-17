"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-[#D7DCE0]/60 transition-all duration-300">
      {/* Top Utility Bar (Navy #1D2A4C with Gold #C59B24 Accents) */}
      <div className="bg-[#1D2A4C] text-[#D7DCE0] text-xs py-2 px-4 sm:px-8 border-b border-[#141E36]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 text-[#D7DCE0]">
            <a
              href={`tel:${companyDetails.phone.replace(/[\s+,]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-[#C59B24] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B24]" />
              <span>{companyDetails.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-500">|</span>
            <a
              href={`mailto:${companyDetails.email}`}
              className="flex items-center gap-1.5 hover:text-[#C59B24] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C59B24]" />
              <span>{companyDetails.email}</span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#C59B24]" />
              <span>{companyDetails.workingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#D7DCE0]/80 hidden sm:inline">Offices: Faisalabad | Karachi</span>
            <Link
              href="/quote"
              className="inline-flex items-center gap-1 text-[#C59B24] hover:text-white font-semibold transition-colors"
            >
              <span>Instant Rate Estimation</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${scrolled ? "py-2.5" : "py-3.5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo Only (Text removed, original logo displayed) */}
          <Link href="/" className="flex items-center group py-1">
            <div className="relative h-14 sm:h-16 md:h-20 w-28 sm:w-36 md:w-44 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Steadfast Shipping Lines (Pvt) Ltd"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/") ? "text-[#C59B24]" : "text-[#1D2A4C] hover:text-[#C59B24]"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/about-us") ? "text-[#C59B24]" : "text-[#1D2A4C] hover:text-[#C59B24]"
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
                className={`inline-flex items-center gap-1.5 text-sm font-bold tracking-wide transition-colors py-2 ${
                  isServicesActive ? "text-[#C59B24]" : "text-[#1D2A4C] hover:text-[#C59B24]"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-[#C59B24]" : ""
                  }`}
                />
              </Link>

              {/* Mega Dropdown Panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-[#D7DCE0] p-6 grid grid-cols-2 gap-3 transition-all animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="col-span-2 pb-2 mb-1 border-b border-[#D7DCE0]/80 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B24]">Global Freight & Logistics</h4>
                      <p className="text-xs text-slate-500">Comprehensive end-to-end cargo and transportation services</p>
                    </div>
                    <Link
                      href="/services"
                      className="text-xs font-bold text-[#1D2A4C] hover:text-[#C59B24] flex items-center gap-1"
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
                        className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F4F6F8] transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 flex items-center justify-center shrink-0 group-hover/item:bg-[#C59B24] group-hover/item:text-white transition-colors">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#1D2A4C] group-hover/item:text-[#C59B24] transition-colors leading-snug">
                            {svc.title}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
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
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/contact") ? "text-[#C59B24]" : "text-[#1D2A4C] hover:text-[#C59B24]"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Action CTA (Gold #C59B24) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white text-sm font-bold shadow-md shadow-[#C59B24]/20 hover:shadow-lg hover:shadow-[#C59B24]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-[#1D2A4C] hover:text-[#C59B24] hover:bg-[#F4F6F8] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#D7DCE0] px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className={`px-4 py-3 rounded-xl text-sm font-bold ${
                  isActive("/") ? "bg-[#FDF9EE] text-[#C59B24]" : "text-[#1D2A4C] hover:bg-[#F4F6F8]"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className={`px-4 py-3 rounded-xl text-sm font-bold ${
                  isActive("/about-us") ? "bg-[#FDF9EE] text-[#C59B24]" : "text-[#1D2A4C] hover:bg-[#F4F6F8]"
                }`}
              >
                About Us
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                    isServicesActive ? "bg-[#FDF9EE] text-[#C59B24]" : "text-[#1D2A4C] hover:bg-[#F4F6F8]"
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180 text-[#C59B24]" : ""}`}
                  />
                </button>

                {servicesDropdownOpen && (
                  <div className="pl-4 pr-2 py-2 flex flex-col gap-1 bg-[#F4F6F8] rounded-xl my-1 border border-[#D7DCE0]/60">
                    <Link
                      href="/services"
                      className="px-3 py-2 text-xs font-bold text-[#C59B24] hover:underline"
                    >
                      All Services Overview →
                    </Link>
                    {servicesData.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/${svc.slug}`}
                        className="px-3 py-2 text-xs font-medium text-[#1D2A4C] hover:text-[#C59B24] hover:bg-white rounded-lg transition-colors flex items-center justify-between"
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
                  isActive("/contact") ? "bg-[#FDF9EE] text-[#C59B24]" : "text-[#1D2A4C] hover:bg-[#F4F6F8]"
                }`}
              >
                Contact Us
              </Link>

              <div className="pt-4 mt-2 border-t border-[#D7DCE0] flex flex-col gap-3">
                <Link
                  href="/quote"
                  className="w-full text-center py-3 rounded-xl bg-[#C59B24] text-white font-bold text-sm shadow-md shadow-[#C59B24]/20 hover:bg-[#B0891E] transition-colors"
                >
                  Request a Quote
                </Link>

                <div className="text-xs text-slate-600 px-2 space-y-1">
                  <p className="flex items-center gap-1.5 font-semibold text-[#1D2A4C]">
                    <Phone className="w-3.5 h-3.5 text-[#C59B24]" /> {companyDetails.phone}
                  </p>
                  <p className="flex items-center gap-1.5 font-semibold text-[#1D2A4C]">
                    <Mail className="w-3.5 h-3.5 text-[#C59B24]" /> {companyDetails.email}
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