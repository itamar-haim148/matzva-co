/**
 * Pexels image ingestion + metadata stripping.
 *
 * Downloads commercial-use images from Pexels, STRIPS all EXIF/XMP/IPTC
 * metadata, and writes clean .webp + .avif into /public/images.
 *
 * Usage:
 *   PEXELS_API_KEY=xxxx node scripts/ingest-images.mjs "מצבה ירושלים" 6
 *
 * Notes:
 * - Pexels content is free for commercial use; attribution appreciated, not required.
 * - Choose dignified, respectful imagery only (stone, Jerusalem, nature) — this is
 *   a memorial business. Review every image before publishing.
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const API_KEY = process.env.PEXELS_API_KEY;
const query = process.argv[2] || "jerusalem stone";
const perPage = Number(process.argv[3] || 6);
const OUT = path.join(process.cwd(), "public", "images");

if (!API_KEY) {
  console.error("Missing PEXELS_API_KEY env var. Get one at https://www.pexels.com/api/");
  process.exit(1);
}

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=${perPage}&orientation=landscape`,
    { headers: { Authorization: API_KEY } }
  );
  if (!res.ok) throw new Error(`Pexels API ${res.status}`);
  const { photos } = await res.json();
  if (!photos?.length) {
    console.log("No photos found for:", query);
    return;
  }

  let i = 0;
  for (const p of photos) {
    i++;
    const srcUrl = p.src?.large2x || p.src?.large || p.src?.original;
    const buf = Buffer.from(await (await fetch(srcUrl)).arrayBuffer());
    const base = `${slugify(query)}-${i}`;

    // sharp re-encodes pixels only — EXIF/XMP/IPTC are dropped by default.
    const pipeline = sharp(buf).rotate().resize(1600, 1067, { fit: "cover" });

    await pipeline
      .clone()
      .webp({ quality: 78 })
      .toFile(path.join(OUT, `${base}.webp`));
    await pipeline
      .clone()
      .avif({ quality: 55 })
      .toFile(path.join(OUT, `${base}.avif`));

    console.log(`✓ ${base}.webp / .avif  (metadata stripped)  src:Pexels#${p.id}`);
  }

  // Record sources for your own attribution/audit (not published).
  const credits = photos.map((p) => ({
    id: p.id,
    photographer: p.photographer,
    url: p.url,
  }));
  await fs.writeFile(
    path.join(OUT, "_sources.json"),
    JSON.stringify(credits, null, 2)
  );
  console.log(`\nDone. ${photos.length} images in /public/images. Review before publishing.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
