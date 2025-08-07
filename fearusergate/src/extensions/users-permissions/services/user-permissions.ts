// F:\fearlessagency\usergate\src\extensions\users-permissions\services\users-permissions.ts

import crypto from 'crypto';
import { errors } from '@strapi/utils';

const { ApplicationError } = errors;

export default {
  generateRegistrationToken: async (user) => {
    // Create a random token for email verification
    const confirmationToken = crypto.randomBytes(64).toString('hex');
    
    // Update the user with the token
    await strapi.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: { confirmationToken },
    });
    
    return confirmationToken;
  },
};