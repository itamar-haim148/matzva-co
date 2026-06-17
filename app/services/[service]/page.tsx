import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { services, serviceBySlug, serviceGalleryCat } from "@/data/services";
import { cities } from "@/data/cities";
import { serviceParagraphs, serviceHubFaq } from "@/lib/content";
import { galleryByCat } from "@/data/gallery";
import { site, priceFromText } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

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

  const faq = serviceHubFaq(s);

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
            <h2>על {s.name}</h2>
            {serviceParagraphs(s).map((p, i) => (
              <p key={i}>{p}</p>
            ))}

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

        <section style={{ paddingBlock: "8px 48px" }}>
          <h2 style={{ marginBottom: 16 }}>גלריית {s.name}</h2>
          <Gallery items={galleryByCat(serviceGalleryCat[s.slug])} />
        </section>
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
