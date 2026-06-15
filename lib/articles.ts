import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: "TOFU" | "MOFU" | "BOFU" | string;
  readingMinutes: number;
};

export type Article = ArticleMeta & { content: string };

const DIR = path.join(process.cwd(), "content", "articles");

function readDir(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
}

function parse(file: string): Article {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title ?? file,
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "MOFU",
    readingMinutes: Math.max(1, Math.round(words / 200)),
    content,
  };
}

export function getAllArticles(): ArticleMeta[] {
  return readDir()
    .map((f) => {
      const { content: _c, ...meta } = parse(f);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | null {
  const file = `${slug}.mdx`;
  if (!readDir().includes(file)) return null;
  return parse(file);
}
