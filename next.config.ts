import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Toutes les images viennent de Sanity : le CDN Sanity les redimensionne (voir sanity/image-loader.ts)
    loader: 'custom',
    loaderFile: './sanity/image-loader.ts',
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default nextConfig
