import type { CollectionConfig } from 'payload';

export const ContentCreationProjects: CollectionConfig = {
    slug: 'content-creation-projects',
    admin: {
        useAsTitle: 'title',
    },
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