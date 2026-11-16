import HomePage from "@/Components/Home/HomePage";
import { getCmsData, generateCmsMetadata } from "@/lib/cms-fetch";

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/', {
    title: 'Steadfast Shipping | Tailored Logistics Services for Every Need',
    description: 'Steadfast Shipping provides comprehensive freight & logistics solutions including Ocean Freight, Air Freight, Road Freight, Warehousing, Cargo Services, Customs Clearance, and Door-to-Door Delivery worldwide.',
    alternates: {
      canonical: 'https://steadfastshipping.com/',
    },
  });
}

export default async function Home() {
  const { content } = await getCmsData('/');
  return <HomePage cmsContent={content} />;
}
