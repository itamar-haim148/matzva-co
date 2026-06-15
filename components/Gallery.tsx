import Image from "next/image";
import styles from "./Gallery.module.css";
import { gallery } from "@/data/gallery";

export default function Gallery({ limit }: { limit?: number }) {
  const items = limit ? gallery.slice(0, limit) : gallery;
  return (
    <ul className={styles.grid} aria-label="גלריית מצבות לדוגמה">
      {items.map((g) => (
        <li key={g.src} className={styles.tile}>
          <Image
            src={g.src}
            alt={g.alt}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
            className={styles.img}
          />
        </li>
      ))}
    </ul>
  );
}
