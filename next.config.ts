import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};
// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
