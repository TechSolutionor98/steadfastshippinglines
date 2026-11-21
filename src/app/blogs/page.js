import React from 'react';
import { getDb } from '@/lib/mongodb';
import BlogListingClient from './BlogListingClient';
import PageHeroBackground from '@/Components/Banner/PageHeroBackground';
import { generateCmsMetadata } from '@/lib/cms-fetch';
import './blog-content.css';

export async function generateMetadata() {
  return await generateCmsMetadata('/blogs', {
    title: 'Blog - Insights & Tech Solutions | Crown Excel',
    description: 'Read the latest updates, tutorials, and expert analysis on IT infrastructure, hardware, cloud computing, and Excel automation.',
  });
}

export const revalidate = 86400;

export default async function ClientBlogsPage() {
  let blogs = [];

  try {
    const db = await getDb();
    const docs = await db.collection('cms_blogs').find({ published: true }).sort({ createdAt: -1 }).toArray();
    blogs = docs.map(d => ({
      ...d,
      _id: d._id.toString(),
      createdAt: d.createdAt ? (d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt) : null,
      updatedAt: d.updatedAt ? (d.updatedAt instanceof Date ? d.updatedAt.toISOString() : d.updatedAt) : null,
    }));
  } catch (err) {
    console.error('Failed to fetch public blogs list', err);
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-gray-800">
      {/* Hero Header — same height/pattern as other pages; admin banner acts as background behind code text */}
      <section className="relative w-full overflow-hidden bg-[#FFFFFF]">
        <div className="relative mx-auto flex min-h-[520px] w-full max-w-[1536px] items-center overflow-hidden bg-[#0D1424] lg:min-h-[560px]">
          <PageHeroBackground page="/blogs" darkOverlay={false}>
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
              <div className="max-w-3xl space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E2C876]/30 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  Industry Insights
                </span>
                <h1 className="font-anton uppercase leading-[0.98] tracking-tight text-white text-[clamp(2.2rem,1.3rem+4.2vw,4.4rem)]">
                  Steadfast Logistics <span className="text-[#E2C876]">Insights & News</span>
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-white sm:text-base">
                  Expert analysis, shipping industry updates, and global freight forwarding guides.
                </p>
              </div>
            </div>
          </PageHeroBackground>
        </div>
      </section>

      {/* Real-time Client-side Blog Listing & Sidebar Widgets */}
      <BlogListingClient initialBlogs={blogs} />
    </main>
  );
}
