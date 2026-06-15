import styles from "./FloatingCTA.module.css";
import { site, telLink, whatsappLink } from "@/site.config";

export default function FloatingCTA() {
  const waMsg = `שלום, הגעתי מהאתר ${site.brand} ואשמח לקבל פרטים על הקמת מצבה.`;
  return (
    <div className={styles.wrap} aria-label="יצירת קשר מהירה">
      <a
        className={`${styles.fab} ${styles.whatsapp}`}
        href={whatsappLink(waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="פנייה בוואטסאפ"
      >
        <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" fill="currentColor">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.3-.4c-1-1.6-1.5-3.4-1.5-5.3C4.9 9.5 9.9 4.9 16 4.9c5.5 0 10 4.5 10 10s-4.5 9.9-10 9.9zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
        </svg>
        <span className={styles.label}>וואטסאפ</span>
        <span className={styles.pulse} aria-hidden="true"></span>
      </a>

      <a
        className={`${styles.fab} ${styles.call}`}
        href={telLink()}
        aria-label={`חיוג לטלפון ${site.phone.display}`}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
        </svg>
        <span className={styles.label}>חייגו</span>
      </a>
    </div>
  );
}
