"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Ship, Plane, Truck, Warehouse, Package, Boxes, Anchor, FileCheck,
  Building2, Clock, Compass, ShieldCheck, Globe, ArrowRight, ArrowUpRight,
  CheckCircle2, ChevronDown, Phone, TrendingUp, Award, ChevronLeft, ChevronRight,
  Star, Calculator, Navigation, Headphones, Route as RouteIcon, HeartHandshake,
  MapPin, Zap, Container,
} from "lucide-react";
import { companyDetails } from "@/data/steadfastData";
import { openQuoteModal } from "@/Components/Quote/QuoteModal";
import { Reveal, Eyebrow, SectionHead, CountUp, RouteDash, GoldButton, GhostButton } from "./motion";
import Preloader from "./Preloader";

/* ============================================================
   DATA
============================================================ */
const SERVICES = [
  { title: "Ocean Freight", slug: "ocean-freight", category: "freight", tag: "FCL & LCL", image: "/images/home/ocean.jpg", icon: Ship,
    perks: ["Full & part container loads", "Direct port-to-port links", "Reefer & DG cargo"],
    description: "Cost-effective, high-capacity ocean freight across international routes with guaranteed space allocation." },
  { title: "Air Freight", slug: "air-freight", category: "freight", tag: "Express", image: "/images/home/air.jpg", icon: Plane,
    perks: ["Time-critical priority", "IATA compliance", "Worldwide airport hubs"],
    description: "The fastest cross-border option for time-sensitive cargo with priority handling and expedited customs." },
  { title: "Customs Clearance", slug: "customs-clearance-service", category: "customs", tag: "Licensed Broker", image: "/images/home/customs.jpg", icon: FileCheck,
    perks: ["Tariff & HS classification", "Zero-delay document audit", "Import & export compliance"],
    description: "Licensed brokerage ensuring regulatory adherence, accurate classification, and accelerated clearance." },
  { title: "Warehousing & Storage", slug: "warehousing-service", category: "warehousing", tag: "Bonded", image: "/images/home/warehouse.jpg", icon: Warehouse,
    perks: ["Climate-controlled space", "Live inventory telemetry", "Cross-docking ready"],
    description: "Secure bonded warehousing and inventory management built to optimize your fulfillment velocity." },
  { title: "Cargo Handling", slug: "cargo-services", category: "freight", tag: "Heavy Lift", image: "/images/home/cargo.jpg", icon: Package,
    perks: ["Specialized rigging & crane", "Palletization & crating", "Multi-modal transfers"],
    description: "End-to-end cargo handling, professional packing, consolidation, and careful terminal transfers." },
  { title: "Break Bulk Cargo", slug: "break-bulk-cargo-service", category: "customs", tag: "Oversized", image: "/images/home/break-bulk.jpg", icon: Anchor,
    perks: ["Heavy industrial machinery", "Charter vessel solutions", "Dedicated port captains"],
    description: "Engineered logistics for oversized, non-containerized cargo requiring specialized cranes and permits." },
  { title: "Door to Door Delivery", slug: "door-to-door-delievery", category: "warehousing", tag: "Turnkey", image: "/images/home/door.jpg", icon: Building2,
    perks: ["Single point of contact", "Freight & tax prep included", "Final consignee handoff"],
    description: "Hassle-free end-to-end logistics from factory pickup to final delivery with complete tracking." },
  { title: "Cross Stuffing", slug: "cross-stuffing-service", category: "warehousing", tag: "Transshipment", image: "/images/home/cross-stuffing.jpg", icon: Boxes,
    perks: ["Container-to-container shift", "Transshipment hub handling", "Cargo quality inspection"],
    description: "Strategic cross-docking and transshipment that cuts demurrage and optimizes routing efficiency." },
  { title: "Transportation", slug: "transportation-service", category: "freight", tag: "GPS Fleet", image: "/images/home/road.jpg", icon: Truck,
    perks: ["Interstate highway network", "Bonded carrier trucks", "Temperature-controlled trailers"],
    description: "Reliable road freight connecting ports and air hubs to inland dry docks and client warehouses." },
];

const SERVICE_TABS = [
  { id: "all", label: "All Logistics" },
  { id: "freight", label: "Freight Forwarding" },
  { id: "warehousing", label: "Warehousing & Storage" },
  { id: "customs", label: "Customs & Heavy Lift" },
];

const GALLERY = [
  { img: "/images/home/ocean.jpg", label: "Ocean Maritime", sub: "Global container vessels" },
  { img: "/images/home/air.jpg", label: "Air Cargo Flights", sub: "Time-critical aviation" },
  { img: "/images/home/road.jpg", label: "Fleet Highway", sub: "GPS-tracked trucking" },
  { img: "/images/home/warehouse.jpg", label: "Warehousing", sub: "Bonded storage hubs" },
  { img: "/images/home/how-we-help.jpg", label: "Container Terminals", sub: "Cross-stuffing yards" },
  { img: "/images/home/door.jpg", label: "Doorstep Delivery", sub: "Consignee fulfillment" },
];

