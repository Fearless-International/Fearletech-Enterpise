// src/api/system/routes/01-custom-auth.js (or .ts)
// IMPORTANT: Name this file with a number prefix so Strapi loads it as custom routes

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/register',
      handler: 'system.register',
      config: {
        auth: false,
        prefix: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/login', 
      handler: 'system.login',
      config: {
        auth: false,
        prefix: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/auth/verify-email',
      handler: 'system.verifyEmail',
      config: {
        auth: false,
        prefix: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/request-reset',
      handler: 'system.requestReset',
      config: {
        auth: false,
        prefix: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/reset-password',
      handler: 'system.resetPassword',
      config: {
        auth: false,
        prefix: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/system/me',
      handler: 'system.me',
      config: {
        auth: false,  // Must be false since we handle JWT validation in the controller
        prefix: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/logout',
      handler: 'system.logout',
      config: {
        auth: false,
        prefix: false,
      },
  },
  {
    method: 'GET',
    path: '/system/user-stats',
    handler: 'system.getUserStats',
    config: {
      auth: false,  // We handle JWT validation in the controller
      policies: [],
      middlewares: [],
    },
  }
]
};