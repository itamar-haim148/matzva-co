/**
 * Content QA gate (Ralph-loop verification): every article must be >= 1000 words
 * (body incl. Q&A) and MDX-safe. Exits non-zero if any fail.
 *
 * Usage: node scripts/check-articles.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content", "articles");
const MIN_WORDS = 1000;

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
let failures = 0;
const rows = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(DIR, f), "utf8");
  // strip frontmatter
  const body = raw.replace(/^---[\s\S]*?---\s*/, "");
  const words = body.split(/\s+/).filter(Boolean).length;
  const hasAngles = /<[A-Za-z/]/.test(body);
  const hasBraces = /[{}]/.test(body);
  const hasTable = /^\s*\|.*\|/m.test(body);
  const hasFaq = /##\s*שאלות נפוצות/.test(body);
  const ok = words >= MIN_WORDS && !hasAngles && !hasBraces && !hasTable && hasFaq;
  if (!ok) failures++;
  rows.push({
    file: f,
    words,
    faq: hasFaq,
    issues: [
      words < MIN_WORDS ? `SHORT(${words})` : null,
      hasAngles ? "ANGLE<>" : null,
      hasBraces ? "BRACES{}" : null,
      hasTable ? "TABLE" : null,
      !hasFaq ? "NO_FAQ" : null,
    ]
      .filter(Boolean)
      .join(","),
  });
}

rows.sort((a, b) => a.words - b.words);
for (const r of rows) {
  const flag = r.issues ? `  ❌ ${r.issues}` : "  ✓";
  console.log(`${String(r.words).padStart(5)}  ${r.file}${flag}`);
}
console.log(
  `\n${files.length} articles, ${files.length - failures} pass, ${failures} fail (min ${MIN_WORDS} words incl Q&A).`
);
process.exit(failures > 0 ? 1 : 0);
