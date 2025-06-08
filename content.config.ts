import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export const ArticleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  img: z.string().optional(),
  date: z.string().optional(),
  updated: z.string().optional(),
  tag: z.string().optional(),
  alt: z.string().optional(),
  slug: z.string().optional(),
  toc: z.boolean().optional(),
  feature: z.boolean().optional(),
})

export default defineContentConfig({
  collections: {
    en: defineCollection({
      type: 'page',
      source: 'en/news/**/*.md',
      schema: ArticleSchema,
    }),
    ru: defineCollection({
      type: 'page',
      source: 'ru/news/**/*.md',
      schema: ArticleSchema,
    }),
    it: defineCollection({ // итальянский
      type: 'page',
      source: 'news/**/*.md',
      schema: ArticleSchema,
    }),
  },
})
