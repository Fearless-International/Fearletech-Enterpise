/**
 * review controller
 */
const { factories: reviewFactories } = require('@strapi/strapi');

module.exports = reviewFactories.createCoreController('api::review.review');
