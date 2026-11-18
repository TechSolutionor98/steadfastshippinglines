"use client";

import React, { useState, useEffect } from "react";
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
  HeartHandshake
} from "lucide-react";
import { companyDetails, servicesData } from "@/data/steadfastData";

export default function HomePage({ cmsContent }) {
  // Dynamic Hero Banners State - Managed via Admin Panel
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

  // Fetch live banners from API
  useEffect(() => {
    fetch("/api/banners")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.banners) && data.banners.length > 0) {
          setHeroBanners(data.banners);
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

  // Quote Form State in Section 10
  const [quoteFreight, setQuoteFreight] = useState("Air Freight");
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
      setTimeout(() => setQuoteSuccess(false), 6000);
    }
  };

  // FAQ Accordion State (Section 13)
  const [openFaq, setOpenFaq] = useState(0);

  // Section 3: "OUR SERVICES" / "WHAT WE PROVIDE" (Exact 9 Services)
  const servicesProvided = [
    {
      title: "Ocean Freight",
      shortTitle: "Ocean Freight",
      slug: "ocean-freight",
      image: "/images/home/ocean.jpg",
      description: "Ocean freight is a cost-effective and reliable method of transporting large quantities of goods across long distances.",
    },
    {
      title: "Air Freight",
      shortTitle: "Air Freight",
      slug: "air-freight",
      image: "/images/home/air.jpg",
      description: "Air freight is the fastest and most reliable method of transporting goods over long distances. At Steadfast Shipping Lines (Pvt) Ltd, our air freight solutions ensure time-critical delivery worldwide.",
    },
    {
      title: "Custom Clearance",
      shortTitle: "Custom Clearance",
      slug: "customs-clearance-service",
      image: "/images/home/customs.jpg",
      description: "Customs clearance is a critical step in international trade, ensuring that goods comply with all regulatory requirements.",
    },
    {
      title: "Warehousing",
      shortTitle: "Warehousing",
      slug: "warehousing-service",
      image: "/images/home/warehouse.jpg",
      description: "Effective warehousing is crucial for managing and optimizing your supply chain, providing secure and efficient storage.",
    },
    {
      title: "Cargo Service",
      shortTitle: "Cargo Service",
      slug: "cargo-services",
      image: "/images/home/cargo.jpg",
      description: "Cargo services are essential for managing the safe and efficient transport of goods across various modes of transportation.",
    },
    {
      title: "Break Bulk Cargo",
      shortTitle: "Break Bulk Cargo",
      slug: "break-bulk-cargo-service",
      image: "/images/home/break-bulk.jpg",
      description: "Break bulk cargo refers to goods that are transported in non-standardized packages from all over.",
    },
    {
      title: "Door to Door",
      shortTitle: "Door to Door",
      slug: "door-to-door-delievery",
      image: "/images/home/door.jpg",
      description: "Door-to-door delivery is an essential service for businesses and individuals seeking reliable delivery solutions.",
    },
    {
      title: "Cross Stuffing",
      shortTitle: "Cross Stuffing",
      slug: "cross-stuffing-service",
      image: "/images/home/cross-stuffing.jpg",
      description: "Cross-stuffing, also known as cross-docking, is a logistics process designed to optimize the handling and transfer of goods.",
    },
    {
      title: "Transportation",
      shortTitle: "Transportation",
      slug: "transportation-service",
      image: "/images/home/road.jpg",
      description: "Transportation is a vital component of logistics, encompassing the movement of goods from one location to another.",
    },
  ];

  // Major ports list
  const majorPorts = [
    "CHAINA", "JAPAN", "KOREA", "VIETNAM", "MALAYSIA", "HONG KONG",
    "SINGAPORE", "GERMANY", "FRANCE", "ITALY", "NETHERLAND", "SPAIN",
    "BRAZIL", "GEORGIA", "YAMEN", "SYRIA", "IRAN", "TURKEY",
    "INDIA", "PAKISTAN", "USA", "AUSTRALIA", "BAHRAIN", "KUWAIT",
    "OMAN", "IRAQ EGYPT", "SUDAN", "KSA", "SRI LANKA", "BANGLADESH",
    "NEPAL", "MALDIVES", "QATAR"
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* =========================================================================
          SECTION 1: HERO BANNER SLIDER (Steadfast Hero Banner)
          Dynamic Image Slider with Admin Title Heading & Live CMS Integration
      ========================================================================== */}
      <section className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[620px] xl:h-[680px] flex items-center justify-center text-white overflow-hidden bg-[#141E36]">
        {heroBanners.map((slide, idx) => {
          const isCurrent = idx === currentSlide;
          const bgUrl = slide.imageUrl || slide.bgImage;

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

              {/* Dynamic Title Heading from Admin */}
              {slide.showText !== false && slide.title && (
                <div
                  className={`relative z-20 w-full h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 ${
                    slide.textAlign === 'left'
                      ? 'items-start text-left'
                      : slide.textAlign === 'right'
                      ? 'items-end text-right'
                      : 'items-center text-center'
                  }`}
                >
                  <div
                    className={`max-w-4xl space-y-3 sm:space-y-4 animate-in fade-in duration-700 ${
                      slide.textAlign === 'left'
                        ? 'mr-auto'
                        : slide.textAlign === 'right'
                        ? 'ml-auto'
                        : 'mx-auto'
                    }`}
                  >
                    <h1
                      className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.15] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
                      style={{ color: slide.textColor || '#ffffff' }}
                    >
                      {slide.title}
                    </h1>

                    <div
                      className={`w-16 sm:w-24 h-1 sm:h-1.5 rounded-full shadow-lg ${
                        slide.textAlign === 'left'
                          ? 'mr-auto'
                          : slide.textAlign === 'right'
                          ? 'ml-auto'
                          : 'mx-auto'
                      }`}
                      style={{
                        backgroundColor:
                          slide.textColor && slide.textColor.toLowerCase() === '#c59b24'
                            ? '#ffffff'
                            : '#C59B24',
                      }}
                    />

                    {slide.link && (
                      <div className="pt-3">
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
              )}
            </div>
          );
        })}

        {/* Slider Controls: Prev/Next Arrows and Dots */}
        {heroBanners.length > 1 && (
          <>
            {/* Prev Button */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1))}
              className="absolute left-3 sm:left-6 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/40 hover:bg-[#C59B24] text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-xl"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroBanners.length)}
              className="absolute right-3 sm:right-6 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/40 hover:bg-[#C59B24] text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-xl"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>

            {/* Indicator Dots */}
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
          SECTION 2: "HOW WE CAN HELP YOU" (Left text with 3 items + Right image)
          Theme Colors: White surface, Navy #1D2A4C titles, Gold #C59B24 highlights
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">SUPPORT & EFFICIENCY</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D2A4C] mt-1">
                How We Can Help You
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At Steadfast Shipping Lines (Pvt) Ltd, we are dedicated to providing comprehensive logistics solutions tailored to meet your business needs. Here’s how we can support you:
            </p>

            <div className="space-y-5 pt-2">
              {/* Item 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FDF9EE] text-[#C59B24] flex items-center justify-center shrink-0 border border-[#E2C876]/40 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-[#C59B24]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1D2A4C]">Innovative Technology</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Leveraging cutting-edge technology, we optimize routes and track shipments in real-time for maximum efficiency.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1D2A4C]/10 text-[#1D2A4C] flex items-center justify-center shrink-0 border border-[#D7DCE0] mt-1">
                  <CheckCircle2 className="w-5 h-5 text-[#1D2A4C]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1D2A4C]">Worldwide Reach</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    With a vast network of global partners, we provide reliable logistics solutions across international borders.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FDF9EE] text-[#C59B24] flex items-center justify-center shrink-0 border border-[#E2C876]/40 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-[#C59B24]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1D2A4C]">Comprehensive Services</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    From warehousing and packaging to air, sea, and road freight, we provide a full spectrum of logistics services to streamline your supply chain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] ring-1 ring-[#D7DCE0]">
              <Image
                src="/images/home/how-we-help.jpg"
                alt="Steadfast Shipping Cargo Yard"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "OUR SERVICES" / "WHAT WE PROVIDE" (Cards with Images)
          Theme Colors: Light Silver #F4F6F8 backdrop, White Cards, Gold & Navy Accents
          100% Clear Images - NO Opacity Overlay
      ========================================================================== */}
      <section className="bg-[#F4F6F8] py-20 px-4 sm:px-8 border-y border-[#D7DCE0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">OUR SERVICES</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D2A4C] mt-1">
              WHAT WE PROVIDE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesProvided.map((svc) => (
              <div
                key={svc.slug}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-[#D7DCE0] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Service Image Banner on Top - 100% Clear without Opacity */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-100"
                    />
                    <span className="absolute bottom-3 left-4 text-xs font-bold text-[#C59B24] uppercase tracking-wider bg-[#1D2A4C] px-2.5 py-1 rounded shadow-md border border-[#C59B24]/30">
                      {svc.shortTitle}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#1D2A4C] mb-2 group-hover:text-[#C59B24] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {svc.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/${svc.slug}`}
                    className="inline-block px-5 py-2.5 rounded-md bg-[#1D2A4C] hover:bg-[#C59B24] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            ))}
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
          SECTION 5: OUR MISSION & OUR VISION (2 Clean Cards)
          Theme Colors: White cards, Navy #1D2A4C titles, Gold #C59B24 accents
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#D7DCE0] shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-[#1D2A4C]">OUR MISSION</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              At Steadfast Shipping Lines (Pvt) Ltd, our mission is to provide innovative, reliable, and efficient logistics and transportation solutions that exceed our clients&apos; expectations. We strive to simplify global trade, ensuring seamless movement of goods with unparalleled service and support.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#D7DCE0] shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/40 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-[#1D2A4C]">OUR VISION</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our vision is to be a leading global logistics provider, recognized for our commitment to excellence, customer satisfaction, and sustainable practices. We aim to set new standards in the industry, driving growth and success for our clients and partners worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: "WHY CHOOSE Steadfast Shipping Lines" (3 Round Icon Highlights)
          Theme Colors: Light Silver #F4F6F8 backdrop, White Cards, Navy #1D2A4C & Gold
      ========================================================================== */}
      <section className="bg-[#F4F6F8] py-20 px-4 sm:px-8 border-y border-[#D7DCE0]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-14">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">WHY CHOOSE US</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D2A4C] mt-1">
              WHY CHOOSE Steadfast Shipping Lines (Pvt) Ltd
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#D7DCE0] shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/50 flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2A4C]">24/7 support</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our customer service team is available 24/7 to assist with any questions or issues, ensuring peace of mind and continuous support.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#D7DCE0] shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1D2A4C]/10 text-[#1D2A4C] border border-[#D7DCE0] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#1D2A4C]" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2A4C]">On time delivery</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We pride ourselves on our reliability, ensuring your shipments are delivered on schedule, every time, to keep your operations running smoothly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#D7DCE0] shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876]/50 flex items-center justify-center mx-auto">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2A4C]">Global service</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We customize our logistics services to meet the specific needs of your business, ensuring efficient and cost-effective results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: WORKING HIGHLIGHTS GALLERY (Visual operational gallery)
          Theme Colors: White surface with #D7DCE0 borders and gold labels
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">Reach your destination 100% safe & secure</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D2A4C] mt-1">
            Working Highlights at Steadfast Shipping Lines (Pvt) Ltd
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { img: "/images/home/ocean.jpg", label: "Ocean Maritime" },
            { img: "/images/home/air.jpg", label: "Air Cargo Flights" },
            { img: "/images/home/road.jpg", label: "Fleet Highway Logistics" },
            { img: "/images/home/warehouse.jpg", label: "Secure Warehousing" },
            { img: "/images/home/how-we-help.jpg", label: "Container Terminals" },
            { img: "/images/home/door.jpg", label: "Doorstep Delivery" },
          ].map((item, idx) => (
            <div key={idx} className="relative h-56 rounded-xl overflow-hidden shadow-sm border border-[#D7DCE0] group">
              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141E36]/90 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-3 left-3 right-3 text-center text-xs font-bold text-[#C59B24] drop-shadow">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: CTA BAR ("Reach your destination 100% safe & secure")
          Theme Colors: Deep Navy #1D2A4C with Gold #C59B24 Button
      ========================================================================== */}
      <section className="bg-gradient-to-r from-[#1D2A4C] via-[#141E36] to-[#1D2A4C] text-white py-12 px-4 sm:px-8 border-y border-[#C59B24]/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Reach your destination 100% safe & secure
            </h3>
            <p className="text-xs sm:text-sm text-[#D7DCE0] mt-1">
              Contact our dispatch team for real-time rates and space allocation.
            </p>
          </div>
          <Link
            href="/quote"
            className="px-8 py-3.5 rounded-md bg-[#C59B24] hover:bg-[#B0891E] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#C59B24]/20 transition-colors shrink-0"
          >
            REQUEST A QUOTE
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: "WHAT THEY SAY" (Testimonials)
          Theme Colors: White surface, Gold stars, Navy #1D2A4C headings
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">TESTIMONIALS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D2A4C] mt-1">
            WHAT THEY SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Review 1 */}
          <div className="p-8 rounded-2xl bg-white border border-[#D7DCE0] shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-[#C59B24]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C59B24] text-[#C59B24]" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              &ldquo;Steadfast Shipping Lines (Pvt) Ltd has been a game-changer for our supply chain operations. Their efficient air freight services and real-time tracking have significantly reduced our transit times. Highly recommend their professional and reliable team!&rdquo;
            </p>
            <div className="pt-2 border-t border-[#D7DCE0]/60">
              <h4 className="text-sm font-bold text-[#1D2A4C]">Jonathon Doe</h4>
              <span className="text-xs text-slate-500">Supply Chain Director</span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="p-8 rounded-2xl bg-white border border-[#D7DCE0] shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-[#C59B24]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C59B24] text-[#C59B24]" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              &ldquo;Steadfast Shipping Lines (Pvt) Ltd&apos;s road freight services are top-notch. Their timely deliveries and expert handling of our cargo have helped us maintain a smooth supply chain. Their dedication to customer satisfaction is evident in every interaction.&rdquo;
            </p>
            <div className="pt-2 border-t border-[#D7DCE0]/60">
              <h4 className="text-sm font-bold text-[#1D2A4C]">Maria Carrol</h4>
              <span className="text-xs text-slate-500">Operations Manager</span>
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
          SECTION 12: OUR PROCESS AT STEADFAST SHIPPING LINES (6 Steps)
          Theme Colors: Light Silver #F4F6F8 backdrop, White Cards, Gold Numbers, Navy Titles
      ========================================================================== */}
      <section className="bg-[#F4F6F8] py-20 px-4 sm:px-8 border-y border-[#D7DCE0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">OUR PROCESS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D2A4C] mt-1">
              Our Process at Steadfast Shipping Lines (Pvt) Ltd
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyDetails.processSteps.map((st) => {
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
                  className="bg-white p-6 rounded-xl border border-[#D7DCE0] shadow-sm space-y-3 hover:shadow-md transition-all group hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-lg bg-[#1D2A4C] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5 text-[#C59B24]" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-[#C59B24]/40 transition-colors">
                      {st.step}
                    </span>
                  </div>
                  <div className="text-lg font-black text-[#1D2A4C] group-hover:text-[#C59B24] transition-colors">
                    {st.step}. {st.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: FREQUENTLY ASKED QUESTIONS (Left FAQs + Right Ship Image)
          Theme Colors: White surface, Navy #1D2A4C headings, Gold Chevrons & Active borders
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#C59B24] uppercase tracking-wider">FAQS</span>
              <h2 className="text-3xl font-extrabold text-[#1D2A4C] mt-1">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <div className="space-y-3">
              {companyDetails.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-xl border transition-colors overflow-hidden shadow-sm ${
                    openFaq === idx ? "border-[#C59B24]" : "border-[#D7DCE0]"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1D2A4C] hover:text-[#C59B24] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#C59B24] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-[#D7DCE0]/60 pt-2.5">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Ship Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] ring-1 ring-[#D7DCE0]">
              <Image
                src="/images/home/faq-ship.jpg"
                alt="Container Ship FAQ"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14: STATS COUNTER BAR ("Our Commitment, Your Success")
          Theme Colors: Deep Navy #141E36 & #1D2A4C with Bold Gold #C59B24 Accents
      ========================================================================== */}
      <section className="relative bg-gradient-to-b from-[#141E36] via-[#1D2A4C] to-[#141E36] text-white py-20 px-4 sm:px-8 border-t border-[#D7DCE0]/15 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C59B24] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#C59B24] uppercase tracking-widest px-3 py-1 rounded-full bg-[#C59B24]/10 border border-[#C59B24]/30 inline-block mb-3">
              PROVEN TRACK RECORD
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Our Commitment, Your Success
            </h2>
            <p className="text-xs sm:text-sm text-[#D7DCE0] mt-3 font-medium leading-relaxed">
              Powering global commerce with precision logistics, end-to-end cargo security, and round-the-clock freight reliability.
            </p>
          </div>

          {/* 5 Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors">
                2,500+
              </div>
              <div className="text-xs font-bold text-[#D7DCE0] uppercase tracking-wider mt-2">
                Happy Customers
              </div>
            </div>

            <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors">
                18,000+
              </div>
              <div className="text-xs font-bold text-[#D7DCE0] uppercase tracking-wider mt-2">
                Shipments Delivered
              </div>
            </div>

            <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <Star className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors">
                99%
              </div>
              <div className="text-xs font-bold text-[#D7DCE0] uppercase tracking-wider mt-2">
                5-Star Reviews
              </div>
            </div>

            <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors">
                24/7
              </div>
              <div className="text-xs font-bold text-[#D7DCE0] uppercase tracking-wider mt-2">
                Active Operations
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#C59B24]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C59B24]/15 text-[#C59B24] border border-[#C59B24]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#C59B24] group-hover:text-[#141E36] transition-all">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#C59B24] transition-colors">
                100%
              </div>
              <div className="text-xs font-bold text-[#D7DCE0] uppercase tracking-wider mt-2">
                Safe & Secure Cargo
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}