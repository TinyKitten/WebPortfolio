// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
  experimental: {
    concurrentFeatures: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    styledComponents: true,
    reactRemoveProperties: true,
    removeConsole: true,
  },
});
