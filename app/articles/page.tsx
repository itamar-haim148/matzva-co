import Link from "next/link";
import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { site } from "@/site.config";
import { getAllArticles } from "@/lib/articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "מאמרים ומדריכים על מצבות",
  description: `מדריכים, מידע והלכה על הקמת מצבות בירושלים והסביבה. ${site.brand}.`,
  alternates: { canonical: "/articles" },
};

export default function ArticlesIndex() {
  const articles = getAllArticles();
  const trail = [
    { name: "בית", path: "/" },
    { name: "מאמרים", path: "/articles" },
  ];
  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>מאמרים ומדריכים</h1>
          <p className={c.lead}>
            מידע, הלכה ועצות מעשיות על הקמת מצבות — כדי שתוכלו לקבל החלטות בראש
            שקט.
          </p>
        </header>
        <section style={{ paddingBlock: "16px 48px" }}>
          {articles.length === 0 ? (
            <p>מאמרים יתווספו בקרוב.</p>
          ) : (
            <div className={c.cardGrid}>
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className={c.card}
                >
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                  <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
                    {a.readingMinutes} דק׳ קריאה
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
      <CtaBand />
    </>
  );
}
