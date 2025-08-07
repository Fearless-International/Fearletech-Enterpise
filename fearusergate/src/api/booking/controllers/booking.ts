/**
 * booking controller
 */

const { factories: controllerFactories } = require('@strapi/strapi');

module.exports = controllerFactories.createCoreController('api::booking.booking', ({ strapi }) => ({
  async find(ctx) {
    const { user } = ctx.state;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to view bookings');
    }

    // Filter bookings by current user (using owner field)
    ctx.query.filters = {
      ...ctx.query.filters,
      owner: user.id
    };

    // Populate owner data
    ctx.query.populate = {
      owner: true,
      user: true, // Keep the existing user component
      ...ctx.query.populate
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;

    if (!user) {
      return ctx.unauthorized('You must be authenticated to view this booking');
    }

    // Check if booking belongs to current user (using owner field)
    const booking = await strapi.entityService.findOne('api::booking.booking', id, {
      populate: { owner: true }
    });

    if (!booking || booking.owner.id !== user.id) {
      return ctx.notFound('Booking not found or you do not have permission to view it');
    }

    return super.findOne(ctx);
  },

  async create(ctx) {
    const { user } = ctx.state;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to create a booking');
    }

    // Automatically assign the current user as owner of the booking
    ctx.request.body.data.owner = user.id;

    return super.create(ctx);
  },

  async update(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;

    if (!user) {
      return ctx.unauthorized('You must be authenticated to update this booking');
    }

    // Check if booking belongs to current user (using owner field)
    const booking = await strapi.entityService.findOne('api::booking.booking', id, {
      populate: { owner: true }
    });

    if (!booking || booking.owner.id !== user.id) {
      return ctx.notFound('Booking not found or you do not have permission to update it');
    }

    return super.update(ctx);
  },

  async delete(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;

    if (!user) {
      return ctx.unauthorized('You must be authenticated to delete this booking');
    }

    // Check if booking belongs to current user (using owner field)
    const booking = await strapi.entityService.findOne('api::booking.booking', id, {
      populate: { owner: true }
    });

    if (!booking || booking.owner.id !== user.id) {
      return ctx.notFound('Booking not found or you do not have permission to delete it');
    }

    return super.delete(ctx);
  },

  // Custom endpoint for user booking statistics
  async getUserStats(ctx) {
    const { user } = ctx.state;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to view statistics');
    }

    try {
      // Get booking statistics for current user (using owner field)
      const totalBookings = await strapi.entityService.count('api::booking.booking', {
        filters: { owner: user.id }
      });

      const completedBookings = await strapi.entityService.count('api::booking.booking', {
        filters: { 
          owner: user.id,
          statuses: 'confirmed'
        }
      });

      const pendingBookings = await strapi.entityService.count('api::booking.booking', {
        filters: { 
          owner: user.id,
          statuses: 'pending'
        }
      });

      const cancelledBookings = await strapi.entityService.count('api::booking.booking', {
        filters: { 
          owner: user.id,
          statuses: 'cancelled'
        }
      });

      return {
        totalBookings,
        completedBookings,
        pendingBookings,
        cancelledBookings
      };
    } catch (error) {
      console.error('Error fetching user booking statistics:', error);
      return ctx.internalServerError('Failed to fetch booking statistics');
    }
  }
}));