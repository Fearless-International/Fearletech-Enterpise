/**
 * contact service
 */

const { factories: contactFactories } = require('@strapi/strapi');
module.exports = contactFactories.createCoreService('api::contact.contact');