import Link from "next/link";
import styles from "./Header.module.css";
import { site, telLink } from "@/site.config";

const nav = [
  { href: "/", label: "בית" },
  { href: "/services", label: "סוגי מצבות" },
  { href: "/gallery", label: "גלריה" },
  { href: "/pricing", label: "מחירון" },
  { href: "/areas", label: "אזורי שירות" },
  { href: "/articles", label: "מאמרים" },
  { href: "/contact", label: "צור קשר" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.brand} — דף הבית`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt={`${site.brand} — מצבות בירושלים והסביבה`}
            className={styles.logoImg}
          />
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
