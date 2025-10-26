import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'immo-scraper.davmro90.workers.dev',
      },
    ],
  },
  // Generate 404.html for client-side routing of dynamic routes
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
};

export default nextConfig;
