/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      // After checking all Next.js pages (including dynamic routes)
      // and static files we proxy any other requests
      {
        source: '/v1/:path*',
        destination: process.env.NEXT_PUBLIC_HOSTNAME + '/v1/:path*', // Proxy to Backend
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
