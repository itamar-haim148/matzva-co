import Link from "next/link";
import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { services } from "@/data/services";
import { site } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "סוגי מצבות — מצבות בירושלים והסביבה",
  description: `כל סוגי המצבות שאנו מקימים בירושלים ובסביבה: יחיד, זוגית, משפחתית, סנהדרין, גרניט, אבן ועוד. ${site.brand}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  const trail = [
    { name: "בית", path: "/" },
    { name: "סוגי מצבות", path: "/services" },
  ];
  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>סוגי מצבות</h1>
          <p className={c.lead}>
            אנו מקימים מגוון רחב של מצבות בירושלים ובסביבה, בעבודת אמן ועל פי
            ההלכה. בחרו את סוג המצבה המתאים לכם:
          </p>
        </header>
        <section style={{ paddingBlock: "16px 48px" }}>
          <div className={c.cardGrid}>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className={c.card}>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <CtaBand />
    </>
  );
}
