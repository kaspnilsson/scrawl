module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/notes/today',
        permanent: true,
      },
    ]
  },
}
