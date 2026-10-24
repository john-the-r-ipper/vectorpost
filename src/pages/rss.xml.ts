import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import site from "../../site.config.mjs";

const esc = (s: string) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!)
  );

export const GET: APIRoute = async () => {
  const basePath = site.basePath.endsWith("/") ? site.basePath : site.basePath + "/";
  const base = new URL(basePath, site.siteUrl).toString();
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const items = posts
    .map((p) => {
      const u = new URL(`blog/${p.slug}/`, base).toString();
      return `<item><title>${esc(p.data.title)}</title><link>${u}</link><guid>${u}</guid><pubDate>${p.data.pubDate.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`;
    })
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)}</title><link>${base}</link><description>${esc(site.description)}</description>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/xml" } }
  );
};
