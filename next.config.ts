import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'export',
  productionBrowserSourceMaps: false,
  
  // Fix the assetPrefix format - must start with a slash
  assetPrefix: '/', // Changed from './'
  trailingSlash: true,
  basePath: '',
  
  // Valid experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    turbo: {}
  },
  
  // Image optimization
  images: {
    unoptimized: true,
    domains: [],
    remotePatterns: []
  }
};

export default nextConfig;
