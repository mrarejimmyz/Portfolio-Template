import type { NextConfig } from "next";
import createMDX from '@next/mdx';

// Configure MDX
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'export',
  productionBrowserSourceMaps: false,
  
  // Fix the assetPrefix format for IPFS compatibility
  assetPrefix: '/', // Use relative paths for IPFS
  trailingSlash: true,
  basePath: '',
  
  // Add MDX as a page extension
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  // Valid experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    turbo: {}
  },
  
  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    domains: [],
    remotePatterns: []
  },
  
  // Webpack configuration for MDX processing
  webpack: (config) => {
    // Add MDX file handling
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    });

    return config;
  },
};

// Apply MDX configuration
export default withMDX(nextConfig);
