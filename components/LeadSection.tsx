import styles from "./LeadSection.module.css";
import LeadForm from "./LeadForm";
import Button from "./Button";
import { site, telLink, whatsappLink } from "@/site.config";

export default function LeadSection({
  title,
  subtitle,
  formHeading,
  alt = false,
}: {
  title: string;
  subtitle: string;
  formHeading?: string;
  alt?: boolean;
}) {
  return (
    <section className={`${styles.band} ${alt ? styles.alt : ""}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.sub}>{subtitle}</p>
          <div className={styles.ctas}>
            <Button href={telLink()} variant="accent" size="lg">
              ☎ {site.phone.display}
            </Button>
            <Button href={whatsappLink()} external variant="whatsapp" size="lg">
              וואטסאפ
            </Button>
          </div>
        </div>
        <div className={styles.formWrap}>
          <LeadForm heading={formHeading ?? "השאירו פרטים"} />
        </div>
      </div>
    </section>
  );
}
