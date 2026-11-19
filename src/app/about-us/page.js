import AboutPageClient from "@/Components/About/AboutPageClient";
import { getDb } from "@/lib/mongodb";

export const metadata = {
  title: "About Us | Steadfast Shipping Lines",
  description: "Learn about Steadfast Shipping Lines (Pvt) Ltd - your trusted partner in global freight forwarding, logistics, warehousing, and worldwide multimodal transportation.",
  alternates: {
    canonical: "https://www.steadfastshippinglines.com/about-us",
  },
};

export const revalidate = 60;

export default async function AboutUsPage() {
  let initialBanners = [];
  try {
    const db = await getDb();
    const docs = await db
      .collection("hero_banners")
      .find({
        $or: [{ page: "/about-us" }, { page: "about-us" }],
        active: { $ne: false },
      })
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    initialBanners = docs.map((b) => ({
      _id: b._id.toString(),
      page: b.page || "/about-us",
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
    console.error("Failed to load initial banners for /about-us:", err);
  }

  return <AboutPageClient initialBanners={initialBanners} />;
}
