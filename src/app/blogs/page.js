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
      {/* Hero Header (Exact 1920 x 600 px Standard Banner Dimensions, Zero Dark Opacity) */}
      <section className="relative w-full bg-[#141E36] overflow-hidden border-b border-[#D7DCE0]/15 flex items-center justify-center">
        <div
          className="relative w-full max-w-[1920px] mx-auto aspect-[1920/600] flex items-center justify-center overflow-hidden"
          style={{ aspectRatio: '1920 / 600' }}
        >
          <PageHeroBackground page="/blogs" darkOverlay={false}>
            <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4 px-4 py-8">
              <span className="inline-block px-4 py-1.5 bg-[#C59B24]/15 border border-[#C59B24]/30 text-[#C59B24] rounded-full text-xs font-bold uppercase tracking-wider">
                Industry Insights
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto uppercase">
                Steadfast Logistics Insights & News
              </h1>
              <p className="text-[#D7DCE0] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Expert analysis, shipping industry updates, and global freight forwarding guides.
              </p>
            </div>
          </PageHeroBackground>
        </div>
      </section>

      {/* Real-time Client-side Blog Listing & Sidebar Widgets */}
      <BlogListingClient initialBlogs={blogs} />
    </main>
  );
}
