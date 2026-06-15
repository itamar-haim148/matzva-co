import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { site, telLink } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: `הצהרת הנגישות של אתר ${site.brand}.`,
  alternates: { canonical: "/accessibility" },
  robots: { index: false, follow: true },
};

export default function AccessibilityPage() {
  const trail = [
    { name: "בית", path: "/" },
    { name: "הצהרת נגישות", path: "/accessibility" },
  ];
  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>הצהרת נגישות</h1>
        </header>
        <article className={c.prose} style={{ paddingBottom: 48 }}>
          <p>
            אנו ב{site.brand} רואים חשיבות רבה במתן שירות שוויוני ונגיש לכלל
            הגולשים, ופועלים כדי שהאתר יהיה נגיש לאנשים עם מוגבלות.
          </p>
          <h2>רמת הנגישות באתר</h2>
          <p>
            האתר נבנה תוך שאיפה לעמוד בהמלצות התקן הישראלי (ת&quot;י 5568)
            המבוסס על הנחיות WCAG 2.1 ברמה AA, ובכלל זה: מבנה כותרות תקין, ניווט
            באמצעות מקלדת, סימון אזור הפוקוס, ניגודיות צבעים, טקסט חלופי לתמונות
            וטפסים מתויגים.
          </p>
          <h2>שימוש במקלדת</h2>
          <p>
            ניתן לנווט באתר באמצעות מקלדת (מקש Tab למעבר בין רכיבים ו-Enter
            להפעלה), וקיים קישור &quot;דלג לתוכן הראשי&quot; בתחילת כל עמוד.
          </p>
          <h2>פניות בנושא נגישות</h2>
          <p>
            נתקלתם בקושי נגישותי? נשמח לסייע ולתקן. ניתן לפנות אלינו בטלפון{" "}
            <a href={telLink()}>{site.phone.display}</a> ונטפל בפנייה בהקדם.
          </p>
          <p>הצהרה זו עודכנה ביוני 2026.</p>
        </article>
      </div>
    </>
  );
}
