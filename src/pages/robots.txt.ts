import type { APIRoute } from "astro";
import site from "../../site.config.mjs";

export const GET: APIRoute = () => {
  const sitemapUrl = new URL("sitemap-index.xml", site.siteUrl + site.basePath).toString();
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