const STATS = [
  { icon: TrendingUp, value: 2500, suffix: "+", label: "Enterprise Shippers", note: "Global B2B accounts" },
  { icon: Container, value: 18000, suffix: "+", label: "TEUs Delivered", note: "Cross-border shipments" },
  { icon: Star, value: 99, suffix: "%", label: "On-Time Metric", note: "Punctual port arrival" },
  { icon: Clock, value: 24, suffix: "/7", label: "Active Operations", note: "Continuous dispatch" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Insured Cargo", note: "Full value coverage" },
];

const MAJOR_PORTS = [
  "CHINA", "JAPAN", "KOREA", "VIETNAM", "MALAYSIA", "HONG KONG", "SINGAPORE", "GERMANY",
  "FRANCE", "ITALY", "NETHERLANDS", "SPAIN", "BRAZIL", "GEORGIA", "YEMEN", "SYRIA",
  "IRAN", "TURKEY", "INDIA", "PAKISTAN", "USA", "AUSTRALIA", "BAHRAIN", "KUWAIT",
  "OMAN", "IRAQ", "EGYPT", "SUDAN", "KSA", "SRI LANKA", "BANGLADESH", "NEPAL",
  "MALDIVES", "QATAR",
];

const REVIEWS = [
  { initials: "JD", name: "Jonathon Doe", role: "Director of Supply Chain, Apex Heavy Machinery", route: "Shanghai → Karachi · FCL Marine",
    text: "Steadfast has been a game-changer for our supply chain. Their ocean freight bookings and rapid customs clearance reduced our port dwell time by nearly a week. Outstanding coordination!" },
  { initials: "MC", name: "Maria Carrol", role: "VP of Logistics, Continental Textiles", route: "Faisalabad → Frankfurt · Air Priority",
    text: "Their air freight response time is extraordinary. During peak fashion season they secured priority capacity and delivered strictly on schedule. Flawless telemetry and updates." },
  { initials: "RA", name: "Rashid Al-Mansoor", role: "Commercial Director, Gulf Trade Links", route: "Jebel Ali → Central Asia · CIS Transit",
    text: "Their cross-border CIS transit capabilities are second to none — strict documentation, bonded trucking across Afghanistan and Turkmenistan, executed without a single hitch." },
];

const PROCESS_ICONS = { Headphones, Route: RouteIcon, Boxes, Navigation, Clock, HeartHandshake };
const EASE = [0.22, 1, 0.36, 1];

function normalizeColor(val, fallback = "#ffffff") {
  if (!val || typeof val !== "string") return fallback;
  let str = val.trim();
  if (!str.startsWith("#") && /^[0-9a-fA-F]{3,8}$/.test(str)) str = "#" + str;
  if (/^#[0-9a-fA-F]{7}$/.test(str)) str = str.slice(0, 7);
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(str)) return str;
  if (/^[a-zA-Z]+$|^rgb|^hsl/.test(str)) return str;
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
    return (r * 299 + g * 587 + b * 114) / 1000 < 140;
  }
  return false;
}

/* ============================================================
   PAGE
============================================================ */
export default function HomePage({ cmsContent }) {
  const reduce = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="bg-white text-slate-800 selection:bg-[#C59B24] selection:text-white">
      {/* First-visit flight intro — overlays content, content stays SSR-rendered */}
      <AnimatePresence>
        {!introDone && <Preloader key="preloader" onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99, y: 20 }}
        animate={introDone ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        aria-hidden={!introDone}
      >
        <HeroSection ready={introDone} />
        <TickerSection />
        <CapabilitiesSection />
        <ServicesSection />
        <AboutSection />
        <MissionVisionSection />
        <WhySection />
        <GallerySection />
        <CtaBand />
        <TestimonialsSection />
        <QuoteSection />
        <ServiceAreasSection />
        <ProcessSection />
        <FaqSection />
        <StatsSection />
      </motion.div>
    </div>
  );
}

