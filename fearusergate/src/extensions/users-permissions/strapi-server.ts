'use strict';

import crypto from 'crypto';

// Define the structure of advanced settings
interface AdvancedSettings {
  email_confirmation: boolean;
  [key: string]: any; // Allow other properties
}

module.exports = (plugin) => {
  // Initialize the plugin store
  const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });
  
  // Override the register controller to ensure confirmed is false
  const originalRegister = plugin.controllers.auth.register;
  
  plugin.controllers.auth.register = async (ctx) => {
    // Force email confirmation required
    try {
      // Get advanced settings
      const settings = await pluginStore.get({ key: 'advanced' }) as AdvancedSettings;
      
      // Force email confirmation to true
      const currentSetting = settings.email_confirmation;
      settings.email_confirmation = true;
      
      // Update store temporarily
      await pluginStore.set({ key: 'advanced', value: settings });
      
      // Get the body and force confirmed to false
      ctx.request.body.confirmed = false;
      
      // Call original register function
      const result = await originalRegister(ctx);
      
      // Restore original setting
      settings.email_confirmation = currentSetting;
      await pluginStore.set({ key: 'advanced', value: settings });
      
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return ctx.badRequest('Registration failed');
    }
  };
  
  // Extend the email confirmation controller
  plugin.controllers.auth.emailConfirmation = async (ctx) => {
    const { confirmation: confirmationToken } = ctx.query;
    
    if (!confirmationToken) {
      return ctx.badRequest('Confirmation token is required');
    }
    
    // Find user with the token
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { confirmationToken }
    });
    
    if (!user) {
      return ctx.badRequest('Invalid confirmation token');
    }
    
    // Update user as confirmed
    await strapi.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: {
        confirmed: true,
        confirmationToken: null
      }
    });
    
    // Send welcome email
    try {
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        subject: 'Welcome to our platform!',
        html: `
          <h1>Welcome to our platform!</h1>
          <p>Dear ${user.fullName || user.username},</p>
          <p>Your email has been successfully verified. Thank you for joining our platform!</p>
          <p>You can now log in and access all our features.</p>
          <p>Best regards,<br/>${process.env.APP_NAME || 'Your Company Name'}</p>
        `,
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
    
    // Redirect to frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return ctx.redirect(`${frontendUrl}/verification-success`);
  };
  
  // Implement send-email-confirmation controller
  plugin.controllers.auth['send-email-confirmation'] = async (ctx) => {
    const { email } = ctx.request.body;
    
    if (!email) {
      return ctx.badRequest('Email is required');
    }
    
    // Find the user
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email: email.toLowerCase() },
    });
    
    if (!user) {
      // Return success even if user doesn't exist for security reasons
      return ctx.send({ ok: true, message: 'Confirmation email sent if user exists' });
    }
    
    // User already confirmed - still return success
    if (user.confirmed) {
      return ctx.send({ ok: true, message: 'User already confirmed' });
    }
    
    try {
      // Generate confirmation token if needed
      let confirmationToken = user.confirmationToken;
      
      if (!confirmationToken) {
        confirmationToken = crypto.randomBytes(64).toString('hex');
        
        await strapi.query('plugin::users-permissions.user').update({
          where: { id: user.id },
          data: { confirmationToken },
        });
      }
      
      // Send confirmation email
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        subject: 'Verify your email address',
        html: `
          <h1>Welcome to ${process.env.APP_NAME || 'Our Website'}!</h1>
          <p>Hello ${user.fullName || user.username},</p>
          <p>Thank you for signing up. Please confirm your email address by clicking the link below:</p>
          <p>
            <a href="${frontendUrl}/verify-email?confirmation=${confirmationToken}">
              Verify your email address
            </a>
          </p>
          <p>If you did not sign up for our service, please ignore this email.</p>
          <p>Best regards,<br/>${process.env.APP_NAME || 'Your Company Name'}</p>
        `,
      });
      
      return ctx.send({ ok: true, message: 'Confirmation email sent successfully' });
    } catch (err) {
      console.error('Error sending confirmation email:', err);
      return ctx.badRequest('Failed to send confirmation email');
    }
  };
  
  // Ensure routes exist
  const routes = plugin.routes['content-api'].routes;
  
  // Check if email-confirmation route exists and add if not
  const emailConfirmationRouteExists = routes.some(
    route => route.path === '/auth/email-confirmation'
  );
  
  if (!emailConfirmationRouteExists) {
    routes.push({
      method: 'GET',
      path: '/auth/email-confirmation',
      handler: 'auth.emailConfirmation',
      config: {
        middlewares: [],
        policies: [],
        prefix: '',
      },
    });
  }
  
  // Check if send-email-confirmation route exists and add if not
  const sendEmailConfirmationRouteExists = routes.some(
    route => route.path === '/auth/send-email-confirmation'
  );
  
  if (!sendEmailConfirmationRouteExists) {
    routes.push({
      method: 'POST',
      path: '/auth/send-email-confirmation',
      handler: 'auth.send-email-confirmation',
      config: {
        middlewares: [],
        policies: [],
        prefix: '',
      },
    });
  }
  
  return plugin;
};