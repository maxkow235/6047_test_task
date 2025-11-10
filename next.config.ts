import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const prefix = isProd ? '/6047_test_task' : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  basePath: prefix,
  assetPrefix: prefix ? `${prefix}/` : undefined,

  images: {
    unoptimized: isProd,
    path: `${prefix}/_next/image`,
  },

  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
