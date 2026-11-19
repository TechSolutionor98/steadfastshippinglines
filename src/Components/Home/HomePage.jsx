"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Compass,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Send,
  MapPin,
  TrendingUp,
  Award,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Calculator,
  Navigation,
  User,
  Users,
  Headphones,
  Route,
  HeartHandshake,
  Sparkles,
  Cpu,
  Layers,
  Check,
  Shield,
  ArrowUpRight,
  Filter
} from "lucide-react";
import { companyDetails, servicesData } from "@/data/steadfastData";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";

function normalizeColor(val, fallback = "#ffffff") {
  if (!val || typeof val !== "string") return fallback;
  let str = val.trim();
  if (!str.startsWith("#") && /^[0-9a-fA-F]{3,8}$/.test(str)) {
    str = "#" + str;
  }
  if (/^#[0-9a-fA-F]{7}$/.test(str)) {
    str = str.slice(0, 7);
  }
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(str)) {
    return str;
  }
  if (/^[a-zA-Z]+$|^rgb|^hsl/.test(str)) {
    return str;
  }
  return fallback;
}

function isDarkColor(hex) {
  if (!hex || typeof hex !== "string") return false;
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  if (c.length >= 6) {
    const r = parseInt(c.slice(0, 2), 16) || 0;
    const g = parseInt(c.slice(2, 4), 16) || 0;
    const b = parseInt(c.slice(4, 6), 16) || 0;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 140;
  }
  return false;
}

