/**
 * Heter Iska "Brit Pinchas" (shared spec v1 `wp/shabbat-heter-shared/SPEC.md` part B).
 * - HeterIskaLine: condition line under every lead form, success state and footer.
 * - HeterIskaSection: terms section #heter-iska with the clause + full shtar text.
 * Party A comes ONLY from data already published on this site. Business ID /
 * address left as ____ when not published (owner-gated). The owner signs the
 * heter himself (kesherhk form 1105); this page never states it was signed.
 */
import { HETER_DATE_HE, HETER_PDF, SHTAR_PARAS } from "@/lib/heterIskaShtar";

export const HETER_TERMS_HREF = "/terms#heter-iska";
export const HETER_TERMS_ABS = "https://matzva.co/terms#heter-iska";
// Owner ruling 2026-11-15: Heter Iska only inside the terms page. Outside placements default OFF.
export const HETER_OUTSIDE = process.env.NEXT_PUBLIC_HETER_ISKA_OUTSIDE === "1";
export const HETER_LINE_TEXT = "כפוף לתנאי היתר עיסקא ״ברית פנחס״ התלוי בתקנון האתר";

const PARTY_A = "מצבה יהודית (matzva.co)";
const PARTY_A_FULL = "מצבה יהודית (matzva.co), ח.פ./ע.מ. ____________, כתובת: ____________";
const CLAUSE_EXTRA = "";
const PARTY_B = "כל המתקשר עם העסק (לקוח, ספק או צד אחר)";

export function HeterIskaLine({ center = false }: { center?: boolean }) {
  if (!HETER_OUTSIDE) return null;
  return (
    <p
      dir="rtl"
      data-heter-iska
      style={{ fontSize: "12px", lineHeight: 1.6, opacity: 0.85, margin: "10px 0 0", textAlign: center ? "center" : undefined }}
    >
      כפוף לתנאי היתר עיסקא ״ברית פנחס״ התלוי ב<a href={HETER_TERMS_HREF}>תקנון האתר</a>.
    </p>
  );
}

export function HeterIskaSection() {
  return (
    <section id="heter-iska" dir="rtl" style={{ marginTop: "40px", lineHeight: 1.75 }}>
      <h2>היתר עיסקא ״ברית פנחס״</h2>
      <p>
        <strong>
          כל העסקאות, ההזמנות, ההתקשרויות וההתחייבויות הכספיות בין {PARTY_A}
          {CLAUSE_EXTRA} לבין לקוחות, ספקים או כל צד אחר, לרבות הזמנות באתר, בטלפון, בוואטסאפ,
          בדוא&quot;ל או בכל דרך אחרת, תשלומים, תשלומים נדחים, מקדמות, החזרים וזיכויים, כפופות לתנאי
          היתר עיסקא ״ברית פנחס״ התלוי באתר זה (בעמוד זה) ובמשרדי העסק. ביצוע הזמנה או פנייה לעסק
          מהווים הסכמה לתנאים אלו.
        </strong>
      </p>
      <details open style={{ marginTop: "16px" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>נוסח שטר היתר העיסקא</summary>
        <div style={{ fontSize: "0.92em", marginTop: "8px" }}>
          {SHTAR_PARAS.map((l, i) => {
            if (l.startsWith("צד א'"))
              return (
                <p key={i} style={{ fontWeight: 600 }}>
                  צד א&apos;: {PARTY_A_FULL} | צד ב&apos;: {PARTY_B}
                </p>
              );
            if (l.startsWith("ולראיה")) return <p key={i}>ולראיה באתי על החתום, יום {HETER_DATE_HE}</p>;
            if (l.startsWith("חתימות")) return <p key={i}>חתימות בעלי הסכם: ________________________</p>;
            return <p key={i}>{l}</p>;
          })}
        </div>
      </details>
      <p style={{ marginTop: "16px" }}>
        <a href={HETER_PDF} target="_blank" rel="noopener noreferrer">
          שטר היתר העיסקא המלא (PDF, בית ההוראה ברית פנחס)
        </a>
      </p>
    </section>
  );
}
