import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ locale: "he-IL" });
const urls = [
  "https://matzva.co/",
  "https://matzva.co/services/zugit/jerusalem",
  "https://matzva.co/articles/kaddish-guide",
];
for (const url of urls) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.addScriptTag({ url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js" }).catch(() => {});
  const res = await page.evaluate(async () => {
    if (!window.axe) return { error: "axe not loaded" };
    const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa"] });
    return r.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      n: v.nodes.length,
      samples: v.nodes.slice(0, 3).map((n) => ({ target: n.target.join(" "), summary: (n.failureSummary || "").replace(/\s+/g, " ").slice(0, 160) })),
    }));
  });
  console.log("\n===== " + url + " =====");
  if (res.error) { console.log(res.error); continue; }
  if (!res.length) { console.log("no violations"); continue; }
  for (const v of res) {
    console.log(`\n[${v.impact}] ${v.id} (${v.n}) — ${v.help}`);
    for (const s of v.samples) console.log(`   ${s.target}\n     ${s.summary}`);
  }
}
await browser.close();
