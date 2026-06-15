import Link from "next/link";
import styles from "./Footer.module.css";
import { site, telLink, whatsappLink } from "@/site.config";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

export default function Footer() {
  const year = 2026;
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.col}>
          <div className={styles.brand}>{site.brand}</div>
          <p className={styles.about}>{site.shortDescription}</p>
          <ul className={styles.nap}>
            <li>
              טלפון:{" "}
              <a href={telLink()} className={styles.link}>
                {site.phone.display}
              </a>
            </li>
            <li>
              וואטסאפ:{" "}
              <a href={whatsappLink()} className={styles.link}>
                {site.whatsapp.display}
              </a>
            </li>
            <li>
              {site.address.street}, {site.address.city}
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.h}>סוגי מצבות</h2>
          <ul className={styles.list}>
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={styles.link}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.h}>אזורי שירות</h2>
          <ul className={styles.list}>
            {cities.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link href={`/areas/${c.slug}`} className={styles.link}>
                  מצבות {c.inForm}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.h}>מידע</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/articles" className={styles.link}>
                מאמרים ומדריכים
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.link}>
                צור קשר
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className={styles.link}>
                הצהרת נגישות
              </Link>
            </li>
            <li>
              <Link href="/terms" className={styles.link}>
                תקנון ופרטיות
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>
            © {year} {site.brand}. כל הזכויות שמורות. · {site.legalNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
