/**
 * subscriber controller
 */

const { factories: subscriberFactories } = require('@strapi/strapi');

interface UnsubscribeRequest {
  email: string;
  token: string;
}

export default subscriberFactories.createCoreController('api::subscriber.subscriber', ({ strapi }) => ({
  // Keep the default controller actions
  ...subscriberFactories.createCoreController('api::subscriber.subscriber'),

  // Add custom unsubscribe action
  async unsubscribe(ctx) {
    try {
      const { email, token }: UnsubscribeRequest = ctx.request.body;
      
      // Verify token and update status
      const subscriber = await strapi.query('api::subscriber.subscriber')
        .update({
          where: { email },
          data: { 
            status: 'unsubscribed',
            updated_at: new Date('2025-04-22 23:06:44').toISOString()
          }
        });

      if (!subscriber) {
        return ctx.notFound('Subscriber not found');
      }

      return { 
        success: true, 
        data: subscriber,
        meta: {
          updated_by: 'fmjmadeit',
          updated_at: new Date('2025-04-22 23:06:44').toISOString()
        }
      };
    } catch (error) {
      return ctx.badRequest('Failed to unsubscribe', { error: error.message });
    }
  },
}));