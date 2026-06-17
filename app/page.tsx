import Link from "next/link";
import styles from "./page.module.css";
import { site, telLink, whatsappLink } from "@/site.config";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import Button from "@/components/Button";
import LeadForm from "@/components/LeadForm";
import LeadSection from "@/components/LeadSection";
import GoogleReviews from "@/components/GoogleReviews";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { localBusiness } from "@/lib/schema";
import type { QA } from "@/lib/schema";

const homeFaq: QA[] = [
  {
    q: "תוך כמה זמן ניתן להקים מצבה?",
    a: "משך הזמן תלוי בסוג המצבה, בבית העלמין ובאישורים הנדרשים. לאחר פנייה אנו בודקים את פרטי החלקה ומוסרים לכם לוח זמנים מדויק וריאלי, ללא הבטחות שאי אפשר לעמוד בהן.",
  },
  {
    q: "האם המצבה נעשית על פי ההלכה?",
    a: "כן. אנו מקפידים על הקמת מצבה בהתאם למסורת ולהלכה היהודית, ובכפוף לכללים של בית העלמין הספציפי שבו מתבצעת העבודה.",
  },
  {
    q: "באילו אזורים אתם מקימים מצבות?",
    a: `אנו מתמחים בהקמת מצבות בירושלים וביישובי הסביבה ברדיוס של עד כ-${site.serviceRadiusKm} ק"מ, ובהם בית שמש, גוש עציון, מבשרת ציון, מעלה אדומים ועוד.`,
  },
  {
    q: "כיצד נקבע מחיר המצבה?",
    a: "המחיר נקבע לפי סוג האבן, גודל המצבה, מורכבות העיצוב והכיתוב ודרישות בית העלמין. אנו נותנים הצעת מחיר שקופה ומפורטת מראש, ללא הפתעות.",
  },
  {
    q: "האם אתם מלווים את המשפחה בתהליך?",
    a: "כן. אנו מלווים את המשפחה באופן אישי מרגע הפנייה — בבחירת האבן, ניסוח הכיתוב, התיאום מול בית העלמין ועד להקמה בפועל.",
  },
];

const values = [
  {
    icon: "✡",
    title: "על פי ההלכה והמסורת",
    text: "כל מצבה מוקמת בכבוד הראוי, על פי המסורת וההלכה היהודית ובהתאם לכללי בית העלמין.",
  },
  {
    icon: "✦",
    title: "עבודת אמן באבן",
    text: "אבן איכותית, כיתוב מדויק וגימור מוקפד — מצבה שתעמוד בכבוד לאורך שנים.",
  },
  {
    icon: "♥",
    title: "ליווי אישי ורגיש",
    text: "אנו יודעים שזו תקופה לא פשוטה, ומלווים אתכם בסבלנות ובאמפתיה בכל שלב.",
  },
];

