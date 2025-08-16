import type { CollectionConfig } from 'payload';

export const UIUXInterfaces: CollectionConfig = {
    slug: 'uiux-interfaces',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true, // Allow all users to read the collection
    },
    fields: [
        {
            name: 'heroImageUrl',
            type: 'text',
            required: true,
            label: 'Service Hero Image URL',
        },
        {
            name: 'sideImageUrl',
            type: 'text',
            label: 'Side Image URL',
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Service Title',
        },
        {
            name: 'subtitle',
            type: 'text',
            label: 'Service Subtitle',
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            label: 'Service Description',
        },
        {
            name: 'additionalDescription',
            type: 'textarea',
            label: 'Additional Description',
        },
        {
            name: 'serviceFeatures',
            type: 'array',
            label: 'UI/UX Features/Components',
            fields: [
                {
                    name: 'featureTitle',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'featurePoints',
                    type: 'array',
                    fields: [
                        {
                            name: 'point',
                            type: 'textarea',
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            name: 'workingApproach',
            type: 'array',
            label: 'Working Approach Steps',
            fields: [
                {
                    name: 'stepTitle',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'stepDescription',
                    type: 'textarea',
                    required: true,
                },
            ],
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'URL Slug',
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
            label: 'Service Active',
        },
    ],
};