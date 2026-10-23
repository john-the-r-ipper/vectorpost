# Vectorpost

Vectorpost is a static Astro blog about content operations and commerce SEO.

Operated by [OnlyOrders](https://onlyorders.tech) for educational / SEO content (see `/about`).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
SITE_URL=https://john-the-r-ipper.github.io BASE_PATH=/vectorpost/ npm run build
```

GitHub Pages deploys via `.github/workflows/pages.yml` on push to `main`.

## Google Search Console verification

This repo ships `public/google-site-verification-PLACEHOLDER.html`. When a real
Google verification token is supplied, replace that file with the real
`googleXXXX.html` token file (and optionally set the `GSC_VERIFICATION` env
var during build to emit the matching `<meta name="google-site-verification">`
tag; the tag is omitted when the var is empty).

## Deploy targets

- GitHub Pages: `SITE_URL=https://john-the-r-ipper.github.io`, `BASE_PATH=/vectorpost/`
- Vercel: `SITE_URL=https://vectorpost.vercel.app`, `BASE_PATH=/` (see `vercel.json`)
