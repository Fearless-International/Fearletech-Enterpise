export default {
  routes: [
    {
      method: 'GET',
      path: '/contacts/user-stats',
      handler: 'contact.getUserStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};