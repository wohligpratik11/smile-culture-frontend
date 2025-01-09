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
};

module.exports = nextConfig;
