import type { Metadata } from "next";
import c from "@/components/Content.module.css";
import { site, telLink, whatsappLink } from "@/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { localBusiness } from "@/lib/schema";
import { contactFaq } from "@/lib/content";

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
              <li>אזור שירות: {site.serviceArea}</li>
            </ul>
            <p>
              אנו מקימים מצבות בירושלים ובכל יישובי הסביבה ברדיוס של עד כ-
              {site.serviceRadiusKm} ק&quot;מ — מגוש עציון ובית שמש ועד מבשרת
              ציון, מעלה אדומים והיישובים הסמוכים.
            </p>

            <h2>כיצד אנו עובדים</h2>
            <p>
              הפנייה הראשונה אינה מחייבת דבר. בשיחה נכיר את הצרכים שלכם, נבין על
              איזה סוג מצבה מדובר ובאיזה בית עלמין, ונסביר את האפשרויות והשלבים.
              לאחר מכן נמסור הצעת מחיר מפורטת ושקופה, וכשתהיו מוכנים — נתקדם יחד
              בקצב שמתאים לכם, בלי לחץ.
            </p>
            <p>
              אנו יודעים שהקמת מצבה מגיעה בתקופה רגישה, ולכן הליווי שלנו אישי
              וסבלני. אנחנו זמינים לשאלות לאורך כל הדרך — בטלפון, בוואטסאפ או דרך
              הטופס — ומלווים את המשפחה מהרגע הראשון ועד הצבת המצבה ובדיקתה
              הסופית.
            </p>

            <h2>מה כדאי להכין לפני הפנייה</h2>
            <p>
              כדי שנוכל לעזור במהירות, נשמח אם יהיו בידכם פרטי בית העלמין והחלקה,
              שמות מלאים ותאריכים (עברי או לועזי), וכן רעיונות ראשוניים לגבי סוג
              האבן, העיצוב או נוסח הכיתוב. אין צורך שהכל יהיה מוכן — נשמח לסייע גם
              בליבון הפרטים ובהמלצות על נוסח, פסוקים וסמלים מקובלים.
            </p>
            <p>
              בכל שאלה הלכתית הנוגעת לזמן הקמת המצבה או לנוסח הכיתוב, אנו ממליצים
              להיוועץ ברב המשפחה, ופועלים תמיד בהתאם למסורת ולכללי בית העלמין.
              נשמח לעמוד לרשותכם ולהקים מצבה מכובדת לזכר יקירכם.
            </p>

            <h2>זמינות ואזור שירות</h2>
            <p>
              אנו מקימים מצבות בירושלים ובכל יישובי הסביבה ברדיוס של עד כ-
              {site.serviceRadiusKm} ק&quot;מ — ירושלים, מבשרת ציון, מעלה אדומים,
              גבעת זאב, בית שמש, גוש עציון ועוד. ניתן לפנות אלינו בכל אחד מהאמצעים,
              ואנו נשתדל לחזור אליכם בהקדם האפשרי, מתוך הבנה שלעיתים הזמן לוחץ.
            </p>
            <p>
              גם אם אתם נמצאים בחו&quot;ל או אינכם יכולים להגיע פיזית, נשמח ללוות
              אתכם מרחוק — נתאם את כל הפרטים בטלפון ובוואטסאפ, נשלח אפשרויות לבחירה,
              ונדאג שהמצבה תוקם כראוי גם בלעדיכם בשטח. המטרה שלנו היא להקל עליכם,
              בכל מצב, ולעשות את הדברים בכבוד ובמקצועיות.
            </p>
          </article>
          <aside className={c.aside}>
            <LeadForm />
          </aside>
        </div>
        <section style={{ paddingBottom: 48 }}>
          <Faq items={contactFaq} title="שאלות נפוצות על יצירת קשר והקמת מצבה" />
        </section>
      </div>
      <JsonLd data={localBusiness()} />
    </>
  );
}
