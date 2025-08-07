// F:\fearlessagency\usergate\src\extensions\users-permissions\services\jwt.ts

import jwt, { SignOptions } from 'jsonwebtoken';

export default {
  issue(payload, jwtOptions = {}) {
    const options: SignOptions = {
      expiresIn: '30d',
      ...jwtOptions,
    };
    
    return jwt.sign(
      payload,
      strapi.config.get('plugin.users-permissions.jwtSecret'),
      options
    );
  },
  
  verify(token) {
    return jwt.verify(
      token,
      strapi.config.get('plugin.users-permissions.jwtSecret')
    );
  },
};