declare module '@strapi/strapi' {
    interface StrapiGlobal {
      plugins: {
        email: {
          services: {
            email: {
              send: (options: EmailOptions) => Promise<void>;
            };
          };
        };
      };
      query(model: string): any;
    }
  
    interface EmailOptions {
      to: string;
      subject: string;
      text?: string;
      html?: string;
      from?: string;
    }
  }