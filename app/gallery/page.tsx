import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { site } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { galleryFaq } from "@/lib/content";
import { galleryCategories, galleryByCat } from "@/data/gallery";

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
        {galleryCategories.map((cat) => {
          const items = galleryByCat(cat.key);
          if (!items.length) return null;
          return (
            <section key={cat.key} style={{ paddingBlock: "12px 36px" }}>
              <h2 style={{ marginBottom: 8 }}>{cat.title}</h2>
              <p style={{ color: "var(--ink-soft)", maxWidth: "65ch", marginBottom: 18 }}>
                {cat.desc}
              </p>
              <Gallery items={items} />
            </section>
          );
        })}
        <article className={c.prose} style={{ paddingBottom: 48 }}>
          <h2>גלריית מצבות בירושלים — עבודות אמן באבן</h2>
          <p>
            הגלריה שלפניכם מציגה דוגמאות ממצבות שהקמנו בירושלים ובסביבה — מצבות
            אבן, מצבות גרניט, מצבות זוגיות, מצבות משפחתיות ומצבות מעוצבות. כל
            מצבה היא עבודה ייחודית המותאמת אישית לרצון המשפחה, לאופי הנפטר ולכללי
            בית העלמין, ומבוצעת בעבודת אמן ועל פי המסורת וההלכה היהודית.
          </p>
          <h3>מה אפשר ללמוד מהגלריה</h3>
          <p>
            הגלריה נועדה לעזור לכם להתרשם ממגוון האפשרויות: סוגי אבן וגוונים
            שונים, צורות מצבה מסורתיות ומודרניות, סגנונות כיתוב, וכן אלמנטים
            מעוצבים כמו סמלים, מסגרות ותבליטים. חשוב לזכור שכל מצבה ניתנת להתאמה
            מלאה — מה שאתם רואים הוא נקודת התחלה, ולא תבנית קבועה.
          </p>
          <h3>בחירת חומר וגימור</h3>
          <p>
            מצבות הגרניט מציעות עמידות גבוהה ומגוון רחב של גוונים, והן שומרות על
            מראהן לאורך שנים גם בתנאי מזג האוויר של ירושלים. מצבות האבן הטבעית,
            ובהן האבן הירושלמית הקלאסית, משלבות מראה חם ומסורתי עם חיבור עמוק
            לנוף ולמסורת של העיר. בפגישת הייעוץ נסביר לכם את היתרונות של כל חומר
            ונעזור לבחור את המתאים ביותר.
          </p>
          <h3>עיצוב, כיתוב וסמלים</h3>
          <p>
            רבים מהמצבות בגלריה משלבות אלמנטים מעוצבים — מסגרות, תבליטים וסמלים
            מסורתיים כמו מנורה, ידי כהן או מגן דוד — לצד כיתוב מוקפד. ניתן לבחור
            גופן וסגנון אותיות, צבע מילוי (כגון זהב או שחור), ולשלב פסוק או מילות
            פרידה. אנו מסייעים לאזן בין יופי, כבוד ועמידה בכללי בית העלמין.
          </p>

          <h3>מהגלריה אל המצבה שלכם</h3>
          <p>
            מצא חן בעיניכם סגנון מסוים? נשמח לקחת אותו כנקודת מוצא ולעצב יחד אתכם
            מצבה שתשקף באמת את זכר יקירכם. אנו מלווים את התהליך כולו — מבחירת
            האבן והעיצוב, דרך ניסוח הכיתוב, ועד הצבת המצבה בבית העלמין — בכבוד,
            בסבלנות ובשקיפות מלאה במחיר. אנו מקימים מצבות בירושלים ובכל יישובי
            הסביבה, וכל מצבה מבוצעת בעבודת אמן ועל פי ההלכה. צרו קשר ונתחיל יחד.
          </p>
        </article>
        <section style={{ paddingBottom: 48 }}>
          <Faq items={galleryFaq} />
        </section>
      </div>
      <CtaBand title="רוצים מצבה כזו?" />
    </>
  );
}
