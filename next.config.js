module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/n/today',
        permanent: true,
      },
    ]
  },
}
