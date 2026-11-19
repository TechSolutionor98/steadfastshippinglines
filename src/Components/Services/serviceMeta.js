/**
 * Shared service metadata: categories + verified image assets.
 * `servicesData.image` paths don't exist in /public — this maps each slug
 * to real photography under /images/home/.
 */
export const SERVICE_META = {
  "ocean-freight": { category: "freight", image: "/images/home/ocean.jpg" },
  "air-freight": { category: "freight", image: "/images/home/air.jpg" },
  "road-freight": { category: "freight", image: "/images/home/road.jpg" },
  "warehousing-service": { category: "warehousing", image: "/images/home/warehouse.jpg" },
  "cargo-services": { category: "freight", image: "/images/home/cargo.jpg" },
  "cross-stuffing-service": { category: "warehousing", image: "/images/home/cross-stuffing.jpg" },
  "break-bulk-cargo-service": { category: "customs", image: "/images/home/break-bulk.jpg" },
  "transportation-service": { category: "freight", image: "/images/home/road.jpg" },
  "customs-clearance-service": { category: "customs", image: "/images/home/customs.jpg" },
  "door-to-door-delievery": { category: "warehousing", image: "/images/home/door.jpg" },
};

export const SERVICE_CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "freight", label: "Freight Forwarding" },
  { id: "warehousing", label: "Warehousing & Storage" },
  { id: "customs", label: "Customs & Heavy Lift" },
];

export function serviceImage(slug) {
  return SERVICE_META[slug]?.image || "/images/home/how-we-help.jpg";
}

export function serviceCategory(slug) {
  return SERVICE_META[slug]?.category || "freight";
}