/* ============================================================
   SECTION 1 — HERO
============================================================ */
function HeroSection({ ready = true }) {
  const reduce = useReducedMotion();
  const defaultSlides = [
    { _id: "default-1", title: "Global Maritime & Ocean Logistics", imageUrl: "/images/home/banner-1.webp", link: "" },
    { _id: "default-2", title: "Container Terminal & Air Cargo Hub", imageUrl: "/images/home/banner-2.webp", link: "" },
  ];
  const [banners, setBanners] = useState(defaultSlides);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    fetch(`/api/banners?page=/&t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.banners)) {
          const homeOnly = data.banners.filter((b) => (b.page || "/") === "/");
          if (homeOnly.length > 0) setBanners(homeOnly);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (paused || banners.length <= 1 || reduce) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % banners.length), 6000);
    return () => clearInterval(t);
  }, [paused, banners.length, reduce]);

  const slide = banners[current] || banners[0];

  return (
    <section
      ref={ref}
      className="relative flex h-[560px] items-center overflow-hidden bg-[#0D1424] sm:h-[620px] lg:h-[720px] xl:h-[780px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured highlights"
    >
      {/* Parallax background slides */}
      {banners.map((b, i) => (
        <motion.div
          key={b._id || i}
          className={`absolute inset-0 ${i === current ? "z-0" : "pointer-events-none z-0"}`}
          initial={false}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.06 }}
          transition={{ duration: 1.1, ease: EASE }}
          aria-hidden={i !== current}
        >
          <motion.div className="absolute inset-0 bg-cover bg-center" style={{ y: bgY, backgroundImage: `url(${b.imageUrl || b.bgImage})` }} />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#E2C876]/30 bg-white/5 py-2 pl-2 pr-4 backdrop-blur-md"
          >
            <span className="flex h-6 items-center rounded-full bg-[#C59B24] px-3 text-[10px] font-black uppercase tracking-[0.18em] text-white">
              Est. Global
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
              120+ Ports · 5 Modes · One Partner
            </span>
          </motion.div>

          <h1 className="font-anton uppercase leading-[0.98] tracking-tight text-white">
            {slide.title?.split(" ").map((word, i, arr) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-top">
                <motion.span
                  className="mr-[0.28em] inline-block text-[clamp(2.4rem,1.4rem+4.4vw,5.2rem)]"
                  initial={{ y: "110%" }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.05, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base"
          >
            Ocean, air, and overland freight engineered end-to-end — booked in minutes,
            tracked in real time, and delivered with a 99% on-time record.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <GoldButton onClick={() => openQuoteModal()} className="px-8 py-4 text-sm">
              <Calculator className="h-4 w-4" /> Get Instant Quote
            </GoldButton>
            <GhostButton dark href="#services" className="px-8 py-4 text-sm">
              Explore Services <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </GhostButton>
          </motion.div>

          {/* mini stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6"
          >
            {[
              ["18K+", "Shipments moved"],
              ["99%", "On-time delivery"],
              ["24/7", "Control tower"],
            ].map(([v, l]) => (
              <div key={l} className="flex items-baseline gap-2.5">
                <span className="font-anton text-2xl text-[#E2C876]">{v}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Slide controls */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          <button
            onClick={() => setCurrent((p) => (p === 0 ? banners.length - 1 : p - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:border-[#C59B24] hover:bg-[#C59B24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                className="group relative h-2.5 w-2.5 cursor-pointer rounded-full outline-none"
              >
                <span className={`absolute inset-0 rounded-full transition-colors ${i === current ? "bg-[#C59B24]" : "bg-white/40 group-hover:bg-white/70"}`} />
                {i === current && !reduce && (
                  <motion.span
                    key={`p-${current}`}
                    className="absolute inset-0 rounded-full ring-2 ring-[#C59B24]/60"
                    initial={{ scale: 1, opacity: 0.9 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrent((p) => (p + 1) % banners.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:border-[#C59B24] hover:bg-[#C59B24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 right-6 z-20 hidden flex-col items-center gap-2 lg:flex"
        aria-hidden="true"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 [writing-mode:vertical-lr]">Scroll</span>
        <div className="h-14 w-[2px] overflow-hidden bg-white/15">
          <motion.span
            className="block h-1/2 w-full bg-[#C59B24]"
            animate={reduce ? {} : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   SECTION 2 — MARQUEE TICKER (trust strip)
============================================================ */
function TickerSection() {
  const reduce = useReducedMotion();
  const items = ["OCEAN FREIGHT", "◆", "AIR FREIGHT", "◆", "CUSTOMS CLEARANCE", "◆", "WAREHOUSING", "◆", "BREAK BULK", "◆", "DOOR TO DOOR", "◆", "CROSS STUFFING", "◆", "TRANSPORTATION", "◆"];
  return (
    <div className="relative overflow-hidden border-y border-[#E2C876]/40 bg-[#0D1424] py-4" aria-hidden="true">
      <div className={`flex w-max items-center gap-8 ${reduce ? "" : "animate-brand-scroll"}`}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className={`whitespace-nowrap text-xs font-black uppercase tracking-[0.3em] ${t === "◆" ? "text-[#C59B24]" : "text-white/80"}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0D1424] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0D1424] to-transparent" />
    </div>
  );
}

