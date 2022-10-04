/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: false
      },
      {
        source: '/old-blog/:id',
        destination: '/new-blog/:id',
        permanent: true
      }
    ]
  },
  // distDir: 'build',
  cleanDistDir: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
