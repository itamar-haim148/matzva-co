import { site } from "@/site.config";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${site.brand}`);
  lines.push("");
  lines.push(`> ${site.shortDescription}`);
  lines.push("");
  lines.push(`- אתר: ${site.domain}`);
  lines.push(`- טלפון: ${site.phone.display}`);
  lines.push(`- וואטסאפ: ${site.whatsapp.display}`);
  lines.push(
    `- אזור שירות: ${site.primaryCity} והסביבה (עד כ-${site.serviceRadiusKm} ק"מ)`
  );
  lines.push("");
  lines.push("## סוגי מצבות");
  for (const s of services)
    lines.push(`- [${s.name}](${site.domain}/services/${s.slug}): ${s.short}`);
  lines.push("");
  lines.push("## אזורי שירות");
  for (const c of cities)
    lines.push(`- [מצבות ${c.inForm}](${site.domain}/areas/${c.slug})`);

  const articles = getAllArticles();
  if (articles.length) {
    lines.push("");
    lines.push("## מאמרים");
    for (const a of articles)
      lines.push(`- [${a.title}](${site.domain}/articles/${a.slug})`);
  }

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
