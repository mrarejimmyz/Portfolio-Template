import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Valid experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    turbo: {}
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60
  }
};


export default nextConfig;
