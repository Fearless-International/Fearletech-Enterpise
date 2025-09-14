import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
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
      name: 'author',
      type: 'text',
      defaultValue: 'Admin',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Admin',
      required: true,
    },
    {
      name: 'authorBio',
      type: 'textarea',
      label: 'Author Biography',
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
    },
    {
      name: 'image',
      type: 'text',
      label: 'Main Image URL',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Short Description/Excerpt',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Blog Content',
      required: true,
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Featured Quote',
    },
    {
      name: 'quoteAuthor',
      type: 'text',
      label: 'Quote Author',
      defaultValue: 'UiCamp',
    },
    {
      name: 'additionalImages',
      type: 'array',
      label: 'Additional Content Images',
      fields: [
        {
          name: 'imageUrl',
          type: 'text',
          label: 'Image URL',
        },
      ],
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
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'blogGridLink',
      type: 'text',
      label: 'Blog Grid Link',
      defaultValue: '/blog-grid-sidebar',
    },
    {
      name: 'blogDetailsLink',
      type: 'text',
      label: 'Blog Details Link',
      defaultValue: '/blog-details',
    },
  ],
}