/**
 * review router
 */

const { factories: reviewrouteFactories } = require('@strapi/strapi');

module.exports = reviewrouteFactories.createCoreRouter('api::review.review');