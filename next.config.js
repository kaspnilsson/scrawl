// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: true,
  cacheOnFrontEndNav: true,
})

module.exports = withPWA({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/n/today',
        permanent: true,
      },
    ]
  },
})
