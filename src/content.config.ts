import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    /** The short line under the title on the card and detail page. */
    tags: z.string(),
    /** One or two sentences for the capabilities page. */
    summary: z.string(),
    /** Lower comes first. */
    order: z.number().default(100),
    /** The card's line animation (see src/components/ServiceArt.astro). */
    art: z.enum(["graph", "code", "runner", "chip", "layers", "shield"]),
    /** Optional short label: the step name on the capabilities page and in the home page index. */
    label: z.string().optional(),
    /** What the client keeps at the end. */
    deliverables: z.array(z.string()).default([]),
  }),
});

export const collections = { services };
