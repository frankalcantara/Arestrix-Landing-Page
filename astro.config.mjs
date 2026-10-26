// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config.ts";

// SITE_URL lets Cloudflare (or a preview) set its own address without editing src/config.ts.
export default defineConfig({
  site: process.env.SITE_URL || SITE.url,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
