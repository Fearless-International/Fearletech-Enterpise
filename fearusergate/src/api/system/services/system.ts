/**
 * system service
 */

const { factories: systemsServicesFactories } = require('@strapi/strapi');
module.exports = systemsServicesFactories.createCoreService('api::system.system');