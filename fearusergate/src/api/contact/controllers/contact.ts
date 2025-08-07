/**
 * contact controller
 */

const { factories: strapiFactories } = require('@strapi/strapi');

module.exports = strapiFactories.createCoreController('api::contact.contact', ({ strapi }) => ({
  // Helper function to get user from token
  async getUserFromToken(ctx) {
    const jwt = require('jsonwebtoken');
    const token = ctx.request.header.authorization?.replace('Bearer ', '');
    
    if (!token) return null;
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hiZt4I468H3Audc4rmcdTw==');
      
      if (!decoded || !decoded.id) return null;
      
      const user = await strapi.db.query('api::system.system').findOne({
        where: { id: decoded.id }
      });
      
      return user && !user.blocked ? user : null;
    } catch (error) {
      return null;
    }
  },
  async find(ctx) {
    // Get user from token
    const user = await this.getUserFromToken(ctx);
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to view contacts');
    }
    
    // Show only user's contacts
    ctx.query.filters = {
      ...ctx.query.filters,
      owner: user.id
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const user = await this.getUserFromToken(ctx);

    if (!user) {
      return ctx.unauthorized('You must be authenticated to view this contact');
    }

    // Check if contact belongs to current user
    const contact = await strapi.entityService.findOne('api::contact.contact', id, {
      populate: { owner: true }
    });

    if (!contact || (contact.owner && contact.owner.id !== user.id)) {
      return ctx.notFound('Contact not found or you do not have permission to view it');
    }

    return super.findOne(ctx);
  },

  async create(ctx) {
    // PUBLIC CREATE - Anyone can create a contact
    // Try to get user from token if available
    const user = await this.getUserFromToken(ctx);
    
    // If user is authenticated, link the contact to them
    if (user) {
      ctx.request.body.data.owner = user.id;
    } else {
      // Check if email matches any system user
      const email = ctx.request.body.data.email;
      if (email) {
        const systemUser = await strapi.db.query('api::system.system').findOne({
          where: { email: email.toLowerCase() }
        });
        
        // If system user exists, link the contact
        if (systemUser) {
          ctx.request.body.data.owner = systemUser.id;
        }
      }
    }

    return super.create(ctx);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const user = await this.getUserFromToken(ctx);

    if (!user) {
      return ctx.unauthorized('You must be authenticated to update this contact');
    }

    // Check if contact belongs to current user
    const contact = await strapi.entityService.findOne('api::contact.contact', id, {
      populate: { owner: true }
    });

    if (!contact || (contact.owner && contact.owner.id !== user.id)) {
      return ctx.notFound('Contact not found or you do not have permission to update it');
    }

    return super.update(ctx);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const user = await this.getUserFromToken(ctx);

    if (!user) {
      return ctx.unauthorized('You must be authenticated to delete this contact');
    }

    // Check if contact belongs to current user
    const contact = await strapi.entityService.findOne('api::contact.contact', id, {
      populate: { owner: true }
    });

    if (!contact || (contact.owner && contact.owner.id !== user.id)) {
      return ctx.notFound('Contact not found or you do not have permission to delete it');
    }

    return super.delete(ctx);
  },

    // Custom endpoint for user message statistics
    async getUserStats(ctx) {
      const user = await this.getUserFromToken(ctx);
      
      if (!user) {
        return ctx.unauthorized('You must be authenticated to view statistics');
      }
      
      // Implement your statistics logic here
      const stats = await strapi.db.query('api::contact.contact').count({
        where: { owner: user.id }
      });
      
      return { contactCount: stats };
    }
  }));