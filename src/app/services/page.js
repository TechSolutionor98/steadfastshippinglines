import ServicesPageClient from "@/Components/Services/ServicesPageClient";
import { getDb } from "@/lib/mongodb";

export const metadata = {
  title: "Services | Steadfast Shipping Lines",
  description: "Explore our full spectrum of freight & logistics services: Ocean Freight, Air Freight, Road Freight, Warehousing, Cargo, Cross-Stuffing, Customs Clearance, and Door-to-Door Delivery.",
  alternates: {
    canonical: "https://www.steadfastshippinglines.com/services",
  },
};

export const revalidate = 60;

export default async function ServicesPage() {
  let initialBanners = [];
  try {
    const db = await getDb();
    const docs = await db
      .collection("hero_banners")
      .find({
        $or: [{ page: "/services" }, { page: "services" }],
        active: { $ne: false },
      })
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    initialBanners = docs.map((b) => ({
      _id: b._id.toString(),
      page: b.page || "/services",
      title: b.title || "",
      subtitle: b.subtitle || "",
      imageUrl: b.imageUrl,
      link: b.link || "",
      order: typeof b.order === "number" ? b.order : 0,
      active: b.active !== false,
      showText: b.showText !== false,
      textColor: b.textColor || "#ffffff",
      textAlign: b.textAlign || "center",
    }));
  } catch (err) {
    console.error("Failed to load initial banners for /services:", err);
  }

  return <ServicesPageClient initialBanners={initialBanners} />;
}