export default function Home() {
  return (
    <>
      {/* ABOVE THE FOLD */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>
              מצבות בירושלים והסביבה · על פי ההלכה
            </p>
            <h1>אנחנו כאן כדי לעזור לכם להנציח את זכרם בכבוד</h1>
            <p className={styles.heroLead}>
              השאירו פרטים, ונציג אנושי ילווה אתכם ברגישות ובסבלנות צעד אחר צעד,
              ללא כל התחייבות.
            </p>
            <div className={styles.heroChips}>
              <a className={styles.chip} href={telLink()}>
                ☎ {site.phone.display}
              </a>
              <a
                className={styles.chip}
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                וואטסאפ {site.whatsapp.display}
              </a>
            </div>
            <div className={styles.heroCtas}>
              <Button href="#lead" variant="accent" size="lg">
                לקבלת ייעוץ והצעת מחיר
              </Button>
              <Button
                href={whatsappLink()}
                external
                variant="whatsapp"
                size="lg"
              >
                שיחה בוואטסאפ
              </Button>
            </div>
          </div>

          <div id="lead">
            <LeadForm heading="לקבלת ייעוץ והצעת מחיר" />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>למה לבחור ב{site.brand}</h2>
            <p>מצבה היא מעשה של כבוד וזיכרון. אנחנו כאן כדי לעשות זאת נכון.</p>
          </div>
          <div className={styles.values}>
            {values.map((v) => (
              <div key={v.title} className={styles.value}>
                <div className={styles.valueIcon} aria-hidden="true">
                  {v.icon}
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>סוגי מצבות</h2>
            <p>בחרו את סוג המצבה המתאים, ואנו נלווה אתכם בכל השאר.</p>
          </div>
          <div className={styles.grid}>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={styles.card}
              >
                <h3>{s.name}</h3>
                <p>{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS (real Google reviews — shows when configured) */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>המלצות</h2>
            <p>מה אומרים עלינו לקוחות — המלצות אמיתיות מתוך Google.</p>
          </div>
          <GoogleReviews />
        </div>
      </section>

      {/* LEAD SECTION A */}
      <LeadSection
        title="צריכים עזרה או הכוונה בבחירת מצבה?"
        subtitle="השאירו פרטים ונחזור אליכם לשיחת ייעוץ רגועה, בגובה העיניים ובקצב שלכם."
        formHeading="לשיחת ייעוץ ללא התחייבות"
      />

      {/* AREAS */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>אזורי שירות סביב ירושלים</h2>
            <p>
              הקמת מצבות בירושלים וביישובי הסביבה ברדיוס של עד כ-
              {site.serviceRadiusKm} ק&quot;מ.
            </p>
          </div>
          <div className={styles.areaGrid}>
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/areas/${c.slug}`}
                className={styles.area}
              >
                מצבות {c.inForm}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT — מצבות בירושלים */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <article className={styles.prose}>
            <h2>מצבות בירושלים — הקמת מצבה בכבוד ובמקצועיות</h2>
            <p>
              {site.brand} מתמחה בהקמת מצבות בירושלים ובכל יישובי הסביבה, ברדיוס
              של עד כ-{site.serviceRadiusKm} ק&quot;מ מירושלים. אנו מקימים מצבות
              בעבודת אמן, על פי המסורת וההלכה היהודית, ומתוך כבוד עמוק לנפטר
              ולמשפחה. הקמת מצבה היא רגע משמעותי של זיכרון והנצחה, ואנו כאן כדי
              ללוות אתכם בו בסבלנות, ברגישות ובמקצועיות — מהשיחה הראשונה ועד הצבת
              המצבה.
            </p>
            <p>
              ירושלים מרכזת חלק גדול מבתי העלמין המרכזיים בארץ, ולכל בית עלמין
              כללים משלו לגבי סוגי המצבות, המידות, החומרים והגוונים המותרים. אנו
              מכירים את הדרישות, פועלים בתיאום מלא מול הנהלת בית העלמין והחברה
              קדישא, ודואגים שכל מצבה שאנו מקימים בירושלים תעמוד בכללים ותוקם
              בכבוד וללא עיכובים מיותרים.
            </p>

            <h3>סוגי מצבות שאנו מקימים בירושלים</h3>
            <p>
              אנו מקימים מגוון רחב של מצבות: מצבת יחיד לקבר בודד, מצבה זוגית לבני
              זוג, מצבה משפחתית לחלקת משפחה, מצבת סנהדרין בסגנון קיר האבן המסורתי
              המקובל בחלק מבתי העלמין בירושלים, מצבת מכפלה לקבורה זו על גבי זו,
              וכן מצבות גרניט, מצבות אבן טבעית ואבן ירושלמית ומצבות מעוצבות
              בהתאמה אישית. לכל סוג מאפיינים, יתרונות והתאמה משלו, ואנו נסייע לכם
              לבחור את המתאים ביותר עבורכם ועבור יקירכם.
            </p>

            <h3>בחירת האבן, הכיתוב והעיצוב</h3>
            <p>
              בחירת האבן משפיעה הן על מראה המצבה והן על עמידותה לאורך שנים. אנו
              עובדים עם גרניט עמיד במגוון גוונים, עם אבן טבעית ועם אבן ירושלמית
              קלאסית, ומסבירים את ההבדלים ביניהן. הכיתוב על המצבה הוא לב ההנצחה,
              ואנו מסייעים בניסוח מדויק ומכובד — שם הנפטר, שמות ההורים, התאריך
              העברי ופסוקים או מילות פרידה — תוך הקפדה על ראשי תיבות מקובלים ועל
              דיוק בפרטים.
            </p>

            <h3>ליווי אישי ושקיפות מלאה במחיר</h3>
            <p>
              אנו מאמינים שתהליך הקמת מצבה צריך להיות פשוט וברור. עוד לפני תחילת
              העבודה תקבלו הצעת מחיר מפורטת ושקופה, כך שתדעו בדיוק למה לצפות, ללא
              הפתעות. אנו מלווים כל משפחה באופן אישי לכל אורך הדרך, וזמינים לכל
              שאלה — בטלפון, בוואטסאפ או בטופס יצירת הקשר. הקמת מצבה בירושלים
              צריכה להיעשות מתוך כבוד וללא לחץ, וזו בדיוק ההתחייבות שלנו אליכם.
            </p>
          </article>
        </div>
      </section>

      {/* LEAD SECTION B */}
      <LeadSection
        title="נשמח להקשיב ולעזור לכם לבחור"
        subtitle="מלאו את הפרטים ונציג מקצועי ורגיש שלנו יחזור אליכם עם כל המידע והאפשרויות."
        formHeading="השאירו פרטים"
        alt
      />

      {/* FAQ */}
      <section className={styles.section}>
        <div className="container">
          <Faq items={homeFaq} />
        </div>
      </section>

      <JsonLd data={localBusiness()} />
    </>
  );
}
