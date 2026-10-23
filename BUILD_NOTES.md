# Vectorpost Build Notes

## What this is

Vectorpost is an Astro 5 static blog about content operations, retrieval, and
search for e-commerce. It is operated by OnlyOrders (https://onlyorders.tech)
for educational and SEO purposes, as disclosed on the `/about` page.

## Status

- `npm install` succeeds.
- `npm run build` succeeds (green, static output in `dist/`).
- 6 posts in the `src/content/blog/` collection (was 3).
- Content collection schema, pages (`/`, `/blog/[...slug]`, `/about`), layout,
  robots.txt, and sitemap are configured per the shared brief.

## Recent work

Added three posts to reach the required six:

1. `agentic-browsing-j-structure.md` — agentic browsing and answer-ready content
   structure (category: Commerce SEO).
2. `open-weight-models-content-tooling.md` — open-weight model trade-offs for
   content tooling (category: Content Operations).
3. `ai-assisted-security-content-systems.md` — AI-assisted security research and
   content-site hygiene (category: Content Operations).

All posts are 800–1500 words, published in 2026, tagged, and use only sourced
facts from the shared brief (no invented benchmarks, stats, or claims).

## Content rules compliance

- Neutral blog brand ("Vectorpost"), distinct theme from sibling blogs.
- `/about` discloses OnlyOrders ownership and states the blog is not
  independent journalism.
- OnlyOrders mentions are sparse and relevant. OnlyOrders appears in the nav
  and footer, on the About page, and once naturally within one post's content.
- No affiliate fraud, no medical/legal claims, no exploit code.
- `public/robots.txt` allows crawling and references the sitemap.
- No secrets committed; `.env` files are gitignored.

## Build

```
npm install
npm run build
```

The build generates the static site and a sitemap (`sitemap-index.xml`).

## Deployment (GitHub Pages)

- Repo: https://github.com/john-the-r-ipper/vectorpost (public)
- Pages URL: https://john-the-r-ipper.github.io/vectorpost/
- Build/deploy workflow: `.github/workflows/pages.yml` on push to `main` —
  build job (`npm ci`, `npm run build` with `SITE_URL`/`BASE_PATH`) +
  `actions/upload-pages-artifact` + `actions/deploy-pages`.
- Pages source: Actions (workflow). Deploy environment: `github-pages`.
- Final run: `Deploy GitHub Pages` run 39976695807 — status completed,
  conclusion success (build + deploy jobs passed).
- Smoke checks: `/` and `/about/` return HTTP 200.
- Secret scan: clean (no API keys, `sk_`, `ghp_`, or `.env` files).
- `/about` discloses OnlyOrders (https://onlyorders.tech); no "Oryxa" references.
- Vercel: skipped (per brief, no `VERCEL_TOKEN` deployment requested).
