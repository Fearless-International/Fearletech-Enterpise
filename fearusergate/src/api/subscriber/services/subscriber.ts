/**
 * subscriber service
 */

const { factories: servicesFactories } = require('@strapi/strapi');
module.exports = servicesFactories.createCoreService('api::subscriber.subscriber');
