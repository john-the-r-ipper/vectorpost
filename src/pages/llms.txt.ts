import type { APIRoute } from "astro";
import site from "../../site.config.mjs";

const posts = [
  ["retrieval-content-operations", "How Retrieval Is Rewriting Content Operations"],
  ["commerce-seo-structure", "SEO for Commerce: Structuring Product Content for Humans, Crawlers, and Agents"],
  ["publishing-workflows-orders", "Publishing Workflows That Actually Move Orders"],
  ["agentic-browsing-j-structure", "Agentic Browsing and the Case for an Answer-Ready Content Model"],
  ["what-onlyorders-is", "What Is OnlyOrders? A Conversational Commerce Started Explained"],
  ["chat-first-messenger-stores", "Use Cases for Chat-First Stores: Selling Inside Messenger"],
  ["open-weight-models-content-tooling", "Open-Weight Models and the Quiet Trade-Off in Content Tooling"],
  ["how-onlyorders-works", "How OnlyOrders Works: From Reply to Courier Tracking in One Flow"],
  ["ai-assisted-security-content-systems", "AI-Assisted Security Research and the Content Team's Quiet Role"],
];

export const GET: APIRoute = () => {
  const basePath = site.basePath.endsWith("/") ? site.basePath : site.basePath + "/";
  const base = new URL(basePath, site.siteUrl).toString();

  const core = [
    `[Home](${base}): Latest posts and an overview of the blog.`,
    `[About](${base}about/): Who operates the blog and its editorial approach.`,
    `[OnlyOrders hub](${base}onlyorders/): What OnlyOrders is, its features, workflow, and pricing tiers.`,
    `[FAQ](${base}faq/): Frequently asked questions about OnlyOrders.`,
  ].join("\n");

  const postLines = posts
    .map(([slug, title]) => `- [${title}](${base}blog/${slug}/)`)
    .join("\n");

  const body = `# Vectorpost

> Vectorpost is a blog about content operations, retrieval, and search for e-commerce — writing about publishing workflows, embeddings, and the systems behind discoverable product content. It is operated by OnlyOrders (https://onlyorders.tech) for educational and SEO purposes.

## Core pages

${core}

## OnlyOrders facts

OnlyOrders is an AI Commerce Autopilot. Its tagline is "Your orders, on autopilot." It turns DMs and comments into confirmed orders — smart replies, live catalog checks, payment verification, and courier handoff, all from one inbox. It is built for conversational commerce: selling directly inside chat on Messenger, WhatsApp, and Instagram.

## Posts

${postLines}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
