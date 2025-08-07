interface AdminPanelConfig {
  config: {
    locales: string[];
    translations: {
      [key: string]: {
        [key: string]: string;
      };
    };
    notifications: {
      releases: boolean;
    };
  };
  bootstrap(): void;
}

const adminConfig: AdminPanelConfig = {
  config: {
    locales: ['en'],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Your Admin Panel",
      },
    },
    notifications: {
      releases: false,
    },
  },
  bootstrap() {},
};

export default adminConfig;