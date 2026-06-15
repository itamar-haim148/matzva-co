import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { site } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import PriceList from "@/components/PriceList";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import type { QA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "מחירון מצבות בירושלים והסביבה",
  description: `מחירון מצבות — מחירי "החל מ-" לפי סוג המצבה, בשקיפות מלאה. הצעת מחיר מדויקת בפנייה. ${site.brand}.`,
  alternates: { canonical: "/pricing" },
};

const faq: QA[] = [
  {
    q: "האם המחירים סופיים?",
    a: 'המחירים הם מחירי "החל מ-" להמחשה. המחיר הסופי נקבע לפי סוג האבן, המידות, מורכבות העיצוב והכיתוב ודרישות בית העלמין, ונמסר בהצעת מחיר מפורטת ושקופה.',
  },
  {
    q: "מה כולל המחיר?",
    a: "ההצעה כוללת את האבן, הכיתוב וההקמה בהתאם למפרט שיוסכם. פרטים מדויקים נמסרים בפנייה לאחר בדיקת החלקה ובית העלמין.",
  },
  {
    q: "איך מקבלים הצעת מחיר?",
    a: "משאירים פרטים או מתקשרים, ואנו חוזרים עם הצעת מחיר מותאמת — ללא התחייבות.",
  },
];

export default function PricingPage() {
  const trail = [
    { name: "בית", path: "/" },
    { name: "מחירון", path: "/pricing" },
  ];
  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>מחירון מצבות</h1>
          <p className={c.lead}>
            ריכזנו עבורכם מחירי &quot;החל מ-&quot; לפי סוג המצבה, בשקיפות מלאה.
            המחיר הסופי תלוי בבחירות שלכם ונמסר בהצעת מחיר אישית.
          </p>
        </header>
        <section style={{ paddingBlock: "8px 40px" }}>
          <PriceList />
        </section>
        <section
          style={{ background: "var(--bg-soft)", paddingBlock: "40px", marginInline: "calc(-1 * var(--gutter))", paddingInline: "var(--gutter)" }}
        >
          <Faq items={faq} />
        </section>
      </div>
      <CtaBand title="רוצים הצעת מחיר מדויקת?" />
    </>
  );
}