/* ============================================================
   SECTION 3 — CAPABILITIES ("How we help")
============================================================ */
function CapabilitiesSection() {
  const reduce = useReducedMotion();
  const cards = [
    { icon: Zap, title: "AI-Route Logic", note: "GPS Tracking",
      text: "Real-time telemetry and dynamic routing bypass congested shipping lanes automatically." },
    { icon: Globe, title: "Worldwide Reach", note: "120+ Ports",
      text: "Seamless connectivity across strategic ports, air terminals, and inland hubs." },
    { icon: ShieldCheck, title: "Full Assurance", note: "100% Insured",
      text: "Licensed customs clearance, bonded security, and comprehensive cargo insurance." },
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Left copy + cards */}
        <div className="space-y-8 lg:col-span-7">
          <div>
            <Reveal><Eyebrow>End-to-End Freight Capabilities</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.4rem)] uppercase leading-[1.02] text-[#1D2A4C]">
                Engineering Seamless <span className="text-[#C59B24]">Global Trade</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                At Steadfast Shipping Lines, we simplify complex freight corridors. Whether navigating
                oceanic trade lanes, express aviation links, or bonded inland transit, our dispatch
                network safeguards cargo from booking to final handoff.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={0.1 + i * 0.1}>
                <motion.div
                  whileHover={reduce ? {} : { y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="group h-full rounded-2xl border border-[#E2C876]/50 bg-[#FDF9EE] p-5 transition-colors duration-300 hover:border-[#C59B24]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#C59B24] shadow-sm ring-1 ring-[#E2C876]/60 transition-all duration-300 group-hover:bg-[#C59B24] group-hover:text-white">
                    <c.icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-base font-extrabold text-[#1D2A4C]">{c.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{c.text}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#B0891E]">
                    <span>{c.note}</span>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-4 pt-2">
              <GoldButton onClick={() => openQuoteModal("Ocean Freight")}>
                Request Rapid Dispatch <ArrowRight className="h-4 w-4" />
              </GoldButton>
              <GhostButton href="/about-us">Company Credentials</GhostButton>
            </div>
          </Reveal>
        </div>

        {/* Right visual with floating badges */}
        <div className="relative lg:col-span-5">
          <Reveal delay={0.15}>
            <div className="relative mx-auto max-w-lg">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#1D2A4C]/10 via-[#C59B24]/25 to-transparent blur-xl" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-[#D7DCE0] shadow-2xl">
                <Image
                  src="/images/home/how-we-help.jpg"
                  alt="Steadfast Shipping cargo terminal operations"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/50 via-transparent to-transparent" />
              </div>

              {/* floating badge 1 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                animate={reduce ? {} : { y: [0, -8, 0] }}
                className="absolute -right-3 -top-5 flex items-center gap-3 rounded-2xl border border-[#D7DCE0] bg-white/95 p-3.5 shadow-xl backdrop-blur-md sm:-right-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-extrabold text-[#1D2A4C]">99.8% On-Time</span>
                  <span className="block text-[10px] font-semibold text-slate-500">Vessel & flight dispatch</span>
                </span>
              </motion.div>

              {/* floating badge 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
                animate={reduce ? {} : { y: [0, 8, 0] }}
                className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#141E36]/95 p-3.5 text-white shadow-2xl backdrop-blur-md sm:-left-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C59B24] text-[#141E36]">
                  <Ship className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-extrabold text-[#E2C876]">Tier-1 Carrier Contracts</span>
                  <span className="block text-[10px] font-medium text-slate-300">Direct slot allocations</span>
                </span>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 4 — SERVICES GRID (filterable, animated)
============================================================ */
function ServicesSection() {
  const [tab, setTab] = useState("all");
  const filtered = useMemo(
    () => (tab === "all" ? SERVICES : SERVICES.filter((s) => s.category === tab)),
    [tab]
  );

  return (
    <section id="services" className="relative border-y border-[#D7DCE0]/60 bg-[#F4F6F8] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          center
          eyebrow="Full-Spectrum Cargo Capabilities"
          title={<>Tailored Freight for <span className="text-[#C59B24]">Every Enterprise</span></>}
          sub="From full-container sea voyages and express air freight to bonded warehousing and licensed customs brokerage — one logistics matrix, nine specializations."
        />

        {/* Filter tabs */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5" role="tablist" aria-label="Service categories">
            {SERVICE_TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={`relative rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] focus-visible:ring-offset-2 ${
                    active ? "text-white" : "text-slate-600 hover:text-[#1D2A4C]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="service-tab-pill"
                      className="absolute inset-0 rounded-full bg-[#1D2A4C] shadow-lg shadow-[#1D2A4C]/25"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Cards */}
        <motion.div layout className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((svc) => {
              const Icon = svc.icon;
              return (
                <motion.article
                  key={svc.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
                >
                  {/* image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/85 via-[#0D1424]/20 to-transparent" />
                    <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                      {svc.tag}
                    </span>
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C59B24] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white drop-shadow">{svc.category}</span>
                    </div>
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-anton text-xl uppercase tracking-wide text-[#1D2A4C] transition-colors group-hover:text-[#B0891E]">
                      {svc.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{svc.description}</p>

                    <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                      {svc.perks.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#C59B24]" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <Link
                        href={`/${svc.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#1D2A4C] px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#C59B24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A4C] focus-visible:ring-offset-2"
                      >
                        Explore
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <button
                        onClick={() => openQuoteModal(svc.title)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#B0891E] transition-colors hover:text-[#1D2A4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] rounded px-1"
                      >
                        <Calculator className="h-3.5 w-3.5" />
                        Instant Rate
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 5 — ABOUT (navy split)
============================================================ */
function AboutSection() {
  const reduce = useReducedMotion();
  const pillars = [
    { icon: TrendingUp, title: "Advanced Technology", text: "AI-powered route optimization and real-time tracking raise delivery efficiency and accuracy across every shipment." },
    { icon: ShieldCheck, title: "Sustainable Practices", text: "Low-emission fleets and carbon-offset programs reduce the environmental footprint of every corridor we run." },
    { icon: Award, title: "Industry-Specific Solutions", text: "Tailored logistics for healthcare, retail, automotive, and technology — specialized handling per sector." },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0D1424] py-20 text-white lg:py-28">
      {/* ambient */}
      <div className="sf-dots absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#C59B24]/10 blur-[130px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left */}
        <div className="space-y-6">
          <Reveal><Eyebrow dark>About Steadfast</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3.4rem)] uppercase leading-[1.02] text-white">
              We Are Steadfast <span className="text-[#E2C876]">Shipping Lines</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Your trusted partner in global logistics — innovative, reliable transportation solutions
              moved by expert teams and advanced technology. Seamless, efficient, and secure delivery
              of your goods is the whole point of our existence.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C59B24]/15 font-anton text-lg text-[#E2C876] ring-1 ring-[#C59B24]/30">
                15+
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">Executive Leadership</div>
                <div className="text-xs font-semibold text-[#E2C876]">Founder & CEO — driving a 15-year growth record</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <GoldButton href="/about-us" className="mt-2">About Us <ArrowUpRight className="h-4 w-4" /></GoldButton>
          </Reveal>
        </div>

        {/* Right pillars */}
        <div className="space-y-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.12}>
              <motion.div
                whileHover={reduce ? {} : { x: 8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-colors duration-300 hover:border-[#C59B24]/50 hover:bg-white/[0.07]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C59B24]/15 text-[#E2C876] ring-1 ring-[#C59B24]/30 transition-all duration-300 group-hover:bg-[#C59B24] group-hover:text-[#141E36]">
                  <p.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">{p.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{p.text}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 6 — MISSION & VISION
============================================================ */
function MissionVisionSection() {
  const reduce = useReducedMotion();
  const cards = [
    { icon: Compass, kicker: "Core Commitment", title: "Our Mission", accent: "gold",
      text: "To engineer reliable, innovative, and cost-effective freight architectures that consistently surpass client expectations — streamlining international commerce through operational discipline and human expertise.",
      tags: ["Precision Handling", "Multimodal Velocity", "Customer Advocacy"] },
    { icon: Globe, kicker: "Global Horizon", title: "Our Vision", accent: "navy",
      text: "To be the foremost global maritime logistics partner, recognized for setting the industry standard in technological transparency, sustainable trade corridors, and zero-compromise freight safety.",
      tags: ["Global Scale", "Digital Transparency", "Zero-Delay Standards"] },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          center
          eyebrow="Guiding Principles"
          title={<>Purpose & <span className="text-[#C59B24]">Long-Term Vision</span></>}
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={0.12 + i * 0.14}>
              <motion.div
                whileHover={reduce ? {} : { y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`group relative h-full overflow-hidden rounded-[1.75rem] border-2 p-8 sm:p-10 ${
                  c.accent === "gold"
                    ? "border-[#E2C876]/60 bg-gradient-to-b from-[#FDF9EE] to-white"
                    : "border-[#D7DCE0] bg-gradient-to-b from-white to-[#F4F6F8]"
                }`}
              >
                <c.icon
                  className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 text-[#1D2A4C]/[0.05] transition-colors duration-500 group-hover:text-[#C59B24]/10"
                  aria-hidden="true"
                />
                <div className="relative z-10 space-y-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ring-1 transition-transform duration-300 group-hover:scale-110 ${
                    c.accent === "gold" ? "bg-[#C59B24] text-white ring-[#E2C876]" : "bg-[#1D2A4C] text-[#E2C876] ring-[#D7DCE0]"
                  }`}>
                    <c.icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <div>
                    <span className={`text-[11px] font-black uppercase tracking-[0.24em] ${c.accent === "gold" ? "text-[#B0891E]" : "text-[#1D2A4C]/60"}`}>
                      {c.kicker}
                    </span>
                    <h3 className="mt-1 font-anton text-3xl uppercase tracking-wide text-[#1D2A4C]">{c.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{c.text}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full border border-[#D7DCE0] bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 7 — WHY CHOOSE US (hover tilt cards)
============================================================ */
function WhySection() {
  const reduce = useReducedMotion();
  const items = [
    { icon: Clock, title: "24/7 Control Tower", link: "Always-on support",
      text: "Dedicated coordinators manage round-the-clock dispatches, live tracking, and immediate exception handling." },
    { icon: CheckCircle2, title: "Guaranteed Space", link: "Direct carrier allotment",
      text: "Longstanding slot contracts with premier container lines secure capacity even in peak season." },
    { icon: Globe, title: "Worldwide Network", link: "120+ international ports",
      text: "A freight matrix linking Asia, Europe, the Middle East, the Americas, and CIS trade routes." },
    { icon: ShieldCheck, title: "100% Insured Transit", link: "Insured cargo protocols",
      text: "Complete risk mitigation — bonded escorts and comprehensive marine insurance on every shipment." },
  ];

  return (
    <section className="border-y border-[#D7DCE0]/60 bg-[#F4F6F8] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          center
          eyebrow="The Steadfast Advantage"
          title={<>Why Multinationals <span className="text-[#C59B24]">Choose Us</span></>}
          sub="World-class maritime infrastructure combined with personalized freight care."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={0.08 + i * 0.1}>
              <motion.div
                whileHover={reduce ? {} : { y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group relative h-full overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-2xl"
              >
                {/* gold sweep on hover */}
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#B0891E] to-[#E2C876] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#C59B24]/[0.07] transition-transform duration-500 group-hover:scale-[2.2]" aria-hidden="true" />

                <div className={`flex h-13 w-13 items-center justify-center rounded-xl shadow-sm ring-1 transition-all duration-300 group-hover:scale-110 ${
                  i % 2 === 0
                    ? "bg-[#FDF9EE] text-[#C59B24] ring-[#E2C876]/60 group-hover:bg-[#C59B24] group-hover:text-white"
                    : "bg-[#1D2A4C]/[0.06] text-[#1D2A4C] ring-[#D7DCE0] group-hover:bg-[#1D2A4C] group-hover:text-[#E2C876]"
                }`}>
                  <it.icon className="h-6 w-6" strokeWidth={2.1} />
                </div>
                <h3 className="mt-5 text-base font-extrabold text-[#1D2A4C]">{it.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{it.text}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#B0891E]">
                  {it.link} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 8 — GALLERY (hover zoom + live badges)
============================================================ */
function GallerySection() {
  const reduce = useReducedMotion();
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          center
          eyebrow="Operations in Motion"
          title={<>Working <span className="text-[#C59B24]">Highlights</span></>}
          sub="A glimpse into daily terminal operations, maritime voyages, and logistics hubs worldwide."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {GALLERY.map((g, i) => (
            <Reveal key={g.label} delay={0.05 + i * 0.07}>
              <motion.div
                whileHover={reduce ? {} : { y: -6 }}
                className="group relative h-60 cursor-pointer overflow-hidden rounded-2xl border border-[#D7DCE0] shadow-md lg:h-64"
              >
                <Image
                  src={g.img}
                  alt={g.label}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:rotate-1 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/90 via-[#0D1424]/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                  <span className={`h-1.5 w-1.5 rounded-full bg-[#C59B24] ${reduce ? "" : "animate-pulse"}`} />
                  Live Ops
                </div>
                <div className="absolute inset-x-3 bottom-3">
                  <div className="text-[11px] font-black uppercase tracking-wide text-[#E2C876] drop-shadow">{g.label}</div>
                  <div className="mt-0.5 line-clamp-1 text-[10px] font-medium text-slate-300">{g.sub}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 9 — CTA BAND
============================================================ */
function CtaBand() {
  return (
    <section className="relative overflow-hidden border-y border-[#C59B24]/30 bg-[#0D1424] py-16 text-white lg:py-20">
      <div className="sf-dots absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C59B24]/15 blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
        <div className="max-w-2xl space-y-3">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C59B24]/40 bg-[#C59B24]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#E2C876]">
              <ShieldCheck className="h-3.5 w-3.5" /> Guaranteed Freight Escort
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="font-anton text-[clamp(1.7rem,1.1rem+2.4vw,2.8rem)] uppercase leading-[1.05] text-white">
              Reach Your Destination <span className="text-[#E2C876]">100% Safe & Secure</span>
            </h3>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              Connect with our 24/7 dispatch desk for real-time rates, space confirmations, and custom container allocations.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GoldButton onClick={() => openQuoteModal()} className="px-8 py-4">
              <Calculator className="h-4 w-4" /> Request Instant Quote
            </GoldButton>
            <GhostButton dark href="tel:+923127777952" className="px-6 py-4">
              <Phone className="h-4 w-4 text-[#E2C876]" /> Call Dispatch
            </GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 10 — TESTIMONIALS
============================================================ */
function TestimonialsSection() {
  const reduce = useReducedMotion();
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          center
          eyebrow="Verified Client Testimonials"
          title={<>Trusted by Shippers <span className="text-[#C59B24]">Worldwide</span></>}
        />
        <Reveal delay={0.1}>
          <div className="mt-4 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={reduce ? {} : { opacity: 0, scale: 0 }}
                whileInView={reduce ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 15 }}
              >
                <Star className="h-4 w-4 fill-[#C59B24] text-[#C59B24]" />
              </motion.span>
            ))}
            <span className="ml-2 text-xs font-bold text-slate-700">4.9 / 5.0 Enterprise Satisfaction</span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={0.1 + i * 0.12}>
              <motion.figure
                whileHover={reduce ? {} : { y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-2xl"
              >
                <span className="pointer-events-none absolute -right-2 -top-6 font-anton text-[6rem] leading-none text-[#C59B24]/10" aria-hidden="true">&ldquo;</span>
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-[#C59B24] text-[#C59B24]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{r.route}</div>
                  <blockquote className="text-xs leading-relaxed text-slate-600 sm:text-sm">&ldquo;{r.text}&rdquo;</blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${i % 2 === 0 ? "bg-[#1D2A4C] text-[#E2C876]" : "bg-[#C59B24] text-white"}`}>
                    {r.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-[#1D2A4C]">{r.name}</span>
                    <span className="block text-xs text-slate-500">{r.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 11 — QUOTE FORM (image bg + glass card)
============================================================ */
function QuoteSection() {
  const reduce = useReducedMotion();
  const [freight, setFreight] = useState("Ocean Freight");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const ref = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone,
          subject: `Quote Request for ${freight} (${origin} -> ${destination})`,
          service: freight,
          comments: `Origin: ${origin}, Destination: ${destination}, Requested via Home Quote Banner`,
          formType: "quote",
        }),
      });
      setSuccess(true);
      setName(""); setEmail(""); setPhone(""); setOrigin(""); setDestination("");
    } catch {
      setSuccess(true);
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccess(false), 7000);
    }
  };

  const fieldCls = "w-full rounded-xl border border-[#D7DCE0] bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B24]";
  const labelCls = "mb-1.5 block text-[11px] font-black uppercase tracking-wider text-[#1D2A4C]";

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/home/quote-banner.webp')" }} aria-hidden="true" />
      <div className="absolute inset-0 bg-[#0A1224]/70" aria-hidden="true" />
      <div className="sf-dots absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal><Eyebrow dark center>Request a Free Quote</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 font-anton text-[clamp(1.9rem,1.2rem+2.6vw,3rem)] uppercase text-white">
              Get Your <span className="text-[#E2C876]">Freight Rate</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 rounded-[1.5rem] border border-white/40 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
                role="status"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-extrabold text-[#1D2A4C]">Quote Request Received!</h4>
                <p className="mx-auto max-w-md text-sm text-slate-600">
                  Our freight desk has logged your route details — expect a competitive estimation within 2 business hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5" noValidate={false}>
                <div>
                  <label htmlFor="qf-freight" className={labelCls}>Freight Service</label>
                  <div className="relative">
                    <select
                      id="qf-freight"
                      value={freight}
                      onChange={(e) => setFreight(e.target.value)}
                      className={`${fieldCls} cursor-pointer appearance-none font-semibold`}
                    >
                      {["Air Freight","Ocean Freight","Customs Clearance","Warehousing","Cargo Services","Break Bulk Cargo","Door to door delivery","Cross Stuffing","Transportation"].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qf-origin" className={labelCls}>Departure City / Port</label>
                    <input id="qf-origin" required placeholder="e.g. Shanghai" autoComplete="off" value={origin} onChange={(e) => setOrigin(e.target.value)} className={fieldCls} />
                  </div>
                  <div>
                    <label htmlFor="qf-dest" className={labelCls}>Delivery City / Port</label>
                    <input id="qf-dest" required placeholder="e.g. Karachi" autoComplete="off" value={destination} onChange={(e) => setDestination(e.target.value)} className={fieldCls} />
                  </div>
                  <div>
                    <label htmlFor="qf-name" className={labelCls}>Your Name</label>
                    <input id="qf-name" required placeholder="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={fieldCls} />
                  </div>
                  <div>
                    <label htmlFor="qf-phone" className={labelCls}>Phone Number</label>
                    <input id="qf-phone" type="tel" required placeholder="+92 3xx xxxxxxx" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={fieldCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="qf-email" className={labelCls}>Email Address</label>
                    <input id="qf-email" type="email" required placeholder="you@company.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldCls} />
                  </div>
                </div>

                <GoldButton type="submit" disabled={submitting} className="w-full py-4 text-sm">
                  {submitting ? (
                    <>
                      <motion.span
                        className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                        animate={reduce ? {} : { rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Sending…
                    </>
                  ) : (
                    <>Get My Quote <ArrowRight className="h-4 w-4" /></>
                  )}
                </GoldButton>
                <p className="text-center text-[11px] text-slate-400">
                  Response within 2 business hours · No spam, ever
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 12 — SERVICE AREAS (ports)
============================================================ */
function ServiceAreasSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="space-y-6 lg:col-span-8">
          <Reveal><Eyebrow>Our Service Areas</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-anton text-[clamp(1.7rem,1.1rem+2.4vw,2.9rem)] uppercase leading-[1.05] text-[#1D2A4C]">
              Regular Services From <span className="text-[#C59B24]">All Major Ports</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Our network spans domestic and international routes — major ports, cities, and
              transportation hubs. Whether your shipment is local or global, we have the resources
              to move it safely and on time.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {MAJOR_PORTS.map((port, i) => (
                <motion.div
                  key={port + i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.5), ease: EASE }}
                  className="cursor-default rounded-lg border border-[#D7DCE0] bg-[#F4F6F8] px-3 py-2 text-center text-[11px] font-black uppercase tracking-wider text-[#1D2A4C] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C59B24] hover:bg-[#FDF9EE] hover:text-[#B0891E]"
                >
                  {port}
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C59B24]" />
              We also extend services to CIS countries — Afghanistan, Georgia, Azerbaijan, Turkmenistan, and other CIS destinations.
            </p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-4">
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-tr from-[#C59B24]/20 to-transparent blur-lg" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#D7DCE0] shadow-xl">
                <Image
                  src="/images/home/service-areas.jpg"
                  alt="Steadfast global port coverage map"
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/40 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                className="absolute -bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/20 bg-[#0D1424]/90 px-4 py-3 shadow-xl backdrop-blur-md"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Trade Lanes</span>
                <span className="font-anton text-xl text-[#E2C876]">120+</span>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 13 — PROCESS (6 steps)
============================================================ */
function ProcessSection() {
  const reduce = useReducedMotion();
  return (
    <section className="border-y border-[#D7DCE0]/60 bg-[#F4F6F8] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          center
          eyebrow="Methodical Excellence"
          title={<>A Proven <span className="text-[#C59B24]">6-Step</span> Journey</>}
          sub="Every shipment follows an audited procedural framework ensuring transparency and on-time delivery."
        />

        {/* connecting line (desktop) */}
        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-[2px] lg:block" aria-hidden="true">
            <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="h-full w-full">
              <line x1="0" y1="1" x2="100" y2="1" stroke="#C59B24" strokeWidth="2" strokeDasharray="0.8 1.2" strokeLinecap="round" className="sf-dash-flow" vectorEffect="non-scaling-stroke" opacity="0.5" />
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companyDetails.processSteps.map((st, i) => {
              const Icon = PROCESS_ICONS[st.icon] || CheckCircle2;
              return (
                <Reveal key={st.step} delay={0.06 + i * 0.08}>
                  <motion.div
                    whileHover={reduce ? {} : { y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-[#D7DCE0] bg-white p-7 shadow-sm transition-shadow duration-300 hover:border-[#C59B24]/60 hover:shadow-2xl"
                  >
                    <span className="pointer-events-none absolute -right-6 -top-8 font-anton text-[5.5rem] leading-none text-slate-100 transition-colors duration-500 group-hover:text-[#C59B24]/15" aria-hidden="true">
                      {st.step}
                    </span>
                    <div className="relative z-10">
                      <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#1D2A4C] text-[#E2C876] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-white">
                        <Icon className="h-6 w-6" strokeWidth={2.1} />
                      </div>
                      <div className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-[#B0891E]">Stage {st.step}</div>
                      <h3 className="mt-1 font-anton text-lg uppercase tracking-wide text-[#1D2A4C]">{st.title}</h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">{st.description}</p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 14 — FAQ (accordion + support card)
============================================================ */
function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="space-y-8 lg:col-span-7">
          <SectionHead
            eyebrow="Freight Intelligence"
            title={<>Frequently Asked <span className="text-[#C59B24]">Questions</span></>}
            sub="Clear answers on international shipping, customs documentation, and container bookings."
          />

          <div className="space-y-3">
            {companyDetails.faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={i} delay={0.04 + i * 0.05}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen ? "border-[#C59B24] bg-[#FDF9EE]/40 shadow-lg" : "border-[#D7DCE0] bg-white hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-[#1D2A4C] transition-colors hover:text-[#B0891E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B24] rounded-2xl"
                    >
                      <span className="flex items-center gap-3.5">
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-black transition-colors ${
                          isOpen ? "bg-[#C59B24] text-white" : "bg-slate-100 text-slate-500"
                        }`}>
                          {i + 1}
                        </span>
                        {faq.q}
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE }} className="shrink-0 text-[#C59B24]">
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-[#E2C876]/40 px-5 pb-5 pt-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-5">
          <Reveal delay={0.15}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-[#D7DCE0] shadow-2xl">
              <Image
                src="/images/home/faq-ship.jpg"
                alt="Container ship at port"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E2C876]">Always-On Operations Desk</div>
                <div className="mt-1 text-base font-extrabold text-white">24/7 Real-Time Vessel Tracking</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#141E36] to-[#0D1424] p-7 text-white shadow-xl">
              <div className="sf-dots absolute inset-0 opacity-20" aria-hidden="true" />
              <div className="relative space-y-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C59B24] text-[#141E36]">
                    <Headphones className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold">Have a Specific Cargo Question?</h4>
                    <span className="text-xs text-slate-300">Speak directly with a freight specialist</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  Our dispatch desk is active 24/7 for route inquiries, hazardous cargo rules, and port tariffs.
                </p>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <a href="tel:+923127777952" className="inline-flex items-center gap-2 text-xs font-bold text-[#E2C876] hover:underline">
                    <Phone className="h-3.5 w-3.5" /> +92 312 7777952
                  </a>
                  <button
                    onClick={() => openQuoteModal()}
                    className="rounded-lg bg-[#C59B24] px-4 py-2 text-[11px] font-black uppercase tracking-wider text-white transition-colors hover:bg-[#B0891E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Ask Online
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 15 — STATS BAND (counters)
============================================================ */
function StatsSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden border-t border-[#C59B24]/20 bg-[#0D1424] py-20 text-white lg:py-24">
      <div className="sf-dots absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C59B24]/10 blur-[140px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          center
          dark
          eyebrow="Proven Operational Record"
          title={<>Our Commitment, <span className="text-[#E2C876]">Your Success</span></>}
          sub="Powering international commerce with precision freight forwarding, strict cargo assurance, and round-the-clock reliability."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.08 + i * 0.1}>
              <motion.div
                whileHover={reduce ? {} : { y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center shadow-xl backdrop-blur-md transition-colors duration-300 hover:border-[#C59B24]/60 hover:bg-white/[0.08] ${
                  i === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C59B24]/15 text-[#E2C876] ring-1 ring-[#C59B24]/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36]">
                  <s.icon className="h-6 w-6" strokeWidth={2.1} />
                </div>
                <div className="font-anton text-3xl tracking-tight text-white transition-colors group-hover:text-[#E2C876] sm:text-4xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-300">{s.label}</div>
                <div className="mt-1 text-[10px] text-slate-500">{s.note}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
