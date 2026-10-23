import type { APIRoute } from "astro";
import site from "../../site.config.mjs";

const agents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "Bingbot",
];

export const GET: APIRoute = () => {
  const sitemapUrl = new URL("sitemap-index.xml", site.siteUrl + site.basePath).toString();
  const blocks = agents.map((agent) => `User-agent: ${agent}\nAllow: /\n`);
  const body = `${blocks.join("\n")}User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
