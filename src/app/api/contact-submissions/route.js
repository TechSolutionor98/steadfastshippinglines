import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { logActivity } from '@/lib/activity-logger';

async function getSubmissions() {
  const db = await getDb();
  return db.collection('contact_submissions').find().sort({ _id: -1 }).toArray();
}

function detectFormType(doc = {}) {
  if (doc.formType) return doc.formType;
  const sub = (doc.subject || '').toLowerCase();
  const com = (doc.comments || '').toLowerCase();
  if (sub.includes('quote') || com.includes('quote estimate request') || com.includes('freight service:')) {
    return 'quote';
  }
  return 'contact';
}

async function saveSubmission({ name, email, phone, subject, service, comments, productName, productBarcode, formType }) {
  const db = await getDb();
  const resolvedType = formType || detectFormType({ subject, comments });
  const doc = {
    name,
    email,
    phone,
    subject,
    service,
    productName: productName || null,
    productBarcode: productBarcode || null,
    comments,
    formType: resolvedType,
    createdAt: new Date().toISOString()
  };
  const res = await db.collection('contact_submissions').insertOne(doc);
  return { id: res.insertedId.toString(), ...doc };
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:2999',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};  

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  try {
    const subs = await getSubmissions();
    return NextResponse.json(subs.map(s => ({
      id: s._id?.toString?.() || s.id,
      name: s.name,
      email: s.email,
      phone: s.phone,
      subject: s.subject,
      service: s.service,
      productName: s.productName,
      productBarcode: s.productBarcode,
      comments: s.comments,
      formType: detectFormType(s),
      createdAt: s.createdAt
    })), { headers: CORS_HEADERS });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to read contact submissions' }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, service, comments, productName, productBarcode, formType } = body || {};
    if (!name || !email || !phone || !subject || !service || !comments) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await getDb();
    // Optional OTP check (if configured in env)
    if (process.env.REQUIRE_CONTACT_OTP === 'true') {
      const otpRecord = await db.collection('otps').findOne({ email, verified: true });
      if (!otpRecord) {
        return NextResponse.json({ error: 'Email not verified. Please verify OTP first.' }, { status: 403, headers: CORS_HEADERS });
      }
      await db.collection('otps').deleteMany({ email });
    }

    const entry = await saveSubmission({ name, email, phone, subject, service, comments, productName, productBarcode, formType });
    await logActivity(request, 'contact_submission', name, { email, subject, service, productName, productBarcode, formType: entry.formType });

    return NextResponse.json({ ok: true, entry }, { status: 201, headers: CORS_HEADERS });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to save contact submission' }, { status: 500, headers: CORS_HEADERS });
  }
}
