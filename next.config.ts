import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'immo-scraper.davmro90.workers.dev',
      },
    ],
  },
};

export default nextConfig;
