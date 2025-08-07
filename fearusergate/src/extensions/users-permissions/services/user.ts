const cryptoModule = require('crypto');
const { factories: usersPermissionsFactories } = require('@strapi/strapi');

module.exports = usersPermissionsFactories.createCoreService('plugin::users-permissions.user', () => ({
  /**
   * Generate a secure random token.
   * @returns {string} The generated token.
   */
  generateToken() {
    try {
      return cryptoModule.randomBytes(20).toString('hex');
    } catch (error) {
      throw new Error('Failed to generate token');
    }
  },
}));
