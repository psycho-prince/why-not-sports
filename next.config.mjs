/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disables image optimization, which avoids native dependencies like Sharp
  // that can cause build issues on platforms like Render.
  images: {
    unoptimized: true,
  },
  // Enables SWC for production minification.
  swcMinify: true,
  // Generates a lean, Docker-like output folder for faster cold starts on Render.
  output: 'standalone',
  // Basic security headers for production.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Basic CSP (can be expanded)
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.cricketdata.org https://www.thesportsdb.com wss:; font-src 'self' data:;",
          },
          // Strict Transport Security (HSTS) - configure domain later
          // { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig; // Correct ESM export
