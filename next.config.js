/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'tashkentlaw.ilmify-edu.uz' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://tashkentlaw.ilmify-edu.uz'}/api/:path*`,
      },
    ];
  },
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;