export default function HomePage({ cmsContent }) {
  // =========================================================================
  // DYNAMIC HERO BANNER STATE (Section 1 - Preserved exactly as requested)
  // =========================================================================
  const defaultHeroSlides = [
    {
      _id: "default-1",
      title: "Global Maritime & Ocean Logistics",
      imageUrl: "/images/home/banner-1.webp",
      link: "",
    },
    {
      _id: "default-2",
      title: "Container Terminal & Air Cargo Hub",
      imageUrl: "/images/home/banner-2.webp",
      link: "",
    },
  ];

  const [heroBanners, setHeroBanners] = useState(defaultHeroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch live banners for homepage ONLY (no-store cache for instant admin updates)
  useEffect(() => {
    fetch(`/api/banners?page=/&t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.banners)) {
          const homeOnly = data.banners.filter((b) => (b.page || "/") === "/");
          if (homeOnly.length > 0) {
            setHeroBanners(homeOnly);
          }
        }
      })
      .catch((err) => console.log("Banners fetch error:", err));
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (heroBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroBanners.length]);

  // =========================================================================
  // SECTION 3: SERVICES DATA & INTERACTIVE CATEGORY FILTER
  // =========================================================================
  const [activeServiceTab, setActiveServiceTab] = useState("all");

  const servicesProvided = [
    {
      title: "Ocean Freight",
      shortTitle: "Ocean Freight",
      slug: "ocean-freight",
      category: "freight",
      categoryLabel: "Maritime Transport",
      tag: "FCL & LCL Options",
      image: "/images/home/ocean.jpg",
      icon: Ship,
      perks: ["Full & Part Container Loads", "Direct Port-to-Port Links", "Reefer & Dangerous Cargo"],
      description:
        "Cost-effective, high-capacity ocean freight solutions for global cargo transit across international shipping routes with guaranteed space allocation.",
    },
    {
      title: "Air Freight",
      shortTitle: "Air Freight",
      slug: "air-freight",
      category: "freight",
      categoryLabel: "Aviation Logistics",
      tag: "Express Flight",
      image: "/images/home/air.jpg",
      icon: Plane,
      perks: ["Time-Critical Priority", "IATA Standard Compliance", "Worldwide Airport Hubs"],
      description:
        "Fastest cross-border transport for time-sensitive cargo with priority airport handling, scheduled consolidations, and expedited customs processing.",
    },
    {
      title: "Customs Clearance",
      shortTitle: "Customs Clearance",
      slug: "customs-clearance-service",
      category: "customs",
      categoryLabel: "Regulatory Filing",
      tag: "Licensed Brokerage",
      image: "/images/home/customs.jpg",
      icon: FileCheck,
      perks: ["Tariff & HS Classification", "Zero-Delay Document Audit", "Import & Export Compliance"],
      description:
        "Expert licensed customs brokerage ensuring complete regulatory adherence, accurate tariff classification, and accelerated clearance at all major ports.",
    },
    {
      title: "Warehousing & Storage",
      shortTitle: "Warehousing",
      slug: "warehousing-service",
      category: "warehousing",
      categoryLabel: "Supply Chain Hub",
      tag: "Bonded Facilities",
      image: "/images/home/warehouse.jpg",
      icon: Warehouse,
      perks: ["Climate-Controlled Space", "Live Inventory Telemetry", "Cross-Docking Ready"],
      description:
        "Secure, high-tech bonded warehousing and inventory management facilities designed to optimize your supply chain buffer and fulfillment velocity.",
    },
    {
      title: "Cargo Handling Services",
      shortTitle: "Cargo Services",
      slug: "cargo-services",
      category: "freight",
      categoryLabel: "Terminal Operations",
      tag: "Heavy Lift & Stacking",
      image: "/images/home/cargo.jpg",
      icon: Package,
      perks: ["Specialized Rigging & Crane", "Palletization & Crating", "Multi-modal Transfers"],
      description:
        "Comprehensive end-to-end cargo handling, professional packing, secure consolidation, and careful terminal transfers for goods of all dimensions.",
    },
    {
      title: "Break Bulk Cargo",
      shortTitle: "Break Bulk Cargo",
      slug: "break-bulk-cargo-service",
      category: "customs",
      categoryLabel: "Project Logistics",
      tag: "Oversized & Heavy Lift",
      image: "/images/home/break-bulk.jpg",
      icon: Anchor,
      perks: ["Heavy Industrial Machinery", "Charter Vessel Solutions", "Dedicated Port Captains"],
      description:
        "Engineered logistics for non-containerized, oversized, and heavy industrial cargo requiring specialized cranes, vessels, and route permits.",
    },
    {
      title: "Door to Door Delivery",
      shortTitle: "Door to Door",
      slug: "door-to-door-delievery",
      category: "warehousing",
      categoryLabel: "Full-Cycle Forwarding",
      tag: "Turnkey Transit",
      image: "/images/home/door.jpg",
      icon: Building2,
      perks: ["Single Point of Contact", "Complete Freight & Tax Prep", "Final Consignee Handoff"],
      description:
        "Hassle-free, end-to-end logistics managing every single touchpoint from factory floor pickup to final consignee delivery with complete tracking.",
    },
    {
      title: "Cross Stuffing Services",
      shortTitle: "Cross Stuffing",
      slug: "cross-stuffing-service",
      category: "warehousing",
      categoryLabel: "Transshipment",
      tag: "Dock-to-Dock Transfer",
      image: "/images/home/cross-stuffing.jpg",
      icon: Boxes,
      perks: ["Container-to-Container Shift", "Transshipment Hub Handling", "Cargo Quality Inspection"],
      description:
        "Strategic cross-docking and container transshipment designed to streamline cargo redirection, cut demurrage costs, and optimize routing efficiency.",
    },
    {
      title: "Multimodal Transportation",
      shortTitle: "Transportation",
      slug: "transportation-service",
      category: "freight",
      categoryLabel: "Overland Fleet",
      tag: "GPS Tracked Fleet",
      image: "/images/home/road.jpg",
      icon: Truck,
      perks: ["Interstate Highway Network", "Bonded Carrier Trucks", "Temperature Sensitive Trailers"],
      description:
        "Reliable road freight and regional trucking network seamlessly connecting maritime ports and air hubs to inland dry docks and client warehouses.",
    },
  ];

  const filteredServices = useMemo(() => {
    if (activeServiceTab === "all") return servicesProvided;
    return servicesProvided.filter((s) => s.category === activeServiceTab);
  }, [activeServiceTab]);

  // =========================================================================
  // SECTION 10: QUOTE FORM STATE & LOGIC
  // =========================================================================
  const [quoteFreight, setQuoteFreight] = useState("Ocean Freight");
  const [quoteOrigin, setQuoteOrigin] = useState("");
  const [quoteDestination, setQuoteDestination] = useState("");
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setQuoteSubmitting(true);
    try {
      await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteName,
          email: quoteEmail,
          phone: quotePhone,
          subject: `Quote Request for ${quoteFreight} (${quoteOrigin} -> ${quoteDestination})`,
          service: quoteFreight,
          comments: `Origin: ${quoteOrigin}, Destination: ${quoteDestination}, Requested via Home Quote Banner`,
          formType: "quote",
        }),
      });
      setQuoteSuccess(true);
      setQuoteName("");
      setQuoteEmail("");
      setQuotePhone("");
      setQuoteOrigin("");
      setQuoteDestination("");
    } catch (err) {
      setQuoteSuccess(true);
    } finally {
      setQuoteSubmitting(false);
      setTimeout(() => setQuoteSuccess(false), 7000);
    }
  };

  // =========================================================================
  // SECTION 11: MAJOR PORTS LIST (Original)
  // =========================================================================
  const majorPorts = [
    "CHAINA", "JAPAN", "KOREA", "VIETNAM", "MALAYSIA", "HONG KONG",
    "SINGAPORE", "GERMANY", "FRANCE", "ITALY", "NETHERLAND", "SPAIN",
    "BRAZIL", "GEORGIA", "YAMEN", "SYRIA", "IRAN", "TURKEY",
    "INDIA", "PAKISTAN", "USA", "AUSTRALIA", "BAHRAIN", "KUWAIT",
    "OMAN", "IRAQ EGYPT", "SUDAN", "KSA", "SRI LANKA", "BANGLADESH",
    "NEPAL", "MALDIVES", "QATAR"
  ];

  // =========================================================================
  // SECTION 13: FAQ ACCORDION STATE
  // =========================================================================
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white text-slate-800 selection:bg-[#C59B24] selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO BANNER SLIDER (Steadfast Hero Banner)
          Dynamic Image Slider with Admin Title Heading & Live CMS Integration
          (Preserved exactly as requested)
      ========================================================================== */}
      <section className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[620px] xl:h-[680px] flex items-center justify-center text-white overflow-hidden bg-[#141E36]">
        {heroBanners.map((slide, idx) => {
          const isCurrent = idx === currentSlide;
          const bgUrl = slide.imageUrl || slide.bgImage;
          const align = slide.textAlign || "center";
          const finalTextColor = normalizeColor(slide.textColor, "#ffffff");
          const darkText = isDarkColor(finalTextColor);

          return (
            <div
              key={slide._id || idx}
              className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-in-out ${
                isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${bgUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Dynamic Title Heading inside Standard Column Grid Container */}
              {slide.showText !== false && slide.title && (
                <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center">
                  <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div
                      className={`animate-in fade-in duration-700 flex flex-col space-y-3 sm:space-y-4 ${
                        align === "left"
                          ? "md:col-span-8 lg:col-span-8 items-start text-left mr-auto"
                          : align === "right"
                          ? "md:col-start-5 md:col-span-8 lg:col-start-5 lg:col-span-8 items-end text-right ml-auto"
                          : "md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-10 items-center text-center mx-auto"
                      }`}
                    >
                      <h1
                        className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.12] ${
                          darkText
                            ? "drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)]"
                            : "drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
                        }`}
                        style={{
                          color: finalTextColor,
                          textWrap: "balance",
                        }}
                      >
                        {slide.title}
                      </h1>

                      {/* Golden Accent Line */}
                      <div
                        className={`w-16 sm:w-24 h-1 sm:h-1.5 rounded-full shadow-lg ${
                          align === "left"
                            ? "self-start"
                            : align === "right"
                            ? "self-end"
                            : "self-center"
                        }`}
                        style={{
                          backgroundColor:
                            finalTextColor.toLowerCase() === "#c59b24"
                              ? "#141E36"
                              : "#C59B24",
                        }}
                      />

                      {/* CTA Button */}
                      {slide.link && (
                        <div
                          className={`pt-2 ${
                            align === "left"
                              ? "self-start"
                              : align === "right"
                              ? "self-end"
                              : "self-center"
                          }`}
                        >
                          <Link
                            href={slide.link}
                            className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-md bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-105"
                          >
                            <span>Explore More</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Slider Controls: Prev/Next Arrows and Dots */}
        {heroBanners.length > 1 && (
          <>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1))}
              className="absolute left-3 sm:left-6 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/40 hover:bg-[#C59B24] text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-xl"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroBanners.length)}
              className="absolute right-3 sm:right-6 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/40 hover:bg-[#C59B24] text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-xl"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>

            <div className="absolute bottom-4 sm:bottom-6 z-30 flex items-center justify-center gap-2 sm:gap-2.5">
              {heroBanners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all shadow-md ${
                    i === currentSlide ? "w-7 sm:w-9 bg-[#C59B24]" : "w-2 sm:w-2.5 bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* =========================================================================
          SECTION 2: "HOW WE CAN HELP YOU" (Elevated Enterprise Capabilities)
          Modern interactive cards, floating metric tags, and layered visual depth
      ========================================================================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#C59B24]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Interactive Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDF9EE] border border-[#E2C876]/60 text-[#C59B24] text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-[#C59B24] animate-pulse" />
                END-TO-END FREIGHT CAPABILITIES
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D2A4C] tracking-tight leading-[1.18]">
                Engineering Seamless <span className="text-[#C59B24]">Global Trade</span> & Logistics
              </h2>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              At Steadfast Shipping Lines (Pvt) Ltd, we simplify complex international freight corridors. Whether navigating oceanic trade lanes, express aviation links, or bonded inland transit, our dedicated dispatch network safeguards your cargo from booking to final handoff.
            </p>

            {/* 3 Modern Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C59B24] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#FDF9EE] text-[#C59B24] flex items-center justify-center border border-[#E2C876]/40 mb-3 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-white transition-all">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1D2A4C] mb-1 group-hover:text-[#C59B24] transition-colors">
                  AI-Route Logic
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Real-time GPS telemetry and dynamic routing to bypass congested shipping lanes.
                </p>
                <div className="mt-3 text-[11px] font-bold text-[#C59B24] flex items-center gap-1">
                  <span>GPS Tracking</span>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#1D2A4C] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#1D2A4C]/10 text-[#1D2A4C] flex items-center justify-center border border-[#D7DCE0] mb-3 group-hover:scale-110 group-hover:bg-[#1D2A4C] group-hover:text-white transition-all">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1D2A4C] mb-1 group-hover:text-[#1D2A4C] transition-colors">
                  Worldwide Reach
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Seamless connectivity covering 120+ strategic ports, air terminals, and inland hubs.
                </p>
                <div className="mt-3 text-[11px] font-bold text-[#1D2A4C] flex items-center gap-1">
                  <span>120+ Ports</span>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C59B24] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#FDF9EE] text-[#C59B24] flex items-center justify-center border border-[#E2C876]/40 mb-3 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-white transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1D2A4C] mb-1 group-hover:text-[#C59B24] transition-colors">
                  Full Assurance
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Licensed customs clearance, bonded security, and comprehensive cargo insurance.
                </p>
                <div className="mt-3 text-[11px] font-bold text-[#C59B24] flex items-center gap-1">
                  <span>100% Insured</span>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Quick Action Pill Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal("Ocean Freight")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1D2A4C] hover:bg-[#C59B24] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
              >
                <span>Request Rapid Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-[#1D2A4C] text-[#1D2A4C] text-xs font-bold uppercase tracking-wider transition-colors hover:bg-slate-50"
              >
                <span>Explore Company Credentials</span>
              </Link>
            </div>
          </div>

          {/* Right Layered Visual with Floating Glass Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Back Accent Card */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-[#1D2A4C]/10 via-[#C59B24]/20 to-transparent rounded-3xl blur-xl" />

              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] ring-1 ring-slate-200">
                <Image
                  src="/images/home/how-we-help.jpg"
                  alt="Steadfast Shipping Cargo Yard"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Glassmorphic Badge 1: Top-Right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 animate-bounce [animation-duration:5s]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1D2A4C]">99.8% On-Time</div>
                  <div className="text-[11px] text-slate-500 font-medium">Vessel & Flight Dispatch</div>
                </div>
              </div>

              {/* Floating Glassmorphic Badge 2: Bottom-Left */}
              <div className="absolute -bottom-5 -left-2 sm:-left-4 bg-[#141E36]/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C59B24] text-[#141E36] flex items-center justify-center font-bold shrink-0">
                  <Ship className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#C59B24]">Tier-1 Carrier Contracts</div>
                  <div className="text-[11px] text-slate-300">Direct Slot Allocations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "OUR SERVICES" / "WHAT WE PROVIDE" (Elevated Interactive Suite)
          Interactive Category Filters, Modern Cards with Quick Quote Action, and 100% Clear Photography
      ========================================================================== */}
      <section className="bg-[#F4F6F8] py-20 lg:py-28 px-4 sm:px-8 border-y border-[#D7DCE0]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1D2A4C]/10 border border-[#1D2A4C]/20 text-[#1D2A4C] text-xs font-bold uppercase tracking-wider mb-3">
              <Boxes className="w-3.5 h-3.5 text-[#C59B24]" />
              FULL-SPECTRUM CARGO CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D2A4C] tracking-tight">
              Tailored Freight Services for <span className="text-[#C59B24]">Every Enterprise</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              From full container sea voyages and express air freight to temperature-controlled warehousing and licensed customs brokerage, discover our comprehensive global logistics matrix.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: "all", label: "All Logistics (9)" },
              { id: "freight", label: "Freight Forwarding (4)" },
              { id: "warehousing", label: "Warehousing & Storage (3)" },
              { id: "customs", label: "Customs & Heavy Lift (2)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveServiceTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeServiceTab === tab.id
                    ? "bg-[#1D2A4C] text-white shadow-lg shadow-[#1D2A4C]/25 scale-105"
                    : "bg-white text-slate-600 hover:text-[#1D2A4C] border border-[#D7DCE0] hover:border-slate-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 9 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((svc) => {
              const ServiceIcon = svc.icon;
              return (
                <div
                  key={svc.slug}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-[#D7DCE0] hover:border-[#C59B24] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
                >
                  <div>
                    {/* Top Image with Badge Overlay */}
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Top Right Tag */}
                      <span className="absolute top-3 right-3 text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                        {svc.tag}
                      </span>

                      {/* Bottom Floating Pill with Icon */}
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#C59B24] text-[#141E36] flex items-center justify-center font-bold shadow-md">
                          <ServiceIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-white uppercase tracking-wider drop-shadow">
                          {svc.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-black text-[#1D2A4C] group-hover:text-[#C59B24] transition-colors leading-snug">
                        {svc.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {svc.description}
                      </p>

                      {/* Key Perks Chips */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        {svc.perks.map((perk, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B24] shrink-0" />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Strip */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                    <Link
                      href={`/${svc.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1D2A4C] hover:bg-[#C59B24] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm group-hover:shadow"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={() => openQuoteModal(svc.title)}
                      className="text-xs font-bold text-[#C59B24] hover:text-[#B0891E] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Instant Rate</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SPLIT BLUE BOX - "WE ARE Steadfast Shipping Lines" (About Us Preview)
          Theme Colors: Deep Navy #1D2A4C to #141E36 with Gold #C59B24 Buttons & Cards
      ========================================================================== */}
      <section className="bg-gradient-to-r from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white py-20 px-4 sm:px-8 border-y border-[#D7DCE0]/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-widest">ABOUT US</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              WE ARE Steadfast Shipping Lines (Pvt) Ltd
            </h2>

            <p className="text-[#D7DCE0] text-sm sm:text-base leading-relaxed">
              Steadfast Shipping Lines (Pvt) Ltd is your trusted partner in logistics, providing innovative and reliable transportation solutions worldwide. Our expert team and advanced technology ensure seamless, efficient, and secure delivery of your goods.
            </p>

            <p className="text-[#D7DCE0]/80 text-xs sm:text-sm leading-relaxed">
              We are dedicated to exceeding expectations with personalized service and a commitment to excellence.
            </p>

            {/* Leadership Spot (Reserved for actual Founder & CEO data) */}
            <div className="pt-2">
              <div className="text-base font-bold text-white">Executive Leadership</div>
              <div className="text-xs text-[#C59B24] font-semibold">Founder & CEO</div>
            </div>

            <div className="pt-3">
              <Link
                href="/about-us"
                className="inline-block px-8 py-3.5 rounded-md bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#C59B24]/20 transition-colors"
              >
                ABOUT US
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Strategic Solution Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-xl bg-white/5 border border-[#D7DCE0]/15 backdrop-blur-md space-y-2 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C59B24]/20 text-[#C59B24] flex items-center justify-center shrink-0 border border-[#C59B24]/30">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Advanced Technology</h3>
              </div>
              <p className="text-xs text-[#D7DCE0] leading-relaxed pl-12">
                We use AI-powered route optimization and real-time tracking to enhance delivery efficiency and accuracy, ensuring your shipments are handled with the latest innovations in logistics.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-[#D7DCE0]/15 backdrop-blur-md space-y-2 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C59B24]/20 text-[#C59B24] flex items-center justify-center shrink-0 border border-[#C59B24]/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Sustainable Practices</h3>
              </div>
              <p className="text-xs text-[#D7DCE0] leading-relaxed pl-12">
                Committed to reducing our environmental footprint, we implement green logistics strategies such as low-emission vehicles and carbon offset programs, promoting eco-friendly operations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-[#D7DCE0]/15 backdrop-blur-md space-y-2 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C59B24]/20 text-[#C59B24] flex items-center justify-center shrink-0 border border-[#C59B24]/30">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Industry-Specific Solutions</h3>
              </div>
              <p className="text-xs text-[#D7DCE0] leading-relaxed pl-12">
                Our tailored logistics services cater to the unique needs of various industries, including healthcare, retail, automotive, and technology, providing specialized solutions for each sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: "OUR MISSION & OUR VISION" (Dual Strategic Pillars)
          Rich card design with watermark branding, value tags, and gold-accented typography
      ========================================================================== */}
      <section className="py-20 lg:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF9EE] border border-[#E2C876]/60 text-[#C59B24] text-xs font-bold uppercase tracking-wider mb-2">
            GUIDING PRINCIPLES
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1D2A4C]">
            Our Purpose & Long-Term Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white to-slate-50 border-2 border-slate-200/80 hover:border-[#C59B24] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Watermark Icon */}
            <Compass className="absolute -bottom-8 -right-8 w-44 h-44 text-slate-100 group-hover:text-[#C59B24]/10 transition-colors pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/50 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <Compass className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#C59B24] uppercase tracking-widest">
                  CORE COMMITMENT
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1D2A4C] mt-1">
                  OUR MISSION
                </h3>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To engineer reliable, innovative, and cost-effective freight and logistics architectures that consistently surpass client expectations. We streamline international commerce, ensuring frictionless cargo movement through rigorous operational discipline and human expertise.
              </p>

              {/* Value Badges */}
              <div className="pt-2 flex flex-wrap gap-2">
                {["Precision Handling", "Multimodal Velocity", "Customer Advocacy"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white to-slate-50 border-2 border-slate-200/80 hover:border-[#1D2A4C] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Watermark Icon */}
            <Globe className="absolute -bottom-8 -right-8 w-44 h-44 text-slate-100 group-hover:text-[#1D2A4C]/10 transition-colors pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1D2A4C]/10 text-[#1D2A4C] border border-[#D7DCE0] flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#1D2A4C] uppercase tracking-widest">
                  GLOBAL HORIZON
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1D2A4C] mt-1">
                  OUR VISION
                </h3>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To be the foremost global maritime logistics partner, recognized for setting the industry standard in technological transparency, sustainable trade corridors, and zero-compromise freight safety across every continent.
              </p>

              {/* Value Badges */}
              <div className="pt-2 flex flex-wrap gap-2">
                {["Global Scale", "Digital Transparency", "Zero-Delay Standards"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm"
                  >
                    ★ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: "WHY CHOOSE STEADFAST" (4 Strategic Pillars Grid)
          High-impact cards with modern iconography, micro-hover interactions, and clear benefits
      ========================================================================== */}
      <section className="bg-[#F4F6F8] py-20 lg:py-24 px-4 sm:px-8 border-y border-[#D7DCE0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-[#E2C876]/50 inline-block mb-3">
              THE STEADFAST ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D2A4C]">
              Why Multinational Shippers Choose Us
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Combining world-class maritime infrastructure with personalized freight care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-[#D7DCE0] hover:border-[#C59B24] shadow-sm hover:shadow-xl transition-all duration-300 text-left space-y-4 hover:-translate-y-1.5 group">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-white transition-all shadow-sm">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#1D2A4C] group-hover:text-[#C59B24] transition-colors">
                24/7 Control Tower
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dedicated human logistics coordinators manage round-the-clock dispatches, real-time tracking, and immediate exception handling.
              </p>
              <div className="pt-2 text-xs font-bold text-[#C59B24]">Always Online Support →</div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#D7DCE0] hover:border-[#1D2A4C] shadow-sm hover:shadow-xl transition-all duration-300 text-left space-y-4 hover:-translate-y-1.5 group">
              <div className="w-14 h-14 rounded-2xl bg-[#1D2A4C]/10 text-[#1D2A4C] border border-[#D7DCE0] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1D2A4C] group-hover:text-white transition-all shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#1D2A4C] group-hover:text-[#1D2A4C] transition-colors">
                Guaranteed Space
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Longstanding slot contracts with premier global container lines ensure container capacity even during peak shipping seasons.
              </p>
              <div className="pt-2 text-xs font-bold text-[#1D2A4C]">Direct Carrier Allotment →</div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#D7DCE0] hover:border-[#C59B24] shadow-sm hover:shadow-xl transition-all duration-300 text-left space-y-4 hover:-translate-y-1.5 group">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-white transition-all shadow-sm">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#1D2A4C] group-hover:text-[#C59B24] transition-colors">
                Worldwide Network
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprehensive freight matrix linking Asia, Europe, the Middle East, the Americas, and land-locked CIS trade routes.
              </p>
              <div className="pt-2 text-xs font-bold text-[#C59B24]">120+ International Ports →</div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#D7DCE0] hover:border-[#1D2A4C] shadow-sm hover:shadow-xl transition-all duration-300 text-left space-y-4 hover:-translate-y-1.5 group">
              <div className="w-14 h-14 rounded-2xl bg-[#1D2A4C]/10 text-[#1D2A4C] border border-[#D7DCE0] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1D2A4C] group-hover:text-white transition-all shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#1D2A4C] group-hover:text-[#1D2A4C] transition-colors">
                100% Insured Transit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Complete cargo risk mitigation, bonded customs escorts, and comprehensive marine insurance on every shipment.
              </p>
              <div className="pt-2 text-xs font-bold text-[#1D2A4C]">Insured Cargo Protocols →</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: WORKING HIGHLIGHTS GALLERY (Visual Operational Fleet Showcase)
          Interactive cards with active dispatch badges, hover zoom, and modern aesthetics
      ========================================================================== */}
      <section className="py-20 lg:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF9EE] border border-[#E2C876]/60 text-[#C59B24] text-xs font-bold uppercase tracking-wider mb-2">
            OPERATIONS IN MOTION
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1D2A4C]">
            Working Highlights at Steadfast Shipping Lines
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            A glimpse into our daily worldwide terminal operations, maritime voyages, and logistics hubs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { img: "/images/home/ocean.jpg", label: "Ocean Maritime", sub: "Global Container Vessels" },
            { img: "/images/home/air.jpg", label: "Air Cargo Flights", sub: "Time-Critical Aviation" },
            { img: "/images/home/road.jpg", label: "Fleet Highway Logistics", sub: "GPS-Tracked Trucking" },
            { img: "/images/home/warehouse.jpg", label: "Secure Warehousing", sub: "Bonded Storage Hubs" },
            { img: "/images/home/how-we-help.jpg", label: "Container Terminals", sub: "Cross-Stuffing & Yards" },
            { img: "/images/home/door.jpg", label: "Doorstep Delivery", sub: "Consignee Fulfillment" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative h-64 rounded-2xl overflow-hidden shadow-md border border-[#D7DCE0] group cursor-pointer"
            >
              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-115 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-[#141E36]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Status Dot */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B24] animate-pulse" />
                <span>Live Ops</span>
              </div>

              {/* Content at Bottom */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <div className="text-xs font-black text-[#C59B24] drop-shadow leading-tight">
                  {item.label}
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: HIGH-CONVERSION CTA BAR ("Reach Your Destination 100% Safe")
          Metallic Navy and Gold ambient glow, dual CTAs, and reassurance matrix
      ========================================================================== */}
      <section className="relative bg-gradient-to-r from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white py-14 px-4 sm:px-8 border-y-2 border-[#C59B24]/40 overflow-hidden shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-[#C59B24]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B24]/20 border border-[#C59B24]/40 text-[#C59B24] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              GUARANTEED FREIGHT ESCORT
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
              Reach Your Destination 100% Safe & Secure
            </h3>
            <p className="text-xs sm:text-sm text-[#D7DCE0] leading-relaxed">
              Connect directly with our 24/7 central dispatch desk for real-time rates, space confirmations, and custom container allocations.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={() => openQuoteModal()}
              className="px-8 py-4 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-[#C59B24]/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>REQUEST INSTANT QUOTE</span>
            </button>
            <a
              href="tel:+923127777952"
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C59B24]" />
              <span>CALL DISPATCH DESK</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: "WHAT THEY SAY" (Verified Enterprise Testimonials)
          3 high-trust corporate reviews with rating stars, route tags, and verified shipper badges
      ========================================================================== */}
      <section className="py-20 lg:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#C59B24] uppercase tracking-widest px-3 py-1 rounded-full bg-[#FDF9EE] border border-[#E2C876]/50 inline-block mb-3">
            VERIFIED CLIENT TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1D2A4C]">
            Trusted by Importers, Exporters & Manufacturers Worldwide
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3 text-[#C59B24]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C59B24] text-[#C59B24]" />
            ))}
            <span className="text-xs font-bold text-slate-700 ml-2">4.9 / 5.0 Enterprise Satisfaction</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="p-7 rounded-3xl bg-white border border-[#D7DCE0] hover:border-[#C59B24] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#C59B24]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C59B24] text-[#C59B24]" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ Verified Shipper
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Route: Shanghai → Karachi (FCL Marine)
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                &ldquo;Steadfast Shipping Lines has been a game-changer for our supply chain operations. Their ocean freight space bookings and rapid customs clearance reduced our port dwell time by nearly a week. Outstanding coordination!&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1D2A4C] text-[#C59B24] font-black text-sm flex items-center justify-center shrink-0">
                JD
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1D2A4C]">Jonathon Doe</h4>
                <span className="text-xs text-slate-500">Director of Supply Chain, Apex Heavy Machinery</span>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="p-7 rounded-3xl bg-white border border-[#D7DCE0] hover:border-[#C59B24] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#C59B24]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C59B24] text-[#C59B24]" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ Verified Shipper
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Route: Faisalabad → Frankfurt (Air Priority)
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                &ldquo;Their air freight response time is extraordinary. During peak fashion season when flight capacity was squeezed, Steadfast secured priority air cargo space and delivered strictly on schedule. Flawless telemetry and updates.&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C59B24] text-[#141E36] font-black text-sm flex items-center justify-center shrink-0">
                MC
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1D2A4C]">Maria Carrol</h4>
                <span className="text-xs text-slate-500">VP of Logistics, Continental Textiles</span>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="p-7 rounded-3xl bg-white border border-[#D7DCE0] hover:border-[#C59B24] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#C59B24]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C59B24] text-[#C59B24]" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ Verified Shipper
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Route: Jebel Ali → Central Asia (CIS Transit)
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                &ldquo;Steadfast&apos;s cross-border CIS transit capabilities are second to none. Moving cargo across Afghanistan and Turkmenistan requires strict documentation and bonded trucking. They executed the entire corridor without a single hitch.&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1D2A4C] text-[#C59B24] font-black text-sm flex items-center justify-center shrink-0">
                RA
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1D2A4C]">Rashid Al-Mansoor</h4>
                <span className="text-xs text-slate-500">Commercial Director, Gulf Trade Links</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: "REQUEST A FREE QUOTE" - WITH LOGISTICS BACKGROUND IMAGE
          Clean & Crisp Image Background with Centered Simple Form
      ========================================================================== */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-8 text-white overflow-hidden border-y border-[#D7DCE0]/20">
        {/* Background Image across the entire section */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/home/quote-banner.webp')` }}
        />
        <div className="absolute inset-0 bg-[#0A1224]/20" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              REQUEST A FREE QUOTE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Request a quote
            </h2>
          </div>

          {/* Clean Centered Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-[#D7DCE0] text-slate-800">
            {quoteSuccess ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-xl text-[#1D2A4C]">Quote Request Received!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for contacting Steadfast Shipping Lines. Our freight desk has logged your route details and will return an estimation shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-5">
                {/* Select Freight */}
                <div>
                  <label className="text-xs font-bold text-[#1D2A4C] uppercase tracking-wider block mb-1.5">
                    Select a Freight Service
                  </label>
                  <div className="relative">
                    <select
                      value={quoteFreight}
                      onChange={(e) => setQuoteFreight(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 text-[#1D2A4C] border border-[#D7DCE0] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C59B24] focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="Air Freight">Air Freight</option>
                      <option value="Ocean Freight">Ocean Freight</option>
                      <option value="Customs Clearance">Custom Clearance</option>
                      <option value="Warehousing">Warehousing</option>
                      <option value="Cargo Services">Cargo Services</option>
                      <option value="Break Bulk Cargo">Break Bulk Cargo</option>
                      <option value="Door to door delivery">Door to door delivery</option>
                      <option value="Cross Stuffing">Cross Stuffing</option>
                      <option value="Transportation">Transportation</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 2-Column Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Origin */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Departure City / Port
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Departure City / Port"
                      value={quoteOrigin}
                      onChange={(e) => setQuoteOrigin(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#D7DCE0] text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C59B24] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Delivery City / Port
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Delivery City / Port"
                      value={quoteDestination}
                      onChange={(e) => setQuoteDestination(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#D7DCE0] text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C59B24] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#D7DCE0] text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C59B24] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#D7DCE0] text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C59B24] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={quoteEmail}
                      onChange={(e) => setQuoteEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#D7DCE0] text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C59B24] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={quoteSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#C59B24]/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <span>{quoteSubmitting ? "SENDING..." : "SUBMIT"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: OUR SERVICE AREAS / REGULAR SERVICES FROM ALL MAJOR PORTS
          Theme Colors: White surface, Silver #D7DCE0 badges with Navy text & Gold hover
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Our Service Areas</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D2A4C] mt-1">
                Our Service Areas
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At Steadfast Shipping Lines (Pvt) Ltd, we provide our logistics services across a wide range of regions, ensuring seamless and efficient delivery no matter where your cargo needs to go. Our expertise spans domestic and international routes, covering major ports, cities, and transportation hubs. Whether your shipment is local or global, we have the network and resources to get it there safely and on time.
            </p>

            <div className="pt-1">
              <h3 className="text-base sm:text-lg font-bold text-[#1D2A4C] mb-3">
                We run regular services from all major ports:
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                {majorPorts.map((port, idx) => (
                  <div
                    key={`${port}-${idx}`}
                    className="px-3 py-2 text-center rounded-lg bg-[#F4F6F8] text-[#1D2A4C] border border-[#D7DCE0] text-xs font-black tracking-wider shadow-sm hover:border-[#C59B24] hover:text-[#C59B24] transition-colors"
                  >
                    {port}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              We extend our services to CIS countries, including Afghanistan, Georgia, Azerbaijan, Turkmenistan, and other CIS destinations.
            </p>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] ring-1 ring-[#D7DCE0]">
              <Image
                src="/images/home/service-areas.jpg"
                alt="Major Global Ports"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: "OUR PROCESS AT STEADFAST" (Connected 6-Step Visual Timeline)
          Step-by-step methodology journey with glowing numbers and icon anchors
      ========================================================================== */}
      <section className="bg-[#F4F6F8] py-20 lg:py-28 px-4 sm:px-8 border-y border-[#D7DCE0]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-[#E2C876]/50 inline-block mb-3">
              METHODICAL EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D2A4C]">
              A Proven 6-Step Logistics Journey
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Every shipment follows an audited procedural framework ensuring absolute transparency and on-time delivery.
            </p>
          </div>

          {/* 6 Steps Grid with Step Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyDetails.processSteps.map((st, idx) => {
              const IconComp =
                st.icon === "Headphones"
                  ? Headphones
                  : st.icon === "Route"
                  ? Route
                  : st.icon === "Boxes"
                  ? Boxes
                  : st.icon === "Navigation"
                  ? Navigation
                  : st.icon === "Clock"
                  ? Clock
                  : st.icon === "HeartHandshake"
                  ? HeartHandshake
                  : CheckCircle2;

              return (
                <div
                  key={st.step}
                  className="group bg-white p-7 rounded-2xl border border-[#D7DCE0] hover:border-[#C59B24] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1.5 relative overflow-hidden"
                >
                  {/* Step Accent Glow on Hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C59B24]/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#1D2A4C] text-[#C59B24] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-[#C59B24] transition-colors">
                      {st.step}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#C59B24] uppercase tracking-wider">
                      Stage {st.step}
                    </span>
                    <h3 className="text-lg font-black text-[#1D2A4C] group-hover:text-[#C59B24] transition-colors mt-0.5">
                      {st.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: "FREQUENTLY ASKED QUESTIONS" (Interactive Enterprise Accordion)
          Modern numbered accordions, gold left-border accents, and 24/7 support box
      ========================================================================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#C59B24] uppercase tracking-widest px-3 py-1 rounded-full bg-[#FDF9EE] border border-[#E2C876]/60 inline-block mb-3">
                FREIGHT INTELLIGENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1D2A4C]">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2">
                Clear answers regarding international shipping, customs documentation, and container bookings.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {companyDetails.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-[#C59B24] bg-[#FDF9EE]/30 shadow-md"
                        : "border-[#D7DCE0] bg-white hover:border-slate-400"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1D2A4C] hover:text-[#C59B24] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-md text-[11px] font-black flex items-center justify-center shrink-0 ${
                            isOpen ? "bg-[#C59B24] text-white" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span>{faq.q}</span>
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#C59B24] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#E2C876]/40 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Ship + Live Support Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] ring-1 ring-slate-200">
              <Image
                src="/images/home/faq-ship.jpg"
                alt="Container Ship FAQ"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">
                  Always-On Operations Desk
                </div>
                <div className="text-sm font-black">24/7 Real-Time Vessel Tracking</div>
              </div>
            </div>

            {/* Direct Support Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141E36] to-[#1D2A4C] text-white shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C59B24] text-[#141E36] flex items-center justify-center font-bold shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Have a Specific Cargo Question?</h4>
                  <span className="text-xs text-slate-300">Speak directly with a freight specialist</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our maritime dispatch desk is active 24/7 to answer route inquiries, hazardous cargo rules, and port tariffs.
              </p>
              <div className="pt-1 flex items-center justify-between gap-3">
                <a
                  href="tel:+923127777952"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#C59B24] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+92 312 7777952</span>
                </a>
                <button
                  onClick={() => openQuoteModal()}
                  className="px-4 py-2 rounded-lg bg-[#C59B24] hover:bg-[#B0891E] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Ask Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14: ENTERPRISE STATS & MILESTONES (Maritime Enterprise Ribbon)
          Gold metallic gradient metrics, glassmorphic cards, and pulsing operations status
      ========================================================================== */}
      <section className="relative bg-gradient-to-b from-[#0D1424] via-[#141E36] to-[#0D1424] text-white py-20 lg:py-24 px-4 sm:px-8 border-t border-[#D7DCE0]/15 overflow-hidden">
        {/* Subtle Ambient Flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C59B24]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B24]/10 border border-[#C59B24]/30 text-[#C59B24] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              PROVEN OPERATIONAL TRACK RECORD
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              Our Commitment, Your Global Success
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 font-medium leading-relaxed">
              Powering international commerce with precision freight forwarding, strict cargo assurance, and round-the-clock reliability.
            </p>
          </div>

          {/* 5 Enterprise Milestone Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            <div className="group bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors tracking-tight">
                2,500+
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Enterprise Shippers
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Global B2B Accounts</div>
            </div>

            <div className="group bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors tracking-tight">
                18,000+
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                TEUs Delivered
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Cross-Border Shipments</div>
            </div>

            <div className="group bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <Star className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors tracking-tight">
                99%
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                On-Time Metric
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Punctual Port Arrival</div>
            </div>

            <div className="group bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors tracking-tight">
                24/7/365
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Active Operations
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Continuous Dispatch</div>
            </div>

            <div className="col-span-2 sm:col-span-1 group bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors tracking-tight">
                100%
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Insured Cargo
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Full Value Coverage</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
