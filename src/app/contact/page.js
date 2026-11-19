import ContactPageClient from "@/Components/Contact/ContactPageClient";
import { getDb } from "@/lib/mongodb";

export const metadata = {
  title: "Contact Us | Steadfast Shipping Lines",
  description: "Contact Steadfast Shipping Lines (Pvt) Ltd — 24/7 operations desk in Faisalabad & Karachi. Call, email, or submit an online inquiry for freight rates and logistics support.",
  alternates: {
    canonical: "https://www.steadfastshippinglines.com/contact",
  },
};

export const revalidate = 60;

export default async function ContactPage() {
  let initialBanners = [];
  try {
    const db = await getDb();
    const docs = await db
      .collection("hero_banners")
      .find({
        $or: [{ page: "/contact" }, { page: "contact" }],
        active: { $ne: false },
      })
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    initialBanners = docs.map((b) => ({
      _id: b._id.toString(),
      page: b.page || "/contact",
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
    console.error("Failed to load initial banners for /contact:", err);
  }

  return <ContactPageClient initialBanners={initialBanners} />;
}
