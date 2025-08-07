import type { CollectionConfig } from 'payload';

export const SocialMediaManagementProjects: CollectionConfig = {
    slug: 'social-media-management-projects',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true, // Allow all users to read the collection
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'mainImageUrl',
            type: 'text',
            label: 'Main Image URL',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'imageUrl',
                    type: 'text',
                    label: 'Image URL',
                    required: true,
                },
                {
                    name: 'alt',
                    type: 'text',
                },
            ],
        },
    ],
};
