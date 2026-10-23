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

## Deployment (Vercel)

- Project: **vectorpost** (A John-the-r-ipper, static Astro, `dist` output).
- Vercel preview URL: https://vectorpost-4vzxjmb9d-john-the-r-ippers-projects.vercel.app
- Vercel production URL: https://vectorpost.vercel.app
- Smoke checks: preview and production both return HTTP 200.
- No `.vercel` secrets committed; `.vercel/` stays gitignored.

## SEO post-deploy checks (2026-10-23)

- Google Search Console placeholder added: `public/google-site-verification-PLACEHOLDER.html`;
  optional `GSC_VERIFICATION` env drives the `<meta name="google-site-verification">` tag (omitted when empty).
- Robots.txt now generated per target from `src/pages/robots.txt.ts`:
  - Pages: `Sitemap: https://john-the-r-ipper.github.io/vectorpost/sitemap-index.xml`
  - Vercel: `Sitemap: https://vectorpost.vercel.app/sitemap-index.xml`
- No `noindex` meta/header anywhere.
- Playwright live checks added (`tests/postdeploy.spec.ts`, `playwright.config.ts`, `npm run check:live`):
  home, /about/, every sitemap post URL => 200; robots.txt + sitemap reachable; no noindex.
- Deploys: Pages workflow run 39978192868 (success); Vercel prod deployment
  `vectorpost-o8ldjxwui-john-the-r-ippers-projects.vercel.app` (URL https://vectorpost.vercel.app).
- Live check results:
  - BASE_URL=https://john-the-r-ipper.github.io/vectorpost/ => 3/3 passed
  - BASE_URL=https://vectorpost.vercel.app => 3/3 passed

CHECKS_PAGES=pass
CHECKS_VERCEL=pass

## OnlyOrders content + IndexNow (2026-10-23)

- Added `/onlyorders/` hub page (what it is, features, pricing tiers as published
  on onlyorders.tech, links to new posts, link to https://onlyorders.tech).
- Added 3 new posts: `what-onlyorders-is`, `chat-first-messenger-stores`,
  `how-onlyorders-works` — all cite onlyorders.tech, all "OnlyOrders" (no "Oryxa").
- Nav "OnlyOrders" now points to internal `/onlyorders/` hub; footer and `/about`
  keep the external link + honest ownership disclosure. Added Organization JSON-LD
  (url + sameAs) to the layout head.
- Sitemap `serialize` sets priority 1.0 for `/onlyorders/` and its posts, 0.6 for
  others, changefreq weekly. robots.txt still generated from SITE_URL+BASE_PATH.
- IndexNow key `public/6dc61695b7575c0db5074321364638eb.txt`; `scripts/indexnow.mjs`
  reads the live sitemap and POSTs to api.indexnow.org; npm script `indexnow`.
- Deploys: Pages workflow run 39978561140 (success); Vercel prod deployment
  `vectorpost-b65prod6g-...` (https://vectorpost.vercel.app).
- Live checks (`npm run check:live`, 3/3 each): Pages https://john-the-r-ipper.github.io/vectorpost/
  and Vercel https://vectorpost.vercel.app — passed.
- IndexNow pushes: Pages host -> HTTP 202; Vercel host -> HTTP 202 (12 URLs each).
- New URLs: /onlyorders/, /blog/what-onlyorders-is/, /blog/chat-first-messenger-stores/,
  /blog/how-onlyorders-works/

NEW_URLS=/onlyorders/,/blog/what-onlyorders-is/,/blog/chat-first-messenger-stores/,/blog/how-onlyorders-works/ INDEXNOW_PAGES=202 INDEXNOW_VERCEL=202 CHECKS=pass
