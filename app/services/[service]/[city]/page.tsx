import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { services, serviceBySlug } from "@/data/services";
import { cities, cityBySlug } from "@/data/cities";
import { site, priceFromText } from "@/site.config";
import {
  gridLead,
  gridSections,
  gridFaq,
  processSteps,
  priceFactors,
  nearbyCities,
  otherServices,
} from "@/lib/content";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, localBusiness } from "@/lib/schema";

type Params = { service: string; city: string };

export function generateStaticParams(): Params[] {
  return services.flatMap((s) =>
    cities.map((city) => ({ service: s.slug, city: city.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { service, city } = await params;
  const s = serviceBySlug(service);
  const ct = cityBySlug(city);
  if (!s || !ct) return {};
  const title = `${s.name} ${ct.inForm} | הקמת מצבות`;
  const description = `הקמת ${s.name} ${ct.inForm} בעבודת אמן ועל פי ההלכה. ליווי אישי, הצעת מחיר שקופה וגימור מוקפד. ${site.brand} — מצבות בירושלים והסביבה.`;
  const url = `/services/${s.slug}/${ct.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function GridPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { service, city } = await params;
  const s = serviceBySlug(service);
  const ct = cityBySlug(city);
  if (!s || !ct) notFound();

  const faq = gridFaq(s, ct);
  const trail = [
    { name: "בית", path: "/" },
    { name: "סוגי מצבות", path: "/services" },
    { name: s.name, path: `/services/${s.slug}` },
    { name: ct.name, path: `/services/${s.slug}/${ct.slug}` },
  ];

  return (
    <>
      <Breadcrumbs trail={trail} />

      <div className="container">
        <header className={c.head}>
          <h1>
            הקמת {s.name} {ct.inForm}
          </h1>
          <p className={c.lead}>{gridLead(s, ct)}</p>
        </header>

        <div className={c.layout}>
          <article className={c.prose}>
            {gridSections(s, ct).map((sec) => (
              <section key={sec.heading}>
                <h2>{sec.heading}</h2>
                {sec.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}

            <h2>תהליך הקמת {s.name} {ct.inForm}</h2>
            <ol className={c.steps}>
              {processSteps.map((st, i) => (
                <li key={st.title} className={c.step}>
                  <span className={c.stepNum}>{i + 1}</span>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </li>
              ))}
            </ol>

            <h2>מה משפיע על מחיר {s.name} {ct.inForm}</h2>
            <p>
              <strong>{priceFromText()}</strong> — {site.priceNote}
            </p>
            <ul>
              {priceFactors.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <h3>{s.name} ביישובים נוספים באזור</h3>
            <ul className={c.linkGrid}>
              {nearbyCities(ct).map((n) => (
                <li key={n.slug}>
                  <Link
                    className={c.linkChip}
                    href={`/services/${s.slug}/${n.slug}`}
                  >
                    {s.name} {n.inForm}
                  </Link>
                </li>
              ))}
            </ul>

            <h3>סוגי מצבות נוספים {ct.inForm}</h3>
            <ul className={c.linkGrid}>
              {otherServices(s).map((o) => (
                <li key={o.slug}>
                  <Link
                    className={c.linkChip}
                    href={`/services/${o.slug}/${ct.slug}`}
                  >
                    {o.name} {ct.inForm}
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <aside className={c.aside}>
            <LeadForm heading={`ייעוץ ל${s.name} ${ct.inForm}`} />
          </aside>
        </div>
      </div>

      <section style={{ background: "var(--bg-soft)", paddingBlock: "48px" }}>
        <div className="container">
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand title={`רוצים ${s.name} ${ct.inForm}?`} />

      <JsonLd
        data={[
          serviceSchema(
            `${s.name} ${ct.inForm}`,
            `${s.short} הקמה ${ct.inForm} ובאזור ירושלים.`,
            ct.name
          ),
          localBusiness(),
        ]}
      />
    </>
  );
}
