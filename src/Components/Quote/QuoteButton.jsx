"use client";

import React from "react";
import { openQuoteModal } from "./QuoteModal";

export default function QuoteButton({
  children,
  className = "",
  service = "Ocean Freight",
  ...props
}) {
  return (
    <button
      type="button"
      onClick={() => openQuoteModal(service)}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

