import Link from "next/link";
import styles from "./Header.module.css";
import { site, telLink } from "@/site.config";

const nav = [
  { href: "/", label: "בית" },
  { href: "/services", label: "סוגי מצבות" },
  { href: "/areas", label: "אזורי שירות" },
  { href: "/articles", label: "מאמרים" },
  { href: "/contact", label: "צור קשר" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.brand} — דף הבית`}>
          <span className={styles.logoMark} aria-hidden="true">
            ✡
          </span>
          <span className={styles.logoText}>{site.brand}</span>
        </Link>

        <nav className={styles.nav} aria-label="ניווט ראשי">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={styles.navLink}>
              {n.label}
            </Link>
          ))}
        </nav>

        <a className={styles.call} href={telLink()}>
          <span className={styles.callIcon} aria-hidden="true">
            ☎
          </span>
          <span>
            <span className={styles.callLabel}>חייגו עכשיו</span>
            <span className={styles.callNum}>{site.phone.display}</span>
          </span>
        </a>
      </div>
    </header>
  );
}
