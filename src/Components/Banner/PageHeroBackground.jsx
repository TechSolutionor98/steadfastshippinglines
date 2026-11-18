"use client";

import React, { useState, useEffect } from "react";

export default function PageHeroBackground({ page = "/" }) {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!page) return;
    const cleanPage = page.startsWith("/") ? page : `/${page}`;
    fetch(`/api/banners?page=${encodeURIComponent(cleanPage)}`, { cache: "no-store" })
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

  if (banners.length === 0) return null;

  const current = banners[currentSlide] || banners[0];
  if (!current?.imageUrl) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden animate-in fade-in duration-500">
      {banners.map((b, idx) => (
        <div
          key={b._id || idx}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{ backgroundImage: `url(${b.imageUrl})` }}
        />
      ))}

      {/* Dark Readability Vignette Gradient */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          current.textAlign === "left"
            ? "bg-gradient-to-r from-black/90 via-black/65 to-black/45"
            : current.textAlign === "right"
            ? "bg-gradient-to-l from-black/90 via-black/65 to-black/45"
            : "bg-black/60"
        }`}
      />
    </div>
  );
}

