import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { services } from "@/data/services";
import { cities, cityBySlug } from "@/data/cities";
import { site } from "@/site.config";
import { nearbyCities } from "@/lib/content";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { localBusiness } from "@/lib/schema";
import type { QA } from "@/lib/schema";

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return cities.map((ct) => ({ city: ct.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city } = await params;
  const ct = cityBySlug(city);
  if (!ct) return {};
  const title = `מצבות ${ct.inForm} — הקמת מצבה ${ct.inForm}`;
  const description = `הקמת מצבות ${ct.inForm} בעבודת אמן ועל פי ההלכה. כל סוגי המצבות, ליווי אישי והצעת מחיר שקופה. ${site.brand}.`;
  const url = `/areas/${ct.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function CityHub({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city } = await params;
  const ct = cityBySlug(city);
  if (!ct) notFound();

  const disttxt =
    ct.approxKmFromJerusalem === 0
      ? "בלב ירושלים"
      : `במרחק של כ-${ct.approxKmFromJerusalem} ק"מ מירושלים`;

  const faq: QA[] = [
    {
      q: `האם אתם מקימים מצבות ${ct.inForm}?`,
      a: `כן. אנו מקימים מצבות ${ct.inForm} ובכל אזור ירושלים, בכל סוגי האבן והעיצוב, בכפוף לכללי בית העלמין המקומי.`,
    },
    {
      q: `אילו סוגי מצבות זמינים ${ct.inForm}?`,
      a: `כל הסוגים: מצבת יחיד, זוגית, משפחתית, סנהדרין, גרניט, אבן טבעית ומצבות מעוצבות.`,
    },
    {
      q: `כיצד מתאמים הקמת מצבה ${ct.inForm}?`,
      a: `מתחילים בשיחה קצרה, בודקים את פרטי החלקה ובית העלמין, ומוסרים הצעת מחיר ולוח זמנים. השאירו פרטים ונחזור אליכם.`,
    },
  ];

  const trail = [
    { name: "בית", path: "/" },
    { name: "אזורי שירות", path: "/areas" },
    { name: ct.name, path: `/areas/${ct.slug}` },
  ];

  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>מצבות {ct.inForm}</h1>
          <p className={c.lead}>
            {site.brand} מקימה מצבות {ct.inForm} — {disttxt} — בעבודת אמן ועל פי
            המסורת וההלכה היהודית, בליווי אישי לכל אורך הדרך.
          </p>
        </header>

        <div className={c.layout}>
          <article className={c.prose}>
            <h2>סוגי מצבות {ct.inForm}</h2>
            <p>בחרו את סוג המצבה לקבלת מידע ממוקד ולפנייה מהירה:</p>
            <ul className={c.linkGrid}>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    className={c.linkChip}
                    href={`/services/${s.slug}/${ct.slug}`}
                  >
                    {s.name} {ct.inForm}
                  </Link>
                </li>
              ))}
            </ul>

            <h2>יישובים נוספים באזור</h2>
            <ul className={c.linkGrid}>
              {nearbyCities(ct, 8).map((n) => (
                <li key={n.slug}>
                  <Link
                    className={c.linkChip}
                    href={`/areas/${n.slug}`}
                  >
                    מצבות {n.inForm}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
          <aside className={c.aside}>
            <LeadForm heading={`ייעוץ למצבה ${ct.inForm}`} />
          </aside>
        </div>
      </div>

      <section style={{ background: "var(--bg-soft)", paddingBlock: "48px" }}>
        <div className="container">
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand title={`מצבות ${ct.inForm} — דברו איתנו`} />
      <JsonLd data={localBusiness()} />
    </>
  );
}
