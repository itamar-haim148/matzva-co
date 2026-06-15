import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { site } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "גלריית מצבות — דוגמאות עבודה",
  description: `גלריית מצבות לדוגמה — מצבות אבן, גרניט, זוגיות ומעוצבות שהוקמו בירושלים והסביבה. ${site.brand}.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const trail = [
    { name: "בית", path: "/" },
    { name: "גלריה", path: "/gallery" },
  ];
  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>גלריית מצבות</h1>
          <p className={c.lead}>
            דוגמאות מעבודות שביצענו — מצבות אבן, גרניט, זוגיות ומעוצבות, בעבודת
            אמן ועל פי ההלכה. כל מצבה מותאמת אישית לבקשת המשפחה.
          </p>
        </header>
        <section style={{ paddingBlock: "12px 48px" }}>
          <Gallery />
        </section>
      </div>
      <CtaBand title="רוצים מצבה כזו?" />
    </>
  );
}
