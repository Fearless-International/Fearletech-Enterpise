// F:\fearlessagency\usergate\src\extensions\users-permissions\controllers\user.ts
const { factories: strapiUserContFactories } = require('@strapi/strapi');
module.exports = strapiUserContFactories.createCoreController('plugin::users-permission.user', ({ strapi }) => ({

  async register(ctx) {
    const { email, username, password, fullName } = ctx.request.body;

    if (!email || !password) {
      return ctx.badRequest('Email and Password are required.');
    }

    try {
      const confirmationToken = strapi.service('plugin::users-permissions.user').generateToken();

      // Create the user
      const user = await strapi.service('plugin::users-permissions.user').add({
        email,
        username: username || email,
        password,
        fullName,
        confirmationToken,
        confirmed: false,
      });

      const confirmationUrl = `${process.env.FRONTEND_URL}/verify-email?confirmation=${confirmationToken}`;

      // Send email
      await strapi.plugins['email'].services.email.send({
        to: email,
        subject: 'Confirm your email address',
        html: `
          <h1>Email Confirmation</h1>
          <p>Hi ${fullName || email},</p>
          <p>Click the link below to confirm your email address:</p>
          <a href="${confirmationUrl}">Confirm Email</a>
        `,
      });

      ctx.send({ message: 'Registration successful. Please check your email to confirm your account.' });
    } catch (error) {
      ctx.badRequest(error.message);
    }
  },

  async confirmEmail(ctx) {
    const { confirmation } = ctx.query;

    if (!confirmation) {
      return ctx.badRequest('Invalid token.');
    }

    try {
      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { confirmationToken: confirmation } });

      if (!user) {
        return ctx.badRequest('Invalid token.');
      }

      await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: { confirmationToken: null, confirmed: true },
      });

      ctx.send({ message: 'Email confirmed successfully.' });
    } catch (error) {
      ctx.badRequest(error.message);
    }
  },
}));
