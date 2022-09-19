// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
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
