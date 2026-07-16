import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@varient/ui'],
  experimental: {
    optimizePackageImports: ['@varient/ui', 'lucide-react'],
  },
};

export default withMDX(config);
