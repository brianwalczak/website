import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          label: 'Post Title',
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            width: '75%',
            placeholder: 'Enter your post title...',
          },
        },
        {
          label: 'URL Slug',
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            width: '25%',
            placeholder: 'url-slug',
          },
        },
      ],
    },
    {
      label: 'Content',
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      label: 'Published Date',
      name: "createdAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
