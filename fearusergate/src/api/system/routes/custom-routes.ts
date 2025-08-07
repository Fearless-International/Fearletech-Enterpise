export default {
  routes: [
    // Custom authentication routes
    {
      method: 'POST',
      path: '/auth/register',
      handler: 'system.register',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/login',
      handler: 'system.login',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/auth/verify-email',
      handler: 'system.verifyEmail',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/request-reset',
      handler: 'system.requestReset',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/reset-password',
      handler: 'system.resetPassword',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/auth/me',
      handler: 'system.me',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/logout',
      handler: 'system.logout',
      config: {
        auth: false,
      },
    }
  ],
};