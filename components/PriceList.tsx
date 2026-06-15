import Link from "next/link";
import styles from "./PriceList.module.css";
import { priceList, fromText } from "@/data/pricing";
import { site } from "@/site.config";

export default function PriceList() {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>
          מחירון מצבות — מחירי &quot;החל מ-&quot; להמחשה
        </caption>
        <thead>
          <tr>
            <th scope="col">סוג המצבה</th>
            <th scope="col">מחיר</th>
            <th scope="col" className={styles.hideSm}>
              מידע
            </th>
          </tr>
        </thead>
        <tbody>
          {priceList.map((r, i) => (
            <tr key={`${r.serviceSlug}-${i}`}>
              <th scope="row">{r.label}</th>
              <td className={styles.price}>{fromText(r.from)}</td>
              <td className={styles.hideSm}>
                <Link href={`/services/${r.serviceSlug}`} className={styles.link}>
                  פרטים והקמה {site.primaryCity ? "בירושלים והסביבה" : ""}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.note}>{site.priceNote}</p>
    </div>
  );
}
