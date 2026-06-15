import Link from "next/link";
import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { cities } from "@/data/cities";
import { site } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "אזורי שירות — מצבות בירושלים והסביבה",
  description: `הקמת מצבות בירושלים ובכל יישובי הסביבה ברדיוס של עד כ-${site.serviceRadiusKm} ק"מ: בית שמש, גוש עציון, מבשרת ציון ועוד. ${site.brand}.`,
  alternates: { canonical: "/areas" },
};

export default function AreasIndex() {
  const trail = [
    { name: "בית", path: "/" },
    { name: "אזורי שירות", path: "/areas" },
  ];
  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>אזורי שירות</h1>
          <p className={c.lead}>
            אנו מקימים מצבות בירושלים ובכל יישובי הסביבה ברדיוס של עד כ-
            {site.serviceRadiusKm} ק&quot;מ. בחרו יישוב:
          </p>
        </header>
        <section style={{ paddingBlock: "16px 48px" }}>
          <div className={c.cardGrid}>
            {cities.map((ct) => (
              <Link
                key={ct.slug}
                href={`/areas/${ct.slug}`}
                className={c.card}
              >
                <h3>מצבות {ct.inForm}</h3>
                <p>
                  {ct.approxKmFromJerusalem === 0
                    ? "בלב ירושלים"
                    : `כ-${ct.approxKmFromJerusalem} ק"מ מירושלים`}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <CtaBand />
    </>
  );
}
