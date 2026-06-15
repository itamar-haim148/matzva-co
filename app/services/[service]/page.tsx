import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { services, serviceBySlug } from "@/data/services";
import { cities } from "@/data/cities";
import { site, priceFromText } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import type { QA } from "@/lib/schema";

type Params = { service: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { service } = await params;
  const s = serviceBySlug(service);
  if (!s) return {};
  const title = `${s.name} בירושלים והסביבה`;
  const description = `${s.short} ${s.intro} ${site.brand}.`.slice(0, 155);
  const url = `/services/${s.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function ServiceHub({
  params,
}: {
  params: Promise<Params>;
}) {
  const { service } = await params;
  const s = serviceBySlug(service);
  if (!s) notFound();

  const faq: QA[] = [
    {
      q: `מה כוללת הקמת ${s.name}?`,
      a: `${s.intro}`,
    },
    {
      q: `היכן ניתן להקים ${s.name}?`,
      a: `אנו מקימים ${s.name} בירושלים ובכל יישובי הסביבה ברדיוס של עד כ-${site.serviceRadiusKm} ק"מ.`,
    },
    {
      q: `כיצד מקבלים הצעת מחיר?`,
      a: `השאירו פרטים או חייגו אלינו, ונחזור אליכם עם הצעת מחיר שקופה ומפורטת.`,
    },
  ];

  const trail = [
    { name: "בית", path: "/" },
    { name: "סוגי מצבות", path: "/services" },
    { name: s.name, path: `/services/${s.slug}` },
  ];

  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>{s.name} בירושלים והסביבה</h1>
          <p className={c.lead}>{s.intro}</p>
          <p className={c.lead}>
            <strong>{priceFromText()}</strong>. {site.priceNote}
          </p>
        </header>

        <div className={c.layout}>
          <article className={c.prose}>
            <h2>בחרו את היישוב שלכם</h2>
            <p>
              אנו מקימים {s.name} בירושלים ובכל יישובי האזור. בחרו יישוב למידע
              ממוקד ולפנייה מהירה:
            </p>
            <ul className={c.linkGrid}>
              {cities.map((ct) => (
                <li key={ct.slug}>
                  <Link
                    className={c.linkChip}
                    href={`/services/${s.slug}/${ct.slug}`}
                  >
                    {s.name} {ct.inForm}
                  </Link>
                </li>
              ))}
            </ul>

            <h2>סוגי מצבות נוספים</h2>
            <ul className={c.linkGrid}>
              {services
                .filter((x) => x.slug !== s.slug)
                .map((o) => (
                  <li key={o.slug}>
                    <Link className={c.linkChip} href={`/services/${o.slug}`}>
                      {o.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </article>
          <aside className={c.aside}>
            <LeadForm heading={`ייעוץ ל${s.name}`} />
          </aside>
        </div>
      </div>

      <section style={{ background: "var(--bg-soft)", paddingBlock: "48px" }}>
        <div className="container">
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={serviceSchema(s.name, s.intro, site.primaryCity)} />
    </>
  );
}
