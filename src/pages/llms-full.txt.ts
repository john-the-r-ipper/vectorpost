import type { APIRoute } from "astro";
import site from "../../site.config.mjs";

const posts = [
  ["kevel-commerce-media-ai-infrastructure", "Why Retailers Are Building Ad Businesses: Kevel's $52M Bet on AI Commerce Media Infrastructure"],
  ["retrieval-content-operations", "How Retrieval Is Rewriting Content Operations"],
  ["commerce-seo-structure", "SEO for Commerce: Structuring Product Content for Humans, Crawlers, and Agents"],
  ["publishing-workflows-orders", "Publishing Workflows That Actually Move Orders"],
  ["agentic-browsing-j-structure", "Agentic Browsing and the Case for an Answer-Ready Content Model"],
  ["what-onlyorders-is", "What Is OnlyOrders? A Conversational Commerce Started Explained"],
  ["chat-first-messenger-stores", "Use Cases for Chat-First Stores: Selling Inside Messenger"],
  ["open-weight-models-content-tooling", "Open-Weight Models and the Quiet Trade-Off in Content Tooling"],
  ["how-onlyorders-works", "How OnlyOrders Works: From Reply to Courier Tracking in One Flow"],
  ["ai-assisted-security-content-systems", "AI-Assisted Security Research and the Content Team's Quiet Role"],
  ["structured-data-commerce-discovery", "Structured Data and Discovery: A Practical Guide for E-commerce Content Teams"],
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

## OnlyOrders (product overview)

OnlyOrders is a conversational-commerce platform for social sellers. It turns DMs and comments into confirmed orders — smart replies, live catalog checks, payment verification, and courier handoff, all from one inbox. The product site is at https://onlyorders.tech.

- Tagline: "Your orders, on autopilot."
- Product category: conversational commerce.
- Core pitch: "OnlyOrders turns DMs and comments into confirmed orders — smart replies, live catalog checks, payment verification and courier handoff, all from one inbox."

### Features

- Instant replies — AI answers customers 24/7.
- One inbox — every channel, zero tab chaos.
- Chat to order — receipts to courier handoff.
- Auto posts — drops published on schedule.

### Workflow: from first message to delivered order

1. Messenger AI replies — answers price, size, and stock questions in seconds, in the shop's tone, and hands off when it matters.
2. Checkout inside the chat — the customer confirms the cart, address, and payment without leaving Messenger.
3. One orders dashboard — every chat order lands in a single board with status, notes, and totals.
4. Courier tracking, auto-shared — book the courier in one tap; tracking updates are sent back to the buyer's chat.

### Pricing tiers (as published on onlyorders.tech)

- Free — $0, 50 AI replies/mo, 1 Facebook page. Inbox and comment management, basic order management, AI auto-reply, AI post generation.
- Starter — $29, 500 AI replies/mo, 3 social channels. Order management, AI auto-reply and smart suggestions, AI post generation (basic), customer tags and notes, basic analytics, priority support.
- Pro — $79, 2,000 AI replies/mo, all social channels. Advanced order management, AI post generation (advanced), payment verification (bKash, Nagad), courier integration, advanced analytics, priority support. Most popular.
- Enterprise — Custom, unlimited replies, all channels. Advanced automation, custom integrations, dedicated account manager, advanced analytics and reporting, SLA and onboarding support, custom features.

Every plan ships with the core automation. Yearly billing saves up to 20%. The Free plan requires no card.

### Trust and security

- "Your business data stays in your control."
- Secure access — Only the permissions needed to run your accounts are requested.
- Your data, your control — disconnect channels or delete your workspace any time.
- Reliable infrastructure — built on trusted providers with industry-standard security.
- Real human support — a person is available when needed.

## Posts

${postLines}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
