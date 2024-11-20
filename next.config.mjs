const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/MihaelHoli.github.io/' : '',
  basePath: isProd ? '/MihaelHoli.github.io' : '',
  output: 'export',
  distDir: 'out'
};

export default nextConfig;
