import type { CollectionConfig } from 'payload';

export const VideoEditingAnimationProjects: CollectionConfig = {
    slug: 'video-editing-animation-projects',
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
            name: 'videoUrl',
            type: 'text',
            label: 'Video URL',
            required: true, // Ensure a video URL is provided
        },
        {
            name: 'secondaryImages',
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

