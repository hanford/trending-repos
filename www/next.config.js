const withOffline = moduleExists('next-offline')
  ? require('next-offline')
  : {};

const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {
  publicRuntimeConfig: {
    googleAnalytics: isDev ? '' : 'UA-45226320-5',
    isDev
  },
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

module.exports = moduleExists('next-offline')
  ? withOffline(nextConfig)
  : nextConfig

function moduleExists(name) {
  try {
    return require.resolve(name);
  } catch (error) {
    return false;
  }
}
