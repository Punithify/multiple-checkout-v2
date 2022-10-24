/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}





module.exports = withBundleAnalyzer({})

module.exports = nextConfig
