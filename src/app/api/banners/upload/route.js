import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dqghun7oj',
  api_key: process.env.CLOUDINARY_API_KEY || '281487587427693',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'bxbrN76auL9pNUINMVdKJwqv6Uo',
});

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { ok: false, error: 'No image file uploaded' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Try Cloudinary first
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'steadfast-hero-banners',
          },
          (error, res) => {
            if (error) return reject(error);
            resolve(res);
          }
        );
        stream.end(buffer);
      });

      if (result && result.secure_url) {
        return NextResponse.json(
          { ok: true, url: result.secure_url },
          { status: 200, headers: CORS_HEADERS }
        );
      }
    } catch (cloudinaryErr) {
      console.warn('Cloudinary upload error, falling back to local storage:', cloudinaryErr?.message);
    }

    // Fallback to local upload directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'banners');
    await fs.mkdir(uploadsDir, { recursive: true });

    const ext = path.extname(file.name) || '.webp';
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}-${cleanName}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await fs.writeFile(filePath, buffer);
    const localUrl = `/uploads/banners/${filename}`;

    return NextResponse.json(
      { ok: true, url: localUrl },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error('Banner upload error:', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Failed to upload image' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

