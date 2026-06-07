import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const journal = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    format: z.enum(["essay", "field-note", "fragment", "photo-story", "moment"]),
    themes: z.array(z.string()).default([]),
    cover: z.string(),
    coverAlt: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
    quote: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    videoUrl: z.string().url().optional(),
  }),
});

export const collections = { journal };
