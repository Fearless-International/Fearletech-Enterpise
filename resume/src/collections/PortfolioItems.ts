import type { CollectionConfig } from 'payload'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'detailsLink',
      type: 'text',
      label: 'Details Link',
      defaultValue: '/project-details',
    },
    {
      name: 'portfolioLink',
      type: 'text',
      label: 'Portfolio Grid Link',
      defaultValue: '/portfolio-grid',
    },
  ],
}