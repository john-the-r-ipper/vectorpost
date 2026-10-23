import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import site from "./site.config.mjs";

export default defineConfig({
  site: site.siteUrl,
  base: site.basePath,
  integrations: [sitemap({ filter: (page) => !page.endsWith("/404") })],
});
