/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export removed as it's incompatible with NextAuth.js
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    appDir: true
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = false;
    }
    return config;
  }
};

module.exports = nextConfig;