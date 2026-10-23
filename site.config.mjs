const siteUrl = process.env.SITE_URL || "https://vectorpost.example";
const basePath = process.env.BASE_PATH || "/";

export default {
  name: "Vectorpost",
  tagline: "Content operations and commerce SEO for teams who publish where customers buy.",
  description:
    "Vectorpost is a blog about content operations, retrieval, and search for e-commerce — writing about publishing workflows, embeddings, and the systems behind discoverable product content.",
  siteUrl,
  basePath,
  author: "Vectorpost Editorial Desk",
  publisher: "OnlyOrders",
  publisherUrl: "https://onlyorders.tech",
};
