/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: process.env.PORT || 3001,
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
  transpilePackages: [
    '@uppy/core',
    '@uppy/dashboard',
    '@uppy/react',
    '@uppy/webcam',
    '@uppy/image-editor',
  ],
  experimental: {
    optimizeCss: true, // Enables CSS optimization for performance
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow' }, // Default for SEO
        ],
      },
    ];
  },
  webpack(config) {
    config.plugins
      .push
      // Add any webpack plugins you need for SEO-related tasks
      ();
    return config;
  },
};
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public', // Where the service worker and assets will be generated
});

module.exports = withPWA({
  // Other Next.js config options
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
