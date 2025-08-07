// Create this file at: src/extensions/users-permissions/strategies/system-jwt.js

'use strict';

const { UnauthorizedError } = require('@strapi/utils').errors;
const jwt = require('jsonwebtoken');

module.exports = {
  name: 'system-jwt',
  async authenticate(ctx) {
    try {
      const token = ctx.request.header.authorization?.replace('Bearer ', '');
      
      if (!token) {
        throw new UnauthorizedError('No authorization header found');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hiZt4I468H3Audc4rmcdTw==');
      
      if (!decoded || !decoded.id) {
        throw new UnauthorizedError('Invalid token');
      }

      // Find the user from system table
      const user = await strapi.db.query('api::system.system').findOne({
        where: { id: decoded.id }
      });

      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      if (user.blocked) {
        throw new UnauthorizedError('User is blocked');
      }

      // Attach user to context
      ctx.state.user = user;
      
      return { authenticated: true };
    } catch (error) {
      throw new UnauthorizedError(error.message);
    }
  },
};