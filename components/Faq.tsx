import styles from "./Faq.module.css";
import JsonLd from "./JsonLd";
import { faqPage, type QA } from "@/lib/schema";

export default function Faq({
  items,
  title = "שאלות ותשובות",
}: {
  items: QA[];
  title?: string;
}) {
  if (!items.length) return null;
  return (
    <section className={styles.faq} aria-labelledby="faq-title">
      <h2 id="faq-title" className={styles.title}>
        {title}
      </h2>
      <div className={styles.list}>
        {items.map((it, i) => (
          <details key={i} className={styles.item}>
            <summary className={styles.q}>{it.q}</summary>
            <div className={styles.a}>
              <p>{it.a}</p>
            </div>
          </details>
        ))}
      </div>
      <JsonLd data={faqPage(items)} />
    </section>
  );
}
