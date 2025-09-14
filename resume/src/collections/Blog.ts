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
      name: 'publishDate',
      type: 'date',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
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