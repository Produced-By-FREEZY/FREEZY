/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Compresses rendered content and static files (Better LCP scores)
  compress: true,

  // 2. Optimization for images (Crucial for SEO performance)
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats load 50% faster
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // 3. React Compiler - DISABLED
  // Disabled to fix the "babel-plugin-react-compiler" missing error.
  experimental: {
    reactCompiler: false,
  },

  // 4. Power-user: Security headers that help with Google's trust signals
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default nextConfig;
