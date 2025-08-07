interface ContactResult {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface LifecycleEvent {
  result: ContactResult;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Strapi {
    interface Lifecycles {
      afterCreate(event: LifecycleEvent): Promise<void>;
    }
  }
}

const lifecycles = {
  async afterCreate(event: LifecycleEvent) {
    const { result } = event;

    try {
      // Get the email service
      const emailService = strapi.plugin('email').service('email');

      if (!emailService) {
        throw new Error('Email service not found');
      }

      // Send email to admin
      await emailService.send({
        to: process.env.SMTP_USERNAME,
        from: process.env.SMTP_USERNAME,
        subject: 'New Contact Submission',
        html: `
          <h1>New Contact Submission</h1>
          <p><strong>From:</strong> ${result.name}</p>
          <p><strong>Email:</strong> ${result.email}</p>
          ${result.phone ? `<p><strong>Phone:</strong> ${result.phone}</p>` : ''}
          ${result.subject ? `<p><strong>Subject:</strong> ${result.subject}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${result.message}</p>
        `,
      });

      // Send confirmation email to user
      await emailService.send({
        to: result.email,
        from: process.env.SMTP_USERNAME,
        subject: result.subject ? `Thank you for your message: ${result.subject}` : 'Thank you for your message',
        html: `
          <h1>Thank you for contacting us!</h1>
          <p>Dear ${result.name},</p>
          <p>We have received your message${result.subject ? ` regarding "${result.subject}"` : ''} and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <blockquote>${result.message}</blockquote>
          <p>Best regards,<br/>Fearless International</p>
        `,
      });

      console.log('Emails sent successfully');
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  },
};

export default lifecycles;