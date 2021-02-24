module.exports = {
  async redirects(context) {
    return [
      {
        source: '/',
        destination: '/posts',
        permanent: true
      }
    ];
  },
  async exportPathMap(defaultPathMap, options) {
    return {
      '/login': { page: '/login' }
    };
  }
};
