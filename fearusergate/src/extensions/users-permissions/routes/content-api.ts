module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/send-email-confirmation',
      handler: 'auth.send-email-confirmation',
      config: {
        middlewares: [],
        policies: [],
        prefix: '',
      },
    },
  ]
};