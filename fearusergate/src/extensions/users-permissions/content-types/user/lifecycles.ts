/**
 * User lifecycle hooks to enforce email confirmation
 */

export default {
  async beforeCreate(event) {
    // Always set confirmed to false for new users
    event.params.data.confirmed = false;
    
    // Log the operation for debugging
    console.log('Setting new user to unconfirmed status');
  },
  
  async beforeUpdate(event) {
    // If we're trying to update confirmed status to true
    if (event.params.data && event.params.data.confirmed === true) {
      // Only allow confirmation via token-based process
      // Check if this update is not part of the email confirmation process
      const isConfirmationProcess = event.params.data.confirmationToken === null && 
        event.params.where && event.params.where.confirmationToken;
      
      if (!isConfirmationProcess) {
        // Get the current user state
        const user = await strapi.query('plugin::users-permissions.user').findOne({
          where: { id: event.params.where.id }
        });
        
        // If user was previously unconfirmed, don't allow automatic confirmation
        if (user && user.confirmed === false) {
          // Set it back to false
          event.params.data.confirmed = false;
          console.warn('Prevented automatic confirmation for user:', user.id);
        }
      }
    }
  },
  
  async afterCreate(event) {
    const { result } = event;
    
    // Double-check that the user is marked as unconfirmed
    if (result.confirmed === true) {
      // Force it back to false
      await strapi.query('plugin::users-permissions.user').update({
        where: { id: result.id },
        data: { confirmed: false }
      });
      
      console.warn('Corrected automatically confirmed user:', result.id);
    }
    
    // Generate a confirmation token if none exists
    if (!result.confirmationToken) {
      const crypto = require('crypto');
      const confirmationToken = crypto.randomBytes(64).toString('hex');
      
      await strapi.query('plugin::users-permissions.user').update({
        where: { id: result.id },
        data: { confirmationToken }
      });
    }
  }
};