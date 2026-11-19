/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://b.tashkentlawschool.uz';

/** Lets next/image optimise uploads served by whichever backend NEXT_PUBLIC_API_URL points to. */
function apiImagePattern() {
  try {
    const u = new URL(API_URL);
    return [{ protocol: u.protocol.replace(':', ''), hostname: u.hostname, port: u.port || '', pathname: '/uploads/**' }];
  } catch {
    return [];
  }
}

const nextConfig = {
  // Allows a second local dev server (e.g. against a local backend) without clashing over .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      ...apiImagePattern(),
      { protocol: 'https', hostname: 'b.tashkentlawschool.uz', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'tashkentlaw.itzonee.uz', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'tashkentlaw.ilmify-edu.uz', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:dir(videos|images)/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  compress: true,
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
