/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  // Note: redirects don't work with output: 'export'
  // If you need redirects, configure them in your hosting provider (Cloudflare, Netlify, Vercel, etc.)
  // redirects: async () => {
  //   return [
  //     {
  //       source: '/about',
  //       destination: '/',
  //       permanent: false
  //     },
  //     {
  //       source: '/old-blog/:id',
  //       destination: '/new-blog/:id',
  //       permanent: true
  //     }
  //   ]
  // },
  // distDir: 'build',
  cleanDistDir: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true
  },
  compiler: {
    emotion: true,
    styledJsx: true
  }
}

module.exports = nextConfig
