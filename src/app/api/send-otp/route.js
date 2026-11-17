import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import nodemailer from 'nodemailer';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:2999',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400, headers: CORS_HEADERS });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP in DB
    const db = await getDb();
    await db.collection('otps').deleteMany({ email }); // Remove old OTPs
    await db.collection('otps').insertOne({ email, otp, expiresAt, verified: false });

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL || 'info@steadfastshippinglines.com',
        pass: process.env.SMTP_PASSWORD || '',
      },
    });

    await transporter.sendMail({
      from: `"Steadfast Shipping Lines" <${process.env.SMTP_EMAIL || 'info@steadfastshippinglines.com'}>`,
      to: email,
      subject: 'Your OTP Verification Code - Steadfast Shipping Lines',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #D7DCE0; border-radius: 12px;">
          <h2 style="color: #1D2A4C; text-align: center;">Steadfast Shipping Lines</h2>
          <p style="text-align: center; font-size: 16px; color: #333;">Your verification code is:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #C59B24; background: #1D2A4C; padding: 15px 30px; border-radius: 10px;">${otp}</span>
          </div>
          <p style="text-align: center; color: #666; font-size: 14px;">This code expires in 5 minutes.</p>
          <p style="text-align: center; color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, message: 'OTP sent successfully' }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('Send OTP error:', err);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500, headers: CORS_HEADERS });
  }
}
