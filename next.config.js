/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

module.exports = withCss(withPurgeCss({
  purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds

}
));
module.exports = withBundleAnalyzer({})

module.exports = nextConfig
