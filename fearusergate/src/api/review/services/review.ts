/**
 * review service
 */

const { factories: reviewservicesFactories } = require('@strapi/strapi');
module.exports = reviewservicesFactories.createCoreService('api::review.review');
