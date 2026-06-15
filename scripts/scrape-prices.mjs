import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ locale: "he-IL", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36" });
await page.goto("https://matzva.co/", { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(2500);
const seq = await page.evaluate(() =>
  Array.from(document.querySelectorAll("h2,h3")).map((h) => h.tagName + ": " + (h.textContent || "").replace(/\s+/g, " ").trim()).filter((t) => t.length > 4)
);
await browser.close();
console.log(seq.join("\n"));
