import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { site } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import PriceList from "@/components/PriceList";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { pricingFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "מחירון מצבות בירושלים והסביבה",
  description: `מחירון מצבות — מחירי "החל מ-" לפי סוג המצבה, בשקיפות מלאה. הצעת מחיר מדויקת בפנייה. ${site.brand}.`,
  alternates: { canonical: "/pricing" },
};

const faq = pricingFaq;

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
        <section style={{ paddingBlock: "8px 32px" }}>
          <PriceList />
        </section>
        <article className={c.prose} style={{ paddingBottom: 40 }}>
          <h2>מחירון מצבות בירושלים — איך נקבע המחיר</h2>
          <p>
            מחיר מצבה אינו מספר אחיד, והוא מושפע ממספר גורמים. ריכזנו עבורכם
            מחירי &quot;החל מ-&quot; כדי לתת מושג ראשוני, אך המחיר הסופי נקבע
            תמיד לאחר בדיקת הפרטים הספציפיים של ההזמנה. אנו מאמינים בשקיפות מלאה,
            ולכן תקבלו הצעת מחיר מפורטת וברורה עוד לפני תחילת העבודה — ללא אותיות
            קטנות וללא הפתעות.
          </p>
          <h3>מה משפיע על מחיר המצבה</h3>
          <p>
            הגורם המשמעותי ביותר הוא סוג האבן והגוון — גרניט, אבן טבעית או אבן
            ירושלמית — שכן לכל חומר עלות ומאפיינים שונים. בנוסף משפיעים גודל
            המצבה וסוגה (יחיד, זוגית, מכפלה או משפחתית), מורכבות העיצוב והכיתוב,
            תוספות כמו סמלים ותבליטים, ועבודות נלוות כגון יסוד או ריצוף. גם
            דרישות בית העלמין הספציפי משפיעות על העלות.
          </p>
          <h3>מה כולל המחיר</h3>
          <p>
            הצעת המחיר שלנו כוללת את האבן, הכיתוב וההקמה בהתאם למפרט שיוסכם
            אתכם. אנו מפרטים בדיוק מה כלול, כך שתוכלו להשוות ולהחליט בראש שקט.
            מטרתנו שתקבלו מצבה איכותית ומכובדת במחיר הוגן, ושכל שקל יהיה ברור
            ומוסבר.
          </p>
          <h3>הצעת מחיר אישית, ללא התחייבות</h3>
          <p>
            הדרך הטובה ביותר לקבל מחיר מדויק היא פנייה קצרה. נבין יחד אתכם את
            הצרכים, נבדוק את פרטי החלקה ובית העלמין, ונחזור אליכם עם הצעת מחיר
            מותאמת — ללא כל התחייבות מצדכם. אנו כאן כדי להקל עליכם בתקופה לא
            פשוטה, ולעשות את הדברים נכון ובכבוד.
          </p>
          <h3>שקיפות לאורך כל הדרך</h3>
          <p>
            אנו מאמינים שמחיר הוגן הוא מחיר ברור. לכן לא תמצאו אצלנו עלויות נסתרות
            או תוספות מפתיעות בסוף הדרך — כל מה שכלול מפורט מראש, וכל שינוי
            מתואם אתכם. מחירי ה&quot;החל מ-&quot; שבטבלה נועדו לתת לכם נקודת
            התחלה ריאלית להבנת העלויות של מצבות בירושלים והסביבה, וההצעה האישית
            תתאים בדיוק למצבה שתבחרו.
          </p>
        </article>
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
