import React from "react";
import ServiceDetailPage from "@/Components/ServiceDetail/ServiceDetailPage";
import { servicesData } from "@/data/steadfastData";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export async function generateMetadata() {
  const service = servicesData.find((s) => s.slug === "door-to-door-delievery");
  if (!service) return { title: "Door to Door Delivery | Steadfast Shipping" };
  return {
    title: `${service.title} | Steadfast Shipping`,
    description: service.shortDescription,
    alternates: {
      canonical: "https://steadfastshipping.com/door-to-door-delievery",
    },
  };
}

export default function Page() {
  const service = servicesData.find((s) => s.slug === "door-to-door-delievery");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
