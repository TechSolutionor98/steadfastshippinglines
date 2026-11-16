import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  compress: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      '@phosphor-icons/react',
      'phosphor-react',
      'hugeicons-react',
      'framer-motion',
      'lottie-react',
    ],
  },
  async redirects() {
    return [
      {
        source: '/warehousing',
        destination: '/warehousing-service',
        permanent: true,
      },
      {
        source: '/cross-stuffing',
        destination: '/cross-stuffing-service',
        permanent: true,
      },
      {
        source: '/break-bulk-cargo',
        destination: '/break-bulk-cargo-service',
        permanent: true,
      },
      {
        source: '/transportation',
        destination: '/transportation-service',
        permanent: true,
      },
      {
        source: '/customs-clearance',
        destination: '/customs-clearance-service',
        permanent: true,
      },
      {
        source: '/door-to-door',
        destination: '/door-to-door-delievery',
        permanent: true,
      },
      {
        source: '/door-to-door-delivery',
        destination: '/door-to-door-delievery',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: path.join(__dirname),
  },
  outputFileTracingExcludes: {
    '/api/**/*': [
      'node_modules/lucide-react/**/*',
      'node_modules/react-icons/**/*',
      'node_modules/@phosphor-icons/**/*',
      'node_modules/hugeicons-react/**/*',
      'node_modules/swiper/**/*',
      'node_modules/framer-motion/**/*',
      'node_modules/lottie-react/**/*',
      'node_modules/@hcaptcha/**/*',
      'node_modules/react-google-recaptcha/**/*',
      'node_modules/react-google-recaptcha-v3/**/*',
      'src/Components/**/*',
      'src/app/_components/**/*',
    ],
  },
};

export default nextConfig;

