const axios = {
  create: () => ({
    get: jest.fn((url) => {
      if (url !== 'sanctum') {
        return Promise.resolve({
          data: {
            id: 1,
          },
          status: url === 'broken_url' ? 500 : 204,
        });
      } else {
        return Promise.reject('sanctum error');
      }
    }),
    post: jest.fn((url) =>
      Promise.resolve({
        data: {
          id: 1,
        },
        status: 204,
      })
    ),
  }),
  CancelToken: {
    source: () => ({
      token: 1,
      cancel: jest.fn((msg) => msg),
    }),
  },
};

export default axios;
