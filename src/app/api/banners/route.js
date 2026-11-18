import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// Initial default banners if none exist
const DEFAULT_BANNERS = [
  {
    title: 'Global Maritime & Ocean Logistics',
    imageUrl: '/images/home/banner-1.webp',
    link: '/services',
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Container Terminal & Air Cargo Hub',
    imageUrl: '/images/home/banner-2.webp',
    link: '/services',
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/banners - fetch all or active banners (optional ?page=/about-us or ?all=true)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true'; // Admin fetches all, public fetches active
    const pageParam = searchParams.get('page');

    const db = await getDb();
    const collection = db.collection('hero_banners');

    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(DEFAULT_BANNERS.map(b => ({ ...b, page: '/' })));
    }

    let query = all ? {} : { active: { $ne: false } };

    // Public requests default strictly to Home ('/') if no page is specified
    const effectivePage = pageParam || (all ? null : '/');

    if (effectivePage && effectivePage !== 'all') {
      const clean = effectivePage.startsWith('/') ? effectivePage : '/' + effectivePage;
      if (clean === '/') {
        query = {
          ...query,
          $or: [
            { page: '/' },
            { page: { $exists: false } },
            { page: null },
            { page: '' }
          ]
        };
      } else {
        const withoutSlash = clean.replace(/^\//, '');
        query = {
          ...query,
          $or: [
            { page: clean },
            { page: withoutSlash }
          ]
        };
      }
    }

    const banners = await collection
      .find(query)
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    const formatted = banners.map((b) => ({
      _id: b._id.toString(),
      page: b.page || '/',
      title: b.title || '',
      subtitle: b.subtitle || '',
      imageUrl: b.imageUrl,
      link: b.link || '',
      order: typeof b.order === 'number' ? b.order : 0,
      active: b.active !== false,
      showText: b.showText !== false,
      textColor: b.textColor || '#ffffff',
      textAlign: b.textAlign || 'center',
      createdAt: b.createdAt || new Date().toISOString(),
      updatedAt: b.updatedAt || new Date().toISOString(),
    }));

    return NextResponse.json({ ok: true, banners: formatted }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch banners' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// POST /api/banners - add a new banner
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, subtitle, page, imageUrl, link, order, active, showText, textColor, textAlign } = body;

    if (!page || typeof page !== 'string' || !page.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Target page selection is mandatory. Please select a page first.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Banner image URL is required' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const db = await getDb();
    const collection = db.collection('hero_banners');

    const total = await collection.countDocuments();
    const newDoc = {
      page: (page || '/').trim(),
      title: (title || '').trim(),
      subtitle: (subtitle || '').trim(),
      imageUrl: imageUrl.trim(),
      link: (link || '').trim(),
      order: typeof order === 'number' ? order : total + 1,
      active: active !== false,
      showText: typeof showText === 'boolean' ? showText : true,
      textColor: (textColor || '#ffffff').trim(),
      textAlign: ['left', 'center', 'right'].includes(textAlign) ? textAlign : 'center',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const res = await collection.insertOne(newDoc);

    return NextResponse.json(
      { ok: true, banner: { ...newDoc, _id: res.insertedId.toString() } },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Failed to create banner' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// PATCH /api/banners - update an existing banner
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, title, subtitle, page, imageUrl, link, order, active, showText, textColor, textAlign } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { ok: false, error: 'Valid Banner ID is required' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const db = await getDb();
    const collection = db.collection('hero_banners');

    const updateFields = {
      updatedAt: new Date().toISOString(),
    };

    if (typeof page !== 'undefined') updateFields.page = (page || '/').trim();
    if (typeof title !== 'undefined') updateFields.title = title.trim();
    if (typeof subtitle !== 'undefined') updateFields.subtitle = subtitle.trim();
    if (typeof imageUrl !== 'undefined') updateFields.imageUrl = imageUrl.trim();
    if (typeof link !== 'undefined') updateFields.link = link.trim();
    if (typeof order !== 'undefined') updateFields.order = Number(order);
    if (typeof active !== 'undefined') updateFields.active = Boolean(active);
    if (typeof showText !== 'undefined') updateFields.showText = Boolean(showText);
    if (typeof textColor !== 'undefined') updateFields.textColor = textColor.trim();
    if (typeof textAlign !== 'undefined' && ['left', 'center', 'right'].includes(textAlign)) {
      updateFields.textAlign = textAlign;
    }

    const res = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!res) {
      return NextResponse.json(
        { ok: false, error: 'Banner not found' },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      { ok: true, banner: { ...res, _id: res._id.toString() } },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Failed to update banner' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// DELETE /api/banners - delete a banner by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { ok: false, error: 'Valid Banner ID is required' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const db = await getDb();
    const collection = db.collection('hero_banners');

    const res = await collection.deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0) {
      return NextResponse.json(
        { ok: false, error: 'Banner not found' },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json({ ok: true, deletedId: id }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Failed to delete banner' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

