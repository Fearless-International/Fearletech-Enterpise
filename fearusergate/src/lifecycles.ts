// ./src/api/contact-form/content-types/contact-form/lifecycles.ts

interface ContactFormResult {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Event {
  result: ContactFormResult;
}

export default {
  async afterCreate(event: Event) {
    const { result } = event;
    const { strapi } = require('@strapi/strapi');
    
    try {
      // Send email to admin
      await strapi.plugins['email'].services.email.send({
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
      await strapi.plugins['email'].services.email.send({
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
  },
};