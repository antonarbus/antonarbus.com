/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
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
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true
  },
  compiler: {
    emotion: true,
    styledJsx: true
  },
  webpack: (config, { isServer }) => {
    // Exclude posts from server-side webpack analysis
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        '/exportAllPosts.js': 'commonjs /exportAllPosts.js'
      })
    }
    return config
  }
}

module.exports = nextConfig
