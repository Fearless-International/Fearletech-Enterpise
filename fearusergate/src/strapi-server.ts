import crypto from 'crypto';

const pluginMethods = (plugin: any) => {
  // Handle the email confirmation logic for user registration
  plugin.methods.user.emailConfirmation = async (ctx: any) => {
    const { confirmation: confirmationToken } = ctx.query;

    if (!confirmationToken) {
      return ctx.badRequest('Invalid token');
    }

    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { confirmationToken },
    });

    if (!user) {
      return ctx.badRequest('Invalid token');
    }

    await strapi.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: {
        confirmed: true,
        confirmationToken: null,
      },
    });

    const jwt = strapi.plugins['users-permissions'].service('jwt').issue({
      id: user.id,
    });

    const redirectUrl = `${process.env.ANGULAR_DASHBOARD_URL}?token=${jwt}`;

    try {
      const emailService = strapi.plugins['email'].service('email');

      if (!emailService) {
        throw new Error('Email service not found');
      }

      // Send email to user upon confirmation
      await emailService.send({
        to: user.email,
        from: process.env.SMTP_DEFAULT_FROM,
        subject: 'Email Confirmed - Fearless Agency',
        html: `
          <h1>Your Email is Confirmed!</h1>
          <p>Hello ${user.username},</p>
          <p>Your email has been successfully confirmed. You can now access our platform fully.</p>
          <p>Best regards,<br/>Fearless Agency</p>
        `,
      });

      console.log('Confirmation email sent successfully.');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }

    return ctx.redirect(redirectUrl);
  };

  // Override registration logic to handle email confirmations
  plugin.methods.auth.register = async (ctx: any, next: any) => {
    const pluginStore = await strapi.store({
      type: 'plugin',
      name: 'users-permissions',
    });

    interface AdvancedSettings {
      email_confirmation: boolean;
    }

    const settings = (await pluginStore.get({ key: 'advanced' })) as AdvancedSettings;

    const { username, email, password, fullName } = ctx.request.body;

    if (settings.email_confirmation) {
      try {
        const confirmationToken = crypto.randomBytes(20).toString('hex');

        const user = await strapi.plugin('users-permissions').service('user').add({
          username,
          email,
          password,
          fullName,
          confirmed: false,
          confirmationToken,
        });

        const confirmationUrl = `${process.env.FRONTEND_URL}/verify-email?confirmation=${confirmationToken}`;

        try {
          const emailService = strapi.plugin('email').service('email');
          if (!emailService) {
            throw new Error('Email service not found');
          }

          // Send confirmation email
          await emailService.send({
            to: user.email,
            from: process.env.SMTP_DEFAULT_FROM,
            subject: 'Email Confirmation - Fearless Agency',
            html: `
              <h1>Verify Your Email Address</h1>
              <p>Dear ${fullName || user.username},</p>
              <p>Please confirm your email address by clicking the button below:</p>
              <a href="${confirmationUrl}" style="color: #fff; background-color: #2563EB; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email Address</a>
              <p>If the button doesn't work, use this link: ${confirmationUrl}</p>
              <p>Best regards,<br/>Fearless Agency</p>
            `,
          });

          console.log('Confirmation email sent successfully.');
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
        }

        ctx.send({
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            confirmed: false,
          },
          message: 'Confirmation email sent. Please check your inbox.',
        });
      } catch (error) {
        ctx.badRequest('Error', error.message);
      }
    } else {
      return await strapi.plugin('users-permissions').controller('auth').register(ctx, next);
    }
  };

  // Contact form after creation lifecycle using plugin methods
  plugin.methods.contactForm.afterCreate = async (event: any) => {
    const { result } = event;
    const { strapi } = require('@strapi/strapi');
    
    try {
      // Send email to admin
      await strapi.plugin('email').service('email').send({
        to: process.env.ADMIN_EMAIL,
        subject: 'New Contact Form Submission',
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>From:</strong> ${result.name}</p>
          <p><strong>Email:</strong> ${result.email}</p>
          <p><strong>Phone:</strong> ${result.phone}</p>
          <p><strong>Subject:</strong> ${result.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${result.message}</p>
        `,
      });

      // Send confirmation email to user
      await strapi.plugin('email').service('email').send({
        to: result.email,
        subject: `We received your message: ${result.subject}`,
        html: `
          <h1>Thank you for contacting us!</h1>
          <p>Dear ${result.name},</p>
          <p>We have received your message regarding "${result.subject}" and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <blockquote>${result.message}</blockquote>
          <p>Best regards,<br/>Your Company Name</p>
        `,
      });

      console.log('Emails sent successfully');
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  return plugin;
};

export default pluginMethods;
