import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { site } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "תקנון ומדיניות פרטיות",
  description: `תקנון השימוש ומדיניות הפרטיות של אתר ${site.brand}.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  const trail = [
    { name: "בית", path: "/" },
    { name: "תקנון ופרטיות", path: "/terms" },
  ];
  return (
    <>
      <Breadcrumbs trail={trail} />
      <div className="container">
        <header className={c.head}>
          <h1>תקנון ומדיניות פרטיות</h1>
        </header>
        <article className={c.prose} style={{ paddingBottom: 48 }}>
          <h2>כללי</h2>
          <p>
            אתר זה מופעל על ידי {site.brand}. השימוש באתר ובשירותיו כפוף לתנאים
            המפורטים להלן. המידע באתר הוא כללי ומובא לנוחות הגולשים בלבד, ואינו
            מהווה ייעוץ או התחייבות. פרטים מדויקים לגבי שירות מסוים יימסרו
            בפנייה ישירה.
          </p>
          <h2>מדיניות פרטיות</h2>
          <p>
            פרטים שתמסרו בטופס יצירת הקשר (שם, טלפון וכתובת/יישוב) משמשים אך ורק
            לצורך חזרה אליכם ומתן שירות. איננו מעבירים את פרטיכם לצדדים שלישיים
            שאינם נדרשים למתן השירות, ולא נעשה בהם שימוש לדיוור שאינו רלוונטי.
          </p>
          <h2>הסרה ועדכון פרטים</h2>
          <p>
            תוכלו לבקש בכל עת לעיין בפרטים שמסרתם, לעדכן אותם או להסירם, על ידי
            פנייה אלינו בטלפון.
          </p>
          <h2>קניין רוחני</h2>
          <p>
            התכנים, התמונות והעיצוב באתר הם רכושו של {site.brand} ואין לעשות בהם
            שימוש ללא אישור.
          </p>
          <p>עודכן ביוני 2026.</p>
        </article>
      </div>
    </>
  );
}
