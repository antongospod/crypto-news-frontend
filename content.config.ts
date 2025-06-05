// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        en: defineCollection({
            type: 'page',
            source: 'en/news/**/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string().optional(),
                date: z.string().optional(),
                tag: z.string().optional(),
                feature: z.boolean().optional()
            })
        }),
        it: defineCollection({
            type: 'page',
            source: 'it/news/**/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string().optional(),
                date: z.string().optional(),
                tag: z.string().optional(),
                feature: z.boolean().optional()
            })
        }),
        ru: defineCollection({
            type: 'page',
            source: 'ru/news/**/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string().optional(),
                date: z.string().optional(),
                tag: z.string().optional(),
                feature: z.boolean().optional()
            })
        })
    }
})
