/**
 * subscriber router
 */
const { factories: subscriberRouteFactories } = require('@strapi/strapi');
module.exports = subscriberRouteFactories.createCoreRouter('api::subscriber.subscriber');

