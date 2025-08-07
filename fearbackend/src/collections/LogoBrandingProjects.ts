import type { CollectionConfig } from 'payload';

export const LogoBrandingProjects: CollectionConfig = {
  slug: 'logo-branding-projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Allow all users to read the collection
  },
  fields: [
    {
      name: 'client',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
    },
    {
      name: 'duration',
      type: 'text',
    },
    {
      name: 'cost',
      type: 'text',
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'secondaryImages', // Updated field for multiple images
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'text',
          type: 'textarea',
        },
      ],
    },
  ],
};

export default LogoBrandingProjects;