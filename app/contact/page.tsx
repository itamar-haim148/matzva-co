import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { site, telLink, whatsappLink } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import { localBusiness } from "@/lib/schema";

export const metadata: Metadata = {
  title: "צור קשר",
  description: `יצירת קשר עם ${site.brand} — הקמת מצבות בירושלים והסביבה. טלפון ${site.phone.display}, וואטסאפ ${site.whatsapp.display}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const trail = [
    { name: "בית", path: "/" },
    { name: "צור קשר", path: "/contact" },
  ];
  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>צור קשר</h1>
          <p className={c.lead}>
            נשמח ללוות אתכם בכבוד ובסבלנות. ניתן להשאיר פרטים, לחייג או לכתוב
            בוואטסאפ.
          </p>
        </header>
        <div className={c.layout}>
          <article className={c.prose}>
            <h2>פרטי התקשרות</h2>
            <ul>
              <li>
                טלפון: <a href={telLink()}>{site.phone.display}</a>
              </li>
              <li>
                וואטסאפ:{" "}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  {site.whatsapp.display}
                </a>
              </li>
              <li>
                כתובת: {site.address.street}, {site.address.city}
              </li>
            </ul>
            <p>
              אנו מקימים מצבות בירושלים ובכל יישובי הסביבה ברדיוס של עד כ-
              {site.serviceRadiusKm} ק&quot;מ.
            </p>
          </article>
          <aside className={c.aside}>
            <LeadForm />
          </aside>
        </div>
      </div>
      <JsonLd data={localBusiness()} />
    </>
  );
}
