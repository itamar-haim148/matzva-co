/**
 * Opens a VISIBLE Playwright Chromium window with a PERSISTENT profile,
 * navigates to Ahrefs, and waits for you to log in manually.
 * Once logged in, the session is saved to ./.pw-ahrefs and the window stays
 * open briefly, then closes. Later scrape scripts reuse the same profile.
 *
 * Usage: node scripts/ahrefs-session.mjs
 */
import { chromium } from "playwright";
import path from "node:path";

const userDataDir = path.join(process.cwd(), ".pw-ahrefs");

const ctx = await chromium.launchPersistentContext(userDataDir, {
  headless: false,
  viewport: { width: 1400, height: 900 },
  locale: "he-IL",
  args: ["--start-maximized"],
});

const page = ctx.pages()[0] || (await ctx.newPage());
await page.goto("https://app.ahrefs.com/keywords-explorer", {
  waitUntil: "domcontentloaded",
});

console.log("WINDOW OPEN — please log in to Ahrefs in the visible window.");

const deadline = Date.now() + 9 * 60 * 1000; // wait up to 9 minutes
let loggedIn = false;
while (Date.now() < deadline) {
  const url = page.url();
  if (url.startsWith("https://app.ahrefs.com/") && !url.includes("/user/login")) {
    loggedIn = true;
    break;
  }
  await page.waitForTimeout(3000);
}

if (loggedIn) {
  console.log("LOGGED_IN — session saved to .pw-ahrefs");
  await page.waitForTimeout(2000);
} else {
  console.log("TIMEOUT — not logged in within the window.");
}
await ctx.close();
