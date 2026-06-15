import Link from "next/link";
import styles from "./Breadcrumbs.module.css";
import JsonLd from "./JsonLd";
import { breadcrumbs } from "@/lib/schema";

export type Crumb = { name: string; path: string };

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className={styles.wrap} aria-label="פירורי לחם">
      <div className="container">
        <ol className={styles.list}>
          {trail.map((c, i) => (
            <li key={c.path} className={styles.item}>
              {i < trail.length - 1 ? (
                <Link href={c.path} className={styles.link}>
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <JsonLd data={breadcrumbs(trail)} />
    </nav>
  );
}
