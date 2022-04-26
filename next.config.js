module.exports = {
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
};
