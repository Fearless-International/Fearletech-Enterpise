// F:\fearlessagency\usergate\src\extensions\users-permissions\controllers\auth.ts

import _ from 'lodash';
import { Context as KoaContext } from 'koa';
const { factories: strapiUserFactories } = require('@strapi/strapi');


const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface ExtendedKoaContext extends KoaContext {
  state: {
    user?: any;
  };
}

module.exports = strapiUserFactories.createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
  async register(ctx: ExtendedKoaContext) {
    const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });
    
    const settings = await pluginStore.get({ key: 'advanced' });
    
    if (!settings.allow_register) {
      throw new Error('Registration is disabled');
    }
    
    const { email, username, password, fullName } = ctx.request.body;
    
    // Input validation
    if (!email) throw new Error('Please provide your email');
    if (!emailRegExp.test(email)) throw new Error('Please provide a valid email address');
    if (!password) throw new Error('Please provide your password');
    if (!username) throw new Error('Please provide your username');
    if (!fullName) throw new Error('Please provide your full name');
    
    const role = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: settings.default_role } });
    
    if (!role) {
      throw new Error('Impossible to find the default role');
    }
    
    // Check if user with the same email already exists
    const userWithSameEmail = await strapi
      .query('plugin::users-permissions.user')
      .findOne({ where: { email: email.toLowerCase() } });
    
    if (userWithSameEmail) {
      throw new Error('Email is already taken');
    }
    
    // Check if user with the same username already exists
    if (username) {
      const userWithSameUsername = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ where: { username } });
      
      if (userWithSameUsername) {
        throw new Error('Username is already taken');
      }
    }
    
    try {
      const user = await strapi.query('plugin::users-permissions.user').create({
        data: {
          username,
          email: email.toLowerCase(),
          password,
          fullName,
          role: role.id,
          provider: 'local',
        },
      });
      
      // Send confirmation email
      const userPermissionService = strapi.plugin('users-permissions').service('users-permissions');
      const registrationToken = await userPermissionService.generateRegistrationToken(user);
      
      const confirmationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?confirmation=${registrationToken}`;
      
      // Send email with confirmation URL
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        subject: 'Confirm your account',
        html: `
          <h1>Welcome to our platform!</h1>
          <p>Thank you for registering!</p>
          <p>Please click the link below to verify your email address:</p>
          <a href="${confirmationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>If the button doesn't work, you can copy and paste this URL into your browser:</p>
          <p>${confirmationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br/>Your Company Name</p>
        `,
      });
      
      const sanitizedUser = await sanitizeUser(user, strapi);
      
      if (settings.email_confirmation) {
        return ctx.send({
          user: sanitizedUser,
          message: 'Please check your email to confirm your account',
        });
      }
      
      const jwt = strapi.plugin('users-permissions').service('jwt').issue({
        id: user.id,
      });
      
      return ctx.send({
        jwt,
        user: sanitizedUser,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  async emailConfirmation(ctx: ExtendedKoaContext) {
    const { confirmation: confirmationToken } = ctx.query;
    
    if (!confirmationToken) {
      throw new Error('Missing confirmation token');
    }
    
    const { user: userService } = strapi.plugins['users-permissions'].services;
    const jwt = strapi.plugins['users-permissions'].services.jwt;
    
    try {
      // Find the user based on the confirmation token
      const user = await userService.fetch({
        confirmationToken,
      });
      
      if (!user) {
        throw new Error('Invalid token');
      }
      
      // Update the user to mark as confirmed
      await userService.edit(user.id, {
        confirmed: true,
        confirmationToken: null,
      });
      
      // Generate JWT token
      const token = jwt.issue({
        id: user.id,
      });
      
      // Redirect to the frontend login page with a success message
      return ctx.redirect(`${process.env.FRONTEND_URL}/sign-in?verified=true`);
    } catch (error) {
      return ctx.redirect(`${process.env.FRONTEND_URL}/sign-in?error=${error.message}`);
    }
  },
  
  async resendConfirmationEmail(ctx: ExtendedKoaContext) {
    const { email } = ctx.request.body;
    
    if (!email) {
      throw new Error('Please provide your email');
    }
    
    if (!emailRegExp.test(email)) {
      throw new Error('Please provide a valid email address');
    }
    
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email: email.toLowerCase() },
    });
    
    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return ctx.send({
        message: 'Email sent successfully',
      });
    }
    
    if (user.confirmed) {
      return ctx.send({
        message: 'Your account is already confirmed',
      });
    }
    
    try {
      // Generate new confirmation token
      const userPermissionService = strapi.plugin('users-permissions').service('users-permissions');
      const confirmationToken = await userPermissionService.generateRegistrationToken(user);
      
      const confirmationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?confirmation=${confirmationToken}`;
      
      // Send email with confirmation URL
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        subject: 'Confirm your account',
        html: `
          <h1>Welcome to our platform!</h1>
          <p>Thank you for registering!</p>
          <p>Please click the link below to verify your email address:</p>
          <a href="${confirmationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>If the button doesn't work, you can copy and paste this URL into your browser:</p>
          <p>${confirmationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br/>Your Company Name</p>
        `,
      });
      
      return ctx.send({
        message: 'Email sent successfully',
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
}));

const sanitizeUser = (user, strapi) => {
  const { auth } = strapi.plugins['users-permissions'].services;
  return auth.sanitizeUser(user);
};