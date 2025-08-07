// F:\fearlessagency\usergate\src\api\auth\lifecycles.ts

export default {
  async afterRegister(event) {
    const { result, params } = event;
    const { strapi } = require('@strapi/strapi');
    
    try {
      // Send confirmation email to the newly registered user
      const confirmationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?confirmation=${result.confirmationToken}`;
      
      await strapi.plugins['email'].services.email.send({
        to: result.email,
        subject: 'Please confirm your registration',
        html: `
          <h1>Welcome to our platform!</h1>
          <p>Thank you for registering with us, ${result.fullName || result.username}!</p>
          <p>Please click the link below to verify your email address:</p>
          <a href="${confirmationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>If the button doesn't work, you can copy and paste this URL into your browser:</p>
          <p>${confirmationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br/>Your Company Name</p>
        `,
      });
      
      console.log('Registration confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  },
  
  async afterEmailConfirmation(event) {
    const { result } = event;
    const { strapi } = require('@strapi/strapi');
    
    try {
      // Send welcome email to user after they've confirmed their account
      await strapi.plugins['email'].services.email.send({
        to: result.email,
        subject: 'Welcome to our platform!',
        html: `
          <h1>Your account is now activated!</h1>
          <p>Dear ${result.fullName || result.username},</p>
          <p>Your email has been confirmed and your account is now fully activated.</p>
          <p>You can now log in to our platform and access all our services.</p>
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/sign-in" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Log in now</a>
          <p>Best regards,<br/>Your Company Name</p>
        `,
      });
      
      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  },
  
  async afterResetPassword(event) {
    const { result } = event;
    const { strapi } = require('@strapi/strapi');
    
    try {
      // Send notification email after password reset
      await strapi.plugins['email'].services.email.send({
        to: result.email,
        subject: 'Your password has been reset',
        html: `
          <h1>Password Reset Successful</h1>
          <p>Dear ${result.fullName || result.username},</p>
          <p>Your password has been successfully reset.</p>
          <p>If you did not request this change, please contact our support team immediately.</p>
          <p>Best regards,<br/>Your Company Name</p>
        `,
      });
      
      console.log('Password reset notification email sent successfully');
    } catch (error) {
      console.error('Error sending password reset notification:', error);
    }
  },
};