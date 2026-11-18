import React from 'react';
import BannersClient from './BannersClient';

export const metadata = {
  title: 'Hero Banners | Steadfast Shipping Lines Admin',
  description: 'Manage home page hero banner slides',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminBannersPage() {
  return <BannersClient />;
}

