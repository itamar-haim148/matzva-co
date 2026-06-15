/**
 * Phase A2 — scrape the provider/sister site for reference (structure + service
 * types + copy patterns). For RESEARCH only; do not copy text verbatim — adapt.
 *
 * Usage: node scripts/scrape-provider.mjs
 * Output: scripts/_provider-research.json
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const TARGETS = [
  "https://matzevotdavid.co.il/",
  "https://matzva.co/",
];

async function scrape(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(2500);
  return page.evaluate(() => {
    const txt = (el) => (el?.textContent || "").trim().replace(/\s+/g, " ");
    const pick = (sel) =>
      Array.from(document.querySelectorAll(sel))
        .map((e) => txt(e))
        .filter((t) => t.length > 1);
    return {
      title: document.title,
      metaDescription:
        document.querySelector('meta[name="description"]')?.getAttribute("content") || null,
      h1: pick("h1"),
      h2: pick("h2"),
      h3: pick("h3"),
      navLinks: Array.from(document.querySelectorAll("nav a, header a"))
        .map((a) => ({ text: txt(a), href: a.getAttribute("href") }))
        .filter((l) => l.text),
      tel: Array.from(document.querySelectorAll('a[href^="tel:"]')).map((a) =>
        a.getAttribute("href")
      ),
      whatsapp: Array.from(document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]')).map(
        (a) => a.getAttribute("href")
      ),
    };
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    locale: "he-IL",
  });
  const out = {};
  for (const url of TARGETS) {
    try {
      out[url] = await scrape(page, url);
      console.log(`✓ scraped ${url}`);
    } catch (e) {
      out[url] = { error: String(e) };
      console.log(`✗ ${url}: ${e}`);
    }
  }
  await browser.close();
  const file = path.join(process.cwd(), "scripts", "_provider-research.json");
  await fs.writeFile(file, JSON.stringify(out, null, 2), "utf8");
  console.log(`\nSaved ${file}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
