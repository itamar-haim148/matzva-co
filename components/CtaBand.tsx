import styles from "./CtaBand.module.css";
import Button from "./Button";
import { site, telLink, whatsappLink } from "@/site.config";

export default function CtaBand({
  title = "מעוניינים בהצעת מחיר?",
  text = "השאירו פרטים או חייגו אלינו — נשמח ללוות אתכם בכבוד ובסבלנות.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className={styles.band}>
      <div className={`container ${styles.inner}`}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.actions}>
          <Button href={telLink()} variant="accent" size="lg">
            ☎ {site.phone.display}
          </Button>
          <Button href={whatsappLink()} external variant="whatsapp" size="lg">
            וואטסאפ
          </Button>
        </div>
      </div>
    </section>
  );
}
