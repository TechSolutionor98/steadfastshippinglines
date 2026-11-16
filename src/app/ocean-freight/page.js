import React from "react";
import ServiceDetailPage from "@/Components/ServiceDetail/ServiceDetailPage";
import { servicesData } from "@/data/steadfastData";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export async function generateMetadata() {
  const service = servicesData.find((s) => s.slug === "ocean-freight");
  if (!service) return { title: "Ocean Freight | Steadfast Shipping" };
  return {
    title: `${service.title} | Steadfast Shipping`,
    description: service.shortDescription,
    alternates: {
      canonical: "https://steadfastshipping.com/ocean-freight",
    },
  };
}

export default function Page() {
  const service = servicesData.find((s) => s.slug === "ocean-freight");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
