/**
 * Phase A5 — competitor/SERP research via Playwright (headless, no login).
 * Scrapes Bing SERP (scrape-friendly) for the core headstone queries and
 * extracts organic competitors + related searches.
 *
 * Usage: node scripts/serp-research.mjs
 * Output: scripts/_serp-research.json
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const QUERIES = [
  "מצבות בירושלים",
  "מצבה זוגית",
  "מצבות מחירים",
  "הקמת מצבה",
  "מצבות גרניט",
  "מצבות בבית שמש",
];

// Bing wraps links in /ck/a?...&u=a1<base64-url>. Decode to the real URL.
const decodeBing = (href) => {
  try {
    const u = new URL(href);
    if (u.hostname.includes("bing.com")) {
      const p = u.searchParams.get("u");
      if (p && p.startsWith("a1")) {
        const b64 = p.slice(2).replace(/-/g, "+").replace(/_/g, "/");
        return Buffer.from(b64, "base64").toString("utf8");
      }
    }
    return href;
  } catch {
    return href;
  }
};

const domainOf = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

async function main() {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    locale: "he-IL",
  });

  const results = {};
  const domainCount = {};

  for (const q of QUERIES) {
    const url = `https://www.bing.com/search?q=${encodeURIComponent(
      q
    )}&setlang=he&cc=IL&count=15`;
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForSelector("li.b_algo", { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(1500);
      const raw = await page.evaluate(() => {
        const organic = Array.from(document.querySelectorAll("li.b_algo")).map((li) => {
          const a = li.querySelector("h2 a");
          const cite = li.querySelector("cite");
          return {
            title: (a?.textContent || "").trim(),
            href: a?.href || "",
            cite: (cite?.textContent || "").trim(),
          };
        });
        const related = Array.from(
          document.querySelectorAll(".b_rs a, .b_rrsr a")
        )
          .map((a) => (a.textContent || "").trim())
          .filter(Boolean);
        return { organic, related };
      });
      const organic = raw.organic.map((r) => {
        const real = decodeBing(r.href);
        return { title: r.title, url: real, domain: domainOf(real) };
      });
      organic.forEach((r) => {
        if (r.domain) domainCount[r.domain] = (domainCount[r.domain] || 0) + 1;
      });
      results[q] = { organic, related: raw.related };
      console.log(`✓ ${q}: ${organic.length} organic, ${raw.related.length} related`);
      await page.waitForTimeout(4000); // be polite / dodge throttling
    } catch (e) {
      results[q] = { error: String(e) };
      console.log(`✗ ${q}: ${e}`);
    }
  }

  await browser.close();

  const topDomains = Object.entries(domainCount)
    .sort((a, b) => b[1] - a[1])
    .map(([domain, appearances]) => ({ domain, appearances }));

  const out = { queries: results, topCompetitorDomains: topDomains };
  const file = path.join(process.cwd(), "scripts", "_serp-research.json");
  await fs.writeFile(file, JSON.stringify(out, null, 2), "utf8");
  console.log(`\nSaved ${file}`);
  console.log("Top domains:", topDomains.slice(0, 10));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
