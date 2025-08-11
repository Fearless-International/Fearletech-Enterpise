export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
      cors: {
        enabled: true,
        origin: ['https://app.fearlessint.com', 'https://fearlessint.com'], // Allow your front-end's URLs
        headers: ['*'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      
      headers: '*',
      origin: ['https://app.fearlessint.com', 'https://fearlessint.com'],
      // origin: ['http://localhost:4200', 'http://localhost:5173'], // Allow your front-end's URLs
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
