import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/6047_test_task',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
