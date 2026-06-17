import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import c from "@/components/Content.module.css";
import { site } from "@/site.config";
import { getAllArticles, getArticle } from "@/lib/articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadSection from "@/components/LeadSection";
import JsonLd from "@/components/JsonLd";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      type: "article",
      url: `/articles/${a.slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const trail = [
    { name: "בית", path: "/" },
    { name: "מאמרים", path: "/articles" },
    { name: a.title, path: `/articles/${a.slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date || undefined,
    author: { "@type": "Organization", name: site.brand },
    publisher: { "@type": "Organization", name: site.brand },
    mainEntityOfPage: `${site.domain}/articles/${a.slug}`,
  };

  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>{a.title}</h1>
          <p className={c.lead}>{a.description}</p>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            {a.readingMinutes} דק׳ קריאה
          </p>
        </header>
        <article className={c.prose} style={{ paddingBottom: 48 }}>
          <MDXRemote source={a.content} />
        </article>
      </div>
      <LeadSection
        title="מתלבטים? נשמח לעזור לכם להחליט"
        subtitle="השאירו פרטים ונציג רגיש ומקצועי יחזור אליכם עם מידע, אפשרויות והכוונה — ללא התחייבות."
        formHeading="קבלת ייעוץ והצעת מחיר"
      />
      <JsonLd data={articleSchema} />
    </>
  );
}
