import type { CollectionConfig } from 'payload'

export const FeaPortfolio: CollectionConfig = {
  slug: 'FeaPortfolio',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
      defaultValue: 'Development',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      label: 'Client Name',
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
    },
    {
      name: 'designer',
      type: 'text',
      label: 'Designer',
      defaultValue: 'UiCamp',
    },
    {
      name: 'mainImage',
      type: 'text',
      label: 'Main/Header Image URL',
      required: true,
    },
    {
      name: 'thumbnailImage',
      type: 'text',
      label: 'Thumbnail Image URL (for portfolio grid)',
      required: true,
    },
    {
      name: 'challengeTitle',
      type: 'text',
      label: 'Challenge Section Title',
      defaultValue: '01 . The Challenge',
    },
    {
      name: 'challengeHeading',
      type: 'textarea',
      label: 'Challenge Heading',
    },
    {
      name: 'challengeDescription',
      type: 'textarea',
      label: 'Challenge Description',
    },
    {
      name: 'solutionTitle',
      type: 'text',
      label: 'Solution Section Title',
      defaultValue: '02 . The Solution',
    },
    {
      name: 'solutionDescription',
      type: 'textarea',
      label: 'Solution Description',
    },
    {
      name: 'projectImages',
      type: 'array',
      label: 'Project Images',
      fields: [
        {
          name: 'imageUrl',
          type: 'text',
          label: 'Image URL',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image Caption (optional)',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
    },
  ],
}