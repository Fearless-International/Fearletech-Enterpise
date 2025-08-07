/**
 * contact router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::contact.contact', {
  config: {
    create: {
      auth: false // Allow public access to create
    },
    find: {
      auth: {
        strategy: 'system-jwt' // Use your custom auth
      }
    },
    findOne: {
      auth: {
        strategy: 'system-jwt'
      }
    },
    update: {
      auth: {
        strategy: 'system-jwt'
      }
    },
    delete: {
      auth: {
        strategy: 'system-jwt'
      }
    }
  }
});