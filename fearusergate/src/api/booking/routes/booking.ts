/**
 * booking router
 */

const { factories: routeFactories } = require('@strapi/strapi');

module.exports = routeFactories.createCoreRouter('api::booking.booking');