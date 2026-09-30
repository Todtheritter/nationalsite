import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const source = z.object({ label: z.string(), url: z.string().url() });

const politicians = defineCollection({
  loader: glob({ base: './src/content/politicians', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    office: z.string(),
    state: z.string(),
    party: z.string(),
    inOfficeSince: z.coerce.date(),
    lastReviewed: z.coerce.date(),
    sources: z.array(source).min(1),
  }),
});

export const collections = { blog, politicians };
