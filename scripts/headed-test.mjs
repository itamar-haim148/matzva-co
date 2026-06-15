import { chromium } from "playwright";
const browser = await chromium.launch({ headless: false, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto("https://example.com", { waitUntil: "domcontentloaded" });
console.log("HEADED_OK title=" + (await page.title()));
await page.waitForTimeout(8000);
await browser.close();
console.log("CLOSED");
