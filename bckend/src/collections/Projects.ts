import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
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
      name: 'secondaryImage',
      type: 'upload',
      relationTo: 'media',
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
      name: 'link', // New field for project-specific links
      type: 'text',
      required: true,
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