"use client";

import React, { useState, useEffect } from "react";

export default function PageHeroBackground({
  page = "/",
  initialBanners = [],
  darkOverlay = false,
  children,
}) {
  const [banners, setBanners] = useState(initialBanners);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!page) return;
    const cleanPage = page.startsWith("/") ? page : `/${page}`;
    fetch(`/api/banners?page=${encodeURIComponent(cleanPage)}&t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.banners)) {
          const active = data.banners.filter((b) => b.active !== false);
          setBanners(active);
        }
      })
      .catch((err) => console.log("Page banner fetch error:", err));
  }, [page]);

  // Auto-advance if multiple banners exist for this page
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const current = banners[currentSlide] || banners[0];
  const hasBanner = Boolean(current?.imageUrl);

  return (
    <>
      {hasBanner && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden animate-in fade-in duration-500">
          {banners.map((b, idx) => (
            <div
              key={b._id || idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              style={{
                backgroundImage: `url(${b.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}

          {/* Readability Overlay: Active ONLY when darkOverlay is enabled */}
          {darkOverlay && (
            <div
              className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
                current?.textAlign === "left"
                  ? "bg-gradient-to-r from-black/85 via-black/50 to-transparent"
                  : current?.textAlign === "right"
                  ? "bg-gradient-to-l from-black/85 via-black/50 to-transparent"
                  : "bg-black/50"
              }`}
            />
          )}
        </div>
      )}

      {/* Page content (text) always renders on top */}
      {children}
    </>
  );
}

