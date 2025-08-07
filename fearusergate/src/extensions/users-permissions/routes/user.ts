const { factories: strapiRoutesFactories } = require('@strapi/strapi');
module.exports = strapiRoutesFactories.createCoreRouter('plugin::users-permissions.user', {
  prefix: '',
  only: [],
  routes: [
    {
      method: 'POST',
      path: '/auth/register',
      handler: 'user.register',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/auth/confirm-email',
      handler: 'user.confirmEmail',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
});
