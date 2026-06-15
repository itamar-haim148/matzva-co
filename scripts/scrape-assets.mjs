/**
 * Gather gallery images + price cards from the provider/brand sites,
 * download images, STRIP metadata (sharp -> webp), save to public/images/gallery.
 * Output manifest: scripts/_assets.json
 *
 * Usage: node scripts/scrape-assets.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SITES = ["https://matzevotdavid.co.il/", "https://matzva.co/"];
const OUT = path.join(process.cwd(), "public", "images", "gallery");

async function collect(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(2500);
  return page.evaluate(() => {
    const abs = (u) => {
      try { return new URL(u, location.href).href; } catch { return null; }
    };
    // images
    const imgs = Array.from(document.querySelectorAll("img"))
      .map((im) => ({
        src: abs(im.currentSrc || im.src),
        w: im.naturalWidth || 0,
        h: im.naturalHeight || 0,
        alt: (im.alt || "").trim(),
      }))
      .filter((x) => x.src && !/logo|icon|sprite|avatar|whatsapp|favicon/i.test(x.src));
    // price pairs: any node with ₪ + number, capture nearest heading-ish text
    const priceNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      const t = n.textContent.trim();
      const m = t.match(/₪\s?([\d,]{3,})|החל\s?מ[-\s]?₪?\s?([\d,]{3,})/);
      if (m) {
        let el = n.parentElement;
        let label = "";
        for (let i = 0; i < 5 && el; i++) {
          const h = el.querySelector && el.querySelector("h1,h2,h3,h4,strong,.elementor-heading-title");
          if (h && h.textContent.trim()) { label = h.textContent.trim(); break; }
          el = el.parentElement;
        }
        priceNodes.push({ price: t.slice(0, 40), label: label.slice(0, 60) });
      }
    }
    return { imgs, priceNodes };
  });
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    locale: "he-IL",
  });

  const manifest = { prices: [], gallery: [], sources: {} };
  const seen = new Set();
  let idx = 0;

  for (const site of SITES) {
    const { imgs, priceNodes } = await collect(page, site);
    manifest.sources[site] = { images: imgs.length, prices: priceNodes.length };
    for (const p of priceNodes) manifest.prices.push({ ...p, from: site });

    for (const im of imgs) {
      if (seen.has(im.src)) continue;
      seen.add(im.src);
      if (idx >= 14) break;
      try {
        const resp = await page.context().request.get(im.src, { timeout: 30000 });
        if (!resp.ok()) continue;
        const buf = Buffer.from(await resp.body());
        const meta = await sharp(buf).metadata();
        if ((meta.width || 0) < 400 || (meta.height || 0) < 300) continue; // skip small/icons
        idx++;
        const name = `matzeva-${idx}.webp`;
        await sharp(buf).rotate().resize(1200, 900, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 80 }).toFile(path.join(OUT, name));
        manifest.gallery.push({ file: `/images/gallery/${name}`, alt: im.alt || "מצבה לדוגמה" });
        console.log(`✓ ${name}  (${meta.width}x${meta.height})  metadata stripped`);
      } catch (e) {
        // skip
      }
    }
  }

  await browser.close();
  await fs.writeFile(path.join(process.cwd(), "scripts", "_assets.json"), JSON.stringify(manifest, null, 2), "utf8");
  console.log(`\nGallery images: ${manifest.gallery.length}; price nodes: ${manifest.prices.length}`);
  console.log("Prices:", JSON.stringify(manifest.prices.slice(0, 20), null, 1));
}

main().catch((e) => { console.error(e); process.exit(1); });
