import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { performance } from "node:perf_hooks";

const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) {
  console.error("BASE_URL env is required");
  process.exit(1);
}

const base = BASE_URL.endsWith("/") ? BASE_URL : BASE_URL + "/";
const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("No IndexNow key file found in public/ (32-hex .txt)");
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, "");
const keyLocation = base + key + ".txt";

async function extractLocs(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

const indexPath = base + "sitemap-index.xml";
const childMaps = await extractLocs(indexPath);
const urls = [];
for (const child of childMaps) {
  urls.push(...(await extractLocs(child)));
}
const unique = [...new Set(urls)];
if (!unique.length) {
  console.error("No URLs found in sitemap");
  process.exit(1);
}

const host = new URL(base).host;
const payload = { host, key, keyLocation, urlList: unique };

const started = performance.now();
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
const ms = Math.round(performance.now() - started);

console.log(`host=${host}`);
console.log(`keyLocation=${keyLocation}`);
console.log(`urls=${unique.length}`);
console.log(`HTTP ${res.status} (${ms}ms)`);
const text = await res.text();
if (text) console.log(text);
if (!res.ok) process.exit(1);
