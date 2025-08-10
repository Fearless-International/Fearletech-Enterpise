import type { CollectionConfig } from 'payload';

export const CreativeBrandingProjects: CollectionConfig = {
    slug: 'creative-branding-projects',
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
