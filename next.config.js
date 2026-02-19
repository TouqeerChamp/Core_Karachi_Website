/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization
    // domains: ['localhost', '127.0.0.1', 'your-domain.com'],
    // For local images, we don't need domains - just remove unoptimized: true
  },
};

module.exports = nextConfig;