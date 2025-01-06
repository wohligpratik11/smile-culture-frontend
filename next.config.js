// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: process.env.PORT || 3001,
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      `http://localhost:${process.env.PORT || 3001}`,
  },
};

module.exports = nextConfig;
