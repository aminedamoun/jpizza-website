/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.DIST_DIR || '.next',

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'rmuxjpfykdurflivcfpz.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'img.rocket.new',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/homepage',
        destination: '/',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
