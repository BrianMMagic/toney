import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string().default('Anthony Dempsey'),
    category: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
