import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import site from "./site.config.mjs";

export default defineConfig({
  site: site.siteUrl,
  base: site.basePath,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404"),
      serialize: (item) => {
        const isHub = item.url.includes("/onlyorders/");
        return {
          ...item,
          priority: isHub ? 1.0 : 0.6,
          changefreq: "weekly",
        };
      },
    }),
  ],
});
