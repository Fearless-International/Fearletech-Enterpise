import type { Schema, Struct } from '@strapi/strapi';

export interface SharedUser extends Struct.ComponentSchema {
  collectionName: 'components_shared_users';
  info: {
    displayName: 'User';
    icon: 'information';
  };
  attributes: {};
}

export interface SharedUserInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_user_infos';
  info: {
    description: '';
    displayName: 'user-info';
    icon: 'user';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.BigInteger & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.user': SharedUser;
      'shared.user-info': SharedUserInfo;
    }
  }
}
