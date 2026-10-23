import { test, expect } from "@playwright/test";

const baseURL = process.env.BASE_URL || "";

function base() {
  if (!baseURL) throw new Error("BASE_URL env is required");
  return baseURL.endsWith("/") ? baseURL : baseURL + "/";
}

function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

test.describe("post-deploy SEO checks", () => {
  test("home and about load 200 without noindex", async ({ request }) => {
    for (const path of [base(), base() + "about/"]) {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      const body = await res.text();
      expect(body).not.toMatch(/noindex/i);
      const tag = res.headers()["x-robots-tag"] || "";
      expect(tag.toLowerCase()).not.toContain("noindex");
    }
  });

  test("robots.txt allows crawling and references sitemap", async ({ request }) => {
    const res = await request.get(base() + "robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap:");
    expect(body).toContain("sitemap-index.xml");
  });

  test("sitemap index reachable and every post URL loads 200 without noindex", async ({ request }) => {
    const indexRes = await request.get(base() + "sitemap-index.xml");
    expect(indexRes.status()).toBe(200);
    const indexXml = await indexRes.text();

    const childMaps = extractLocs(indexXml);
    expect(childMaps.length).toBeGreaterThan(0);

    const urls: string[] = [];
    for (const child of childMaps) {
      const r = await request.get(child);
      expect(r.status()).toBe(200);
      urls.push(...extractLocs(await r.text()));
    }

    expect(urls.length).toBeGreaterThan(0);
    for (const u of urls) {
      const r = await request.get(u);
      expect(r.status(), `${u} should return 200`).toBe(200);
      const body = await r.text();
      expect(body).not.toMatch(/noindex/i);
      const tag = r.headers()["x-robots-tag"] || "";
      expect(tag.toLowerCase()).not.toContain("noindex");
    }
  });
});
